import Link from "next/link";

const socials = [
  {
    label: "Instagram",
    href: "https://instagram.com/cloudstonedesigns",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/company/cloudstonedesigns",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
        <rect x="2" y="9" width="4" height="12"/>
        <circle cx="4" cy="4" r="2"/>
      </svg>
    ),
  },
  {
    label: "Pinterest",
    href: "https://pinterest.com/cloudstonedesigns",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.236 2.636 7.855 6.356 9.312-.088-.791-.167-2.005.035-2.868.181-.78 1.172-4.97 1.172-4.97s-.299-.598-.299-1.482c0-1.388.806-2.428 1.808-2.428.852 0 1.265.64 1.265 1.408 0 .858-.546 2.14-.828 3.33-.236.995.499 1.806 1.476 1.806 1.771 0 3.132-1.867 3.132-4.562 0-2.387-1.716-4.057-4.164-4.057-2.837 0-4.5 2.127-4.5 4.327 0 .856.33 1.775.741 2.277a.3.3 0 0 1 .069.286c-.076.313-.244.995-.277 1.134-.044.183-.146.222-.337.134-1.249-.581-2.03-2.407-2.03-3.874 0-3.154 2.292-6.052 6.608-6.052 3.469 0 6.165 2.473 6.165 5.776 0 3.447-2.173 6.22-5.19 6.22-1.013 0-1.966-.527-2.292-1.148l-.623 2.378c-.226.869-.835 1.958-1.244 2.621.937.29 1.931.446 2.962.446 5.522 0 10-4.477 10-10S17.522 2 12 2z"/>
      </svg>
    ),
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-[var(--color-surface)] bg-[var(--color-surface)]">
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        {/* Brand */}
        <div>
          <p
            className="font-serif text-base text-[var(--color-primary)] mb-1"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Cloudstone Designs
          </p>
          <p className="text-sm text-[var(--color-neutral-mid)]">Architecture &amp; Interior Design</p>
        </div>

        {/* Social + links */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10">
          {/* Social icons */}
          <div className="flex items-center gap-4">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="text-[var(--color-neutral-mid)] hover:text-[var(--color-accent)] transition-colors"
              >
                {s.icon}
              </a>
            ))}
          </div>

          {/* Text links */}
          <div className="flex items-center gap-6 text-sm text-[var(--color-neutral-mid)]">
            <a
              href="mailto:studio@cloudstonedesigns.com"
              className="hover:text-[var(--color-accent)] transition-colors"
            >
              studio@cloudstonedesigns.com
            </a>
            <Link href="/privacy" className="hover:text-[var(--color-accent)] transition-colors">
              Privacy
            </Link>
            <Link href="/design-guide" className="hover:text-[var(--color-accent)] transition-colors">
              Design Guide
            </Link>
            <span>© {year}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
