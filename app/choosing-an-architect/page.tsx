import PillarLanding from "@/components/PillarLanding";
import { getPillar } from "@/lib/articles";

export const metadata = {
  title: "Choosing the Right Architect",
  description:
    "The selection process most people use is incomplete. These pages walk through the criteria, comparisons, and questions that lead to a genuinely good hire.",
};

export default function ChoosingAnArchitectPillarPage() {
  const pillar = getPillar("choosing-an-architect")!;
  return (
    <PillarLanding
      pillar={pillar}
      intro="Choosing an architect is one of the most consequential decisions in a building project. The criteria most clients use — portfolio aesthetics and word-of-mouth referrals — are necessary but insufficient. The pages in this guide address the dimensions of the decision that are rarely discussed, and that most reliably predict whether the project will go well."
    />
  );
}
