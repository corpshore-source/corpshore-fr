"use client";
import type { Metadata } from "next";
import { useState, useRef } from "react";
import Script from "next/script";
import { useLocale } from "next-intl";
import { Container, Section, Eyebrow } from "@/components/ui/container";
import { PageHero } from "@/components/layout/page-hero";
import { SITE } from "@/lib/site";
import { CalendlyButton } from "@/components/ui/calendly-button";
import { getToolInsights, clearToolInsights } from "@/lib/tool-tracker";

const TURNSTILE_SITE_KEY = "0x4AAAAAAEFhVlYr9OXOOWyC";

const ACCEPTED_TYPES = ".png,.jpg,.jpeg,.pdf,.doc,.docx,.ppt,.pptx,.csv,.xls,.xlsx";

export default function DevisPage() {
  const locale = useLocale();
  const isFr = locale === "fr";
  const formRef = useRef<HTMLFormElement>(null);

  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [fileNames, setFileNames] = useState<string[]>([]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const formData = new FormData(form);

    const toolInsights = getToolInsights();
    if (toolInsights) formData.append("tool_insights", toolInsights);

    try {
      const res = await fetch("/api/devis", { method: "POST", body: formData });
      if (res.ok) {
        clearToolInsights();
        setStatus("sent");
        form.reset();
        setFileNames([]);
        if (typeof window !== "undefined" && (window as any).turnstile) {
          (window as any).turnstile.reset();
        }
      } else {
        const body = await res.json().catch(() => ({}));
        setErrorMsg(body.error ?? (isFr ? "Une erreur est survenue." : "An error occurred."));
        setStatus("error");
        if (typeof window !== "undefined" && (window as any).turnstile) {
          (window as any).turnstile.reset();
        }
      }
    } catch {
      setErrorMsg(isFr ? "Impossible d'envoyer la demande." : "Could not send the request.");
      setStatus("error");
    }
  }

  const inp = "w-full h-10 px-3 text-sm border border-[var(--color-border)] rounded-[var(--radius)] focus:outline-none focus:ring-2 focus:ring-[var(--color-marine-800)] bg-white";
  const sel = `${inp} bg-white`;
  const lbl = "block text-sm font-medium mb-1.5 text-[var(--color-encre)]";

  const serviceOptions = isFr
    ? ["BPO / Externalisation de processus", "IT Outsourcing / Infogérance", "IA Générative / Automatisation", "Ressources Humaines externalisées", "Finance & Comptabilité", "Service Client multicanal", "Autre / Plusieurs services"]
    : ["BPO / Business Process Outsourcing", "IT Outsourcing / Managed IT", "Generative AI / Automation", "HR Outsourcing", "Finance & Accounting", "Multichannel Customer Service", "Other / Multiple services"];

  const effectifOptions = isFr
    ? ["1–4 FTE (équipe pilote)", "5–10 FTE", "11–25 FTE", "26–50 FTE", "51–100 FTE", "100+ FTE"]
    : ["1–4 FTE (pilot team)", "5–10 FTE", "11–25 FTE", "26–50 FTE", "51–100 FTE", "100+ FTE"];

  const effectifCounts = ["2", "7", "18", "38", "75", "100"];

  const delaiOptions = isFr
    ? ["Dès que possible (ASAP)", "Dans 1 à 3 mois", "Dans 3 à 6 mois", "Dans 6 à 12 mois", "Pas encore décidé"]
    : ["As soon as possible (ASAP)", "In 1–3 months", "In 3–6 months", "In 6–12 months", "Not yet decided"];

  const budgetOptions = isFr
    ? ["Moins de 5 000 €/mois", "5 000 – 20 000 €/mois", "20 000 – 50 000 €/mois", "50 000 – 100 000 €/mois", "Plus de 100 000 €/mois", "Budget non défini"]
    : ["Less than €5,000/month", "€5,000 – €20,000/month", "€20,000 – €50,000/month", "€50,000 – €100,000/month", "More than €100,000/month", "Budget not yet defined"];

  const paysOptions = [
    "France", "Belgique", "Suisse", "Luxembourg", "Monaco",
    isFr ? "Autre pays UE" : "Other EU country",
    isFr ? "Autre" : "Other",
  ];

  return (
    <>
      <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="lazyOnload" />

      <PageHero
        label={isFr ? "Demande de proposition" : "Request a proposal"}
        heading={isFr ? "Obtenez un devis personnalisé." : "Get a custom quote."}
        sub={isFr
          ? "Remplissez le formulaire et un consultant Corpshore vous répond sous 24 heures avec une proposition chiffrée."
          : "Fill in the form and a Corpshore consultant will reply within 24 hours with a detailed proposal."}
      >
        <div className="flex flex-wrap gap-3 mt-2">
          {[
            isFr ? "⚡ Réponse sous 24h" : "⚡ Reply within 24h",
            isFr ? "📋 Devis sans engagement" : "📋 No-obligation quote",
            isFr ? "🔒 Données sécurisées RGPD" : "🔒 GDPR-secure data",
          ].map((b) => (
            <span key={b} className="text-xs text-white/70 bg-white/10 border border-white/15 px-3 py-1 rounded-full">
              {b}
            </span>
          ))}
        </div>
      </PageHero>

      <Section tone="default">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">

            {/* Form — spans 2 columns */}
            <div className="lg:col-span-2">
              {status === "sent" ? (
                <div className="card-base p-12 text-center">
                  <div className="text-5xl mb-5">🎉</div>
                  <h2 className="mb-4">
                    {isFr ? "Demande reçue !" : "Request received!"}
                  </h2>
                  <p className="text-[var(--color-granit)] mb-8 max-w-md mx-auto">
                    {isFr
                      ? "Merci. Un consultant Corpshore analyse votre projet et vous contacte sous 24 heures ouvrables avec une proposition personnalisée."
                      : "Thank you. A Corpshore consultant is reviewing your project and will contact you within 24 business hours with a personalised proposal."}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                      onClick={() => setStatus("idle")}
                      className="px-6 py-3 border border-[var(--color-border)] rounded-full text-sm font-medium text-[var(--color-granit)] hover:border-[var(--color-marine-800)] transition-colors cursor-pointer"
                    >
                      {isFr ? "Soumettre une autre demande" : "Submit another request"}
                    </button>
                    <CalendlyButton
                      label={isFr ? "Réserver un appel maintenant" : "Book a call now"}
                      variant="accent"
                      size="lg"
                      icon={true}
                    />
                  </div>
                </div>
              ) : (
                <div className="card-base p-8">
                  <h2 className="mb-2">
                    {isFr ? "Votre projet d'externalisation" : "Your outsourcing project"}
                  </h2>
                  <p className="text-sm text-[var(--color-granit)] mb-8">
                    * {isFr ? "Champs obligatoires" : "Required fields"}
                  </p>

                  <form ref={formRef} onSubmit={handleSubmit}>
                    {/* Section 1: Contact */}
                    <div className="mb-8">
                      <h3 className="text-sm font-bold uppercase tracking-widest text-[var(--color-marine-800)] mb-5 pb-2 border-b border-[var(--color-border)]">
                        {isFr ? "1. Vos coordonnées" : "1. Contact details"}
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className={lbl}>{isFr ? "Prénom" : "First name"} *</label>
                          <input type="text" name="prenom" required className={inp} />
                        </div>
                        <div>
                          <label className={lbl}>{isFr ? "Nom" : "Last name"} *</label>
                          <input type="text" name="nom" required className={inp} />
                        </div>
                        <div>
                          <label className={lbl}>{isFr ? "Email professionnel" : "Business email"} *</label>
                          <input type="email" name="email" required className={inp} />
                        </div>
                        <div>
                          <label className={lbl}>{isFr ? "Téléphone" : "Phone"}</label>
                          <input type="tel" name="tel" className={inp} />
                        </div>
                        <div>
                          <label className={lbl}>{isFr ? "Société" : "Company"} *</label>
                          <input type="text" name="societe" required className={inp} />
                        </div>
                        <div>
                          <label className={lbl}>{isFr ? "Site web" : "Website"}</label>
                          <input type="url" name="site_web" placeholder="https://" className={inp} />
                        </div>
                        <div className="sm:col-span-2">
                          <label className={lbl}>{isFr ? "Pays" : "Country"} *</label>
                          <select name="pays" required className={sel}>
                            <option value="">—</option>
                            {paysOptions.map((p) => <option key={p}>{p}</option>)}
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Section 2: Project */}
                    <div className="mb-8">
                      <h3 className="text-sm font-bold uppercase tracking-widest text-[var(--color-marine-800)] mb-5 pb-2 border-b border-[var(--color-border)]">
                        {isFr ? "2. Votre projet" : "2. Your project"}
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="sm:col-span-2">
                          <label className={lbl}>{isFr ? "Service recherché" : "Service needed"} *</label>
                          <select name="service" required className={sel}>
                            <option value="">—</option>
                            {serviceOptions.map((s) => <option key={s}>{s}</option>)}
                          </select>
                        </div>
                        <div>
                          <label className={lbl}>{isFr ? "Effectif souhaité" : "Team size needed"} *</label>
                          <select
                            name="effectif"
                            required
                            className={sel}
                            onChange={(e) => {
                              const idx = effectifOptions.indexOf(e.target.value);
                              const hiddenField = formRef.current?.querySelector<HTMLInputElement>('[name="effectif_count"]');
                              if (hiddenField && idx >= 0) hiddenField.value = effectifCounts[idx];
                            }}
                          >
                            <option value="">—</option>
                            {effectifOptions.map((o) => <option key={o}>{o}</option>)}
                          </select>
                          <input type="hidden" name="effectif_count" defaultValue="" />
                        </div>
                        <div>
                          <label className={lbl}>{isFr ? "Délai de démarrage souhaité" : "Desired start timeline"} *</label>
                          <select name="delai" required className={sel}>
                            <option value="">—</option>
                            {delaiOptions.map((d) => <option key={d}>{d}</option>)}
                          </select>
                        </div>
                        <div className="sm:col-span-2">
                          <label className={lbl}>{isFr ? "Budget mensuel estimé" : "Estimated monthly budget"}</label>
                          <select name="budget" className={sel}>
                            <option value="">{isFr ? "Non précisé" : "Not specified"}</option>
                            {budgetOptions.map((b) => <option key={b}>{b}</option>)}
                          </select>
                        </div>
                        <div className="sm:col-span-2">
                          <label className={lbl}>{isFr ? "Description du projet" : "Project description"} *</label>
                          <textarea
                            name="description"
                            required
                            rows={6}
                            placeholder={
                              isFr
                                ? "Décrivez votre besoin : processus à externaliser, volumes traités, langues requises, systèmes IT existants, contraintes réglementaires, objectifs de qualité…"
                                : "Describe your need: processes to outsource, volumes, languages required, existing IT systems, regulatory constraints, quality objectives…"
                            }
                            className="w-full px-3 py-2.5 text-sm border border-[var(--color-border)] rounded-[var(--radius)] focus:outline-none focus:ring-2 focus:ring-[var(--color-marine-800)] resize-y"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Section 3: Attachments */}
                    <div className="mb-8">
                      <h3 className="text-sm font-bold uppercase tracking-widest text-[var(--color-marine-800)] mb-5 pb-2 border-b border-[var(--color-border)]">
                        {isFr ? "3. Pièces jointes (optionnel)" : "3. Attachments (optional)"}
                      </h3>
                      <p className="text-xs text-[var(--color-granit)] mb-3">
                        {isFr
                          ? "Vous pouvez joindre jusqu'à 5 fichiers (max. 10 Mo chacun) : cahier des charges, appel d'offres, présentation, données de volume, organigramme…"
                          : "You may attach up to 5 files (max. 10 MB each): RFP, scope document, presentation, volume data, org chart…"}
                      </p>
                      <div className="border-2 border-dashed border-[var(--color-border)] rounded-[var(--radius-lg)] p-6 text-center hover:border-[var(--color-marine-800)] transition-colors">
                        <input
                          type="file"
                          name="files"
                          multiple
                          accept={ACCEPTED_TYPES}
                          className="absolute opacity-0 w-0 h-0"
                          id="devis-files"
                          onChange={(e) => {
                            const fs = Array.from(e.target.files ?? []).slice(0, 5);
                            setFileNames(fs.map((f) => f.name));
                          }}
                        />
                        <label htmlFor="devis-files" className="cursor-pointer block">
                          <div className="text-3xl mb-2">📎</div>
                          <p className="text-sm font-medium text-[var(--color-marine-800)]">
                            {isFr ? "Cliquez pour ajouter des fichiers" : "Click to add files"}
                          </p>
                          <p className="text-xs text-[var(--color-granit)] mt-1">
                            PDF, Word, Excel, PowerPoint, CSV, PNG, JPEG — max 5 fichiers × 10 Mo
                          </p>
                        </label>
                        {fileNames.length > 0 && (
                          <ul className="mt-4 text-left space-y-1">
                            {fileNames.map((n) => (
                              <li key={n} className="flex items-center gap-2 text-xs text-[var(--color-granit)]">
                                <span className="text-green-600">✓</span> {n}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>

                    {/* RGPD + Turnstile */}
                    <div className="mb-5 flex gap-2.5 items-start">
                      <input type="checkbox" id="devis-rgpd" name="rgpd" required className="mt-0.5 h-4 w-4 accent-[var(--color-marine-800)]" />
                      <label htmlFor="devis-rgpd" className="text-xs text-[var(--color-granit)] leading-relaxed">
                        {isFr
                          ? "J'accepte que Corpshore traite mes données pour répondre à ma demande de devis, conformément à la "
                          : "I agree that Corpshore processes my data to respond to my quote request, in accordance with the "}
                        <a href="/mentions-legales#s2" className="underline text-[var(--color-marine-800)]">
                          {isFr ? "politique RGPD" : "GDPR policy"}
                        </a>. *
                      </label>
                    </div>

                    <div className="cf-turnstile mb-5" data-sitekey={TURNSTILE_SITE_KEY} />

                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="w-full h-12 bg-[var(--color-marine-800)] text-white text-sm font-bold rounded-[var(--radius)] hover:bg-[var(--color-marine-700)] disabled:opacity-60 transition-colors cursor-pointer"
                    >
                      {status === "sending"
                        ? isFr ? "Envoi en cours…" : "Sending…"
                        : isFr ? "Envoyer ma demande de devis →" : "Submit my quote request →"}
                    </button>
                    {status === "error" && (
                      <p className="text-red-600 text-sm mt-3">{errorMsg}</p>
                    )}
                  </form>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="card-base p-6">
                <h3 className="text-base mb-4">{isFr ? "Réservez un appel découverte" : "Book a discovery call"}</h3>
                <p className="text-sm text-[var(--color-granit)] mb-5">
                  {isFr
                    ? "Préférez un échange rapide ? Choisissez un créneau directement dans notre agenda."
                    : "Prefer a quick chat? Pick a slot directly in our calendar."}
                </p>
                <CalendlyButton
                  label={isFr ? "Réserver un créneau →" : "Book a slot →"}
                  variant="accent"
                  size="lg"
                  className="w-full justify-center"
                />
              </div>

              <div className="card-base p-6">
                <h3 className="text-base mb-4">{isFr ? "Pourquoi Corpshore ?" : "Why Corpshore?"}</h3>
                <ul className="space-y-3">
                  {(isFr ? [
                    ["🥇", "#1 BPO en France", "Classé par Outsource Accelerator 2026"],
                    ["⚡", "Démarrage en 2–4 semaines", "Onboarding accéléré, équipes formées"],
                    ["🌍", "18 pays de livraison", "Hubs francophones en Afrique, EU, Amériques"],
                    ["🔒", "Conformité RGPD totale", "DPA signé, CCT, chiffrement AES-256"],
                    ["🤖", "IA intégrée", "Automatisation RPA et IA générative disponible"],
                  ] : [
                    ["🥇", "#1 BPO in France", "Ranked by Outsource Accelerator 2026"],
                    ["⚡", "Start in 2–4 weeks", "Accelerated onboarding, trained teams"],
                    ["🌍", "18 delivery countries", "French-speaking hubs in Africa, EU, Americas"],
                    ["🔒", "Full GDPR compliance", "Signed DPA, SCCs, AES-256 encryption"],
                    ["🤖", "AI-integrated delivery", "RPA automation and generative AI available"],
                  ]).map(([icon, title, sub]) => (
                    <li key={title} className="flex gap-3">
                      <span className="text-lg shrink-0">{icon}</span>
                      <div>
                        <p className="text-sm font-semibold text-[var(--color-encre)]">{title}</p>
                        <p className="text-xs text-[var(--color-granit)]">{sub}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="card-base p-6 bg-[var(--color-marine-800)] text-white">
                <p className="text-sm font-semibold mb-1">📧 {isFr ? "Contact direct" : "Direct contact"}</p>
                <a href={`mailto:${SITE.email}`} className="text-sm text-white/70 hover:text-white transition-colors break-all">
                  {SITE.email}
                </a>
                <p className="text-xs text-white/40 mt-2">
                  {isFr ? "Réponse sous 24h ouvrables" : "Reply within 24 business hours"}
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
