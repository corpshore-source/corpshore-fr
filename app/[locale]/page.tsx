import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Container, Section, Eyebrow } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { TrustBar } from "@/components/marketing/trust-bar";
import { CtaBanner } from "@/components/marketing/cta-banner";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });
  return { title: t("defaultTitle"), description: t("defaultDescription") };
}

function HomeContent() {
  const t = useTranslations("Home");
  const nav = useTranslations("Nav");

  const whyItems = [
    { key: "expertise", icon: "🇫🇷" },
    { key: "network", icon: "🌍" },
    { key: "ai", icon: "🤖" },
    { key: "rgpd", icon: "🔒" },
    { key: "ramp", icon: "⚡" },
    { key: "sla", icon: "📊" },
  ] as const;

  const serviceKeys = ["bpo", "it", "ai", "hr", "finance", "cx"] as const;
  const serviceIcons: Record<string, string> = {
    bpo: "🏢", it: "💻", ai: "🤖", hr: "👥", finance: "📈", cx: "📞",
  };

  return (
    <>
      {/* Hero */}
      <section className="relative bg-[var(--color-marine-800)] text-white pt-24 pb-20 md:pt-32 md:pb-28 overflow-hidden">
        <Image src="/images/hero-paris-operations.webp" alt="" fill className="object-cover opacity-20 mix-blend-luminosity" priority aria-hidden="true" />
        <Container className="relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-sm font-semibold bg-[var(--color-or-500)]/20 border border-[var(--color-or-500)]/30 text-[var(--color-or-400)] px-4 py-1.5 rounded-[var(--radius-full)] mb-6">
              {t("hero.badge")}
            </div>
            <h1 className="text-[var(--text-display)] leading-tight">{t("hero.h1")}</h1>
            <p className="mt-5 text-xl text-white/70 max-w-2xl leading-relaxed">{t("hero.sub")}</p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/contact" className={buttonVariants({ variant: "accent", size: "lg" })}>
                {t("hero.cta1")}
              </Link>
              <Link href="/etudes-de-cas" className={buttonVariants({ variant: "onDark", size: "lg" })}>
                {t("hero.cta2")}
              </Link>
            </div>
          </div>
        </Container>
        <div className="tricolore-strip mt-16" />
      </section>

      {/* Trust bar */}
      <TrustBar />

      {/* Why Corpshore */}
      <Section tone="default">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <Eyebrow>{t("why.label")}</Eyebrow>
            <h2>{t("why.h2")}</h2>
            <p className="mt-4 text-[var(--color-granit)] text-lg">{t("why.sub")}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyItems.map(({ key, icon }) => (
              <div key={key} className="card-base p-6">
                <div className="text-3xl mb-4">{icon}</div>
                <h3 className="text-base mb-2">{t(`why.${key}.title`)}</h3>
                <p className="text-sm text-[var(--color-granit)] leading-relaxed">{t(`why.${key}.body`)}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Rankings */}
      <Section tone="marine">
        <Container>
          <div className="text-center mb-12">
            <Eyebrow className="text-[var(--color-or-400)]">{t("rankings.label")}</Eyebrow>
            <h2 className="text-white">{t("rankings.h2")}</h2>
          </div>
          <div className="max-w-2xl mx-auto bg-white/5 border border-white/10 rounded-[var(--radius-xl)] p-8">
            {[
              { medal: "🥇", title: t("rankings.r1"), sub: t("rankings.r1sub") },
              { medal: "🥈", title: t("rankings.r2"), sub: t("rankings.r2sub") },
              { medal: "🤖", title: t("rankings.r3"), sub: t("rankings.r3sub") },
            ].map(({ medal, title, sub }) => (
              <div key={title} className="ranking-row">
                <span className="text-3xl">{medal}</span>
                <div>
                  <p className="font-semibold text-white text-lg">{title}</p>
                  <p className="text-sm text-white/55">{sub}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center mt-8 text-sm text-white/40">
            {t("rankings.source")}{" "}
            <a href={SITE.oaUrl} target="_blank" rel="noopener noreferrer" className="text-[var(--color-or-400)] hover:underline">
              outsourceaccelerator.com ↗
            </a>
          </p>
        </Container>
      </Section>

      {/* Services */}
      <Section tone="muted">
        <Container>
          <div className="text-center max-w-xl mx-auto mb-14">
            <Eyebrow>{t("services.label")}</Eyebrow>
            <h2>{t("services.h2")}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceKeys.map((k) => (
              <div key={k} className="card-base p-6 group">
                <div className="text-3xl mb-4">{serviceIcons[k]}</div>
                <h3 className="text-base mb-2">{t(`services.${k}.title`)}</h3>
                <p className="text-sm text-[var(--color-granit)] leading-relaxed mb-4">{t(`services.${k}.body`)}</p>
                <Link
                  href="/services"
                  className="text-sm font-semibold text-[var(--color-marine-800)] hover:text-[var(--color-vermeil-500)] transition-colors"
                >
                  {nav("services")} →
                </Link>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Delivery hubs */}
      <Section tone="default">
        <Container>
          <div className="text-center max-w-xl mx-auto mb-12">
            <Eyebrow>{t("hubs.label")}</Eyebrow>
            <h2>{t("hubs.h2")}</h2>
            <p className="mt-4 text-[var(--color-granit)]">{t("hubs.sub")}</p>
          </div>
          <div className="flex flex-wrap gap-2.5 justify-center">
            {SITE.hubs.map(({ flag, name }) => (
              <span key={name} className="hub-pill">
                {flag} {name}
              </span>
            ))}
          </div>
        </Container>
      </Section>

      <CtaBanner />
    </>
  );
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <HomeContent />;
}
