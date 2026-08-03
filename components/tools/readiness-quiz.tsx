"use client";
import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { useLocale } from "next-intl";

const QUESTIONS_FR = [
  { dim: "Processus", q: "Vos processus principaux sont-ils documentés (procédures, scripts, modes opératoires) ?" },
  { dim: "Processus", q: "Avez-vous des KPIs définis et mesurés pour les activités que vous souhaitez externaliser ?" },
  { dim: "Données & RGPD", q: "Vos données clients sont-elles traitées conformément au RGPD ?" },
  { dim: "Données & RGPD", q: "Avez-vous un plan de gestion des accès et de sécurité des données pour un prestataire externe ?" },
  { dim: "Budget & Gouvernance", q: "Un budget a-t-il été alloué et approuvé par la direction pour ce projet ?" },
  { dim: "Budget & Gouvernance", q: "Un sponsor exécutif (DG, DAF ou DSI) porte-t-il ce projet en interne ?" },
  { dim: "Management", q: "Avez-vous un référent ou chef de projet interne dédié au pilotage du prestataire ?" },
  { dim: "Management", q: "Votre équipe est-elle prête à accompagner la transition et le transfert de compétences ?" },
] as const;

const QUESTIONS_EN = [
  { dim: "Process", q: "Are your main processes documented (procedures, scripts, operating manuals)?" },
  { dim: "Process", q: "Do you have defined and measured KPIs for the activities you want to outsource?" },
  { dim: "Data & GDPR", q: "Is your customer data handled in compliance with GDPR?" },
  { dim: "Data & GDPR", q: "Do you have an access management and data security plan for an external provider?" },
  { dim: "Budget & Governance", q: "Has a budget been allocated and approved by management for this project?" },
  { dim: "Budget & Governance", q: "Is an executive sponsor (CEO, CFO or CIO) championing this project internally?" },
  { dim: "Management", q: "Do you have a dedicated internal project manager to oversee the provider?" },
  { dim: "Management", q: "Is your team ready to support the transition and knowledge transfer?" },
] as const;

const TIERS_FR = [
  { label: "Explorer", desc: "Votre organisation est en phase de réflexion. Nous recommandons un atelier de cadrage gratuit avant tout pilote.", color: "var(--color-or-500)", emoji: "🔍" },
  { label: "Pilote", desc: "Vous êtes prêt pour un projet pilote de 8-12 semaines sur une activité ciblée. Résultats mesurables rapidement.", color: "#2563eb", emoji: "🚀" },
  { label: "Déploiement", desc: "Votre maturité permet un déploiement complet. Nos équipes peuvent être opérationnelles en 4-6 semaines.", color: "#16a34a", emoji: "✅" },
];

const TIERS_EN = [
  { label: "Explorer", desc: "Your organisation is in the reflection phase. We recommend a free scoping workshop before any pilot.", color: "var(--color-or-500)", emoji: "🔍" },
  { label: "Pilot", desc: "You're ready for an 8-12 week pilot on a targeted activity. Measurable results quickly.", color: "#2563eb", emoji: "🚀" },
  { label: "Full deployment", desc: "Your maturity enables a full deployment. Our teams can be operational within 4-6 weeks.", color: "#16a34a", emoji: "✅" },
];

type Answer = true | false | null;

