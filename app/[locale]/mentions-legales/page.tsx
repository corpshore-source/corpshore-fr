import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import { Container, Section } from "@/components/ui/container";
import { PageHero } from "@/components/layout/page-hero";
import { SITE } from "@/lib/site";

import { pageAlternates } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Legal.meta" });
  const title = t("title");
  const description = t("description");
  return {
    title,
    description,
    robots: { index: false, follow: true },
    alternates: pageAlternates("/mentions-legales"),
  };
}

function LegalContent() {
  const t = useTranslations("Legal");

  return (
    <>
      <PageHero label={t("hero.label")} heading={t("hero.h1")}>
        <p className="text-sm text-white/50">{t("updated")} 1 août 2026 — Conformité LCEN & RGPD</p>
      </PageHero>

      <Section tone="default">
        <Container className="max-w-3xl">
          {/* TOC */}
          <nav className="bg-[var(--color-calcaire)] border border-[var(--color-border)] rounded-[var(--radius-lg)] p-6 mb-12">
            <p className="text-sm font-semibold text-[var(--color-marine-800)] mb-3">Sommaire</p>
            <ol className="space-y-1.5 text-sm text-[var(--color-granit)]">
              {["Éditeur du site", "Hébergeur", "Directeur de la publication", "Propriété intellectuelle", "Politique de confidentialité (RGPD)", "Politique de cookies", "Vos droits", "Limitation de responsabilité", "Contact DPO"].map((item, i) => (
                <li key={item}>
                  <a href={`#section-${i + 1}`} className="hover:text-[var(--color-marine-800)] transition-colors">
                    {i + 1}. {item}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="prose max-w-none space-y-12">
            {/* 1. Éditeur */}
            <section id="section-1">
              <h2 className="text-xl font-bold text-[var(--color-marine-800)] mb-4">1. Éditeur du site</h2>
              <p className="text-[var(--color-granit)] mb-4">Le site <strong>corpshore.fr</strong> est édité par :</p>
              <table className="w-full text-sm border-collapse">
                <tbody>
                  {[
                    ["Dénomination sociale", "Corpshore Solutions Corporation"],
                    ["Forme juridique", "Corporation (Ontario, Canada)"],
                    ["Siège social", "Toronto, Ontario, Canada"],
                    ["Email", SITE.email],
                    ["Site web groupe", SITE.globalUrl],
                  ].map(([k, v]) => (
                    <tr key={k} className="border-b border-[var(--color-border)]">
                      <td className="py-2.5 pr-4 font-medium text-[var(--color-encre)] w-2/5">{k}</td>
                      <td className="py-2.5 text-[var(--color-granit)]">{v.startsWith("http") || v.includes("@") ? <a href={v.startsWith("http") ? v : `mailto:${v}`} className="text-[var(--color-marine-800)] hover:underline">{v}</a> : v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>

            {/* 2. Hébergeur */}
            <section id="section-2">
              <h2 className="text-xl font-bold text-[var(--color-marine-800)] mb-4">2. Hébergeur</h2>
              <table className="w-full text-sm border-collapse">
                <tbody>
                  {[
                    ["Raison sociale", "Vercel Inc."],
                    ["Adresse", "340 Pine Street, Suite 701, San Francisco, CA 94104, USA"],
                    ["Site web", "vercel.com"],
                  ].map(([k, v]) => (
                    <tr key={k} className="border-b border-[var(--color-border)]">
                      <td className="py-2.5 pr-4 font-medium text-[var(--color-encre)] w-2/5">{k}</td>
                      <td className="py-2.5 text-[var(--color-granit)]">{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>

            {/* 3. Directeur */}
            <section id="section-3">
              <h2 className="text-xl font-bold text-[var(--color-marine-800)] mb-4">3. Directeur de la publication</h2>
              <p className="text-[var(--color-granit)]">Le directeur de la publication est le représentant légal de Corpshore Solutions Corporation. Contact : <a href={`mailto:${SITE.email}`} className="text-[var(--color-marine-800)] hover:underline">{SITE.email}</a></p>
            </section>

            {/* 4. Propriété intellectuelle */}
            <section id="section-4">
              <h2 className="text-xl font-bold text-[var(--color-marine-800)] mb-4">4. Propriété intellectuelle</h2>
              <p className="text-[var(--color-granit)] leading-relaxed">L'ensemble du contenu de ce site (textes, images, logo, graphiques, icônes, logiciels) est la propriété exclusive de Corpshore Solutions Corporation et est protégé par les lois françaises et internationales relatives à la propriété intellectuelle. Toute reproduction, représentation ou modification sans autorisation expresse est interdite.</p>
            </section>

            {/* 5. RGPD */}
            <section id="section-5">
              <h2 className="text-xl font-bold text-[var(--color-marine-800)] mb-4" id="rgpd">5. Politique de confidentialité (RGPD)</h2>

              <h3 className="font-semibold text-[var(--color-encre)] mt-4 mb-2">5.1 Responsable du traitement</h3>
              <p className="text-[var(--color-granit)] mb-4">Corpshore Solutions Corporation, Toronto, Ontario, Canada. DPO : <a href={`mailto:${SITE.emailDpo}`} className="text-[var(--color-marine-800)] hover:underline">{SITE.emailDpo}</a></p>

              <h3 className="font-semibold text-[var(--color-encre)] mt-4 mb-2">5.2 Données collectées</h3>
              <ul className="list-disc pl-5 text-sm text-[var(--color-granit)] space-y-1">
                {["Nom et prénom", "Email professionnel", "Téléphone (optionnel)", "Société (optionnel)", "Pays de résidence", "Message libre", "CV et lettre de motivation (formulaire candidature)", "Adresse IP et données de navigation (avec consentement)"].map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>

              <h3 className="font-semibold text-[var(--color-encre)] mt-4 mb-2">5.3 Bases légales et durées de conservation</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-[var(--color-marine-800)] text-white">
                      <th className="py-2.5 px-3 text-left font-medium">Finalité</th>
                      <th className="py-2.5 px-3 text-left font-medium">Base légale</th>
                      <th className="py-2.5 px-3 text-left font-medium">Durée</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Répondre à votre demande", "Art. 6.1.b RGPD", "3 ans"],
                      ["Traitement candidatures", "Art. 6.1.b RGPD", "2 ans"],
                      ["Statistiques de visite", "Consentement (art. 6.1.a)", "13 mois"],
                    ].map(([f, b, d]) => (
                      <tr key={f} className="border-b border-[var(--color-border)]">
                        <td className="py-2.5 px-3 text-[var(--color-granit)]">{f}</td>
                        <td className="py-2.5 px-3 text-[var(--color-granit)]">{b}</td>
                        <td className="py-2.5 px-3 text-[var(--color-granit)]">{d}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* 6. Cookies */}
            <section id="section-6">
              <h2 className="text-xl font-bold text-[var(--color-marine-800)] mb-4" id="cookies">6. Politique de cookies</h2>
              <p className="text-[var(--color-granit)] mb-4">Ce site utilise des cookies strictement nécessaires au fonctionnement. Aucun cookie analytique ou publicitaire n'est déposé sans consentement préalable.</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead><tr className="bg-[var(--color-marine-800)] text-white"><th className="py-2 px-3 text-left">Nom</th><th className="py-2 px-3 text-left">Finalité</th><th className="py-2 px-3 text-left">Durée</th></tr></thead>
                  <tbody>
                    {[["cf_lang", "Mémorise la préférence linguistique (fr/en)", "Session"]].map(([n, f, d]) => (
                      <tr key={n} className="border-b border-[var(--color-border)]">
                        <td className="py-2 px-3 font-mono text-xs text-[var(--color-marine-800)]">{n}</td>
                        <td className="py-2 px-3 text-[var(--color-granit)]">{f}</td>
                        <td className="py-2 px-3 text-[var(--color-granit)]">{d}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* 7. Droits */}
            <section id="section-7">
              <h2 className="text-xl font-bold text-[var(--color-marine-800)] mb-4">7. Vos droits</h2>
              <p className="text-[var(--color-granit)] mb-3">Conformément au RGPD et à la loi Informatique et Libertés, vous disposez des droits suivants :</p>
              <ul className="space-y-2 text-sm text-[var(--color-granit)]">
                {["Droit d'accès (art. 15)", "Droit de rectification (art. 16)", "Droit à l'effacement (art. 17)", "Droit à la limitation (art. 18)", "Droit à la portabilité (art. 20)", "Droit d'opposition (art. 21)"].map((d) => (
                  <li key={d} className="flex items-start gap-2"><span className="text-[var(--color-marine-800)] mt-0.5">▸</span>{d}</li>
                ))}
              </ul>
              <p className="text-sm text-[var(--color-granit)] mt-4">
                Vous pouvez également introduire une réclamation auprès de la <strong>CNIL</strong> :{" "}
                <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-[var(--color-marine-800)] hover:underline">www.cnil.fr</a>
              </p>
            </section>

            {/* 8. Responsabilité */}
            <section id="section-8">
              <h2 className="text-xl font-bold text-[var(--color-marine-800)] mb-4">8. Limitation de responsabilité</h2>
              <p className="text-[var(--color-granit)] leading-relaxed">Corpshore Solutions Corporation s'efforce d'assurer l'exactitude des informations diffusées sur ce site mais ne peut en garantir l'exhaustivité. Corpshore ne peut être tenu responsable des dommages directs ou indirects résultant de l'utilisation de ce site.</p>
            </section>

            {/* 9. DPO */}
            <section id="section-9">
              <h2 className="text-xl font-bold text-[var(--color-marine-800)] mb-4">9. Contact DPO</h2>
              <div className="bg-[var(--color-marine-50)] border border-[var(--color-marine-100)] rounded-[var(--radius-lg)] p-6">
                <p className="text-sm text-[var(--color-granit)]">
                  <strong className="text-[var(--color-marine-800)]">Délégué à la Protection des Données (DPO)</strong><br />
                  Email : <a href={`mailto:${SITE.emailDpo}`} className="text-[var(--color-marine-800)] hover:underline">{SITE.emailDpo}</a><br />
                  Délai de réponse : 30 jours maximum (délai légal RGPD)
                </p>
              </div>
            </section>

            <p className="text-xs text-[var(--color-granit)] border-t border-[var(--color-border)] pt-6">
              Ces mentions légales sont régies par le droit français. Dernière mise à jour : 1er août 2026.
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}

export default async function LegalPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <LegalContent />;
}
