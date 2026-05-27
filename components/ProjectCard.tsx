import Link from "next/link";

type ProjectCardProps = {
  slug: string;
  title: string;
  category: string;
  imageSrc: string;
  year: number;
  location?: string;
};

export default function ProjectCard({ slug, title, category, year, location, imageSrc }: ProjectCardProps) {
  return (
    <Link href={`/portfolio/${slug}`} className="group block">
      <div className="relative w-full aspect-video bg-[#f2f2f2] overflow-hidden">
        {imageSrc && (
          <img
            src={imageSrc}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
        )}
      </div>
      <div className="mt-3">
        <h3
          className="text-[13px] font-bold tracking-[0.06em] uppercase text-black leading-tight"
          style={{ fontFamily: "var(--font-sans-display)" }}
        >
          {title}
        </h3>
        <p className="mt-0.5 text-[12px] font-light tracking-[0.06em] uppercase text-[#666]">
          {location || category} {year ? `· ${year}` : ""}
        </p>
      </div>
    </Link>
  );
}
