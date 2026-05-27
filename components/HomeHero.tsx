"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Project } from "@/lib/projects";

type Props = { projects: Project[] };

export default function HomeHero({ projects }: Props) {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (projects.length <= 1) return;
    const id = setInterval(() => setI((n) => (n + 1) % projects.length), 6000);
    return () => clearInterval(id);
  }, [projects.length]);

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black -mt-16">
      {projects.map((p, idx) => (
        <img
          key={p.slug}
          src={p.imageSrc}
          alt={p.title}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-[1500ms]"
          style={{ opacity: idx === i ? 1 : 0 }}
        />
      ))}
      {/* Subtle bottom gradient for legibility */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/55 via-black/15 to-transparent pointer-events-none" />

      {/* Bottom-left: project info */}
      <div className="absolute left-6 md:left-10 bottom-10 md:bottom-14 max-w-xl text-white">
        <Link
          href={`/portfolio/${projects[i].slug}`}
          className="block group"
        >
          <h1
            className="text-[40px] md:text-[56px] font-bold leading-[1.02] tracking-[-0.02em] group-hover:opacity-80 transition-opacity"
            style={{ fontFamily: "var(--font-sans-display)" }}
          >
            {projects[i].title}
          </h1>
          <p
            className="mt-2 text-[14px] md:text-[16px] font-light tracking-wide opacity-90"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            {projects[i].category} · {projects[i].location}
          </p>
        </Link>
      </div>

      {/* Bottom-right: CTA */}
      <Link
        href="/contact"
        className="absolute right-6 md:right-10 bottom-10 md:bottom-14 text-white text-[12px] md:text-[13px] font-semibold tracking-[0.18em] uppercase hover:opacity-70 transition-opacity"
        style={{ fontFamily: "var(--font-sans-display)" }}
      >
        Start a conversation →
      </Link>

      {/* Slide indicators (very subtle, top-right) */}
      <div className="absolute top-24 right-6 md:right-10 flex flex-col gap-2">
        {projects.map((p, idx) => (
          <button
            key={p.slug}
            type="button"
            onClick={() => setI(idx)}
            aria-label={`Show ${p.title}`}
            className="w-2 h-2 rounded-full transition-colors"
            style={{ background: idx === i ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.35)" }}
          />
        ))}
      </div>
    </section>
  );
}
