type PeopleCardProps = {
  name: string;
  role: string;
  bio: string;
  imageSrc?: string;
};

export default function PeopleCard({ name, role, bio }: PeopleCardProps) {
  return (
    <div className="flex flex-col">
      <div className="w-full aspect-[4/5] bg-[#f2f2f2] mb-5" />
      <p
        className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#666] mb-1.5"
        style={{ fontFamily: "var(--font-sans-display)" }}
      >
        {role}
      </p>
      <h3
        className="text-[18px] font-bold tracking-[-0.01em] text-black mb-3"
        style={{ fontFamily: "var(--font-sans-display)" }}
      >
        {name}
      </h3>
      <p className="text-[14px] leading-[1.7] text-[#555]">{bio}</p>
    </div>
  );
}
