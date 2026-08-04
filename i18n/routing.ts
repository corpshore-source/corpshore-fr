import { defineRouting } from "next-intl/routing";

export const locales = ["fr", "en"] as const;
export type AppLocale = (typeof locales)[number];
export const defaultLocale: AppLocale = "fr";

export const localeMeta: Record<AppLocale, { label: string; endonym: string; hreflang: string; dir: "ltr" | "rtl" }> = {
  fr: { label: "Français", endonym: "Français", hreflang: "fr", dir: "ltr" },
  en: { label: "English", endonym: "English", hreflang: "en", dir: "ltr" },
};

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: "always",
  pathnames: {
    "/": "/",
    "/services": "/services",
    "/industries": "/industries",
    "/a-propos": "/a-propos",
    "/carrieres": "/carrieres",
    "/blog": "/blog",
    "/etudes-de-cas": "/etudes-de-cas",
    "/contact": "/contact",
    "/mentions-legales": "/mentions-legales",
    "/devis": "/devis",
  },
});

export function localePath(locale: AppLocale, path = "") {
  return `/${locale}${path}`;
}
