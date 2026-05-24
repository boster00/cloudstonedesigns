import Link from "next/link";
import ProjectGrid from "@/components/ProjectGrid";
import { projects } from "@/lib/projects";
import { pillars } from "@/lib/articles";

export default function HomePage() {
  const featuredProjects = projects.slice(0, 4);

  return (
    <div>
      {/* Hero */}
      <section className="min-h-[80vh] flex flex-col items-start justify-end px-6 md:px-16 pb-20 bg-[var(--color-surface)]">
        <div className="max-w-3xl">
          <h1
            className="text-6xl md:text-8xl font-light leading-none mb-8 text-[var(--color-primary)]"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Architecture
            <br />
            That Endures.
          </h1>
          <p className="text-lg text-[var(--color-neutral-mid)] max-w-xl mb-10 leading-relaxed">
            We design buildings and interiors that respond honestly to their site, program, and
            materials — work that improves with time rather than dating with it.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-[var(--color-primary)] text-[var(--color-bg)] px-10 py-4 text-sm tracking-widest uppercase hover:bg-[var(--color-accent)] transition-colors"
          >
            Start a Conversation
          </Link>
        </div>
      </section>

      {/* Portfolio preview */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex items-baseline justify-between mb-10">
          <h2
            className="text-3xl font-light text-[var(--color-primary)]"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Selected Work
          </h2>
          <Link
            href="/portfolio"
            className="text-sm text-[var(--color-accent)] tracking-wide hover:opacity-75 transition-opacity"
          >
            View all projects →
          </Link>
        </div>
        <ProjectGrid projects={featuredProjects} />
      </section>

      {/* Journey entry points */}
      <section className="bg-[var(--color-surface)] py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2
            className="text-3xl font-light text-[var(--color-primary)] mb-3"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Thinking Through Your Project
          </h2>
          <p className="text-[var(--color-neutral-mid)] mb-12 max-w-xl">
            Architecture projects involve more decisions than most people anticipate. These guides
            help you arrive at those decisions prepared.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pillars.map((pillar) => (
              <Link
                key={pillar.slug}
                href={`/${pillar.slug}`}
                className="group block bg-[var(--color-bg)] p-8 hover:bg-[var(--color-accent-tint)] transition-colors"
              >
                <h3
                  className="text-xl font-light mb-3 group-hover:text-[var(--color-accent)] transition-colors"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {pillar.title}
                </h3>
                <p className="text-sm text-[var(--color-neutral-mid)] leading-relaxed">
                  {pillar.teaser}
                </p>
                <p className="mt-6 text-xs tracking-widest uppercase text-[var(--color-accent)]">
                  Read the guide →
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-24 px-6 text-center">
        <h2
          className="text-4xl md:text-5xl font-light text-[var(--color-primary)] mb-6"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Ready to begin?
        </h2>
        <p className="text-[var(--color-neutral-mid)] mb-10 max-w-md mx-auto">
          Every project starts with a conversation. Tell us about yours.
        </p>
        <Link
          href="/contact"
          className="inline-block border border-[var(--color-primary)] text-[var(--color-primary)] px-10 py-4 text-sm tracking-widest uppercase hover:bg-[var(--color-primary)] hover:text-[var(--color-bg)] transition-colors"
        >
          Get in Touch
        </Link>
      </section>
    </div>
  );
}
