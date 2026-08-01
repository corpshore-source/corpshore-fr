"use client";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { locales, localeMeta } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export function LocaleSwitcher({ className }: { className?: string }) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const other = locales.find((l) => l !== locale)!;
  const meta = localeMeta[other];

  function switchLocale() {
    router.push(pathname, { locale: other });
  }

  return (
    <button
      onClick={switchLocale}
      className={cn(
        "text-sm font-medium px-3 py-1.5 rounded-[var(--radius-sm)] border border-[var(--color-border)] hover:border-[var(--color-marine-800)] hover:text-[var(--color-marine-800)] transition-colors",
        className
      )}
      aria-label={`Switch to ${meta.label}`}
    >
      {other === "en" ? "🇬🇧" : "🇫🇷"} {meta.endonym}
    </button>
  );
}
