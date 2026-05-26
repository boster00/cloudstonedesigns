/**
 * hydrate-starting-your-project.mjs
 * Runs CJGEO pipeline for the 8 remaining satellites of starting-your-project.
 * Saves state to _cjgeo_state.json after each satellite.
 * Usage: node scripts/hydrate-starting-your-project.mjs
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { sanitizeCJGEO } from '../lib/sanitize-cjgeo.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

// Read API key
const envPath = 'C:/Users/xsj70/GuildOS/.env.local';
const env = readFileSync(envPath, 'utf8');
const CJGEO_API_KEY = env.match(/^CJGEO_API_KEY=(.+)$/m)?.[1]?.trim();
if (!CJGEO_API_KEY) throw new Error('Missing CJGEO_API_KEY');

const BASE = 'https://cjgeoai.com';
const H = { 'x-api-key': CJGEO_API_KEY, 'Content-Type': 'application/json' };

const STATE_PATH = path.join(ROOT, '_cjgeo_state.json');

function loadState() {
  if (existsSync(STATE_PATH)) {
    const raw = JSON.parse(readFileSync(STATE_PATH, 'utf8'));
    // Handle legacy format (old schema from previous run)
    if (Array.isArray(raw.completed)) return raw;
    // Legacy format — ignore it, start fresh
    return { completed: [], inProgress: null };
  }
  return { completed: [], inProgress: null };
}

function saveState(state) {
  writeFileSync(STATE_PATH, JSON.stringify(state, null, 2), 'utf8');
}

async function api(method, url, body) {
  const res = await fetch(url, {
    method, headers: H,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const t = await res.text();
    throw new Error(`HTTP ${res.status} ${method} ${url}: ${t.slice(0, 300)}`);
  }
  return res.json();
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const SATELLITES = [
  {
    slug: 'do-i-need-an-architect',
    title: 'Do I Actually Need an Architect for This?',
    keyword: 'do I need an architect',
    fallbackKeyword: 'hiring an architect',
    context_prompt: 'Cloudstone Designs architecture studio. Audience: homeowners and developers unsure whether to hire a licensed architect vs. a designer, contractor, or design-build firm. Journey: Scenario 1, Stage 2 (Possibility). Tone: calm, expert, honest — address real cost/complexity tradeoffs. Cover: when architects are legally required, when they add value even when not required, what you lose without one on complex projects, how to evaluate your project\'s complexity. Soft CTA toward a free project conversation.',
  },
  {
    slug: 'how-to-evaluate-architecture-information-online',
    title: 'How Do I Know Which Architecture Advice to Trust?',
    keyword: 'how to find reliable architecture advice',
    fallbackKeyword: 'architecture advice online',
    context_prompt: 'Cloudstone Designs. Audience: people overwhelmed by conflicting information from Pinterest, Reddit, contractor sales pitches, and online forums about architecture and home design. Journey: Scenario 1, Stage 3 (Information Validation). Cover: why architecture advice online is often context-free and misleading, how to evaluate sources, what questions only a licensed architect can answer reliably, red flags in contractor-sourced design advice. Tone: reassuring and grounding. Soft CTA.',
  },
  {
    slug: 'what-are-my-options-for-my-project',
    title: 'What Are My Options When Starting an Architecture Project?',
    keyword: 'architecture project options',
    fallbackKeyword: 'architecture project delivery methods',
    context_prompt: 'Cloudstone Designs. Audience: project owners at the beginning of a design process who don\'t know the full range of delivery methods (design-bid-build, design-build, CM at risk, etc.) or service scopes. Journey: Scenario 1, Stage 4 (Option Framing). Cover: the main project delivery methods, how architect involvement varies by method, when full-service architecture makes sense vs. limited-scope, what each option costs in terms of fees and risk. Tone: educational, clear. Soft CTA.',
  },
  {
    slug: 'comparing-architecture-approaches',
    title: "What's the Difference Between These Architecture Options?",
    keyword: 'architecture firm vs design build',
    fallbackKeyword: 'architecture design build comparison',
    context_prompt: 'Cloudstone Designs. Audience: homeowners or developers who have narrowed to 2-3 options (full-service architect, design-build, architect for permit drawings only) and need help comparing them clearly. Journey: Scenario 1, Stage 5 (Comparison). Cover: real tradeoffs between full-service architecture, design-build, and limited-scope engagements — cost, control, quality, timeline, who owns what decisions. Tone: objective, not self-serving. Acknowledge when design-build is the right choice. Soft CTA.',
  },
  {
    slug: 'common-mistakes-when-starting-an-architecture-project',
    title: 'What Mistakes Do People Regret When Starting an Architecture Project?',
    keyword: 'architecture project mistakes to avoid',
    fallbackKeyword: 'architecture project planning mistakes',
    context_prompt: 'Cloudstone Designs. Audience: people about to start a project who want to avoid common pitfalls. Journey: Scenario 1, Stage 6 (Risk Evaluation). Cover: the 6-8 most common and costly mistakes (starting with contractor before design is complete, underbudgeting for fees, not checking zoning, skipping schematic design, rushing to construction documents, choosing architect based on fee alone). Tone: frank, practical, experienced. Soft CTA.',
  },
  {
    slug: 'what-happens-during-the-architecture-process',
    title: 'What Actually Happens During an Architecture Project, Step by Step?',
    keyword: 'architecture design process steps',
    fallbackKeyword: 'architecture project phases',
    context_prompt: 'Cloudstone Designs. Audience: first-time clients who have no mental model of what working with an architect actually looks like from kickoff to certificate of occupancy. Journey: Scenario 1, Stage 7 (Process Clarity). Cover: the standard phases (pre-design/feasibility, schematic design, design development, construction documents, permitting, construction administration), what the client does at each phase, what deliverables to expect, how long each phase takes. Tone: reassuring, demystifying. Soft CTA.',
  },
  {
    slug: 'how-to-choose-an-architecture-firm',
    title: 'How Do I Choose the Right Architecture Firm?',
    keyword: 'how to choose an architecture firm',
    fallbackKeyword: 'selecting architecture firm',
    context_prompt: 'Cloudstone Designs. Audience: people actively evaluating 2-4 firms, feeling uncertain about how to distinguish between them. Journey: Scenario 1, Stage 8 (Vendor Selection). Cover: what to look for in portfolio (not just aesthetics — look for projects similar in scale/complexity/type), how to read a firm\'s process, what questions to ask in interviews, red flags (firms that don\'t ask about your budget, firms that over-promise timelines), how to evaluate proposals. Tone: practical, experienced advisor. Moderate CTA.',
  },
  {
    slug: 'how-to-prepare-for-first-architecture-consultation',
    title: 'What Should I Prepare Before My First Architecture Consultation?',
    keyword: 'preparing for first architecture meeting',
    fallbackKeyword: 'first architecture consultation preparation',
    context_prompt: 'Cloudstone Designs. Audience: people who have decided to contact an architect and want to make the most of the first meeting. Journey: Scenario 1, Stage 9 (Action). Cover: what information to gather (site details, program/wish list, budget range, timeline, existing conditions), what documents are helpful (survey, title, existing drawings), what questions to prepare, what a good first meeting looks like, what to expect from a Cloudstone Designs initial consultation. Tone: warm, actionable, welcoming. Strong CTA — this is the conversion moment.',
  },
];

async function runFullAuto(articleId, type, keyword, fallbackKeyword) {
  console.log(`  ${type}FullAuto with keyword: "${keyword}"`);
  const endpoint = type === 'keyword'
    ? `${BASE}/api/articles/${articleId}/keyword`
    : `${BASE}/api/articles/${articleId}/topic`;

  let res = await api('POST', endpoint, {});
  let kept = res?.summary?.kept ?? 0;
  console.log(`  kept=${kept}`);

  if (kept === 0 && fallbackKeyword) {
    console.log(`  kept=0, retrying with fallback keyword: "${fallbackKeyword}"`);
    // Set new main keyword first for keyword step
    if (type === 'keyword') {
      await api('POST', `${BASE}/api/articles/${articleId}/keyword`, {
        action: 'set_main_keyword',
        main_keyword: fallbackKeyword,
      });
    }
    res = await api('POST', endpoint, {});
    kept = res?.summary?.kept ?? 0;
    console.log(`  kept after fallback=${kept}`);
  }

  return kept;
}

async function pollDraft(articleId) {
  const MAX_POLLS = 20;
  for (let i = 0; i < MAX_POLLS; i++) {
    if (i > 0) await sleep(90 * 1000);
    console.log(`  Poll ${i + 1}/${MAX_POLLS} (${i * 90}s elapsed)...`);
    const res = await api('POST', `${BASE}/api/articles/${articleId}/edit-draft`, { action: 'pull_status' });
    const status = res?.status ?? res?.draft_status;
    console.log(`  draft status: ${status}`);
    if (status === 'ready' || status === 'adopted' || status === 'complete' || status === 'done') {
      return { ok: true, status };
    }
    if (status === 'error') {
      return { ok: false, status: 'error' };
    }
  }
  return { ok: false, status: 'timeout' };
}

async function processSatellite(sat) {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`SATELLITE: ${sat.slug}`);
  console.log(`${'='.repeat(60)}`);

  // Step 1 — Create article
  console.log('Step 1: Create article');
  const created = await api('POST', `${BASE}/api/v1/articles`, {
    title: sat.title,
    keyword: sat.keyword,
    create: true,
  });
  const articleId = created.article_id ?? created.id ?? created._id;
  if (!articleId) throw new Error(`No article_id returned: ${JSON.stringify(created).slice(0,200)}`);
  console.log(`  article_id: ${articleId}`);

  // Step 2 — Set main keyword
  console.log('Step 2: Set main keyword');
  await api('POST', `${BASE}/api/articles/${articleId}/keyword`, {
    action: 'set_main_keyword',
    main_keyword: sat.keyword,
  });

  // Step 3 — keywordFullAuto
  console.log('Step 3: keywordFullAuto');
  await runFullAuto(articleId, 'keyword', sat.keyword, sat.fallbackKeyword);

  // Step 4 — topicFullAuto
  console.log('Step 4: topicFullAuto');
  await runFullAuto(articleId, 'topic', sat.keyword, sat.fallbackKeyword);

  // Step 5 — Gate check
  console.log('Step 5: gate check (get_assets)');
  const assetsRes = await api('POST', `${BASE}/api/articles/${articleId}`, { action: 'get_assets' });
  // get_assets may nest under .data or .assets — try both
  const assets = assetsRes?.data ?? assetsRes?.assets ?? assetsRes ?? {};
  const mainKw = assets?.main_keyword ?? assets?.mainKeyword ?? assetsRes?.main_keyword;
  const keywords = assets?.keywords ?? assetsRes?.keywords ?? [];
  const topics = assets?.topics ?? assetsRes?.topics ?? [];
  console.log(`  main_keyword: ${mainKw}, keywords: ${Array.isArray(keywords) ? keywords.length : 0}, topics: ${Array.isArray(topics) ? topics.length : 0}`);
  // Soft-warn only — full_auto steps above already confirmed kept>0
  if (!mainKw) console.warn('  WARN: main_keyword missing from get_assets — proceeding (full_auto confirmed kept>0)');

  // Step 6 — generateDraft
  console.log('Step 6: generateDraft');
  await api('POST', `${BASE}/api/articles/${articleId}/edit-draft`, {
    action: 'generate_draft',
    mode: 'full',
    allow_image_generation: false,
    use_default_context_prompt: false,
    context_prompt: sat.context_prompt,
    generation_prompt_mode: 'default',
  });

  // Step 7 — pollDraft
  console.log('Step 7: pollDraft');
  let pollResult = await pollDraft(articleId);
  if (!pollResult.ok && pollResult.status === 'error') {
    console.log('  Error status — re-triggering generateDraft');
    await api('POST', `${BASE}/api/articles/${articleId}/edit-draft`, {
      action: 'generate_draft',
      mode: 'full',
      allow_image_generation: false,
      use_default_context_prompt: false,
      context_prompt: sat.context_prompt,
      generation_prompt_mode: 'default',
    });
    pollResult = await pollDraft(articleId);
  }
  if (!pollResult.ok) {
    throw new Error(`Draft did not complete: ${pollResult.status}`);
  }

  // Step 8 — adoptDraft (adopt_draft response does NOT include content_html — get_html separately)
  console.log('Step 8: adoptDraft');
  await api('POST', `${BASE}/api/articles/${articleId}/edit-draft`, { action: 'adopt_draft' });
  console.log('  adopted.');

  // Step 9 — get_html (this is the actual content)
  console.log('Step 9: get_html');
  const htmlRes = await api('POST', `${BASE}/api/articles/${articleId}`, { action: 'get_html' });
  const rawHtml = htmlRes.content_html ?? '';
  console.log(`  raw html length: ${rawHtml.length}`);
  if (rawHtml.length < 500) throw new Error(`get_html: content_html too short (${rawHtml.length})`);

  // Step 10 — Sanitize and write file
  console.log('Step 10: sanitize + write');
  const { html, headings, wordCount } = sanitizeCJGEO(rawHtml);
  console.log(`  word count: ${wordCount}`);
  headings.forEach((h, i) => console.log(`  ${i+1}. [${h.id}] ${h.text}`));

  const header = `<!--
  CJGEO-generated article body.
  article_id: ${articleId}
  main_keyword: ${sat.keyword}
  adopted_at: 2026-05-23
-->
`;
  const outDir = path.join(ROOT, 'content', 'starting-your-project');
  mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, `${sat.slug}.html`);
  writeFileSync(outPath, header + html, 'utf8');
  console.log(`  Written: ${outPath}`);

  return { articleId, mainKeyword: mainKw ?? sat.keyword };
}

// Main
const state = loadState();
console.log(`State: ${state.completed.length} already completed: ${state.completed.map(s => s.slug).join(', ')}`);

const results = [...state.completed];

for (const sat of SATELLITES) {
  if (state.completed.find(c => c.slug === sat.slug)) {
    console.log(`Skipping already-done: ${sat.slug}`);
    continue;
  }

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

console.log('\n\nAll 8 satellites done!');
console.log('Results:');
results.forEach(r => console.log(`  ${r.slug}: ${r.articleId} (${r.mainKeyword})`));
