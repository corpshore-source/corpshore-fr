import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container, Section } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { PageHero } from "@/components/layout/page-hero";
import { CtaBanner } from "@/components/marketing/cta-banner";
import Image from "next/image";
import { cn } from "@/lib/utils";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Services.meta" });
  return { title: t("title"), description: t("description") };
}

const services = [
  {
    icon: "🏢",
    image: "/images/paris-la-defense-business.webp",
    titleKey: "bpo",
    detail: [
      "Saisie et contrôle de données (400–1 000 enregistrements/jour/agent)",
      "Gestion documentaire, numérisation et indexation",
      "Traitement des commandes, sinistres et dossiers administratifs",
      "Conformité RGPD et respect des SLA contractuels",
      "Reporting mensuel avec accès aux tableaux de bord en temps réel",
    ],
    detailEn: [
      "Data entry and quality control (400–1,000 records/day/agent)",
      "Document management, digitisation and indexing",
      "Order, claims and administrative file processing",
      "GDPR compliance and contractual SLA adherence",
      "Monthly reporting with real-time dashboard access",
    ],
  },
  {
    icon: "💻",
    image: "/images/equipe-teletravail-francophonie.webp",
    titleKey: "it",
    detail: [
      "Équipes offshore dédiées full-stack (React/Next.js, Node, Python, Java)",
      "Développement mobile (React Native, Flutter)",
      "Migration cloud AWS, Azure, GCP",
      "Intégration API et middleware",
      "Support technique N1/N2/N3 en français",
    ],
    detailEn: [
      "Dedicated full-stack offshore teams (React/Next.js, Node, Python, Java)",
      "Mobile development (React Native, Flutter)",
      "Cloud migration AWS, Azure, GCP",
      "API and middleware integration",
      "N1/N2/N3 technical support in French",
    ],
  },
  {
    icon: "🤖",
    image: "/images/ai-annotation-equipe.webp",
    titleKey: "ai",
    detail: [
      "Pipelines NLP et traitement du langage naturel en français",
      "Automatisation RPA (UiPath, Automation Anywhere, Power Automate)",
      "Développement de chatbots et assistants IA",
      "Data labelling et annotation pour l'entraînement de modèles",
      "Intégration IA générative (OpenAI, Anthropic, Mistral) en enterprise",
    ],
    detailEn: [
      "NLP pipelines and French natural language processing",
      "RPA automation (UiPath, Automation Anywhere, Power Automate)",
      "Chatbot and AI assistant development",
      "Data labelling and annotation for model training",
      "Enterprise generative AI integration (OpenAI, Anthropic, Mistral)",
    ],
  },
  {
    icon: "👥",
    image: "/images/recrutement-teletravail-france.webp",
    titleKey: "hr",
    detail: [
      "Acquisition de talents et recrutement cadres (Executive Search)",
      "Employer of Record (EOR) — embauche sans entité en France",
      "Traitement de la paie (DSN, URSSAF, conventions collectives)",
      "Administration du personnel et SIRH",
      "Formation et développement des compétences",
    ],
    detailEn: [
      "Talent acquisition and executive recruitment (Executive Search)",
      "Employer of Record (EOR) — hiring without a French entity",
      "Payroll processing (DSN, URSSAF, collective agreements)",
      "HR administration and HRIS",
      "Training and skills development",
    ],
  },
  {
    icon: "📈",
    image: "/images/secteur-public-digitalisation.webp",
    titleKey: "finance",
    detail: [
      "Comptabilité générale PCG et clôtures mensuelles/annuelles",
      "Comptes fournisseurs & clients (AP/AR) avec réconciliation",
      "Reporting IFRS et consolidation groupe",
      "Support trésorerie et gestion de la liquidité",
      "Préparation des dossiers d'audit commissaires aux comptes",
    ],
    detailEn: [
      "PCG general accounting and monthly/annual closures",
      "Accounts payable & receivable (AP/AR) with reconciliation",
      "IFRS reporting and group consolidation",
      "Treasury support and liquidity management",
      "Statutory audit file preparation",
    ],
  },
  {
    icon: "📞",
    image: "/images/agent-support-francophone.webp",
    titleKey: "cx",
    detail: [
      "Support téléphonique, email, chat en direct et réseaux sociaux",
      "SLA CSAT contractuels avec pénalités et bonus de performance",
      "Agents natifs francophones (France, Belgique, Suisse, Afrique)",
      "Intégration Zendesk, Salesforce, Freshdesk, Intercom",
      "Disponibilité 24/7 ou horaires bureau selon le besoin client",
    ],
    detailEn: [
      "Phone, email, live chat and social media support",
      "Contractual CSAT SLAs with performance penalties and bonuses",
      "Native Francophone agents (France, Belgium, Switzerland, Africa)",
      "Zendesk, Salesforce, Freshdesk, Intercom integration",
      "24/7 availability or business hours as required",
    ],
  },
] as const;

function ServicesContent() {
  const t = useTranslations("Services");
  const homeT = useTranslations("Home.services");

  return (
    <>
      <PageHero
        label={t("hero.label")}
        heading={t("hero.h1")}
        sub={t("hero.sub")}
      />

      <Section tone="default">
        <Container>
          <div className="space-y-16">
            {services.map(({ icon, image, titleKey, detail }, i) => (
              <div key={titleKey} className={cn(
                "grid grid-cols-1 lg:grid-cols-2 gap-10 items-start",
                i % 2 === 1 ? "lg:flex-row-reverse" : ""
              )}>
                <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-4xl">{icon}</span>
                    <h2 className="text-[var(--text-h3)]">{homeT(`${titleKey}.title`)}</h2>
                  </div>
                  <p className="text-[var(--color-granit)] leading-relaxed mb-6">
                    {homeT(`${titleKey}.body`)}
                  </p>
                  <ul className="space-y-2.5">
                    {detail.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm">
                        <span className="text-[var(--color-vermeil-500)] mt-0.5 shrink-0">✓</span>
                        <span className="text-[var(--color-granit)]">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8">
                    <Link href="/contact" className={buttonVariants({ variant: "primary", size: "sm" })}>
                      Demander un devis →
                    </Link>
                  </div>
                </div>
                <div className={cn(
                  "rounded-[var(--radius-xl)] overflow-hidden border border-[var(--color-border)] bg-[var(--color-calcaire)]",
                  i % 2 === 1 ? "lg:order-1" : ""
                )}>
                  <div className="relative h-52">
                    <Image src={image} alt="" fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    <span className="absolute bottom-3 left-3 text-3xl">{icon}</span>
                  </div>
                  <div className="p-6 space-y-3">
                    {["Délai de déploiement", "Modèle tarifaire", "Engagement SLA"].map((label, j) => (
                      <div key={label} className="flex justify-between items-center py-2 border-b border-[var(--color-border)] last:border-0 text-sm">
                        <span className="text-[var(--color-granit)]">{label}</span>
                        <span className="font-semibold text-[var(--color-marine-800)]">
                          {j === 0 ? "4–6 semaines" : j === 1 ? "FTE mensuel" : "Contractuel"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <CtaBanner />
    </>
  );
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ServicesContent />;
}
