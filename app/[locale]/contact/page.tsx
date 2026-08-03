"use client";
import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import Script from "next/script";
import { Container, Section, Eyebrow } from "@/components/ui/container";
import { PageHero } from "@/components/layout/page-hero";
import { RgpdChecker } from "@/components/tools/rgpd-checker";
import { SITE } from "@/lib/site";

const TURNSTILE_SITE_KEY = "0x4AAAAAAEFhVlYr9OXOOWyC";
const CALENDLY_URL = "https://calendly.com/corpshoresolutions/book-a-discovery-call-meeting-with-corpshore-solutions";

export default function ContactPage() {
  const t = useTranslations("Contact");
  const locale = useLocale();
  const isFr = locale === "fr";

  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setStatus("sent");
        form.reset();
        if (typeof window !== "undefined" && (window as any).turnstile) {
          (window as any).turnstile.reset();
        }
      } else {
        const body = await res.json().catch(() => ({}));
        setErrorMsg(body.error ?? (isFr ? "Une erreur est survenue." : "An error occurred."));
        setStatus("error");
        if (typeof window !== "undefined" && (window as any).turnstile) {
          (window as any).turnstile.reset();
        }
      }
    } catch {
      setErrorMsg(isFr ? "Impossible d'envoyer le message." : "Could not send message.");
      setStatus("error");
    }
  }

  const contactItems = [
    { icon: "📧", label: t("info.emailLabel"), value: SITE.email, href: `mailto:${SITE.email}`, sub: t("info.replyTime") },
    { icon: "🌐", label: t("info.siteLabel"), value: "corpshore.solutions/france/", href: SITE.globalUrl, sub: null },
    { icon: "🏢", label: t("info.hqLabel"), value: SITE.hq, href: null, sub: null },
    {
      icon: "🏆",
      label: t("info.rankingLabel"),
      value: isFr ? "#1 BPO en France · Outsource Accelerator 2026" : "#1 BPO in France · Outsource Accelerator 2026",
      href: SITE.oaUrl,
      sub: null,
    },
  ] as const;

  const serviceOptions = [
    t("services.bpo"), t("services.it"), t("services.ai"),
    t("services.hr"), t("services.finance"), t("services.cx"), t("services.other"),
  ];

  const inputCls = "w-full h-10 px-3 text-sm border border-[var(--color-border)] rounded-[var(--radius)] focus:outline-none focus:ring-2 focus:ring-[var(--color-marine-800)]";

  return (
    <>
      <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="lazyOnload" />
      <Script src="https://assets.calendly.com/assets/external/widget.js" strategy="lazyOnload" />

      <PageHero
        label={t("hero.label")}
        heading={t("hero.h1")}
        sub={t("hero.sub")}
      />

      {/* RGPD Compliance Checker */}
      <Section tone="muted">
        <Container>
          <div className="text-center max-w-xl mx-auto mb-12">
            <Eyebrow>{isFr ? "Vérificateur RGPD" : "GDPR checker"}</Eyebrow>
            <h2>
              {isFr
                ? "Auditez votre conformité RGPD en 2 minutes"
                : "Audit your GDPR compliance in 2 minutes"}
            </h2>
            <p className="mt-4 text-[var(--color-granit)]">
              {isFr
                ? "6 questions pour identifier vos risques RGPD avant d'externaliser — et comment Corpshore peut vous accompagner."
                : "6 questions to identify your GDPR risks before outsourcing — and how Corpshore can help you address them."}
            </p>
          </div>
          <RgpdChecker />
        </Container>
      </Section>

      <Section tone="default">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">

            {/* Form */}
            <div>
              <Eyebrow>{t("hero.label")}</Eyebrow>
              <h2 className="mb-2">{isFr ? "Écrivez-nous" : "Get in touch"}</h2>
              <p className="text-sm text-[var(--color-granit)] mb-6">* {t("form.required")}</p>

              <div className="card-base p-8">
                {status === "sent" ? (
                  <div className="text-center py-10">
                    <div className="text-5xl mb-4">✅</div>
                    <h3 className="mb-3">{isFr ? "Message envoyé !" : "Message sent!"}</h3>
                    <p className="text-[var(--color-granit)]">
                      {isFr ? "Nous vous répondons sous 24 heures ouvrables." : "We reply within 24 business hours."}
                    </p>
                    <button
                      onClick={() => setStatus("idle")}
                      className="mt-6 text-sm font-semibold text-[var(--color-marine-800)] hover:underline cursor-pointer"
                    >
                      {isFr ? "Envoyer un autre message" : "Send another message"}
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium mb-1.5">{t("form.nom")} *</label>
                        <input type="text" name="nom" required className={inputCls} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1.5">{t("form.prenom")} *</label>
                        <input type="text" name="prenom" required className={inputCls} />
                      </div>
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-1.5">{t("form.societe")}</label>
                      <input type="text" name="societe" className={inputCls} />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium mb-1.5">{t("form.email")} *</label>
                        <input type="email" name="email" required className={inputCls} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1.5">{t("form.tel")}</label>
                        <input type="tel" name="tel" className={inputCls} />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium mb-1.5">{t("form.pays")} *</label>
                        <select name="pays" required className={`${inputCls} bg-white`}>
                          <option value="">—</option>
                          <option>France</option><option>Belgique</option><option>Suisse</option>
                          <option>Luxembourg</option><option>Monaco</option>
                          <option>{isFr ? "Autre UE" : "Other EU"}</option>
                          <option>{isFr ? "Autre" : "Other"}</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1.5">{t("form.service")} *</label>
                        <select name="service" required className={`${inputCls} bg-white`}>
                          <option value="">—</option>
                          {serviceOptions.map((s) => <option key={s}>{s}</option>)}
                        </select>
                      </div>
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-1.5">{t("form.message")} *</label>
                      <textarea name="message" required rows={5} className="w-full px-3 py-2 text-sm border border-[var(--color-border)] rounded-[var(--radius)] focus:outline-none focus:ring-2 focus:ring-[var(--color-marine-800)] resize-y" />
                    </div>
                    <div className="mb-5 flex gap-2.5 items-start">
                      <input type="checkbox" id="rgpd-contact" name="rgpd" required className="mt-0.5 h-4 w-4 accent-[var(--color-marine-800)]" />
                      <label htmlFor="rgpd-contact" className="text-xs text-[var(--color-granit)] leading-relaxed">
                        {t("form.rgpd")} *{" "}
                        <a href="/mentions-legales#rgpd" className="underline text-[var(--color-marine-800)]">RGPD</a>
                      </label>
                    </div>
                    <div className="cf-turnstile mb-5" data-sitekey={TURNSTILE_SITE_KEY} />
                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="w-full h-11 bg-[var(--color-marine-800)] text-white text-sm font-semibold rounded-[var(--radius)] hover:bg-[var(--color-marine-700)] disabled:opacity-60 transition-colors cursor-pointer"
                    >
                      {status === "sending" ? (isFr ? "Envoi en cours…" : "Sending…") : t("form.submit")}
                    </button>
                    {status === "error" && (
                      <p className="text-red-600 text-sm mt-3">{errorMsg}</p>
                    )}
                  </form>
                )}
              </div>
            </div>

            {/* Contact info */}
            <div>
              <Eyebrow>Informations</Eyebrow>
              <h2 className="mb-8">{isFr ? "Nos coordonnées" : "Contact details"}</h2>
              <div className="space-y-5 mb-8">
                {contactItems.map(({ icon, label, value, href, sub }) => (
                  <div key={label} className="flex gap-4 items-start">
                    <div className="w-11 h-11 rounded-full bg-[var(--color-calcaire)] border border-[var(--color-border)] flex items-center justify-center text-xl shrink-0">
                      {icon}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[var(--color-marine-800)] uppercase tracking-wide mb-1">{label}</p>
                      {href ? (
                        <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                           className="text-sm font-medium text-[var(--color-marine-800)] hover:underline">
                          {value}
                        </a>
                      ) : (
                        <p className="text-sm font-medium">{value}</p>
                      )}
                      {sub && <p className="text-xs text-[var(--color-granit)] mt-0.5">{sub}</p>}
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-6 bg-[var(--color-marine-50)] border border-[var(--color-marine-100)] rounded-[var(--radius-lg)]">
                <p className="text-sm font-semibold text-[var(--color-marine-800)] mb-2">
                  🎯 {isFr ? "Recrutement" : "Recruitment"}
                </p>
                <p className="text-sm text-[var(--color-granit)]">
                  {isFr ? (
                    <>
                      Pour les candidatures, rendez-vous sur notre page{" "}
                      <a href="/fr/carrieres" className="font-semibold text-[var(--color-marine-800)] underline">Carrières</a>{" "}
                      ou écrivez à{" "}
                      <a href={`mailto:${SITE.email}`} className="font-semibold text-[var(--color-marine-800)] underline">{SITE.email}</a>.
                    </>
                  ) : (
                    <>
                      For applications, visit our{" "}
                      <a href="/en/carrieres" className="font-semibold text-[var(--color-marine-800)] underline">Careers page</a>{" "}
                      or email{" "}
                      <a href={`mailto:${SITE.email}`} className="font-semibold text-[var(--color-marine-800)] underline">{SITE.email}</a>.
                    </>
                  )}
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Calendly booking */}
      <Section tone="muted">
        <Container>
          <div className="text-center max-w-xl mx-auto mb-8">
            <Eyebrow>{isFr ? "Prise de rendez-vous" : "Book a call"}</Eyebrow>
            <h2>{isFr ? "Réservez un appel découverte" : "Book a discovery call"}</h2>
            <p className="mt-3 text-[var(--color-granit)]">
              {isFr
                ? "Choisissez un créneau. Un consultant Corpshore vous parle dans les 24 heures."
                : "Pick a slot. A Corpshore consultant will speak with you within 24 hours."}
            </p>
          </div>
          <div className="max-w-4xl mx-auto rounded-[var(--radius-xl)] overflow-hidden border border-[var(--color-border)] bg-white">
            <div
              className="calendly-inline-widget"
              data-url={CALENDLY_URL}
              style={{ minWidth: "320px", height: "700px" }}
            />
          </div>
        </Container>
      </Section>
    </>
  );
}
