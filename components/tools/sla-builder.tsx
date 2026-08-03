"use client";
import { useState, useEffect } from "react";
import { Link } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { trackTool } from "@/lib/tool-tracker";

type Channel = "voice" | "chat" | "backoffice" | "multilingual";
type Coverage = "bureau" | "extended" | "full247";
type SlaLevel = "standard" | "premium" | "elite";

const CHANNELS_FR = [
  { key: "voice" as Channel,       label: "Voix / Téléphone",         icon: "📞", score: 2 },
  { key: "chat" as Channel,        label: "Chat & Email",              icon: "💬", score: 1 },
  { key: "backoffice" as Channel,  label: "Back-office",              icon: "📋", score: 1 },
  { key: "multilingual" as Channel,label: "Multilingue (FR+EN+ES…)",  icon: "🌐", score: 2 },
];

const CHANNELS_EN = [
  { key: "voice" as Channel,       label: "Voice / Phone",         icon: "📞", score: 2 },
  { key: "chat" as Channel,        label: "Chat & Email",          icon: "💬", score: 1 },
  { key: "backoffice" as Channel,  label: "Back-office",          icon: "📋", score: 1 },
  { key: "multilingual" as Channel,label: "Multilingual (FR+EN+ES…)", icon: "🌐", score: 2 },
];

const COVERAGE_FR = [
  { key: "bureau" as Coverage,   label: "Horaires bureau",  sub: "Lun–Ven, 9h–18h",   score: 0, icon: "🏢" },
  { key: "extended" as Coverage, label: "Horaires étendus", sub: "Lun–Sam, 8h–22h",   score: 2, icon: "⏰" },
  { key: "full247" as Coverage,  label: "24h/24, 7j/7",    sub: "Inclus jours fériés", score: 4, icon: "🔄" },
];

const COVERAGE_EN = [
  { key: "bureau" as Coverage,   label: "Business hours", sub: "Mon–Fri, 9am–6pm",   score: 0, icon: "🏢" },
  { key: "extended" as Coverage, label: "Extended hours", sub: "Mon–Sat, 8am–10pm",  score: 2, icon: "⏰" },
  { key: "full247" as Coverage,  label: "24/7",           sub: "Incl. public holidays",score: 4, icon: "🔄" },
];

const SLA_FR = [
  { key: "standard" as SlaLevel, label: "Standard",  answerRate: "≥ 80%", csat: "≥ 75%", email: "< 8h",  score: 0 },
  { key: "premium" as SlaLevel,  label: "Premium",   answerRate: "≥ 90%", csat: "≥ 85%", email: "< 4h",  score: 2 },
  { key: "elite" as SlaLevel,    label: "Élite",     answerRate: "≥ 95%", csat: "≥ 92%", email: "< 1h",  score: 4 },
];

const SLA_EN = [
  { key: "standard" as SlaLevel, label: "Standard", answerRate: "≥ 80%", csat: "≥ 75%", email: "< 8h",  score: 0 },
  { key: "premium" as SlaLevel,  label: "Premium",  answerRate: "≥ 90%", csat: "≥ 85%", email: "< 4h",  score: 2 },
  { key: "elite" as SlaLevel,    label: "Elite",    answerRate: "≥ 95%", csat: "≥ 92%", email: "< 1h",  score: 4 },
];

const TIERS = [
  { name: "Starter",    range: "€9–12 / FTE / h",  color: "#2563eb", min: 0,  max: 4  },
  { name: "Growth",     range: "€12–16 / FTE / h", color: "#7c3aed", min: 5,  max: 8  },
  { name: "Enterprise", range: "€15–20 / FTE / h", color: "#b45309", min: 9,  max: 99 },
];

