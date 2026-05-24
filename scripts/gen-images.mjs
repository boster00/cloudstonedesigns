import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

// Read API key
const envContent = readFileSync('C:/Users/xsj70/GuildOS/.env.local', 'utf8');
const match = envContent.match(/^OPENAI_API_KEY=(.+)$/m);
const OPENAI_API_KEY = match?.[1]?.trim();
if (!OPENAI_API_KEY) throw new Error('OPENAI_API_KEY not found in .env.local');

const images = [
  {
    outPath: 'public/images/hero.jpg',
    prompt: 'Architectural photography of a contemporary residential home at golden hour. Clean concrete and timber facade, large floor-to-ceiling windows reflecting warm amber sky. Lush Pacific Northwest landscaping. Shot from slight low angle, cinematic depth of field. No people. Photorealistic, high-end architectural photography editorial style.',
  },
  {
    outPath: 'public/images/projects/meridian-house.jpg',
    prompt: 'Architectural photography of a modern hillside residence in San Francisco. Cantilevered concrete volume over a sloped site, panoramic glazing with city views. Warm afternoon light. Clean minimal exterior, board-formed concrete and weathered steel cladding. No people. Photorealistic editorial architecture photography.',
  },
  {
    outPath: 'public/images/projects/vale-studio.jpg',
    prompt: 'Architectural photography of an adaptive reuse creative workspace inside a converted 1940s warehouse in Portland Oregon. Exposed timber roof trusses, polished concrete floors, large industrial skylights flooding space with diffused daylight. Film production equipment visible in background. No people. Photorealistic interior architecture photography.',
  },
  {
    outPath: 'public/images/projects/thornfield-renovation.jpg',
    prompt: 'Architectural photography of a renovated mid-century modern split-level home exterior in Seattle. Updated cedar siding, new aluminum window frames, landscaped front yard with native plants. Overcast Pacific Northwest sky. Clean and understated. No people. Photorealistic architectural photography.',
  },
  {
    outPath: 'public/images/projects/atlas-pavilion.jpg',
    prompt: 'Architectural photography of an open-air event pavilion on a California vineyard estate. Structural timber frame with a folded roof plane, framing views of rolling vine rows and oak hills. Evening light, warm glow from pendant lights within the pavilion. No people. Photorealistic editorial architecture photography.',
  },
  {
    outPath: 'public/images/projects/sable-residence.jpg',
    prompt: 'Architectural photography of a contemporary single-family home on a steep hillside lot in Marin County California. Three cantilevered volumes stepping down the slope. San Francisco Bay visible in the distance. Warm sunset light. Blackened steel and glass exterior. No people. Photorealistic high-end architectural photography.',
  },
  {
    outPath: 'public/images/projects/quill-interiors.jpg',
    prompt: 'Interior architecture photography of a boutique hotel guest room in Los Angeles. Warm neutral palette — travertine, linen, aged brass fixtures. Large window with soft diffused daylight. Bespoke millwork headboard, curated bedside lighting. Quiet luxury, no clutter. No people. Photorealistic interior design photography editorial style.',
  },
];

async function generateImage(prompt, outPath) {
  const fullPath = join(ROOT, outPath);
  mkdirSync(dirname(fullPath), { recursive: true });

  console.log(`\n[START] ${outPath}`);
  const t0 = Date.now();

  const res = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-image-2',
      prompt,
      size: '1536x1024',
      quality: 'high',
      n: 1,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`API error ${res.status}: ${err}`);
  }

  const json = await res.json();
  const b64 = json.data?.[0]?.b64_json;
  if (!b64) throw new Error(`No b64_json in response: ${JSON.stringify(json)}`);

  const buf = Buffer.from(b64, 'base64');
  writeFileSync(fullPath, buf);
  const elapsed = ((Date.now() - t0) / 1000).toFixed(1);
  console.log(`[DONE]  ${outPath} — ${(buf.length / 1024).toFixed(0)} KB in ${elapsed}s`);
  return { outPath, bytes: buf.length };
}

const results = [];
for (const { prompt, outPath } of images) {
  try {
    const r = await generateImage(prompt, outPath);
    results.push({ ...r, ok: true });
  } catch (e) {
    console.error(`[FAIL]  ${outPath}: ${e.message}`);
    results.push({ outPath, ok: false, error: e.message });
  }
}

console.log('\n=== Summary ===');
for (const r of results) {
  if (r.ok) {
    console.log(`  OK  ${r.outPath} (${(r.bytes / 1024).toFixed(0)} KB)`);
  } else {
    console.log(`  FAIL ${r.outPath}: ${r.error}`);
  }
}
const ok = results.filter(r => r.ok).length;
console.log(`\n${ok}/${results.length} images generated successfully.`);
