import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import { Container, Section, Eyebrow } from "@/components/ui/container";
import { PageHero } from "@/components/layout/page-hero";
import { blogPosts } from "@/lib/data/blog";
import { pressReleases } from "@/lib/data/press";
import { BlogGrid } from "@/components/home/blog-grid";
import type { AppLocale } from "@/i18n/routing";

import { SITE } from "@/lib/site";
import { pageAlternates, KEYWORDS } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Blog.meta" });
  const title = t("title");
  const description = t("description");
  return {
    title,
    description,
    keywords: KEYWORDS.blog[locale as "fr" | "en"],
    alternates: pageAlternates("/blog"),
    openGraph: { title, description, url: `${SITE.url}/${locale}/blog` },
  };
}

function BlogContent({ locale }: { locale: AppLocale }) {
  const t = useTranslations("Blog");
  const isFr = locale === "fr";

  return (
    <>
      <PageHero
        label={t("hero.label")}
        heading={t("hero.h1")}
        sub={t("hero.sub")}
      />

      {/* Blog articles */}
      <Section tone="default">
        <Container>
          <div className="text-center max-w-xl mx-auto mb-12">
            <Eyebrow>Blog</Eyebrow>
            <h2>{isFr ? "15 articles sur l'externalisation en France" : "15 articles on outsourcing in France"}</h2>
          </div>
          <BlogGrid
            posts={blogPosts}
            locale={locale}
            readTimeLabel={t("readTime")}
            readMoreLabel={t("readMore")}
          />
        </Container>
      </Section>

      {/* Press releases */}
      <Section tone="muted">
        <Container>
          <div className="text-center max-w-xl mx-auto mb-12">
            <Eyebrow>{t("press.label")}</Eyebrow>
            <h2>{t("press.h2")}</h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-4">
            {pressReleases.map((pr) => (
              <article
                key={pr.id}
                className="card-base p-6 flex flex-col sm:flex-row gap-5 items-start"
              >
                <div className="shrink-0">
                  <span className="sector-badge">{pr.category}</span>
                  <time className="block text-xs text-[var(--color-granit)] mt-2">
                    {new Date(pr.date).toLocaleDateString(isFr ? "fr-FR" : "en-GB", {
                      day: "numeric", month: "long", year: "numeric",
                    })}
                  </time>
                </div>
                <div className="flex-1">
                  <h3 className="text-base leading-snug mb-2">
                    {isFr ? pr.title : pr.titleEn}
                  </h3>
                  <p className="text-sm text-[var(--color-granit)] leading-relaxed">
                    {isFr ? pr.lead : pr.leadEn}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <BlogContent locale={locale as AppLocale} />;
}
