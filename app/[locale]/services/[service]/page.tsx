import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container, Section, Eyebrow } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { PageHero } from "@/components/layout/page-hero";
import { CtaBanner } from "@/components/marketing/cta-banner";
import { SITE } from "@/lib/site";
import { pageAlternates } from "@/lib/seo";
import { servicesDeep, getServiceBySlug } from "@/lib/data/services-deep";
import { locales } from "@/i18n/routing";

export async function generateStaticParams() {
  return locales.flatMap((locale) =>
    servicesDeep.map((s) => ({ locale, service: s.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; service: string }>;
}): Promise<Metadata> {
  const { locale, service } = await params;
  const s = getServiceBySlug(service);
  if (!s) return {};
  const isFr = locale === "fr";
  const title = isFr ? s.metaTitle : s.metaTitleEn;
  const description = isFr ? s.metaDescription : s.metaDescriptionEn;
  const keywords = isFr ? s.keywords : s.keywordsEn;
  return {
    title,
    description,
    keywords,
    alternates: pageAlternates(`/services/${service}`),
    openGraph: {
      title,
      description,
      url: `${SITE.url}/${locale}/services/${service}`,
      images: s.heroImage
        ? [{ url: `${SITE.url}${s.heroImage}`, width: 1200, height: 630 }]
        : undefined,
    },
  };
}

export default async function ServiceDeepPage({
  params,
}: {
  params: Promise<{ locale: string; service: string }>;
}) {
  const { locale, service } = await params;
  setRequestLocale(locale);
  const s = getServiceBySlug(service);
  if (!s) notFound();

  const isFr = locale === "fr";
  const name = isFr ? s.name : s.nameEn;
  const intro = isFr ? s.intro : s.introEn;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: s.faq.map(({ q, a, qEn, aEn }) => ({
      "@type": "Question",
      name: isFr ? q : qEn,
      acceptedAnswer: { "@type": "Answer", text: isFr ? a : aEn },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE.url}/${locale}` },
      { "@type": "ListItem", position: 2, name: "Services", item: `${SITE.url}/${locale}/services` },
      { "@type": "ListItem", position: 3, name, item: `${SITE.url}/${locale}/services/${service}` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <PageHero
        label="Service"
        heading={`${s.icon} ${name}`}
        sub={intro}
        image={s.heroImage}
      />

      {/* Breadcrumb */}
      <Section tone="muted" className="py-3">
        <Container>
          <nav className="flex items-center gap-2 text-xs text-[var(--color-granit)]">
            <Link href="/" className="hover:text-[var(--color-marine-800)]">{isFr ? "Accueil" : "Home"}</Link>
            <span>/</span>
            <Link href="/services" className="hover:text-[var(--color-marine-800)]">Services</Link>
            <span>/</span>
            <span className="text-[var(--color-marine-800)] font-medium">{name}</span>
          </nav>
        </Container>
      </Section>

      {/* Features grid */}
      <Section tone="default">
        <Container>
          <Eyebrow>{isFr ? "Ce que nous faisons" : "What we do"}</Eyebrow>
          <h2 className="mb-10">
            {isFr ? `Notre offre ${name}` : `Our ${s.nameEn} offering`}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {s.features.map(({ title, titleEn, body, bodyEn }) => (
              <div key={title} className="card-base p-6">
                <h3 className="text-base font-semibold mb-3">{isFr ? title : titleEn}</h3>
                <p className="text-sm text-[var(--color-granit)] leading-relaxed">{isFr ? body : bodyEn}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/devis" className={buttonVariants({ variant: "primary" })}>
              {isFr ? "Demander un devis gratuit" : "Request a free quote"}
            </Link>
            <Link href="/contact" className={buttonVariants({ variant: "secondary" })}>
              {isFr ? "Parler à un expert" : "Speak to an expert"}
            </Link>
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section tone="muted">
        <Container className="max-w-3xl">
          <Eyebrow>{isFr ? "Questions fréquentes" : "FAQ"}</Eyebrow>
          <h2 className="mb-8">{isFr ? `${name} — vos questions` : `${s.nameEn} — your questions`}</h2>
          <div className="space-y-6">
            {s.faq.map(({ q, a, qEn, aEn }) => (
              <div key={q} className="card-base p-6">
                <h3 className="text-base font-semibold mb-3">{isFr ? q : qEn}</h3>
                <p className="text-sm text-[var(--color-granit)] leading-relaxed">{isFr ? a : aEn}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Other services */}
      <Section tone="default">
        <Container>
          <Eyebrow>{isFr ? "Autres services" : "Other services"}</Eyebrow>
          <h2 className="mb-8">{isFr ? "Notre portefeuille complet" : "Our full portfolio"}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {servicesDeep.filter((sv) => sv.slug !== service).map((sv) => (
              <Link
                key={sv.slug}
                href={`/services/${sv.slug}` as any}
                className="card-base p-4 flex flex-col items-center text-center gap-2 hover:border-[var(--color-marine-200)] transition-colors group"
              >
                <span className="text-2xl">{sv.icon}</span>
                <span className="text-sm font-medium text-[var(--color-marine-800)] group-hover:underline">
                  {isFr ? sv.name : sv.nameEn}
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      <CtaBanner />
    </>
  );
}
