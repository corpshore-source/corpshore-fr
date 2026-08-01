import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import { Container, Section, Eyebrow } from "@/components/ui/container";
import { PageHero } from "@/components/layout/page-hero";
import { SITE } from "@/lib/site";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Contact.meta" });
  return { title: t("title"), description: t("description") };
}

function ContactContent() {
  const t = useTranslations("Contact");

  const contactItems = [
    {
      icon: "📧",
      label: t("info.emailLabel"),
      value: SITE.email,
      href: `mailto:${SITE.email}`,
      sub: t("info.replyTime"),
    },
    {
      icon: "🌐",
      label: t("info.siteLabel"),
      value: "corpshore.solutions/france/",
      href: SITE.globalUrl,
      sub: null,
    },
    {
      icon: "🏢",
      label: t("info.hqLabel"),
      value: SITE.hq,
      href: null,
      sub: null,
    },
    {
      icon: "🏆",
      label: t("info.rankingLabel"),
      value: "#1 BPO en France — Outsource Accelerator 2026",
      href: SITE.oaUrl,
      sub: null,
    },
  ] as const;

  const serviceOptions = [
    t("services.bpo"),
    t("services.it"),
    t("services.ai"),
    t("services.hr"),
    t("services.finance"),
    t("services.cx"),
    t("services.other"),
  ];

  return (
    <>
      <PageHero
        label={t("hero.label")}
        heading={t("hero.h1")}
        sub={t("hero.sub")}
      />

      <Section tone="default">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">

            {/* Form */}
            <div>
              <Eyebrow>{t("hero.label")}</Eyebrow>
              <h2 className="mb-6">{t("form.submit").replace("Envoyer ma", "Votre").replace("Send request", "Your request")}</h2>
              <p className="text-sm text-[var(--color-granit)] mb-6">* {t("form.required")}</p>
              <div className="card-base p-8">
                <form action="#" method="post">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium mb-1.5">{t("form.nom")} *</label>
                      <input type="text" name="nom" required className="w-full h-10 px-3 text-sm border border-[var(--color-border)] rounded-[var(--radius)] focus:outline-none focus:ring-2 focus:ring-[var(--color-marine-800)]" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1.5">{t("form.prenom")} *</label>
                      <input type="text" name="prenom" required className="w-full h-10 px-3 text-sm border border-[var(--color-border)] rounded-[var(--radius)] focus:outline-none focus:ring-2 focus:ring-[var(--color-marine-800)]" />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1.5">{t("form.societe")}</label>
                    <input type="text" name="societe" className="w-full h-10 px-3 text-sm border border-[var(--color-border)] rounded-[var(--radius)] focus:outline-none focus:ring-2 focus:ring-[var(--color-marine-800)]" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium mb-1.5">{t("form.email")} *</label>
                      <input type="email" name="email" required className="w-full h-10 px-3 text-sm border border-[var(--color-border)] rounded-[var(--radius)] focus:outline-none focus:ring-2 focus:ring-[var(--color-marine-800)]" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1.5">{t("form.tel")}</label>
                      <input type="tel" name="tel" className="w-full h-10 px-3 text-sm border border-[var(--color-border)] rounded-[var(--radius)] focus:outline-none focus:ring-2 focus:ring-[var(--color-marine-800)]" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium mb-1.5">{t("form.pays")} *</label>
                      <select name="pays" required className="w-full h-10 px-3 text-sm border border-[var(--color-border)] rounded-[var(--radius)] bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-marine-800)]">
                        <option value="">—</option>
                        <option>France</option><option>Belgique</option><option>Suisse</option>
                        <option>Luxembourg</option><option>Monaco</option>
                        <option>Autre UE</option><option>Autre</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1.5">{t("form.service")} *</label>
                      <select name="service" required className="w-full h-10 px-3 text-sm border border-[var(--color-border)] rounded-[var(--radius)] bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-marine-800)]">
                        <option value="">—</option>
                        {serviceOptions.map((s) => <option key={s}>{s}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1.5">{t("form.message")} *</label>
                    <textarea name="message" required rows={5} className="w-full px-3 py-2 text-sm border border-[var(--color-border)] rounded-[var(--radius)] focus:outline-none focus:ring-2 focus:ring-[var(--color-marine-800)] resize-y" />
                  </div>
                  <div className="mb-6 flex gap-2.5 items-start">
                    <input type="checkbox" id="rgpd-contact" name="rgpd" required className="mt-0.5 h-4 w-4 accent-[var(--color-marine-800)]" />
                    <label htmlFor="rgpd-contact" className="text-xs text-[var(--color-granit)] leading-relaxed">
                      {t("form.rgpd")} *{" "}
                      <a href="/mentions-legales#rgpd" className="underline text-[var(--color-marine-800)]">RGPD</a>
                    </label>
                  </div>
                  <button type="submit" className="w-full h-11 bg-[var(--color-marine-800)] text-white text-sm font-semibold rounded-[var(--radius)] hover:bg-[var(--color-marine-700)] transition-colors cursor-pointer">
                    {t("form.submit")}
                  </button>
                </form>
              </div>
            </div>

            {/* Contact info */}
            <div>
              <Eyebrow>Informations</Eyebrow>
              <h2 className="mb-8">Nos coordonnées</h2>
              <div className="space-y-5">
                {contactItems.map(({ icon, label, value, href, sub }) => (
                  <div key={label} className="flex gap-4 items-start">
                    <div className="w-11 h-11 rounded-full bg-[var(--color-calcaire)] border border-[var(--color-border)] flex items-center justify-center text-xl shrink-0">
                      {icon}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[var(--color-marine-800)] uppercase tracking-wide mb-1">{label}</p>
                      {href ? (
                        <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                           className="text-sm font-medium text-[var(--color-marine-800)] hover:underline">
                          {value}
                        </a>
                      ) : (
                        <p className="text-sm font-medium text-[var(--color-encre)]">{value}</p>
                      )}
                      {sub && <p className="text-xs text-[var(--color-granit)] mt-0.5">{sub}</p>}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 p-6 bg-[var(--color-marine-50)] border border-[var(--color-marine-100)] rounded-[var(--radius-lg)]">
                <p className="text-sm font-semibold text-[var(--color-marine-800)] mb-2">
                  🎯 Recrutement
                </p>
                <p className="text-sm text-[var(--color-granit)]">
                  Pour les candidatures, rendez-vous sur notre page{" "}
                  <a href="/fr/carrieres" className="font-semibold text-[var(--color-marine-800)] underline">Carrières</a>{" "}
                  ou écrivez à{" "}
                  <a href="mailto:recrutement@corpshore.fr" className="font-semibold text-[var(--color-marine-800)] underline">
                    recrutement@corpshore.fr
                  </a>
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ContactContent />;
}
