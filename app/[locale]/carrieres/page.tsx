"use client";
import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import Script from "next/script";
import { Container, Section, Eyebrow } from "@/components/ui/container";
import { PageHero } from "@/components/layout/page-hero";
import { jobs } from "@/lib/data/jobs";

const TURNSTILE_SITE_KEY = "0x4AAAAAAEFhVlYr9OXOOWyC";

// Note: this page uses client-side filtering so we use a client component at the page level.
// generateMetadata is handled by the parent layout for this locale.

export default function CarriersPage() {
  const locale = useLocale();
  const t = useTranslations("Careers");
  const isFr = locale === "fr";

  const [dept, setDept] = useState("all");
  const [level, setLevel] = useState("all");
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [formError, setFormError] = useState("");

  async function handleApply(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormStatus("sending");
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch("/api/careers", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        setFormStatus("sent");
        form.reset();
        if (typeof window !== "undefined" && (window as any).turnstile) {
          (window as any).turnstile.reset();
        }
      } else {
        const body = await res.json().catch(() => ({}));
        setFormError(body.error ?? (isFr ? "Une erreur est survenue." : "An error occurred."));
        setFormStatus("error");
        if (typeof window !== "undefined" && (window as any).turnstile) {
          (window as any).turnstile.reset();
        }
      }
    } catch {
      setFormError(isFr ? "Impossible d'envoyer la candidature." : "Could not send application.");
      setFormStatus("error");
    }
  }

  const departments = ["all", ...new Set(jobs.map((j) => isFr ? j.department : j.departmentEn))];
  const levels = ["all", ...new Set(jobs.map((j) => isFr ? j.level : j.levelEn))];

  const filtered = jobs.filter((j) => {
    const d = isFr ? j.department : j.departmentEn;
    const l = isFr ? j.level : j.levelEn;
    return (dept === "all" || d === dept) && (level === "all" || l === level);
  });

  const levelColor: Record<string, string> = {
    "Junior": "bg-green-50 text-green-700 border-green-200",
    "Intermédiaire": "bg-blue-50 text-blue-700 border-blue-200",
    "Mid-Level": "bg-blue-50 text-blue-700 border-blue-200",
    "Senior": "bg-purple-50 text-purple-700 border-purple-200",
  };

  return (
    <>
      <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="lazyOnload" />
      <PageHero
        label={t("hero.label")}
        heading={t("hero.h1")}
        sub={t("hero.sub")}
        image="/images/recrutement-teletravail-france.webp"
      >
        <div className="flex flex-wrap gap-3">
          <span className="inline-flex items-center gap-1.5 text-sm bg-white/10 border border-white/20 text-white px-3 py-1.5 rounded-full">
            🌐 {isFr ? "100% Télétravail disponible" : "100% Remote available"}
          </span>
          <span className="inline-flex items-center gap-1.5 text-sm bg-white/10 border border-white/20 text-white px-3 py-1.5 rounded-full">
            📋 {jobs.length} {t("filter.jobCount")}
          </span>
          <span className="inline-flex items-center gap-1.5 text-sm bg-white/10 border border-white/20 text-white px-3 py-1.5 rounded-full">
            🏆 {isFr ? "#1 BPO en France" : "#1 BPO in France"}
          </span>
        </div>
      </PageHero>

      <Section tone="default">
        <Container>
          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-8 p-5 bg-[var(--color-calcaire)] rounded-[var(--radius-lg)] border border-[var(--color-border)]">
            <div className="flex items-center gap-2 flex-1 min-w-[200px]">
              <label htmlFor="dept" className="text-sm font-medium text-[var(--color-granit)] shrink-0">
                {isFr ? "Département" : "Department"}
              </label>
              <select
                id="dept"
                value={dept}
                onChange={(e) => setDept(e.target.value)}
                className="flex-1 h-9 px-3 text-sm border border-[var(--color-border)] rounded-[var(--radius)] bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-marine-800)]"
              >
                <option value="all">{t("filter.allDepts")}</option>
                {departments.slice(1).map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-2 flex-1 min-w-[160px]">
              <label htmlFor="level" className="text-sm font-medium text-[var(--color-granit)] shrink-0">
                {isFr ? "Niveau" : "Level"}
              </label>
              <select
                id="level"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="flex-1 h-9 px-3 text-sm border border-[var(--color-border)] rounded-[var(--radius)] bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-marine-800)]"
              >
                <option value="all">{t("filter.allLevels")}</option>
                {levels.slice(1).map((l) => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>
            </div>
            <span className="text-sm text-[var(--color-granit)] self-center">
              {filtered.length} {t("filter.jobCount")}
            </span>
          </div>

          {/* Job grid */}
          {filtered.length === 0 ? (
            <p className="text-center text-[var(--color-granit)] py-12">{t("filter.noResults")}</p>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {filtered.map((job) => {
                const title = isFr ? job.title : job.titleEn;
                const deptLabel = isFr ? job.department : job.departmentEn;
                const levelLabel = isFr ? job.level : job.levelEn;
                const desc = isFr ? job.description : job.descriptionEn;

                return (
                  <article key={job.id} className="card-base p-6">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <h3 className="text-base leading-snug">{title}</h3>
                      <span className={`text-xs font-semibold border px-2 py-0.5 rounded-full shrink-0 ${levelColor[levelLabel] ?? "bg-gray-50 text-gray-700 border-gray-200"}`}>
                        {levelLabel}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="sector-badge">{deptLabel}</span>
                      <span className="text-xs text-[var(--color-granit)] flex items-center gap-1">📍 {job.location}</span>
                      <span className="text-xs text-[var(--color-granit)] flex items-center gap-1">📄 {job.type}</span>
                    </div>
                    <p className="text-sm text-[var(--color-granit)] leading-relaxed mb-4 line-clamp-3">{desc}</p>
                    <a
                      href="#apply"
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-marine-800)] hover:text-[var(--color-vermeil-500)] transition-colors"
                    >
                      {t("filter.applyBtn")} →
                    </a>
                  </article>
                );
              })}
            </div>
          )}
        </Container>
      </Section>

      {/* Application form */}
      <Section tone="muted" id="apply">
        <Container className="max-w-2xl">
          <Eyebrow>{isFr ? "Postuler" : "Apply"}</Eyebrow>
          <h2 className="mb-8">{t("form.h2")}</h2>
          <div className="card-base p-8">
            {formStatus === "sent" ? (
              <div className="text-center py-10">
                <div className="text-5xl mb-4">✅</div>
                <h3 className="mb-3">{isFr ? "Candidature envoyée !" : "Application sent!"}</h3>
                <p className="text-[var(--color-granit)]">
                  {isFr ? "Nous vous répondons sous 5 jours ouvrables." : "We will reply within 5 business days."}
                </p>
                <button onClick={() => setFormStatus("idle")} className="mt-6 text-sm font-semibold text-[var(--color-marine-800)] hover:underline cursor-pointer">
                  {isFr ? "Postuler à un autre poste" : "Apply for another position"}
                </button>
              </div>
            ) : (
            <form onSubmit={handleApply}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5">{t("form.nom")} *</label>
                  <input type="text" name="nom" required className="w-full h-10 px-3 text-sm border border-[var(--color-border)] rounded-[var(--radius)] focus:outline-none focus:ring-2 focus:ring-[var(--color-marine-800)]" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">{t("form.prenom")} *</label>
                  <input type="text" name="prenom" required className="w-full h-10 px-3 text-sm border border-[var(--color-border)] rounded-[var(--radius)] focus:outline-none focus:ring-2 focus:ring-[var(--color-marine-800)]" />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1.5">{t("form.email")} *</label>
                <input type="email" name="email" required className="w-full h-10 px-3 text-sm border border-[var(--color-border)] rounded-[var(--radius)] focus:outline-none focus:ring-2 focus:ring-[var(--color-marine-800)]" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5">{t("form.tel")}</label>
                  <input type="tel" name="tel" className="w-full h-10 px-3 text-sm border border-[var(--color-border)] rounded-[var(--radius)] focus:outline-none focus:ring-2 focus:ring-[var(--color-marine-800)]" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">{t("form.pays")} *</label>
                  <select name="pays" required className="w-full h-10 px-3 text-sm border border-[var(--color-border)] rounded-[var(--radius)] bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-marine-800)]">
                    <option value="">—</option>
                    <option>France</option><option>Belgique</option><option>Suisse</option>
                    <option>Luxembourg</option><option>Canada</option><option>Maroc</option>
                    <option>Sénégal</option><option>Côte d'Ivoire</option>
                    <option>{isFr ? "Autre" : "Other"}</option>
                  </select>
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1.5">{t("form.poste")} *</label>
                <select name="poste" required className="w-full h-10 px-3 text-sm border border-[var(--color-border)] rounded-[var(--radius)] bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-marine-800)]">
                  <option value="">—</option>
                  {jobs.map((j) => (
                    <option key={j.id} value={j.id}>{isFr ? j.title : j.titleEn}</option>
                  ))}
                  <option value="spontanee">{t("form.spontanee")}</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1.5">{t("form.cv")} *</label>
                <input type="file" name="cv" accept=".pdf,.doc,.docx" required className="w-full text-sm text-[var(--color-granit)] file:mr-3 file:py-1.5 file:px-3 file:rounded-[var(--radius)] file:border file:border-[var(--color-border)] file:text-sm file:bg-[var(--color-calcaire)] hover:file:bg-[var(--color-cendre)]" />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1.5">{t("form.lettre")}</label>
                <textarea name="lettre" rows={4} className="w-full px-3 py-2 text-sm border border-[var(--color-border)] rounded-[var(--radius)] focus:outline-none focus:ring-2 focus:ring-[var(--color-marine-800)] resize-y" />
              </div>
              <div className="mb-5 flex gap-2.5 items-start">
                <input type="checkbox" id="rgpd-careers" name="rgpd" required className="mt-0.5 h-4 w-4 accent-[var(--color-marine-800)]" />
                <label htmlFor="rgpd-careers" className="text-xs text-[var(--color-granit)] leading-relaxed">
                  {t("form.rgpd")} *
                </label>
              </div>
              <div className="cf-turnstile mb-5" data-sitekey={TURNSTILE_SITE_KEY} />
              <button
                type="submit"
                disabled={formStatus === "sending"}
                className="w-full h-11 bg-[var(--color-marine-800)] text-white text-sm font-semibold rounded-[var(--radius)] hover:bg-[var(--color-marine-700)] disabled:opacity-60 transition-colors cursor-pointer"
              >
                {formStatus === "sending" ? (isFr ? "Envoi en cours…" : "Sending…") : t("form.submit")}
              </button>
              {formStatus === "error" && (
                <p className="text-red-600 text-sm mt-3">{formError}</p>
              )}
            </form>
            )}
          </div>
        </Container>
      </Section>
    </>
  );
}
