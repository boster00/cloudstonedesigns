import Link from "next/link";

export const metadata = {
  title: "Design Guide",
  description:
    "The visual and editorial system that shapes every page of cloudstonedesigns.com — palette, typography, components, voice.",
};

/* --------------------------------------------------------------------------
 * /design-guide
 * A single-page reference for the cloudstonedesigns visual system.
 * The page itself is composed IN the system — typesetting, restraint,
 * stone palette, editorial rhythm. Read it like a small monograph,
 * not a clinical spec sheet.
 * ------------------------------------------------------------------------ */

type Swatch = { token: string; hex: string; role: string; ink?: "light" | "dark" };

const swatches: Swatch[] = [
  { token: "primary", hex: "#0D0D0C", role: "Headings, body text, dark surfaces", ink: "light" },
  { token: "accent", hex: "#8B7355", role: "CTAs, eyebrows, H2 underline, hover", ink: "light" },
  { token: "bg", hex: "#FAFAF8", role: "Page background — warm off-white", ink: "dark" },
  { token: "surface", hex: "#F0EDE8", role: "Cards, callouts, soft fills", ink: "dark" },
  { token: "neutral-mid", hex: "#A8A6A1", role: "Meta text, dividers, borders", ink: "dark" },
  { token: "accent-tint", hex: "#EDE5DA", role: "Pale stone — quiet callouts", ink: "dark" },
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
    <section className="border-t border-[var(--color-surface)] pt-20 pb-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-12 gap-8 mb-12">
          <div className="col-span-12 md:col-span-3">
            <p className="text-xs tracking-[0.2em] uppercase text-[var(--color-accent)] font-medium">
              <span className="text-[var(--color-neutral-mid)] mr-3">{number}</span>
              {eyebrow}
            </p>
          </div>
          <div className="col-span-12 md:col-span-9">
            <h2
              className="text-3xl md:text-4xl font-light text-[var(--color-primary)] leading-tight"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              {title}
            </h2>
            {intro ? (
              <p className="mt-5 text-[var(--color-neutral-mid)] max-w-2xl leading-relaxed">
                {intro}
              </p>
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
    <div>
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="px-6 pt-24 pb-24 md:pt-32 md:pb-32 bg-[var(--color-bg)]">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs tracking-[0.22em] uppercase text-[var(--color-accent)] mb-6 flex items-center gap-3">
            <span className="inline-block w-10 h-px bg-[var(--color-accent)]" />
            Design Guide · v1
          </p>
          <h1
            className="text-5xl md:text-7xl font-light text-[var(--color-primary)] leading-[1.05] max-w-3xl mb-8"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            The system, as quietly as it can be expressed.
          </h1>
          <p className="text-lg text-[var(--color-neutral-mid)] max-w-xl leading-relaxed">
            A reference for the people — and the agents — who build pages here.
            Palette, typography, components, and the voice that holds them
            together. The page itself is composed in the system it documents.
          </p>
        </div>
      </section>

      {/* ── 01 · Palette ────────────────────────────────────────── */}
      <Section
        number="01"
        eyebrow="Palette"
        title="Six warm neutrals. No bright colors."
        intro="The palette is locked. It is intentionally narrow. Photography supplies the variety; the chrome stays quiet so projects can speak."
      >
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {swatches.map((s) => (
            <div key={s.token} className="border border-[var(--color-surface)]">
              <div
                className="aspect-[4/3] flex items-end p-4"
                style={{
                  backgroundColor: s.hex,
                  color: s.ink === "light" ? "#FAFAF8" : "#0D0D0C",
                }}
              >
                <span
                  className="text-sm"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {s.hex}
                </span>
              </div>
              <div className="px-4 py-3 bg-[var(--color-bg)]">
                <p className="text-xs tracking-widest uppercase text-[var(--color-accent)] mb-1">
                  {s.token}
                </p>
                <p className="text-sm text-[var(--color-neutral-mid)] leading-snug">
                  {s.role}
                </p>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-8 text-sm text-[var(--color-neutral-mid)] italic max-w-xl">
          Tokens are defined in <code className="not-italic text-[var(--color-primary)]">app/globals.css</code>{" "}
          inside the Tailwind <code className="not-italic text-[var(--color-primary)]">@theme</code> block. Do not
          add new colors. If a third hue is tempting, the page is probably
          asking for restraint instead.
        </p>
      </Section>

      {/* ── 02 · Typography ─────────────────────────────────────── */}
      <Section
        number="02"
        eyebrow="Typography"
        title="Cormorant Garamond for what matters. DM Sans for the rest."
        intro="Two faces. Cormorant carries every voice that needs weight — titles, statements, numerals. DM Sans handles paragraphs, labels, and interface text."
      >
        <div className="space-y-12">
          <div>
            <p className="text-xs tracking-widest uppercase text-[var(--color-accent)] mb-3">
              Display · Cormorant Garamond · 300
            </p>
            <p
              className="text-6xl md:text-7xl font-light leading-[1.05] text-[var(--color-primary)]"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Architecture that endures.
            </p>
          </div>

          <div>
            <p className="text-xs tracking-widest uppercase text-[var(--color-accent)] mb-3">
              H2 · Cormorant Garamond · 400 · 2.5rem
            </p>
            <p
              className="text-4xl font-normal text-[var(--color-primary)]"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              A small studio working at a measured pace.
            </p>
          </div>

          <div>
            <p className="text-xs tracking-widest uppercase text-[var(--color-accent)] mb-3">
              H3 · Cormorant Garamond · 500 · 1.5rem
            </p>
            <p
              className="text-2xl font-medium text-[var(--color-primary)]"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Material honesty
            </p>
          </div>

          <div>
            <p className="text-xs tracking-widest uppercase text-[var(--color-accent)] mb-3">
              Body · DM Sans · 400 · 1.0625rem · line-height 1.75
            </p>
            <p className="text-[1.0625rem] leading-[1.75] text-[var(--color-primary)] max-w-[60ch]">
              Every project begins with a brief, but the brief is never the
              whole story. The work of early design is to listen carefully to
              what a client has said, and to listen — equally carefully — for
              what is implied beneath it. We try to design for the entire arc
              of a building&apos;s life, not the photograph at completion.
            </p>
          </div>

          <div>
            <p className="text-xs tracking-widest uppercase text-[var(--color-accent)] mb-3">
              Eyebrow · DM Sans · 600 · 0.72rem · tracking 0.2em
            </p>
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[var(--color-accent)]">
              Mar Vista Residence — 2024
            </p>
          </div>

          <div>
            <p className="text-xs tracking-widest uppercase text-[var(--color-accent)] mb-3">
              Caption · DM Sans · 400 · 0.85rem · italic muted
            </p>
            <p className="text-sm italic text-[var(--color-neutral-mid)]">
              South elevation, mid-construction. Hemlock rainscreen over rigid
              insulation; standing-seam zinc roof.
            </p>
          </div>
        </div>
      </Section>

      {/* ── 03 · Eyebrow + heading lockup ───────────────────────── */}
      <Section
        number="03"
        eyebrow="Lockup"
        title="The editorial eyebrow + heading pair."
        intro="A small caps eyebrow with an optional 28px rule, then a generous serif heading. This is the magazine-page motif that runs across pillar pages, articles, and section openers."
      >
        <div className="bg-[var(--color-surface)] p-12 md:p-16">
          <p className="text-xs tracking-[0.2em] uppercase text-[var(--color-accent)] mb-5 flex items-center gap-3 font-semibold">
            <span className="inline-block w-7 h-px bg-[var(--color-accent)]" />
            Choosing an architect
          </p>
          <h3
            className="text-4xl md:text-5xl font-light text-[var(--color-primary)] leading-tight max-w-2xl"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            How to read a portfolio without being misled by photography.
          </h3>
          <p className="mt-6 text-[var(--color-neutral-mid)] max-w-xl leading-relaxed">
            Project images are produced months after the architect&apos;s work is
            finished. The real signal is in what is consistent across an
            entire body of work.
          </p>
        </div>
      </Section>

      {/* ── 04 · Buttons ────────────────────────────────────────── */}
      <Section
        number="04"
        eyebrow="Buttons"
        title="Two button styles. That is the whole set."
        intro="Primary is the dark CTA. Secondary is an outlined ghost. Underlined inline links carry navigation inside prose."
      >
        <div className="space-y-10">
          <div className="flex flex-wrap items-center gap-6">
            <button className="bg-[var(--color-primary)] text-[var(--color-bg)] px-10 py-4 text-xs tracking-[0.2em] uppercase font-semibold hover:bg-[var(--color-accent)] transition-colors">
              Start a Conversation
            </button>
            <p className="text-xs text-[var(--color-neutral-mid)] tracking-wider uppercase">
              Primary · solid ink · CTA only
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-6">
            <button className="border border-[var(--color-primary)] text-[var(--color-primary)] px-10 py-4 text-xs tracking-[0.2em] uppercase font-semibold hover:bg-[var(--color-primary)] hover:text-[var(--color-bg)] transition-colors">
              View Portfolio
            </button>
            <p className="text-xs text-[var(--color-neutral-mid)] tracking-wider uppercase">
              Secondary · outlined · navigation
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-6">
            <a
              href="#"
              className="text-sm text-[var(--color-accent)] tracking-wide hover:opacity-75 transition-opacity"
            >
              Read the guide →
            </a>
            <p className="text-xs text-[var(--color-neutral-mid)] tracking-wider uppercase">
              Inline link · accent · prose nav
            </p>
          </div>
        </div>
      </Section>

      {/* ── 05 · Cards ──────────────────────────────────────────── */}
      <Section
        number="05"
        eyebrow="Cards"
        title="Three card patterns. No others."
        intro="A stone-bordered base, a numbered card for sequenced ideas, and a statistic card for the rare moment a single number deserves the page."
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Basic stone card */}
          <div className="border border-[var(--color-neutral-mid)]/40 bg-[var(--color-bg)] p-7">
            <h4
              className="text-xl font-medium text-[var(--color-primary)] mb-3"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Programmatic clarity
            </h4>
            <p className="text-sm text-[var(--color-neutral-mid)] leading-relaxed">
              The most resolved architecture is not the most complex. It is the
              most precisely calibrated to its program.
            </p>
          </div>

          {/* Numbered */}
          <div className="border border-[var(--color-neutral-mid)]/40 bg-[var(--color-bg)] p-7">
            <p
              className="text-2xl text-[var(--color-accent)] mb-3 font-light"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              02
            </p>
            <p className="text-xs tracking-widest uppercase text-[var(--color-accent)] mb-2 font-semibold">
              Feasibility
            </p>
            <h4
              className="text-xl font-medium text-[var(--color-primary)] mb-3"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Is this site even buildable?
            </h4>
            <p className="text-sm text-[var(--color-neutral-mid)] leading-relaxed">
              Setback, slope, easements, and zoning envelope determine more
              than most owners realize.
            </p>
          </div>

          {/* Statistic */}
          <div className="border border-[var(--color-neutral-mid)]/40 bg-[var(--color-surface)] p-7 text-center">
            <p
              className="text-6xl text-[var(--color-primary)] mb-3 font-light leading-none"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              18
            </p>
            <p className="text-xs tracking-widest uppercase text-[var(--color-neutral-mid)]">
              Years in practice
            </p>
          </div>
        </div>
      </Section>

      {/* ── 06 · Image treatment ────────────────────────────────── */}
      <Section
        number="06"
        eyebrow="Imagery"
        title="16:9 for portfolio. 4:5 for people. Full-bleed for hero."
        intro="Aspect ratios are part of the brand. Crop project photography to 16:9 unless the building requires otherwise; portraits sit in a 4:5 frame; the home and project hero photos are full-bleed."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <figure>
            <div
              className="aspect-video bg-[var(--color-surface)] border border-[var(--color-neutral-mid)]/30 flex items-center justify-center"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(168,166,161,0.25) 39px, rgba(168,166,161,0.25) 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(168,166,161,0.25) 39px, rgba(168,166,161,0.25) 40px)",
              }}
            >
              <span className="text-xs tracking-widest uppercase text-[var(--color-accent)]">
                16 : 9 — portfolio cell
              </span>
            </div>
            <figcaption className="mt-3">
              <p className="text-xs tracking-widest uppercase text-[var(--color-accent)] mb-1 font-semibold">
                Russian Hill Studio — 2023
              </p>
              <p className="text-sm text-[var(--color-neutral-mid)] italic leading-snug">
                Adaptive reuse of a 1924 carriage house. Photography by client.
              </p>
            </figcaption>
          </figure>
          <figure>
            <div
              className="aspect-[4/5] bg-[var(--color-surface)] border border-[var(--color-neutral-mid)]/30 flex items-center justify-center"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(168,166,161,0.25) 39px, rgba(168,166,161,0.25) 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(168,166,161,0.25) 39px, rgba(168,166,161,0.25) 40px)",
              }}
            >
              <span className="text-xs tracking-widest uppercase text-[var(--color-accent)]">
                4 : 5 — portrait
              </span>
            </div>
            <figcaption className="mt-3">
              <p className="text-xs tracking-widest uppercase text-[var(--color-accent)] mb-1 font-semibold">
                Principal
              </p>
              <p className="text-sm text-[var(--color-neutral-mid)] italic leading-snug">
                Studio portraits — neutral light, eye-level, no environmental
                styling.
              </p>
            </figcaption>
          </figure>
        </div>
      </Section>

      {/* ── 07 · Layout primitives ──────────────────────────────── */}
      <Section
        number="07"
        eyebrow="Layout"
        title="Four container widths. Use them honestly."
        intro="Most pages live inside one or two of these. Reach for the narrower container before the wider one."
      >
        <div className="space-y-3">
          {[
            { name: "Prose", width: "72ch", note: "Article body, narrative" },
            { name: "Reading", width: "880px", note: "About, journey pages" },
            { name: "Wide", width: "1080px", note: "Detail pages, grids" },
            { name: "Layout", width: "1280px", note: "Portfolio, navigation, footer" },
            { name: "Full-bleed", width: "100%", note: "Hero photography only" },
          ].map((c) => (
            <div
              key={c.name}
              className="flex items-center gap-6 border-b border-[var(--color-surface)] pb-3"
            >
              <p
                className="text-lg w-32 text-[var(--color-primary)]"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                {c.name}
              </p>
              <p className="text-sm tracking-wider text-[var(--color-accent)] font-mono w-24">
                {c.width}
              </p>
              <p className="text-sm text-[var(--color-neutral-mid)] flex-1">{c.note}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── 08 · Spacing ────────────────────────────────────────── */}
      <Section
        number="08"
        eyebrow="Rhythm"
        title="Section padding scales with importance."
        intro="The vertical rhythm is deliberate. Section pads expand on hero and CTA, contract in content."
      >
        <div className="space-y-4">
          {[
            { name: "Hero", value: "py-32 (8rem)", role: "Home + design-guide opener" },
            { name: "Section", value: "py-24 (6rem)", role: "Standard section break" },
            { name: "CTA band", value: "py-24 (6rem)", role: "Footer CTAs, contact" },
            { name: "Card pad", value: "p-7 — p-12", role: "Inner card padding" },
            { name: "Stack gap", value: "gap-6 / gap-10", role: "Between cards or columns" },
          ].map((row) => (
            <div
              key={row.name}
              className="grid grid-cols-12 items-center border-b border-[var(--color-surface)] pb-3"
            >
              <p
                className="col-span-3 text-base text-[var(--color-primary)]"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                {row.name}
              </p>
              <p className="col-span-4 text-sm font-mono text-[var(--color-accent)]">
                {row.value}
              </p>
              <p className="col-span-5 text-sm text-[var(--color-neutral-mid)]">
                {row.role}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── 09 · CTA block ──────────────────────────────────────── */}
      <Section
        number="09"
        eyebrow="CTA"
        title="The conversation pattern."
        intro="Every page can land on this block. The copy never sells; it invites."
      >
        <div className="bg-[var(--color-primary)] text-[var(--color-bg)] p-14 md:p-20">
          <p className="text-xs tracking-[0.22em] uppercase text-[var(--color-accent-tint)] mb-4 font-semibold">
            Tell us about your project
          </p>
          <h3
            className="text-3xl md:text-4xl font-light leading-tight max-w-xl mb-8"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            We work with clients who take their projects seriously and want a
            studio that will engage them the same way.
          </h3>
          <Link
            href="/contact"
            className="inline-block bg-[var(--color-bg)] text-[var(--color-primary)] px-10 py-4 text-xs tracking-[0.2em] uppercase font-semibold hover:bg-[var(--color-accent)] hover:text-[var(--color-bg)] transition-colors"
          >
            Begin
          </Link>
        </div>
      </Section>

      {/* ── 10 · Voice ──────────────────────────────────────────── */}
      <Section
        number="10"
        eyebrow="Voice"
        title="Calm, expert, never urgent."
        intro="The studio is the trusted advisor, not the vendor. The voice is the same in headings, captions, contact forms, and error pages."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
          <div>
            <p className="text-xs tracking-widest uppercase text-[var(--color-accent)] mb-3 font-semibold">
              Use
            </p>
            <ul className="space-y-3 text-[var(--color-primary)]">
              <li className="border-l-2 border-[var(--color-accent)] pl-4 italic" style={{ fontFamily: "var(--font-serif)" }}>
                &ldquo;Every project starts with a conversation.&rdquo;
              </li>
              <li className="border-l-2 border-[var(--color-accent)] pl-4 italic" style={{ fontFamily: "var(--font-serif)" }}>
                &ldquo;Typical ranges — your project may vary.&rdquo;
              </li>
              <li className="border-l-2 border-[var(--color-accent)] pl-4 italic" style={{ fontFamily: "var(--font-serif)" }}>
                &ldquo;We design for the building&apos;s entire life, not the
                photograph at completion.&rdquo;
              </li>
            </ul>
          </div>
          <div>
            <p className="text-xs tracking-widest uppercase text-[var(--color-accent)] mb-3 font-semibold">
              Avoid
            </p>
            <ul className="space-y-3 text-[var(--color-neutral-mid)]">
              <li className="border-l-2 border-[var(--color-neutral-mid)]/40 pl-4 line-through">
                &ldquo;Get a free quote in minutes!&rdquo;
              </li>
              <li className="border-l-2 border-[var(--color-neutral-mid)]/40 pl-4 line-through">
                &ldquo;Guaranteed delivery in six weeks.&rdquo;
              </li>
              <li className="border-l-2 border-[var(--color-neutral-mid)]/40 pl-4 line-through">
                &ldquo;Award-winning, industry-leading, best-in-class.&rdquo;
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-[var(--color-surface)] pt-8">
          <p className="text-xs tracking-widest uppercase text-[var(--color-accent)] mb-3 font-semibold">
            Compliance rules — locked
          </p>
          <ul className="text-sm text-[var(--color-neutral-mid)] leading-relaxed space-y-2 max-w-2xl">
            <li>· No cost guarantees. Estimates are ranges; the project may vary.</li>
            <li>· No timeline promises that depend on permitting or third parties.</li>
            <li>· No claims of awards, certifications, or licensure not held.</li>
            <li>· CTA copy is &ldquo;Tell us about your project&rdquo; — never &ldquo;Buy now&rdquo;.</li>
          </ul>
        </div>
      </Section>

      {/* ── Colophon ─────────────────────────────────────────────── */}
      <section className="border-t border-[var(--color-surface)] py-20 px-6 bg-[var(--color-surface)]">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs tracking-[0.2em] uppercase text-[var(--color-accent)] mb-4 font-semibold">
            Colophon
          </p>
          <p
            className="text-2xl text-[var(--color-primary)] max-w-2xl leading-snug"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            This page is the source of truth. When the site and this guide
            disagree, fix the site.
          </p>
          <p className="mt-6 text-sm text-[var(--color-neutral-mid)] max-w-xl leading-relaxed">
            Tokens live in <code className="text-[var(--color-primary)]">app/globals.css</code>.
            Voice and strategy live in the cloudstonedesigns skill book at{" "}
            <code className="text-[var(--color-primary)]">libs/skill_book/cloudstonedesigns/index.js</code>.
            Components live in <code className="text-[var(--color-primary)]">components/</code>.
          </p>
        </div>
      </section>
    </div>
  );
}
