import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-[var(--color-surface)] bg-[var(--color-surface)]">
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-sm text-[var(--color-neutral-mid)]">
        <div>
          <p
            className="font-serif text-base text-[var(--color-primary)] mb-1"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Cloudstone Designs
          </p>
          <p>Architecture &amp; Interior Design</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 md:gap-8">
          <a
            href="mailto:studio@cloudstonedesigns.com"
            className="hover:text-[var(--color-accent)] transition-colors"
          >
            studio@cloudstonedesigns.com
          </a>
          <Link
            href="/privacy"
            className="hover:text-[var(--color-accent)] transition-colors"
          >
            Privacy
          </Link>
          <span>© {year}</span>
        </div>
      </div>
    </footer>
  );
}
