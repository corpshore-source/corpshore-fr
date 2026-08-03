"use client";
import { useState, useMemo, useEffect } from "react";
import { Link } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { trackTool } from "@/lib/tool-tracker";

const ROLES = [
  { fr: "Support client / Centre de contacts", en: "Customer support / Contact centre", rate: 11 },
  { fr: "Back-office / Saisie de données",    en: "Back-office / Data entry",          rate: 10 },
  { fr: "IT Helpdesk (T2)",                   en: "IT Helpdesk (T2)",                   rate: 15 },
  { fr: "Finance & comptabilité",             en: "Finance & accounting",               rate: 16 },
] as const;

const HOURS_OPTIONS = [
  { fr: "Horaires bureau (8h/j, lun–ven)", en: "Business hours (8h/d, Mon–Fri)", h: 8, days: 22 },
  { fr: "Horaires étendus (10h/j, lun–sam)", en: "Extended hours (10h/d, Mon–Sat)", h: 10, days: 26 },
  { fr: "24h/24, 7j/7", en: "24/7", h: 24, days: 30 },
] as const;

function fmt(n: number) {
  return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);
}

export function WorkforcePlanner() {
  const locale = useLocale();
  const isFr = locale === "fr";

  const [volume, setVolume] = useState(2000);
  const [aht, setAht] = useState(5);
  const [targetRate, setTargetRate] = useState(90);
  const [hoursIdx, setHoursIdx] = useState(0);
  const [roleIdx, setRoleIdx] = useState(0);

  const result = useMemo(() => {
    const hours = HOURS_OPTIONS[hoursIdx];
    const role = ROLES[roleIdx];

    const contactsPerHour = volume / (hours.days * hours.h);
    const rawAgents = contactsPerHour * (aht / 60);
    const occupancy = Math.min(targetRate / 100, 0.88);
    const agentsForOccupancy = rawAgents / occupancy;
    const shrinkage = 1.28;
    const agents = Math.max(1, Math.ceil(agentsForOccupancy * shrinkage));

    const monthlyHours = agents * hours.h * hours.days;
    const monthlyCost = monthlyHours * role.rate;

    const inHouseRate = 38;
    const inHouseCost = monthlyHours * inHouseRate;
    const saving = inHouseCost - monthlyCost;
    const savingPct = Math.round((saving / inHouseCost) * 100);

    return { agents, monthlyCost, inHouseCost, saving, savingPct, monthlyHours };
  }, [volume, aht, targetRate, hoursIdx, roleIdx]);

  useEffect(() => {
    trackTool("workforce_planner", {
      "Activité": ROLES[roleIdx].fr,
      "Volume mensuel": `${volume.toLocaleString("fr-FR")} contacts`,
      "DMT": `${aht} min`,
      "Couverture": HOURS_OPTIONS[hoursIdx].fr,
      "Effectif calculé": `${result.agents} agents`,
      "Coût Corpshore mensuel": fmt(result.monthlyCost),
      "vs. France interne": `${fmt(result.inHouseCost)} (économie ${result.savingPct}%)`,
    });
  }, [roleIdx, volume, aht, hoursIdx, result]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
      {/* Inputs */}
      <div className="lg:col-span-3 space-y-6">
        {/* Role */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-[var(--color-marine-800)]">
            {isFr ? "Type d'activité" : "Activity type"}
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {ROLES.map((r, i) => (
              <button
                key={i}
                onClick={() => setRoleIdx(i)}
                className={`px-4 py-2.5 rounded-lg text-sm font-medium text-left transition-all border ${
                  i === roleIdx
                    ? "bg-[var(--color-marine-800)] text-white border-[var(--color-marine-800)]"
                    : "bg-white border-[var(--color-border)] text-[var(--color-granit)] hover:border-[var(--color-marine-800)]"
                }`}
              >
                {isFr ? r.fr : r.en}
              </button>
            ))}
          </div>
        </div>

        {/* Volume */}
        <div>
          <label className="block text-sm font-semibold mb-1 text-[var(--color-marine-800)]">
            {isFr ? "Volume de contacts / mois" : "Monthly contact volume"}
            <span className="ml-2 font-bold text-[var(--color-vermeil-500)]">
              {volume.toLocaleString("fr-FR")}
            </span>
          </label>
          <input
            type="range" min={100} max={20000} step={100} value={volume}
            onChange={e => setVolume(+e.target.value)}
            className="w-full accent-[var(--color-marine-800)]"
          />
          <div className="flex justify-between text-xs text-[var(--color-granit)] mt-1">
            <span>100</span><span>5 000</span><span>10 000</span><span>20 000</span>
          </div>
        </div>

        {/* AHT */}
        <div>
          <label className="block text-sm font-semibold mb-1 text-[var(--color-marine-800)]">
            {isFr ? "Durée moyenne de traitement (DMT)" : "Average handling time (AHT)"}
            <span className="ml-2 font-bold text-[var(--color-vermeil-500)]">{aht} min</span>
          </label>
          <input
            type="range" min={1} max={30} value={aht}
            onChange={e => setAht(+e.target.value)}
            className="w-full accent-[var(--color-marine-800)]"
          />
          <div className="flex justify-between text-xs text-[var(--color-granit)] mt-1">
            <span>1 min</span><span>10 min</span><span>20 min</span><span>30 min</span>
          </div>
        </div>

        {/* Coverage hours */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-[var(--color-marine-800)]">
            {isFr ? "Plage horaire de couverture" : "Coverage hours"}
          </label>
          <div className="flex flex-wrap gap-2">
            {HOURS_OPTIONS.map((h, i) => (
              <button
                key={i}
                onClick={() => setHoursIdx(i)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${
                  i === hoursIdx
                    ? "bg-[var(--color-marine-800)] text-white border-[var(--color-marine-800)]"
                    : "bg-white border-[var(--color-border)] text-[var(--color-granit)] hover:border-[var(--color-marine-800)]"
                }`}
              >
                {isFr ? h.fr : h.en}
              </button>
            ))}
          </div>
        </div>

        {/* Target answer rate */}
        <div>
          <label className="block text-sm font-semibold mb-1 text-[var(--color-marine-800)]">
            {isFr ? "Objectif taux de décrochage / traitement" : "Target answer / processing rate"}
            <span className="ml-2 font-bold text-[var(--color-vermeil-500)]">{targetRate}%</span>
          </label>
          <input
            type="range" min={75} max={98} value={targetRate}
            onChange={e => setTargetRate(+e.target.value)}
            className="w-full accent-[var(--color-marine-800)]"
          />
          <div className="flex justify-between text-xs text-[var(--color-granit)] mt-1">
            <span>75%</span><span>85%</span><span>95%</span><span>98%</span>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="lg:col-span-2 flex flex-col gap-4">
        <div className="bg-[var(--color-marine-800)] text-white rounded-[var(--radius-xl)] p-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-white/60 mb-1">
            {isFr ? "Effectif recommandé" : "Recommended headcount"}
          </p>
          <p className="text-5xl font-bold font-mono text-[var(--color-or-400)] stat-num">{result.agents}</p>
          <p className="text-sm text-white/60 mt-1">{isFr ? "agents Corpshore" : "Corpshore agents"}</p>

          <div className="mt-5 pt-5 border-t border-white/15 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-white/60">{isFr ? "Coût Corpshore/mois" : "Corpshore/month"}</span>
              <span className="font-bold text-[var(--color-or-400)]">{fmt(result.monthlyCost)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-white/60">{isFr ? "vs interne France" : "vs in-house France"}</span>
              <span className="font-semibold">{fmt(result.inHouseCost)}</span>
            </div>
            <div className="flex justify-between text-sm border-t border-white/15 pt-3">
              <span className="text-white/60">{isFr ? "Économie mensuelle" : "Monthly saving"}</span>
              <span className="font-bold text-green-400">
                {fmt(result.saving)} ({result.savingPct}%)
              </span>
            </div>
          </div>
        </div>

        <div className="card-base p-5 text-xs text-[var(--color-granit)]">
          <p className="font-semibold text-[var(--color-marine-800)] mb-2 text-sm">
            {isFr ? "Méthodologie" : "Methodology"}
          </p>
          <ul className="space-y-1.5 list-none">
            <li>▸ {isFr ? "Taux d'occupation cible : 80–88%" : "Target occupancy: 80–88%"}</li>
            <li>▸ {isFr ? "Facteur de réduction : +28% (pauses, absences, formation)" : "Shrinkage factor: +28% (breaks, absences, training)"}</li>
            <li>▸ {isFr ? "Charges sociales et management inclus" : "Social charges and management included"}</li>
          </ul>
        </div>

        <Link
          href="/contact"
          className="flex items-center justify-center gap-2 bg-[var(--color-vermeil-500)] hover:bg-[var(--color-vermeil-600)] text-white rounded-[var(--radius-xl)] py-4 font-semibold text-sm transition-colors text-center"
        >
          {isFr ? "Demander une étude personnalisée →" : "Request a custom study →"}
        </Link>
      </div>
    </div>
  );
}
