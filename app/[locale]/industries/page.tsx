import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container, Section, Eyebrow } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { PageHero } from "@/components/layout/page-hero";
import { CtaBanner } from "@/components/marketing/cta-banner";

import { SITE } from "@/lib/site";
import { pageAlternates, KEYWORDS } from "@/lib/seo";
import { industrySectors } from "@/lib/data/industries-data";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Industries.meta" });
  const title = t("title");
  const description = t("description");
  return {
    title,
    description,
    keywords: KEYWORDS.industries[locale as "fr" | "en"],
    alternates: pageAlternates("/industries"),
    openGraph: {
      title,
      description,
      url: `${SITE.url}/${locale}/industries`,
      images: [{ url: `${SITE.url}/images/secteur-public-digitalisation.webp`, width: 1200, height: 630 }],
    },
  };
}


function IndustriesContent() {
  const t = useTranslations("Industries");
  const locale = useLocale();
  const isFr = locale === "fr";

  return (
    <>
      <PageHero
        label={t("hero.label")}
        heading={t("hero.h1")}
        sub={t("hero.sub")}
        image="/images/secteur-public-digitalisation.webp"
      />

      <Section tone="default">
        <Container>
          <div className="space-y-10">
            {industrySectors.map((sector) => {
              const name = isFr ? sector.name : sector.nameEn;
              const body = isFr ? sector.body : sector.bodyEn;
              const svcs = isFr ? sector.services : sector.servicesEn;
              return (
                <article key={sector.slug} className="card-base p-8 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                  <div className="lg:col-span-2">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-3xl">{sector.icon}</span>
                      <div>
                        <h2 className="text-[var(--text-h3)] mb-0.5">{name}</h2>
                        <span className="text-xs text-[var(--color-granit)]">{sector.regs}</span>
                      </div>
                    </div>
                    <p className="text-[var(--color-granit)] leading-relaxed">{body}</p>
                    <div className="mt-6 flex flex-wrap gap-3">
                      <Link
                        href={`/industries/${sector.slug}` as any}
                        className={buttonVariants({ variant: "secondary", size: "sm" })}
                      >
                        {isFr ? "En savoir plus" : "Learn more"} →
                      </Link>
                      <Link href="/contact" className={buttonVariants({ variant: "primary", size: "sm" })}>
                        {isFr ? "Parler à un expert" : "Speak to an expert"} →
                      </Link>
                    </div>
                  </div>
                  <div className="bg-[var(--color-calcaire)] rounded-[var(--radius-lg)] p-6">
                    <Eyebrow>{isFr ? "Services inclus" : "Included services"}</Eyebrow>
                    <ul className="space-y-2">
                      {svcs.map((s) => (
                        <li key={s} className="flex items-center gap-2 text-sm text-[var(--color-granit)]">
                          <span className="text-[var(--color-marine-800)]">▸</span> {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              );
            })}
          </div>
        </Container>
      </Section>

      <CtaBanner />
    </>
  );
}

export default async function IndustriesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <IndustriesContent />;
}
