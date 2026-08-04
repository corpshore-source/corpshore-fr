"use client";
import { useState } from "react";
import { useLocale } from "next-intl";

const FAQ_FR = [
  {
    q: "Qu'est-ce que le BPO et comment fonctionne l'externalisation de processus ?",
    a: "Le BPO (Business Process Outsourcing) consiste à confier certains processus opérationnels de votre entreprise — service client, saisie de données, comptabilité, support IT — à un prestataire spécialisé externe. Corpshore gère ces processus depuis ses hubs de livraison en Afrique, en Europe et dans les Amériques, avec des équipes dédiées, formées à vos procédures et supervisées par des responsables qualité.",
  },
  {
    q: "Combien coûte l'externalisation BPO avec Corpshore en France ?",
    a: "Les tarifs Corpshore débutent à partir de 9 à 12 euros par FTE et par heure pour les configurations Starter, et vont jusqu'à 15 à 20 euros par FTE par heure pour les configurations Enterprise avec SLA Élite. À titre de comparaison, un équivalent temps plein (ETP) internalisé en France coûte en moyenne 45 à 65 000 euros par an charges sociales comprises. Utilisez notre calculateur d'économies pour estimer votre différentiel en 30 secondes.",
  },
  {
    q: "Corpshore est-il vraiment classé #1 BPO en France ?",
    a: "Oui. Corpshore France est classé #1 parmi les sociétés de BPO en France par Outsource Accelerator, le principal annuaire mondial des prestataires BPO. Ce classement est basé sur des critères de performance opérationnelle, de couverture géographique, de qualité de service et de conformité réglementaire.",
  },
  {
    q: "Quels services d'externalisation Corpshore propose-t-il ?",
    a: "Corpshore couvre six domaines : le BPO (traitement de données, administration, service client), l'infogérance IT (support helpdesk, développement, cybersécurité), l'IA générative (chatbots, automatisation RPA, traitement du langage naturel), les RH externalisées, la finance et comptabilité, et le service client multicanal (téléphonie, chat, email).",
  },
  {
    q: "Combien de temps faut-il pour démarrer avec Corpshore ?",
    a: "L'onboarding Corpshore est rapide : comptez 2 à 4 semaines pour les configurations standards, et 4 à 8 semaines pour les projets plus complexes (multilinguisme, intégration IT avancée, formation spécialisée). Dès la signature du devis, une équipe de mise en œuvre dédiée vous accompagne.",
  },
  {
    q: "Corpshore est-il conforme au RGPD pour les entreprises françaises ?",
    a: "Oui, totalement. Corpshore signe un Accord de Traitement des Données (DPA) conforme à l'article 28 du RGPD avec chaque client. Les données sont chiffrées en transit (TLS 1.3) et au repos (AES-256). Les transferts vers les hubs hors UE sont encadrés par des Clauses Contractuelles Types (CCT) conformes à la décision 2021/914/UE de la Commission européenne.",
  },
  {
    q: "Dans quels pays Corpshore livre-t-il ses services d'externalisation ?",
    a: "Corpshore dispose de hubs de livraison dans 18 pays répartis sur 4 continents : en Afrique (Maroc, Sénégal, Côte d'Ivoire, Ghana, Kenya, Ouganda), en Asie-Pacifique (Philippines, Vietnam, Ouzbékistan), en Europe (Pologne, Turquie) et dans les Amériques (République Dominicaine, Mexique, Colombie). Cela permet d'offrir des couvertures horaires de 8h à 24h/7j dans plus de 35 langues.",
  },
  {
    q: "Peut-on externaliser seulement une partie de son équipe avec Corpshore ?",
    a: "Oui, absolument. Corpshore propose des configurations à partir d'un seul FTE (équivalent temps plein). Il est courant de démarrer avec une équipe pilote de 2 à 5 agents pour valider le modèle avant de le déployer à plus grande échelle. Corpshore s'adapte à votre rythme de croissance.",
  },
  {
    q: "L'externalisation IT avec Corpshore est-elle adaptée aux entreprises françaises soumises à la DSP2 ou à d'autres réglementations sectorielles ?",
    a: "Oui. Corpshore accompagne des clients dans les secteurs régulés : banque, assurance, santé et secteur public. Les contrats incluent des clauses de confidentialité renforcées, des accords de niveau de service (SLA) adaptés aux contraintes réglementaires, et Corpshore peut signer des conventions spécifiques de type NDA/secret professionnel.",
  },
  {
    q: "Comment contacter Corpshore pour obtenir un devis d'externalisation ?",
    a: "Vous pouvez obtenir un devis personnalisé en remplissant le formulaire de demande de proposition sur cette page, ou en réservant directement un appel découverte avec un consultant Corpshore via notre agenda en ligne. Nous répondons à toutes les demandes sous 24 heures ouvrables.",
  },
];

