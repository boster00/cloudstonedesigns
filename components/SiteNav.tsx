"use client";

import Link from "next/link";
import { useRef, useState } from "react";

type Journey = {
  label: string;
  pillarHref: string;
  links: { label: string; href: string }[];
};

const journeys: Journey[] = [
  {
    label: "Planning a Project",
    pillarHref: "/starting-your-project",
    links: [
      { label: "Is my project actually feasible?", href: "/starting-your-project/is-my-project-feasible" },
      { label: "Do I need an architect?", href: "/starting-your-project/do-i-need-an-architect" },
      { label: "What are my options?", href: "/starting-your-project/what-are-my-options-for-my-project" },
      { label: "What should I expect step-by-step?", href: "/starting-your-project/what-happens-during-the-architecture-process" },
    ],
  },
  {
    label: "Project in Trouble",
    pillarHref: "/project-rescue",
    links: [
      { label: "My project failed — now what?", href: "/project-rescue/my-architecture-project-failed" },
      { label: "Why projects usually fail", href: "/project-rescue/why-architecture-projects-fail" },
      { label: "Can a stalled project be saved?", href: "/project-rescue/can-my-stalled-project-be-saved" },
      { label: "Getting a second opinion", href: "/project-rescue/getting-second-opinion-on-architecture-project" },
    ],
  },
  {
    label: "Choosing a Firm",
    pillarHref: "/choosing-an-architect",
    links: [
      { label: "How most people choose", href: "/choosing-an-architect/how-people-choose-architects" },
      { label: "How to compare firms fairly", href: "/choosing-an-architect/how-to-compare-architecture-firms-fairly" },
      { label: "Hidden costs to know", href: "/choosing-an-architect/hidden-costs-in-architecture-projects" },
      { label: "What to expect in the first meeting", href: "/choosing-an-architect/what-to-expect-from-first-architecture-meeting" },
    ],
  },
];

const simpleLinks = [
  { label: "Work (Draft Outline)", href: "/portfolio" },
  { label: "About (Draft Outline)", href: "/about" },
  { label: "Contact (Draft Outline)", href: "/contact" },
];

