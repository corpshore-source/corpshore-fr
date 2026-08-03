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
      {/* Hero — two column */}
      <section className="relative bg-[var(--color-marine-800)] text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-marine-800)] via-[var(--color-marine-800)] to-[#0c2d7e]" />
        <Container className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pt-28 pb-20 md:pt-36 md:pb-28">
            {/* Left: text */}
            <div>
              <div className="inline-flex items-center gap-2 text-sm font-semibold bg-[var(--color-or-500)]/20 border border-[var(--color-or-500)]/30 text-[var(--color-or-400)] px-4 py-1.5 rounded-[var(--radius-full)] mb-6">
                {t("hero.badge")}
              </div>
              <h1 className="text-[var(--text-display)] leading-tight">{t("hero.h1")}</h1>
              <p className="mt-5 text-xl text-white/70 max-w-xl leading-relaxed">{t("hero.sub")}</p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link href="/contact" className={buttonVariants({ variant: "accent", size: "lg" })}>
                  {t("hero.cta1")}
                </Link>
                <Link href="/etudes-de-cas" className={buttonVariants({ variant: "onDark", size: "lg" })}>
                  {t("hero.cta2")}
                </Link>
              </div>
              {/* Mini stats */}
              <div className="mt-10 flex flex-wrap gap-8 pt-8 border-t border-white/10">
                {[
                  { num: "18", label: t("trust.countries") },
                  { num: "35", label: t("trust.languages") },
                  { num: "500+", label: t("trust.clients") },
                ].map(({ num, label }) => (
                  <div key={label}>
                    <div className="text-3xl font-bold font-mono text-[var(--color-or-400)]">{num}</div>
                    <div className="text-xs text-white/50 uppercase tracking-wider mt-0.5">{label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: image frame with floating cards */}
            <div className="hidden lg:block relative">
              <div className="relative rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-2xl aspect-[4/3]">
                <Image
                  src="/images/hero-paris-operations.webp"
                  alt="Opérations Corpshore France"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-marine-800)]/50 to-transparent" />
              </div>
              {/* Floating OA badge */}
              <div className="absolute -bottom-5 -left-5 bg-white rounded-xl shadow-xl p-4 flex items-center gap-3">
                <span className="text-2xl">🥇</span>
                <div>
                  <p className="text-[10px] font-bold text-[var(--color-marine-800)] uppercase tracking-widest">Outsource Accelerator</p>
                  <p className="text-sm font-bold text-[var(--color-marine-800)]">#1 BPO en France</p>
                </div>
              </div>
              {/* Floating clients count */}
              <div className="absolute -top-4 -right-4 bg-[var(--color-or-500)] text-white rounded-xl shadow-xl px-5 py-3 text-center">
                <p className="text-2xl font-bold font-mono leading-none">500+</p>
                <p className="text-[10px] uppercase tracking-widest mt-1 text-white/80">{t("trust.clients")}</p>
              </div>
            </div>
          </div>
        </Container>
        <div className="tricolore-strip" />
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {whyItems.map(({ key, icon }, i) => (
              <div key={key} className="card-base p-6 border-l-[3px] border-l-[var(--color-marine-800)] hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <span className="text-2xl shrink-0 mt-0.5">{icon}</span>
                  <div>
                    <h3 className="text-base mb-2">{t(`why.${key}.title`)}</h3>
                    <p className="text-sm text-[var(--color-granit)] leading-relaxed">{t(`why.${key}.body`)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Rankings */}
      <Section tone="marine">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: OA badge image */}
            <div className="relative h-64 lg:h-80 rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-xl order-2 lg:order-1">
              <Image
                src="/images/badge-oa-france-2026.webp"
                alt="Outsource Accelerator #1 BPO France 2026"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[var(--color-marine-800)]/20" />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-sm rounded-lg px-4 py-2 text-sm text-white font-semibold">
                  <span>🏆</span>
                  <span>Outsource Accelerator · Classement officiel 2026</span>
                </div>
              </div>
            </div>

            {/* Right: rankings list */}
            <div className="order-1 lg:order-2">
              <Eyebrow className="text-[var(--color-or-400)]">{t("rankings.label")}</Eyebrow>
              <h2 className="text-white mb-8">{t("rankings.h2")}</h2>
              <div className="bg-white/5 border border-white/10 rounded-[var(--radius-xl)] p-6">
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
              <p className="mt-6 text-sm text-white/40">
                {t("rankings.source")}{" "}
                <a href={SITE.oaUrl} target="_blank" rel="noopener noreferrer" className="text-[var(--color-or-400)] hover:underline">
                  outsourceaccelerator.com ↗
                </a>
              </p>
            </div>
          </div>
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
              <div key={k} className="card-base p-6 group hover:shadow-md transition-shadow">
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
            <div>
              <Eyebrow>{t("hubs.label")}</Eyebrow>
              <h2>{t("hubs.h2")}</h2>
              <p className="mt-4 text-[var(--color-granit)]">{t("hubs.sub")}</p>
            </div>
            <div className="relative h-52 rounded-2xl overflow-hidden ring-1 ring-[var(--color-border)] shadow-md">
              <Image
                src="/images/corpshore-global-map.webp"
                alt="Réseau mondial Corpshore"
                fill
                className="object-cover"
              />
            </div>
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
