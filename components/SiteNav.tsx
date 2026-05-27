"use client";

import Link from "next/link";
import { useState } from "react";

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
  { label: "Work", href: "/portfolio", draft: false },
  { label: "About", href: "/about", draft: true },
  { label: "Contact", href: "/contact", draft: true },
];

const socials = [
  {
    label: "Instagram",
    href: "https://instagram.com/cloudstonedesigns",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/company/cloudstonedesigns",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: "Vimeo",
    href: "https://vimeo.com/cloudstonedesigns",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 4.5c-.4 4.6-3.7 10.8-7.7 12.7-2.4 1.1-3-1.3-4.3-4.9C9.3 9.4 9 6.6 7.4 6.6c-1 0-2 .8-2.8 1.6L3 6.5c.8-.7 2.6-2.4 4.4-2.6 3-.3 4 2 4.5 5.4.4 2.6.7 5.1 1.6 5.1 1 0 3.5-3.7 3.6-5 .2-1.3-.9-1.3-1.8-1 1.4-4.4 7.9-3.6 6.7 1.6z" />
      </svg>
    ),
  },
];

export default function SiteNav() {
  const [open, setOpen] = useState(false);
  const [whereOpen, setWhereOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 bg-white">
        <div className="px-6 h-16 flex items-center justify-between">
          {/* Logo top-left, bold uppercase sans */}
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="text-[15px] font-bold tracking-[0.08em] text-black uppercase"
            style={{ fontFamily: "var(--font-sans-display)" }}
          >
            CLOUDSTONE
          </Link>

          {/* Plus / Close icon top-right */}
          <button
            type="button"
            onClick={() => {
              setOpen((v) => !v);
              setWhereOpen(false);
            }}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="relative w-8 h-8 flex items-center justify-center text-black hover:opacity-70 transition-opacity z-[60]"
          >
            <span
              className="absolute inline-block w-5 h-px bg-current transition-transform duration-300"
              style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)" }}
            />
            <span
              className="absolute inline-block w-5 h-px bg-current transition-transform duration-300"
              style={{ transform: open ? "rotate(-45deg)" : "rotate(90deg)" }}
            />
          </button>
        </div>
      </header>

      {/* Full-screen overlay menu */}
      {open && (
        <div className="fixed inset-0 bg-white z-40 overflow-y-auto">
          <div className="min-h-screen w-full pt-24 pb-12 px-6 md:px-12 flex flex-col">
            {/* Top region: the inline "Where to Start" expansion when active */}
            {whereOpen && (
              <div className="mb-12 mt-2">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
                  {journeys.map((j) => (
                    <div key={j.pillarHref}>
                      <p
                        className="text-[11px] font-semibold tracking-[0.18em] uppercase text-black mb-5"
                        style={{ fontFamily: "var(--font-sans-display)" }}
                      >
                        {j.label}
                      </p>
                      <ul className="flex flex-col gap-2.5">
                        {j.links.map((l) => (
                          <li key={l.href}>
                            <Link
                              href={l.href}
                              onClick={() => setOpen(false)}
                              className="text-[15px] text-[#333] hover:text-black transition-colors leading-snug block"
                              style={{ fontFamily: "var(--font-sans)" }}
                            >
                              {l.label}
                            </Link>
                          </li>
                        ))}
                        <li className="pt-2 mt-1">
                          <Link
                            href={j.pillarHref}
                            onClick={() => setOpen(false)}
                            className="text-[11px] tracking-[0.18em] uppercase text-black font-semibold hover:opacity-70 transition-opacity"
                            style={{ fontFamily: "var(--font-sans-display)" }}
                          >
                            View all questions →
                          </Link>
                        </li>
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Bottom-left big menu items + bottom-right socials */}
            <div className="mt-auto flex items-end justify-between gap-8 flex-wrap">
              <nav className="flex flex-col gap-1 md:gap-2">
                <button
                  type="button"
                  onClick={() => setWhereOpen((v) => !v)}
                  className="text-left text-[44px] md:text-[68px] lg:text-[80px] font-bold leading-[1.02] tracking-[-0.02em] text-black hover:opacity-70 transition-opacity flex items-baseline gap-3"
                  style={{ fontFamily: "var(--font-sans-display)" }}
                  aria-expanded={whereOpen}
                >
                  Where to Start
                  <span
                    aria-hidden
                    className="text-2xl md:text-3xl font-light transition-transform"
                    style={{ transform: whereOpen ? "rotate(180deg)" : "none" }}
                  >
                    ▾
                  </span>
                </button>
                {simpleLinks.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="text-[44px] md:text-[68px] lg:text-[80px] font-bold leading-[1.02] tracking-[-0.02em] text-black hover:opacity-70 transition-opacity"
                    style={{ fontFamily: "var(--font-sans-display)" }}
                  >
                    {l.label}
                  </Link>
                ))}
              </nav>

              {/* Socials bottom-right */}
              <div className="flex flex-col items-end gap-5 text-black">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="hover:opacity-60 transition-opacity"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
