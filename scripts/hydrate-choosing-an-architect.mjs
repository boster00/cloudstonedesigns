/**
 * hydrate-choosing-an-architect.mjs
 * CJGEO pipeline for all 8 satellites of choosing-an-architect pillar.
 * State saved to _cjgeo_state_choosing.json after each satellite.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { sanitizeCJGEO } from '../lib/sanitize-cjgeo.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const envPath = 'C:/Users/xsj70/GuildOS/.env.local';
const env = readFileSync(envPath, 'utf8');
const CJGEO_API_KEY = env.match(/^CJGEO_API_KEY=(.+)$/m)?.[1]?.trim();
if (!CJGEO_API_KEY) throw new Error('Missing CJGEO_API_KEY');

const BASE = 'https://cjgeoai.com';
const H = { 'x-api-key': CJGEO_API_KEY, 'Content-Type': 'application/json' };
const STATE_PATH = path.join(ROOT, '_cjgeo_state_choosing.json');
const PILLAR_SLUG = 'choosing-an-architect';

function loadState() {
  if (existsSync(STATE_PATH)) {
    const raw = JSON.parse(readFileSync(STATE_PATH, 'utf8'));
    if (Array.isArray(raw.completed)) return raw;
  }
  return { completed: [], inProgress: null };
}
function saveState(state) { writeFileSync(STATE_PATH, JSON.stringify(state, null, 2), 'utf8'); }

async function api(method, url, body) {
  const res = await fetch(url, { method, headers: H, body: body !== undefined ? JSON.stringify(body) : undefined });
  if (!res.ok) { const t = await res.text(); throw new Error(`HTTP ${res.status} ${method} ${url}: ${t.slice(0, 300)}`); }
  return res.json();
}
function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function runFullAuto(articleId, type, keyword, fallbackKeyword) {
  const endpoint = type === 'keyword' ? `${BASE}/api/articles/${articleId}/keyword` : `${BASE}/api/articles/${articleId}/topic`;
  let res = await api('POST', endpoint, {});
  let kept = res?.summary?.kept ?? 0;
  console.log(`  kept=${kept}`);
  if (kept === 0 && fallbackKeyword) {
    console.log(`  kept=0, retrying with fallback: "${fallbackKeyword}"`);
    if (type === 'keyword') await api('POST', `${BASE}/api/articles/${articleId}/keyword`, { action: 'set_main_keyword', main_keyword: fallbackKeyword });
    res = await api('POST', endpoint, {});
    kept = res?.summary?.kept ?? 0;
    console.log(`  kept after fallback=${kept}`);
  }
  return kept;
}

async function pollDraft(articleId) {
  for (let i = 0; i < 20; i++) {
    if (i > 0) await sleep(90 * 1000);
    console.log(`  Poll ${i+1}/20 (${i * 90}s elapsed)...`);
    const res = await api('POST', `${BASE}/api/articles/${articleId}/edit-draft`, { action: 'pull_status' });
    const status = res?.status ?? res?.draft_status;
    console.log(`  draft status: ${status}`);
    if (['ready','adopted','complete','done'].includes(status)) return { ok: true, status };
    if (status === 'error') return { ok: false, status: 'error' };
  }
  return { ok: false, status: 'timeout' };
}

async function processSatellite(sat) {
  console.log(`\n${'='.repeat(60)}\nSATELLITE: ${sat.slug}\n${'='.repeat(60)}`);
  console.log('Step 1: Create article');
  const created = await api('POST', `${BASE}/api/v1/articles`, { title: sat.title, keyword: sat.keyword, create: true });
  const articleId = created.article_id ?? created.id ?? created._id;
  if (!articleId) throw new Error(`No article_id: ${JSON.stringify(created).slice(0,200)}`);
  console.log(`  article_id: ${articleId}`);

  console.log('Step 2: Set main keyword');
  await api('POST', `${BASE}/api/articles/${articleId}/keyword`, { action: 'set_main_keyword', main_keyword: sat.keyword });

  console.log('Step 3: keywordFullAuto');
  await runFullAuto(articleId, 'keyword', sat.keyword, sat.fallbackKeyword);

  console.log('Step 4: topicFullAuto');
  await runFullAuto(articleId, 'topic', sat.keyword, sat.fallbackKeyword);

  console.log('Step 6: generateDraft');
  await api('POST', `${BASE}/api/articles/${articleId}/edit-draft`, {
    action: 'generate_draft', mode: 'full', allow_image_generation: false,
    use_default_context_prompt: false, context_prompt: sat.context_prompt, generation_prompt_mode: 'default',
  });

  console.log('Step 7: pollDraft');
  let pollResult = await pollDraft(articleId);
  if (!pollResult.ok && pollResult.status === 'error') {
    console.log('  Re-triggering generateDraft');
    await api('POST', `${BASE}/api/articles/${articleId}/edit-draft`, {
      action: 'generate_draft', mode: 'full', allow_image_generation: false,
      use_default_context_prompt: false, context_prompt: sat.context_prompt, generation_prompt_mode: 'default',
    });
    pollResult = await pollDraft(articleId);
  }
  if (!pollResult.ok) throw new Error(`Draft did not complete: ${pollResult.status}`);

  console.log('Step 8: adoptDraft');
  await api('POST', `${BASE}/api/articles/${articleId}/edit-draft`, { action: 'adopt_draft' });

  console.log('Step 9: get_html');
  const htmlRes = await api('POST', `${BASE}/api/articles/${articleId}`, { action: 'get_html' });
  const rawHtml = htmlRes.content_html ?? '';
  console.log(`  raw html length: ${rawHtml.length}`);
  if (rawHtml.length < 500) throw new Error(`get_html too short (${rawHtml.length})`);

  console.log('Step 10: sanitize + write');
  const { html, headings, wordCount } = sanitizeCJGEO(rawHtml);
  console.log(`  word count: ${wordCount}`);
  headings.forEach((h, i) => console.log(`  ${i+1}. ${h.text}`));
  const header = `<!--\n  CJGEO-generated article body.\n  article_id: ${articleId}\n  main_keyword: ${sat.keyword}\n  adopted_at: 2026-05-24\n-->\n`;
  const outDir = path.join(ROOT, 'content', PILLAR_SLUG);
  mkdirSync(outDir, { recursive: true });
  writeFileSync(path.join(outDir, `${sat.slug}.html`), header + html, 'utf8');
  return { articleId, mainKeyword: sat.keyword };
}

const SATELLITES = [
  {
    slug: 'how-people-choose-architects',
    title: 'How Do Most People Choose an Architect?',
    keyword: 'how to choose an architect',
    fallbackKeyword: 'selecting an architect for home',
    context_prompt: 'Cloudstone Designs. Audience: people who have decided they want to hire an architect but are not sure how to start. Slightly nervous, don\'t want to make a costly mistake. Journey: Scenario 3, Stage 1 (Trigger). Cover: how most people actually find and select architects (referrals, portfolio search, awards, online search), what criteria most people use vs. what criteria actually predict project success, the most common regrets in architect selection, a better framework for evaluation. Tone: honest, experienced, reassuring. Soft CTA.',
  },
  {
    slug: 'how-to-compare-architecture-firms-fairly',
    title: 'How Do I Compare Architecture Firms Without Being Misled?',
    keyword: 'how to compare architecture firms',
    fallbackKeyword: 'comparing architecture firms objectively',
    context_prompt: 'Cloudstone Designs. Audience: people comparing 2-4 firms simultaneously, trying to evaluate them fairly but unsure what actually matters. Decision anxiety is high. Journey: Scenario 3, Stage 2 (Vendor Comparison). Cover: how to create a fair comparison framework (proposal format, fee structure transparency, process documentation, reference checks, relevant project experience), how to interpret what firms show you vs. what they hide, what questions produce the most useful differentiating answers. Tone: rigorous, practical. Soft CTA.',
  },
  {
    slug: 'which-firm-fits-my-project',
    title: 'Which Architecture Firm Is Right for My Specific Project?',
    keyword: 'which architecture firm is right for me',
    fallbackKeyword: 'finding right architect for project type',
    context_prompt: 'Cloudstone Designs. Audience: people who have narrowed their shortlist and need to make a final fit decision — not just who is best in general, but who is best for this specific project type, site, budget, and client temperament. Journey: Scenario 3, Stage 3 (Fit Evaluation). Cover: how to evaluate firm-project fit (project type experience, scale match, process compatibility, communication style alignment), how to assess whether a firm\'s aesthetic range is broad enough for your vision, why the lowest-fee firm is often the worst fit. Tone: nuanced, practical. Moderate CTA.',
  },
  {
    slug: 'how-to-verify-architects-expertise',
    title: 'How Do I Verify an Architect\'s Expertise Before Hiring?',
    keyword: 'how to verify architect credentials',
    fallbackKeyword: 'checking architect license and experience',
    context_prompt: 'Cloudstone Designs. Audience: diligent clients who want to confirm what a firm says about itself. Not paranoid — just thorough. Journey: Scenario 3, Stage 4 (Proof Seeking). Cover: how to verify licensure (state board lookup), how to check project references properly (ask about problems, not just successes), what awards and publications actually signal, how to interpret a firm\'s project list critically, what a site visit to a completed project reveals. Tone: specific, methodical. Soft CTA.',
  },
  {
    slug: 'hidden-costs-in-architecture-projects',
    title: 'What Hidden Costs Should I Know Before Starting an Architecture Project?',
    keyword: 'hidden costs architecture project',
    fallbackKeyword: 'architecture project budget surprises',
    context_prompt: 'Cloudstone Designs. Audience: budget-conscious clients who want to avoid surprise costs. Worried about scope creep and unexpected fees. Journey: Scenario 3, Stage 5 (Risk Compression). Cover: the hidden costs clients consistently underestimate — consultant fees (structural, MEP, civil, landscape), permit and plan-check fees, testing and inspection costs, FF&E, contingency, owner\'s rep, project management overhead. Also cover: how to read a fee proposal for hidden exclusions, what changes cost during construction. Tone: frank, transparent. Soft CTA.',
  },
  {
    slug: 'how-long-does-architecture-project-take',
    title: 'How Long Does an Architecture Project Realistically Take?',
    keyword: 'how long does architecture project take',
    fallbackKeyword: 'architecture project timeline',
    context_prompt: 'Cloudstone Designs. Audience: clients who need to plan around a realistic timeline — they may have a move-in target, a funding window, or a business opening date. Journey: Scenario 3, Stage 6 (Logistics). Cover: realistic phase durations by project type and size (pre-design, SD, DD, CD, permitting, bidding, construction), what causes timeline slippage and how to mitigate it, the difference between architect-controlled and contractor-controlled time, what "fast-track" actually costs. Tone: honest, specific, practical. Soft CTA.',
  },
  {
    slug: 'what-to-expect-from-first-architecture-meeting',
    title: 'What Should Happen in My First Architecture Meeting?',
    keyword: 'what to expect first meeting architect',
    fallbackKeyword: 'first architecture consultation what happens',
    context_prompt: 'Cloudstone Designs. Audience: people who have scheduled or are about to schedule a first consultation — nervous about being judged, unsure how prepared they need to be. Journey: Scenario 3, Stage 7 (Commitment Readiness). Cover: what a good first meeting covers (listening to your vision, asking about site/budget/timeline, explaining their process, not pitching), what you should walk away with, what a poor first meeting looks like, how Cloudstone Designs structures its initial project conversation. Tone: warm, specific, welcoming. Moderate CTA.',
  },
  {
    slug: 'how-to-start-your-architecture-project',
    title: 'What\'s the Safest Way to Start an Architecture Project?',
    keyword: 'how to start an architecture project',
    fallbackKeyword: 'beginning architecture project safely',
    context_prompt: 'Cloudstone Designs. Audience: people ready to move forward but wanting a safe, low-risk first step. Decision anxiety is resolving — they need a clear on-ramp. Journey: Scenario 3, Stage 8 (Action). Cover: the safest first steps (feasibility study, site analysis, programming session before full fee commitment), how to structure an initial limited-scope engagement to test firm fit, what a good onboarding process looks like, how to begin with Cloudstone Designs with minimal risk and commitment. Tone: encouraging, specific, action-oriented. Strong CTA — conversion moment.',
  },
];

const state = loadState();
console.log(`State: ${state.completed.length} already completed: ${state.completed.map(s => s.slug).join(', ')}`);
const results = [...state.completed];

for (const sat of SATELLITES) {
  if (state.completed.find(c => c.slug === sat.slug)) { console.log(`Skipping: ${sat.slug}`); continue; }
  try {
    const { articleId, mainKeyword } = await processSatellite(sat);
    results.push({ slug: sat.slug, articleId, mainKeyword });
    saveState({ completed: results, inProgress: null });
    console.log(`\nSAVED state after: ${sat.slug}`);
  } catch (err) {
    console.error(`\nERROR on ${sat.slug}:`, err.message);
    saveState({ completed: results, inProgress: sat.slug, error: err.message });
    process.exit(1);
  }
}

console.log('\nAll 8 choosing-an-architect satellites done!');
results.forEach(r => console.log(`  ${r.slug}: ${r.articleId}`));
