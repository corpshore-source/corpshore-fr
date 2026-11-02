import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container, Section, Eyebrow } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { PageHero } from "@/components/layout/page-hero";
import { CtaBanner } from "@/components/marketing/cta-banner";
import { SITE } from "@/lib/site";
import { pageAlternates } from "@/lib/seo";
import { locales } from "@/i18n/routing";

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isFr = locale === "fr";
  const title = isFr
    ? "BPO France par ville — Paris, Lyon, Marseille, Bordeaux et plus"
    : "BPO France by city — Paris, Lyon, Marseille, Bordeaux and more";
  const description = isFr
    ? "Corpshore accompagne les entreprises de toutes les métropoles françaises : Paris, Lyon, Marseille, Bordeaux, Toulouse, Lille, Nantes, Strasbourg, Montpellier, Rennes. BPO #1 en France."
    : "Corpshore supports companies in all French metropolitan areas: Paris, Lyon, Marseille, Bordeaux, Toulouse, Lille, Nantes, Strasbourg, Montpellier, Rennes. #1 BPO in France.";
  return {
    title,
    description,
    keywords: isFr
      ? "BPO Paris, BPO Lyon, BPO Marseille, BPO Bordeaux, BPO Toulouse, BPO Lille, BPO Nantes, BPO Strasbourg, externalisation France métropoles, prestataire BPO grandes villes France"
      : "BPO Paris, BPO Lyon, BPO Marseille, BPO Bordeaux, BPO Toulouse, BPO Lille, BPO Nantes, BPO Strasbourg, outsourcing France cities, BPO provider major French cities",
    alternates: pageAlternates("/villes"),
    openGraph: {
      title,
      description,
      url: `${SITE.url}/${locale}/villes`,
      images: [{ url: `${SITE.url}/images/cf-offshore-nearshore-onshore-map.png`, width: 1200, height: 630 }],
    },
  };
}

