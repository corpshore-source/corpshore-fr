import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container, Section, Eyebrow } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { PageHero } from "@/components/layout/page-hero";
import { CtaBanner } from "@/components/marketing/cta-banner";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Industries.meta" });
  return { title: t("title"), description: t("description") };
}

const sectors = [
  {
    icon: "🏦",
    name: "Services financiers",
    nameEn: "Financial Services",
    regs: "AMF · ACPR · RGPD · Bâle III",
    body: "Gestion de la conformité KYC/AML, traitement de dossiers de crédit, back-office titres, reporting réglementaire MIFID II. Nos équipes maîtrisent le vocabulaire financier français et les obligations déclaratives spécifiques aux établissements français.",
    bodyEn: "KYC/AML compliance management, credit file processing, securities back-office, MiFID II regulatory reporting. Our teams master French financial vocabulary and the specific reporting obligations of French institutions.",
    services: ["KYC & due diligence", "Reporting réglementaire", "Back-office crédit", "Support clients bancaires"],
  },
  {
    icon: "🏛️",
    name: "Secteur public",
    nameEn: "Public Sector",
    regs: "ANSSI · HDS · Code marchés publics · LCEN",
    body: "Traitement de dossiers administratifs, numérisation d'archives, helpdesk agents publics, centres de contact citoyens. Conformité aux exigences ANSSI et aux marchés publics — références ministères et collectivités.",
    bodyEn: "Administrative file processing, archive digitisation, public agent helpdesk, citizen contact centres. ANSSI compliance and public procurement requirements — ministry and local authority references.",
    services: ["Numérisation archives", "Helpdesk agents publics", "Centre de contact citoyens", "Traitement dossiers"],
  },
  {
    icon: "🛡️",
    name: "Assurance",
    nameEn: "Insurance",
    regs: "ACPR · Solvabilité II · RGPD · IARD",
    body: "Gestion des sinistres, traitement des contrats, service adhérents mutuelles, conformité ACPR/Solvabilité II. Nos agents sont formés aux conventions IRSA, IRCA et aux spécificités des contrats IARD et santé français.",
    bodyEn: "Claims management, contract processing, mutual fund member service, ACPR/Solvency II compliance. Our agents are trained in IRSA, IRCA conventions and the specificities of French IARD and health contracts.",
    services: ["Gestion sinistres", "Service adhérents", "Conformité ACPR", "Traitement contrats"],
  },
  {
    icon: "🏥",
    name: "Santé",
    nameEn: "Healthcare",
    regs: "HDS · RGPD · CIM-10 · ANSSI",
    body: "Traitement de données de santé avec certification HDS type 1 et 2. Numérisation et gestion de dossiers médicaux, codification CIM-10, support téléphonique patients en français. Zéro incident de sécurité sur 18+ mois de références.",
    bodyEn: "Health data processing with HDS type 1 and 2 certification. Medical record digitisation and management, ICD-10 coding, French-language patient phone support. Zero security incidents across 18+ months of references.",
    services: ["Dossiers médicaux HDS", "Codification CIM-10", "Support patients", "Conformité ANSSI"],
  },
  {
    icon: "🛒",
    name: "E-commerce & Retail",
    nameEn: "E-commerce & Retail",
    regs: "DSA · RGPD · LCEN",
    body: "Service client multicanal, gestion des retours et litiges, modération de contenus, traitement des commandes, traduction et localisation de catalogues produits. Capacité de montée en charge rapide pour les pics saisonniers.",
    bodyEn: "Multichannel customer service, returns and dispute management, content moderation, order processing, product catalogue translation and localisation. Rapid scale-up capacity for seasonal peaks.",
    services: ["Service client 24/7", "Modération DSA", "Traitement commandes", "Localisation catalogue"],
  },
  {
    icon: "📡",
    name: "Télécommunications",
    nameEn: "Telecommunications",
    regs: "ARCEP · RGPD",
    body: "Back-office abonnés, gestion de la portabilité, traitement des litiges de facturation, support technique N1/N2 en français. Expérience sur des volumes de 2M+ d'abonnés avec optimisation des coûts unitaires.",
    bodyEn: "Subscriber back-office, portability management, billing dispute resolution, French-language N1/N2 technical support. Experience with 2M+ subscriber volumes with unit cost optimisation.",
    services: ["Back-office abonnés", "Support technique", "Gestion portabilité", "Litiges facturation"],
  },
  {
    icon: "✈️",
    name: "Tourisme & Hôtellerie",
    nameEn: "Tourism & Hospitality",
    regs: "RGPD · Loi Montagne · Atout France",
    body: "Conciergerie multilingue 24/7, gestion de réservations, service après-vente voyages, back-office compagnies aériennes et hôtelières. Maîtrise de 6 langues sur des équipes dédiées palace et chaînes hôtelières.",
    bodyEn: "24/7 multilingual concierge, reservation management, travel after-sales service, airline and hotel back-office. 6-language capability on dedicated palace and hotel chain teams.",
    services: ["Conciergerie 24/7", "Gestion réservations", "SAV voyages", "Support multilingue"],
  },
  {
    icon: "🏗️",
    name: "PME & ETI françaises",
    nameEn: "French SMEs & Mid-Caps",
    regs: "PCG · DSN · RGPD",
    body: "Pour les PME et ETI françaises qui n'ont pas les moyens d'une direction fonctionnelle complète : externalisation partielle de la comptabilité PCG, de la paie (DSN), du service client ou du support IT avec budget adapté.",
    bodyEn: "For French SMEs and mid-caps that cannot afford a full functional team: partial outsourcing of PCG accounting, payroll (DSN), customer service or IT support with adapted budgets.",
    services: ["Comptabilité PCG", "Paie & DSN", "Service client", "Support IT"],
  },
] as const;

function IndustriesContent() {
  const t = useTranslations("Industries");

  return (
    <>
      <PageHero
        label={t("hero.label")}
        heading={t("hero.h1")}
        sub={t("hero.sub")}
      />

      <Section tone="default">
        <Container>
          <div className="space-y-10">
            {sectors.map(({ icon, name, regs, body, services: svcs }, i) => (
              <article key={name} className="card-base p-8 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-2">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl">{icon}</span>
                    <div>
                      <h2 className="text-[var(--text-h3)] mb-0.5">{name}</h2>
                      <span className="text-xs text-[var(--color-granit)]">{regs}</span>
                    </div>
                  </div>
                  <p className="text-[var(--color-granit)] leading-relaxed">{body}</p>
                  <div className="mt-6">
                    <Link href="/contact" className={buttonVariants({ variant: "primary", size: "sm" })}>
                      Parler à un expert →
                    </Link>
                  </div>
                </div>
                <div className="bg-[var(--color-calcaire)] rounded-[var(--radius-lg)] p-6">
                  <Eyebrow>Services inclus</Eyebrow>
                  <ul className="space-y-2">
                    {svcs.map((s) => (
                      <li key={s} className="flex items-center gap-2 text-sm text-[var(--color-granit)]">
                        <span className="text-[var(--color-marine-800)]">▸</span> {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
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