export function SlaBuilder() {
  const locale = useLocale();
  const isFr = locale === "fr";

  const channels = isFr ? CHANNELS_FR : CHANNELS_EN;
  const coverages = isFr ? COVERAGE_FR : COVERAGE_EN;
  const slaLevels = isFr ? SLA_FR : SLA_EN;

  const [selectedChannels, setSelectedChannels] = useState<Set<Channel>>(new Set(["voice"]));
  const [coverage, setCoverage] = useState<Coverage>("bureau");
  const [slaLevel, setSlaLevel] = useState<SlaLevel>("standard");
  const [step, setStep] = useState(1);

  function toggleChannel(key: Channel) {
    setSelectedChannels(prev => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  }

  const totalScore = (
    channels.filter(c => selectedChannels.has(c.key)).reduce((s, c) => s + c.score, 0) +
    (coverages.find(c => c.key === coverage)?.score ?? 0) +
    (slaLevels.find(s => s.key === slaLevel)?.score ?? 0)
  );

  const tier = TIERS.find(t => totalScore >= t.min && totalScore <= t.max) ?? TIERS[0];

  const STEP_LABELS = isFr
    ? ["1. Canaux", "2. Couverture", "3. SLA"]
    : ["1. Channels", "2. Coverage", "3. SLA"];

  const channelKey = Array.from(selectedChannels).sort().join(",");

  useEffect(() => {
    if (step !== 3) return;
    const chKeys = channelKey.split(",").filter(Boolean);
    const chLabels = chKeys.map(k => CHANNELS_FR.find(c => c.key === k)?.label ?? k).join(", ");
    const covLabel = COVERAGE_FR.find(c => c.key === coverage)?.label ?? coverage;
    const slaLabel = SLA_FR.find(s => s.key === slaLevel)?.label ?? slaLevel;
    const ts =
      CHANNELS_FR.filter(c => chKeys.includes(c.key)).reduce((s, c) => s + c.score, 0) +
      (COVERAGE_FR.find(c => c.key === coverage)?.score ?? 0) +
      (SLA_FR.find(s => s.key === slaLevel)?.score ?? 0);
    const t = TIERS.find(t => ts >= t.min && ts <= t.max) ?? TIERS[0];
    trackTool("sla_builder", {
      "Canaux": chLabels || "—",
      "Couverture": covLabel,
      "Niveau SLA": slaLabel,
      "Tier recommandé": t.name,
      "Fourchette tarifaire": t.range,
    });
  }, [step, channelKey, coverage, slaLevel]);

  return (
    <div className="max-w-3xl mx-auto">
      {/* Step nav */}
      <div className="flex gap-2 mb-8">
        {STEP_LABELS.map((label, i) => (
          <button
            key={i}
            onClick={() => setStep(i + 1)}
            className={`flex-1 py-2.5 rounded-full text-sm font-semibold transition-all ${
              step === i + 1
                ? "bg-[var(--color-marine-800)] text-white"
                : "bg-[var(--color-calcaire)] text-[var(--color-granit)] hover:bg-[var(--color-marine-50)]"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Step 1: Channels */}
      {step === 1 && (
        <div className="card-base p-8">
          <h3 className="font-bold mb-1">{isFr ? "Quels canaux souhaitez-vous externaliser ?" : "Which channels do you want to outsource?"}</h3>
          <p className="text-sm text-[var(--color-granit)] mb-6">{isFr ? "Sélectionnez un ou plusieurs canaux." : "Select one or more channels."}</p>
          <div className="grid grid-cols-2 gap-3 mb-8">
            {channels.map(c => (
              <button
                key={c.key}
                onClick={() => toggleChannel(c.key)}
                className={`flex items-center gap-3 p-4 rounded-[var(--radius-lg)] border-2 text-left transition-all ${
                  selectedChannels.has(c.key)
                    ? "border-[var(--color-marine-800)] bg-[var(--color-marine-50)]"
                    : "border-[var(--color-border)] hover:border-[var(--color-marine-800)]/40"
                }`}
              >
                <span className="text-2xl">{c.icon}</span>
                <span className={`font-semibold text-sm ${selectedChannels.has(c.key) ? "text-[var(--color-marine-800)]" : "text-[var(--color-granit)]"}`}>
                  {c.label}
                </span>
                {selectedChannels.has(c.key) && <span className="ml-auto text-[var(--color-marine-800)]">✓</span>}
              </button>
            ))}
          </div>
          <button
            onClick={() => setStep(2)}
            disabled={selectedChannels.size === 0}
            className="w-full py-3 bg-[var(--color-marine-800)] text-white rounded-full font-semibold text-sm hover:bg-[var(--color-marine-700)] transition-colors disabled:opacity-40"
          >
            {isFr ? "Suivant →" : "Next →"}
          </button>
        </div>
      )}

      {/* Step 2: Coverage */}
      {step === 2 && (
        <div className="card-base p-8">
          <h3 className="font-bold mb-1">{isFr ? "Quelle plage horaire de couverture ?" : "What coverage hours do you need?"}</h3>
          <p className="text-sm text-[var(--color-granit)] mb-6">{isFr ? "Sélectionnez votre disponibilité requise." : "Select the availability you need."}</p>
          <div className="space-y-3 mb-8">
            {coverages.map(c => (
              <button
                key={c.key}
                onClick={() => setCoverage(c.key)}
                className={`w-full flex items-center gap-4 p-5 rounded-[var(--radius-lg)] border-2 text-left transition-all ${
                  coverage === c.key
                    ? "border-[var(--color-marine-800)] bg-[var(--color-marine-50)]"
                    : "border-[var(--color-border)] hover:border-[var(--color-marine-800)]/40"
                }`}
              >
                <span className="text-2xl">{c.icon}</span>
                <div className="flex-1">
                  <p className={`font-bold text-sm ${coverage === c.key ? "text-[var(--color-marine-800)]" : "text-[var(--color-encre)]"}`}>{c.label}</p>
                  <p className="text-xs text-[var(--color-granit)]">{c.sub}</p>
                </div>
                {coverage === c.key && <span className="text-[var(--color-marine-800)] font-bold">✓</span>}
              </button>
            ))}
          </div>
          <div className="flex gap-3">
            <button onClick={() => setStep(1)} className="flex-1 py-3 border border-[var(--color-border)] rounded-full font-semibold text-sm text-[var(--color-granit)] hover:border-[var(--color-marine-800)] transition-colors">
              ← {isFr ? "Retour" : "Back"}
            </button>
            <button onClick={() => setStep(3)} className="flex-1 py-3 bg-[var(--color-marine-800)] text-white rounded-full font-semibold text-sm hover:bg-[var(--color-marine-700)] transition-colors">
              {isFr ? "Suivant →" : "Next →"}
            </button>
          </div>
        </div>
      )}

      {/* Step 3: SLA + Result */}
      {step === 3 && (
        <div className="space-y-5">
          <div className="card-base p-8">
            <h3 className="font-bold mb-1">{isFr ? "Quel niveau de qualité de service ciblez-vous ?" : "What quality of service level do you target?"}</h3>
            <p className="text-sm text-[var(--color-granit)] mb-6">{isFr ? "Sélectionnez vos objectifs SLA." : "Select your SLA targets."}</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="text-left">
                    <th className="pb-3 text-xs text-[var(--color-granit)] font-semibold uppercase tracking-wide">{isFr ? "Niveau" : "Level"}</th>
                    <th className="pb-3 text-xs text-[var(--color-granit)] font-semibold uppercase tracking-wide">{isFr ? "Taux décrochage" : "Answer rate"}</th>
                    <th className="pb-3 text-xs text-[var(--color-granit)] font-semibold uppercase tracking-wide">CSAT</th>
                    <th className="pb-3 text-xs text-[var(--color-granit)] font-semibold uppercase tracking-wide">Email</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {slaLevels.map(s => (
                    <tr
                      key={s.key}
                      onClick={() => setSlaLevel(s.key)}
                      className={`cursor-pointer rounded-lg transition-colors ${slaLevel === s.key ? "bg-[var(--color-marine-50)]" : "hover:bg-[var(--color-calcaire)]"}`}
                    >
                      <td className={`py-3 px-2 rounded-l-lg font-bold ${slaLevel === s.key ? "text-[var(--color-marine-800)]" : "text-[var(--color-encre)]"}`}>{s.label}</td>
                      <td className="py-3 px-2 text-[var(--color-granit)]">{s.answerRate}</td>
                      <td className="py-3 px-2 text-[var(--color-granit)]">{s.csat}</td>
                      <td className="py-3 px-2 text-[var(--color-granit)]">{s.email}</td>
                      <td className="py-3 px-2 rounded-r-lg text-right">
                        {slaLevel === s.key && <span className="text-[var(--color-marine-800)] font-bold">✓</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Result */}
          <div className="rounded-[var(--radius-xl)] p-6 text-white" style={{ backgroundColor: tier.color }}>
            <p className="text-xs font-semibold uppercase tracking-widest text-white/70 mb-1">
              {isFr ? "Offre recommandée" : "Recommended offer"}
            </p>
            <p className="text-3xl font-bold mb-1">{tier.name}</p>
            <p className="text-xl font-mono font-bold text-white/90">{tier.range}</p>
            <p className="text-xs text-white/60 mt-1">{isFr ? "par FTE par heure • devis personnalisé sur demande" : "per FTE per hour • custom quote on request"}</p>

            <div className="mt-4 pt-4 border-t border-white/20 text-xs text-white/70 flex flex-wrap gap-4">
              <span>📞 {Array.from(selectedChannels).map(k => channels.find(c => c.key === k)?.label).filter(Boolean).join(", ")}</span>
              <span>⏰ {coverages.find(c => c.key === coverage)?.label}</span>
              <span>🎯 {slaLevels.find(s => s.key === slaLevel)?.label}</span>
            </div>
          </div>

          <div className="flex gap-3">
            <button onClick={() => setStep(2)} className="flex-1 py-3 border border-[var(--color-border)] rounded-full font-semibold text-sm text-[var(--color-granit)] hover:border-[var(--color-marine-800)] transition-colors">
              ← {isFr ? "Retour" : "Back"}
            </button>
            <Link href="/contact" className="flex-1 py-3 bg-[var(--color-marine-800)] text-white rounded-full font-semibold text-sm hover:bg-[var(--color-marine-700)] transition-colors text-center">
              {isFr ? "Demander un devis →" : "Request a quote →"}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
