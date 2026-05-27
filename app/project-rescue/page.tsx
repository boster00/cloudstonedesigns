import PillarLanding from "@/components/PillarLanding";
import { getPillar } from "@/lib/articles";

export const metadata = {
  title: "When Your Architecture Project Goes Wrong",
  description:
    "If your project has stalled, gone over budget, or lost your confidence — these pages help you understand your options and find a path forward.",
};

export default function ProjectRescuePillarPage() {
  const pillar = getPillar("project-rescue")!;
  return (
    <PillarLanding
      pillar={pillar}
      intro="A troubled architecture project is one of the most stressful experiences a client can face. The investment is significant, the decisions feel irreversible, and the expertise imbalance between client and architect can make it difficult to know whether your concerns are valid or whether you are simply anxious. These pages are written for exactly that situation."
    />
  );
}
