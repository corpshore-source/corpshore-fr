import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";
import { blogPosts, type ContentBlock } from "@/lib/data/blog";
import { SITE } from "@/lib/site";
import type { AppLocale } from "@/i18n/routing";

export function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of ["fr", "en"]) {
    for (const post of blogPosts) {
      params.push({ locale, slug: post.slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};
  const isFr = locale === "fr";
  const title = isFr ? post.title : post.titleEn;
  const description = isFr ? post.excerpt : post.excerptEn;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: post.date,
      url: `${SITE.url}/${locale}/blog/${slug}`,
    },
    alternates: {
      canonical: `${SITE.url}/${locale}/blog/${slug}`,
      languages: {
        fr: `${SITE.url}/fr/blog/${slug}`,
        en: `${SITE.url}/en/blog/${slug}`,
      },
    },
  };
}

function renderBlock(block: ContentBlock, idx: number) {
  switch (block.type) {
    case "h2":
      return (
        <h2 key={idx} className="text-2xl font-bold text-[var(--color-marine-800)] mt-10 mb-4 leading-snug">
          {block.text}
        </h2>
      );
    case "p":
      return (
        <p key={idx} className="text-base text-[var(--color-encre)] leading-relaxed mb-4">
          {block.text}
        </p>
      );
    case "ul":
      return (
        <ul key={idx} className="my-4 space-y-2 pl-0">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-3 text-base text-[var(--color-encre)] leading-relaxed">
              <span className="mt-1 shrink-0 h-2 w-2 rounded-full bg-[var(--color-marine-800)] mt-2" aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case "quote":
      return (
        <blockquote
          key={idx}
          className="my-8 border-l-4 border-[var(--color-marine-800)] pl-6 py-1 bg-[var(--color-marine-50)] rounded-r-[var(--radius)]"
        >
          <p className="text-[var(--color-marine-800)] italic font-medium leading-relaxed">{block.text}</p>
        </blockquote>
      );
    default:
      return null;
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale as AppLocale);

  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const isFr = locale === "fr";
  const title = isFr ? post.title : post.titleEn;
  const category = isFr ? post.category : post.categoryEn;
  const content = isFr ? post.content : post.contentEn;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: isFr ? post.excerpt : post.excerptEn,
    datePublished: post.date,
    publisher: {
      "@type": "Organization",
      name: "Corpshore France",
      url: SITE.url,
    },
    image: `${SITE.url}/images/${post.image}`,
    url: `${SITE.url}/${locale}/blog/${slug}`,
  };

  const formattedDate = new Date(post.date).toLocaleDateString(
    isFr ? "fr-FR" : "en-GB",
    { day: "numeric", month: "long", year: "numeric" }
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      {/* Hero image */}
      <div className="relative h-64 md:h-80 bg-[var(--color-marine-800)] overflow-hidden">
        <Image
          src={`/images/${post.image}`}
          alt=""
          fill
          className="object-cover opacity-50"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-marine-800)]/80 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 pb-8">
          <Container>
            <div className="flex items-center gap-2 mb-3">
              <span className="sector-badge">{category}</span>
              <span className="text-white/60 text-sm">
                {post.readTime} {isFr ? "min de lecture" : "min read"}
              </span>
            </div>
          </Container>
        </div>
      </div>

      <Container className="py-10 md:py-14">
        <div className="max-w-3xl mx-auto">
          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-[var(--color-granit)] hover:text-[var(--color-marine-800)] transition-colors mb-8"
          >
            ← {isFr ? "Retour au blog" : "Back to blog"}
          </Link>

          {/* Article header */}
          <h1 className="text-[clamp(1.6rem,4vw,2.4rem)] font-bold leading-tight text-[var(--color-marine-800)] mb-4">
            {title}
          </h1>
          <time className="text-sm text-[var(--color-granit)]">{formattedDate}</time>

          <hr className="my-8 border-[var(--color-border)]" />

          {/* Article body */}
          <article className="prose-corpshore">
            {content.map((block, idx) => renderBlock(block, idx))}
          </article>

          <hr className="my-10 border-[var(--color-border)]" />

          {/* Footer nav */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <Link
              href="/blog"
              className="text-sm font-semibold text-[var(--color-marine-800)] hover:underline"
            >
              ← {isFr ? "Tous les articles" : "All articles"}
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[var(--color-marine-800)] text-white text-sm font-semibold px-5 py-2.5 rounded-[var(--radius)] hover:bg-[var(--color-marine-700)] transition-colors"
            >
              {isFr ? "Contacter Corpshore" : "Contact Corpshore"} →
            </Link>
          </div>
        </div>
      </Container>
    </>
  );
}
