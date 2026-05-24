/**
 * adopt-satellite.mjs
 * Fetches adopted draft from CJGEO, sanitizes it, and writes the content file.
 * Usage: node scripts/adopt-satellite.mjs
 */
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
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
const articleId = '80e26967-abf9-4724-aa89-575145d05a78';

async function api(method, url, body) {
  const res = await fetch(url, {
    method, headers: H,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const t = await res.text();
    throw new Error(`HTTP ${res.status}: ${t.slice(0, 300)}`);
  }
  return res.json();
}

// Step 8 — adoptDraft
console.log('=== Step 8: adoptDraft ===');
const adopted = await api('POST', `${BASE}/api/articles/${articleId}/edit-draft`, { action: 'adopt_draft' });
console.log('content_html length:', adopted.content_html?.length ?? 'MISSING');
if (!adopted.content_html || adopted.content_html.length < 500) {
  throw new Error('adoptDraft: content_html too short or missing');
}

// Step 9 — get_html
console.log('=== Step 9: get_html ===');
const htmlRes = await api('POST', `${BASE}/api/articles/${articleId}`, { action: 'get_html' });
const rawHtml = htmlRes.content_html ?? adopted.content_html;
console.log('raw html length:', rawHtml.length);

// Step 11 — Sanitize
console.log('=== Step 11: Sanitize ===');
const { html, headings, wordCount } = sanitizeCJGEO(rawHtml);
console.log('Word count:', wordCount);
console.log('Headings:');
headings.forEach((h, i) => console.log(`  ${i + 1}. [${h.id}] ${h.text}`));

// Write content file
const header = `<!--
  CJGEO-generated article body.
  article_id: ${articleId}
  main_keyword: architecture project feasibility
  adopted_at: 2026-05-23
-->
`;
const outDir = path.join(ROOT, 'content', 'starting-your-project');
mkdirSync(outDir, { recursive: true });
const outPath = path.join(outDir, 'is-my-project-feasible.html');
writeFileSync(outPath, header + html, 'utf8');
console.log('\nWritten to:', outPath);
console.log('Done.');
