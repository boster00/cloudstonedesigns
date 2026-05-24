"use client";

import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { label: "Work", href: "/portfolio" },
  { label: "About", href: "/about" },
  { label: "People", href: "/people" },
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
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm tracking-wide text-[var(--color-primary)] hover:text-[var(--color-accent)] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-px bg-[var(--color-primary)] transition-transform ${open ? "rotate-45 translate-y-2" : ""}`}
          />
          <span
            className={`block w-6 h-px bg-[var(--color-primary)] transition-opacity ${open ? "opacity-0" : ""}`}
          />
          <span
            className={`block w-6 h-px bg-[var(--color-primary)] transition-transform ${open ? "-rotate-45 -translate-y-2" : ""}`}
          />
        </button>
      </div>

      {/* Mobile full-screen overlay */}
      {open && (
        <div className="fixed inset-0 bg-[var(--color-bg)] z-40 flex flex-col items-center justify-center gap-10 md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-serif text-3xl text-[var(--color-primary)] hover:text-[var(--color-accent)] transition-colors"
              style={{ fontFamily: "var(--font-serif)" }}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
