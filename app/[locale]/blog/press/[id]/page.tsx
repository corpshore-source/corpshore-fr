import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";
import { pressReleases } from "@/lib/data/press";
import { SITE } from "@/lib/site";
import type { AppLocale } from "@/i18n/routing";

export function generateStaticParams() {
  const params: { locale: string; id: string }[] = [];
  for (const locale of ["fr", "en"]) {
    for (const pr of pressReleases) {
      params.push({ locale, id: pr.id.toLowerCase() });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}): Promise<Metadata> {
  const { locale, id } = await params;
  const pr = pressReleases.find((p) => p.id.toLowerCase() === id);
  if (!pr) return {};
  const isFr = locale === "fr";
  const title = isFr ? pr.title : pr.titleEn;
  const description = isFr ? pr.lead : pr.leadEn;
  return {
    title,
    description,
    openGraph: { title, description, type: "article", publishedTime: pr.date },
    alternates: {
      canonical: `${SITE.url}/${locale}/blog/press/${id}`,
      languages: {
        fr: `${SITE.url}/fr/blog/press/${id}`,
        en: `${SITE.url}/en/blog/press/${id}`,
      },
    },
  };
}

const CATEGORY_COLORS: Record<string, string> = {
  Classement: "bg-yellow-50 text-yellow-800 border-yellow-200",
  Expansion: "bg-green-50 text-green-800 border-green-200",
  Produit: "bg-blue-50 text-blue-800 border-blue-200",
  Partenariat: "bg-purple-50 text-purple-800 border-purple-200",
  Certification: "bg-indigo-50 text-indigo-800 border-indigo-200",
  Recrutement: "bg-orange-50 text-orange-800 border-orange-200",
  RSE: "bg-teal-50 text-teal-800 border-teal-200",
};

export default async function PressReleasePage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale as AppLocale);

  const pr = pressReleases.find((p) => p.id.toLowerCase() === id);
  if (!pr) notFound();

  const isFr = locale === "fr";
  const title = isFr ? pr.title : pr.titleEn;
  const lead = isFr ? pr.lead : pr.leadEn;
  const body = isFr ? pr.body : pr.bodyEn;

  const formattedDate = new Date(pr.date).toLocaleDateString(
    isFr ? "fr-FR" : "en-GB",
    { day: "numeric", month: "long", year: "numeric" }
  );

  const pressJsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: title,
    description: lead,
    datePublished: pr.date,
    publisher: { "@type": "Organization", name: "Corpshore France", url: SITE.url },
    url: `${SITE.url}/${locale}/blog/press/${id}`,
  };

  const badgeClass = CATEGORY_COLORS[pr.category] ?? "bg-gray-50 text-gray-700 border-gray-200";

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pressJsonLd) }}
      />

      {/* Header band */}
      <div className="bg-[var(--color-marine-800)] py-14 text-white">
        <Container>
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className={`text-xs font-semibold border px-3 py-1 rounded-full ${badgeClass}`}>
                {pr.category}
              </span>
              <span className="text-white/50 text-sm">{isFr ? "Communiqué de presse" : "Press release"}</span>
              <time className="text-white/50 text-sm">{formattedDate}</time>
            </div>
            <h1 className="text-[clamp(1.4rem,3.5vw,2.2rem)] font-bold leading-tight">{title}</h1>
          </div>
        </Container>
      </div>

      <Container className="py-10 md:py-14">
        <div className="max-w-3xl mx-auto">
          {/* Lead */}
          <p className="text-lg text-[var(--color-marine-800)] font-medium leading-relaxed mb-8 pb-8 border-b border-[var(--color-border)]">
            {lead}
          </p>

          {/* Body paragraphs */}
          <div className="space-y-5">
            {body.map((para, i) => (
              <p key={i} className="text-base text-[var(--color-encre)] leading-relaxed">
                {para}
              </p>
            ))}
          </div>

          <hr className="my-10 border-[var(--color-border)]" />

          {/* Footer */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <Link
              href="/blog"
              className="text-sm font-semibold text-[var(--color-marine-800)] hover:underline"
            >
              ← {isFr ? "Retour aux actualités" : "Back to news"}
            </Link>
            <div className="flex gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-[var(--color-marine-800)] text-white text-sm font-semibold px-5 py-2.5 rounded-[var(--radius)] hover:bg-[var(--color-marine-700)] transition-colors"
              >
                {isFr ? "Nous contacter" : "Contact us"} →
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
