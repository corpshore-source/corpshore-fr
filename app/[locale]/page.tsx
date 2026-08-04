import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Container, Section, Eyebrow } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { TrustBar } from "@/components/marketing/trust-bar";
import { CtaBanner } from "@/components/marketing/cta-banner";
import { CountUp } from "@/components/ui/count-up";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { ServiceTabs } from "@/components/home/service-tabs";
import { SavingsCalculator } from "@/components/tools/savings-calculator";
import { ModelComparator } from "@/components/tools/model-comparator";
import { ReadinessQuiz } from "@/components/tools/readiness-quiz";
import { HomeFaq } from "@/components/home/home-faq";
import { SITE } from "@/lib/site";
import { pageAlternates, KEYWORDS } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });
  const title = t("defaultTitle");
  const description = t("defaultDescription");
  return {
    title,
    description,
    keywords: KEYWORDS.home[locale as "fr" | "en"],
    alternates: pageAlternates("/"),
    openGraph: { title, description, url: `${SITE.url}/${locale}` },
  };
}

function HomeContent({ locale }: { locale: string }) {
  const t = useTranslations("Home");
  const nav = useTranslations("Nav");
  const isFr = locale === "fr";

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
                  { to: 18, suffix: "", label: t("trust.countries") },
                  { to: 35, suffix: "", label: t("trust.languages") },
                  { to: 500, suffix: "+", label: t("trust.clients") },
                ].map(({ to, suffix, label }) => (
                  <div key={label}>
                    <div className="text-3xl font-bold font-mono text-[var(--color-or-400)] stat-num">
                      <CountUp to={to} suffix={suffix} />
                    </div>
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
              <ScrollReveal key={key} delay={i * 70}>
                <div className="card-base p-6 border-l-[3px] border-l-[var(--color-marine-800)] hover:shadow-md transition-shadow h-full">
                  <div className="flex items-start gap-4">
                    <span className="text-2xl shrink-0 mt-0.5">{icon}</span>
                    <div>
                      <h3 className="text-base mb-2">{t(`why.${key}.title`)}</h3>
                      <p className="text-sm text-[var(--color-granit)] leading-relaxed">{t(`why.${key}.body`)}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Rankings */}
      <Section tone="marine">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Paris business image */}
            <div className="relative h-64 lg:h-80 rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-xl order-2 lg:order-1">
              <Image
                src="/images/paris-la-defense-business.webp"
                alt="Corpshore France — opérations Paris"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[var(--color-marine-800)]/30" />
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
                  { medal: "🥇", title: t("rankings.r1"), sub: t("rankings.r1sub"), href: SITE.oaUrl },
                  { medal: "🥈", title: t("rankings.r2"), sub: t("rankings.r2sub"), href: SITE.oaEuropeUrl },
                  { medal: "🤖", title: t("rankings.r3"), sub: t("rankings.r3sub"), href: SITE.oaAiUrl },
                ].map(({ medal, title, sub, href }) => (
                  <a key={title} href={href} target="_blank" rel="noopener noreferrer" className="ranking-row group hover:bg-white/5 rounded-lg transition-colors -mx-2 px-2">
                    <span className="text-3xl">{medal}</span>
                    <div className="flex-1">
                      <p className="font-semibold text-white text-lg group-hover:underline">{title}</p>
                      <p className="text-sm text-white/55">{sub}</p>
                    </div>
                    <span className="text-white/30 text-sm group-hover:text-white/60 transition-colors">↗</span>
                  </a>
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
          <ServiceTabs
            services={serviceKeys.map((k) => ({
              key: k,
              icon: serviceIcons[k],
              title: t(`services.${k}.title`),
              body: t(`services.${k}.body`),
            }))}
            cta={nav("services")}
          />
        </Container>
      </Section>

      {/* Savings Calculator */}
      <Section tone="muted">
        <Container>
          <div className="text-center max-w-xl mx-auto mb-12">
            <Eyebrow>{isFr ? "Calculateur d'économies" : "Savings calculator"}</Eyebrow>
            <h2>{isFr ? "Estimez vos économies en 30 secondes" : "Estimate your savings in 30 seconds"}</h2>
            <p className="mt-4 text-[var(--color-granit)]">
              {isFr
                ? "Comparez le coût réel d'une équipe internalisée en France avec le tarif Corpshore, charges sociales comprises."
                : "Compare the real cost of an in-house French team with the Corpshore rate, including social charges."}
            </p>
          </div>
          <SavingsCalculator />
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

      {/* Model Comparator */}
      <Section tone="muted">
        <Container>
          <div className="text-center max-w-xl mx-auto mb-12">
            <Eyebrow>{isFr ? "Comparatif des modèles" : "Model comparison"}</Eyebrow>
            <h2>
              {isFr
                ? "Corpshore Afrique vs. interne France vs. offshore Asie"
                : "Corpshore Africa vs. in-house France vs. offshore Asia"}
            </h2>
            <p className="mt-4 text-[var(--color-granit)]">
              {isFr
                ? "Cliquez sur chaque colonne pour comparer les 7 critères clés de l'externalisation."
                : "Click each column to compare the 7 key outsourcing criteria."}
            </p>
          </div>
          <ModelComparator />
        </Container>
      </Section>

      {/* Readiness Quiz */}
      <Section tone="default">
        <Container>
          <div className="text-center max-w-xl mx-auto mb-12">
            <Eyebrow>{isFr ? "Diagnostic de maturité" : "Readiness assessment"}</Eyebrow>
            <h2>
              {isFr
                ? "Êtes-vous prêt à externaliser ?"
                : "Are you ready to outsource?"}
            </h2>
            <p className="mt-4 text-[var(--color-granit)]">
              {isFr
                ? "8 questions pour mesurer votre maturité et recevoir une recommandation personnalisée."
                : "8 questions to measure your maturity and receive a personalised recommendation."}
            </p>
          </div>
          <ReadinessQuiz />
        </Container>
      </Section>

      {/* FAQ — voice search + featured snippets */}
      <HomeFaq />

      <CtaBanner />
    </>
  );
}

