import type { ReactNode } from "react";

type Section = {
  id: string;
  label: string;
};

type ArticleShellProps = {
  eyebrow?: string;
  title: string;
  sections?: Section[];
  children: ReactNode;
};

export default function ArticleShell({ eyebrow, title, sections, children }: ArticleShellProps) {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="mb-12 max-w-2xl">
        {eyebrow && (
          <p className="text-xs tracking-widest uppercase text-[var(--color-accent)] mb-3">
            {eyebrow}
          </p>
        )}
        <h1
          className="text-4xl md:text-5xl font-light leading-tight"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          {title}
        </h1>
      </div>

      <div className="flex gap-16 items-start">
        {/* Main content */}
        <article className="prose-article flex-1 min-w-0">{children}</article>

        {/* Sticky TOC */}
        {sections && sections.length > 0 && (
          <aside className="hidden lg:block w-56 shrink-0 sticky top-24 self-start">
            <p className="text-xs tracking-widest uppercase text-[var(--color-neutral-mid)] mb-4">
              On this page
            </p>
            <nav className="flex flex-col gap-2">
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="text-sm text-[var(--color-neutral-mid)] hover:text-[var(--color-accent)] transition-colors leading-snug"
                >
                  {s.label}
                </a>
              ))}
            </nav>
          </aside>
        )}
      </div>
    </div>
  );
}
