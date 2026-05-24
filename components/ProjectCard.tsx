import Link from "next/link";

type ProjectCardProps = {
  slug: string;
  title: string;
  category: string;
  imageSrc: string;
  year: number;
};

export default function ProjectCard({ slug, title, category, year, imageSrc }: ProjectCardProps) {
  return (
    <Link href={`/portfolio/${slug}`} className="group block">
      <div className="relative w-full aspect-video bg-[var(--color-surface)] overflow-hidden">
        {imageSrc && (
          <img
            src={imageSrc}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-[var(--color-primary)] opacity-0 group-hover:opacity-60 transition-opacity duration-300" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <h3
            className="text-[var(--color-bg)] text-xl px-4 text-center"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            {title}
          </h3>
        </div>
      </div>
      <div className="mt-3">
        <p className="text-xs text-[var(--color-neutral-mid)] tracking-widest uppercase">
          {category} · {year}
        </p>
        <h3 className="mt-0.5 text-base font-medium group-hover:text-[var(--color-accent)] transition-colors">
          {title}
        </h3>
      </div>
    </Link>
  );
}
