const KEY = "cf_tool_insights";

export type ToolEntry = Record<string, string | number>;

function readAll(): Record<string, ToolEntry> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "{}") as Record<string, ToolEntry>;
  } catch {
    return {};
  }
}

export function trackTool(toolId: string, entry: ToolEntry): void {
  if (typeof window === "undefined") return;
  try {
    const current = readAll();
    current[toolId] = entry;
    localStorage.setItem(KEY, JSON.stringify(current));
  } catch {}
}

const TOOL_LABELS: Record<string, string> = {
  savings_calculator: "Calculateur d'économies",
  model_comparator:   "Comparateur de modèles",
  readiness_quiz:     "Diagnostic de maturité",
  workforce_planner:  "Simulateur d'effectif",
  sla_builder:        "Constructeur de SLA",
  rgpd_checker:       "Vérificateur RGPD",
};

export function getToolInsights(): string {
  const all = readAll();
  const entries = Object.entries(all);
  if (entries.length === 0) return "";

  const lines: string[] = ["=== Données outils corpshore.fr ==="];
  for (const [id, data] of entries) {
    lines.push(`\n[${TOOL_LABELS[id] ?? id}]`);
    for (const [k, v] of Object.entries(data)) {
      lines.push(`  ${k} : ${v}`);
    }
  }
  lines.push("\n====================================");
  return lines.join("\n");
}

export function clearToolInsights(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(KEY);
  } catch {}
}
