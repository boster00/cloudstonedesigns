import Link from "next/link";

type CtaProps = {
  heading: string;
  body: string;
  button: {
    label: string;
    href: string;
  };
};

export default function Cta({ heading, body, button }: CtaProps) {
  return (
    <div className="not-prose my-16 bg-[var(--color-accent-tint)] rounded-sm px-10 py-12">
      <h2
        className="text-2xl md:text-3xl font-light mb-4 text-[var(--color-primary)]"
        style={{ fontFamily: "var(--font-serif)" }}
      >
        {heading}
      </h2>
      <p className="text-[var(--color-neutral-mid)] mb-8 max-w-lg leading-relaxed">{body}</p>
      <Link
        href={button.href}
        className="inline-block bg-[var(--color-accent)] text-[var(--color-bg)] px-8 py-3 text-sm tracking-wide hover:opacity-90 transition-opacity"
      >
        {button.label}
      </Link>
    </div>
  );
}
