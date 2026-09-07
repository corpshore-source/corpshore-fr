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
import { industrySectors, getSectorBySlug } from "@/lib/data/industries-data";
import { locales } from "@/i18n/routing";

export async function generateStaticParams() {
  return locales.flatMap((locale) =>
    industrySectors.map((s) => ({ locale, sector: s.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; sector: string }>;
}): Promise<Metadata> {
  const { locale, sector } = await params;
  const s = getSectorBySlug(sector);
  if (!s) return {};
  const isFr = locale === "fr";
  const title = isFr ? s.metaTitle : s.metaTitleEn;
  const description = isFr ? s.metaDescription : s.metaDescriptionEn;
  const keywords = isFr ? s.keywords : s.keywordsEn;
  return {
    title,
    description,
    keywords,
    alternates: pageAlternates(`/industries/${sector}`),
    openGraph: {
      title,
      description,
      url: `${SITE.url}/${locale}/industries/${sector}`,
      images: s.heroImage
        ? [{ url: `${SITE.url}${s.heroImage}`, width: 1200, height: 630 }]
        : undefined,
    },
  };
}

export default async function IndustrySectorPage({
  params,
}: {
  params: Promise<{ locale: string; sector: string }>;
}) {
  const { locale, sector } = await params;
  setRequestLocale(locale);
  const s = getSectorBySlug(sector);
  if (!s) notFound();

  const isFr = locale === "fr";
  const name = isFr ? s.name : s.nameEn;
  const body = isFr ? s.body : s.bodyEn;
  const services = isFr ? s.services : s.servicesEn;

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
      { "@type": "ListItem", position: 2, name: isFr ? "Secteurs" : "Industries", item: `${SITE.url}/${locale}/industries` },
      { "@type": "ListItem", position: 3, name, item: `${SITE.url}/${locale}/industries/${sector}` },
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
        label={isFr ? "Secteur" : "Industry"}
        heading={`${s.icon} ${name}`}
        sub={isFr
          ? `Solutions BPO, IT & IA de Corpshore pour le secteur ${name.toLowerCase()} en France`
          : `Corpshore BPO, IT & AI solutions for the ${nameEn(s, isFr)} sector in France`}
        image={s.heroImage}
      >
        <div className="flex flex-wrap gap-2 mt-4">
          {s.regs.split(" · ").map((r) => (
            <span key={r} className="text-xs bg-white/15 border border-white/25 text-white px-2.5 py-1 rounded-full">
              {r}
            </span>
          ))}
        </div>
      </PageHero>

      {/* Breadcrumb */}
      <Section tone="muted" className="py-3">
        <Container>
          <nav className="flex items-center gap-2 text-xs text-[var(--color-granit)]">
            <Link href="/" className="hover:text-[var(--color-marine-800)]">{isFr ? "Accueil" : "Home"}</Link>
            <span>/</span>
            <Link href="/industries" className="hover:text-[var(--color-marine-800)]">{isFr ? "Secteurs" : "Industries"}</Link>
            <span>/</span>
            <span className="text-[var(--color-marine-800)] font-medium">{name}</span>
          </nav>
        </Container>
      </Section>

      {/* Main content */}
      <Section tone="default">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            <div className="lg:col-span-2">
              <Eyebrow>{isFr ? "Notre expertise" : "Our expertise"}</Eyebrow>
              <h2 className="mb-6">{isFr ? `BPO & IT pour le secteur ${name}` : `BPO & IT for the ${s.nameEn} sector`}</h2>
              <p className="text-[var(--color-granit)] leading-relaxed text-base mb-8">{body}</p>

              <div className="flex flex-wrap gap-3">
                <Link href="/devis" className={buttonVariants({ variant: "primary" })}>
                  {isFr ? "Demander un devis gratuit" : "Request a free quote"}
                </Link>
                <Link href="/contact" className={buttonVariants({ variant: "secondary" })}>
                  {isFr ? "Parler à un expert" : "Speak to an expert"}
                </Link>
              </div>
            </div>

            <div className="bg-[var(--color-calcaire)] border border-[var(--color-border)] rounded-[var(--radius-xl)] p-6">
              <Eyebrow>{isFr ? "Services inclus" : "Included services"}</Eyebrow>
              <ul className="space-y-3 mt-4">
                {services.map((sv) => (
                  <li key={sv} className="flex items-start gap-2 text-sm text-[var(--color-granit)]">
                    <span className="text-[var(--color-marine-800)] mt-0.5">▸</span>
                    <span>{sv}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 pt-5 border-t border-[var(--color-border)]">
                <p className="text-xs text-[var(--color-granit)] mb-3">{isFr ? "Réglementations maîtrisées" : "Regulations mastered"}</p>
                <div className="flex flex-wrap gap-1.5">
                  {s.regs.split(" · ").map((r) => (
                    <span key={r} className="text-[10px] bg-[var(--color-marine-50)] text-[var(--color-marine-800)] border border-[var(--color-marine-100)] px-2 py-0.5 rounded-full font-medium">
                      {r}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section tone="muted">
        <Container className="max-w-3xl">
          <Eyebrow>{isFr ? "Questions fréquentes" : "FAQ"}</Eyebrow>
          <h2 className="mb-8">
            {isFr
              ? `BPO ${name} — vos questions`
              : `BPO ${s.nameEn} — your questions`}
          </h2>
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

      {/* Other sectors */}
      <Section tone="default">
        <Container>
          <Eyebrow>{isFr ? "Autres secteurs" : "Other industries"}</Eyebrow>
          <h2 className="mb-8">{isFr ? "Nous opérons dans tous les secteurs" : "We operate across all sectors"}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {industrySectors.filter((sec) => sec.slug !== sector).map((sec) => (
              <Link
                key={sec.slug}
                href={`/industries/${sec.slug}` as any}
                className="card-base p-4 flex flex-col items-center text-center gap-2 hover:border-[var(--color-marine-200)] transition-colors group"
              >
                <span className="text-2xl">{sec.icon}</span>
                <span className="text-sm font-medium text-[var(--color-marine-800)] group-hover:underline">
                  {isFr ? sec.name : sec.nameEn}
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

function nameEn(s: { nameEn: string }, _isFr: boolean) {
  return s.nameEn.toLowerCase();
}
