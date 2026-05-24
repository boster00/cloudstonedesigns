/**
 * update-articles-ts.mjs
 * Reads _cjgeo_state.json and patches articles.ts satellite entries with
 * source, cjgeoArticleId, mainKeyword, adoptedAt for each completed satellite.
 * Usage: node scripts/update-articles-ts.mjs
 */
import { readFileSync, writeFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const stateRaw = JSON.parse(readFileSync(path.join(ROOT, '_cjgeo_state.json'), 'utf8'));
const completed = stateRaw.completed ?? [];
if (completed.length === 0) {
  console.error('No completed satellites in _cjgeo_state.json');
  process.exit(1);
}

let articlesTs = readFileSync(path.join(ROOT, 'lib', 'articles.ts'), 'utf8');

for (const sat of completed) {
  const { slug, articleId, mainKeyword } = sat;
  console.log(`Patching: ${slug} (${articleId})`);

  // Find the satellite entry block and add cjgeo fields if not present
  // Look for the slug entry and inject source/cjgeoArticleId/mainKeyword/adoptedAt
  // Pattern: match the satellite object containing this slug
  const slugPattern = new RegExp(
    `(\\{[^{}]*slug:\\s*'${slug}'[^{}]*)\\}`,
    's'
  );

  const match = articlesTs.match(slugPattern);
  if (!match) {
    console.warn(`  Could not find slug entry for: ${slug}`);
    continue;
  }

  const existing = match[0];

  // Check if already has source: 'cjgeo'
  if (existing.includes("source: 'cjgeo'")) {
    console.log(`  Already patched: ${slug}`);
    continue;
  }

  // Append cjgeo fields before closing brace
  const patched = existing.replace(/\}$/,
    `  source: 'cjgeo',\n        cjgeoArticleId: '${articleId}',\n        mainKeyword: '${mainKeyword}',\n        adoptedAt: '2026-05-23',\n      }`
  );

  articlesTs = articlesTs.replace(existing, patched);
  console.log(`  Patched OK`);
}

writeFileSync(path.join(ROOT, 'lib', 'articles.ts'), articlesTs, 'utf8');
console.log('\narticles.ts updated.');
