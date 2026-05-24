import { notFound } from "next/navigation";
import ArticleShell from "@/components/ArticleShell";
import Cta from "@/components/Cta";
import RelatedArticles from "@/components/RelatedArticles";
import { getPillar, getSatellite, relatedFor } from "@/lib/articles";

const PILLAR_SLUG = "choosing-an-architect";

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

export default async function ChoosingAnArchitectSatellitePage({
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
        The selection decision is rarely as difficult as it feels in the moment — but it requires
        a different kind of information than most clients seek. The information that is readily
        available (portfolio images, award credits, press mentions) is the information firms invest
        in making available. The information that actually predicts project outcomes is harder to
        obtain and requires a more deliberate process to surface.
      </p>

      <h2>What to Look For</h2>
      <p>
        Process transparency is a leading indicator. Firms that can clearly articulate how they
        work — how decisions are made, how they are documented, how changes are priced, how
        construction administration is staffed — are firms that have thought carefully about
        delivery. Firms that deflect these questions with portfolio references usually have not.
      </p>
      <p>
        References from completed projects are the most direct evidence available. The most useful
        reference conversations are not about whether the client liked the result — most clients
        like their completed projects — but about how the firm handled difficult moments: budget
        pressure, field conditions, contractor disputes, owner changes of scope. Those conversations
        reveal the firm's actual character under stress.
      </p>

      <h2>The Questions Most Clients Don't Ask</h2>
      <p>
        Who will actually work on my project, and at what stages? What is the firm's current
        workload, and how does that affect capacity? What happens if the project goes over budget
        in design — does the fee increase? What does the construction administration scope actually
        include, and how many site visits does that represent?
      </p>
      <p>
        These are not adversarial questions. They are reasonable due diligence that any confident
        firm should be able to answer without hesitation. Answers that are vague, deflected, or
        qualified in ways that create ambiguity are information.
      </p>

      <h2>Making the Final Decision</h2>
      <p>
        If you have done thorough due diligence and more than one firm looks genuinely qualified,
        the remaining decision is about working relationship. You will be in regular communication
        with this team for the duration of the project — potentially years. The question of whether
        you trust them, and whether they understand what you are trying to accomplish, matters at
        least as much as their technical credentials.
      </p>

      <Cta
        heading="Considering Cloudstone for your project?"
        body="We are happy to answer any of the questions above, and to be candid about where we are and are not the right fit."
        button={{ label: "Start a Conversation", href: "/contact" }}
      />

      <RelatedArticles articles={related} />
    </ArticleShell>
  );
}
