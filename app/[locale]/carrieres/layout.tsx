import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { SITE } from "@/lib/site";
import { pageAlternates, KEYWORDS } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Careers.meta" });
  const title = t("title");
  const description = t("description");
  return {
    title,
    description,
    keywords: KEYWORDS.careers[locale as "fr" | "en"],
    alternates: pageAlternates("/carrieres"),
    openGraph: { title, description, url: `${SITE.url}/${locale}/carrieres` },
  };
}

export default function CareersLayout({ children }: { children: React.ReactNode }) {
  return children;
}
