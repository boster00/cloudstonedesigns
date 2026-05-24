"use client";

import { useState, FormEvent } from "react";

type FormState = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [state, setState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("submitting");
    setErrorMessage("");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    // Honeypot check (client side)
    if (data._hp) {
      setState("success");
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setState("success");
      } else {
        const json = (await res.json()) as { error?: string };
        setErrorMessage(json.error ?? "Something went wrong. Please try again.");
        setState("error");
      }
    } catch {
      setErrorMessage("Network error. Please try again.");
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div className="bg-[var(--color-accent-tint)] px-8 py-12 text-center max-w-xl mx-auto">
        <h3
          className="text-2xl font-light mb-3"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Thank you.
        </h3>
        <p className="text-[var(--color-neutral-mid)]">
          We have received your inquiry and will be in touch within two business days.
        </p>
      </div>
    );
  }

  const fieldClass =
    "w-full border border-[var(--color-surface)] bg-white px-4 py-3 text-sm focus:outline-none focus:border-[var(--color-accent)] transition-colors";
  const labelClass = "block text-xs tracking-widest uppercase text-[var(--color-neutral-mid)] mb-1.5";

  return (
    <form onSubmit={handleSubmit} className="max-w-xl space-y-6">
      {/* Honeypot — hidden from humans */}
      <div aria-hidden="true" className="hidden">
        <input type="text" name="_hp" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className={labelClass}>Name *</label>
          <input id="name" name="name" type="text" required className={fieldClass} />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>Email *</label>
          <input id="email" name="email" type="email" required className={fieldClass} />
        </div>
      </div>

      <div>
        <label htmlFor="phone" className={labelClass}>Phone</label>
        <input id="phone" name="phone" type="tel" className={fieldClass} />
      </div>

      <div>
        <label htmlFor="serviceType" className={labelClass}>Service Type</label>
        <select id="serviceType" name="serviceType" className={fieldClass}>
          <option value="">Select…</option>
          <option value="Residential">Residential</option>
          <option value="Commercial">Commercial</option>
          <option value="Interior">Interior</option>
          <option value="Renovation">Renovation</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div>
        <label htmlFor="projectLocation" className={labelClass}>Project Location</label>
        <input id="projectLocation" name="projectLocation" type="text" className={fieldClass} />
      </div>

      <div>
        <label htmlFor="budget" className={labelClass}>Estimated Budget</label>
        <select id="budget" name="budget" className={fieldClass}>
          <option value="">Select…</option>
          <option value="Under $500K">Under $500K</option>
          <option value="$500K–$1M">$500K–$1M</option>
          <option value="$1M–$3M">$1M–$3M</option>
          <option value="$3M+">$3M+</option>
          <option value="Not sure">Not sure</option>
        </select>
      </div>

      <div>
        <label htmlFor="startDate" className={labelClass}>Preferred Start</label>
        <select id="startDate" name="startDate" className={fieldClass}>
          <option value="">Select…</option>
          <option value="ASAP">ASAP</option>
          <option value="3–6 months">3–6 months</option>
          <option value="6–12 months">6–12 months</option>
          <option value="1+ year">1+ year</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>Message *</label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className={fieldClass}
        />
      </div>

      {state === "error" && (
        <p className="text-sm text-red-600">{errorMessage}</p>
      )}

      <button
        type="submit"
        disabled={state === "submitting"}
        className="bg-[var(--color-primary)] text-[var(--color-bg)] px-10 py-3 text-sm tracking-wide hover:bg-[var(--color-accent)] transition-colors disabled:opacity-50"
      >
        {state === "submitting" ? "Sending…" : "Send Inquiry"}
      </button>
    </form>
  );
}
