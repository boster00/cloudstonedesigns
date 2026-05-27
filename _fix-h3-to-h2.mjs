import { readFileSync, writeFileSync } from 'fs';

const filePath = 'C:\\Users\\xsj70\\cloudstonedesigns\\content\\starting-your-project\\comparing-architecture-approaches.html';

let html = readFileSync(filePath, 'utf8');

// h4 → h3
html = html.replace(/<h4(\s[^>]*)?>/gi, (m, attrs) => `<h3${attrs || ''}>`);
html = html.replace(/<\/h4>/gi, '</h3>');

// h3 → h2
html = html.replace(/<h3(\s[^>]*)?>/gi, (m, attrs) => `<h2${attrs || ''}>`);
html = html.replace(/<\/h3>/gi, '</h2>');

// For each <h2> lacking an id, generate slug from text content
html = html.replace(/<h2([^>]*)>([\s\S]*?)<\/h2>/gi, (match, attrs, inner) => {
  if (/\bid=/.test(attrs)) return match; // already has id
  // strip tags from inner to get text
  const text = inner.replace(/<[^>]+>/g, '').trim();
  const slug = text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .slice(0, 60);
  return `<h2 id="${slug}"${attrs}>${inner}</h2>`;
});

writeFileSync(filePath, html, 'utf8');
console.log('Done.');