const cities = [
  {
    name: "Paris",
    region: "Île-de-France",
    code: "75",
    pop: "12,3 M hab.",
    sectors: ["Fintech", "E-commerce", "Services financiers", "Tech"],
    sectorsEn: ["Fintech", "E-commerce", "Financial services", "Tech"],
    desc: "Premier pôle économique français, Paris concentre les sièges sociaux de la plupart des grands groupes. Nos équipes BPO et IT accompagnent les entreprises parisiennes et les sites français des multinationales.",
    descEn: "France's leading economic hub, Paris concentrates the headquarters of most major groups. Our BPO and IT teams support Parisian companies and the French sites of multinationals.",
  },
  {
    name: "Lyon",
    region: "Auvergne-Rhône-Alpes",
    code: "69",
    pop: "2,3 M hab.",
    sectors: ["Santé", "Industrie", "Pharma", "Logistique"],
    sectorsEn: ["Healthcare", "Industry", "Pharma", "Logistics"],
    desc: "Deuxième place économique de France, Lyon est un hub majeur pour la santé, la pharmacie et l'industrie chimique. Corpshore accompagne les entreprises lyonnaises sur la TMA, l'annotation IA médicale et le service client.",
    descEn: "France's second economic hub, Lyon is a major centre for healthcare, pharmaceuticals and the chemical industry. Corpshore supports Lyon companies on TMA, medical AI annotation and customer service.",
  },
  {
    name: "Marseille",
    region: "Provence-Alpes-Côte d'Azur",
    code: "13",
    pop: "1,9 M hab.",
    sectors: ["Logistique", "Tourisme", "Maritime", "Services"],
    sectorsEn: ["Logistics", "Tourism", "Maritime", "Services"],
    desc: "Premier port de France et gateway méditerranéen, Marseille est stratégique pour les entreprises opérant sur l'arc méditerranéen. Nos équipes bilingues français-arabe servent les filiales maghrébines.",
    descEn: "France's leading port and Mediterranean gateway, Marseille is strategic for companies operating across the Mediterranean arc. Our bilingual French-Arabic teams serve Maghreb subsidiaries.",
  },
  {
    name: "Bordeaux",
    region: "Nouvelle-Aquitaine",
    code: "33",
    pop: "800 K hab.",
    sectors: ["Agroalimentaire", "Aéronautique", "Numérique", "Viti-vinicole"],
    sectorsEn: ["Agri-food", "Aeronautics", "Digital", "Wine industry"],
    desc: "Bordeaux concentre un écosystème numérique dynamique et un secteur agroalimentaire et viticole mondial. Corpshore accompagne les PME et ETI bordelaises sur la paie, la comptabilité et le service client.",
    descEn: "Bordeaux concentrates a dynamic digital ecosystem and a global agri-food and wine sector. Corpshore supports Bordeaux SMEs and mid-caps on payroll, accounting and customer service.",
  },
  {
    name: "Toulouse",
    region: "Occitanie",
    code: "31",
    pop: "1,4 M hab.",
    sectors: ["Aéronautique", "Spatial", "Défense", "Numérique"],
    sectorsEn: ["Aeronautics", "Space", "Defence", "Digital"],
    desc: "Capitale européenne de l'aéronautique et du spatial, Toulouse héberge Airbus, Thales et le CNES. Nos équipes TMA et support IT accompagnent les sous-traitants aéronautiques sur la conformité documentaire.",
    descEn: "The European capital of aeronautics and space, Toulouse is home to Airbus, Thales and CNES. Our TMA and IT support teams help aerospace subcontractors with document compliance.",
  },
  {
    name: "Lille",
    region: "Hauts-de-France",
    code: "59",
    pop: "1,2 M hab.",
    sectors: ["Retail", "Logistique", "Textile", "Numérique"],
    sectorsEn: ["Retail", "Logistics", "Textile", "Digital"],
    desc: "Carrefour nord-européen, Lille est un hub du retail, de la logistique et du e-commerce. Corpshore y accompagne les enseignes et les plateformes e-commerce sur le service client et la gestion des retours.",
    descEn: "North European crossroads, Lille is a hub for retail, logistics and e-commerce. Corpshore supports retail brands and e-commerce platforms on customer service and returns management.",
  },
  {
    name: "Nantes",
    region: "Pays de la Loire",
    code: "44",
    pop: "950 K hab.",
    sectors: ["Numérique", "Agroalimentaire", "Aéronautique", "Santé"],
    sectorsEn: ["Digital", "Agri-food", "Aeronautics", "Healthcare"],
    desc: "Nantes est l'une des métropoles françaises à la croissance la plus rapide, portée par son écosystème numérique et ses pôles de compétitivité. Nos équipes BPO accompagnent les startups et les ETI nantaises en pleine expansion.",
    descEn: "Nantes is one of France's fastest-growing metropolitan areas, driven by its digital ecosystem and competitiveness clusters. Our BPO teams support Nantes startups and mid-caps in rapid expansion.",
  },
  {
    name: "Strasbourg",
    region: "Grand Est",
    code: "67",
    pop: "800 K hab.",
    sectors: ["Institutions européennes", "Finance", "Pharma", "Médias"],
    sectorsEn: ["EU institutions", "Finance", "Pharma", "Media"],
    desc: "Siège du Parlement européen, Strasbourg est un hub multilingue exceptionnel. Nos équipes bilingues français-allemand et francophones servent les filiales alsaciennes et les institutions européennes.",
    descEn: "Home to the European Parliament, Strasbourg is an exceptional multilingual hub. Our bilingual French-German and French-speaking teams serve Alsatian subsidiaries and European institutions.",
  },
  {
    name: "Montpellier",
    region: "Occitanie",
    code: "34",
    pop: "620 K hab.",
    sectors: ["MedTech", "Numérique", "ESR", "Tourisme"],
    sectorsEn: ["MedTech", "Digital", "Higher Ed & Research", "Tourism"],
    desc: "Montpellier est la troisième ville universitaire de France et un pôle MedTech émergent. Corpshore accompagne les startups santé et les laboratoires pharmaceutiques sur l'annotation de données médicales.",
    descEn: "Montpellier is France's third-largest university city and an emerging MedTech hub. Corpshore supports health startups and pharmaceutical labs on medical data annotation.",
  },
  {
    name: "Rennes",
    region: "Bretagne",
    code: "35",
    pop: "730 K hab.",
    sectors: ["Télécoms", "Numérique", "Agroalimentaire", "Défense"],
    sectorsEn: ["Telecoms", "Digital", "Agri-food", "Defence"],
    desc: "Rennes est un pôle français des télécommunications (Orange y a ses principales équipes R&D) et du numérique. Corpshore y accompagne les opérateurs télécoms sur le back-office abonnés et le support technique.",
    descEn: "Rennes is a French hub for telecommunications (Orange has its main R&D teams here) and digital. Corpshore supports telecom operators on subscriber back-office and technical support.",
  },
] as const;

