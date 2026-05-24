export function sanitizeCJGEO(rawHtml: string, options?: {
  anchorMap?: Array<{ id: string; keywords: string[] }>;
  satelliteLinks?: Record<string, Array<{ href: string; title: string }>>;
  strictAnchors?: boolean;
}): { html: string; headings: Array<{id: string; text: string}>; wordCount: number };
