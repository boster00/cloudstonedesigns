type PeopleCardProps = {
  name: string;
  role: string;
  bio: string;
  imageSrc?: string;
};

export default function PeopleCard({ name, role, bio }: PeopleCardProps) {
  return (
    <div className="flex flex-col">
      {/* Placeholder portrait */}
      <div className="w-full aspect-[3/4] bg-[var(--color-surface)] mb-5" />
      <p className="text-xs tracking-widest uppercase text-[var(--color-accent)] mb-1">{role}</p>
      <h3
        className="text-xl font-light mb-3"
        style={{ fontFamily: "var(--font-serif)" }}
      >
        {name}
      </h3>
      <p className="text-sm text-[var(--color-neutral-mid)] leading-relaxed">{bio}</p>
    </div>
  );
}
