import Link from "next/link";

const socials = [
  {
    label: "Instagram",
    href: "https://instagram.com/cloudstonedesigns",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/company/cloudstonedesigns",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="relative bg-white border-t border-[#eee]">
      {/* Floating social icons top-right above footer */}
      <div className="absolute -top-12 right-6 flex items-center gap-4 text-black">
        {socials.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.label}
            className="hover:opacity-60 transition-opacity"
          >
            {s.icon}
          </a>
        ))}
      </div>

      <div className="px-6 py-10 flex flex-col md:flex-row items-start md:items-end justify-between gap-6 text-[13px] text-black"
           style={{ fontFamily: "var(--font-sans)" }}>
        {/* Left: legal stack */}
        <div className="flex flex-col gap-1">
          <Link href="/privacy" className="hover:opacity-60 transition-opacity">Legal notice</Link>
          <Link href="/privacy" className="hover:opacity-60 transition-opacity">Privacy policy</Link>
          <Link href="/privacy" className="hover:opacity-60 transition-opacity">Cookies policy</Link>
        </div>

        {/* Right: phone + email */}
        <div className="flex flex-col gap-1 md:items-end">
          <span>+1 415 555 0148</span>
          <a
            href="mailto:studio@cloudstonedesigns.com"
            className="hover:opacity-60 transition-opacity"
          >
            studio@cloudstonedesigns.com
          </a>
        </div>
      </div>
    </footer>
  );
}
