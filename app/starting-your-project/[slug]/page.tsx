import { promises as fs } from 'fs';
import path from 'path';
import { notFound } from "next/navigation";
import ArticleShell from "@/components/ArticleShell";
import Cta from "@/components/Cta";
import RelatedArticles from "@/components/RelatedArticles";
import { getPillar, getSatellite, relatedFor } from "@/lib/articles";

const PILLAR_SLUG = "starting-your-project";

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
        The question deserves a direct answer, and the answer depends on variables that are specific
        to your project — its scale, its site, its program, and the jurisdiction where it will be
        built. What we can offer here is a framework for thinking through those variables
        systematically, so that the answer you arrive at is yours, not ours.
      </p>

      <h2>What Most People Get Wrong</h2>
      <p>
        The most common error is treating this as a binary decision when it is actually a spectrum.
        The relevant question is not simply yes or no — it is what kind of expertise you need, at
        what stages, and in what depth. Architecture is a service, not a commodity, and the service
        can be scoped in many ways that most clients are not aware of.
      </p>
      <p>
        A second common error is anchoring on fees before understanding the scope of what those
        fees cover. A lower fee for a reduced scope may cost significantly more when measured
        against the total project outcome. The projects that go most seriously wrong are rarely the
        ones that spent too much on design.
      </p>

      <h2>A Framework for Your Decision</h2>
      <p>
        The questions worth working through are sequential: What is the nature of the work? What
        level of design resolution do you require? What is your tolerance for managing
        construction-phase decisions yourself? And what is the cost of getting it wrong? Each answer
        narrows the range of appropriate approaches significantly.
      </p>
      <p>
        For most projects of meaningful scale or complexity, the answer converges on full-service
        engagement — not because that is the most profitable outcome for architects, but because
        the construction administration phase is where design intent is most often lost, and losing
        it is expensive in ways that are difficult to quantify in advance.
      </p>

      <h2>What to Do Next</h2>
      <p>
        If you are still uncertain after working through the framework above, a preliminary
        consultation with an architecture firm costs little and clarifies a great deal. Most
        reputable firms offer an initial conversation at no charge. Use it to test whether the
        firm understands your project — and whether you understand what a well-structured
        engagement would look like.
      </p>
    </>
  );
}

export default async function StartingYourProjectSatellitePage({
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
        heading="Tell us about your project"
        body="A 30-minute conversation to explore your vision and constraints — no commitment required."
        button={{ label: "Start the conversation", href: "/contact" }}
      />

      <RelatedArticles articles={related} />
    </ArticleShell>
  );
}
