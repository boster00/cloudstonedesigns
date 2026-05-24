import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { sanitizeCJGEO } from '../lib/sanitize-cjgeo.mjs';

const raw = readFileSync('_cjgeo_raw.html', 'utf8');
const { html, headings, wordCount } = sanitizeCJGEO(raw);
const header = `<!--\n  CJGEO-generated article body.\n  article_id: ${process.env.ARTICLE_ID}\n  main_keyword: architecture project feasibility\n  adopted_at: 2026-05-23\n-->\n`;
mkdirSync('content/starting-your-project', { recursive: true });
writeFileSync('content/starting-your-project/is-my-project-feasible.html', header + html, 'utf8');
console.log(JSON.stringify({ wordCount, headings }));
