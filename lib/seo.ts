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
    fr: "BPO France, externalisation BPO France, externalisation IT France, IA générative France, infogérance France, prestataire BPO France, outsourcing France, Corpshore",
    en: "BPO France, outsourcing France, IT outsourcing France, AI outsourcing France, BPO company France, French BPO provider, Corpshore France",
  },
  services: {
    fr: "services BPO France, externalisation IT France, IA générative entreprise, infogérance IT France, RH externalisée France, service client multicanal, finance externalisée",
    en: "BPO services France, IT outsourcing France, AI outsourcing France, generative AI services, HR outsourcing France, multichannel customer service, finance outsourcing",
  },
  industries: {
    fr: "BPO secteur financier France, externalisation secteur public, BPO santé France, e-commerce outsourcing France, BPO assurance France, BPO télécom France",
    en: "BPO financial services France, public sector outsourcing France, healthcare BPO France, e-commerce outsourcing France, insurance BPO France",
  },
  about: {
    fr: "Corpshore France histoire, prestataire BPO francophone, outsourcing francophone, entreprise BPO France, qui sommes-nous Corpshore",
    en: "Corpshore France about, Francophone BPO provider, French outsourcing company, BPO company history France",
  },
  careers: {
    fr: "emploi BPO France, recrutement télétravail, carrières externalisation IT, emploi IA France, offres d'emploi BPO",
    en: "BPO jobs France, remote outsourcing careers, IT outsourcing jobs France, AI jobs France, BPO employment",
  },
  blog: {
    fr: "blog BPO France, actualité externalisation IT, IA générative entreprise, tendances BPO France, RGPD externalisation",
    en: "BPO France blog, outsourcing insights France, AI business trends, IT outsourcing news, GDPR outsourcing France",
  },
  cases: {
    fr: "études de cas BPO France, références externalisation France, résultats BPO, cas client IT France, cas client IA France",
    en: "BPO case studies France, outsourcing results France, IT outsourcing references, AI outsourcing results",
  },
  contact: {
    fr: "devis BPO France, contact externalisation France, devis IT outsourcing, devis IA France, demande devis BPO",
    en: "BPO quote France, outsourcing contact France, IT outsourcing quote, AI outsourcing quote, free BPO quote",
  },
};
