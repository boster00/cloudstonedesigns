import ProjectGrid from "@/components/ProjectGrid";
import { projects } from "@/lib/projects";

export const metadata = {
  title: "Work",
  description: "Selected architecture and interior design projects by Cloudstone Designs.",
};

export default function PortfolioPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <div className="mb-14">
        <p className="text-xs tracking-widest uppercase text-[var(--color-accent)] mb-3">Portfolio</p>
        <h1
          className="text-5xl font-light text-[var(--color-primary)]"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Selected Work
        </h1>
      </div>
      <ProjectGrid projects={projects} />
    </div>
  );
}
