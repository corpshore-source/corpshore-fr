"use client";
import { useState, useMemo } from "react";
import Image from "next/image";
import type { BlogPost } from "@/lib/data/blog";

interface BlogGridProps {
  posts: BlogPost[];
  locale: string;
  readTimeLabel: string;
  readMoreLabel: string;
}

export function BlogGrid({ posts, locale, readTimeLabel, readMoreLabel }: BlogGridProps) {
  const isFr = locale === "fr";
  const [active, setActive] = useState<string | null>(null);

  const categories = useMemo(() => {
    const cats = posts.map(p => (isFr ? p.category : p.categoryEn));
    return Array.from(new Set(cats));
  }, [posts, isFr]);

  const filtered = useMemo(
    () => (active ? posts.filter(p => (isFr ? p.category : p.categoryEn) === active) : posts),
    [posts, isFr, active],
  );

  return (
    <>
      <div className="flex flex-wrap gap-2 justify-center mb-10">
        <button
          onClick={() => setActive(null)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
            !active
              ? "bg-[var(--color-marine-800)] text-white"
              : "bg-[var(--color-calcaire)] text-[var(--color-granit)] hover:bg-[var(--color-marine-50)] hover:text-[var(--color-marine-800)]"
          }`}
        >
          {isFr ? "Tous" : "All"}
        </button>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActive(active === cat ? null : cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              active === cat
                ? "bg-[var(--color-marine-800)] text-white"
                : "bg-[var(--color-calcaire)] text-[var(--color-granit)] hover:bg-[var(--color-marine-50)] hover:text-[var(--color-marine-800)]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(post => {
          const imgSrc = `/images/${post.image}`;
          return (
            <article key={post.id} className="card-base flex flex-col overflow-hidden">
              <div className="relative h-44 overflow-hidden bg-[var(--color-calcaire)]">
                <Image src={imgSrc} alt="" fill className="object-cover" />
              </div>
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <span className="sector-badge">{isFr ? post.category : post.categoryEn}</span>
                  <span className="text-xs text-[var(--color-granit)]">
                    {post.readTime} {readTimeLabel}
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
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </time>
                  <span className="text-xs font-semibold text-[var(--color-marine-800)]">
                    {readMoreLabel} →
                  </span>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </>
  );
}
