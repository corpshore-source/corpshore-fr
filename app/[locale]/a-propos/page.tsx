import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container, Section, Eyebrow } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { PageHero } from "@/components/layout/page-hero";
import { CtaBanner } from "@/components/marketing/cta-banner";
import Image from "next/image";
import { SITE } from "@/lib/site";

import { pageAlternates, KEYWORDS } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "About.meta" });
  const title = t("title");
  const description = t("description");
  return {
    title,
    description,
    keywords: KEYWORDS.about[locale as "fr" | "en"],
    alternates: pageAlternates("/a-propos"),
    openGraph: { title, description, url: `${SITE.url}/${locale}/a-propos` },
  };
}

const timeline = [
  { year: "2015", event: "Fondation de Corpshore Solutions Corporation à Toronto, Canada." },
  { year: "2017", event: "Ouverture du premier hub francophone en République Dominicaine." },
  { year: "2019", event: "Expansion en Europe : hub Pologne dédié aux marchés FR/DE/UK." },
  { year: "2021", event: "Lancement de Corpshore AI et du service d'externalisation IA." },
  { year: "2023", event: "Présence dans 18 pays. Dépassement du seuil 500+ clients servis." },
  { year: "2026", event: "Classement #1 BPO en France par Outsource Accelerator." },
] as const;

const values = [
  { icon: "🎯", title: "Excellence francophone", body: "La qualité en langue française n'est pas négociable. Chaque livrable est contrôlé par un locuteur natif." },
  { icon: "📋", title: "Transparence contractuelle", body: "Nos contrats définissent des SLA précis avec des pénalités et des mécanismes de revue trimestrielle." },
  { icon: "🔒", title: "Conformité by design", body: "RGPD, ANSSI, HDS, AMF/ACPR — la conformité est intégrée dès la conception, pas ajoutée après." },
  { icon: "🌍", title: "Impact global, ancrage local", body: "Notre réseau mondial au service d'une réalité locale : les standards culturels et réglementaires de la France." },
] as const;

function AboutContent() {
  const t = useTranslations("About");

  return (
    <>
      <PageHero
        label={t("hero.label")}
        heading={t("hero.h1")}
        sub={t("hero.sub")}
        image="/images/equipe-teletravail-francophonie.webp"
      />

      {/* Story */}
      <Section tone="default">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
            <div>
              <Eyebrow>Notre histoire</Eyebrow>
              <h2>Fondés à Toronto. Spécialistes de la France.</h2>
              <div className="mt-6 space-y-4 text-[var(--color-granit)] leading-relaxed">
                <p>
                  Corpshore Solutions Corporation a été fondée en 2015 à Toronto par une équipe d'entrepreneurs franco-canadiens avec une conviction simple : les entreprises françaises méritaient un prestataire BPO qui comprenait vraiment leur marché — leur langue, leur culture, leur réglementation.
                </p>
                <p>
                  Onze ans plus tard, nous opérons depuis 11 hubs sur 4 continents, avec plus de 500 clients servis et des équipes maîtrisant 35 langues. Notre classement #1 BPO en France par Outsource Accelerator en 2026 valide une décennie de construction minutieuse de la qualité.
                </p>
                <p>
                  Notre particularité : nous n'avons jamais cherché à être le prestataire le moins cher du marché. Nous sommes le prestataire qui livre la meilleure qualité au meilleur rapport valeur/coût pour les entreprises françaises et francophones exigeantes.
                </p>
              </div>
              <div className="relative mt-8 h-52 rounded-xl overflow-hidden ring-1 ring-[var(--color-border)]">
                <Image
                  src="/images/histoire-lumieres-tech.webp"
                  alt="Histoire de Corpshore"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="mt-6">
                <a href={SITE.globalUrl} target="_blank" rel="noopener noreferrer" className={buttonVariants({ variant: "secondary", size: "sm" })}>
                  Corpshore Global ↗
                </a>
              </div>
            </div>

            {/* Timeline */}
            <div>
              <Eyebrow>Chronologie</Eyebrow>
              <h3 className="mb-8">10 ans de construction</h3>
              <div className="space-y-0">
                {timeline.map(({ year, event }, i) => (
                  <div key={year} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-[var(--color-marine-800)] text-white text-sm font-bold flex items-center justify-center shrink-0">
                        {year.slice(2)}
                      </div>
                      {i < timeline.length - 1 && (
                        <div className="w-0.5 flex-1 bg-[var(--color-border)] my-2" />
                      )}
                    </div>
                    <div className={i < timeline.length - 1 ? "pb-8" : ""}>
                      <p className="text-xs font-bold text-[var(--color-marine-800)] mb-1">{year}</p>
                      <p className="text-sm text-[var(--color-granit)] leading-relaxed">{event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Values */}
      <Section tone="muted">
        <Container>
          <div className="text-center max-w-xl mx-auto mb-12">
            <Eyebrow>Nos valeurs</Eyebrow>
            <h2>Ce qui nous différencie</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map(({ icon, title, body }) => (
              <div key={title} className="card-base p-6">
                <div className="text-3xl mb-3">{icon}</div>
                <h3 className="text-base mb-2">{title}</h3>
                <p className="text-sm text-[var(--color-granit)] leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Rankings */}
      <Section tone="marine">
        <Container className="text-center">
          <Eyebrow className="text-[var(--color-or-400)]">Classements vérifiés 2026</Eyebrow>
          <h2 className="text-white mb-10">Reconnus indépendamment.</h2>
          <div className="flex flex-wrap justify-center gap-6">
            {[
              { medal: "🥇", label: "#1 BPO en France" },
              { medal: "🥈", label: "#2 BPO en Europe" },
              { medal: "🤖", label: "Top 5 IA Mondiale" },
            ].map(({ medal, label }) => (
              <div key={label} className="bg-white/5 border border-white/12 rounded-[var(--radius-xl)] px-8 py-6 text-center">
                <div className="text-4xl mb-2">{medal}</div>
                <p className="font-semibold text-white">{label}</p>
                <p className="text-xs text-white/50 mt-1">{SITE.rankings.source}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Hubs */}
      <Section tone="default">
        <Container>
          <div className="text-center max-w-xl mx-auto mb-10">
            <Eyebrow>Réseau de livraison</Eyebrow>
            <h2>11 hubs. 4 continents.</h2>
          </div>
          <div className="flex flex-wrap gap-2.5 justify-center">
            {SITE.hubs.map(({ flag, name }) => (
              <span key={name} className="hub-pill">{flag} {name}</span>
            ))}
          </div>
        </Container>
      </Section>

      <CtaBanner />
    </>
  );
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <AboutContent />;
}
