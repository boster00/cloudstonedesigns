import Link from "next/link";

export const metadata = {
  title: "Design Guide",
  description:
    "The visual and editorial system that shapes every page of cloudstonedesigns.com — palette, typography, components, voice.",
};

type Swatch = { token: string; hex: string; role: string; ink?: "light" | "dark" };

const swatches: Swatch[] = [
  { token: "primary", hex: "#0a0a0a", role: "Headings, body text, dark surfaces", ink: "light" },
  { token: "bg", hex: "#FFFFFF", role: "Page background — pure white", ink: "dark" },
  { token: "surface", hex: "#F5F5F5", role: "Subtle fills, image placeholders", ink: "dark" },
  { token: "neutral-mid", hex: "#666666", role: "Secondary text, meta", ink: "light" },
  { token: "accent (CJGEO only)", hex: "#8B7355", role: "Reserved for article body chrome", ink: "light" },
];

function Section({
  number,
  eyebrow,
  title,
  intro,
  children,
}: {
  number: string;
  eyebrow: string;
  title: string;
  intro?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-[#eee] pt-16 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-12 gap-8 mb-10">
          <div className="col-span-12 md:col-span-3">
            <p
              className="text-[11px] font-semibold tracking-[0.22em] uppercase text-black"
              style={{ fontFamily: "var(--font-sans-display)" }}
            >
              <span className="text-[#999] mr-3">{number}</span>
              {eyebrow}
            </p>
          </div>
          <div className="col-span-12 md:col-span-9">
            <h2
              className="text-[28px] md:text-[40px] font-bold tracking-[-0.02em] text-black leading-tight"
              style={{ fontFamily: "var(--font-sans-display)" }}
            >
              {title}
            </h2>
            {intro ? (
              <p className="mt-4 text-[#555] max-w-2xl leading-relaxed">{intro}</p>
            ) : null}
          </div>
        </div>
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-start-4 md:col-span-9">{children}</div>
        </div>
      </div>
    </section>
  );
}

export default function DesignGuidePage() {
  return (
    <div style={{ fontFamily: "var(--font-sans)" }}>
      {/* Hero */}
      <section className="px-6 pt-24 pb-24 md:pt-32 md:pb-32 bg-white">
        <div className="max-w-6xl mx-auto">
          <p
            className="text-[11px] font-semibold tracking-[0.22em] uppercase text-black mb-6"
            style={{ fontFamily: "var(--font-sans-display)" }}
          >
            Design Guide · v2
          </p>
          <h1
            className="text-[48px] md:text-[80px] font-bold text-black leading-[1.02] tracking-[-0.025em] max-w-4xl mb-8"
            style={{ fontFamily: "var(--font-sans-display)" }}
          >
            The system, as quietly as it can be expressed.
          </h1>
          <p className="text-[17px] text-[#555] max-w-xl leading-relaxed">
            Minimal, photography-led. White ground, near-black ink, one sans-serif. The
            warm-stone palette is reserved for adopted CJGEO article bodies; native chrome
            stays quiet so projects speak.
          </p>
        </div>
      </section>

      {/* 01 Palette */}
      <Section
        number="01"
        eyebrow="Palette"
        title="White, near-black, one gray."
        intro="The chrome is intentionally narrow. Photography supplies the color."
      >
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {swatches.map((s) => (
            <div key={s.token} className="border border-[#eee]">
              <div
                className="aspect-[4/3] flex items-end p-4"
                style={{
                  backgroundColor: s.hex,
                  color: s.ink === "light" ? "#FFFFFF" : "#0a0a0a",
                }}
              >
                <span className="text-sm font-mono">{s.hex}</span>
              </div>
              <div className="px-4 py-3 bg-white">
                <p
                  className="text-[11px] tracking-[0.18em] uppercase text-black font-semibold mb-1"
                  style={{ fontFamily: "var(--font-sans-display)" }}
                >
                  {s.token}
                </p>
                <p className="text-sm text-[#666] leading-snug">{s.role}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* 02 Typography */}
      <Section
        number="02"
        eyebrow="Typography"
        title="Inter, in two weights."
        intro="Bold (700) for display and CAPS labels. Regular / light for body. No serif in native chrome — Cormorant Garamond stays imported only for CJGEO-scoped article bodies."
      >
        <div className="space-y-10">
          <div>
            <p
              className="text-[11px] tracking-[0.18em] uppercase text-black mb-3 font-semibold"
              style={{ fontFamily: "var(--font-sans-display)" }}
            >
              Display · Inter Bold · 80px
            </p>
            <p
              className="text-[64px] md:text-[80px] font-bold leading-[1.02] tracking-[-0.02em] text-black"
              style={{ fontFamily: "var(--font-sans-display)" }}
            >
              Vale Studio
            </p>
          </div>
          <div>
            <p
              className="text-[11px] tracking-[0.18em] uppercase text-black mb-3 font-semibold"
              style={{ fontFamily: "var(--font-sans-display)" }}
            >
              H2 · Inter Bold · 40px
            </p>
            <p
              className="text-[40px] font-bold tracking-[-0.02em] text-black"
              style={{ fontFamily: "var(--font-sans-display)" }}
            >
              A studio designing at the pace of its projects.
            </p>
          </div>
          <div>
            <p
              className="text-[11px] tracking-[0.18em] uppercase text-black mb-3 font-semibold"
              style={{ fontFamily: "var(--font-sans-display)" }}
            >
              Body · Inter Regular · 16px · line 1.75
            </p>
            <p className="text-[16px] leading-[1.75] text-[#222] max-w-[60ch]">
              Every project begins with a brief, but the brief is never the whole story. The
              work of early design is to listen carefully to what a client has said, and to
              listen — equally carefully — for what is implied beneath it.
            </p>
          </div>
          <div>
            <p
              className="text-[11px] tracking-[0.18em] uppercase text-black mb-3 font-semibold"
              style={{ fontFamily: "var(--font-sans-display)" }}
            >
              Caps label · Inter Bold · 12px · tracking 0.18em
            </p>
            <p
              className="text-[12px] font-bold tracking-[0.18em] uppercase text-black"
              style={{ fontFamily: "var(--font-sans-display)" }}
            >
              Meridian House — San Francisco, CA
            </p>
          </div>
        </div>
      </Section>

      {/* 03 Chrome rules */}
      <Section
        number="03"
        eyebrow="Chrome rules"
        title="Logo + plus. Nothing else in the top bar."
        intro="The full-screen white overlay menu is the navigation. Bottom-left big sans menu items. Bottom-right social icons. Close × where the + was."
      >
        <div className="bg-[#f5f5f5] p-10 md:p-14 border border-[#eee]">
          <p
            className="text-[11px] tracking-[0.18em] uppercase text-black mb-6 font-semibold"
            style={{ fontFamily: "var(--font-sans-display)" }}
          >
            Overlay menu vocabulary
          </p>
          <ul className="space-y-3 text-[15px] text-[#333]">
            <li>· Logo top-left in <strong>CAPS BOLD</strong> — small (15px).</li>
            <li>· Plus icon top-right rotates to × when overlay open.</li>
            <li>· Menu items bottom-left, 80px bold sans, near-black.</li>
            <li>· &ldquo;Where to Start ⌄&rdquo; expands inline above the menu stack into 3 journey columns.</li>
            <li>· Social icons bottom-right, stacked.</li>
            <li>· No nav links in the top bar. No dropdown gap to hover across.</li>
          </ul>
        </div>
      </Section>

      {/* 04 Buttons */}
      <Section
        number="04"
        eyebrow="Buttons"
        title="One CAPS link. Square outlined button if needed."
      >
        <div className="space-y-8">
          <div className="flex flex-wrap items-center gap-6">
            <a
              href="#"
              className="text-[12px] font-bold tracking-[0.18em] uppercase text-black hover:opacity-70 transition-opacity"
              style={{ fontFamily: "var(--font-sans-display)" }}
            >
              Start a Conversation →
            </a>
            <p className="text-[11px] text-[#666] tracking-wider uppercase">
              Primary · caps link · used over photography + on neutral
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-6">
            <button
              className="border border-black text-black px-8 py-3 text-[11px] tracking-[0.18em] uppercase font-bold hover:bg-black hover:text-white transition-colors"
              style={{ fontFamily: "var(--font-sans-display)" }}
            >
              View Portfolio
            </button>
            <p className="text-[11px] text-[#666] tracking-wider uppercase">
              Secondary · square outline · sparingly
            </p>
          </div>
        </div>
      </Section>

      {/* 05 Imagery */}
      <Section
        number="05"
        eyebrow="Imagery"
        title="16:9 for portfolio. Full-bleed for hero. 4:5 for portraits."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <figure>
            <div
              className="aspect-video bg-[#f5f5f5] border border-[#eee] flex items-center justify-center"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(0,0,0,0.06) 39px, rgba(0,0,0,0.06) 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(0,0,0,0.06) 39px, rgba(0,0,0,0.06) 40px)",
              }}
            >
              <span
                className="text-[11px] tracking-[0.18em] uppercase text-[#666] font-semibold"
                style={{ fontFamily: "var(--font-sans-display)" }}
              >
                16 : 9 — portfolio cell
              </span>
            </div>
          </figure>
          <figure>
            <div
              className="aspect-[4/5] bg-[#f5f5f5] border border-[#eee] flex items-center justify-center"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(0,0,0,0.06) 39px, rgba(0,0,0,0.06) 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(0,0,0,0.06) 39px, rgba(0,0,0,0.06) 40px)",
              }}
            >
              <span
                className="text-[11px] tracking-[0.18em] uppercase text-[#666] font-semibold"
                style={{ fontFamily: "var(--font-sans-display)" }}
              >
                4 : 5 — portrait
              </span>
            </div>
          </figure>
        </div>
      </Section>

      {/* Voice */}
      <Section
        number="06"
        eyebrow="Voice"
        title="Calm, expert, never urgent."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <p
              className="text-[11px] tracking-[0.18em] uppercase text-black mb-3 font-semibold"
              style={{ fontFamily: "var(--font-sans-display)" }}
            >
              Use
            </p>
            <ul className="space-y-3 text-[#222]">
              <li className="border-l-2 border-black pl-4">Every project starts with a conversation.</li>
              <li className="border-l-2 border-black pl-4">Typical ranges — your project may vary.</li>
            </ul>
          </div>
          <div>
            <p
              className="text-[11px] tracking-[0.18em] uppercase text-[#999] mb-3 font-semibold"
              style={{ fontFamily: "var(--font-sans-display)" }}
            >
              Avoid
            </p>
            <ul className="space-y-3 text-[#999]">
              <li className="border-l-2 border-[#ddd] pl-4 line-through">Get a free quote in minutes!</li>
              <li className="border-l-2 border-[#ddd] pl-4 line-through">Guaranteed delivery in six weeks.</li>
            </ul>
          </div>
        </div>
      </Section>

      {/* Colophon */}
      <section className="border-t border-[#eee] py-16 px-6 bg-[#f5f5f5]">
        <div className="max-w-6xl mx-auto">
          <p
            className="text-[11px] tracking-[0.22em] uppercase text-black mb-4 font-semibold"
            style={{ fontFamily: "var(--font-sans-display)" }}
          >
            Colophon
          </p>
          <p
            className="text-[24px] md:text-[32px] font-bold tracking-[-0.02em] text-black max-w-2xl leading-tight"
            style={{ fontFamily: "var(--font-sans-display)" }}
          >
            This page is the source of truth. When the site and this guide disagree, fix the site.
          </p>
          <p className="mt-6 text-sm text-[#666] max-w-xl leading-relaxed">
            Tokens live in <code className="text-black">app/globals.css</code>. CJGEO article chrome
            (warm-stone palette, serif H2s) is scoped under <code className="text-black">.prose-article</code> and
            is intentionally distinct from native chrome.{" "}
            <Link href="/" className="underline underline-offset-4 hover:opacity-60">
              Back to home
            </Link>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
