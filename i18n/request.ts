import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";

function deepMerge<T extends Record<string, unknown>>(base: T, override: Partial<T>): T {
  const result = { ...base };
  for (const key of Object.keys(override) as (keyof T)[]) {
    const b = base[key];
    const o = override[key];
    if (b && o && typeof b === "object" && typeof o === "object" && !Array.isArray(b)) {
      result[key] = deepMerge(b as Record<string, unknown>, o as Record<string, unknown>) as T[keyof T];
    } else if (o !== undefined) {
      result[key] = o as T[keyof T];
    }
  }
  return result;
}

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

  const base = (await import(`../messages/fr.json`)).default;
  if (locale === "fr") return { locale, messages: base };

  const override = (await import(`../messages/${locale}.json`)).default;
  return { locale, messages: deepMerge(base, override) };
});
