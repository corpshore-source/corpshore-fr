import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { Playfair_Display, Inter, IBM_Plex_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { routing, localeMeta } from "@/i18n/routing";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { SITE } from "@/lib/site";
import "@/app/globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const ibmMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono-ibm",
  display: "swap",
  weight: ["400", "500", "600"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });
  const ogLocale = locale === "fr" ? "fr_FR" : "en_US";
  return {
    metadataBase: new URL(SITE.url),
    title: { template: t("titleTemplate"), default: t("defaultTitle") },
    description: t("defaultDescription"),
    icons: {
      icon: [
        { url: "/icon.png", type: "image/png" },
      ],
      apple: [
        { url: "/apple-icon.png", type: "image/png" },
      ],
    },
    openGraph: {
      siteName: t("siteName"),
      locale: ogLocale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      site: "@corpshore",
    },
    other: {
      "geo.region": "FR",
      "geo.placename": "Paris, France",
      "geo.position": "48.8566;2.3522",
      ICBM: "48.8566, 2.3522",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const messages = await getMessages();
  const meta = localeMeta[locale as keyof typeof localeMeta];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE.url}/#organization`,
        name: "Corpshore France",
        url: SITE.url,
        contactPoint: {
          "@type": "ContactPoint",
          email: SITE.email,
          contactType: "customer service",
          areaServed: "FR",
          availableLanguage: ["French", "English"],
        },
        address: { "@type": "PostalAddress", addressCountry: "FR" },
        sameAs: [SITE.social.linkedin, SITE.globalUrl],
        description:
          "Corpshore France, #1 BPO en France. Externalisation BPO, infogérance IT et IA générative pour les entreprises françaises et francophones.",
        knowsAbout: ["Business Process Outsourcing", "IT Outsourcing", "Artificial Intelligence", "Managed Services"],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE.url}/#website`,
        url: SITE.url,
        name: "Corpshore France",
        inLanguage: ["fr-FR", "en"],
        publisher: { "@id": `${SITE.url}/#organization` },
      },
    ],
  };

  return (
    <html
      lang={meta.hreflang}
      dir={meta.dir}
      className={`${playfair.variable} ${inter.variable} ${ibmMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <NextIntlClientProvider messages={messages}>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[var(--color-marine-800)] focus:text-white focus:rounded-[var(--radius)]"
          >
            {locale === "fr" ? "Aller au contenu" : "Skip to content"}
          </a>
          <SiteHeader />
          <main id="main" className="flex-1">
            {children}
          </main>
          <SiteFooter />
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
