export type PressRelease = {
  id: string;
  slug: string;
  title: string;
  titleEn: string;
  category: string;
  date: string;
  lead: string;
  leadEn: string;
  body: string[];
  bodyEn: string[];
};

export const pressReleases: PressRelease[] = [
  {
    id: "PR-FR-01",
    slug: "corpshore-1-bpo-france-oa-2026",
    title: "Corpshore classé #1 BPO en France par Outsource Accelerator",
    titleEn: "Corpshore ranked #1 BPO in France by Outsource Accelerator",
    category: "Classement",
    date: "2026-01-10",
    lead: "Corpshore Solutions Corporation annonce avoir été classé #1 BPO en France et #2 en Europe par Outsource Accelerator dans son palmarès annuel 2026, consolidant sa position de leader de l'externalisation francophone.",
    leadEn: "Corpshore Solutions Corporation announces it has been ranked #1 BPO in France and #2 in Europe by Outsource Accelerator in its 2026 annual ranking, consolidating its position as the leader in Francophone outsourcing.",
    body: [
      "Outsource Accelerator, la principale plateforme mondiale de mise en relation BPO avec plus de 3 000 prestataires référencés dans 50 pays, a publié le 10 janvier 2026 son classement annuel des meilleurs prestataires BPO par pays. Corpshore y figure en première position pour la France et en deuxième position pour l'Europe dans la catégorie des prestataires BPO généralistes.",
      "Le classement est établi selon une méthodologie rigoureuse combinant : la taille et la capacité opérationnelle (nombre d'agents FTE, couverture géographique), la qualité de service vérifiée auprès des clients (NPS, CSAT, FCR), les certifications de conformité (ISO 27001, HDS, RGPD) et l'innovation technologique (intégration IA, outils propriétaires). Corpshore a obtenu les scores les plus élevés sur les critères de conformité et de qualité de service.",
      "« Ce classement valide notre approche — allier la rigueur réglementaire du marché français avec la flexibilité et les coûts de l'externalisation africaine francophone. Nous remercions nos clients pour leur confiance et nos équipes pour leur excellence quotidienne », déclare la direction de Corpshore France.",
      "Fort de ce classement, Corpshore engage un plan d'investissement de 12 millions d'euros sur ses hubs africains et européens pour 2026–2027, avec l'objectif de doubler sa capacité FTE tout en maintenant les standards de qualité qui lui ont valu cette distinction. L'ouverture de nouveaux hubs à Tachkent (Ouzbékistan) et à Bogotá (Colombie) est prévue au premier semestre 2026.",
    ],
    bodyEn: [
      "Outsource Accelerator, the leading global BPO matchmaking platform with over 3,000 providers listed in 50 countries, published its annual ranking of the best BPO providers by country on 10 January 2026. Corpshore appears in first position for France and second position for Europe in the generalist BPO provider category.",
      "The ranking is established using a rigorous methodology combining: operational size and capacity (FTE agent count, geographic coverage), verified service quality from clients (NPS, CSAT, FCR), compliance certifications (ISO 27001, HDS, GDPR) and technological innovation (AI integration, proprietary tools). Corpshore achieved the highest scores on compliance and service quality criteria.",
      "\"This ranking validates our approach — combining the regulatory rigour of the French market with the flexibility and costs of Francophone African outsourcing. We thank our clients for their trust and our teams for their daily excellence,\" says the Corpshore France leadership.",
      "Building on this ranking, Corpshore is committing to a €12 million investment plan across its African and European hubs for 2026–2027, targeting double its FTE capacity while maintaining the quality standards that earned it this distinction. New hubs in Tashkent (Uzbekistan) and Bogotá (Colombia) are planned for the first half of 2026.",
    ],
  },
  {
    id: "PR-FR-03",
    slug: "francai-suite-ia-bpo-francophone",
    title: "Corpshore AI lance une suite d'automatisation dédiée aux processus francophones",
    titleEn: "Corpshore AI launches automation suite dedicated to Francophone processes",
    category: "Produit",
    date: "2026-04-20",
    lead: "Corpshore AI, la division intelligence artificielle du groupe, annonce le lancement de FrancAI — une suite d'outils d'automatisation NLP entraînés sur des corpus juridiques, financiers et administratifs spécifiquement français.",
    leadEn: "Corpshore AI, the group's artificial intelligence division, announces the launch of FrancAI — a suite of NLP automation tools trained on specifically French legal, financial and administrative corpora.",
    body: [
      "FrancAI est le fruit de 18 mois de recherche et développement menés par l'équipe de Corpshore AI en collaboration avec deux laboratoires universitaires français. La suite comprend cinq modules spécialisés : FrancAI Classify (classification automatique de documents administratifs français), FrancAI Extract (extraction d'entités nommées dans les textes juridiques et contractuels), FrancAI Summarize (résumé automatique d'interactions client et de compte-rendus), FrancAI Translate (traduction FR-EN spécialisée BPO) et FrancAI Comply (détection automatique des obligations réglementaires dans les contrats).",
      "Les modèles ont été entraînés sur un corpus de 2,4 milliards de tokens de textes français professionnels, incluant des documents juridiques (Code civil, jurisprudence, contrats types), des textes financiers (rapports annuels, DSCR, bilans comptables), des communications administratives (courriers CPAM, lettres de relance, actes notariés) et des transcriptions d'interactions client en français standard et régional.",
      "En comparaison avec des modèles généralistes comme GPT-4 ou Claude, FrancAI surpasse de 12 à 28 % selon les tâches sur les benchmarks spécialisés français, en particulier sur la classification de documents administratifs (F1 : 0,94 vs 0,81) et l'extraction d'entités juridiques (F1 : 0,91 vs 0,79).",
      "FrancAI est disponible en mode SaaS avec une intégration API REST, en mode on-premise pour les clients avec des exigences de souveraineté des données, et en déploiement hybride pour les grands comptes. La tarification est basée sur le volume de tokens traités, avec des engagements annuels disponibles à partir de 2 000 euros par mois.",
    ],
    bodyEn: [
      "FrancAI is the result of 18 months of R&D by the Corpshore AI team in collaboration with two French university laboratories. The suite includes five specialised modules: FrancAI Classify (automatic classification of French administrative documents), FrancAI Extract (named entity extraction from legal and contractual texts), FrancAI Summarize (automatic summarisation of customer interactions and meeting notes), FrancAI Translate (specialised BPO FR-EN translation) and FrancAI Comply (automatic detection of regulatory obligations in contracts).",
      "The models were trained on a corpus of 2.4 billion tokens of French professional texts, including legal documents (Civil Code, case law, template contracts), financial texts (annual reports, DSCR, balance sheets), administrative communications (CPAM letters, reminder letters, notarial deeds) and customer interaction transcripts in standard and regional French.",
      "Compared to generalist models like GPT-4 or Claude, FrancAI outperforms by 12–28% depending on the task on French specialised benchmarks, particularly on administrative document classification (F1: 0.94 vs 0.81) and legal entity extraction (F1: 0.91 vs 0.79).",
      "FrancAI is available as SaaS with REST API integration, on-premise for clients with data sovereignty requirements, and hybrid deployment for enterprise accounts. Pricing is based on token volume processed, with annual commitments available from €2,000 per month.",
    ],
  },
  {
    id: "PR-FR-04",
    slug: "partenariat-sap-groupes-industriels-france",
    title: "Partenariat stratégique avec un intégrateur SAP pour servir les groupes industriels français",
    titleEn: "Strategic partnership with SAP integrator to serve French industrial groups",
    category: "Partenariat",
    date: "2026-05-08",
    lead: "Corpshore annonce un partenariat de référencement avec un intégrateur SAP certifié Gold pour offrir des services d'externalisation IT (ABAP, S/4HANA, Fiori) à destination des groupes industriels et de distribution français.",
    leadEn: "Corpshore announces a referral partnership with a Gold-certified SAP integrator to offer IT outsourcing services (ABAP, S/4HANA, Fiori) to French industrial and distribution groups.",
    body: [
      "Corpshore et son partenaire intégrateur SAP Gold Partner (dont l'identité sera communiquée à la signature officielle du contrat cadre) s'associent pour proposer une offre combinée d'implémentation et d'externalisation SAP. Corpshore prendra en charge le support applicatif de niveau 1 à 3, la maintenance ABAP, l'administration des systèmes S/4HANA et le développement des interfaces Fiori, tandis que le partenaire assurera les phases de conseil et d'implémentation initiale.",
      "Ce partenariat répond à un besoin identifié chez les ETI françaises des secteurs industriel, automobile, agroalimentaire et distribution : après l'implémentation SAP, le maintien en conditions opérationnelles (MCO) représente un coût significatif que l'externalisation peut réduire de 40 à 55 % sans dégrader la qualité de service. Corpshore dispose d'une équipe de 45 consultants SAP certifiés dans ses hubs de Varsovie et de Porto.",
      "Le modèle proposé est un centre de services applicatifs SAP (CSA) dédié ou mutualisé selon la taille du client, avec un SLA de disponibilité applicative de 99,9 % et un délai de résolution des incidents P1 inférieur à 2 heures. Tous les consultants SAP de Corpshore parlent français et ont une expérience minimum de 3 ans sur des projets S/4HANA pour des clients francophones.",
      "Les deux partenaires présentent cette offre en avant-première aux SAPPHIRE France en juin 2026 et à l'UGAP Convention annuelle en septembre 2026.",
    ],
    bodyEn: [
      "Corpshore and its SAP Gold Partner integrator (whose identity will be communicated at the official contract signing) are joining forces to offer a combined SAP implementation and outsourcing offering. Corpshore will handle level 1–3 application support, ABAP maintenance, S/4HANA systems administration and Fiori interface development, while the partner will handle consulting and initial implementation phases.",
      "This partnership addresses an identified need among French mid-size companies in industrial, automotive, food and beverage, and distribution sectors: after SAP implementation, application maintenance (MCO) represents a significant cost that outsourcing can reduce by 40–55% without degrading service quality. Corpshore has a team of 45 SAP-certified consultants in its Warsaw and Porto hubs.",
      "The proposed model is a dedicated or shared SAP Application Service Centre (ASC) depending on client size, with an application availability SLA of 99.9% and P1 incident resolution time under 2 hours. All Corpshore SAP consultants speak French and have a minimum of 3 years of experience on S/4HANA projects for Francophone clients.",
      "Both partners will present this offering as a preview at SAPPHIRE France in June 2026 and at the UGAP Annual Convention in September 2026.",
    ],
  },
  {
    id: "PR-FR-05",
    slug: "iso-27001-hds-certification-corpshore",
    title: "Corpshore France certifie ses processus ISO 27001 et obtient la qualification HDS",
    titleEn: "Corpshore France certifies its processes ISO 27001 and obtains HDS qualification",
    category: "Certification",
    date: "2026-05-25",
    lead: "Corpshore annonce l'obtention de la certification ISO 27001:2022 pour ses centres de traitement de données et la qualification Hébergeur de Données de Santé (HDS) types 1 et 2, permettant la prise en charge de données de santé à caractère personnel pour des clients français.",
    leadEn: "Corpshore announces ISO 27001:2022 certification for its data processing centres and Health Data Hosting (HDS) type 1 and 2 qualification, enabling the processing of personal health data for French clients.",
    body: [
      "Après 14 mois d'un processus d'audit intensif conduit par Bureau Veritas, organisme accrédité par le COFRAC, Corpshore a officiellement obtenu la certification ISO 27001:2022 pour l'ensemble de ses centres de traitement de données en France, en Pologne et au Portugal. Simultanément, la qualification Hébergeur de Données de Santé (HDS) types 1 (hébergement d'infrastructure) et 2 (hébergement de plateformes logicielles) a été accordée pour ses infrastructures cloud françaises.",
      "La certification ISO 27001:2022 couvre l'intégralité du système de management de la sécurité de l'information (SMSI) de Corpshore, incluant la gestion des risques, la classification des actifs, le contrôle des accès, la cryptographie, la sécurité physique et la gestion des incidents. La nouvelle version 2022 de la norme introduit 11 nouveaux contrôles relatifs à la cybersécurité du cloud et à la sécurité des chaînes d'approvisionnement.",
      "La qualification HDS ouvre à Corpshore le marché des opérateurs de santé français : hôpitaux, cliniques, mutuelles, laboratoires, CPAM, EHPAD. Ces entités, soumises à des obligations réglementaires strictes sur le traitement des données de santé, peuvent désormais confier à Corpshore l'externalisation de leur service client, de leur back-office administratif et de leurs processus de gestion documentaire, dans le respect du cadre HDS.",
      "Corpshore prévoit d'étendre la certification ISO 27001 à ses hubs africains (Dakar, Abidjan) au cours du premier semestre 2027, et de solliciter la qualification SOC 2 Type II pour ses clients nord-américains dans le même calendrier.",
    ],
    bodyEn: [
      "After a 14-month intensive audit process conducted by Bureau Veritas, a COFRAC-accredited body, Corpshore officially obtained ISO 27001:2022 certification for all of its data processing centres in France, Poland and Portugal. Simultaneously, Health Data Hosting (HDS) type 1 (infrastructure hosting) and type 2 (software platform hosting) qualification was granted for its French cloud infrastructure.",
      "ISO 27001:2022 certification covers Corpshore's entire Information Security Management System (ISMS), including risk management, asset classification, access control, cryptography, physical security and incident management. The new 2022 version of the standard introduces 11 new controls relating to cloud cybersecurity and supply chain security.",
      "HDS qualification opens Corpshore to the French healthcare operator market: hospitals, clinics, mutuals, laboratories, CPAM, care homes. These entities, subject to strict regulatory obligations on health data processing, can now entrust Corpshore with the outsourcing of their customer service, administrative back-office and document management processes, within the HDS framework.",
      "Corpshore plans to extend ISO 27001 certification to its African hubs (Dakar, Abidjan) during the first half of 2027, and to seek SOC 2 Type II qualification for its North American clients on the same timeline.",
    ],
  },
  {
    id: "PR-FR-06",
    slug: "recrutement-200-agents-francophones-2026",
    title: "Recrutement de 200 agents francophones supplémentaires d'ici Q4 2026",
    titleEn: "Recruitment of 200 additional Francophone agents by Q4 2026",
    category: "Recrutement",
    date: "2026-06-12",
    lead: "Pour répondre à la demande croissante de ses clients français et francophones, Corpshore lance une vague de recrutement de 200 agents bilingues sur ses hubs Pologne, Philippines et Afrique subsaharienne. Les postes sont ouverts immédiatement.",
    leadEn: "To meet growing demand from its French and Francophone clients, Corpshore launches a recruitment drive for 200 bilingual agents across its Poland, Philippines and sub-Saharan Africa hubs. Positions are open immediately.",
    body: [
      "Corpshore ouvre 200 postes d'agents bilingues français-anglais dans le cadre de son plan de croissance 2026. Les recrutements sont répartis comme suit : 80 postes à Dakar (Sénégal) pour les services de service client et de modération de contenu, 60 postes à Varsovie (Pologne) pour les services IT et finance, 40 postes à Manille (Philippines) pour les services multilingues 24/7, et 20 postes à Porto (Portugal) pour les services nearshore haut de gamme.",
      "Les profils recherchés varient selon les hubs : à Dakar, Corpshore cherche des diplômés bac+2 minimum avec un excellent niveau de français oral et écrit (DALF B2 minimum, C1 préféré) et une appétence pour les outils numériques. À Varsovie et Porto, les postes IT nécessitent un bac+3 en informatique ou en gestion de systèmes, avec des compétences sur les suites ITSM (ServiceNow, Jira) et les environnements cloud AWS ou Azure.",
      "Corpshore propose à ses nouveaux agents : un contrat local conforme aux législations nationales applicables, une formation initiale de 6 à 8 semaines entièrement prise en charge, un accès à la plateforme de formation continue Corpshore Academy (200+ modules en ligne), et une progression de carrière vers des postes de team leader, de formateur ou de coordinateur qualité dans les 18 à 24 mois.",
      "Les candidatures sont ouvertes sur le site corpshoretalent.com et directement auprès des équipes de recrutement locales. Corpshore s'engage à traiter toutes les candidatures dans un délai maximum de 10 jours ouvrables et à répondre à 100 % des candidats, qu'ils soient retenus ou non.",
    ],
    bodyEn: [
      "Corpshore is opening 200 French-English bilingual agent positions as part of its 2026 growth plan. Recruitment is distributed as follows: 80 positions in Dakar (Senegal) for customer service and content moderation, 60 positions in Warsaw (Poland) for IT and finance services, 40 positions in Manila (Philippines) for multilingual 24/7 services, and 20 positions in Porto (Portugal) for premium nearshore services.",
      "Profiles sought vary by hub: in Dakar, Corpshore seeks minimum bac+2 graduates with excellent written and spoken French (minimum DALF B2, C1 preferred) and an affinity for digital tools. In Warsaw and Porto, IT positions require a bac+3 in IT or systems management, with skills in ITSM suites (ServiceNow, Jira) and cloud environments AWS or Azure.",
      "Corpshore offers its new agents: a local contract compliant with applicable national laws, fully funded initial training of 6–8 weeks, access to the Corpshore Academy continuous training platform (200+ online modules), and career progression to team leader, trainer or quality coordinator roles within 18–24 months.",
      "Applications are open on corpshoretalent.com and directly with local recruitment teams. Corpshore commits to processing all applications within a maximum of 10 working days and to responding to 100% of candidates, whether successful or not.",
    ],
  },
  {
    id: "PR-FR-07",
    slug: "rapport-rse-france-2026-corpshore",
    title: "Corpshore publie son premier rapport de responsabilité sociétale dédié à la France",
    titleEn: "Corpshore publishes its first corporate social responsibility report dedicated to France",
    category: "RSE",
    date: "2026-07-01",
    lead: "Corpshore publie aujourd'hui son premier rapport RSE spécifique au marché français, couvrant l'impact économique local de ses activités, sa politique de diversité et inclusion, et ses engagements environnementaux alignés sur la CSRD.",
    leadEn: "Corpshore today publishes its first CSR report specific to the French market, covering the local economic impact of its activities, its diversity and inclusion policy, and its environmental commitments aligned with CSRD.",
    body: [
      "Corpshore publie son Rapport RSE France 2026 conformément aux exigences de la directive CSRD (Corporate Sustainability Reporting Directive), applicable aux entreprises de plus de 250 salariés en France depuis le 1er janvier 2026. Ce rapport, de 80 pages, couvre l'intégralité des dimensions environnementale, sociale et de gouvernance (ESG) des activités de Corpshore sur le territoire français.",
      "Sur le volet environnemental, Corpshore s'engage à atteindre la neutralité carbone (scope 1 et 2) d'ici 2028 pour ses opérations françaises, et à réduire ses émissions scope 3 de 40 % d'ici 2030. En 2025, l'entreprise a réduit ses émissions de scope 1 et 2 de 18 % grâce à la migration vers des datacenters certifiés ISO 50001 et à l'équipement de ses sites en énergies renouvelables. La consommation d'énergie par FTE a diminué de 12 % grâce à l'optimisation des postes de travail.",
      "Sur le volet social, le rapport met en avant la création de 340 emplois locaux en Afrique francophone en 2025, dont 65 % occupés par des femmes — un indicateur qui témoigne de l'engagement de Corpshore pour l'égalité professionnelle dans des pays où l'emploi formel féminin reste encore trop rare. Le taux de rétention des agents Corpshore en Afrique subsaharienne est de 84 %, supérieur à la moyenne sectorielle de 71 %.",
      "Le rapport RSE France 2026 est disponible en téléchargement gratuit sur le site corpshore.fr/rse. Corpshore s'engage à soumettre son rapport à un auditeur tiers indépendant à partir du millésime 2027, conformément aux exigences de la CSRD pour les entreprises de sa taille.",
    ],
    bodyEn: [
      "Corpshore publishes its 2026 France CSR Report in compliance with the requirements of the CSRD (Corporate Sustainability Reporting Directive), applicable to companies with more than 250 employees in France since 1 January 2026. This 80-page report covers all environmental, social and governance (ESG) dimensions of Corpshore's activities on French territory.",
      "On the environmental front, Corpshore commits to carbon neutrality (scope 1 and 2) by 2028 for its French operations, and to reducing scope 3 emissions by 40% by 2030. In 2025, the company reduced its scope 1 and 2 emissions by 18% through migration to ISO 50001-certified data centres and equipping its sites with renewable energy. Energy consumption per FTE decreased by 12% through workstation optimisation.",
      "On the social front, the report highlights the creation of 340 local jobs in Francophone Africa in 2025, 65% of which are held by women — an indicator that reflects Corpshore's commitment to professional equality in countries where formal female employment remains too rare. The retention rate of Corpshore agents in sub-Saharan Africa is 84%, above the sector average of 71%.",
      "The 2026 France CSR Report is available for free download at corpshore.fr/rse. Corpshore commits to submitting its report to an independent third-party auditor from the 2027 edition, in compliance with CSRD requirements for companies of its size.",
    ],
  },
  {
    id: "PR-FR-08",
    slug: "hub-tachkent-ouzbekistan-it-cis",
    title: "Corpshore ouvre un hub technologique à Tachkent pour les marchés IT d'Asie centrale et de Russie",
    titleEn: "Corpshore opens a technology hub in Tashkent for Central Asian and Russian IT markets",
    category: "Expansion",
    date: "2026-03-20",
    lead: "Corpshore annonce l'ouverture de son hub technologique à Tachkent (Ouzbékistan), dédié aux services IT, IA et développement logiciel pour les marchés d'Asie centrale, de Russie et d'Europe de l'Est. Le hub démarre avec 120 ingénieurs opérationnels.",
    leadEn: "Corpshore announces the opening of its technology hub in Tashkent (Uzbekistan), dedicated to IT, AI and software development services for Central Asian, Russian and Eastern European markets. The hub launches with 120 operational engineers.",
    body: [
      "Corpshore Solutions Corporation ouvre aujourd'hui son hub technologique de Tachkent, capitale de l'Ouzbékistan. Implanté au sein de l'IT City de Tachkent — la zone technologique dédiée inaugurée par le gouvernement ouzbek en 2022 — le hub bénéficie d'une infrastructure de premier plan, d'avantages fiscaux significatifs et d'un accès immédiat au vivier de talents IT formé par les universités techniques de Tachkent et de Samarkand.",
      "L'Ouzbékistan produit aujourd'hui plus de 50 000 diplômés en informatique et ingénierie par an, avec une maîtrise trilingue (ouzbek, russe, anglais) qui positionne le pays comme un hub IT unique pour les entreprises cherchant à couvrir simultanément les marchés de l'Europe de l'Est, de la Russie et de l'Asie centrale. Le coût horaire d'un ingénieur IT qualifié à Tachkent représente 30 à 40 % de son équivalent polonais ou portugais, tout en offrant un niveau technique comparable.",
      "Le hub de Tachkent démarre avec 120 ingénieurs opérationnels dans les domaines suivants : développement logiciel (Java, Python, .NET, React), intelligence artificielle et machine learning, cybersécurité pour les marchés CIS, et support IT bilingue russe-anglais. L'objectif est de doubler cette capacité à 250 ingénieurs d'ici septembre 2026, et d'atteindre 400 postes d'ici fin 2026, avec un focus croissant sur les profils IA/ML et data engineering.",
      "Corpshore intégrera le hub de Tachkent dans son modèle de livraison « follow-the-sun » qui permet à ses clients de bénéficier d'équipes actives 16 heures par jour sans surcoût. La complémentarité horaire entre Tachkent (UTC+5), Varsovie (UTC+1) et Dakar (UTC+0) permet une couverture sans interruption des projets de développement pendant les heures ouvrables européennes et au-delà.",
    ],
    bodyEn: [
      "Corpshore Solutions Corporation today opens its Tashkent technology hub, capital of Uzbekistan. Located within Tashkent's IT City — the dedicated technology zone inaugurated by the Uzbek government in 2022 — the hub benefits from world-class infrastructure, significant tax advantages and immediate access to the IT talent pool trained by the technical universities of Tashkent and Samarkand.",
      "Uzbekistan now produces over 50,000 IT and engineering graduates per year, with trilingual proficiency (Uzbek, Russian, English) that positions the country as a unique IT hub for companies seeking simultaneous coverage of Eastern Europe, Russia and Central Asian markets. The hourly cost of a qualified IT engineer in Tashkent represents 30–40% of their Polish or Portuguese equivalent, while offering a comparable technical level.",
      "The Tashkent hub launches with 120 operational engineers in: software development (Java, Python, .NET, React), artificial intelligence and machine learning, cybersecurity for CIS markets, and bilingual Russian-English IT support. The target is to double this capacity to 250 engineers by September 2026, and reach 400 positions by end of 2026, with a growing focus on AI/ML and data engineering profiles.",
      "Corpshore will integrate the Tashkent hub into its 'follow-the-sun' delivery model that gives clients active teams for 16 hours per day at no extra cost. The time zone complementarity between Tashkent (UTC+5), Warsaw (UTC+1) and Dakar (UTC+0) enables uninterrupted project coverage during European business hours and beyond.",
    ],
  },
];
