"use client";
import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";

export function FloatCta() {
  const [visible, setVisible] = useState(false);
  const locale = useLocale();

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const label = locale === "fr" ? "Demande de devis" : "Request a quote";

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
        visible
          ? "translate-y-0 opacity-100 pointer-events-auto"
          : "translate-y-6 opacity-0 pointer-events-none"
      }`}
    >
      <Link
        href="/contact"
        className="flex items-center gap-2 bg-[var(--color-vermeil-500)] hover:bg-[var(--color-vermeil-600)] text-white px-5 py-3 rounded-full shadow-xl font-semibold text-sm transition-colors"
      >
        📋 {label}
      </Link>
    </div>
  );
}
