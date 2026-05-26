import Image from "next/image";

export const metadata = {
  title: "About",
  description: "The story and values of Cloudstone Designs architecture studio.",
};

export default function AboutPage() {
  const values = [
    {
      title: "Material Honesty",
      body: "We believe the character of a building is expressed through its materials — not in spite of them. We specify materials we are confident will age well, and we detail them in ways that acknowledge, rather than conceal, how they are put together.",
    },
    {
      title: "Programmatic Clarity",
      body: "Before we draw anything, we spend significant time understanding how a space will actually be used. The most resolved architecture is not the most complex — it is the most precisely calibrated to its program. We resist the temptation to add spatial complexity for its own sake.",
    },
    {
      title: "Long-Term Thinking",
      body: "Architecture is a slow art. The decisions made in design persist for decades. We approach every project with that duration in mind — designing not for the moment of occupancy but for the building's entire life. That commitment shapes how we approach structure, envelope, systems, and everything in between.",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <div className="mb-16">
        <p className="text-xs tracking-widest uppercase text-[var(--color-accent)] mb-3">Studio</p>
        <h1
          className="text-5xl font-light text-[var(--color-primary)] mb-10"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          About Cloudstone
        </h1>

        <div className="prose-article">
          <p>
            Cloudstone Designs was founded on the belief that good architecture is not a luxury — it
            is a form of clear thinking made permanent in material. We work with clients who have
            serious projects and want a firm that will engage those projects with the same
            seriousness. Our practice spans residential, commercial, and renovation work, with a
            particular concentration in projects where site conditions and programmatic complexity
            are the generative forces.
          </p>
          <p>
            The studio operates as a small, focused practice by design. Every project is led by a
            principal from inception through construction administration. We do not hand projects off
            to junior staff after the schematic phase. The continuity of attention that this model
            requires is, we believe, one of the primary determinants of whether a project achieves
            its design potential in built form.
          </p>
          <p>
            We are licensed in California, Oregon, and Washington, with experience working across
            a range of municipal jurisdictions and building types. Our construction relationships
            span general contractors, specialty fabricators, and structural engineers whose
            respective competencies we have tested on real projects over time. We bring those
            relationships to every engagement.
          </p>
        </div>
      </div>

      {/* Principal */}
      <div className="border-t border-[var(--color-surface)] pt-16 mb-16">
        <h2
          className="text-3xl font-light text-[var(--color-primary)] mb-10"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Principal
        </h2>
        <div className="flex items-start gap-8">
          <Image
            src="/dong-zhang.jpg"
            alt="Dong Zhang"
            width={120}
            height={120}
            className="rounded-full object-cover flex-shrink-0"
          />
          <div>
            <h3
              className="text-xl font-medium text-[var(--color-primary)] mb-1"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Dong Zhang
            </h3>
            <p className="text-sm text-[var(--color-accent)] tracking-wide mb-4">
              Principal, Project Manager
            </p>
            <p className="text-sm text-[var(--color-neutral-mid)] leading-relaxed max-w-lg">
              Dong leads every Cloudstone project from initial brief through construction
              administration. With a background at Lowney Architecture and deep experience
              across residential and commercial typologies in the Bay Area, he brings
              both technical rigor and clear design judgment to every engagement.
            </p>
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="border-t border-[var(--color-surface)] pt-16">
        <h2
          className="text-3xl font-light text-[var(--color-primary)] mb-12"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          What We Believe
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {values.map((v) => (
            <div key={v.title}>
              <h3
                className="text-lg font-medium text-[var(--color-accent)] mb-3"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                {v.title}
              </h3>
              <p className="text-sm text-[var(--color-neutral-mid)] leading-relaxed">{v.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
