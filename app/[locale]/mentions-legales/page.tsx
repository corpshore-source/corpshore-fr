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
  return {
    title: t("title"),
    description: t("description"),
    robots: { index: false, follow: true },
    alternates: pageAlternates("/mentions-legales"),
  };
}

function LegalContent({ locale }: { locale: string }) {
  const t = useTranslations("Legal");
  const isFr = locale === "fr";

  const toc = isFr
    ? [
        "Mentions légales — LCEN",
        "Politique de confidentialité — RGPD",
        "Conditions générales d'utilisation (CGU)",
        "Conditions générales de prestation de services BPO, IT & IA",
        "Annexe traitement des données — Article 28 RGPD (DPA)",
        "Politique des cookies",
        "Conformité EU AI Act",
      ]
    : [
        "Legal Notice — LCEN",
        "Privacy Policy — GDPR",
        "Terms of Use",
        "General Terms of Service — BPO, IT & AI",
        "Data Processing Appendix — GDPR Article 28 (DPA)",
        "Cookie Policy",
        "EU AI Act Compliance",
      ];

  const h2 = "text-2xl font-bold text-[var(--color-marine-800)] mb-6 pb-3 border-b-2 border-[var(--color-marine-800)]";
  const h3 = "text-lg font-semibold text-[var(--color-encre)] mt-8 mb-3";
  const p  = "text-[var(--color-granit)] leading-relaxed mb-4 text-sm";
  const li = "flex items-start gap-2 text-sm text-[var(--color-granit)] mb-1.5";
  const dot = "text-[var(--color-marine-800)] mt-0.5 shrink-0 select-none";
  const td1 = "py-2.5 pr-4 font-medium text-[var(--color-encre)] w-2/5 align-top text-sm";
  const td2 = "py-2.5 text-[var(--color-granit)] text-sm align-top";
  const tr_ = "border-b border-[var(--color-border)]";
  const thCls = "py-2.5 px-3 text-left font-medium text-sm whitespace-nowrap";
  const tdCls = "py-2.5 px-3 text-[var(--color-granit)] text-sm align-top";

  return (
    <>
      <PageHero label={t("hero.label")} heading={t("hero.h1")}>
        <p className="text-sm text-white/50">
          {isFr
            ? "Dernière mise à jour : 1er août 2026 — LCEN, RGPD & EU AI Act"
            : "Last updated: 1 August 2026 — LCEN, GDPR & EU AI Act"}
        </p>
      </PageHero>

      <Section tone="default">
        <Container className="max-w-4xl">

          {/* ── Table of contents ── */}
          <nav className="bg-[var(--color-calcaire)] border border-[var(--color-border)] rounded-[var(--radius-lg)] p-6 mb-16">
            <p className="text-xs font-bold text-[var(--color-marine-800)] mb-4 uppercase tracking-widest">
              {isFr ? "Sommaire" : "Table of contents"}
            </p>
            <ol className="space-y-2">
              {toc.map((item, i) => (
                <li key={item}>
                  <a
                    href={`#s${i + 1}`}
                    className="text-sm text-[var(--color-granit)] hover:text-[var(--color-marine-800)] transition-colors"
                  >
                    {i + 1}. {item}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="space-y-24">

            {/* ═══════════════════════════════════════════
                §1  MENTIONS LÉGALES
               ═══════════════════════════════════════════ */}
            <section id="s1">
              <h2 className={h2}>
                {isFr ? "1. Mentions légales — LCEN" : "1. Legal Notice — LCEN"}
              </h2>

              <h3 className={h3}>{isFr ? "1.1 Identification de l'éditeur" : "1.1 Publisher identification"}</h3>
              <p className={p}>
                {isFr
                  ? `Le présent site web corpshore.fr (ci-après « le Site ») est édité par Corpshore Solutions Corporation (ci-après « Corpshore » ou « l'Éditeur »), société de droit canadien dont le siège social est établi à Toronto, Ontario, Canada. Corpshore exerce, par l'intermédiaire du présent site, une activité de prospection commerciale à destination des entreprises françaises et francophones souhaitant externaliser tout ou partie de leurs fonctions opérationnelles, informatiques ou d'intelligence artificielle. La marque commerciale Corpshore France désigne l'ensemble des opérations commerciales et contractuelles de Corpshore Solutions Corporation sur le marché français, belge, suisse, luxembourgeois et, plus généralement, sur l'ensemble de l'espace francophone mondial. Les présentes mentions légales sont publiées conformément aux exigences de la Loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique (LCEN), notamment son article 6 III, qui impose aux éditeurs de services de communication au public en ligne la publication des informations d'identification permettant aux utilisateurs d'obtenir les coordonnées de l'éditeur.`
                  : `This website corpshore.fr (hereinafter "the Site") is published by Corpshore Solutions Corporation (hereinafter "Corpshore" or "the Publisher"), a company incorporated under Canadian law with its registered office in Toronto, Ontario, Canada. Through this Site, Corpshore conducts commercial outreach to French and Francophone businesses seeking to outsource some or all of their operational, IT or artificial intelligence functions. The commercial brand Corpshore France designates all commercial and contractual operations of Corpshore Solutions Corporation in the French, Belgian, Swiss and Luxembourg markets and, more broadly, across the global Francophone market. This legal notice is published in compliance with the requirements of French Law No. 2004-575 of 21 June 2004 for confidence in the digital economy (LCEN), particularly Article 6 III, which requires publishers of online public communication services to publish identification information enabling users to obtain the publisher's contact details.`}
              </p>

              <div className="overflow-x-auto mb-6">
                <table className="w-full text-sm border-collapse">
                  <tbody>
                    {(isFr ? [
                      ["Dénomination sociale", "Corpshore Solutions Corporation"],
                      ["Forme juridique", "Corporation (Province d'Ontario, Canada — Business Corporations Act)"],
                      ["Siège social", "Toronto, Ontario, Canada"],
                      ["Adresse électronique", SITE.email],
                      ["Site web groupe", SITE.globalUrl],
                      ["Activité principale", "Prestataire de services d'externalisation BPO, IT et IA"],
                      ["Marchés servis", "France, Belgique, Suisse, Luxembourg et espace francophone mondial"],
                      ["Classification CNIL", "Responsable du traitement pour les données du site ; sous-traitant pour les données traitées pour le compte de ses clients"],
                    ] : [
                      ["Corporate name", "Corpshore Solutions Corporation"],
                      ["Legal form", "Corporation (Province of Ontario, Canada — Business Corporations Act)"],
                      ["Registered office", "Toronto, Ontario, Canada"],
                      ["Email address", SITE.email],
                      ["Group website", SITE.globalUrl],
                      ["Main business", "BPO, IT and AI outsourcing services provider"],
                      ["Markets served", "France, Belgium, Switzerland, Luxembourg and global Francophone market"],
                      ["GDPR classification", "Data controller for Site data; data processor for data processed on behalf of its clients"],
                    ]).map(([k, v]) => (
                      <tr key={k} className={tr_}>
                        <td className={td1}>{k}</td>
                        <td className={td2}>{v}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h3 className={h3}>{isFr ? "1.2 Hébergement du site" : "1.2 Website hosting"}</h3>
              <p className={p}>
                {isFr
                  ? "Le site corpshore.fr est hébergé par Vercel Inc., société de droit américain soumise à la législation des États-Unis d'Amérique. Corpshore a conclu avec Vercel Inc. un Accord de traitement des données (DPA) conforme aux exigences de l'article 28 du Règlement général sur la protection des données (RGPD), incluant les Clauses Contractuelles Types (CCT) adoptées par la Commission européenne le 4 juin 2021 (décision d'exécution 2021/914/UE) afin d'encadrer les transferts de données à caractère personnel vers les États-Unis, pays ne bénéficiant pas d'une décision d'adéquation au sens de l'article 45 du RGPD pour l'ensemble des traitements. Vercel déploie le site via un réseau de distribution de contenu (CDN) mondial, avec des nœuds localisés en Europe, permettant de minimiser les transferts transatlantiques de données de navigation."
                  : "The site corpshore.fr is hosted by Vercel Inc., a company incorporated under US law. Corpshore has entered into a Data Processing Agreement (DPA) with Vercel Inc. that complies with the requirements of Article 28 of the General Data Protection Regulation (GDPR), including Standard Contractual Clauses (SCCs) adopted by the European Commission on 4 June 2021 (Implementing Decision 2021/914/EU) to cover transfers of personal data to the United States, a country not benefiting from an adequacy decision under Article 45 of the GDPR for all processing activities. Vercel deploys the Site via a global content delivery network (CDN) with nodes located in Europe, minimising transatlantic transfers of browsing data."}
              </p>
              <div className="overflow-x-auto mb-6">
                <table className="w-full text-sm border-collapse">
                  <tbody>
                    {(isFr ? [
                      ["Hébergeur", "Vercel Inc."],
                      ["Adresse", "340 Pine Street, Suite 701, San Francisco, CA 94104, États-Unis"],
                      ["Site web", "vercel.com"],
                      ["Infrastructure", "CDN mondial, centres de données en Amérique du Nord et Europe"],
                      ["Conformité RGPD", "DPA signé, Clauses Contractuelles Types (CCT 2021/914/UE)"],
                    ] : [
                      ["Host", "Vercel Inc."],
                      ["Address", "340 Pine Street, Suite 701, San Francisco, CA 94104, United States"],
                      ["Website", "vercel.com"],
                      ["Infrastructure", "Global CDN, data centres in North America and Europe"],
                      ["GDPR compliance", "Signed DPA, Standard Contractual Clauses (SCCs 2021/914/EU)"],
                    ]).map(([k, v]) => (
                      <tr key={k} className={tr_}>
                        <td className={td1}>{k}</td>
                        <td className={td2}>{v}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h3 className={h3}>{isFr ? "1.3 Directeur de la publication" : "1.3 Publication director"}</h3>
              <p className={p}>
                {isFr
                  ? `Le directeur de la publication au sens de l'article 6 III de la LCEN est le représentant légal de Corpshore Solutions Corporation. Toute demande relative au contenu éditorial du présent site doit être adressée à l'adresse électronique ${SITE.email}. Les demandes doivent préciser clairement leur objet et, dans le cas d'un signalement de contenu illicite au sens de l'article 6 I 7° de la LCEN, indiquer les coordonnées du requérant, une description précise du contenu signalé et sa localisation exacte sur le site. Corpshore s'engage à traiter tout signalement de contenu manifestement illicite dans les meilleurs délais et à procéder aux retraits imposés par la loi.`
                  : `The publication director within the meaning of Article 6 III of the LCEN is the legal representative of Corpshore Solutions Corporation. Any request relating to the editorial content of this Site should be addressed to ${SITE.email}. Requests must clearly state their purpose and, in the case of notification of unlawful content under Article 6 I 7° of the LCEN, must include the requester's contact details, a precise description of the reported content and its exact location on the Site. Corpshore undertakes to process any notification of manifestly unlawful content as soon as possible and to carry out removals required by law.`}
              </p>

              <h3 className={h3}>{isFr ? "1.4 Propriété intellectuelle et droits d'auteur" : "1.4 Intellectual property and copyright"}</h3>
              <p className={p}>
                {isFr
                  ? "L'ensemble des éléments constituant le présent site — incluant, sans s'y limiter, les textes, articles, études de cas, données comparatives, graphiques, photographies, illustrations, logos, icônes, typographies, sons, vidéos, animations, bases de données, logiciels, codes sources, interfaces et architecture de l'information — est protégé par le droit de la propriété intellectuelle, et notamment par le droit d'auteur tel que défini aux articles L.111-1 et suivants du Code de la propriété intellectuelle (CPI). Ces éléments sont la propriété exclusive de Corpshore Solutions Corporation ou de tiers ayant accordé une licence d'utilisation à Corpshore."
                  : "All elements constituting this Site — including, without limitation, texts, articles, case studies, comparative data, graphics, photographs, illustrations, logos, icons, typography, sounds, videos, animations, databases, software, source code, interfaces and information architecture — are protected by intellectual property law, and in particular by copyright as defined in Articles L.111-1 et seq. of the French Intellectual Property Code (CPI). These elements are the exclusive property of Corpshore Solutions Corporation or of third parties who have granted Corpshore a licence to use them."}
              </p>
              <p className={p}>
                {isFr
                  ? "Toute reproduction, représentation, modification, publication, transmission, dénaturation ou décompilation, totale ou partielle, par quelque procédé que ce soit et sur quelque support que ce soit, sans l'autorisation expresse et préalable de Corpshore, est strictement interdite et constituerait une contrefaçon sanctionnée par les articles L.335-2 et suivants du CPI, passible de peines pouvant aller jusqu'à trois ans d'emprisonnement et 300 000 euros d'amende. Les bases de données figurant sur le site bénéficient de la protection du producteur de base de données au sens des articles L.341-1 et suivants du CPI ainsi que de la Directive européenne 96/9/CE. Il est expressément interdit d'extraire ou de réutiliser, même partiellement, ces bases de données sans autorisation."
                  : "Any reproduction, representation, modification, publication, transmission, distortion or decompilation, in whole or in part, by any means and on any medium, without Corpshore's express prior authorisation, is strictly prohibited and would constitute an infringement punishable under Articles L.335-2 et seq. of the CPI, with penalties of up to three years' imprisonment and €300,000 in fines. The databases on the Site are protected by the database producer right under Articles L.341-1 et seq. of the CPI and European Directive 96/9/EC. It is expressly prohibited to extract or re-use these databases, even partially, without authorisation."}
              </p>
              <p className={p}>
                {isFr
                  ? "Par exception aux restrictions ci-dessus, les utilisateurs sont autorisés, dans le cadre de la courte citation prévue à l'article L.122-5 3° du CPI, à reproduire des extraits du site à des fins de presse, d'enseignement, de recherche ou d'information, sous réserve d'une mention d'attribution explicite comportant la source « Corpshore France (corpshore.fr) » et la date de consultation. Ces exceptions s'exercent dans la limite de ce qui est nécessaire au regard de la finalité poursuivie et ne sauraient porter atteinte à l'exploitation normale des œuvres ni causer un préjudice injustifié aux intérêts légitimes de Corpshore."
                  : "By way of exception to the above restrictions, users are permitted, within the framework of the short quotation provided for in Article L.122-5 3° of the CPI, to reproduce extracts from the Site for press, educational, research or information purposes, provided an explicit attribution mentioning the source 'Corpshore France (corpshore.fr)' and the date of consultation is included. These exceptions are exercised only to the extent necessary for the purpose pursued and may not impair the normal exploitation of the works or cause unjustified prejudice to Corpshore's legitimate interests."}
              </p>

              <h3 className={h3}>{isFr ? "1.5 Marques et signes distinctifs" : "1.5 Trademarks and distinctive signs"}</h3>
              <p className={p}>
                {isFr
                  ? "Les dénominations commerciales « Corpshore », « Corpshore France », « Corpshore AI », « Corpshore Solutions » ainsi que les logos, logotypes, slogans et signes visuels associés constituent des marques commerciales de Corpshore Solutions Corporation, protégées en France, au Canada et dans l'ensemble des pays où Corpshore exerce son activité. Toute utilisation non autorisée de ces marques — notamment à des fins d'identification commerciale, de référencement publicitaire (SEA/SEM), de génération de confusion dans l'esprit du consommateur ou d'atteinte à la réputation — constitue une violation du droit des marques susceptible d'engager la responsabilité civile et pénale de son auteur. Les noms de marques tierces mentionnés sur ce site (notamment Zoho, Vercel, Salesforce, Zendesk, OpenAI, Anthropic, Mistral AI, UiPath, Outsource Accelerator) appartiennent à leurs propriétaires respectifs et sont utilisés uniquement à des fins descriptives et d'identification, sans qu'aucune affiliation, approbation ou parrainage ne soit impliqué."
                  : "The trade names 'Corpshore', 'Corpshore France', 'Corpshore AI' and 'Corpshore Solutions', together with the associated logos, logotypes, slogans and visual signs, are trademarks of Corpshore Solutions Corporation, protected in France, Canada and all countries where Corpshore operates. Any unauthorised use of these trademarks — including for commercial identification, advertising (SEA/SEM), creating consumer confusion or reputational damage — constitutes a trademark infringement that may engage the civil and criminal liability of the infringer. Third-party brand names mentioned on this Site (including Zoho, Vercel, Salesforce, Zendesk, OpenAI, Anthropic, Mistral AI, UiPath, Outsource Accelerator) belong to their respective owners and are used solely for descriptive and identification purposes, without any affiliation, endorsement or sponsorship implied."}
              </p>

              <h3 className={h3}>{isFr ? "1.6 Liens hypertextes" : "1.6 Hyperlinks"}</h3>
              <p className={p}>
                {isFr
                  ? "Le présent site contient des liens hypertextes vers des sites web tiers fournis à titre d'information et de commodité uniquement. Corpshore n'exerce aucun contrôle éditorial sur les contenus, politiques de confidentialité, pratiques commerciales ou conformité réglementaire de ces sites tiers. L'inclusion d'un lien vers un site tiers ne vaut pas approbation par Corpshore du contenu, des services ou de l'organisation qui le gère. Corpshore ne saurait être tenu responsable de tout dommage découlant de l'utilisation de ces sites tiers. L'utilisateur qui accède à un site tiers via un lien figurant sur le présent site le fait à ses risques et périls et sous sa seule responsabilité."
                  : "This Site contains hyperlinks to third-party websites provided for information and convenience purposes only. Corpshore exercises no editorial control over the content, privacy policies, commercial practices or regulatory compliance of these third-party sites. The inclusion of a link to a third-party site does not constitute Corpshore's endorsement of that site's content, services or the organisation that runs it. Corpshore cannot be held liable for any damage arising from the use of these third-party sites. Users who access a third-party site via a link on this Site do so at their own risk and on their own responsibility."}
              </p>
              <p className={p}>
                {isFr
                  ? "La création de liens hypertextes pointant vers les pages du présent site est autorisée sous réserve que : (i) le lien soit clairement identifié comme pointant vers le site de Corpshore France ; (ii) le contenu du site d'origine ne soit pas susceptible de porter atteinte à l'image ou à la réputation de Corpshore ; (iii) le site d'origine ne soit pas un site à caractère illicite, offensant ou contraire à l'ordre public ; (iv) la mise en lien n'utilise pas de techniques de framing, d'inline linking ou d'autres procédés susceptibles de créer une confusion quant à l'origine du contenu. Tout autre mode de création de liens, notamment le deep linking ou l'utilisation de métadonnées Corpshore dans des systèmes d'IA génératives à des fins commerciales, est subordonné à l'autorisation préalable écrite de Corpshore Solutions Corporation."
                  : "The creation of hyperlinks pointing to pages of this Site is permitted provided that: (i) the link is clearly identified as pointing to the Corpshore France site; (ii) the content of the originating site is not likely to damage Corpshore's image or reputation; (iii) the originating site is not an unlawful, offensive or contrary-to-public-order site; (iv) the linking does not use framing, inline linking or other techniques that could create confusion as to the origin of the content. Any other method of linking, including deep linking or use of Corpshore metadata in commercial generative AI systems, is subject to prior written authorisation from Corpshore Solutions Corporation."}
              </p>

              <h3 className={h3}>{isFr ? "1.7 Limitation de responsabilité" : "1.7 Liability limitation"}</h3>
              <p className={p}>
                {isFr
                  ? "Corpshore s'efforce d'assurer l'exactitude, la complétude et l'actualité des informations diffusées sur le présent site. Toutefois, les informations disponibles sont fournies à titre purement indicatif et ne constituent pas, sauf mention contraire expresse, une offre contractuelle, un conseil professionnel, un conseil en investissement ou une garantie de résultat. Les données chiffrées présentées dans les outils interactifs (calculateur d'économies, simulateur d'effectif, comparateur de modèles, diagnostic de maturité, constructeur de SLA, vérificateur RGPD) sont des estimations automatiques basées sur des paramètres moyens de marché et ne sauraient se substituer à une analyse personnalisée réalisée par un consultant qualifié. Corpshore ne saurait être tenu responsable de décisions prises sur la seule base des résultats de ces outils."
                  : "Corpshore endeavours to ensure the accuracy, completeness and currency of the information published on this Site. However, the information available is provided for information purposes only and does not constitute, unless expressly stated otherwise, a contractual offer, professional advice, investment advice or a guarantee of results. The figures presented in the interactive tools (savings calculator, workforce planner, model comparator, maturity assessment, SLA builder, GDPR checker) are automatic estimates based on average market parameters and cannot substitute for a personalised analysis by a qualified consultant. Corpshore cannot be held liable for decisions made solely on the basis of the results of these tools."}
              </p>
              <p className={p}>
                {isFr
                  ? "Corpshore ne saurait être tenu responsable des dommages directs ou indirects — incluant les pertes d'exploitation, pertes de profits, pertes de données, atteintes à la réputation, interruptions d'activité ou tout autre dommage pécuniaire ou commercial — résultant de l'utilisation ou de l'impossibilité d'utiliser le site, de l'accès à des informations inexactes ou incomplètes, ou des actes de tiers sur le réseau internet. Corpshore se réserve le droit de modifier, corriger, interrompre ou suspendre l'accès à tout ou partie du site à tout moment et sans préavis, notamment pour des raisons de maintenance technique, de mise à jour réglementaire ou de force majeure. Cette limitation de responsabilité s'applique dans toute la mesure permise par la loi française applicable et ne saurait être interprétée comme une exclusion de responsabilité pour dommages causés par dol ou faute lourde."
                  : "Corpshore cannot be held liable for direct or indirect damages — including loss of business, loss of profits, loss of data, reputational damage, business interruption or any other financial or commercial damage — resulting from the use of or inability to use the Site, from access to inaccurate or incomplete information, or from the acts of third parties on the internet network. Corpshore reserves the right to modify, correct, interrupt or suspend access to all or part of the Site at any time and without notice, in particular for technical maintenance, regulatory updates or force majeure. This limitation of liability applies to the fullest extent permitted by applicable French law and may not be interpreted as an exclusion of liability for damages caused by fraud or gross negligence."}
              </p>

              <h3 className={h3}>{isFr ? "1.8 Droit applicable et juridiction compétente" : "1.8 Applicable law and jurisdiction"}</h3>
              <p className={p}>
                {isFr
                  ? "Les présentes mentions légales sont régies par le droit français. En cas de litige relatif à l'utilisation du présent site ou à l'interprétation des présentes mentions légales, et à défaut de résolution amiable dans un délai de trente (30) jours suivant la notification du litige par lettre recommandée avec accusé de réception, les parties conviennent de soumettre le litige aux tribunaux compétents de Paris. Pour les litiges impliquant des consommateurs résidant dans l'Union européenne, ces derniers conservent la faculté de recourir à la plateforme de règlement en ligne des litiges mise en place par la Commission européenne (ec.europa.eu/consumers/odr). Les utilisateurs reconnaissent que l'ensemble des dispositions du droit de la consommation de leur pays de résidence demeurent applicables lorsqu'ils contractent avec Corpshore en qualité de consommateurs."
                  : "These legal notices are governed by French law. In the event of a dispute relating to the use of this Site or the interpretation of these legal notices, and in the absence of an amicable resolution within thirty (30) days of notification of the dispute by recorded delivery letter, the parties agree to submit the dispute to the competent courts of Paris. For disputes involving consumers residing in the European Union, these consumers retain the right to use the Online Dispute Resolution platform set up by the European Commission (ec.europa.eu/consumers/odr). Users acknowledge that all applicable consumer law provisions in their country of residence remain applicable when they contract with Corpshore as consumers."}
              </p>
            </section>


            {/* ═══════════════════════════════════════════
                §2  POLITIQUE DE CONFIDENTIALITÉ
               ═══════════════════════════════════════════ */}
            <section id="s2">
              <h2 className={h2}>
                {isFr ? "2. Politique de confidentialité — RGPD" : "2. Privacy Policy — GDPR"}
              </h2>

              <h3 className={h3}>{isFr ? "2.1 Responsable du traitement" : "2.1 Data controller"}</h3>
              <p className={p}>
                {isFr
                  ? "Le responsable du traitement des données à caractère personnel collectées via le site corpshore.fr est Corpshore Solutions Corporation, Toronto, Ontario, Canada. Corpshore Solutions Corporation détermine les finalités et les moyens des traitements de données réalisés dans le cadre de l'exploitation du site, de la gestion des demandes de contact et des candidatures. Pour les données traitées dans le cadre des prestations réalisées pour le compte de clients (traitement de données clients en mode BPO, IT ou IA), Corpshore Solutions Corporation agit en qualité de sous-traitant au sens de l'article 4(8) du RGPD et de l'article 28 du même règlement."
                  : "The data controller for personal data collected via the site corpshore.fr is Corpshore Solutions Corporation, Toronto, Ontario, Canada. Corpshore Solutions Corporation determines the purposes and means of data processing carried out in the context of operating the Site, managing contact requests and job applications. For data processed in the context of services performed on behalf of clients (processing of client data in BPO, IT or AI mode), Corpshore Solutions Corporation acts as a data processor within the meaning of Article 4(8) of the GDPR and Article 28 of the same regulation."}
              </p>

              <h3 className={h3}>{isFr ? "2.2 Délégué à la Protection des Données (DPO)" : "2.2 Data Protection Officer (DPO)"}</h3>
              <p className={p}>
                {isFr
                  ? `Corpshore a désigné un référent RGPD jouant le rôle de point de contact pour toutes les questions relatives à la protection des données à caractère personnel. Ce référent peut être contacté à l'adresse suivante : ${SITE.emailDpo}. Toute demande relative à l'exercice de vos droits, toute question concernant les traitements de données réalisés par Corpshore ou tout signalement d'une potentielle violation de données peut être adressée à cette même adresse. Corpshore s'engage à répondre à toute demande dans un délai maximum de trente (30) jours calendaires conformément à l'article 12 du RGPD, et à vous informer dans les meilleurs délais si ce délai venait à être prolongé dans les conditions prévues à l'article 12(3) du RGPD.`
                  : `Corpshore has appointed a GDPR contact person acting as the point of contact for all questions relating to the protection of personal data. This contact can be reached at: ${SITE.emailDpo}. Any request relating to the exercise of your rights, any question concerning data processing carried out by Corpshore, or any notification of a potential data breach may be addressed to the same email address. Corpshore undertakes to respond to any request within a maximum period of thirty (30) calendar days in accordance with Article 12 of the GDPR, and to inform you as soon as possible if this period were to be extended under the conditions provided for in Article 12(3) of the GDPR.`}
              </p>

              <h3 className={h3}>{isFr ? "2.3 Données collectées et traitées" : "2.3 Data collected and processed"}</h3>
              <p className={p}>
                {isFr
                  ? "Corpshore collecte et traite différentes catégories de données à caractère personnel en fonction de votre interaction avec le site corpshore.fr. Les traitements suivants sont mis en œuvre :"
                  : "Corpshore collects and processes different categories of personal data depending on your interaction with the site corpshore.fr. The following processing activities are implemented:"}
              </p>
              <ul className="mb-4 space-y-1.5">
                {(isFr ? [
                  "Données de contact (formulaire de contact) : nom, prénom, adresse électronique professionnelle, numéro de téléphone (optionnel), société (optionnel), pays de résidence, service d'intérêt, message libre",
                  "Données de candidature (formulaire carrières) : nom, prénom, adresse électronique, numéro de téléphone, CV, lettre de motivation, informations professionnelles pertinentes",
                  "Données d'utilisation des outils interactifs : type de poste (calculateur), volume de contacts (simulateur), réponses au diagnostic de maturité, configuration SLA, résultats du vérificateur RGPD — stockées localement dans le navigateur (localStorage) et transmises à Zoho CRM lors de la soumission du formulaire de contact",
                  "Données de navigation : adresse IP (anonymisée), type de navigateur, système d'exploitation, pages visitées, durée de visite, source de référence — collectées par les journaux d'accès du serveur Vercel",
                  "Données de traçabilité RGPD : date et heure du consentement, version des CGU acceptées, opt-in newsletter",
                ] : [
                  "Contact data (contact form): last name, first name, professional email address, phone number (optional), company (optional), country of residence, service of interest, free message",
                  "Application data (careers form): last name, first name, email address, phone number, CV, cover letter, relevant professional information",
                  "Interactive tool usage data: role type (calculator), contact volume (planner), maturity assessment answers, SLA configuration, GDPR checker results — stored locally in the browser (localStorage) and transmitted to Zoho CRM upon contact form submission",
                  "Browsing data: IP address (anonymised), browser type, operating system, pages visited, visit duration, referral source — collected by Vercel server access logs",
                  "GDPR traceability data: date and time of consent, version of Terms of Use accepted, newsletter opt-in",
                ]).map(item => (
                  <li key={item} className={li}>
                    <span className={dot}>▸</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <h3 className={h3}>{isFr ? "2.4 Finalités et bases légales des traitements" : "2.4 Processing purposes and lawful bases"}</h3>
              <div className="overflow-x-auto mb-6">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-[var(--color-marine-800)] text-white">
                      {(isFr
                        ? ["Finalité", "Base légale (RGPD)", "Durée de conservation", "Sous-traitants concernés"]
                        : ["Purpose", "Lawful basis (GDPR)", "Retention period", "Relevant sub-processors"]
                      ).map(h => <th key={h} className={thCls}>{h}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {(isFr ? [
                      ["Réponse aux demandes de contact", "Art. 6.1.b — exécution de mesures précontractuelles", "3 ans à compter du dernier contact", "Zoho CRM (Inde), Vercel (USA)"],
                      ["Gestion des candidatures spontanées et réponses à offres", "Art. 6.1.b — mesures précontractuelles", "2 ans à compter du dépôt (avec consentement)", "Zoho Recruit (Inde)"],
                      ["Envoi de communications commerciales (newsletter)", "Art. 6.1.a — consentement explicite", "Jusqu'au retrait du consentement (désabonnement)", "Zoho Campaigns (Inde)"],
                      ["Amélioration des outils interactifs et analyses statistiques", "Art. 6.1.f — intérêt légitime de Corpshore", "13 mois (données agrégées anonymisées)", "Vercel Analytics (USA)"],
                      ["Sécurité et prévention de la fraude", "Art. 6.1.f — intérêt légitime", "12 mois glissants (journaux d'accès)", "Vercel Inc. (USA)"],
                      ["Conformité aux obligations légales (LCEN, RGPD, droit commercial)", "Art. 6.1.c — obligation légale", "Durée légale applicable (5 à 10 ans selon le type)", "—"],
                    ] : [
                      ["Responding to contact requests", "Art. 6.1.b — pre-contractual measures", "3 years from last contact", "Zoho CRM (India), Vercel (USA)"],
                      ["Managing job applications", "Art. 6.1.b — pre-contractual measures", "2 years from application (with consent)", "Zoho Recruit (India)"],
                      ["Sending commercial communications (newsletter)", "Art. 6.1.a — explicit consent", "Until withdrawal of consent (unsubscribe)", "Zoho Campaigns (India)"],
                      ["Improving interactive tools and statistical analysis", "Art. 6.1.f — Corpshore's legitimate interest", "13 months (anonymised aggregate data)", "Vercel Analytics (USA)"],
                      ["Security and fraud prevention", "Art. 6.1.f — legitimate interest", "12 rolling months (access logs)", "Vercel Inc. (USA)"],
                      ["Compliance with legal obligations (LCEN, GDPR, commercial law)", "Art. 6.1.c — legal obligation", "Applicable legal period (5 to 10 years depending on type)", "—"],
                    ]).map((row, i) => (
                      <tr key={i} className={`${tr_} ${i % 2 !== 0 ? "bg-[var(--color-calcaire)]" : ""}`}>
                        {row.map((cell, j) => <td key={j} className={tdCls}>{cell}</td>)}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h3 className={h3}>{isFr ? "2.5 Destinataires et sous-traitants" : "2.5 Recipients and sub-processors"}</h3>
              <p className={p}>
                {isFr
                  ? "Les données à caractère personnel collectées via corpshore.fr peuvent être transmises aux catégories de destinataires et sous-traitants suivants, dans le strict respect des finalités définies ci-dessus et sous réserve de garanties contractuelles appropriées conformément aux articles 28 et 44 à 49 du RGPD :"
                  : "Personal data collected via corpshore.fr may be transmitted to the following categories of recipients and sub-processors, in strict compliance with the purposes defined above and subject to appropriate contractual guarantees in accordance with Articles 28 and 44 to 49 of the GDPR:"}
              </p>
              <ul className="mb-4 space-y-1.5">
                {(isFr ? [
                  "Zoho Corporation Pvt. Ltd. (Inde) — plateforme CRM, recrutement et campagnes e-mail ; DPA et SCCs applicables ; transferts vers l'Inde encadrés par des CCT conformes à la décision 2021/914/UE",
                  "Vercel Inc. (États-Unis) — hébergement du site et journaux d'accès ; DPA signé ; CCT modulaires applicables pour les transferts vers les USA",
                  "Cloudflare Inc. (États-Unis) — protection anti-bot (Turnstile) pour le formulaire de contact ; traitements limités aux données de session",
                  "Calendly, LLC (États-Unis) — planification de rendez-vous ; les données saisies dans le widget Calendly sont transmises directement à Calendly selon ses propres conditions d'utilisation",
                  "Équipes internes Corpshore — accès limité au personnel habilité (commerciaux, équipes talent, direction) selon le principe du moindre privilège",
                  "Autorités judiciaires et administratives — sur réquisition judiciaire ou administrative dans les conditions prévues par la loi",
                ] : [
                  "Zoho Corporation Pvt. Ltd. (India) — CRM, recruitment and email campaign platform; DPA and SCCs applicable; transfers to India covered by CCTs compliant with Decision 2021/914/EU",
                  "Vercel Inc. (United States) — website hosting and access logs; signed DPA; modular SCCs applicable for transfers to the USA",
                  "Cloudflare Inc. (United States) — anti-bot protection (Turnstile) for the contact form; processing limited to session data",
                  "Calendly, LLC (United States) — appointment scheduling; data entered in the Calendly widget is transmitted directly to Calendly under its own terms of use",
                  "Internal Corpshore teams — access limited to authorised personnel (sales, talent teams, management) on a need-to-know basis",
                  "Judicial and administrative authorities — upon judicial or administrative requisition under the conditions provided for by law",
                ]).map(item => (
                  <li key={item} className={li}><span className={dot}>▸</span><span>{item}</span></li>
                ))}
              </ul>

              <h3 className={h3}>{isFr ? "2.6 Transferts internationaux de données" : "2.6 International data transfers"}</h3>
              <p className={p}>
                {isFr
                  ? "Certains des sous-traitants de Corpshore sont établis en dehors de l'Espace Économique Européen (EEE). Dans ce cas, Corpshore s'assure que ces transferts sont encadrés par des garanties appropriées conformément au chapitre V du RGPD, et notamment par les Clauses Contractuelles Types (CCT) adoptées par la Commission européenne le 4 juin 2021 (Décision d'exécution (UE) 2021/914). Pour les transferts vers les États-Unis, Corpshore se fonde sur les CCT modulaires couplées à une Transfer Impact Assessment (TIA) documentant l'absence de risque substantiel pour les droits et libertés des personnes concernées au regard de la législation américaine applicable (FISA, EO 12333). Pour les transferts vers l'Inde (Zoho), les CCT sont complétées par des mesures contractuelles supplémentaires tenant compte des spécificités du droit indien de la protection des données (PDPB/DPDPA 2023)."
                  : "Some of Corpshore's sub-processors are established outside the European Economic Area (EEA). In such cases, Corpshore ensures that these transfers are covered by appropriate safeguards in accordance with Chapter V of the GDPR, and in particular by the Standard Contractual Clauses (SCCs) adopted by the European Commission on 4 June 2021 (Implementing Decision (EU) 2021/914). For transfers to the United States, Corpshore relies on modular SCCs coupled with a Transfer Impact Assessment (TIA) documenting the absence of a substantial risk to the rights and freedoms of data subjects in light of applicable US legislation (FISA, EO 12333). For transfers to India (Zoho), the SCCs are supplemented by additional contractual measures taking into account the specificities of Indian data protection law (PDPB/DPDPA 2023)."}
              </p>

              <h3 className={h3}>{isFr ? "2.7 Droits des personnes concernées" : "2.7 Data subjects' rights"}</h3>
              <p className={p}>
                {isFr
                  ? "Conformément aux articles 15 à 22 du RGPD et à la loi n° 78-17 du 6 janvier 1978 modifiée (Loi Informatique et Libertés), toute personne dont les données sont traitées par Corpshore dispose des droits suivants, qu'elle peut exercer à tout moment en contactant le DPO à l'adresse "
                  : "In accordance with Articles 15 to 22 of the GDPR and French Law No. 78-17 of 6 January 1978 as amended (Data Protection Act), any person whose data is processed by Corpshore has the following rights, which they may exercise at any time by contacting the DPO at "}
                <a href={`mailto:${SITE.emailDpo}`} className="text-[var(--color-marine-800)] hover:underline">{SITE.emailDpo}</a>
                {isFr ? " :" : ":"}
              </p>
              <div className="overflow-x-auto mb-6">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-[var(--color-marine-800)] text-white">
                      {(isFr ? ["Droit", "Article RGPD", "Description"] : ["Right", "GDPR Article", "Description"]).map(h => (
                        <th key={h} className={thCls}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {(isFr ? [
                      ["Accès", "Art. 15", "Obtenir une copie de vos données personnelles et des informations sur leur traitement"],
                      ["Rectification", "Art. 16", "Faire corriger vos données inexactes ou incomplètes"],
                      ["Effacement (droit à l'oubli)", "Art. 17", "Demander la suppression de vos données dans les cas prévus par la loi"],
                      ["Limitation", "Art. 18", "Demander la suspension temporaire d'un traitement en cas de contestation"],
                      ["Portabilité", "Art. 20", "Recevoir vos données dans un format structuré et lisible par machine"],
                      ["Opposition", "Art. 21", "Vous opposer à un traitement fondé sur l'intérêt légitime ou à des fins de prospection"],
                      ["Retrait du consentement", "Art. 7(3)", "Retirer votre consentement à tout moment pour les traitements fondés sur celui-ci"],
                      ["Directives post-mortem", "Art. 85 LIL", "Définir le sort de vos données après votre décès"],
                    ] : [
                      ["Access", "Art. 15", "Obtain a copy of your personal data and information about their processing"],
                      ["Rectification", "Art. 16", "Have your inaccurate or incomplete data corrected"],
                      ["Erasure (right to be forgotten)", "Art. 17", "Request deletion of your data in the cases provided for by law"],
                      ["Restriction", "Art. 18", "Request temporary suspension of processing in cases of dispute"],
                      ["Portability", "Art. 20", "Receive your data in a structured, machine-readable format"],
                      ["Objection", "Art. 21", "Object to processing based on legitimate interest or for prospecting purposes"],
                      ["Withdrawal of consent", "Art. 7(3)", "Withdraw your consent at any time for processing based on it"],
                      ["Post-mortem instructions", "Art. 85 LIL", "Define what happens to your data after your death"],
                    ]).map((row, i) => (
                      <tr key={i} className={`${tr_} ${i % 2 !== 0 ? "bg-[var(--color-calcaire)]" : ""}`}>
                        {row.map((cell, j) => <td key={j} className={tdCls}>{cell}</td>)}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className={p}>
                {isFr
                  ? "Corpshore est susceptible de vous demander une justification de votre identité (copie d'un document officiel) avant de donner suite à votre demande, afin de prévenir toute usurpation d'identité. En cas de non-réponse satisfaisante de la part de Corpshore dans les trente jours, ou si vous estimez que vos droits ne sont pas respectés, vous avez le droit d'introduire une réclamation auprès de la Commission Nationale de l'Informatique et des Libertés (CNIL), 3 Place de Fontenoy – TSA 80715 – 75334 Paris Cedex 07, accessible en ligne sur www.cnil.fr. Les personnes résidant dans un autre État membre de l'UE peuvent également saisir l'autorité de contrôle compétente de leur pays de résidence."
                  : "Corpshore may ask for proof of your identity (copy of an official document) before responding to your request, in order to prevent identity theft. If Corpshore does not respond satisfactorily within thirty days, or if you believe your rights are not being respected, you have the right to lodge a complaint with the French Data Protection Authority (CNIL), 3 Place de Fontenoy – TSA 80715 – 75334 Paris Cedex 07, accessible online at www.cnil.fr. Persons residing in another EU Member State may also contact the competent supervisory authority in their country of residence."}
              </p>

              <h3 className={h3}>{isFr ? "2.8 Sécurité des données" : "2.8 Data security"}</h3>
              <p className={p}>
                {isFr
                  ? "Corpshore met en œuvre des mesures techniques et organisationnelles appropriées pour garantir la sécurité des données à caractère personnel traitées, conformément à l'article 32 du RGPD, en tenant compte de l'état de l'art, des coûts de mise en œuvre et de la nature, de la portée, du contexte et des finalités des traitements, ainsi que des risques pour les droits et libertés des personnes. Ces mesures incluent notamment : le chiffrement des données en transit (TLS 1.3) et au repos, le contrôle des accès fondé sur les rôles (RBAC) et le principe du moindre privilège, la pseudonymisation des données analytiques, des audits de sécurité réguliers, une procédure de gestion des violations de données respectant les délais de notification imposés par l'article 33 du RGPD (notification à la CNIL dans les 72 heures) et l'article 34 (information des personnes concernées en cas de risque élevé), ainsi que des formations régulières du personnel sur la sécurité et la confidentialité des données."
                  : "Corpshore implements appropriate technical and organisational measures to ensure the security of personal data processed, in accordance with Article 32 of the GDPR, taking into account the state of the art, implementation costs, and the nature, scope, context and purposes of processing, as well as risks to the rights and freedoms of individuals. These measures include: encryption of data in transit (TLS 1.3) and at rest, role-based access control (RBAC) and the principle of least privilege, pseudonymisation of analytical data, regular security audits, a data breach management procedure respecting the notification deadlines imposed by Article 33 of the GDPR (notification to the CNIL within 72 hours) and Article 34 (notification to data subjects in the event of high risk), and regular staff training on data security and confidentiality."}
              </p>

              <h3 className={h3}>{isFr ? "2.9 Décisions automatisées et profilage" : "2.9 Automated decisions and profiling"}</h3>
              <p className={p}>
                {isFr
                  ? "Corpshore n'effectue aucun traitement de profilage ou de prise de décision entièrement automatisée au sens de l'article 22 du RGPD à l'égard des personnes utilisant le site corpshore.fr. Les outils interactifs disponibles sur le site (calculateur, simulateur, diagnostic) produisent des résultats algorithmiques fournis à titre informatif uniquement et nécessitent dans tous les cas l'intervention d'un consultant Corpshore pour déboucher sur une proposition commerciale ou une relation contractuelle. Aucune décision impactant de manière significative une personne physique n'est prise sur la seule base des résultats de ces outils."
                  : "Corpshore does not carry out any profiling or entirely automated decision-making within the meaning of Article 22 of the GDPR with respect to persons using the site corpshore.fr. The interactive tools available on the Site (calculator, planner, assessment) produce algorithmic results provided for information purposes only and always require the intervention of a Corpshore consultant before leading to a commercial proposal or contractual relationship. No decision significantly affecting a natural person is made solely on the basis of the results of these tools."}
              </p>
            </section>


            {/* ═══════════════════════════════════════════
                §3  CGU
               ═══════════════════════════════════════════ */}
            <section id="s3">
              <h2 className={h2}>
                {isFr ? "3. Conditions générales d'utilisation (CGU)" : "3. Terms of Use"}
              </h2>

              <h3 className={h3}>{isFr ? "3.1 Objet et acceptation" : "3.1 Purpose and acceptance"}</h3>
              <p className={p}>
                {isFr
                  ? "Les présentes Conditions Générales d'Utilisation (ci-après « CGU ») ont pour objet de définir les conditions d'accès et d'utilisation du site corpshore.fr (ci-après « le Site ») ainsi que des services et outils mis à la disposition des utilisateurs. Elles s'appliquent à tout utilisateur accédant au Site, qu'il soit un professionnel (B2B) ou un particulier, quelle que soit sa localisation géographique. L'accès au Site implique l'acceptation pleine et entière des présentes CGU sans réserve ni restriction. Si vous n'acceptez pas les présentes CGU dans leur intégralité, vous devez renoncer à utiliser le Site. Corpshore se réserve le droit de modifier les présentes CGU à tout moment, les modifications prenant effet dès leur publication sur le Site. L'utilisation continue du Site après modification des CGU vaut acceptation des nouvelles conditions."
                  : "These Terms of Use (hereinafter 'the Terms') aim to define the conditions of access to and use of the site corpshore.fr (hereinafter 'the Site') and the services and tools made available to users. They apply to any user accessing the Site, whether a professional (B2B) or an individual, regardless of their geographical location. Access to the Site implies full and unconditional acceptance of these Terms. If you do not accept these Terms in their entirety, you must refrain from using the Site. Corpshore reserves the right to modify these Terms at any time, modifications taking effect upon publication on the Site. Continued use of the Site after modification of the Terms constitutes acceptance of the new conditions."}
              </p>

              <h3 className={h3}>{isFr ? "3.2 Accès au Site et disponibilité" : "3.2 Access to the Site and availability"}</h3>
              <p className={p}>
                {isFr
                  ? "Le Site est accessible gratuitement à tout utilisateur disposant d'un accès à internet. Les frais afférents à cet accès (matériel, logiciels, abonnement internet) sont exclusivement à la charge de l'utilisateur. Corpshore met en œuvre tous les moyens raisonnables pour assurer la disponibilité continue du Site, mais ne peut garantir une disponibilité ininterrompue ni exclure les interruptions liées à des opérations de maintenance, à des pannes techniques, à des attaques informatiques (DDoS, etc.) ou à des cas de force majeure. Corpshore se réserve le droit de limiter, suspendre ou interrompre l'accès au Site ou à certaines de ses fonctionnalités à tout moment et sans préavis, notamment en cas de manquement grave d'un utilisateur aux présentes CGU. Les utilisateurs sont seuls responsables des équipements et de la connexion internet nécessaires à l'accès au Site."
                  : "The Site is accessible free of charge to any user with internet access. The costs of such access (hardware, software, internet subscription) are solely the responsibility of the user. Corpshore implements all reasonable means to ensure continuous Site availability, but cannot guarantee uninterrupted availability or rule out interruptions related to maintenance, technical failures, cyberattacks (DDoS, etc.) or force majeure events. Corpshore reserves the right to limit, suspend or interrupt access to the Site or some of its features at any time and without notice, in particular in the event of a serious breach by a user of these Terms. Users are solely responsible for the equipment and internet connection necessary for access to the Site."}
              </p>

              <h3 className={h3}>{isFr ? "3.3 Utilisation des outils interactifs" : "3.3 Use of interactive tools"}</h3>
              <p className={p}>
                {isFr
                  ? "Le Site met à disposition six outils interactifs à titre gratuit et informatif : (i) un calculateur d'économies permettant d'estimer le différentiel de coût entre une équipe internalisée en France et une équipe Corpshore ; (ii) un comparateur de modèles de livraison ; (iii) un diagnostic de maturité en matière d'externalisation ; (iv) un simulateur d'effectif basé sur une approximation de la formule d'Erlang C ; (v) un constructeur de configuration SLA ; et (vi) un vérificateur de conformité RGPD. Ces outils utilisent des données et des paramètres moyens de marché et leurs résultats sont fournis à titre indicatif uniquement. Ils ne constituent ni une offre commerciale, ni un engagement contractuel, ni un conseil professionnel. Les résultats peuvent varier significativement en fonction des spécificités de votre organisation. Corpshore déconseille expressément toute prise de décision stratégique ou d'investissement fondée exclusivement sur les résultats de ces outils sans validation préalable par un consultant qualifié."
                  : "The Site makes six interactive tools available free of charge for information purposes: (i) a savings calculator to estimate the cost differential between an in-house French team and a Corpshore team; (ii) a delivery model comparator; (iii) an outsourcing maturity assessment; (iv) a workforce planner based on an Erlang C approximation; (v) an SLA configuration builder; and (vi) a GDPR compliance checker. These tools use average market data and parameters, and their results are provided for information purposes only. They do not constitute a commercial offer, contractual commitment or professional advice. Results may vary significantly depending on your organisation's specifics. Corpshore expressly advises against making strategic or investment decisions based solely on these tool results without prior validation by a qualified consultant."}
              </p>

              <h3 className={h3}>{isFr ? "3.4 Comportements prohibés" : "3.4 Prohibited conduct"}</h3>
              <p className={p}>
                {isFr ? "L'utilisation du Site est soumise au respect des présentes CGU ainsi que de l'ensemble des lois et réglementations applicables. Il est notamment interdit :" : "Use of the Site is subject to compliance with these Terms and all applicable laws and regulations. In particular, it is prohibited to:"}
              </p>
              <ul className="mb-4 space-y-1.5">
                {(isFr ? [
                  "D'utiliser le Site à des fins illicites, frauduleuses, ou contraires à l'ordre public et aux bonnes mœurs",
                  "De tenter d'obtenir un accès non autorisé aux systèmes informatiques de Corpshore, à ses bases de données ou à ses réseaux",
                  "D'introduire ou de diffuser des virus informatiques, chevaux de Troie, logiciels malveillants, ou tout autre code nuisible via le Site",
                  "D'effectuer du scraping, de l'exploration de données (data mining) ou toute extraction automatisée de contenu sans autorisation expresse",
                  "D'utiliser les outils interactifs du Site pour constituer des bases de données concurrentielles ou à des fins d'intelligence économique hostile",
                  "D'usurper l'identité de Corpshore ou de ses représentants, ou de créer une confusion avec la marque Corpshore",
                  "D'utiliser le Site pour harceler, menacer ou diffamer Corpshore, ses employés, clients ou partenaires",
                  "De contourner ou de tenter de contourner les mesures de sécurité et de protection mises en place par Corpshore, notamment le système Turnstile de protection anti-bot",
                ] : [
                  "Using the Site for unlawful, fraudulent or public order-contrary purposes",
                  "Attempting to gain unauthorised access to Corpshore's computer systems, databases or networks",
                  "Introducing or distributing computer viruses, Trojans, malware or any other harmful code via the Site",
                  "Scraping, data mining or any automated content extraction without express authorisation",
                  "Using the Site's interactive tools to build competitive databases or for hostile competitive intelligence purposes",
                  "Impersonating Corpshore or its representatives, or creating confusion with the Corpshore brand",
                  "Using the Site to harass, threaten or defame Corpshore, its employees, clients or partners",
                  "Circumventing or attempting to circumvent security measures put in place by Corpshore, including the Turnstile anti-bot protection system",
                ]).map(item => (
                  <li key={item} className={li}><span className={dot}>▸</span><span>{item}</span></li>
                ))}
              </ul>
              <p className={p}>
                {isFr
                  ? "Tout manquement à ces interdictions engage la responsabilité civile et, le cas échéant, pénale de son auteur. Corpshore se réserve le droit de prendre toute mesure conservatoire appropriée, d'engager toute procédure judiciaire nécessaire et de coopérer avec les autorités compétentes en cas de violation des présentes CGU."
                  : "Any breach of these prohibitions entails the civil and, where applicable, criminal liability of the perpetrator. Corpshore reserves the right to take any appropriate interim measures, initiate any necessary legal proceedings and cooperate with competent authorities in the event of a breach of these Terms."}
              </p>

              <h3 className={h3}>{isFr ? "3.5 Garanties et responsabilité de l'utilisateur" : "3.5 User warranties and liability"}</h3>
              <p className={p}>
                {isFr
                  ? "En utilisant le Site, vous déclarez et garantissez que (i) vous avez la capacité juridique d'accepter les présentes CGU, (ii) les informations que vous communiquez via le formulaire de contact sont exactes, complètes et à jour, (iii) vous utilisez le Site pour des finalités professionnelles légitimes ou pour obtenir des informations sur les services de Corpshore, (iv) vous n'utilisez pas le Site au nom d'une organisation en situation de concurrence déloyale avec Corpshore. Vous êtes seul responsable des données et informations que vous transmettez à Corpshore via le Site, et vous vous engagez à ne pas transmettre de données appartenant à des tiers sans leur consentement préalable."
                  : "By using the Site, you declare and warrant that (i) you have the legal capacity to accept these Terms, (ii) the information you provide via the contact form is accurate, complete and up to date, (iii) you use the Site for legitimate professional purposes or to obtain information about Corpshore's services, (iv) you do not use the Site on behalf of an organisation engaged in unfair competition with Corpshore. You are solely responsible for the data and information you transmit to Corpshore via the Site, and you undertake not to transmit data belonging to third parties without their prior consent."}
              </p>

              <h3 className={h3}>{isFr ? "3.6 Modification et résiliation" : "3.6 Modification and termination"}</h3>
              <p className={p}>
                {isFr
                  ? "Corpshore se réserve le droit de modifier, compléter ou supprimer tout ou partie du contenu du Site, des outils interactifs ou des présentes CGU à tout moment et sans préavis. Les modifications entrent en vigueur dès leur publication sur le Site. Il appartient à chaque utilisateur de consulter régulièrement les CGU pour prendre connaissance des éventuelles modifications. Corpshore peut mettre fin à l'accès d'un utilisateur au Site à tout moment, sans préavis et sans indemnité, notamment en cas de manquement aux présentes CGU. Les dispositions des présentes CGU relatives à la propriété intellectuelle, à la limitation de responsabilité et au droit applicable survivent à toute résiliation ou cessation d'utilisation du Site."
                  : "Corpshore reserves the right to modify, supplement or delete all or part of the Site's content, interactive tools or these Terms at any time and without notice. Modifications take effect upon publication on the Site. It is the responsibility of each user to regularly consult the Terms to learn of any modifications. Corpshore may terminate a user's access to the Site at any time, without notice and without compensation, in particular in the event of a breach of these Terms. The provisions of these Terms relating to intellectual property, limitation of liability and applicable law survive any termination or cessation of use of the Site."}
              </p>

              <h3 className={h3}>{isFr ? "3.7 Droit applicable et compétence juridictionnelle" : "3.7 Applicable law and jurisdiction"}</h3>
              <p className={p}>
                {isFr
                  ? "Les présentes CGU sont régies et interprétées conformément au droit français. En cas de litige relatif à l'interprétation ou à l'exécution des présentes CGU, et à défaut de résolution amiable dans un délai de trente (30) jours suivant la notification du litige, les parties conviennent d'attribuer compétence exclusive aux tribunaux compétents de Paris, nonobstant la pluralité de défendeurs ou l'appel en garantie. Cette attribution de juridiction ne prive pas les consommateurs résidant dans l'Union européenne des protections que leur confère la réglementation de leur État membre de résidence."
                  : "These Terms are governed by and interpreted in accordance with French law. In the event of a dispute relating to the interpretation or performance of these Terms, and in the absence of an amicable resolution within thirty (30) days of notification of the dispute, the parties agree to submit exclusively to the competent courts of Paris, notwithstanding multiple defendants or third-party claims. This choice of jurisdiction does not deprive consumers residing in the European Union of the protections afforded by the regulations of their Member State of residence."}
              </p>
            </section>


            {/* ═══════════════════════════════════════════
                §4  CGPS — BPO / IT / IA
               ═══════════════════════════════════════════ */}
            <section id="s4">
              <h2 className={h2}>
                {isFr
                  ? "4. Conditions générales de prestation de services BPO, IT & IA"
                  : "4. General Terms of Service — BPO, IT & AI"}
              </h2>

              <div className="bg-[var(--color-calcaire)] border border-[var(--color-border)] rounded-[var(--radius-lg)] p-5 mb-6">
                <p className="text-sm text-[var(--color-granit)]">
                  {isFr
                    ? "Les présentes Conditions Générales de Prestation de Services (« CGPS ») s'appliquent à toutes les prestations réalisées par Corpshore Solutions Corporation dans le cadre de ses services d'externalisation BPO, IT et IA. Elles s'appliquent par défaut en l'absence de contrat-cadre (Master Services Agreement) spécifique signé entre les parties. En cas de contradiction entre les présentes CGPS et les termes d'un contrat-cadre ou d'un bon de commande spécifique, les termes du contrat-cadre prévalent."
                    : "These General Terms of Service ('GTS') apply to all services performed by Corpshore Solutions Corporation in the context of its BPO, IT and AI outsourcing services. They apply by default in the absence of a specific Master Services Agreement signed between the parties. In the event of a conflict between these GTS and the terms of a specific Master Services Agreement or purchase order, the terms of the Master Services Agreement prevail."}
                </p>
              </div>

              <h3 className={h3}>{isFr ? "4.1 Définitions" : "4.1 Definitions"}</h3>
              <ul className="mb-4 space-y-1.5">
                {(isFr ? [
                  "« Client » : toute personne morale ayant passé commande de prestations auprès de Corpshore conformément aux présentes CGPS",
                  "« Livrables » : tous documents, rapports, logiciels, codes sources, modèles de données, processus documentés ou autres résultats produits par Corpshore dans le cadre d'une prestation",
                  "« Données Client » : données à caractère personnel et/ou confidentielles appartenant au Client ou à ses propres clients, traitées par Corpshore dans le cadre des prestations",
                  "« SLA » (Service Level Agreement) : accord sur les niveaux de service définissant les engagements de performance mesurables de Corpshore",
                  "« Devis » : document contractuel émis par Corpshore précisant la nature, le périmètre, le coût et les délais des prestations proposées",
                  "« FTE » (Full-Time Equivalent) : unité de mesure correspondant à un équivalent temps plein travaillant selon les horaires convenus",
                  "« Hub de livraison » : site opérationnel de Corpshore depuis lequel les prestations sont réalisées",
                  "« Données Sensibles » : données à caractère personnel au sens de l'article 9 du RGPD, données de santé, données bancaires, données couvertes par un secret professionnel",
                ] : [
                  "'Client': any legal entity having placed an order for services with Corpshore in accordance with these GTS",
                  "'Deliverables': all documents, reports, software, source code, data models, documented processes or other results produced by Corpshore in the context of a service",
                  "'Client Data': personal data and/or confidential data belonging to the Client or its own clients, processed by Corpshore in the context of services",
                  "'SLA' (Service Level Agreement): agreement on service levels defining Corpshore's measurable performance commitments",
                  "'Quote': contractual document issued by Corpshore specifying the nature, scope, cost and timelines of proposed services",
                  "'FTE' (Full-Time Equivalent): unit of measurement corresponding to a full-time equivalent working according to agreed hours",
                  "'Delivery Hub': Corpshore operational site from which services are performed",
                  "'Sensitive Data': personal data within the meaning of Article 9 of the GDPR, health data, banking data, data covered by professional secrecy",
                ]).map(item => (
                  <li key={item} className={li}><span className={dot}>▸</span><span>{item}</span></li>
                ))}
              </ul>

              <h3 className={h3}>{isFr ? "4.2 Formation du contrat et commande" : "4.2 Contract formation and ordering"}</h3>
              <p className={p}>
                {isFr
                  ? "Toute prestation de Corpshore est précédée d'un devis détaillé émis par Corpshore à la suite d'une analyse des besoins du Client. Le devis précise le périmètre des prestations, les livrables attendus, les indicateurs SLA retenus, les ressources allouées (nombre de FTE, profils), le prix unitaire et le prix total, les modalités de paiement, la durée de la prestation, les conditions de renouvellement et les éventuels prérequis à la charge du Client. La signature du devis ou du bon de commande correspondant par le Client constitue l'acceptation des présentes CGPS ainsi que des conditions particulières figurant au devis. Tout avenant au contrat doit faire l'objet d'un nouveau devis signé par les deux parties. En l'absence d'acception écrite signée, aucune prestation ne peut démarrer."
                  : "All Corpshore services are preceded by a detailed quote issued by Corpshore following an analysis of the Client's needs. The quote specifies the service scope, expected deliverables, SLA indicators selected, allocated resources (number of FTEs, profiles), unit price and total price, payment terms, service duration, renewal conditions and any prerequisites the Client must fulfil. Signature of the quote or corresponding purchase order by the Client constitutes acceptance of these GTS and the specific conditions in the quote. Any amendment to the contract must be the subject of a new quote signed by both parties. In the absence of signed written acceptance, no services may commence."}
              </p>

              <h3 className={h3}>{isFr ? "4.3 Niveaux de service et pénalités" : "4.3 Service levels and penalties"}</h3>
              <p className={p}>
                {isFr
                  ? "Les niveaux de service (SLA) applicables à chaque prestation sont définis dans le devis ou dans une annexe SLA spécifique. Les SLA peuvent porter sur des indicateurs tels que : le taux de décrochage téléphonique, le CSAT (Customer Satisfaction Score), le FCR (First Contact Resolution), le taux d'erreur sur les traitements back-office, les délais de réponse aux emails, la disponibilité des systèmes informatiques, ou tout autre indicateur pertinent selon le type de prestation. En cas de non-respect d'un SLA contractualisé, des pénalités peuvent s'appliquer selon les modalités définies dans le devis ou le contrat-cadre. Les pénalités sont plafonnées à 10 % du montant mensuel de la prestation concernée, sauf accord contraire explicite dans le contrat-cadre. Les pénalités ne peuvent pas se cumuler au-delà de ce plafond mensuel et ne sont pas applicables en cas de défaillance imputable au Client, à un sous-traitant désigné par le Client, ou à un cas de force majeure."
                  : "Service levels (SLAs) applicable to each service are defined in the quote or in a specific SLA appendix. SLAs may cover indicators such as: telephone answer rate, CSAT (Customer Satisfaction Score), FCR (First Contact Resolution), back-office processing error rate, email response times, IT system availability, or any other relevant indicator depending on the type of service. In the event of a contractual SLA breach, penalties may apply according to the terms defined in the quote or Master Services Agreement. Penalties are capped at 10% of the monthly amount for the service concerned, unless otherwise explicitly agreed in the Master Services Agreement. Penalties cannot accumulate beyond this monthly cap and are not applicable in the event of a failure attributable to the Client, a sub-contractor designated by the Client, or a force majeure event."}
              </p>

              <h3 className={h3}>{isFr ? "4.4 Prix, facturation et paiement" : "4.4 Pricing, invoicing and payment"}</h3>
              <p className={p}>
                {isFr
                  ? "Les prix des prestations sont exprimés en euros HT (hors taxes) et sont indiqués dans le devis. Corpshore facture ses prestations selon les modalités suivantes : (i) pour les prestations récurrentes (BPO, support IT, équipes dédiées), facturation mensuelle à terme échu sur la base des FTE effectivement déployés et des heures travaillées selon le SLA convenu ; (ii) pour les projets ponctuels (développement IT, migration, mise en œuvre IA), facturation par jalons définis dans le devis. Les factures sont payables à réception, sauf conditions particulières négociées dans le contrat-cadre, avec un délai maximal de 30 jours à compter de la date d'émission conformément à la loi n° 2001-420 du 15 mai 2001 relative aux nouvelles régulations économiques (NRE) et à la loi LME. Tout retard de paiement entraîne de plein droit l'application d'intérêts de retard au taux légal en vigueur majoré de 10 points, ainsi qu'une indemnité forfaitaire de recouvrement de 40 euros. Les prix sont révisables annuellement en fonction de l'indice SYNTEC ou de tout autre indice sectoriel pertinent."
                  : "Service prices are expressed in euros excluding tax and are indicated in the quote. Corpshore invoices its services as follows: (i) for recurring services (BPO, IT support, dedicated teams), monthly invoicing in arrears based on FTEs actually deployed and hours worked in accordance with the agreed SLA; (ii) for one-off projects (IT development, migration, AI implementation), invoicing by milestones defined in the quote. Invoices are payable upon receipt, unless particular conditions have been negotiated in the Master Services Agreement, with a maximum period of 30 days from the invoice date in accordance with French Commercial Law (NRE Act and LME Act). Any late payment automatically results in the application of late interest at the applicable legal rate plus 10 percentage points, as well as a flat-rate collection fee of €40. Prices are revisable annually based on the SYNTEC index or any other relevant sector index."}
              </p>

              <h3 className={h3}>{isFr ? "4.5 Propriété intellectuelle des livrables" : "4.5 Intellectual property of deliverables"}</h3>
              <p className={p}>
                {isFr
                  ? "Sauf disposition contraire expressément stipulée dans le devis ou le contrat-cadre, les droits de propriété intellectuelle afférents aux livrables spécifiques développés par Corpshore pour le compte d'un Client sont cédés à ce Client au fur et à mesure des paiements correspondants, selon les modalités de l'article L.131-3 du CPI. Cette cession porte sur les droits d'exploitation, de reproduction, de représentation, de modification et d'adaptation des livrables, pour le territoire mondial et pour la durée légale de protection. Corpshore conserve en tout état de cause ses droits sur les outils, méthodologies, processus, cadres réutilisables, bibliothèques de code et savoir-faire génériques développés indépendamment de la relation contractuelle avec le Client, qui constituent le patrimoine technologique de Corpshore."
                  : "Unless otherwise expressly stipulated in the quote or Master Services Agreement, the intellectual property rights relating to specific deliverables developed by Corpshore on behalf of a Client are transferred to that Client as corresponding payments are made, in accordance with Article L.131-3 of the CPI. This transfer covers the rights of exploitation, reproduction, representation, modification and adaptation of deliverables, for the worldwide territory and for the legal protection period. In any event, Corpshore retains its rights to tools, methodologies, processes, reusable frameworks, code libraries and generic know-how developed independently of the contractual relationship with the Client, which constitute Corpshore's technological assets."}
              </p>

              <h3 className={h3}>{isFr ? "4.6 Confidentialité" : "4.6 Confidentiality"}</h3>
              <p className={p}>
                {isFr
                  ? "Corpshore s'engage à maintenir la stricte confidentialité de toutes les informations non publiques divulguées par le Client dans le cadre de la relation contractuelle, notamment les informations relatives à son activité, ses clients, ses processus, ses données financières et ses projets stratégiques. Cet engagement de confidentialité s'applique à l'ensemble du personnel de Corpshore intervenant sur la prestation et survit à la résiliation ou à l'expiration du contrat pendant une durée de cinq (5) ans. Corpshore ne peut divulguer ces informations à des tiers, y compris à ses sous-traitants, qu'avec l'accord préalable écrit du Client et sous réserve que ces tiers soient eux-mêmes soumis à des engagements de confidentialité équivalents. Font exception à cet engagement les informations tombées dans le domaine public sans faute de Corpshore, les informations connues de Corpshore avant la relation contractuelle, et les divulgations imposées par une obligation légale ou réglementaire."
                  : "Corpshore undertakes to maintain strict confidentiality over all non-public information disclosed by the Client in the context of the contractual relationship, including information relating to its business, clients, processes, financial data and strategic projects. This confidentiality commitment applies to all Corpshore personnel involved in the service and survives termination or expiry of the contract for five (5) years. Corpshore may only disclose this information to third parties, including its sub-contractors, with the Client's prior written consent and provided these third parties are themselves subject to equivalent confidentiality commitments. Exceptions apply to information that has entered the public domain without Corpshore's fault, information known to Corpshore before the contractual relationship, and disclosures required by a legal or regulatory obligation."}
              </p>

              <h3 className={h3}>{isFr ? "4.7 Responsabilité et assurance" : "4.7 Liability and insurance"}</h3>
              <p className={p}>
                {isFr
                  ? "La responsabilité de Corpshore pour tout dommage direct découlant de l'exécution ou de l'inexécution des prestations est plafonnée au montant des sommes effectivement perçues par Corpshore au titre des prestations faisant l'objet du litige au cours des douze (12) mois précédant l'événement dommageable. Cette limitation de responsabilité ne s'applique pas en cas de dol, de faute lourde, de décès ou de blessures corporelles causés par la négligence de Corpshore, ni aux obligations de confidentialité et de protection des données. Corpshore exclut expressément toute responsabilité pour les dommages indirects, y compris les pertes de chiffre d'affaires, pertes de profits, pertes de clientèle, atteinte à l'image de marque ou perte de chance. Corpshore maintient une police d'assurance de responsabilité civile professionnelle couvrant les risques liés à ses activités de prestataire de services BPO, IT et IA, dont les conditions sont disponibles sur demande du Client."
                  : "Corpshore's liability for any direct damage arising from the performance or non-performance of services is capped at the amount of sums actually received by Corpshore for the services in dispute during the twelve (12) months preceding the damaging event. This limitation of liability does not apply in cases of fraud, gross negligence, death or bodily injury caused by Corpshore's negligence, nor to confidentiality and data protection obligations. Corpshore expressly excludes all liability for indirect damages, including loss of revenue, loss of profits, loss of customers, brand damage or loss of opportunity. Corpshore maintains professional liability insurance covering risks related to its BPO, IT and AI service provider activities, the terms of which are available upon Client request."}
              </p>

              <h3 className={h3}>{isFr ? "4.8 Dispositions spécifiques aux services d'IA" : "4.8 AI-specific provisions"}</h3>
              <p className={p}>
                {isFr
                  ? "Pour les prestations impliquant le développement, le déploiement ou l'utilisation de systèmes d'intelligence artificielle (ci-après « systèmes IA »), les dispositions suivantes s'appliquent en complément des présentes CGPS. Corpshore conçoit, déploie et opère exclusivement des systèmes IA classifiés à risque minimal ou à risque limité selon la taxonomie du Règlement (UE) 2024/1689 sur l'intelligence artificielle (EU AI Act). Corpshore ne déploie pas de systèmes IA à haut risque au sens de l'annexe III de l'EU AI Act (incluant les systèmes d'IA dans les domaines de l'emploi, de la gestion de la main-d'œuvre, de la biométrie, de l'infrastructure critique, de l'éducation ou de la justice) sans encadrement contractuel spécifique et validation du Client. Pour les systèmes IA à risque limité déployés pour le compte du Client (notamment les chatbots, agents virtuels et systèmes de génération de contenu), Corpshore garantit la mise en œuvre des obligations de transparence imposées par l'article 52 de l'EU AI Act, notamment l'obligation d'informer les utilisateurs finaux qu'ils interagissent avec un système d'IA."
                  : "For services involving the development, deployment or use of artificial intelligence systems (hereinafter 'AI systems'), the following provisions apply in addition to these GTS. Corpshore designs, deploys and operates exclusively AI systems classified as minimal risk or limited risk under the taxonomy of Regulation (EU) 2024/1689 on artificial intelligence (EU AI Act). Corpshore does not deploy high-risk AI systems within the meaning of Annex III of the EU AI Act (including AI systems in the areas of employment, workforce management, biometrics, critical infrastructure, education or justice) without specific contractual framing and Client validation. For limited-risk AI systems deployed on the Client's behalf (including chatbots, virtual agents and content generation systems), Corpshore guarantees the implementation of transparency obligations imposed by Article 52 of the EU AI Act, including the obligation to inform end users that they are interacting with an AI system."}
              </p>
              <p className={p}>
                {isFr
                  ? "Les livrables IA (modèles entraînés, pipelines NLP, systèmes RPA, assistants IA) sont accompagnés d'une documentation technique comprenant : la description du système et de ses fonctionnalités, les données d'entraînement utilisées et leurs limites, les performances mesurées sur des jeux de test représentatifs, les cas d'usage pour lesquels le système est conçu et les usages pour lesquels il ne doit pas être utilisé, les mécanismes de supervision humaine (human-in-the-loop), ainsi que les procédures de maintenance et de mise à jour. Le Client demeure responsable de l'utilisation qu'il fait des systèmes IA développés par Corpshore et de leur conformité avec la réglementation applicable, notamment l'EU AI Act, le RGPD et les lois sectorielles pertinentes."
                  : "AI deliverables (trained models, NLP pipelines, RPA systems, AI assistants) are accompanied by technical documentation comprising: system description and functionalities, training data used and their limitations, performance measured on representative test sets, use cases for which the system is designed and uses for which it should not be used, human oversight mechanisms (human-in-the-loop), as well as maintenance and update procedures. The Client remains responsible for its use of AI systems developed by Corpshore and their compliance with applicable regulation, including the EU AI Act, GDPR and relevant sector laws."}
              </p>

              <h3 className={h3}>{isFr ? "4.9 Durée, résiliation et transition" : "4.9 Duration, termination and transition"}</h3>
              <p className={p}>
                {isFr
                  ? "Les prestations récurrentes sont conclues pour une durée initiale définie dans le devis, généralement de douze (12) mois minimum pour les équipes dédiées, avec renouvellement tacite par période successive d'un an sauf préavis de résiliation adressé par lettre recommandée avec accusé de réception au moins quatre-vingt-dix (90) jours avant l'échéance. En cas de résiliation anticipée du contrat par le Client pour convenance (sans manquement de Corpshore), le Client s'engage à régler l'intégralité des prestations correspondant à la période de préavis contractuelle, ainsi qu'une indemnité de résiliation égale à deux (2) mois de la valeur mensuelle moyenne des prestations réalisées au cours des trois derniers mois. En cas de résiliation pour faute imputable à Corpshore, la responsabilité de Corpshore est limitée conformément à l'article 4.7 ci-dessus. Corpshore s'engage à assurer une transition ordonnée pendant la période de préavis, incluant la documentation des processus, la formation des équipes successeurs et la restitution des Données Client dans les formats convenus."
                  : "Recurring services are entered into for an initial period defined in the quote, generally a minimum of twelve (12) months for dedicated teams, with automatic renewal by successive periods of one year unless a termination notice is sent by recorded delivery letter at least ninety (90) days before the deadline. In the event of early termination of the contract by the Client for convenience (without any breach by Corpshore), the Client undertakes to pay all services corresponding to the contractual notice period, as well as a termination indemnity equal to two (2) months of the average monthly value of services performed during the last three months. In the event of termination for fault attributable to Corpshore, Corpshore's liability is limited in accordance with Article 4.7 above. Corpshore undertakes to ensure an orderly transition during the notice period, including process documentation, successor team training and return of Client Data in agreed formats."}
              </p>
            </section>


            {/* ═══════════════════════════════════════════
                §5  DPA — ARTICLE 28 RGPD
               ═══════════════════════════════════════════ */}
            <section id="s5">
              <h2 className={h2}>
                {isFr
                  ? "5. Annexe traitement des données — Article 28 RGPD (DPA)"
                  : "5. Data Processing Appendix — GDPR Article 28 (DPA)"}
              </h2>

              <div className="bg-[var(--color-calcaire)] border border-[var(--color-border)] rounded-[var(--radius-lg)] p-5 mb-6">
                <p className="text-sm text-[var(--color-granit)]">
                  {isFr
                    ? "La présente Annexe de Traitement des Données (« DPA ») constitue l'accord de sous-traitance prévu à l'article 28 du RGPD pour tous les traitements de données à caractère personnel que Corpshore Solutions Corporation (« le Sous-traitant ») réalise pour le compte de ses Clients (« le Responsable du traitement ») dans le cadre des prestations BPO, IT et IA. En cas de conflit entre la présente DPA et les CGPS ou le contrat-cadre, les dispositions de la présente DPA prévalent sur les questions relatives à la protection des données."
                    : "This Data Processing Appendix ('DPA') constitutes the sub-processing agreement provided for in Article 28 of the GDPR for all personal data processing that Corpshore Solutions Corporation ('the Processor') performs on behalf of its Clients ('the Controller') in the context of BPO, IT and AI services. In the event of a conflict between this DPA and the GTS or Master Services Agreement, the provisions of this DPA prevail on matters relating to data protection."}
                </p>
              </div>

              <h3 className={h3}>{isFr ? "5.1 Objet, nature et finalité du traitement" : "5.1 Subject matter, nature and purpose of processing"}</h3>
              <p className={p}>
                {isFr
                  ? "Corpshore traite des données à caractère personnel pour le compte du Client dans le cadre des prestations définies dans le devis ou le contrat-cadre. La nature du traitement varie selon le type de prestation : (i) BPO : saisie, vérification, classification, indexation et archivage de données ; traitement de formulaires, dossiers, sinistres et commandes contenant des données personnelles des clients du Client ; (ii) IT Outsourcing : accès aux systèmes informatiques du Client susceptibles de contenir des données personnelles dans le cadre du support technique, de la maintenance, du développement et de la migration ; (iii) IA : traitement de données d'entraînement pouvant contenir des données personnelles, labellisation, annotation, développement et déploiement de modèles de traitement automatique du langage ou d'autres modèles IA utilisés pour analyser des données personnelles. Les finalités du traitement sont exclusivement celles définies par le Responsable du traitement dans le cadre de ses propres activités commerciales et opérationnelles."
                  : "Corpshore processes personal data on behalf of the Client in the context of services defined in the quote or Master Services Agreement. The nature of the processing varies depending on the type of service: (i) BPO: data entry, verification, classification, indexing and archiving; processing of forms, files, claims and orders containing the Client's clients' personal data; (ii) IT Outsourcing: access to the Client's IT systems likely to contain personal data in the context of technical support, maintenance, development and migration; (iii) AI: processing of training data potentially containing personal data, labelling, annotation, development and deployment of natural language processing models or other AI models used to analyse personal data. The purposes of processing are exclusively those defined by the Controller in the context of its own commercial and operational activities."}
              </p>

              <h3 className={h3}>{isFr ? "5.2 Instructions du responsable du traitement" : "5.2 Controller instructions"}</h3>
              <p className={p}>
                {isFr
                  ? "Corpshore traite les données à caractère personnel uniquement sur instruction documentée du Responsable du traitement, conformément à l'article 28(3)(a) du RGPD. Ces instructions sont formalisées dans le devis, le contrat-cadre, la présente DPA et tout échange écrit subséquent. Corpshore informe immédiatement le Responsable du traitement s'il estime qu'une instruction viole le RGPD ou toute autre disposition du droit de l'Union européenne ou du droit national d'un État membre. Dans ce cas, Corpshore peut suspendre l'exécution de l'instruction dans l'attente de la confirmation ou de la modification de celle-ci par le Responsable du traitement, sans que cette suspension puisse être considérée comme un manquement contractuel de la part de Corpshore."
                  : "Corpshore processes personal data only on documented instructions from the Controller, in accordance with Article 28(3)(a) of the GDPR. These instructions are formalised in the quote, Master Services Agreement, this DPA and any subsequent written exchanges. Corpshore immediately informs the Controller if it considers that an instruction violates the GDPR or any other provision of EU or Member State national law. In such cases, Corpshore may suspend execution of the instruction pending its confirmation or modification by the Controller, without this suspension being considered a contractual breach on Corpshore's part."}
              </p>

              <h3 className={h3}>{isFr ? "5.3 Mesures de sécurité (article 32 RGPD)" : "5.3 Security measures (Article 32 GDPR)"}</h3>
              <p className={p}>
                {isFr
                  ? "Corpshore met en œuvre des mesures techniques et organisationnelles appropriées pour garantir un niveau de sécurité adapté au risque des traitements réalisés pour le compte du Client, conformément à l'article 32 du RGPD. Ces mesures incluent, sans s'y limiter :"
                  : "Corpshore implements appropriate technical and organisational measures to ensure a level of security appropriate to the risk of processing carried out on behalf of the Client, in accordance with Article 32 of the GDPR. These measures include, without limitation:"}
              </p>
              <ul className="mb-4 space-y-1.5">
                {(isFr ? [
                  "Chiffrement des données en transit (TLS 1.3 minimum) et au repos (AES-256) pour toutes les données personnelles sensibles",
                  "Contrôle d'accès fondé sur les rôles (RBAC) et authentification multifacteur (MFA) obligatoire pour l'accès aux systèmes traitant des données personnelles",
                  "Journalisation et surveillance continue des accès aux données (SIEM), avec alertes automatiques en cas d'activité suspecte",
                  "Cloisonnement des environnements (développement, test, production) et anonymisation/pseudonymisation des données dans les environnements hors production",
                  "Tests de pénétration annuels réalisés par des prestataires tiers indépendants et plan de remédiation des vulnérabilités identifiées",
                  "Plan de reprise d'activité (PRA) et plan de continuité d'activité (PCA) testés régulièrement, avec objectifs de RTO/RPO définis par type de prestation",
                  "Formation obligatoire de l'ensemble du personnel aux enjeux de la sécurité des données et à la protection des données personnelles, renouvelée annuellement",
                  "Procédure documentée de gestion des violations de données (data breach) respectant les délais de l'article 33 RGPD",
                ] : [
                  "Encryption of data in transit (minimum TLS 1.3) and at rest (AES-256) for all sensitive personal data",
                  "Role-based access control (RBAC) and mandatory multi-factor authentication (MFA) for access to systems processing personal data",
                  "Continuous access logging and monitoring (SIEM), with automatic alerts in case of suspicious activity",
                  "Environment segregation (development, test, production) and anonymisation/pseudonymisation of data in non-production environments",
                  "Annual penetration tests conducted by independent third-party providers and remediation plan for identified vulnerabilities",
                  "Disaster Recovery Plan (DRP) and Business Continuity Plan (BCP) regularly tested, with RTO/RPO targets defined by service type",
                  "Mandatory training of all staff on data security and personal data protection issues, renewed annually",
                  "Documented data breach management procedure complying with Article 33 GDPR deadlines",
                ]).map(item => (
                  <li key={item} className={li}><span className={dot}>▸</span><span>{item}</span></li>
                ))}
              </ul>

              <h3 className={h3}>{isFr ? "5.4 Sous-traitants ultérieurs (article 28(2) RGPD)" : "5.4 Sub-processors (Article 28(2) GDPR)"}</h3>
              <p className={p}>
                {isFr
                  ? "Corpshore dispose d'une autorisation générale du Responsable du traitement pour engager des sous-traitants ultérieurs, sous réserve d'une information préalable du Responsable du traitement et de son droit d'objection dans les conditions de l'article 28(2) du RGPD. Corpshore impose à tout sous-traitant ultérieur les mêmes obligations en matière de protection des données que celles définies dans la présente DPA, notamment par des clauses contractuelles types ou tout autre mécanisme de transfert approprié. Les principaux sous-traitants ultérieurs susceptibles d'être engagés dans le cadre des prestations Corpshore sont les suivants :"
                  : "Corpshore has general authorisation from the Controller to engage sub-processors, subject to prior notification to the Controller and the Controller's right of objection under the conditions of Article 28(2) of the GDPR. Corpshore imposes on all sub-processors the same data protection obligations as those defined in this DPA, in particular through standard contractual clauses or any other appropriate transfer mechanism. The main sub-processors likely to be engaged in the context of Corpshore services are as follows:"}
              </p>
              <div className="overflow-x-auto mb-6">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-[var(--color-marine-800)] text-white">
                      {(isFr ? ["Sous-traitant", "Pays", "Rôle", "Mécanisme de transfert"] : ["Sub-processor", "Country", "Role", "Transfer mechanism"]).map(h => (
                        <th key={h} className={thCls}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {(isFr ? [
                      ["Vercel Inc.", "États-Unis", "Hébergement de la plateforme client et outils internes", "CCT (2021/914/UE) + TIA"],
                      ["Zoho Corporation", "Inde", "CRM, ticketing, gestion des ressources humaines", "CCT + mesures complémentaires (DPDPA 2023)"],
                      ["Hubs de livraison Corpshore", "Maroc, Côte d'Ivoire, Sénégal, Philippines, Inde, etc.", "Traitement BPO, support IT, tâches IA selon la prestation", "CCT ou décision d'adéquation selon le pays"],
                      ["Atlassian (Jira/Confluence)", "Australie / EU", "Gestion de projet et documentation interne", "CCT + sous-processeurs EU"],
                      ["Microsoft 365", "Union européenne", "Collaboration et productivité (tenant EU uniquement)", "Décision d'adéquation / garanties MS DPA"],
                    ] : [
                      ["Vercel Inc.", "United States", "Client platform and internal tool hosting", "SCCs (2021/914/EU) + TIA"],
                      ["Zoho Corporation", "India", "CRM, ticketing, HR management", "SCCs + additional measures (DPDPA 2023)"],
                      ["Corpshore delivery hubs", "Morocco, Côte d'Ivoire, Senegal, Philippines, India, etc.", "BPO processing, IT support, AI tasks per service", "SCCs or adequacy decision depending on country"],
                      ["Atlassian (Jira/Confluence)", "Australia / EU", "Project management and internal documentation", "SCCs + EU sub-processors"],
                      ["Microsoft 365", "European Union", "Collaboration and productivity (EU tenant only)", "Adequacy decision / MS DPA guarantees"],
                    ]).map((row, i) => (
                      <tr key={i} className={`${tr_} ${i % 2 !== 0 ? "bg-[var(--color-calcaire)]" : ""}`}>
                        {row.map((cell, j) => <td key={j} className={tdCls}>{cell}</td>)}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h3 className={h3}>{isFr ? "5.5 Notification des violations de données" : "5.5 Data breach notification"}</h3>
              <p className={p}>
                {isFr
                  ? "Conformément à l'article 33 du RGPD, Corpshore notifie le Responsable du traitement de toute violation de données à caractère personnel le concernant dans les meilleurs délais et, si possible, dans les soixante-douze (72) heures suivant la découverte de la violation, afin de permettre au Responsable du traitement de satisfaire à ses propres obligations de notification à la CNIL. La notification inclut, dans la mesure du possible : (i) la description de la nature de la violation, (ii) les catégories et le nombre approximatif de personnes concernées, (iii) les catégories et le nombre approximatif d'enregistrements concernés, (iv) les conséquences probables de la violation, et (v) les mesures prises ou envisagées pour remédier à la violation et atténuer ses éventuels effets négatifs. Corpshore conserve une documentation interne de toutes les violations de données, qu'elles aient ou non fait l'objet d'une notification à la CNIL, conformément à l'article 33(5) du RGPD."
                  : "In accordance with Article 33 of the GDPR, Corpshore notifies the Controller of any personal data breach affecting the Controller as soon as possible and, if possible, within seventy-two (72) hours of discovering the breach, to enable the Controller to meet its own notification obligations to the CNIL. The notification includes, to the extent possible: (i) a description of the nature of the breach, (ii) the categories and approximate number of data subjects concerned, (iii) the categories and approximate number of records concerned, (iv) the likely consequences of the breach, and (v) measures taken or planned to remedy the breach and mitigate its potential adverse effects. Corpshore maintains internal documentation of all data breaches, whether or not they have been notified to the CNIL, in accordance with Article 33(5) of the GDPR."}
              </p>

              <h3 className={h3}>{isFr ? "5.6 Restitution et suppression des données" : "5.6 Return and deletion of data"}</h3>
              <p className={p}>
                {isFr
                  ? "À la fin des prestations ou sur demande du Responsable du traitement, Corpshore restitue l'intégralité des Données Client dans un format structuré, couramment utilisé et lisible par machine, dans un délai de trente (30) jours suivant la demande ou la fin de la prestation, selon la première échéance. Après restitution et confirmation écrite de la réception par le Responsable du traitement, Corpshore procède à la suppression sécurisée de l'ensemble des copies des Données Client conservées sur ses systèmes et ceux de ses sous-traitants ultérieurs, dans un délai de soixante (60) jours. Une attestation de suppression est délivrée au Responsable du traitement sur demande. Corpshore conserve, pour sa propre conformité légale et comptable, des enregistrements minimaux (métadonnées de facturation, logs de conformité) dans les limites strictement nécessaires à ses obligations légales."
                  : "At the end of services or upon the Controller's request, Corpshore returns all Client Data in a structured, commonly used and machine-readable format within thirty (30) days of the request or end of service, whichever comes first. After return and written confirmation of receipt by the Controller, Corpshore proceeds to secure deletion of all copies of Client Data stored on its systems and those of its sub-processors, within sixty (60) days. A deletion certificate is issued to the Controller upon request. Corpshore retains, for its own legal and accounting compliance, minimal records (billing metadata, compliance logs) strictly necessary for its legal obligations."}
              </p>

              <h3 className={h3}>{isFr ? "5.7 Audit et vérification" : "5.7 Audit and verification"}</h3>
              <p className={p}>
                {isFr
                  ? "Corpshore met à la disposition du Responsable du traitement toutes les informations nécessaires pour démontrer le respect des obligations du présent article, conformément à l'article 28(3)(h) du RGPD. Le Responsable du traitement peut, après notification préalable écrite d'au moins trente (30) jours ouvrés et à ses propres frais, procéder ou faire procéder par un auditeur indépendant mandaté à des audits de conformité des mesures de sécurité et de protection des données mises en place par Corpshore, dans les limites suivantes : (i) au maximum une (1) fois par année civile, sauf en cas de violation de données avérée ou de suspicion raisonnable de non-conformité ; (ii) pendant les heures ouvrables normales et sans perturber les opérations de Corpshore ; (iii) sous réserve d'un accord de confidentialité renforcé entre l'auditeur et Corpshore. Corpshore peut également fournir des rapports d'audit tiers (SOC 2, ISO 27001, certifications sectorielles) en substitution partielle ou totale à un audit sur site."
                  : "Corpshore makes available to the Controller all information necessary to demonstrate compliance with the obligations of this article, in accordance with Article 28(3)(h) of the GDPR. The Controller may, after prior written notice of at least thirty (30) business days and at its own expense, conduct or have conducted by a mandated independent auditor compliance audits of Corpshore's security and data protection measures, within the following limits: (i) a maximum of one (1) time per calendar year, except in the event of a confirmed data breach or reasonable suspicion of non-compliance; (ii) during normal business hours and without disrupting Corpshore's operations; (iii) subject to an enhanced confidentiality agreement between the auditor and Corpshore. Corpshore may also provide third-party audit reports (SOC 2, ISO 27001, sector certifications) as partial or full substitution for an on-site audit."}
              </p>
            </section>


            {/* ═══════════════════════════════════════════
                §6  COOKIES
               ═══════════════════════════════════════════ */}
            <section id="s6">
              <h2 className={h2}>
                {isFr ? "6. Politique des cookies" : "6. Cookie Policy"}
              </h2>
              <p className={p}>
                {isFr
                  ? "Le site corpshore.fr utilise des cookies et des technologies de traçage similaires. Un cookie est un petit fichier texte déposé sur votre appareil lors de la visite du site. Conformément à l'article 82 de la loi Informatique et Libertés et aux lignes directrices de la CNIL, seuls les cookies strictement nécessaires au fonctionnement du site peuvent être déposés sans consentement préalable. Tout cookie analytique, publicitaire ou de personnalisation est soumis à votre consentement préalable."
                  : "The site corpshore.fr uses cookies and similar tracking technologies. A cookie is a small text file deposited on your device when you visit the site. In accordance with Article 82 of the French Data Protection Act and CNIL guidelines, only cookies strictly necessary for the operation of the site may be deposited without prior consent. Any analytical, advertising or personalisation cookie requires your prior consent."}
              </p>
              <div className="overflow-x-auto mb-6">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-[var(--color-marine-800)] text-white">
                      {(isFr
                        ? ["Nom / Source", "Catégorie", "Finalité", "Durée de vie"]
                        : ["Name / Source", "Category", "Purpose", "Lifetime"]
                      ).map(h => <th key={h} className={thCls}>{h}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {(isFr ? [
                      ["cf_lang", "Strictement nécessaire", "Mémorise la préférence linguistique (fr/en)", "Session"],
                      ["cf_tool_insights", "Fonctionnel (localStorage)", "Stocke les interactions avec les outils interactifs pour enrichir le devis", "Jusqu'à la soumission du formulaire"],
                      ["__cf_bm (Cloudflare)", "Strictement nécessaire", "Protection anti-bot Turnstile, vérification du formulaire de contact", "30 minutes"],
                      ["_vercel_* ", "Strictement nécessaire", "Gestion du déploiement et cache CDN Vercel", "Session"],
                      ["Google Analytics (désactivé)", "Analytique (avec consentement)", "Non déployé sur ce site — aucun cookie GA actif", "N/A"],
                    ] : [
                      ["cf_lang", "Strictly necessary", "Stores language preference (fr/en)", "Session"],
                      ["cf_tool_insights", "Functional (localStorage)", "Stores interactive tool interactions to enrich quotes", "Until form submission"],
                      ["__cf_bm (Cloudflare)", "Strictly necessary", "Turnstile anti-bot protection, contact form verification", "30 minutes"],
                      ["_vercel_*", "Strictly necessary", "Vercel deployment management and CDN cache", "Session"],
                      ["Google Analytics (disabled)", "Analytical (with consent)", "Not deployed on this site — no active GA cookie", "N/A"],
                    ]).map((row, i) => (
                      <tr key={i} className={`${tr_} ${i % 2 !== 0 ? "bg-[var(--color-calcaire)]" : ""}`}>
                        {row.map((cell, j) => <td key={j} className={tdCls}>{cell}</td>)}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className={p}>
                {isFr
                  ? "Vous pouvez à tout moment modifier vos préférences en matière de cookies en accédant aux paramètres de votre navigateur. La plupart des navigateurs vous permettent de refuser l'installation de cookies, de supprimer les cookies existants ou de vous alerter lorsqu'un cookie est déposé. Notez que la désactivation de certains cookies peut affecter le bon fonctionnement du site. Pour en savoir plus sur les cookies et la gestion de vos données personnelles, vous pouvez consulter le site de la CNIL (www.cnil.fr/fr/cookies-les-outils-pour-les-maitriser)."
                  : "You can modify your cookie preferences at any time by accessing your browser settings. Most browsers allow you to refuse cookies, delete existing cookies or be alerted when a cookie is set. Note that disabling certain cookies may affect the proper functioning of the site. To learn more about cookies and the management of your personal data, you can visit the CNIL website (www.cnil.fr)."}
              </p>
            </section>


            {/* ═══════════════════════════════════════════
                §7  EU AI ACT
               ═══════════════════════════════════════════ */}
            <section id="s7">
              <h2 className={h2}>
                {isFr ? "7. Conformité EU AI Act — Règlement (UE) 2024/1689" : "7. EU AI Act Compliance — Regulation (EU) 2024/1689"}
              </h2>
              <p className={p}>
                {isFr
                  ? "Le Règlement (UE) 2024/1689 du Parlement européen et du Conseil du 13 juin 2024 établissant des règles harmonisées sur l'intelligence artificielle (EU AI Act, ou Loi sur l'IA) est entré en application progressivement depuis le 2 août 2024. En tant que prestataire de services d'intelligence artificielle proposant des systèmes IA à ses clients, Corpshore Solutions Corporation est soumise aux obligations applicables aux fournisseurs et déployeurs de systèmes IA selon la classification de risque de ces systèmes."
                  : "Regulation (EU) 2024/1689 of the European Parliament and of the Council of 13 June 2024 establishing harmonised rules on artificial intelligence (the EU AI Act) has been progressively applicable since 2 August 2024. As an artificial intelligence services provider offering AI systems to its clients, Corpshore Solutions Corporation is subject to the obligations applicable to providers and deployers of AI systems according to the risk classification of those systems."}
              </p>
              <h3 className={h3}>{isFr ? "7.1 Classification des systèmes IA Corpshore" : "7.1 Classification of Corpshore AI systems"}</h3>
              <ul className="mb-4 space-y-1.5">
                {(isFr ? [
                  "Systèmes NLP (traitement automatique du langage) pour la classification et le routage de tickets support → Risque minimal (annexe I, hors champ du titre II)",
                  "Chatbots et agents virtuels déployés pour le service client → Risque limité (article 52 — obligation de transparence envers l'utilisateur final)",
                  "Systèmes de génération de contenu (IA générative) pour la rédaction assistée et la synthèse documentaire → Risque limité (article 53 — marquage du contenu généré par IA)",
                  "Pipelines RPA (automatisation robotisée des processus) → Risque minimal, aucune obligation spécifique EU AI Act",
                  "Modèles de données labellisées et systèmes d'annotation → Risque minimal, cadre contractuel DPA applicable",
                  "Corpshore ne déploie pas de systèmes IA à usage général (GPAI) au sens de l'article 3(63) ni de modèles fondamentaux au sens de l'article 3(65) de l'EU AI Act sans accord contractuel spécifique",
                ] : [
                  "NLP systems (natural language processing) for classification and routing of support tickets → Minimal risk (Annex I, outside scope of Title II)",
                  "Chatbots and virtual agents deployed for customer service → Limited risk (Article 52 — transparency obligation towards the end user)",
                  "Content generation systems (generative AI) for assisted writing and document synthesis → Limited risk (Article 53 — labelling of AI-generated content)",
                  "RPA (Robotic Process Automation) pipelines → Minimal risk, no specific EU AI Act obligations",
                  "Labelled data models and annotation systems → Minimal risk, applicable DPA contractual framework",
                  "Corpshore does not deploy general-purpose AI systems (GPAI) within the meaning of Article 3(63) or foundation models within the meaning of Article 3(65) of the EU AI Act without specific contractual agreement",
                ]).map(item => (
                  <li key={item} className={li}><span className={dot}>▸</span><span>{item}</span></li>
                ))}
              </ul>
              <h3 className={h3}>{isFr ? "7.2 Obligations de transparence (article 52 EU AI Act)" : "7.2 Transparency obligations (Article 52 EU AI Act)"}</h3>
              <p className={p}>
                {isFr
                  ? "Conformément à l'article 52 du Règlement IA, Corpshore garantit que tout système IA qu'elle déploie pour le compte d'un Client et qui interagit directement avec des utilisateurs finaux est accompagné d'un dispositif d'information clair indiquant que l'utilisateur interagit avec un système d'intelligence artificielle et non avec un être humain. Cette obligation est mise en œuvre via des mentions dans les interfaces (étiquette IA, message d'accueil du chatbot, signature des emails générés par IA). Les Clients qui déploient des systèmes IA de Corpshore à destination de leurs propres utilisateurs finaux assument la responsabilité du respect de l'article 52 dans le cadre de leur propre déploiement et sont tenus d'en informer Corpshore pour permettre la mise en conformité de l'interface correspondante."
                  : "In accordance with Article 52 of the AI Regulation, Corpshore ensures that any AI system it deploys on behalf of a Client that directly interacts with end users is accompanied by a clear information mechanism indicating that the user is interacting with an artificial intelligence system and not a human. This obligation is implemented via interface notices (AI label, chatbot welcome message, AI-generated email signature). Clients who deploy Corpshore AI systems to their own end users assume responsibility for compliance with Article 52 in the context of their own deployment and are required to inform Corpshore to enable compliance of the corresponding interface."}
              </p>
              <h3 className={h3}>{isFr ? "7.3 Contact et questions EU AI Act" : "7.3 EU AI Act contact and questions"}</h3>
              <p className={p}>
                {isFr
                  ? `Pour toute question relative à la conformité des systèmes IA de Corpshore au Règlement (UE) 2024/1689, notamment pour les clients souhaitant obtenir une documentation de conformité, une évaluation des risques ou une attestation de classification de risque pour un système IA spécifique, veuillez contacter : ${SITE.emailDpo}`
                  : `For any questions relating to the compliance of Corpshore AI systems with Regulation (EU) 2024/1689, in particular for clients wishing to obtain compliance documentation, a risk assessment or a risk classification certificate for a specific AI system, please contact: ${SITE.emailDpo}`}
              </p>
            </section>

            {/* Footer */}
            <p className="text-xs text-[var(--color-granit)] border-t border-[var(--color-border)] pt-6 text-center">
              {isFr
                ? `Ces documents légaux sont régis par le droit français et mis à jour conformément aux évolutions réglementaires LCEN, RGPD et EU AI Act. Dernière mise à jour : 1er août 2026. Contact : ${SITE.emailDpo}`
                : `These legal documents are governed by French law and updated in accordance with regulatory developments in LCEN, GDPR and EU AI Act. Last updated: 1 August 2026. Contact: ${SITE.emailDpo}`}
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
  return <LegalContent locale={locale} />;
}
