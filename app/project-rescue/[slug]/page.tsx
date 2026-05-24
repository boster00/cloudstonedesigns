import { promises as fs } from 'fs';
import path from 'path';
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

function NativeSatelliteContent() {
  return (
    <>
      <p>
        A project in difficulty is not necessarily a project that is over. The difference between
        a project that can be rescued and one that cannot usually comes down to documentation,
        timing, and the nature of the underlying problem — not its severity.
      </p>

      <h2>Assessing the Situation</h2>
      <p>
        Before any intervention, establish the facts clearly. What was the agreed scope? What was
        delivered? Where do the two diverge, and at what point did they begin to diverge? The
        answers to these questions are almost always available in the project record — contracts,
        emails, meeting notes, drawings, and submittals — if you know where to look.
      </p>
      <p>
        Most project failures have a traceable origin. It is rarely a single moment; more often
        it is a sequence of small misalignments that accumulated until they became visible as a
        crisis. Understanding that sequence changes the nature of your options.
      </p>

      <h2>What Rescue Actually Looks Like</h2>
      <p>
        Rescue is not always the same as continuation. In some cases the right intervention is a
        structured renegotiation of scope, fee, and timeline. In others it is a documented
        transition to a new team. In the most difficult cases it involves legal review and
        professional mediation. Each path has a cost structure that should be weighed against
        the cost of the current trajectory.
      </p>

      <h2>Getting Outside Eyes</h2>
      <p>
        One of the most useful — and underused — tools in a troubled project is an independent
        review by a qualified architect who has no stake in the outcome. This is different from
        a competing firm that wants to take over the work. A peer review can clarify your position,
        quantify the extent of the problem, and identify paths forward that are not visible from
        inside the situation.
      </p>
    </>
  );
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

  let bodyHtml: string | null = null;
  let sections: { id: string; label: string }[] = [];

  if (satellite.source === 'cjgeo') {
    const filePath = path.join(
      process.cwd(),
      'content',
      satellite.pillarSlug,
      `${slug}.html`
    );
    bodyHtml = await fs.readFile(filePath, 'utf8');
    sections = Array.from(bodyHtml.matchAll(/<h2 id="([^"]+)">([^<]+)<\/h2>/g)).map(
      ([, id, text]) => ({ id, label: text.replace(/&mdash;/g, '—').replace(/&ndash;/g, '–').replace(/&amp;/g, '&').replace(/&rsquo;/g, "'").replace(/&lsquo;/g, "'").replace(/&rdquo;/g, '"').replace(/&ldquo;/g, '"').replace(/&hellip;/g, '…').replace(/&nbsp;/g, ' ') })
    );
  }

  return (
    <ArticleShell eyebrow={satellite.pillar} title={satellite.title} sections={sections}>
      {bodyHtml ? (
        <div className="prose-article" dangerouslySetInnerHTML={{ __html: bodyHtml }} />
      ) : (
        <>
          <p>{satellite.teaser}</p>
          <NativeSatelliteContent />
        </>
      )}

      <Cta
        heading="Concerned about your project?"
        body="We offer confidential second-opinion consultations for clients navigating difficult project situations. No obligation."
        button={{ label: "Request a Consultation", href: "/contact" }}
      />

      <RelatedArticles articles={related} />
    </ArticleShell>
  );
}
