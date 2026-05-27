import Image from "next/image";

export const metadata = {
  title: "About",
  description: "The story and values of Cloudstone Designs architecture studio.",
};

export default function AboutPage() {
  const values = [
    {
      title: "Material honesty",
      body: "We believe the character of a building is expressed through its materials — not in spite of them. We specify materials we are confident will age well, and we detail them in ways that acknowledge, rather than conceal, how they are put together.",
    },
    {
      title: "Programmatic clarity",
      body: "Before we draw anything, we spend significant time understanding how a space will actually be used. The most resolved architecture is not the most complex — it is the most precisely calibrated to its program.",
    },
    {
      title: "Long-term thinking",
      body: "Architecture is a slow art. The decisions made in design persist for decades. We approach every project with that duration in mind — designing not for the moment of occupancy but for the building's entire life.",
    },
  ];

  return (
    <div className="px-6 py-20" style={{ fontFamily: "var(--font-sans)" }}>
      <div className="max-w-3xl mx-auto">
        <p
          className="text-[11px] font-bold tracking-[0.22em] uppercase text-black mb-6"
          style={{ fontFamily: "var(--font-sans-display)" }}
        >
          Profile
        </p>
        <h1
          className="text-[40px] md:text-[64px] font-bold leading-[1.02] tracking-[-0.02em] text-black mb-12"
          style={{ fontFamily: "var(--font-sans-display)" }}
        >
          A studio that designs at the pace of its projects.
        </h1>

        <div className="space-y-7 text-[16px] leading-[1.75] text-[#222]">
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
            principal from inception through construction administration. We do not hand projects
            off to junior staff after the schematic phase. The continuity of attention that this
            model requires is, we believe, one of the primary determinants of whether a project
            achieves its design potential in built form.
          </p>
          <p>
            We are licensed in California, Oregon, and Washington, with experience working across a
            range of municipal jurisdictions and building types.
          </p>
        </div>
      </div>

      {/* Principal */}
      <div className="max-w-3xl mx-auto mt-24 border-t border-[#eee] pt-16">
        <p
          className="text-[11px] font-bold tracking-[0.22em] uppercase text-black mb-8"
          style={{ fontFamily: "var(--font-sans-display)" }}
        >
          Principal
        </p>
        <div className="flex items-start gap-8 flex-wrap">
          <Image
            src="/dong-zhang.jpg"
            alt="Dong Zhang"
            width={140}
            height={140}
            className="object-cover flex-shrink-0"
          />
          <div className="flex-1 min-w-[280px]">
            <h2
              className="text-[24px] font-bold tracking-[-0.01em] text-black mb-1"
              style={{ fontFamily: "var(--font-sans-display)" }}
            >
              Dong Zhang
            </h2>
            <p className="text-[12px] font-semibold tracking-[0.12em] uppercase text-[#666] mb-4">
              Principal · Project Manager
            </p>
            <p className="text-[15px] leading-[1.7] text-[#333] max-w-lg">
              Dong leads every Cloudstone project from initial brief through construction
              administration. With a background at Lowney Architecture and deep experience across
              residential and commercial typologies in the Bay Area, he brings both technical rigor
              and clear design judgment to every engagement.
            </p>
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="max-w-6xl mx-auto mt-24 border-t border-[#eee] pt-16">
        <p
          className="text-[11px] font-bold tracking-[0.22em] uppercase text-black mb-10"
          style={{ fontFamily: "var(--font-sans-display)" }}
        >
          What We Believe
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {values.map((v) => (
            <div key={v.title}>
              <h3
                className="text-[18px] font-bold tracking-[-0.01em] text-black mb-3"
                style={{ fontFamily: "var(--font-sans-display)" }}
              >
                {v.title}
              </h3>
              <p className="text-[14px] leading-[1.7] text-[#555]">{v.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
