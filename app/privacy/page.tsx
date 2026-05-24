export const metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-20">
      <h1
        className="text-4xl font-light mb-10 text-[var(--color-primary)]"
        style={{ fontFamily: "var(--font-serif)" }}
      >
        Privacy Policy
      </h1>
      <div className="prose-article">
        <p>
          Cloudstone Designs collects only the information you voluntarily provide through our
          contact form. We use this information solely to respond to your inquiry and do not
          sell, share, or otherwise disclose it to third parties.
        </p>
        <p>
          Our website does not use tracking cookies or third-party analytics beyond what is
          required for basic hosting and performance monitoring.
        </p>
        <p>
          If you have questions about how we handle your information, please contact us at{" "}
          <a href="mailto:studio@cloudstonedesigns.com">studio@cloudstonedesigns.com</a>.
        </p>
      </div>
    </div>
  );
}
