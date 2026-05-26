// Re-adopt a single CJGEO article into cloudstonedesigns content files.
// Mirrors [SB:BryanBlog->reAdoptCJGEO] for cloudstonedesigns: pulls current
// content_html from CJGEO, sanitizes via sanitize-cjgeo, writes to disk.
//
// GET /api/cjgeo-readopt/[id]
//
// Looks up {slug, pillarSlug, mainKeyword} from lib/articles.ts by cjgeoArticleId.
// Returns { ok, slug, pillarSlug, rawLen, sanitizedLen, h2Count, wordCount, headings }.

import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { pillars } from "@/lib/articles";
// @ts-expect-error — sanitize-cjgeo is .mjs without types
import { sanitizeCJGEO } from "@/lib/sanitize-cjgeo.mjs";

const CJGEO_BASE = "https://cjgeoai.com";

export async function GET(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const url = new URL(req.url);
  const rawMode = url.searchParams.get("raw") === "1";
  const apiKey = process.env.CJGEO_API_KEY;
  if (!apiKey) return NextResponse.json({ ok: false, error: "CJGEO_API_KEY not set" }, { status: 500 });

  // Find article meta from articles.ts
  let meta: { slug: string; pillarSlug: string; mainKeyword?: string } | null = null;
  for (const p of pillars) {
    const sat = p.satellites.find((s) => s.cjgeoArticleId === id);
    if (sat) { meta = { slug: sat.slug, pillarSlug: sat.pillarSlug, mainKeyword: sat.mainKeyword }; break; }
  }
  if (!meta) return NextResponse.json({ ok: false, error: `articleId ${id} not in articles.ts` }, { status: 404 });

  // Pull content_html from CJGEO
  let raw = "";
  try {
    const res = await fetch(`${CJGEO_BASE}/api/articles/${id}`, {
      method: "POST",
      headers: { "x-api-key": apiKey, "Content-Type": "application/json" },
      body: JSON.stringify({ action: "get_html" }),
    });
    if (!res.ok) {
      const t = await res.text();
      return NextResponse.json({ ok: false, error: `CJGEO ${res.status}: ${t.slice(0, 200)}` }, { status: 502 });
    }
    const data = await res.json();
    raw = data.content_html || "";
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: `fetch failed: ${e.message}` }, { status: 502 });
  }

  if (raw.length < 500) {
    return NextResponse.json({ ok: false, error: `content_html too short (${raw.length})`, rawLen: raw.length }, { status: 422 });
  }

  // Sanitize (skipped in raw mode — raw mode preserves CJGEO's hero/section chrome
  // AND scopes CJGEO's <style> block per-article so each carries its own design.
  let sanitized: { html: string; headings: { id: string; text: string }[]; wordCount: number };
  if (rawMode) {
    const scopeCls = `article-${meta.slug}`;
    const scopePrefix = `.${scopeCls}`;
    // Extract style block
    const styleMatch = raw.match(/<style[^>]*>([\s\S]*?)<\/style>/i);
    const styleSrc = styleMatch ? styleMatch[1] : "";
    const htmlNoStyle = raw.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "");
    // Transform style: scope every selector under scopePrefix
    function scopeCss(css: string): string {
      // Drop site-chrome rules (selectors involving html, body, .site-header, .site-footer, header, footer, nav at root)
      // Naive: split rules by closing brace
      const out: string[] = [];
      let i = 0;
      while (i < css.length) {
        // Find next opening brace
        const openIdx = css.indexOf("{", i);
        if (openIdx < 0) break;
        // Find matching closing brace (handles nested @media etc.)
        let depth = 1; let j = openIdx + 1;
        while (j < css.length && depth > 0) {
          if (css[j] === "{") depth++;
          else if (css[j] === "}") depth--;
          j++;
        }
        const sel = css.slice(i, openIdx).trim();
        const body = css.slice(openIdx + 1, j - 1);
        i = j;
        if (!sel) continue;
        // @-rules: @media / @keyframes / @font-face etc — recurse for @media
        if (sel.startsWith("@")) {
          if (sel.startsWith("@media") || sel.startsWith("@supports")) {
            out.push(`${sel} { ${scopeCss(body)} }`);
          } else {
            // @keyframes / @font-face / @import — keep as-is (these are global by design)
            out.push(`${sel} { ${body} }`);
          }
          continue;
        }
        // Drop chrome selectors
        const selectors = sel.split(",").map(s => s.trim()).filter(Boolean);
        const kept: string[] = [];
        for (const s of selectors) {
          const lower = s.toLowerCase();
          // Drop top-level html/body/site-chrome rules
          if (/^(html|body|:root|\*|\s*\*::?(before|after))\b/.test(lower)) continue;
          if (/\.(site-header|site-footer|site-nav|site-wrap)\b/.test(lower)) continue;
          // Replace :host > .editorContent and :host with scope
          let scoped = s.replace(/:host\s*>\s*\.editorContent/g, scopePrefix)
                        .replace(/:host\b/g, scopePrefix);
          // If selector still doesn't contain the scope, prefix it
          if (!scoped.includes(scopePrefix)) {
            scoped = `${scopePrefix} ${scoped}`;
          }
          kept.push(scoped);
        }
        if (kept.length === 0) continue;
        out.push(`${kept.join(", ")} { ${body} }`);
      }
      return out.join("\n");
    }
    const scopedStyle = styleSrc ? `<style data-cjgeo-scoped="${scopeCls}">${scopeCss(styleSrc)}</style>\n` : "";
    // Wrap the body in a scoped wrapper class so the styles apply (added via wrapper, not via DOM mutation)
    const wrappedHtml = `${scopedStyle}<div class="${scopeCls}">${htmlNoStyle}</div>`;
    const headings = Array.from(wrappedHtml.matchAll(/<h2[^>]*id="([^"]+)"[^>]*>([\s\S]*?)<\/h2>/g))
      .map(([, hid, text]) => ({ id: hid, text: text.replace(/<[^>]+>/g, "").trim() }));
    sanitized = { html: wrappedHtml, headings, wordCount: htmlNoStyle.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length };
  } else {
    try {
      sanitized = sanitizeCJGEO(raw, { strictAnchors: false });
    } catch (e: any) {
      return NextResponse.json({ ok: false, error: `sanitize failed: ${e.message}` }, { status: 500 });
    }
  }

  // Post-sanitize fixup: if zero h2s but h3s exist, promote h3→h2 + inject ids.
  // CJGEO sometimes emits articles with only h3-level headings; ArticleShell's TOC
  // reads h2s for nav, so promotion is needed to keep TOC populated.
  if (sanitized.headings.length === 0 && /<h3[\s>]/.test(sanitized.html)) {
    const slugify = (s: string) =>
      s.toLowerCase().replace(/<[^>]+>/g, "").replace(/&[a-z]+;/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 80);
    const newHeadings: { id: string; text: string }[] = [];
    sanitized.html = sanitized.html.replace(/<h3([^>]*)>([\s\S]*?)<\/h3>/g, (_m, attrs: string, inner: string) => {
      const text = inner.replace(/<[^>]+>/g, "").trim();
      const id = slugify(text);
      newHeadings.push({ id, text });
      const cleanedAttrs = attrs.replace(/\sid="[^"]*"/g, "");
      return `<h2${cleanedAttrs} id="${id}">${inner}</h2>`;
    });
    sanitized.headings = newHeadings;
  }

  // Write to content/<pillarSlug>/<slug>.html
  const header = `<!--\n  CJGEO-generated article body (re-adopted via /api/cjgeo-readopt).\n  article_id: ${id}\n  main_keyword: ${meta.mainKeyword || ""}\n  adopted_at: ${new Date().toISOString()}\n-->\n`;
  const outDir = path.join(process.cwd(), "content", meta.pillarSlug);
  await fs.mkdir(outDir, { recursive: true });
  const outPath = path.join(outDir, `${meta.slug}.html`);
  await fs.writeFile(outPath, header + sanitized.html, "utf8");

  return NextResponse.json({
    ok: true,
    articleId: id,
    slug: meta.slug,
    pillarSlug: meta.pillarSlug,
    rawLen: raw.length,
    sanitizedLen: sanitized.html.length,
    h2Count: sanitized.headings.length,
    wordCount: sanitized.wordCount,
    headings: sanitized.headings.map((h) => h.text).slice(0, 12),
    writtenTo: `content/${meta.pillarSlug}/${meta.slug}.html`,
  });
}
