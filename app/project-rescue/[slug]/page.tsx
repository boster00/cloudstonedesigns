import { notFound } from "next/navigation";
import ArticleShell from "@/components/ArticleShell";
import Cta from "@/components/Cta";
import RelatedArticles from "@/components/RelatedArticles";
import { getPillar, getSatellite, relatedFor } from "@/lib/articles";

const PILLAR_SLUG = "project-rescue";

export async function generateStaticParams() {
  const pillar = getPillar(PILLAR_SLUG);
  if (!pillar) return [];
  return pillar.satellites.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const satellite = getSatellite(PILLAR_SLUG, slug);
  if (!satellite) return {};
  return { title: satellite.title, description: satellite.teaser };
}

export default async function ProjectRescueSatellitePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const satellite = getSatellite(PILLAR_SLUG, slug);
  if (!satellite) notFound();

  const related = relatedFor(PILLAR_SLUG, slug, 3);

  return (
    <ArticleShell eyebrow={satellite.pillar} title={satellite.title}>
      <p>{satellite.teaser}</p>

      <p>
        The most important thing to establish early is whether the problem is structural or
        interpersonal. Structural problems — inadequate documentation, incorrect specifications,
        missed code requirements — require technical remediation. Interpersonal problems —
        communication failures, misaligned expectations, trust breakdowns — require a different
        approach, and conflating the two leads to interventions that solve the wrong problem.
      </p>

      <h2>Diagnosing the Root Cause</h2>
      <p>
        Start with the contract. In most troubled projects, a careful reading of the owner-architect
        agreement reveals that either the scope was never adequately defined, the deliverables were
        not specified, or the compensation structure created incentives that diverged from the
        client's interests. This is not an accusation — it is a diagnostic starting point.
      </p>
      <p>
        Next, review the project record. What decisions were documented? What was verbal? At what
        points did the project diverge from the client's understanding of what had been agreed?
        The answers to these questions usually reveal a handful of discrete decision points where
        the project's trajectory changed.
      </p>

      <h2>Your Options</h2>
      <p>
        Depending on what you find, the options range from renegotiation of scope and fee — the
        most common and least disruptive path — to termination and re-procurement. Each carries
        costs that should be weighed against the cost of continuing on the current trajectory.
        Most situations, honestly assessed, are recoverable. The ones that are not usually involve
        fundamental conflicts of interest that no amount of process improvement will resolve.
      </p>
      <p>
        If you are considering changing architects, the timing in the project lifecycle matters
        enormously. Early in design, the transition cost is manageable. In construction documents,
        it is significant. During construction, it is very high. The math changes depending on how
        much design work is recoverable and how well it has been documented.
      </p>

      <h2>Getting a Second Opinion</h2>
      <p>
        An independent review of the project record by a qualified architect — not a competing
        firm, but someone engaged specifically as a peer reviewer — can clarify your position
        considerably. This is a legitimate and underused service. Most architectural review boards
        can refer you to appropriate resources.
      </p>

      <Cta
        heading="Concerned about your project?"
        body="We offer confidential second-opinion consultations for clients navigating difficult project situations. No obligation."
        button={{ label: "Request a Consultation", href: "/contact" }}
      />

      <RelatedArticles articles={related} />
    </ArticleShell>
  );
}
