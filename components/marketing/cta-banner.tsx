import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function CtaBanner() {
  const t = useTranslations("Home.cta");
  return (
    <section className="bg-[var(--color-marine-800)] py-20 text-white">
      <Container className="text-center">
        <h2 className="max-w-2xl mx-auto">{t("h2")}</h2>
        <p className="mt-4 text-white/70 text-lg max-w-xl mx-auto">{t("sub")}</p>
        <div className="mt-10 flex flex-wrap gap-4 justify-center">
          <Link href="/contact" className={buttonVariants({ variant: "accent", size: "lg" })}>
            {t("btn1")}
          </Link>
          <Link href="/etudes-de-cas" className={buttonVariants({ variant: "onDark", size: "lg" })}>
            {t("btn2")}
          </Link>
        </div>
      </Container>
    </section>
  );
}
