import { notFound } from "next/navigation";
import Link from "next/link";
import { projects, getProject } from "@/lib/projects";

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return { title: project.title };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <div>
      {/* Full-bleed placeholder */}
      <div className="w-full aspect-video bg-[var(--color-surface)]" />

      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Meta */}
        <div className="flex flex-wrap gap-6 text-xs tracking-widest uppercase text-[var(--color-neutral-mid)] mb-8">
          <span>{project.category}</span>
          <span>{project.location}</span>
          <span>{project.year}</span>
        </div>

        <h1
          className="text-5xl font-light text-[var(--color-primary)] mb-6"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          {project.title}
        </h1>

        <p className="text-lg text-[var(--color-neutral-mid)] mb-12 leading-relaxed max-w-2xl">
          {project.teaser}
        </p>

        {/* Narrative */}
        <div className="prose-article">
          <p>
            The project began with a careful reading of the site — its topography, its solar
            orientation, and the way it holds the horizon. Rather than impose a predetermined
            parti, the design emerged from a sustained conversation between program and place.
            Each material decision was tested against the question of whether it would improve
            with age or merely look new.
          </p>
          <p>
            The structural system is exposed throughout, treated as finish rather than hidden behind
            layers of drywall. This choice introduced a discipline into the detailing that proved
            generative — every connection became an opportunity to express the logic of the
            building rather than conceal it. The result is an interior whose tectonic clarity
            reinforces the spatial sequence rather than competing with it.
          </p>
          <p>
            Daylighting was treated as a primary design medium. The fenestration is calibrated to
            the specific solar path at this latitude, with overhangs sized to admit low winter sun
            while excluding the high summer arc. The quality of light shifts throughout the day in
            ways that animate the space without requiring artificial dramatization.
          </p>
          <p>
            The project was completed within the original program and budget, with a construction
            administration process that maintained the design intent through every field condition.
            It is currently occupied and performing within ten percent of its modeled energy use —
            a result we attribute to the envelope strategy rather than mechanical over-engineering.
          </p>
        </div>

        {/* Next project */}
        <div className="mt-20 pt-10 border-t border-[var(--color-surface)]">
          <p className="text-xs tracking-widest uppercase text-[var(--color-neutral-mid)] mb-3">
            Next project
          </p>
          <Link
            href={`/portfolio/${nextProject.slug}`}
            className="font-serif text-2xl font-light hover:text-[var(--color-accent)] transition-colors"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            {nextProject.title} →
          </Link>
        </div>
      </div>
    </div>
  );
}
