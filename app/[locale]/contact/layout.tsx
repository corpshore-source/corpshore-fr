import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { SITE } from "@/lib/site";
import { pageAlternates, KEYWORDS } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Contact.meta" });
  const title = t("title");
  const description = t("description");
  return {
    title,
    description,
    keywords: KEYWORDS.contact[locale as "fr" | "en"],
    alternates: pageAlternates("/contact"),
    openGraph: { title, description, url: `${SITE.url}/${locale}/contact` },
  };
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
