import Link from "next/link";
import type { Pillar } from "@/lib/articles";

type Props = {
  pillar: Pillar;
  intro: string;
};

export default function PillarLanding({ pillar, intro }: Props) {
  return (
    <div className="px-6 py-20" style={{ fontFamily: "var(--font-sans)" }}>
      <div className="max-w-3xl mx-auto mb-16">
        <p
          className="text-[11px] font-bold tracking-[0.22em] uppercase text-black mb-6"
          style={{ fontFamily: "var(--font-sans-display)" }}
        >
          Architecture Guide
        </p>
        <h1
          className="text-[40px] md:text-[64px] font-bold leading-[1.02] tracking-[-0.02em] text-black mb-10"
          style={{ fontFamily: "var(--font-sans-display)" }}
        >
          {pillar.title}
        </h1>
        <p className="text-[16px] leading-[1.7] text-[#444] max-w-2xl">{intro}</p>
      </div>

      {/* Dense grid of satellite titles */}
      <div className="max-w-6xl mx-auto border-t border-[#eee]">
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
          {pillar.satellites.map((satellite, i) => (
            <li
              key={satellite.slug}
              className="border-b border-[#eee]"
            >
              <Link
                href={`/${pillar.slug}/${satellite.slug}`}
                className="group flex items-start gap-6 py-7 hover:bg-[#fafafa] -mx-4 px-4 transition-colors"
              >
                <span
                  className="text-[12px] font-semibold tracking-[0.12em] text-[#999] mt-1.5 flex-shrink-0 w-8"
                  style={{ fontFamily: "var(--font-sans-display)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex-1 min-w-0">
                  <h2
                    className="text-[20px] md:text-[24px] font-bold tracking-[-0.01em] text-black leading-[1.2] mb-2 group-hover:opacity-70 transition-opacity"
                    style={{ fontFamily: "var(--font-sans-display)" }}
                  >
                    {satellite.title}
                  </h2>
                  <p className="text-[14px] leading-[1.6] text-[#666]">{satellite.teaser}</p>
                </span>
                <span
                  aria-hidden
                  className="text-[20px] text-[#999] mt-2 group-hover:translate-x-1 group-hover:text-black transition-all flex-shrink-0"
                >
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
