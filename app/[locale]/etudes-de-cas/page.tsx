import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import { Container, Section, Eyebrow } from "@/components/ui/container";
import { PageHero } from "@/components/layout/page-hero";
import { CtaBanner } from "@/components/marketing/cta-banner";
import { caseStudies } from "@/lib/data/cases";
import type { AppLocale } from "@/i18n/routing";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Cases.meta" });
  return { title: t("title"), description: t("description") };
}

function CasesContent({ locale }: { locale: AppLocale }) {
  const t = useTranslations("Cases");
  const isFr = locale === "fr";

  const metrics = [
    { num: t("metrics.csat"), label: t("metrics.csatLabel") },
    { num: t("metrics.delay"), label: t("metrics.delayLabel") },
    { num: t("metrics.onboarding"), label: t("metrics.onboardingLabel") },
    { num: t("metrics.savings"), label: t("metrics.savingsLabel") },
    { num: t("metrics.capacity"), label: t("metrics.capacityLabel") },
  ];

  return (
    <>
      <PageHero
        label={t("hero.label")}
        heading={t("hero.h1")}
        sub={t("hero.sub")}
      />

      {/* Key metrics strip */}
      <div className="bg-[var(--color-calcaire)] border-b border-[var(--color-border)]">
        <Container>
          <ul className="flex flex-wrap justify-center sm:justify-between gap-4 py-5">
            {metrics.map(({ num, label }) => (
              <li key={label} className="text-center min-w-[90px]">
                <span className="stat-num block text-xl font-bold text-[var(--color-marine-800)]">{num}</span>
                <span className="text-xs text-[var(--color-granit)]">{label}</span>
              </li>
            ))}
          </ul>
        </Container>
      </div>

      {/* Cases grid */}
      <Section tone="default">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {caseStudies.map((cs) => (
              <article key={cs.id} className="card-base p-6 flex flex-col">
                <div className="flex items-start justify-between mb-4 gap-3">
                  <span className="text-3xl">{cs.icon}</span>
                  <span className="result-pill shrink-0">{cs.result}</span>
                </div>
                <span className="sector-badge mb-3 self-start">
                  {isFr ? cs.sector : cs.sectorEn}
                </span>
                <h3 className="text-base leading-snug mb-3 flex-1">
                  {isFr ? cs.title : cs.titleEn}
                </h3>
                <p className="text-sm text-[var(--color-granit)] leading-relaxed mb-4 line-clamp-4">
                  {isFr ? cs.summary : cs.summaryEn}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-[var(--color-border)] mt-auto">
                  <span className="text-xs text-[var(--color-granit)]">
                    ⏱ {cs.timeline}
                  </span>
                  <span className="text-xs font-semibold text-[var(--color-marine-800)]">
                    {t("readCase")} →
                  </span>
                </div>
              </article>
            ))}
          </div>

          {/* NDA notice */}
          <p className="mt-10 text-center text-sm text-[var(--color-granit)] bg-[var(--color-calcaire)] rounded-[var(--radius)] px-6 py-4 border border-[var(--color-border)]">
            🔒 {isFr
              ? "Tous les noms de clients sont anonymisés conformément aux accords de confidentialité (NDA). Les résultats sont vérifiables sur demande."
              : "All client names are anonymised in accordance with confidentiality agreements (NDA). Results are verifiable upon request."}
          </p>
        </Container>
      </Section>

      <CtaBanner />
    </>
  );
}

export default async function CasesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <CasesContent locale={locale as AppLocale} />;
}
