"use client";
import { useState, useMemo } from "react";
import { Link } from "@/i18n/navigation";
import { useLocale } from "next-intl";

const ROLES = [
  { fr: "Support client (T1)",       en: "Customer support (T1)",      rate: 11 },
  { fr: "IT Helpdesk (T2/T3)",       en: "IT Helpdesk (T2/T3)",       rate: 15 },
  { fr: "Back-office administratif", en: "Administrative back-office",  rate: 10 },
  { fr: "Finance & comptabilité",    en: "Finance & accounting",        rate: 16 },
  { fr: "RH administration",        en: "HR administration",           rate: 12 },
  { fr: "Modération / Annotation IA",en: "Moderation / AI annotation", rate: 10 },
] as const;

const HOURS_PER_MONTH = 151.67;

function fmt(n: number) {
  return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);
}

export function SavingsCalculator() {
  const locale = useLocale();
  const isFr = locale === "fr";
  const [roleIdx, setRoleIdx] = useState(0);
  const [teamSize, setTeamSize] = useState(10);
  const [franceRate, setFranceRate] = useState(40);

  const role = ROLES[roleIdx];
  const corpshoreCost = role.rate * HOURS_PER_MONTH * teamSize;
  const franceCost = franceRate * HOURS_PER_MONTH * teamSize;
  const saving = franceCost - corpshoreCost;
  const pct = Math.round((saving / franceCost) * 100);
  const annual = saving * 12;

  const roiMonths = useMemo(() => {
    const onboarding = corpshoreCost * 2.5;
    return Math.ceil(onboarding / saving);
  }, [saving, corpshoreCost]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-stretch">
      {/* Inputs */}
      <div className="lg:col-span-3 card-base p-8">
        <h3 className="text-lg font-bold mb-6">
          {isFr ? "Configurez votre scénario" : "Configure your scenario"}
        </h3>

        {/* Role selector */}
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-2 text-[var(--color-marine-800)]">
            {isFr ? "Type de poste" : "Role type"}
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {ROLES.map((r, i) => (
              <button
                key={i}
                onClick={() => setRoleIdx(i)}
                className={`px-3 py-2 rounded-lg text-xs font-medium text-left transition-all border ${
                  i === roleIdx
                    ? "bg-[var(--color-marine-800)] text-white border-[var(--color-marine-800)]"
                    : "bg-white border-[var(--color-border)] text-[var(--color-granit)] hover:border-[var(--color-marine-800)] hover:text-[var(--color-marine-800)]"
                }`}
              >
                {isFr ? r.fr : r.en}
              </button>
            ))}
          </div>
        </div>

        {/* Team size */}
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-1 text-[var(--color-marine-800)]">
            {isFr ? "Effectif externalisé" : "Team size outsourced"}
            <span className="ml-2 font-bold text-[var(--color-vermeil-500)]">{teamSize} FTE</span>
          </label>
          <input
            type="range" min={1} max={100} value={teamSize}
            onChange={e => setTeamSize(+e.target.value)}
            className="w-full accent-[var(--color-marine-800)]"
          />
          <div className="flex justify-between text-xs text-[var(--color-granit)] mt-1">
            <span>1</span><span>25</span><span>50</span><span>75</span><span>100</span>
          </div>
        </div>

        {/* Current France rate */}
        <div>
          <label className="block text-sm font-semibold mb-1 text-[var(--color-marine-800)]">
            {isFr ? "Coût horaire chargé France (salaire + charges)" : "Fully loaded French hourly cost (salary + charges)"}
            <span className="ml-2 font-bold text-[var(--color-vermeil-500)]">{franceRate} €/h</span>
          </label>
          <input
            type="range" min={25} max={60} value={franceRate}
            onChange={e => setFranceRate(+e.target.value)}
            className="w-full accent-[var(--color-marine-800)]"
          />
          <div className="flex justify-between text-xs text-[var(--color-granit)] mt-1">
            <span>25 €</span><span>35 €</span><span>45 €</span><span>55 €</span><span>60 €</span>
          </div>
          <p className="text-xs text-[var(--color-granit)] mt-2 italic">
            {isFr
              ? "Moyenne France : ~38 €/h (SMIC + charges patronales 42% + frais fixes)"
              : "French average: ~€38/h (SMIC + 42% employer charges + fixed costs)"}
          </p>
        </div>
      </div>

      {/* Results */}
      <div className="lg:col-span-2 flex flex-col gap-4">
        {/* Savings highlight */}
        <div className="bg-[var(--color-marine-800)] text-white rounded-[var(--radius-xl)] p-6 flex-1">
          <p className="text-xs font-semibold uppercase tracking-widest text-white/60 mb-1">
            {isFr ? "Économies mensuelles" : "Monthly savings"}
          </p>
          <p className="text-4xl font-bold font-mono text-[var(--color-or-400)] stat-num">{fmt(saving)}</p>
          <p className="text-sm text-white/60 mt-1">{fmt(annual)} {isFr ? "/ an" : "/ year"}</p>

          <div className="mt-5 pt-5 border-t border-white/15 grid grid-cols-2 gap-3 text-center">
            <div>
              <p className="text-2xl font-bold text-[var(--color-or-400)]">{pct}%</p>
              <p className="text-xs text-white/60">{isFr ? "réduction de coût" : "cost reduction"}</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-[var(--color-or-400)]">{roiMonths}m</p>
              <p className="text-xs text-white/60">ROI</p>
            </div>
          </div>
        </div>

        {/* Comparison table */}
        <div className="card-base p-5 text-sm">
          <p className="font-semibold mb-3 text-[var(--color-marine-800)] text-xs uppercase tracking-wide">
            {isFr ? "Coût mensuel comparé" : "Monthly cost comparison"}
          </p>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-[var(--color-granit)]">{isFr ? "Interne France" : "In-house France"}</span>
              <span className="font-semibold">{fmt(franceCost)}</span>
            </div>
            <div className="flex justify-between items-center text-[var(--color-vermeil-500)]">
              <span className="font-semibold">Corpshore</span>
              <span className="font-bold">{fmt(corpshoreCost)}</span>
            </div>
            <div className="h-px bg-[var(--color-border)] my-2" />
            <div className="flex justify-between items-center">
              <span className="font-bold text-[var(--color-marine-800)]">
                {isFr ? "Économie" : "Saving"}
              </span>
              <span className="font-bold text-green-600">{fmt(saving)}</span>
            </div>
          </div>
        </div>

        <Link
          href="/contact"
          className="flex items-center justify-center gap-2 bg-[var(--color-vermeil-500)] hover:bg-[var(--color-vermeil-600)] text-white rounded-[var(--radius-xl)] py-4 font-semibold text-sm transition-colors"
        >
          {isFr ? "Obtenir un devis détaillé →" : "Get a detailed quote →"}
        </Link>
      </div>
    </div>
  );
}
