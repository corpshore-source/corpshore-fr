"use client";
import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { useLocale } from "next-intl";

const QUESTIONS_FR = [
  {
    q: "Vos données clients sont-elles hébergées sur des serveurs situés dans l'Union Européenne ?",
    risk: "Transferts hors UE sans garanties RGPD adéquates = exposition CNIL",
  },
  {
    q: "Avez-vous un registre des activités de traitement à jour (article 30 RGPD) ?",
    risk: "Absence de registre : infraction directement constatée lors d'un audit CNIL",
  },
  {
    q: "Vos prestataires actuels ont-ils signé un Accord de Traitement des Données (DPA / article 28) ?",
    risk: "Sans DPA signé, la responsabilité conjointe engage directement votre entreprise",
  },
  {
    q: "Avez-vous désigné un Délégué à la Protection des Données (DPO) ou un référent RGPD interne ?",
    risk: "Obligatoire pour les organismes traitant des données à grande échelle ou des données sensibles",
  },
  {
    q: "Vos équipes en contact avec les données clients ont-elles été formées au RGPD au cours des 12 derniers mois ?",
    risk: "Le facteur humain est la première cause de violations de données personnelles",
  },
  {
    q: "Vos formulaires de collecte de données respectent-ils le consentement explicite et le droit à l'information (articles 7 et 13) ?",
    risk: "Consentement implicite ou pré-coché : sanction CNIL fréquente",
  },
];

const QUESTIONS_EN = [
  {
    q: "Is your customer data hosted on servers located in the European Union?",
    risk: "Transfers outside the EU without adequate GDPR safeguards = regulatory exposure",
  },
  {
    q: "Do you have an up-to-date records of processing activities (Article 30 GDPR)?",
    risk: "Missing records register: directly flagged during a data protection audit",
  },
  {
    q: "Have your current service providers signed a Data Processing Agreement (DPA / Article 28)?",
    risk: "Without a signed DPA, joint liability directly engages your company",
  },
  {
    q: "Have you appointed a Data Protection Officer (DPO) or an internal GDPR reference person?",
    risk: "Mandatory for organisations processing data at scale or processing sensitive data",
  },
  {
    q: "Have your teams handling personal data received GDPR training in the past 12 months?",
    risk: "Human error is the leading cause of personal data breaches",
  },
  {
    q: "Do your data collection forms comply with explicit consent and the right to information (Articles 7 and 13)?",
    risk: "Pre-ticked consent boxes: frequently sanctioned by data protection authorities",
  },
];

type Answer = boolean | null;

export function RgpdChecker() {
  const locale = useLocale();
  const isFr = locale === "fr";
  const questions = isFr ? QUESTIONS_FR : QUESTIONS_EN;

  const [answers, setAnswers] = useState<Answer[]>(Array(6).fill(null));
  const [showResult, setShowResult] = useState(false);

  const score = answers.filter(a => a === true).length;
  const answered = answers.filter(a => a !== null).length;
  const failedIdxs = answers.map((a, i) => (a === false ? i : null)).filter(i => i !== null) as number[];

  function set(i: number, val: boolean) {
    setAnswers(prev => prev.map((a, j) => j === i ? val : a));
  }

  const level = score <= 2 ? "danger" : score <= 4 ? "warning" : "ok";
  const levelConfig = {
    danger:  { label: isFr ? "Risques élevés" : "High risk",    color: "#dc2626", bg: "#fef2f2", border: "#fecaca", emoji: "🔴" },
    warning: { label: isFr ? "À améliorer" : "Needs improvement", color: "#d97706", bg: "#fffbeb", border: "#fde68a", emoji: "🟡" },
    ok:      { label: isFr ? "Conforme" : "Compliant",           color: "#16a34a", bg: "#f0fdf4", border: "#bbf7d0", emoji: "🟢" },
  };

  function reset() {
    setAnswers(Array(6).fill(null));
    setShowResult(false);
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="space-y-4">
        {questions.map((q, i) => {
          const ans = answers[i];
          return (
            <div
              key={i}
              className={`card-base p-5 border-l-4 transition-colors ${
                ans === true  ? "border-l-green-500 bg-green-50/30"  :
                ans === false ? "border-l-red-400 bg-red-50/30"     :
                "border-l-[var(--color-border)]"
              }`}
            >
              <p className="text-sm font-medium text-[var(--color-encre)] mb-3 leading-relaxed">{q.q}</p>
              <div className="flex items-center gap-3">
                {[true, false].map(val => (
                  <button
                    key={String(val)}
                    onClick={() => set(i, val)}
                    className={`px-5 py-2 rounded-full text-sm font-semibold transition-all border ${
                      ans === val
                        ? val
                          ? "bg-green-600 text-white border-green-600"
                          : "bg-red-500 text-white border-red-500"
                        : "bg-white border-[var(--color-border)] text-[var(--color-granit)] hover:border-[var(--color-marine-800)]"
                    }`}
                  >
                    {val ? (isFr ? "Oui" : "Yes") : (isFr ? "Non" : "No")}
                  </button>
                ))}
                {ans === false && (
                  <p className="text-xs text-red-600 italic ml-2">⚠ {q.risk}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex justify-center">
        <button
          onClick={() => setShowResult(true)}
          disabled={answered < 6}
          className="px-10 py-4 bg-[var(--color-marine-800)] text-white rounded-full font-semibold text-sm hover:bg-[var(--color-marine-700)] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {answered < 6
            ? isFr ? `Répondez aux ${6 - answered} questions restantes` : `Answer ${6 - answered} more questions`
            : isFr ? "Voir mon diagnostic RGPD →" : "See my GDPR diagnosis →"}
        </button>
      </div>

      {showResult && (
        <div
          className="mt-6 rounded-[var(--radius-xl)] p-6 border"
          style={{ backgroundColor: levelConfig[level].bg, borderColor: levelConfig[level].border }}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">{levelConfig[level].emoji}</span>
            <div>
              <p className="font-bold text-lg" style={{ color: levelConfig[level].color }}>
                {levelConfig[level].label} — {score}/6
              </p>
              <p className="text-sm text-[var(--color-granit)]">
                {isFr ? `${score} critères conformes sur 6` : `${score} compliant criteria out of 6`}
              </p>
            </div>
          </div>

          {failedIdxs.length > 0 && (
            <div className="mb-5">
              <p className="text-sm font-semibold mb-2" style={{ color: levelConfig[level].color }}>
                {isFr ? "Points à corriger en priorité :" : "Priority items to address:"}
              </p>
              <ul className="space-y-1.5">
                {failedIdxs.map(i => (
                  <li key={i} className="text-sm text-[var(--color-granit)] flex items-start gap-2">
                    <span className="shrink-0 mt-0.5">▸</span>
                    <span>{questions[i].risk}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex gap-3 flex-wrap">
            <Link
              href="/contact"
              className="px-6 py-3 bg-[var(--color-marine-800)] text-white rounded-full font-semibold text-sm hover:bg-[var(--color-marine-700)] transition-colors"
            >
              {isFr ? "Discuter de ma conformité →" : "Discuss my compliance →"}
            </Link>
            <button
              onClick={reset}
              className="px-6 py-3 border border-[var(--color-border)] rounded-full text-sm font-medium text-[var(--color-granit)] hover:border-[var(--color-marine-800)] transition-colors"
            >
              {isFr ? "Recommencer" : "Restart"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