const localSeoSchema = (isFr: boolean) => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: isFr ? "BPO par ville en France — Corpshore" : "BPO by city in France — Corpshore",
  description: isFr
    ? "Corpshore accompagne les entreprises dans toutes les grandes villes françaises."
    : "Corpshore supports companies across all major French cities.",
  itemListElement: cities.map((c, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: `BPO ${c.name}${isFr ? ` — ${c.region}` : ` — ${c.region}`}`,
  })),
});

export default async function VillesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isFr = locale === "fr";

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localSeoSchema(isFr)) }}
      />

      <PageHero
        label={isFr ? "Présence locale" : "Local presence"}
        heading={isFr ? "BPO en France, ville par ville" : "BPO across France, city by city"}
        sub={isFr
          ? "Corpshore accompagne les entreprises de toutes les métropoles françaises — du service client e-commerce parisien à l'annotation de données MedTech montpelliéraine."
          : "Corpshore supports companies in all French metropolitan areas — from Parisian e-commerce customer service to Montpellier MedTech data annotation."}
        image="/images/cf-offshore-nearshore-onshore-map.png"
      />

      <Section tone="default">
        <Container>
          <Eyebrow>{isFr ? "Métropoles couvertes" : "Metropolitan areas covered"}</Eyebrow>
          <h2 className="mb-10">
            {isFr ? "10 métropoles françaises, une seule expertise BPO" : "10 French metropolitan areas, one BPO expertise"}
          </h2>
          <div className="space-y-8">
            {cities.map((city) => (
              <article key={city.name} className="card-base p-8 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-2">
                  <div className="flex items-baseline gap-3 mb-1">
                    <h3 className="text-[var(--text-h3)]">BPO {city.name}</h3>
                    <span className="text-sm text-[var(--color-granit)]">— {city.region}</span>
                  </div>
                  <p className="text-xs text-[var(--color-granit)] mb-4">{city.pop}</p>
                  <p className="text-[var(--color-granit)] leading-relaxed text-sm mb-6">
                    {isFr ? city.desc : city.descEn}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Link href="/devis" className={buttonVariants({ variant: "primary", size: "sm" })}>
                      {isFr ? "Devis gratuit" : "Free quote"}
                    </Link>
                    <Link href="/contact" className={buttonVariants({ variant: "secondary", size: "sm" })}>
                      {isFr ? "Nous contacter" : "Contact us"}
                    </Link>
                  </div>
                </div>
                <div className="bg-[var(--color-calcaire)] rounded-[var(--radius-lg)] p-5">
                  <Eyebrow>{isFr ? "Secteurs clés" : "Key sectors"}</Eyebrow>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {(isFr ? city.sectors : city.sectorsEn).map((sec) => (
                      <span
                        key={sec}
                        className="text-xs bg-white border border-[var(--color-border)] text-[var(--color-marine-800)] px-2.5 py-1 rounded-full"
                      >
                        {sec}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="muted">
        <Container className="max-w-3xl text-center">
          <Eyebrow>{isFr ? "Votre ville" : "Your city"}</Eyebrow>
          <h2 className="mb-4">
            {isFr ? "Vous êtes dans une autre région ?" : "You're in another region?"}
          </h2>
          <p className="text-[var(--color-granit)] mb-8">
            {isFr
              ? "Corpshore accompagne des clients dans toute la France, les DOM-TOM et les territoires francophones. Quelle que soit votre localisation, nos équipes s'adaptent à vos contraintes de fuseau horaire et de réglementation locale."
              : "Corpshore supports clients throughout France, overseas territories and French-speaking regions. Whatever your location, our teams adapt to your time zone constraints and local regulations."}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/devis" className={buttonVariants({ variant: "primary" })}>
              {isFr ? "Demander un devis gratuit" : "Request a free quote"}
            </Link>
            <Link href="/contact" className={buttonVariants({ variant: "secondary" })}>
              {isFr ? "Parler à un expert" : "Speak to an expert"}
            </Link>
          </div>
        </Container>
      </Section>

      <CtaBanner />
    </>
  );
}
