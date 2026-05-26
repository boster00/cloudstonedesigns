/**
 * hydrate-project-rescue.mjs
 * Runs CJGEO pipeline for the 8 remaining satellites of project-rescue.
 * Saves state to _cjgeo_state.json after each satellite.
 * Usage: node scripts/hydrate-project-rescue.mjs
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

const STATE_PATH = path.join(ROOT, '_cjgeo_state_rescue.json');

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
    slug: 'my-architecture-project-failed',
    title: 'What Do I Do If My Architecture Project Failed?',
    keyword: 'architecture project failed',
    fallbackKeyword: 'failed architecture project what to do',
    context_prompt: 'Cloudstone Designs. Audience: people who have just experienced a project failure — contractor walked off, architect fired, permit denied, ran out of money, built the wrong thing. Emotional state: frustrated, uncertain about their next move, possibly embarrassed. Journey: Scenario 2, Stage 1 (Trigger). Cover: how to assess what actually happened vs. what appears to have happened, the most common failure modes and what they mean for recoverability, the immediate steps (stop spending, document the damage, do not sign anything new), how to tell whether rescue is viable. Tone: calm, clear-headed, experienced. This is someone\'s worst-case moment — no minimizing, no false reassurance. Soft CTA toward a rescue consultation.',
  },
  {
    slug: 'why-architecture-projects-fail',
    title: 'Why Do Architecture Projects Usually Fail?',
    keyword: 'why architecture projects fail',
    fallbackKeyword: 'architecture project failure causes',
    context_prompt: 'Cloudstone Designs. Audience: people trying to understand root causes — either after a failure or trying to avoid one. Analytical mindset, want to understand the system not just the symptoms. Journey: Scenario 2, Stage 2 (Diagnosis). Cover: the five most common failure root causes (misaligned scope/budget, inadequate documentation, contractor-architect relationship breakdown, design errors discovered in construction, client communication failure), how each failure type propagates through a project, how to distinguish fixable problems from unfixable ones. Tone: analytical, experienced, specific. No blame assigned — structural failures, not personal failures. Soft CTA.',
  },
  {
    slug: 'can-my-stalled-project-be-saved',
    title: 'Can My Stalled Architecture Project Still Be Saved?',
    keyword: 'stalled architecture project rescue',
    fallbackKeyword: 'architecture project stalled can it be saved',
    context_prompt: 'Cloudstone Designs. Audience: people with a project that has stopped — construction halted, design stuck, contractor gone, permits expired. Not sure whether to push forward, restart, or cut losses. Journey: Scenario 2, Stage 3 (Triage). Cover: how to assess recoverability (documentation completeness, permit status, contractor/architect liability, remaining budget vs. remaining scope), what a realistic rescue looks like vs. a restart, the key questions a rescue architect would ask first, what "rescue feasibility" means in practice. Tone: practical, frank, non-alarmist. Moderate CTA — rescue consultation.',
  },
  {
    slug: 'should-i-switch-architects',
    title: 'Should I Switch Architects Mid-Project?',
    keyword: 'switching architects mid project',
    fallbackKeyword: 'should I fire my architect',
    context_prompt: 'Cloudstone Designs. Audience: clients who are seriously unhappy with their current architect but not sure whether to switch. They\'ve been patient but the situation hasn\'t improved. Journey: Scenario 2, Stage 4 (Decision Point). Cover: how to evaluate whether the problem is fixable within the relationship vs. structural, the real costs of switching (documentation handoff, fee duplication, delay, contractor confusion), how to protect yourself legally before switching, what a good transition looks like, when staying is clearly the wrong choice. Tone: honest, protective of the client\'s interests, not self-serving. Acknowledge the cost of switching — don\'t oversell it. Moderate CTA.',
  },
  {
    slug: 'finding-trustworthy-architect-after-bad-experience',
    title: 'How Do I Find a Trustworthy Architect After a Bad Experience?',
    keyword: 'find trustworthy architect after bad experience',
    fallbackKeyword: 'hiring new architect after project failure',
    context_prompt: 'Cloudstone Designs. Audience: people who have been burned and are now highly skeptical. They want to engage again but are terrified of repeating the experience. High trust deficit. Journey: Scenario 2, Stage 5 (Cautious Re-engagement). Cover: how the bad experience sharpens some instincts but creates others that are counterproductive, what a genuinely trustworthy firm looks like vs. one that just markets trust well, the specific questions that expose whether a firm has learned from past client problems, how to structure an initial limited-scope engagement to test fit before full commitment, what red flags in the first meeting should cause you to walk. Tone: empathetic, experienced, honest about the difficulty of the task. Moderate CTA.',
  },
  {
    slug: 'expensive-mistakes-in-architecture-projects',
    title: 'What Are the Most Expensive Mistakes in Architecture Projects?',
    keyword: 'expensive architecture project mistakes',
    fallbackKeyword: 'costly mistakes architecture project',
    context_prompt: 'Cloudstone Designs. Audience: people who want to understand where the real financial danger zones are — either because they\'ve just experienced one or because they\'re trying to protect a new project. Journey: Scenario 2, Stage 6 (Risk Mapping). Cover: the 6-8 mistakes that consistently produce the highest financial damage — scope changes in construction documents, undocumented contractor agreements, design errors discovered post-permit, skipping geotechnical investigation, inadequate contingency, changing the design during construction, not having CA services, picking lowest-fee architect. Tone: experienced, specific, financially grounded. Soft CTA.',
  },
  {
    slug: 'what-project-transparency-should-look-like',
    title: 'What Should Good Communication Look Like on an Architecture Project?',
    keyword: 'architecture project communication transparency',
    fallbackKeyword: 'good architect client communication',
    context_prompt: 'Cloudstone Designs. Audience: clients who have experienced poor communication on a project and are trying to understand what they should have expected, or clients evaluating a new firm and wanting to know what to ask for. Journey: Scenario 2, Stage 7 (Standard Calibration). Cover: what a healthy communication rhythm looks like (meeting cadence, written summaries, decision logs, RFI process, change order process), what documentation a good architect produces at each phase, how to tell whether your current firm\'s communication is below standard, specific questions to ask in interviews to probe for communication discipline. Tone: specific, standards-based. Soft CTA.',
  },
  {
    slug: 'comparing-architecture-firms-after-bad-experience',
    title: "How Do I Compare Architecture Firms When I'm Skeptical?",
    keyword: 'compare architecture firms skeptical client',
    fallbackKeyword: 'evaluating architecture firms after bad experience',
    context_prompt: 'Cloudstone Designs. Audience: people in active vendor comparison who have been burned before and are applying heightened scrutiny. Their prior experience makes them better at spotting bad signals but sometimes worse at recognizing good ones. Journey: Scenario 2, Stage 8 (Skeptical Comparison). Cover: how to build a comparison framework that goes beyond portfolio and fee — process documentation quality, reference depth, past problem examples (how they handled them), onboarding structure, communication systems. How to ask questions that reveal character under pressure. What firms that have learned from past problems look like vs. firms that just manage perception. Tone: rigorous, practical. Moderate CTA.',
  },
  {
    slug: 'getting-second-opinion-on-architecture-project',
    title: 'How Do I Get a Second Opinion on My Architecture Project?',
    keyword: 'second opinion architecture project',
    fallbackKeyword: 'architecture project review second opinion',
    context_prompt: 'Cloudstone Designs. Audience: people who have a troubled project and want an independent assessment — either to validate their concerns or to understand their options before making a major decision. Journey: Scenario 2, Stage 9 (Validation + Action). Cover: what a second opinion engagement looks like (document review, site visit, interview with current team), what it can and cannot tell you, how to find a firm willing to do honest second-opinion work (not just one that wants to take over the project), what to do with the findings, how to present findings to your current team without blowing up the relationship prematurely. Tone: practical, ethical, specific. Strong CTA — this is the conversion moment.',
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
  const outDir = path.join(ROOT, 'content', 'project-rescue');
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

