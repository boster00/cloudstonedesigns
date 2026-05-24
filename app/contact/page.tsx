import MarqueeText from "@/components/MarqueeText";
import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: "Contact",
  description: "Start a conversation with Cloudstone Designs.",
};

export default function ContactPage() {
  return (
    <div>
      {/* Marquee */}
      <div className="py-12 border-b border-[var(--color-surface)] overflow-hidden">
        <MarqueeText text="Let's work together · " />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-20">
        {/* Studio info */}
        <div>
          <p className="text-xs tracking-widest uppercase text-[var(--color-accent)] mb-6">
            Get in Touch
          </p>
          <h1
            className="text-4xl font-light text-[var(--color-primary)] mb-8"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Start a Conversation
          </h1>
          <p className="text-[var(--color-neutral-mid)] leading-relaxed mb-10 max-w-sm">
            We respond to every inquiry within two business days. The more context you can share
            about your project, the better we can calibrate our response.
          </p>
          <div className="text-sm text-[var(--color-neutral-mid)] space-y-2">
            <p className="font-medium text-[var(--color-primary)]">Cloudstone Designs</p>
            <p>123 Market Street, Suite 400</p>
            <p>San Francisco, CA 94105</p>
            <p className="mt-4">
              <a
                href="mailto:studio@cloudstonedesigns.com"
                className="text-[var(--color-accent)] hover:opacity-75 transition-opacity"
              >
                studio@cloudstonedesigns.com
              </a>
            </p>
          </div>
        </div>

        {/* Form */}
        <div>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