const FAQ_JSONLD_FR = [
  { q: "Qu'est-ce que le BPO et comment fonctionne l'externalisation de processus ?", a: "Le BPO (Business Process Outsourcing) consiste à confier certains processus opérationnels — service client, saisie de données, comptabilité, support IT — à un prestataire spécialisé. Corpshore gère ces processus depuis ses hubs en Afrique, Europe et Amériques avec des équipes dédiées formées à vos procédures." },
  { q: "Combien coûte l'externalisation BPO avec Corpshore ?", a: "Les tarifs Corpshore débutent à partir de 9 à 12 euros par FTE et par heure pour les configurations Starter, jusqu'à 15 à 20 euros par heure pour les configurations Enterprise. Un ETP internalisé en France coûte en moyenne 45 à 65 000 euros par an charges sociales comprises." },
  { q: "Corpshore est-il vraiment classé #1 BPO en France ?", a: "Oui. Corpshore France est classé #1 parmi les sociétés de BPO en France par Outsource Accelerator, le principal annuaire mondial des prestataires BPO, basé sur la performance opérationnelle, la couverture géographique et la qualité de service." },
  { q: "Quels services d'externalisation Corpshore propose-t-il ?", a: "Corpshore couvre six domaines : le BPO, l'infogérance IT, l'IA générative, les RH externalisées, la finance et comptabilité, et le service client multicanal." },
  { q: "Combien de temps faut-il pour démarrer avec Corpshore ?", a: "La mise en place d'une équipe BPO avec Corpshore prend généralement de 2 à 4 semaines selon la complexité du périmètre. Les équipes IT et IA peuvent démarrer en 3 à 6 semaines." },
];

const FAQ_JSONLD_EN = [
  { q: "What is BPO and how does business process outsourcing work?", a: "BPO (Business Process Outsourcing) means entrusting operational processes — customer service, data entry, accounting, IT support — to a specialist provider. Corpshore manages these processes from its delivery hubs in Africa, Europe, and the Americas with dedicated teams trained on your procedures." },
  { q: "How much does BPO outsourcing with Corpshore cost?", a: "Corpshore rates start from 9 to 12 euros per FTE per hour for Starter configurations, up to 15 to 20 euros per hour for Enterprise. An in-house FTE in France costs on average 45,000 to 65,000 euros per year including social charges." },
  { q: "Is Corpshore really ranked #1 BPO in France?", a: "Yes. Corpshore France is ranked #1 among BPO companies in France by Outsource Accelerator, the leading global BPO directory, based on operational performance, geographic coverage, and service quality." },
  { q: "What outsourcing services does Corpshore offer?", a: "Corpshore covers six areas: BPO, IT managed services, generative AI, HR outsourcing, finance and accounting, and multichannel customer experience." },
  { q: "How long does it take to start with Corpshore?", a: "Setting up a BPO team with Corpshore typically takes 2 to 4 weeks depending on scope complexity. IT and AI teams can start in 3 to 6 weeks." },
];

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const faqItems = locale === "fr" ? FAQ_JSONLD_FR : FAQ_JSONLD_EN;
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <HomeContent locale={locale} />
    </>
  );
}
