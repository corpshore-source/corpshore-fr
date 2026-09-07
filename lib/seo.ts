import { SITE } from "@/lib/site";
import type { Metadata } from "next";

export function pageAlternates(path: string): NonNullable<Metadata["alternates"]> {
  const suffix = path === "/" ? "" : path;
  return {
    canonical: `${SITE.url}/fr${suffix}`,
    languages: {
      fr: `${SITE.url}/fr${suffix}`,
      en: `${SITE.url}/en${suffix}`,
      "x-default": `${SITE.url}/fr${suffix}`,
    },
  };
}

export const KEYWORDS: Record<string, { fr: string; en: string }> = {
  home: {
    fr: "BPO France, externalisation BPO France, externalisation IT France, IA générative France, infogérance France, prestataire BPO France, outsourcing France, centre de contact externalisé, sous-traitance service client, annotation données IA, Corpshore, #1 BPO France",
    en: "BPO France, outsourcing France, IT outsourcing France, AI outsourcing France, BPO company France, French BPO provider, outsourced contact center France, data annotation France, Corpshore France",
  },
  services: {
    fr: "services BPO France, externalisation IT France, IA générative entreprise, infogérance IT France, TMA France, RH externalisée France, service client multicanal, finance externalisée, développement offshore francophone, annotation données IA France, labellisation données machine learning",
    en: "BPO services France, IT outsourcing France, AI outsourcing France, generative AI services France, application maintenance outsourcing TMA, HR outsourcing France, multichannel customer service, finance outsourcing, Francophone offshore development, AI data annotation France",
  },
  industries: {
    fr: "BPO secteur financier France, externalisation secteur public ANSSI, BPO santé HDS France, e-commerce outsourcing France, BPO assurance France, BPO télécom France, banque assurance externalisation",
    en: "BPO financial services France, public sector outsourcing France ANSSI, healthcare BPO HDS France, e-commerce outsourcing France, insurance BPO France, banking outsourcing France",
  },
  about: {
    fr: "Corpshore France, prestataire BPO francophone, #1 BPO France Outsource Accelerator, outsourcing francophone, entreprise BPO France, Corpshore histoire, fournisseur externalisation certifié ISO",
    en: "Corpshore France, Francophone BPO provider, #1 BPO France Outsource Accelerator, French outsourcing company, ISO certified BPO provider",
  },
  careers: {
    fr: "emploi BPO France, recrutement télétravail BPO, carrières externalisation IT, emploi IA annotation données France, offres d'emploi externalisation, agent support francophone",
    en: "BPO jobs France, remote BPO careers, IT outsourcing jobs France, AI data annotation jobs France, outsourcing employment, Francophone support agent jobs",
  },
  blog: {
    fr: "blog BPO France, actualité externalisation IT, IA générative entreprise, tendances BPO France 2026, RGPD externalisation, guide externalisation PME France",
    en: "BPO France blog, outsourcing insights France, AI business trends France, IT outsourcing news, GDPR outsourcing France, outsourcing guide SME France",
  },
  cases: {
    fr: "études de cas BPO France, références externalisation France, résultats BPO, cas client IT France, cas client IA France, ROI externalisation",
    en: "BPO case studies France, outsourcing results France, IT outsourcing references, AI outsourcing ROI France",
  },
  contact: {
    fr: "contact externalisation France, devis BPO France, devis IT outsourcing France, devis IA France, demande devis BPO gratuit",
    en: "outsourcing contact France, BPO quote France, IT outsourcing quote France, AI outsourcing quote, free BPO quote France",
  },
  devis: {
    fr: "devis BPO France, demande de devis externalisation, devis infogérance IT, devis IA générative, devis service client externalisé, tarif BPO France, coût externalisation France",
    en: "BPO proposal France, outsourcing RFQ France, IT managed services quote, AI outsourcing proposal, customer service outsourcing quote, BPO pricing France",
  },
};