const FAQ_EN = [
  {
    q: "What is BPO and how does business process outsourcing work?",
    a: "BPO (Business Process Outsourcing) involves entrusting certain operational processes of your company — customer service, data entry, accounting, IT support — to a specialised external provider. Corpshore manages these processes from its delivery hubs in Africa, Europe and the Americas, with dedicated teams trained to your procedures and supervised by quality managers.",
  },
  {
    q: "How much does BPO outsourcing with Corpshore cost in France?",
    a: "Corpshore rates start from €9–12 per FTE per hour for Starter configurations, up to €15–20 per FTE per hour for Enterprise configurations with Elite SLA. For comparison, an in-house full-time employee in France costs an average of €45,000–65,000 per year including social charges. Use our savings calculator to estimate your difference in 30 seconds.",
  },
  {
    q: "Is Corpshore really ranked #1 BPO in France?",
    a: "Yes. Corpshore France is ranked #1 among BPO companies in France by Outsource Accelerator, the leading global directory of BPO providers. This ranking is based on criteria including operational performance, geographic coverage, quality of service and regulatory compliance.",
  },
  {
    q: "What outsourcing services does Corpshore offer?",
    a: "Corpshore covers six domains: BPO (data processing, administration, customer service), IT managed services (helpdesk support, development, cybersecurity), generative AI (chatbots, RPA automation, natural language processing), HR outsourcing, finance and accounting, and multichannel customer service (voice, chat, email).",
  },
  {
    q: "How long does it take to get started with Corpshore?",
    a: "Corpshore onboarding is rapid: allow 2–4 weeks for standard configurations, and 4–8 weeks for more complex projects (multilingual, advanced IT integration, specialised training). From the moment you sign the proposal, a dedicated implementation team supports you.",
  },
  {
    q: "Is Corpshore GDPR-compliant for French companies?",
    a: "Yes, fully. Corpshore signs a Data Processing Agreement (DPA) compliant with Article 28 of the GDPR with every client. Data is encrypted in transit (TLS 1.3) and at rest (AES-256). Transfers to hubs outside the EU are covered by Standard Contractual Clauses (SCCs) compliant with European Commission Decision 2021/914/EU.",
  },
  {
    q: "In which countries does Corpshore deliver its outsourcing services?",
    a: "Corpshore has delivery hubs in 18 countries across 4 continents: Africa (Morocco, Senegal, Côte d'Ivoire, Ghana, Kenya, Uganda), Asia-Pacific (Philippines, Vietnam, Uzbekistan), Europe (Poland, Turkey) and the Americas (Dominican Republic, Mexico, Colombia). This enables coverage from 8am to 24/7 in over 35 languages.",
  },
  {
    q: "Can I outsource just part of my team with Corpshore?",
    a: "Yes, absolutely. Corpshore offers configurations from as little as one FTE (full-time equivalent). It is common to start with a pilot team of 2–5 agents to validate the model before scaling up. Corpshore adapts to your growth pace.",
  },
  {
    q: "Is Corpshore's IT outsourcing suitable for French companies subject to PSD2 or other sector regulations?",
    a: "Yes. Corpshore works with clients in regulated sectors: banking, insurance, healthcare and the public sector. Contracts include enhanced confidentiality clauses, SLAs adapted to regulatory requirements, and Corpshore can sign specific NDA/professional secrecy agreements.",
  },
  {
    q: "How do I contact Corpshore to get an outsourcing quote?",
    a: "You can get a personalised quote by filling in the proposal request form on this page, or by booking a discovery call directly with a Corpshore consultant via our online calendar. We respond to all requests within 24 business hours.",
  },
];

export function HomeFaq() {
  const locale = useLocale();
  const isFr = locale === "fr";
  const items = isFr ? FAQ_FR : FAQ_EN;
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="max-w-3xl mx-auto space-y-2">
      {items.map((item, i) => (
        <div key={i} className="card-base overflow-hidden">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between gap-4 text-left px-6 py-4 cursor-pointer hover:bg-[var(--color-calcaire)] transition-colors"
            aria-expanded={open === i}
          >
            <span className="text-sm font-semibold text-[var(--color-encre)] leading-snug pr-2 speakable">
              {item.q}
            </span>
            <span
              className={`text-[var(--color-marine-800)] shrink-0 text-lg transition-transform duration-200 ${open === i ? "rotate-180" : ""}`}
              aria-hidden="true"
            >
              ▾
            </span>
          </button>
          {open === i && (
            <div className="px-6 pb-5 pt-1">
              <p className="text-sm text-[var(--color-granit)] leading-relaxed speakable">{item.a}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
