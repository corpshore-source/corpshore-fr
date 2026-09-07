import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { SITE } from "@/lib/site";
import { pageAlternates, KEYWORDS } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isFr = locale === "fr";
  const title = isFr
    ? "Demande de devis BPO, IT & IA — Corpshore France"
    : "Request a BPO, IT & AI Outsourcing Proposal — Corpshore France";
  const description = isFr
    ? "Obtenez un devis personnalisé pour vos projets d'externalisation BPO, infogérance IT ou IA générative. Réponse garantie sous 24h. Corpshore France, #1 BPO en France."
    : "Get a tailored proposal for your BPO, IT outsourcing or generative AI project. Response guaranteed within 24 hours. Corpshore France, #1 BPO in France.";
  return {
    title,
    description,
    keywords: KEYWORDS.devis[isFr ? "fr" : "en"],
    alternates: pageAlternates("/devis"),
    openGraph: {
      title,
      description,
      url: `${SITE.url}/${locale}/devis`,
      images: [
        {
          url: `${SITE.url}/images/hero-paris-operations.webp`,
          width: 1200,
          height: 630,
          alt: isFr ? "Demande de devis — Corpshore France" : "Request a proposal — Corpshore France",
        },
      ],
    },
  };
}

export default async function DevisLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <>{children}</>;
}
