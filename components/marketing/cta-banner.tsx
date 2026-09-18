"use client";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { CalendlyButton } from "@/components/ui/calendly-button";
import { cn } from "@/lib/utils";

export function CtaBanner() {
  const t = useTranslations("Home.cta");
  const locale = useLocale();
  const isFr = locale === "fr";

  return (
    <section className="relative bg-[var(--color-marine-800)] py-20 text-white overflow-hidden">
      {/* Subtle radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_120%,rgba(196,147,26,0.18),transparent)] pointer-events-none" aria-hidden="true" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_-10%,rgba(14,48,128,0.5),transparent)] pointer-events-none" aria-hidden="true" />
      <Container className="relative z-10 text-center">
        <h2 className="relative max-w-2xl mx-auto">{t("h2")}</h2>
        <p className="mt-4 text-white/70 text-lg max-w-xl mx-auto">{t("sub")}</p>
        <div className="mt-10 flex flex-wrap gap-4 justify-center">
          <Link href="/devis" className={buttonVariants({ variant: "accent", size: "lg" })}>
            {t("btn1")}
          </Link>
          <CalendlyButton
            label={isFr ? "Réserver un appel découverte" : "Book a discovery call"}
            variant="onDark"
            size="lg"
          />
          <Link href="/etudes-de-cas" className={cn(buttonVariants({ variant: "onDark", size: "lg" }), "hidden sm:inline-flex")}>
            {t("btn2")}
          </Link>
        </div>
      </Container>
    </section>
  );
}
