import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { SITE } from "@/lib/site";

interface TrustItem {
  num: string;
  label: string;
  href?: string;
}

export function TrustBar() {
  const t = useTranslations("Home.trust");

  const items: TrustItem[] = [
    { num: "18+", label: t("countries") },
    { num: "35+", label: t("languages") },
    { num: "10+", label: t("years") },
    { num: "500+", label: t("clients") },
    { num: "🏆 #1", label: t("ranking"), href: SITE.oaUrl },
  ];

  return (
    <div className="bg-[var(--color-calcaire)] border-b border-[var(--color-border)]">
      <Container>
        <ul className="flex flex-wrap justify-center sm:justify-between gap-4 py-5">
          {items.map(({ num, label, href }, i) => (
            <li key={i} className="flex flex-col items-center text-center min-w-[90px]">
              {href ? (
                <a href={href} target="_blank" rel="noopener noreferrer"
                   className="stat-num text-xl font-bold text-[var(--color-or-500)] hover:text-[var(--color-or-600)] transition-colors">
                  {num}
                </a>
              ) : (
                <span className="stat-num text-xl font-bold text-[var(--color-marine-800)]">{num}</span>
              )}
              <span className="text-xs text-[var(--color-granit)] mt-0.5">{label}</span>
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
}
