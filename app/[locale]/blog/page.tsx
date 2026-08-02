import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Container, Section, Eyebrow } from "@/components/ui/container";
import { PageHero } from "@/components/layout/page-hero";
import { blogPosts } from "@/lib/data/blog";
import { pressReleases } from "@/lib/data/press";
import type { AppLocale } from "@/i18n/routing";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Blog.meta" });
  return { title: t("title"), description: t("description") };
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post, idx) => {
              const imgs = ["hero-paris-operations","paris-la-defense-business","equipe-teletravail-francophonie","ai-annotation-equipe","secteur-public-digitalisation","agent-support-francophone","histoire-lumieres-tech","corpshore-global-map","recrutement-teletravail-france","badge-oa-france-2026"];
              const imgSrc = `/images/${imgs[idx % imgs.length]}.webp`;
              return (
              <article key={post.id} className="card-base flex flex-col overflow-hidden">
                <div className="relative h-44 overflow-hidden bg-[var(--color-calcaire)]">
                  <Image src={imgSrc} alt="" fill className="object-cover" />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="sector-badge">{isFr ? post.category : post.categoryEn}</span>
                    <span className="text-xs text-[var(--color-granit)]">
                      {post.readTime} {t("readTime")}
                    </span>
                  </div>
                  <h3 className="text-base leading-snug mb-3 flex-1">
                    {isFr ? post.title : post.titleEn}
                  </h3>
                  <p className="text-sm text-[var(--color-granit)] leading-relaxed mb-4 line-clamp-3">
                    {isFr ? post.excerpt : post.excerptEn}
                  </p>
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-[var(--color-border)]">
                    <time className="text-xs text-[var(--color-granit)]">
                      {new Date(post.date).toLocaleDateString(isFr ? "fr-FR" : "en-GB", {
                        day: "numeric", month: "long", year: "numeric",
                      })}
                    </time>
                    <span className="text-xs font-semibold text-[var(--color-marine-800)]">
                      {t("readMore")} →
                    </span>
                  </div>
                </div>
              </article>
              );
            })}
          </div>
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
