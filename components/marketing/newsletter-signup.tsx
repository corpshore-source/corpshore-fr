"use client";
import { useState } from "react";
import { useLocale } from "next-intl";

export function NewsletterSignup({ dark = false }: { dark?: boolean }) {
  const locale = useLocale();
  const isFr = locale === "fr";
  const [email, setEmail] = useState("");
  const [rgpd, setRgpd] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "err">("idle");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!rgpd) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, rgpd }),
      });
      setStatus(res.ok ? "ok" : "err");
    } catch {
      setStatus("err");
    }
  }

  const textCls = dark ? "text-white/70" : "text-[var(--color-granit)]";
  const labelCls = dark ? "text-white/50" : "text-[var(--color-granit)]";

  if (status === "ok") {
    return (
      <p className={`text-sm ${textCls}`}>
        ✅ {isFr ? "Vous êtes abonné à notre newsletter !" : "You're subscribed to our newsletter!"}
      </p>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <p className={`text-xs font-semibold uppercase tracking-widest ${dark ? "text-white" : "text-[var(--color-encre)]"} mb-3`}>
        {isFr ? "Newsletter" : "Newsletter"}
      </p>
      <div className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder={isFr ? "Votre email professionnel" : "Your professional email"}
          className={`flex-1 h-9 px-3 text-sm rounded-[var(--radius)] border focus:outline-none focus:ring-2 focus:ring-[var(--color-marine-800)] ${
            dark
              ? "bg-white/10 border-white/20 text-white placeholder:text-white/40"
              : "bg-white border-[var(--color-border)] text-[var(--color-encre)]"
          }`}
        />
        <button
          type="submit"
          disabled={status === "sending" || !rgpd}
          className="h-9 px-4 bg-[var(--color-vermeil-500)] hover:bg-[var(--color-vermeil-600)] text-white text-sm font-semibold rounded-[var(--radius)] disabled:opacity-50 transition-colors cursor-pointer shrink-0"
        >
          {status === "sending" ? "…" : isFr ? "S'abonner" : "Subscribe"}
        </button>
      </div>
      <div className="flex items-start gap-2">
        <input
          id="newsletter-rgpd"
          type="checkbox"
          checked={rgpd}
          onChange={(e) => setRgpd(e.target.checked)}
          className="mt-0.5 h-3.5 w-3.5 accent-[var(--color-vermeil-500)] shrink-0"
        />
        <label htmlFor="newsletter-rgpd" className={`text-[11px] leading-relaxed ${labelCls}`}>
          {isFr
            ? "J'accepte de recevoir la newsletter Corpshore et confirme avoir lu la politique de confidentialité."
            : "I agree to receive the Corpshore newsletter and confirm I have read the privacy policy."}
        </label>
      </div>
      {status === "err" && (
        <p className="text-xs text-red-400">
          {isFr ? "Erreur. Veuillez réessayer." : "Error. Please try again."}
        </p>
      )}
    </form>
  );
}
