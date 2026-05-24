import Link from "next/link";
import ArticleShell from "@/components/ArticleShell";
import { getPillar } from "@/lib/articles";

export const metadata = {
  title: "Choosing the Right Architect",
  description:
    "The selection process most people use is incomplete. These pages walk through the criteria, comparisons, and questions that lead to a genuinely good hire.",
};

export default function ChoosingAnArchitectPillarPage() {
  const pillar = getPillar("choosing-an-architect")!;

  const sections = pillar.satellites.map((s) => ({ id: s.slug, label: s.title }));

  return (
    <ArticleShell
      eyebrow="Architecture Guide"
      title={pillar.title}
      sections={sections}
    >
      <p>
        Choosing an architect is one of the most consequential decisions in a building project.
        The criteria most clients use — portfolio aesthetics and word-of-mouth referrals — are
        necessary but insufficient. The pages in this guide address the dimensions of the decision
        that are rarely discussed, and that most reliably predict whether the project will go well.
      </p>

      {pillar.satellites.map((satellite) => (
        <section key={satellite.slug} id={satellite.slug}>
          <h2>{satellite.title}</h2>
          <p>{satellite.teaser}</p>
          <p>
            <Link href={`/choosing-an-architect/${satellite.slug}`}>
              Read the full guide →
            </Link>
          </p>
        </section>
      ))}
    </ArticleShell>
  );
}
