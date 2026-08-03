"use client";
import { useState } from "react";
import { useLocale } from "next-intl";

const DATA_FR = {
  columns: ["Interne France", "Corpshore Afrique", "Offshore Asie générique"],
  icons: ["🇫🇷", "🌍", "🌏"],
  rows: [
    {
      criterion: "Coût ETP mensuel",
      values: ["€6 000–9 000", "€1 800–3 200", "€1 000–2 000"],
      scores: [1, 5, 5],
      winner: [1, 2],
    },
    {
      criterion: "Maîtrise du français",
      values: ["Natif", "Natif", "Limitée"],
      scores: [5, 5, 1],
      winner: [0, 1],
    },
    {
      criterion: "Fuseau horaire France",
      values: ["UTC+1", "UTC / UTC+1", "UTC+7 à +9"],
      scores: [5, 5, 1],
      winner: [0, 1],
    },
    {
      criterion: "Conformité RGPD",
      values: ["Garantie", "DPA disponible", "Risques élevés"],
      scores: [5, 4, 1],
      winner: [0],
    },
    {
      criterion: "Délai de déploiement",
      values: ["3–6 mois", "4–8 semaines", "8–16 semaines"],
      scores: [2, 5, 2],
      winner: [1],
    },
    {
      criterion: "Flexibilité d'effectif",
      values: ["Faible (CDI)", "Haute", "Haute"],
      scores: [1, 5, 5],
      winner: [1, 2],
    },
    {
      criterion: "Références clients France",
      values: ["Toutes", "500+ clients", "Limitées"],
      scores: [5, 5, 2],
      winner: [0, 1],
    },
  ],
};

const DATA_EN = {
  columns: ["In-house France", "Corpshore Africa", "Generic offshore Asia"],
  icons: ["🇫🇷", "🌍", "🌏"],
  rows: [
    {
      criterion: "Monthly FTE cost",
      values: ["€6,000–9,000", "€1,800–3,200", "€1,000–2,000"],
      scores: [1, 5, 5],
      winner: [1, 2],
    },
    {
      criterion: "French proficiency",
      values: ["Native", "Native", "Limited"],
      scores: [5, 5, 1],
      winner: [0, 1],
    },
    {
      criterion: "France timezone",
      values: ["UTC+1", "UTC / UTC+1", "UTC+7 to +9"],
      scores: [5, 5, 1],
      winner: [0, 1],
    },
    {
      criterion: "GDPR compliance",
      values: ["Guaranteed", "DPA available", "High risks"],
      scores: [5, 4, 1],
      winner: [0],
    },
    {
      criterion: "Deployment timeline",
      values: ["3–6 months", "4–8 weeks", "8–16 weeks"],
      scores: [2, 5, 2],
      winner: [1],
    },
    {
      criterion: "Headcount flexibility",
      values: ["Low (permanent)", "High", "High"],
      scores: [1, 5, 5],
      winner: [1, 2],
    },
    {
      criterion: "French client references",
      values: ["All sectors", "500+ clients", "Limited"],
      scores: [5, 5, 2],
      winner: [0, 1],
    },
  ],
};

export function ModelComparator() {
  const locale = useLocale();
  const isFr = locale === "fr";
  const data = isFr ? DATA_FR : DATA_EN;
  const [highlighted, setHighlighted] = useState<number>(1);

  const CORP_IDX = 1;

  return (
    <div>
      {/* Column headers */}
      <div className="grid grid-cols-4 gap-px mb-1">
        <div />
        {data.columns.map((col, ci) => (
          <button
            key={ci}
            onClick={() => setHighlighted(ci)}
            className={`rounded-t-xl py-4 px-3 text-center transition-all ${
              ci === highlighted
                ? "bg-[var(--color-marine-800)] text-white"
                : "bg-[var(--color-calcaire)] text-[var(--color-granit)] hover:bg-[var(--color-marine-50)]"
            }`}
          >
            <div className="text-2xl mb-1">{data.icons[ci]}</div>
            <div className={`text-xs font-bold leading-tight ${ci === highlighted ? "text-white" : "text-[var(--color-marine-800)]"}`}>
              {col}
            </div>
            {ci === CORP_IDX && (
              <div className="mt-1 text-[10px] font-semibold bg-[var(--color-or-500)]/30 text-[var(--color-or-400)] px-2 py-0.5 rounded-full inline-block">
                {isFr ? "Recommandé" : "Recommended"}
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Rows */}
      <div className="border border-[var(--color-border)] rounded-b-xl overflow-hidden">
        {data.rows.map((row, ri) => (
          <div
            key={ri}
            className={`grid grid-cols-4 gap-px ${ri % 2 === 0 ? "bg-white" : "bg-[var(--color-calcaire)]"}`}
          >
            <div className="px-4 py-3.5 flex items-center">
              <span className="text-sm font-medium text-[var(--color-encre)]">{row.criterion}</span>
            </div>
            {row.values.map((val, ci) => {
              const isWinner = row.winner.includes(ci);
              const isHL = ci === highlighted;
              return (
                <div
                  key={ci}
                  onClick={() => setHighlighted(ci)}
                  className={`px-3 py-3.5 flex flex-col items-center justify-center cursor-pointer transition-colors ${
                    isHL ? "bg-[var(--color-marine-50)]" : ""
                  }`}
                >
                  {/* Score dots */}
                  <div className="flex gap-0.5 mb-1">
                    {Array.from({ length: 5 }).map((_, si) => (
                      <div
                        key={si}
                        className={`h-1.5 w-1.5 rounded-full transition-colors ${
                          si < row.scores[ci]
                            ? ci === CORP_IDX
                              ? "bg-[var(--color-marine-800)]"
                              : "bg-[var(--color-gris-300)]"
                            : "bg-[var(--color-gris-200)]"
                        }`}
                      />
                    ))}
                  </div>
                  <span className={`text-xs text-center leading-tight ${
                    isWinner && ci === CORP_IDX ? "font-bold text-[var(--color-marine-800)]" : "text-[var(--color-granit)]"
                  }`}>
                    {val}
                  </span>
                  {isWinner && ci === CORP_IDX && (
                    <span className="text-[10px] text-[var(--color-vermeil-500)] font-bold mt-0.5">✓ Avantage</span>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <p className="text-center text-xs text-[var(--color-granit)] mt-4">
        {isFr
          ? "Cliquez sur une colonne pour la comparer. Données moyennes du marché 2026."
          : "Click a column to compare. Average market data 2026."}
      </p>
    </div>
  );
}
