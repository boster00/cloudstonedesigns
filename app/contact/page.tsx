import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: "Contact",
  description: "Start a conversation with Cloudstone Designs.",
};

const offices = [
  {
    name: "Cloudstone Designs",
    addr1: "123 Market Street, Suite 400",
    city: "San Francisco · CA 94105",
  },
  {
    name: "Studio West",
    addr1: "412 Burnside Avenue",
    city: "Portland · OR 97214",
  },
  {
    name: "Studio Pacific",
    addr1: "1808 Bell Street, 3rd Floor",
    city: "Seattle · WA 98121",
  },
];

export default function ContactPage() {
  return (
    <div className="px-6 py-20">
      {/* Centered offices block */}
      <div className="max-w-6xl mx-auto">
        <h1
          className="sr-only"
        >
          Contact Cloudstone Designs
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 text-center">
          {offices.map((o) => (
            <div key={o.name} className="flex flex-col items-center">
              <p
                className="text-[12px] font-bold tracking-[0.18em] uppercase text-black mb-1.5"
                style={{ fontFamily: "var(--font-sans-display)" }}
              >
                {o.name}
              </p>
              <p className="text-[12px] tracking-[0.12em] uppercase text-[#666]">{o.addr1}</p>
              <p className="text-[12px] tracking-[0.12em] uppercase text-[#666] mb-6">{o.city}</p>

              {/* Map / photo placeholder block */}
              <div className="w-full aspect-[4/3] bg-[#f2f2f2] flex items-center justify-center text-[#bbb] text-3xl font-light">
                +
              </div>
            </div>
          ))}
        </div>

        {/* Phone + email centered */}
        <div className="mt-16 flex flex-col items-center gap-2 text-[13px] tracking-[0.06em]">
          <span className="text-black">+1 415 555 0148</span>
          <a
            href="mailto:studio@cloudstonedesigns.com"
            className="text-black underline underline-offset-4 hover:opacity-60 transition-opacity"
          >
            studio@cloudstonedesigns.com
          </a>
        </div>
      </div>

      {/* Inquiry form block (kept — functional content) */}
      <div className="max-w-3xl mx-auto mt-32 border-t border-[#eee] pt-16">
        <p
          className="text-[11px] font-bold tracking-[0.22em] uppercase text-black text-center mb-3"
          style={{ fontFamily: "var(--font-sans-display)" }}
        >
          Project Inquiry
        </p>
        <h2
          className="text-[28px] md:text-[40px] font-bold leading-[1.1] tracking-[-0.02em] text-black text-center mb-10"
          style={{ fontFamily: "var(--font-sans-display)" }}
        >
          Tell us about your project.
        </h2>
        <ContactForm />
      </div>
    </div>
  );
}
