export interface ServiceDeep {
  slug: string;
  icon: string;
  name: string;
  nameEn: string;
  metaTitle: string;
  metaTitleEn: string;
  metaDescription: string;
  metaDescriptionEn: string;
  keywords: string;
  keywordsEn: string;
  intro: string;
  introEn: string;
  features: { title: string; titleEn: string; body: string; bodyEn: string }[];
  faq: { q: string; a: string; qEn: string; aEn: string }[];
  heroImage?: string;
}

export const servicesDeep: ServiceDeep[] = [
  {
    slug: "annotation-donnees-ia",
    icon: "🤖",
    name: "Annotation de données IA",
    nameEn: "AI Data Annotation",
    metaTitle: "Annotation données IA France — Labellisation & RLHF externalisés",
    metaTitleEn: "AI Data Annotation France — Outsourced Labelling & RLHF",
    metaDescription: "Prestataire annotation données IA en France : labellisation images/textes/audio, RLHF, curation datasets NLP. Corpshore — Top 5 IA mondiale Outsource Accelerator 2026.",
    metaDescriptionEn: "AI data annotation provider in France: image/text/audio labelling, RLHF, NLP dataset curation. Corpshore — Top 5 AI worldwide Outsource Accelerator 2026.",
    keywords: "annotation données IA France, labellisation données machine learning, RLHF prestataire France, annotation images IA, annotation texte NLP France, curation dataset machine learning, data annotation BPO France, services IA générative France, externalisation IA France",
    keywordsEn: "AI data annotation France, machine learning data labelling France, RLHF provider France, image annotation AI France, NLP text annotation France, ML dataset curation, data annotation BPO France, generative AI services France",
    intro: "Corpshore fournit des services d'annotation de données de haute qualité pour les équipes de recherche en IA, les éditeurs de modèles LLM et les entreprises qui déploient des solutions d'intelligence artificielle en production. Nos annotateurs francophones natifs garantissent une précision maximale sur les données en langue française.",
    introEn: "Corpshore provides high-quality data annotation services for AI research teams, LLM model developers and enterprises deploying AI solutions in production. Our native French-speaking annotators ensure maximum accuracy on French-language data.",
    features: [
      {
        title: "Labellisation images & vidéos",
        titleEn: "Image & video labelling",
        body: "Bounding boxes, segmentation sémantique, classification, détection d'objets, annotation de séquences vidéo. Outils : Label Studio, Scale AI, CVAT, Roboflow.",
        bodyEn: "Bounding boxes, semantic segmentation, classification, object detection, video sequence annotation. Tools: Label Studio, Scale AI, CVAT, Roboflow.",
      },
      {
        title: "Annotation texte & NLP",
        titleEn: "Text & NLP annotation",
        body: "NER (entités nommées), classification d'intentions, sentiment analysis, coreference, STS (similarité sémantique), annotation de spans. Spécialisation français juridique, médical et financier.",
        bodyEn: "NER (named entity recognition), intent classification, sentiment analysis, coreference, STS (semantic similarity), span annotation. Specialisation in legal, medical and financial French.",
      },
      {
        title: "RLHF & évaluation de modèles",
        titleEn: "RLHF & model evaluation",
        body: "Évaluation comparative de réponses LLM (helpfulness, harmlessness, honesty), red-teaming, évaluation de sécurité, ranking de sorties. Protocoles conformes aux guidelines Constitutional AI.",
        bodyEn: "Comparative LLM response evaluation (helpfulness, harmlessness, honesty), red-teaming, safety evaluation, output ranking. Protocols aligned with Constitutional AI guidelines.",
      },
      {
        title: "Annotation audio & multimodal",
        titleEn: "Audio & multimodal annotation",
        body: "Transcription, diarisation, détection d'événements sonores, annotation multimodale (image + texte + audio). Maîtrise des dialectes francophones (québécois, belge, maghrébin).",
        bodyEn: "Transcription, diarisation, sound event detection, multimodal annotation (image + text + audio). Expertise in Francophone dialects (Québécois, Belgian, Maghrebi French).",
      },
    ],
    faq: [
      {
        q: "Quelle précision garantissez-vous pour l'annotation de données IA ?",
        a: "Nous garantissons un accord inter-annotateurs (IAA) supérieur à 95% mesuré par Kappa de Cohen ou Krippendorff's alpha selon le type de tâche. Chaque lot passe par un contrôle qualité double-blind avant livraison.",
        qEn: "What accuracy do you guarantee for AI data annotation?",
        aEn: "We guarantee inter-annotator agreement (IAA) above 95%, measured by Cohen's Kappa or Krippendorff's alpha depending on task type. Every batch undergoes double-blind quality control before delivery.",
      },
      {
        q: "Pouvez-vous annoter des données sensibles (médicales, juridiques, financières) en français ?",
        a: "Oui. Nous opérons des équipes spécialisées en annotation de données sensibles, soumises à des accords de confidentialité renforcés et à des environnements air-gapped sur demande. Expérience sur des corpus médicaux HDS et juridiques confidentiels.",
        qEn: "Can you annotate sensitive data (medical, legal, financial) in French?",
        aEn: "Yes. We operate specialist teams for sensitive data annotation, subject to enhanced NDAs and air-gapped environments on request. Experience with HDS medical corpora and confidential legal datasets.",
      },
      {
        q: "Proposez-vous des services RLHF pour les modèles LLM francophones ?",
        a: "Oui. Nous sommes l'un des rares prestataires européens à disposer d'annotateurs RLHF natifs francophones pour l'évaluation comparative, le red-teaming et le fine-tuning de grands modèles de langage.",
        qEn: "Do you offer RLHF services for French-language LLM models?",
        aEn: "Yes. We are one of the few European providers with native French-speaking RLHF annotators for comparative evaluation, red-teaming and fine-tuning of large language models.",
      },
    ],
    heroImage: "/images/hero-paris-operations.webp",
  },
  {
    slug: "nearshore-francophone",
    icon: "🌍",
    name: "Nearshore francophone",
    nameEn: "Francophone Nearshore",
    metaTitle: "Nearshore francophone — BPO francophone à coût optimisé depuis la France",
    metaTitleEn: "Francophone Nearshore — Cost-optimised French-speaking BPO for France",
    metaDescription: "Livraison nearshore francophone pour entreprises françaises : équipes bilingues à coût compétitif, zéro barrière culturelle, même fuseau horaire. Corpshore #1 BPO France.",
    metaDescriptionEn: "Francophone nearshore delivery for French companies: bilingual teams at competitive cost, zero cultural barrier, same time zone. Corpshore #1 BPO France.",
    keywords: "nearshore francophone France, BPO francophone, externalisation francophone, centre d'appels francophone, nearshore Maroc France, nearshore Sénégal France, nearshore Afrique francophone, BPO offshore francophone, outsourcing francophone",
    keywordsEn: "francophone nearshore France, French-speaking BPO, francophone outsourcing, French-speaking contact center, Morocco nearshore France, Francophone Africa nearshore, francophone offshore BPO",
    intro: "Le modèle nearshore francophone de Corpshore offre aux entreprises françaises les avantages de l'externalisation — réduction des coûts, montée en charge rapide — sans les compromis sur la qualité linguistique ou culturelle. Nos hubs de livraison francophones opèrent dans le même fuseau horaire ou avec un décalage minimal.",
    introEn: "Corpshore's francophone nearshore model offers French companies the benefits of outsourcing — cost reduction, rapid scale-up — without compromising on linguistic or cultural quality. Our francophone delivery hubs operate in the same or near time zone.",
    features: [
      {
        title: "Qualité linguistique native",
        titleEn: "Native linguistic quality",
        body: "Agents natifs francophones sélectionnés sur leur maîtrise du français standard (accent neutre, orthographe, registre). Tests linguistiques obligatoires, coaching continu.",
        bodyEn: "Native French-speaking agents selected for their mastery of standard French (neutral accent, spelling, register). Mandatory language tests, continuous coaching.",
      },
      {
        title: "Coûts compétitifs",
        titleEn: "Competitive costs",
        body: "Réduction de 40 à 65% par rapport aux coûts d'un centre de contact en France métropolitaine, sans dégradation de la qualité de service mesurée en CSAT.",
        bodyEn: "40 to 65% reduction compared to metropolitan France contact centre costs, without degradation in CSAT-measured service quality.",
      },
      {
        title: "Même fuseau horaire",
        titleEn: "Same time zone",
        body: "Nos hubs principaux opèrent en UTC+0 à UTC+2, couvrant les heures ouvrées françaises sans heures supplémentaires ni rotation de nuit contraignante.",
        bodyEn: "Our main hubs operate at UTC+0 to UTC+2, covering French business hours without overtime or complex night shift rotation.",
      },
      {
        title: "Conformité RGPD européenne",
        titleEn: "European GDPR compliance",
        body: "Tous nos hubs de livraison sont soumis à des DPA conformes au RGPD. Les transferts de données hors UE s'effectuent sous clauses contractuelles types (CCT) de la Commission européenne.",
        bodyEn: "All our delivery hubs operate under GDPR-compliant DPAs. Data transfers outside the EU are conducted under the European Commission's Standard Contractual Clauses (SCCs).",
      },
    ],
    faq: [
      {
        q: "Dans quels pays opèrent vos hubs nearshore francophones ?",
        a: "Corpshore dispose de hubs de livraison au Maroc, au Sénégal, en Côte d'Ivoire, en République dominicaine (équipes FR/ES) et en Pologne (pour les multilingues européens). Chaque hub est sélectionné pour la qualité du français et la stabilité des infrastructures.",
        qEn: "In which countries do your francophone nearshore hubs operate?",
        aEn: "Corpshore has delivery hubs in Morocco, Senegal, Ivory Coast, Dominican Republic (FR/ES teams) and Poland (for European multilinguals). Each hub is selected for French quality and infrastructure stability.",
      },
      {
        q: "Comment garantissez-vous la qualité du français dans vos centres nearshore ?",
        a: "Chaque agent passe un test oral et écrit de niveau B2 minimum (DELF/DALF ou équivalent) avant l'embauche. Un programme de coaching linguistique continu est animé par des formateurs francophones natifs sur site.",
        qEn: "How do you guarantee French language quality in your nearshore centres?",
        aEn: "Each agent passes a minimum B2 oral and written test (DELF/DALF or equivalent) before hiring. A continuous language coaching programme is led by native French-speaking trainers on site.",
      },
      {
        q: "Les transferts de données vers vos hubs nearshore sont-ils conformes au RGPD ?",
        a: "Oui. Tous les transferts hors EEE s'effectuent sous clauses contractuelles types (CCT) de la Commission européenne, complétées d'une analyse d'impact relative au transfert (TIA). Nous fournissons la documentation complète sur demande.",
        qEn: "Are data transfers to your nearshore hubs GDPR compliant?",
        aEn: "Yes. All transfers outside the EEA are conducted under European Commission Standard Contractual Clauses (SCCs), supplemented by a Transfer Impact Assessment (TIA). Full documentation provided on request.",
      },
    ],
    heroImage: "/images/hero-paris-operations.webp",
  },
  {
    slug: "tma-france",
    icon: "⚙️",
    name: "TMA & infogérance applicative",
    nameEn: "Application Maintenance & IT Managed Services",
    metaTitle: "TMA France — Tierce Maintenance Applicative & infogérance IT externalisée",
    metaTitleEn: "TMA France — Outsourced Application Maintenance & IT Managed Services",
    metaDescription: "Tierce maintenance applicative (TMA), infogérance IT et support helpdesk N1/N2/N3 externalisés pour entreprises françaises. Corpshore — #1 IT Outsourcing France.",
    metaDescriptionEn: "Outsourced application maintenance (TMA), IT managed services and N1/N2/N3 helpdesk support for French companies. Corpshore — #1 IT Outsourcing France.",
    keywords: "TMA France, tierce maintenance applicative France, infogérance IT France, managed services provider France, DSI externalisée France, support IT externalisé, helpdesk IT France, infogérance applicative, externalisation IT France PME ETI",
    keywordsEn: "TMA France, application maintenance outsourcing France, IT managed services France, managed services provider France, outsourced CIO France, outsourced IT support France, IT helpdesk France, application management outsourcing",
    intro: "La TMA (Tierce Maintenance Applicative) Corpshore couvre l'ensemble du cycle de vie de vos applications métier : maintenance corrective et évolutive, support utilisateurs, gestion des incidents et évolutions. Nos équipes IT parlent français et connaissent les environnements ERP les plus courants en France (SAP, Sage, Cegid, Microsoft Dynamics).",
    introEn: "Corpshore TMA (Third-Party Application Maintenance) covers the full lifecycle of your business applications: corrective and evolutionary maintenance, user support, incident management and enhancements. Our IT teams speak French and know the most common ERP environments in France (SAP, Sage, Cegid, Microsoft Dynamics).",
    features: [
      {
        title: "Maintenance corrective & évolutive",
        titleEn: "Corrective & evolutionary maintenance",
        body: "Correction de bugs, petites évolutions fonctionnelles, mises à jour de sécurité, gestion des versions. SLA avec GTI (Garantie de Temps d'Intervention) et GTR (Garantie de Temps de Rétablissement) contractuels.",
        bodyEn: "Bug fixes, minor functional enhancements, security updates, version management. SLA with contractual response time (GTI) and resolution time (GTR) guarantees.",
      },
      {
        title: "Helpdesk IT N1/N2/N3",
        titleEn: "N1/N2/N3 IT Helpdesk",
        body: "Support utilisateurs de niveau 1 (réinitialisation de mot de passe, incidents courants), niveau 2 (diagnostic avancé, configurations), niveau 3 (développement correctif, escalade éditeur). ITSM ITIL v4.",
        bodyEn: "Level 1 user support (password reset, common incidents), level 2 (advanced diagnosis, configurations), level 3 (corrective development, vendor escalation). ITSM ITIL v4.",
      },
      {
        title: "Infogérance cloud & infrastructure",
        titleEn: "Cloud & infrastructure managed services",
        body: "Gestion des environnements Azure, AWS et OVHcloud, monitoring 24/7, gestion des sauvegardes, conformité SecNumCloud et HDS pour les données sensibles.",
        bodyEn: "Azure, AWS and OVHcloud environment management, 24/7 monitoring, backup management, SecNumCloud and HDS compliance for sensitive data.",
      },
      {
        title: "DSI externalisée (vCIO)",
        titleEn: "Outsourced CIO (vCIO)",
        body: "Pour les PME et ETI sans DSI interne : pilotage de la stratégie IT, gestion des prestataires, budgets IT, schéma directeur et accompagnement à la transformation digitale.",
        bodyEn: "For SMEs and mid-caps without an internal IT team: IT strategy management, vendor management, IT budgets, IT master plan and digital transformation support.",
      },
    ],
    faq: [
      {
        q: "Quelle est la différence entre TMA et infogérance IT ?",
        a: "La TMA (Tierce Maintenance Applicative) couvre le maintien en condition opérationnelle des applications (corrective, évolutive, adaptative). L'infogérance IT est plus large : elle inclut la TMA mais aussi la gestion de l'infrastructure (serveurs, réseau, cloud) et le helpdesk utilisateurs.",
        qEn: "What is the difference between TMA and IT managed services?",
        aEn: "TMA (Third-Party Application Maintenance) covers keeping applications running (corrective, evolutionary, adaptive). IT managed services is broader: it includes TMA but also infrastructure management (servers, network, cloud) and user helpdesk.",
      },
      {
        q: "Vos équipes TMA connaissent-elles les ERP Sage et Cegid utilisés en France ?",
        a: "Oui. Nos équipes TMA incluent des profils certifiés Sage 100, Sage X3, Cegid Business et Cegid Y2, les ERP les plus répandus dans les PME et ETI françaises. Nous assurons également la TMA sur SAP Business One, Microsoft Dynamics 365 et Oracle.",
        qEn: "Are your TMA teams familiar with Sage and Cegid ERPs used in France?",
        aEn: "Yes. Our TMA teams include Sage 100, Sage X3, Cegid Business and Cegid Y2 certified profiles — the most common ERPs in French SMEs and mid-caps. We also provide TMA on SAP Business One, Microsoft Dynamics 365 and Oracle.",
      },
      {
        q: "Proposez-vous des SLA avec GTI et GTR contractuels ?",
        a: "Oui. Nos contrats TMA incluent des SLA avec GTI (Garantie de Temps d'Intervention) et GTR (Garantie de Temps de Rétablissement) adaptés à la criticité de chaque application : P1 (critique) de 15 min / 4h à P4 (faible) de 8h / 5 jours ouvrés.",
        qEn: "Do you offer SLAs with contractual GTI and GTR guarantees?",
        aEn: "Yes. Our TMA contracts include SLAs with GTI (Response Time Guarantee) and GTR (Resolution Time Guarantee) adapted to each application's criticality: P1 (critical) 15 min/4h to P4 (low) 8h/5 business days.",
      },
    ],
    heroImage: "/images/hero-paris-operations.webp",
  },
  {
    slug: "rpo-france",
    icon: "👥",
    name: "RPO — Recrutement externalisé",
    nameEn: "RPO — Recruitment Process Outsourcing",
    metaTitle: "RPO France — Recrutement externalisé pour entreprises françaises",
    metaTitleEn: "RPO France — Recruitment Process Outsourcing for French Companies",
    metaDescription: "RPO (Recruitment Process Outsourcing) en France : recrutement externalisé en volume, gestion de la marque employeur et sourcing BPO/IT/IA. Corpshore RH externalisée.",
    metaDescriptionEn: "RPO (Recruitment Process Outsourcing) in France: volume recruitment, employer brand management and BPO/IT/AI sourcing. Corpshore outsourced HR.",
    keywords: "RPO France, recrutement externalisé France, recrutement en volume France, RPO BPO France, sourcing RH externalisé, marque employeur France, recrutement IT externalisé France, externalisation RH recrutement France, RPO PME France",
    keywordsEn: "RPO France, outsourced recruitment France, volume recruitment France, RPO BPO France, outsourced HR sourcing France, employer brand France, outsourced IT recruitment France, HR outsourcing recruitment France",
    intro: "Le RPO (Recruitment Process Outsourcing) Corpshore prend en charge tout ou partie de votre processus de recrutement : sourcing, qualification téléphonique, organisation des entretiens, suivi des candidats et onboarding administratif. Spécialisation BPO, IT, IA et fonctions support en France et en Europe francophone.",
    introEn: "Corpshore RPO (Recruitment Process Outsourcing) takes over all or part of your recruitment process: sourcing, phone screening, interview scheduling, candidate follow-up and administrative onboarding. Specialisation in BPO, IT, AI and support functions in France and French-speaking Europe.",
    features: [
      {
        title: "Recrutement en volume",
        titleEn: "Volume recruitment",
        body: "Pour les ouvertures de 10 postes similaires et plus : sourcing mutualisé, processus standardisé, livraison de candidats qualifiés en 72 heures, délai de placement moyen 12 jours.",
        bodyEn: "For openings of 10 or more similar positions: pooled sourcing, standardised process, qualified candidate delivery within 72 hours, average placement time 12 days.",
      },
      {
        title: "RPO sur mesure",
        titleEn: "Bespoke RPO",
        body: "Prise en charge partielle (sourcing uniquement) ou totale (de l'offre d'emploi à la promesse d'embauche). Intégration à votre ATS (Workday, SAP SuccessFactors, Lever, Greenhouse).",
        bodyEn: "Partial (sourcing only) or full take-over (from job posting to offer). Integration with your ATS (Workday, SAP SuccessFactors, Lever, Greenhouse).",
      },
      {
        title: "Sourcing BPO, IT & IA",
        titleEn: "BPO, IT & AI sourcing",
        body: "Base de candidats qualifiés pour les profils BPO (téléconseillers, superviseurs, team leaders), IT (développeurs, chefs de projet, architectes cloud) et IA (data scientists, annotateurs, prompt engineers).",
        bodyEn: "Qualified candidate database for BPO profiles (advisors, supervisors, team leaders), IT (developers, project managers, cloud architects) and AI (data scientists, annotators, prompt engineers).",
      },
      {
        title: "Marque employeur & talent marketing",
        titleEn: "Employer brand & talent marketing",
        body: "Rédaction des offres d'emploi optimisées pour Google for Jobs, campagnes de sourcing sur LinkedIn Recruiter et Indeed, vidéos de témoignages employés pour attirer les candidats passifs.",
        bodyEn: "Google for Jobs optimised job ads, sourcing campaigns on LinkedIn Recruiter and Indeed, employee testimonial videos to attract passive candidates.",
      },
    ],
    faq: [
      {
        q: "Quel est le délai moyen de placement d'un candidat BPO qualifié en France ?",
        a: "Pour les profils BPO (téléconseillers, agents bilingues), notre délai moyen de présentation de candidats qualifiés est de 5 jours ouvrables. Pour les profils IT senior, comptez 15 à 20 jours.",
        qEn: "What is the average placement time for a qualified BPO candidate in France?",
        aEn: "For BPO profiles (advisors, bilingual agents), our average time to present qualified candidates is 5 business days. For senior IT profiles, allow 15 to 20 days.",
      },
      {
        q: "Pouvez-vous vous intégrer à notre ATS existant ?",
        a: "Oui. Nos équipes RPO s'intègrent aux principaux ATS du marché français et européen : Workday, SAP SuccessFactors, Lever, Greenhouse, Recruitee, Talentsoft (Cegid) et Teamtailor. Nous nous adaptons à vos workflows existants.",
        qEn: "Can you integrate with our existing ATS?",
        aEn: "Yes. Our RPO teams integrate with the main ATS on the French and European market: Workday, SAP SuccessFactors, Lever, Greenhouse, Recruitee, Talentsoft (Cegid) and Teamtailor. We adapt to your existing workflows.",
      },
    ],
    heroImage: "/images/recrutement-teletravail-france.webp",
  },
  {
    slug: "bpo-france",
    icon: "🏢",
    name: "BPO France — Externalisation des processus métier",
    nameEn: "BPO France — Business Process Outsourcing",
    metaTitle: "BPO France #1 — Externalisation processus métier pour entreprises françaises",
    metaTitleEn: "BPO France #1 — Business Process Outsourcing for French Companies",
    metaDescription: "Corpshore, #1 BPO en France selon Outsource Accelerator 2026. Externalisation du service client, back-office, comptabilité et support IT pour entreprises françaises.",
    metaDescriptionEn: "Corpshore, #1 BPO in France per Outsource Accelerator 2026. Customer service, back-office, accounting and IT support outsourcing for French companies.",
    keywords: "BPO France, externalisation processus métier France, prestataire BPO France numéro 1, outsourcing France, centre d'appels France, service client externalisé France, back-office externalisé France, externalisation France entreprises",
    keywordsEn: "BPO France, business process outsourcing France, number one BPO provider France, outsourcing France, contact center France, outsourced customer service France, outsourced back-office France",
    intro: "Corpshore est classé #1 BPO en France par Outsource Accelerator, le principal classement mondial des prestataires d'externalisation. Nous accompagnons des entreprises françaises et internationales dans l'externalisation de leurs processus non-stratégiques : service client, back-office, comptabilité, paie et support IT.",
    introEn: "Corpshore is ranked #1 BPO in France by Outsource Accelerator, the world's leading outsourcing provider ranking. We support French and international companies in outsourcing their non-strategic processes: customer service, back-office, accounting, payroll and IT support.",
    features: [
      {
        title: "Service client multicanal",
        titleEn: "Multichannel customer service",
        body: "Téléphone, email, chat en direct, réseaux sociaux, WhatsApp Business. Disponibilité 24/7 ou aux heures ouvrées françaises. CSAT moyen de 4,6/5 sur nos opérations client.",
        bodyEn: "Phone, email, live chat, social media, WhatsApp Business. 24/7 or French business hours availability. Average CSAT of 4.6/5 across our client operations.",
      },
      {
        title: "Back-office & traitement de données",
        titleEn: "Back-office & data processing",
        body: "Saisie de données, numérisation, contrôle qualité, traitement de formulaires, gestion documentaire, archivage numérique conforme RGPD.",
        bodyEn: "Data entry, digitisation, quality control, form processing, document management, GDPR-compliant digital archiving.",
      },
      {
        title: "Finance & comptabilité externalisées",
        titleEn: "Outsourced finance & accounting",
        body: "Comptabilité générale PCG, saisie des pièces, rapprochement bancaire, déclarations de TVA, bilan annuel en liaison avec votre expert-comptable.",
        bodyEn: "PCG general accounting, entry posting, bank reconciliation, VAT returns, annual accounts in liaison with your statutory auditor.",
      },
      {
        title: "RH & paie externalisées",
        titleEn: "Outsourced HR & payroll",
        body: "Gestion de la paie DSN, administration du personnel, suivi des congés et absences, SIRH en mode SaaS, onboarding et offboarding des collaborateurs.",
        bodyEn: "DSN payroll management, HR administration, leave and absence tracking, SaaS HRIS, employee onboarding and offboarding.",
      },
    ],
    faq: [
      {
        q: "Pourquoi Corpshore est-il classé #1 BPO en France par Outsource Accelerator ?",
        a: "Le classement Outsource Accelerator évalue la qualité de service, la satisfaction client, la stabilité financière et la capacité d'innovation. Corpshore a été distingué pour sa spécialisation sur le marché français, sa maîtrise des réglementations locales et ses références clients dans des secteurs exigeants (finance, santé, secteur public).",
        qEn: "Why is Corpshore ranked #1 BPO in France by Outsource Accelerator?",
        aEn: "The Outsource Accelerator ranking evaluates service quality, client satisfaction, financial stability and innovation capacity. Corpshore was distinguished for its specialisation in the French market, mastery of local regulations and client references in demanding sectors (finance, healthcare, public sector).",
      },
      {
        q: "Quel est le coût moyen d'un service BPO en France ?",
        a: "Les tarifs BPO varient selon le modèle (nearshore/offshore), le volume et la complexité. À titre indicatif, un FTE service client nearshore francophone est 40 à 65% moins cher qu'un équivalent en France métropolitaine. Nous proposons un devis personnalisé sans engagement.",
        qEn: "What is the average cost of a BPO service in France?",
        aEn: "BPO pricing varies by model (nearshore/offshore), volume and complexity. As a guide, a francophone nearshore customer service FTE is 40 to 65% less expensive than a metropolitan France equivalent. We offer a no-commitment personalised quote.",
      },
      {
        q: "Combien de temps faut-il pour démarrer une opération BPO avec Corpshore ?",
        a: "Pour des renforts ponctuels, nous intervenons sous 48 heures. Pour une équipe dédiée, le déploiement standard est de 2 à 6 semaines selon la complexité de la formation métier et les contraintes techniques.",
        qEn: "How long does it take to start a BPO operation with Corpshore?",
        aEn: "For ad hoc support, we can deploy within 48 hours. For a dedicated team, the standard deployment is 2 to 6 weeks depending on the complexity of business training and technical constraints.",
      },
    ],
    heroImage: "/images/hero-paris-operations.webp",
  },
];

export function getServiceBySlug(slug: string): ServiceDeep | undefined {
  return servicesDeep.find((s) => s.slug === slug);
}
