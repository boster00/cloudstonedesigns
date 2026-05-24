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

export default async function StartingYourProjectSatellitePage({
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

      <Cta
        heading="Ready to talk through your project?"
        body="We offer a complimentary initial consultation for projects that are a good fit for our practice. Tell us about yours."
        button={{ label: "Start a Conversation", href: "/contact" }}
      />

      <RelatedArticles articles={related} />
    </ArticleShell>
  );
}
