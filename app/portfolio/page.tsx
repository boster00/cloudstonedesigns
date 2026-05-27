import ProjectGrid from "@/components/ProjectGrid";
import { projects } from "@/lib/projects";

export const metadata = {
  title: "Work",
  description: "Selected architecture and interior design projects by Cloudstone Designs.",
};

export default function PortfolioPage() {
  return (
    <div className="px-6 py-16">
      {/* STL-style top label row */}
      <div className="flex items-baseline justify-between mb-10 border-b border-[#eee] pb-4">
        <h1
          className="text-[13px] font-bold tracking-[0.18em] uppercase text-black"
          style={{ fontFamily: "var(--font-sans-display)" }}
        >
          Work
        </h1>
        <div className="flex items-center gap-6 text-[11px] font-semibold tracking-[0.18em] uppercase">
          <span className="text-black border-b border-black pb-0.5">All</span>
          <span className="text-[#999]">Featured</span>
        </div>
      </div>

      <ProjectGrid projects={projects} />
    </div>
  );
}