export function ReadinessQuiz() {
  const locale = useLocale();
  const isFr = locale === "fr";
  const questions = isFr ? QUESTIONS_FR : QUESTIONS_EN;
  const tiers = isFr ? TIERS_FR : TIERS_EN;

  const [answers, setAnswers] = useState<Answer[]>(Array(8).fill(null));
  const [submitted, setSubmitted] = useState(false);

  const score = answers.filter(a => a === true).length;
  const answered = answers.filter(a => a !== null).length;
  const tier = score <= 3 ? 0 : score <= 5 ? 1 : 2;

  function set(i: number, val: boolean) {
    setAnswers(prev => prev.map((a, j) => j === i ? val : a));
  }

  function reset() {
    setAnswers(Array(8).fill(null));
    setSubmitted(false);
  }

  const dims = Array.from(new Set(questions.map(q => q.dim)));

  if (submitted) {
    const t = tiers[tier];
    return (
      <div className="card-base p-10 text-center max-w-2xl mx-auto">
        <div className="text-6xl mb-4">{t.emoji}</div>
        <div
          className="inline-block px-4 py-1.5 rounded-full text-white text-sm font-bold mb-4"
          style={{ backgroundColor: t.color }}
        >
          {t.label} — {score}/8
        </div>
        <h3 className="text-xl mb-3">{isFr ? "Votre niveau de maturité" : "Your maturity level"}</h3>
        <p className="text-[var(--color-granit)] leading-relaxed mb-8">{t.desc}</p>

        {/* Bar chart */}
        <div className="flex justify-center gap-6 mb-8">
          {dims.map((dim, di) => {
            const dimAnswers = answers.slice(di * 2, di * 2 + 2);
            const dimScore = dimAnswers.filter(a => a === true).length;
            return (
              <div key={dim} className="text-center w-20">
                <div className="h-20 bg-[var(--color-calcaire)] rounded-lg relative overflow-hidden mx-auto mb-2">
                  <div
                    className="absolute bottom-0 left-0 right-0 rounded-lg transition-all duration-700"
                    style={{ height: `${(dimScore / 2) * 100}%`, backgroundColor: t.color }}
                  />
                </div>
                <p className="text-xs font-medium text-[var(--color-granit)] leading-tight">{dim}</p>
                <p className="text-xs font-bold" style={{ color: t.color }}>{dimScore}/2</p>
              </div>
            );
          })}
        </div>

        <div className="flex gap-3 justify-center flex-wrap">
          <Link
            href="/contact"
            className="px-6 py-3 bg-[var(--color-marine-800)] text-white rounded-full font-semibold text-sm hover:bg-[var(--color-marine-700)] transition-colors"
          >
            {isFr ? "Parler à un expert →" : "Talk to an expert →"}
          </Link>
          <button
            onClick={reset}
            className="px-6 py-3 border border-[var(--color-border)] rounded-full text-sm font-medium text-[var(--color-granit)] hover:border-[var(--color-marine-800)] hover:text-[var(--color-marine-800)] transition-colors"
          >
            {isFr ? "Recommencer" : "Restart"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress */}
      <div className="flex items-center gap-3 mb-8">
        <div className="flex-1 h-1.5 bg-[var(--color-cendre)] rounded-full overflow-hidden">
          <div
            className="h-full bg-[var(--color-marine-800)] rounded-full transition-all duration-300"
            style={{ width: `${(answered / 8) * 100}%` }}
          />
        </div>
        <span className="text-xs font-mono text-[var(--color-granit)] whitespace-nowrap">{answered}/8</span>
      </div>

      <div className="space-y-5">
        {dims.map((dim, di) => (
          <div key={dim} className="card-base p-6">
            <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-marine-800)] mb-4">{dim}</p>
            <div className="space-y-4">
              {questions.slice(di * 2, di * 2 + 2).map((q, qi) => {
                const idx = di * 2 + qi;
                const ans = answers[idx];
                return (
                  <div key={qi}>
                    <p className="text-sm text-[var(--color-encre)] leading-relaxed mb-2">{q.q}</p>
                    <div className="flex gap-2">
                      {[true, false].map(val => (
                        <button
                          key={String(val)}
                          onClick={() => set(idx, val)}
                          className={`px-5 py-2 rounded-full text-sm font-semibold transition-all border ${
                            ans === val
                              ? val
                                ? "bg-[#16a34a] text-white border-[#16a34a]"
                                : "bg-[var(--color-vermeil-500)] text-white border-[var(--color-vermeil-500)]"
                              : "bg-white border-[var(--color-border)] text-[var(--color-granit)] hover:border-[var(--color-marine-800)]"
                          }`}
                        >
                          {val ? (isFr ? "Oui" : "Yes") : (isFr ? "Non" : "No")}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={() => setSubmitted(true)}
          disabled={answered < 8}
          className="px-10 py-4 bg-[var(--color-marine-800)] text-white rounded-full font-semibold text-sm hover:bg-[var(--color-marine-700)] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {isFr
            ? answered < 8 ? `Répondez aux ${8 - answered} questions restantes` : "Voir mon score de maturité →"
            : answered < 8 ? `Answer ${8 - answered} more questions` : "See my maturity score →"
          }
        </button>
      </div>
    </div>
  );
}