export default function SiteNav() {
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [expandedMobile, setExpandedMobile] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const openMega = () => {
    if (closeTimer.current) { clearTimeout(closeTimer.current); closeTimer.current = null; }
    setMenuOpen(true);
  };
  const scheduleCloseMega = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setMenuOpen(false), 150);
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-[var(--color-bg)] border-b border-[var(--color-surface)]">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="font-serif text-xl text-[var(--color-accent)] tracking-wide"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Cloudstone Designs
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-10">
          <Link
            href="/portfolio"
            className="text-sm tracking-widest uppercase text-[var(--color-primary)] hover:text-[var(--color-accent)] transition-colors"
          >
            Work <span className="text-[var(--color-neutral-mid)]">(Draft Outline)</span>
          </Link>
          <Link
            href="/about"
            className="text-sm tracking-widest uppercase text-[var(--color-primary)] hover:text-[var(--color-accent)] transition-colors"
          >
            About <span className="text-[var(--color-neutral-mid)]">(Draft Outline)</span>
          </Link>

          {/* Where to Start mega-menu trigger */}
          <div
            className="relative"
            onMouseEnter={openMega}
            onMouseLeave={scheduleCloseMega}
          >
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-haspopup="true"
              className="text-sm tracking-widest uppercase text-[var(--color-primary)] hover:text-[var(--color-accent)] transition-colors flex items-center gap-1"
            >
              Where to Start
              <span
                aria-hidden
                className="inline-block transition-transform"
                style={{ transform: menuOpen ? "rotate(180deg)" : "none" }}
              >
                ▾
              </span>
            </button>

            {menuOpen && (
              <div
                className="fixed left-0 right-0 top-16 bg-[var(--color-bg)] border-b border-[var(--color-neutral-mid)] shadow-sm"
                data-mega-menu="open"
                onMouseEnter={openMega}
                onMouseLeave={scheduleCloseMega}
              >
                {/* Invisible bridge spans the gap between the nav-row bottom and the panel */}
                <div
                  aria-hidden
                  className="absolute left-0 right-0"
                  style={{ top: "-12px", height: "12px" }}
                />
                <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-3 gap-12">
                  {journeys.map((j) => (
                    <div key={j.pillarHref}>
                      <p
                        className="font-serif text-xl text-[var(--color-accent)] mb-5 border-b border-[var(--color-surface)] pb-3"
                        style={{ fontFamily: "var(--font-serif)" }}
                      >
                        {j.label}
                      </p>
                      <ul className="flex flex-col gap-3">
                        {j.links.map((l) => (
                          <li key={l.href}>
                            <Link
                              href={l.href}
                              onClick={() => setMenuOpen(false)}
                              className="text-[0.95rem] text-[var(--color-primary)] hover:text-[var(--color-accent)] transition-colors leading-snug block"
                            >
                              {l.label}
                            </Link>
                          </li>
                        ))}
                        <li className="pt-3 mt-1 border-t border-[var(--color-surface)]">
                          <Link
                            href={j.pillarHref}
                            onClick={() => setMenuOpen(false)}
                            className="text-sm italic text-[var(--color-accent)] hover:underline inline-flex items-center gap-1"
                          >
                            View all questions <span className="text-[var(--color-neutral-mid)] not-italic">(draft outline)</span> →
                          </Link>
                        </li>
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Link
            href="/contact"
            className="text-sm tracking-widest uppercase text-[var(--color-primary)] hover:text-[var(--color-accent)] transition-colors"
          >
            Contact <span className="text-[var(--color-neutral-mid)]">(Draft Outline)</span>
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
        >
          <span className="block w-6 h-px bg-[var(--color-primary)]" />
          <span className="block w-6 h-px bg-[var(--color-primary)]" />
          <span className="block w-4 h-px bg-[var(--color-primary)]" />
        </button>
      </div>

      {/* Mobile full-screen overlay */}
      {open && (
        <div className="fixed inset-0 bg-[var(--color-bg)] z-40 flex flex-col md:hidden overflow-y-auto">
          {/* Close button */}
          <div className="flex justify-end px-6 pt-5">
            <button
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="p-2 text-[var(--color-primary)] hover:text-[var(--color-accent)] transition-colors"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>

          {/* Nav links */}
          <nav className="flex flex-col items-stretch px-8 pt-6 pb-12 gap-6">
            <Link
              href="/portfolio"
              onClick={() => setOpen(false)}
              className="font-serif text-3xl text-[var(--color-primary)] hover:text-[var(--color-accent)] transition-colors"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Work <span className="text-base text-[var(--color-neutral-mid)]">(Draft Outline)</span>
            </Link>
            <Link
              href="/about"
              onClick={() => setOpen(false)}
              className="font-serif text-3xl text-[var(--color-primary)] hover:text-[var(--color-accent)] transition-colors"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              About <span className="text-base text-[var(--color-neutral-mid)]">(Draft Outline)</span>
            </Link>

            {/* Where to Start expandable */}
            <div className="border-t border-b border-[var(--color-surface)] py-2">
              <p
                className="font-serif text-3xl text-[var(--color-primary)] py-3"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                Where to Start
              </p>
              {journeys.map((j) => {
                const isOpen = expandedMobile === j.pillarHref;
                return (
                  <div key={j.pillarHref} className="border-t border-[var(--color-surface)]">
                    <button
                      type="button"
                      onClick={() => setExpandedMobile(isOpen ? null : j.pillarHref)}
                      className="w-full flex items-center justify-between py-4 text-left"
                      aria-expanded={isOpen}
                    >
                      <span
                        className="font-serif text-xl text-[var(--color-accent)]"
                        style={{ fontFamily: "var(--font-serif)" }}
                      >
                        {j.label}
                      </span>
                      <span aria-hidden className="text-[var(--color-neutral-mid)]">
                        {isOpen ? "−" : "+"}
                      </span>
                    </button>
                    {isOpen && (
                      <ul className="flex flex-col gap-3 pb-4 pl-1">
                        {j.links.map((l) => (
                          <li key={l.href}>
                            <Link
                              href={l.href}
                              onClick={() => setOpen(false)}
                              className="text-base text-[var(--color-primary)] hover:text-[var(--color-accent)]"
                            >
                              {l.label}
                            </Link>
                          </li>
                        ))}
                        <li>
                          <Link
                            href={j.pillarHref}
                            onClick={() => setOpen(false)}
                            className="text-sm italic text-[var(--color-accent)]"
                          >
                            View all questions <span className="text-[var(--color-neutral-mid)] not-italic">(draft outline)</span> →
                          </Link>
                        </li>
                      </ul>
                    )}
                  </div>
                );
              })}
            </div>

            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="font-serif text-3xl text-[var(--color-primary)] hover:text-[var(--color-accent)] transition-colors"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Contact <span className="text-base text-[var(--color-neutral-mid)]">(Draft Outline)</span>
            </Link>
          </nav>

          {/* Footer hint */}
          <p className="text-center text-xs tracking-widest uppercase text-[var(--color-neutral-mid)] pb-10 mt-auto">
            studio@cloudstonedesigns.com
          </p>
        </div>
      )}
    </header>
  );
}
