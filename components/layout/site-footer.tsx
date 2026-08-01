import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";
import { SITE } from "@/lib/site";

export function SiteFooter() {
  const t = useTranslations("Footer");
  const nav = useTranslations("Nav");

  return (
    <footer className="bg-[var(--color-encre)] text-white">
      {/* Tricolore strip */}
      <div className="tricolore-strip" />

      <Container className="py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 bg-white/10 rounded-[var(--radius-sm)] flex items-center justify-center border border-white/20">
                <svg viewBox="0 0 24 24" className="w-5 h-5">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                    stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </svg>
              </div>
              <span className="font-bold text-sm">Corpshore France</span>
            </Link>
            <p className="text-sm text-white/65 leading-relaxed mb-4">{t("tagline")}</p>
            <p className="text-xs text-white/50 mb-1">
              <a href={`mailto:${SITE.email}`} className="hover:text-white/80 transition-colors">
                📧 {SITE.email}
              </a>
            </p>
            <a
              href={SITE.oaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 mt-4 text-xs bg-[var(--color-or-500)]/20 border border-[var(--color-or-500)]/30 text-[var(--color-or-400)] px-3 py-1.5 rounded-[var(--radius-full)] hover:bg-[var(--color-or-500)]/30 transition-colors"
            >
              🏆 {SITE.rankings.france}
            </a>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">{t("services")}</h3>
            <ul className="space-y-2.5 text-sm text-white/60">
              {["bpo", "it", "ai", "finance"].map((k) => (
                <li key={k}>
                  <Link href="/services" className="hover:text-white transition-colors">
                    {t(`links.${k}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">{t("company")}</h3>
            <ul className="space-y-2.5 text-sm text-white/60">
              <li><Link href="/a-propos" className="hover:text-white transition-colors">{t("links.about")}</Link></li>
              <li><Link href="/etudes-de-cas" className="hover:text-white transition-colors">{t("links.cases")}</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">{t("links.blog")}</Link></li>
              <li><Link href="/carrieres" className="hover:text-white transition-colors">{t("links.careers")}</Link></li>
              <li>
                <a href={SITE.globalUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  {t("links.global")} ↗
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">{t("legal")}</h3>
            <ul className="space-y-2.5 text-sm text-white/60">
              <li><Link href="/mentions-legales" className="hover:text-white transition-colors">{t("links.legal")}</Link></li>
              <li><Link href={{ pathname: "/mentions-legales", hash: "rgpd" }} className="hover:text-white transition-colors">{t("links.rgpd")}</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">{nav("contact")}</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-white/40">
          <span>{t("copyright")}</span>
          <div className="flex gap-6">
            <Link href="/mentions-legales" className="hover:text-white/70 transition-colors">{t("links.legal")}</Link>
            <a href={SITE.oaUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white/70 transition-colors">
              OA #1 France
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
