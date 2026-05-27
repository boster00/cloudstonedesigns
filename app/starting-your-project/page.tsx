import PillarLanding from "@/components/PillarLanding";
import { getPillar } from "@/lib/articles";

export const metadata = {
  title: "Starting Your Architecture Project",
  description:
    "Everything you need to understand before you commit to a project — from feasibility to finding the right firm.",
};

export default function StartingYourProjectPillarPage() {
  const pillar = getPillar("starting-your-project")!;
  return (
    <PillarLanding
      pillar={pillar}
      intro="Starting an architecture project without a clear understanding of the process is the single most reliable predictor of a difficult outcome. The decisions made in the first weeks — about scope, team, budget, and timeline — establish constraints that persist through every subsequent phase. These pages are written to help you arrive at those decisions prepared."
    />
  );
}
