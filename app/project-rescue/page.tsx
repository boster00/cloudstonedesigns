import Link from "next/link";
import ArticleShell from "@/components/ArticleShell";
import { getPillar } from "@/lib/articles";

export const metadata = {
  title: "When Your Architecture Project Goes Wrong",
  description:
    "If your project has stalled, gone over budget, or lost your confidence — these pages help you understand your options and find a path forward.",
};

export default function ProjectRescuePillarPage() {
  const pillar = getPillar("project-rescue")!;

  const sections = pillar.satellites.map((s) => ({ id: s.slug, label: s.title }));

  return (
    <ArticleShell
      eyebrow="Architecture Guide"
      title={pillar.title}
      sections={sections}
    >
      <p>
        A troubled architecture project is one of the most stressful experiences a client can face.
        The investment is significant, the decisions feel irreversible, and the expertise imbalance
        between client and architect can make it difficult to know whether your concerns are valid
        or whether you are simply anxious. These pages are written for exactly that situation.
      </p>

      {pillar.satellites.map((satellite) => (
        <section key={satellite.slug} id={satellite.slug}>
          <h2>{satellite.title}</h2>
          <p>{satellite.teaser}</p>
          <p>
            <Link href={`/project-rescue/${satellite.slug}`}>
              Read the full guide →
            </Link>
          </p>
        </section>
      ))}
    </ArticleShell>
  );
}
