import Link from "next/link";
import ArticleShell from "@/components/ArticleShell";
import { getPillar } from "@/lib/articles";

export const metadata = {
  title: "Starting Your Architecture Project",
  description:
    "Everything you need to understand before you commit to a project — from feasibility to finding the right firm.",
};

export default function StartingYourProjectPillarPage() {
  const pillar = getPillar("starting-your-project")!;

  const sections = pillar.satellites.map((s) => ({ id: s.slug, label: s.title }));

  return (
    <ArticleShell
      eyebrow="Architecture Guide"
      title={pillar.title}
      sections={sections}
    >
      <p>
        Starting an architecture project without a clear understanding of the process is the
        single most reliable predictor of a difficult outcome. The decisions made in the first
        weeks — about scope, team, budget, and timeline — establish constraints that persist
        through every subsequent phase. These pages are written to help you arrive at those
        decisions prepared.
      </p>

      {pillar.satellites.map((satellite) => (
        <section key={satellite.slug} id={satellite.slug}>
          <h2>{satellite.title}</h2>
          <p>{satellite.teaser}</p>
          <p>
            <Link href={`/starting-your-project/${satellite.slug}`}>
              Read the full guide →
            </Link>
          </p>
        </section>
      ))}
    </ArticleShell>
  );
}
