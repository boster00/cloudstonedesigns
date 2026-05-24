"use client";

import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { label: "Work", href: "/portfolio" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/starting-your-project" },
  { label: "Contact", href: "/contact" },
];

export default function SiteNav() {
  const [open, setOpen] = useState(false);

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
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm tracking-widest uppercase text-[var(--color-primary)] hover:text-[var(--color-accent)] transition-colors"
            >
              {link.label}
            </Link>
          ))}
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
        <div className="fixed inset-0 bg-[var(--color-bg)] z-40 flex flex-col md:hidden">
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
          <nav className="flex flex-col items-center justify-center flex-1 gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-serif text-4xl text-[var(--color-primary)] hover:text-[var(--color-accent)] transition-colors"
                style={{ fontFamily: "var(--font-serif)" }}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Footer hint */}
          <p className="text-center text-xs tracking-widest uppercase text-[var(--color-neutral-mid)] pb-10">
            studio@cloudstonedesigns.com
          </p>
        </div>
      )}
    </header>
  );
}
