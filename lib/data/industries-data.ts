export interface IndustrySector {
  slug: string;
  icon: string;
  name: string;
  nameEn: string;
  regs: string;
  metaTitle: string;
  metaTitleEn: string;
  metaDescription: string;
  metaDescriptionEn: string;
  keywords: string;
  keywordsEn: string;
  body: string;
  bodyEn: string;
  services: string[];
  servicesEn: string[];
  faq: { q: string; a: string; qEn: string; aEn: string }[];
  heroImage?: string;
}

export const industrySectors: IndustrySector[] = [
  {
    slug: "ecommerce",
    icon: "🛒",
    name: "E-commerce & Retail",
    nameEn: "E-commerce & Retail",
    regs: "DSA · RGPD · LCEN · NF Service",
    metaTitle: "BPO E-commerce France — Service client & back-office externalisé",
    metaTitleEn: "BPO E-commerce France — Outsourced Customer Service & Back-Office",
    metaDescription: "Externalisation du service client e-commerce, gestion des retours, modération DSA et traitement des commandes en France. Corpshore, #1 BPO e-commerce en France.",
    metaDescriptionEn: "E-commerce customer service outsourcing, returns management, DSA moderation and order processing in France. Corpshore, #1 e-commerce BPO in France.",
    keywords: "BPO e-commerce France, service client e-commerce externalisé, externalisation retail France, modération DSA France, gestion retours externalisée, centre d'appels e-commerce France, BPO commerce en ligne",
    keywordsEn: "BPO ecommerce France, outsourced ecommerce customer service, retail BPO France, DSA moderation France, returns management outsourcing France, ecommerce contact center France",
    body: "Corpshore accompagne les e-commerçants français et internationaux avec des équipes dédiées, formées aux spécificités du commerce en ligne français : droit de la consommation, délais de rétractation, obligations LCEN et conformité DSA. Montée en charge en 48h pour les périodes de pic (Black Friday, Noël, soldes).",
    bodyEn: "Corpshore supports French and international e-commerce companies with dedicated teams trained in the specificities of French online retail: consumer law, withdrawal periods, LCEN obligations and DSA compliance. Scale-up within 48 hours for peak periods (Black Friday, Christmas, sales).",
    services: ["Service client multicanal 24/7", "Gestion retours & litiges", "Modération DSA & contenus", "Traitement commandes", "Traduction catalogue", "Fidélisation client"],
    servicesEn: ["24/7 multichannel customer service", "Returns & dispute management", "DSA & content moderation", "Order processing", "Catalogue translation", "Customer retention"],
    faq: [
      {
        q: "Quel est le délai de déploiement d'une équipe BPO e-commerce ?",
        a: "Entre 2 et 4 semaines pour une équipe dédiée. Pour les renforts ponctuels (Black Friday, soldes), nous intervenons sous 48 heures avec des agents déjà formés aux scripts e-commerce.",
        qEn: "How quickly can you deploy an e-commerce BPO team?",
        aEn: "Between 2 and 4 weeks for a dedicated team. For seasonal surges (Black Friday, sales), we can deploy within 48 hours with agents already trained on e-commerce scripts.",
      },
      {
        q: "Vos agents connaissent-ils les obligations légales du e-commerce français (LCEN, droit de rétractation) ?",
        a: "Oui. Tous nos agents e-commerce reçoivent une formation aux obligations légales françaises : délai de rétractation de 14 jours, politique de retour, mentions LCEN et conformité DSA. Nous mettons à jour les scripts à chaque évolution réglementaire.",
        qEn: "Do your agents know French e-commerce legal obligations?",
        aEn: "Yes. All our e-commerce agents receive training on French legal obligations: the 14-day withdrawal right, returns policy, LCEN notices and DSA compliance. We update scripts with every regulatory change.",
      },
      {
        q: "Gérez-vous la modération de contenus pour les marketplaces françaises ?",
        a: "Oui. Nous assurons la modération humaine et assistée par IA pour les marketplaces soumises au DSA, avec des délais conformes aux exigences réglementaires et des rapports de transparence.",
        qEn: "Do you handle content moderation for French marketplaces?",
        aEn: "Yes. We provide human and AI-assisted moderation for DSA-regulated marketplaces, meeting regulatory deadlines and providing transparency reports.",
      },
    ],
    heroImage: "/images/service-client-multicanal-ecommerce-france.webp",
  },
  {
    slug: "services-financiers",
    icon: "🏦",
    name: "Services financiers & Banque",
    nameEn: "Financial Services & Banking",
    regs: "AMF · ACPR · RGPD · MiFID II · Bâle III",
    metaTitle: "BPO Services financiers France — Back-office bancaire externalisé",
    metaTitleEn: "BPO Financial Services France — Outsourced Banking Back-Office",
    metaDescription: "Externalisation du back-office bancaire, KYC/AML, reporting réglementaire MiFID II et conformité ACPR pour établissements financiers en France. Corpshore BPO.",
    metaDescriptionEn: "Banking back-office outsourcing, KYC/AML, MiFID II regulatory reporting and ACPR compliance for financial institutions in France. Corpshore BPO.",
    keywords: "BPO banque France, back-office bancaire externalisé, KYC AML externalisation France, reporting réglementaire MiFID II, conformité ACPR outsourcing, BPO services financiers France, externalisation fintech France",
    keywordsEn: "BPO banking France, outsourced banking back-office France, KYC AML outsourcing France, MiFID II regulatory reporting outsourcing, ACPR compliance outsourcing, financial services BPO France",
    body: "Nos équipes financières maîtrisent le cadre réglementaire français et européen : AMF, ACPR, MiFID II, Bâle III. Nous traitons les dossiers KYC/AML, le back-office titres, la conformité reporting et le support clients bancaires en français, tout en appliquant des protocoles stricts de sécurité des données financières.",
    bodyEn: "Our financial teams master the French and European regulatory framework: AMF, ACPR, MiFID II, Basel III. We handle KYC/AML files, securities back-office, compliance reporting and French-language banking customer support, applying strict financial data security protocols.",
    services: ["KYC & due diligence", "Back-office titres", "Reporting MiFID II / ACPR", "Support clients bancaires", "Traitement dossiers crédit", "Conformité anti-blanchiment"],
    servicesEn: ["KYC & due diligence", "Securities back-office", "MiFID II / ACPR reporting", "Banking customer support", "Credit file processing", "AML compliance"],
    faq: [
      {
        q: "Vos équipes sont-elles formées aux exigences KYC/AML françaises ?",
        a: "Oui. Nos agents reçoivent une formation spécifique aux obligations LCB-FT (Lutte contre le Blanchiment et le Financement du Terrorisme), aux listes de sanctions et aux procédures de vigilance renforcée exigées par l'ACPR.",
        qEn: "Are your teams trained in French KYC/AML requirements?",
        aEn: "Yes. Our agents receive specific training in AML/CFT obligations, sanctions lists and enhanced due diligence procedures required by the ACPR.",
      },
      {
        q: "Comment garantissez-vous la sécurité des données financières de nos clients ?",
        a: "Nos processus sont certifiés ISO 27001. Nous appliquons le chiffrement des données en transit et au repos, l'authentification multifacteur, l'accès sur la base du besoin, et nous signons un DPA conforme au RGPD avec chaque client.",
        qEn: "How do you guarantee the security of our clients' financial data?",
        aEn: "Our processes are ISO 27001 certified. We apply encryption in transit and at rest, multi-factor authentication, need-to-know access, and sign a GDPR-compliant DPA with every client.",
      },
      {
        q: "Pouvez-vous produire le reporting réglementaire MiFID II pour le compte de nos conseillers ?",
        a: "Oui. Nous prenons en charge la production, le contrôle qualité et la transmission des rapports réglementaires MiFID II et ACPR, avec des délais garantis par SLA.",
        qEn: "Can you produce MiFID II regulatory reporting on behalf of our advisors?",
        aEn: "Yes. We handle the production, quality control and submission of MiFID II and ACPR regulatory reports, with SLA-guaranteed deadlines.",
      },
    ],
    heroImage: "/images/secteur-public-digitalisation.webp",
  },
  {
    slug: "sante",
    icon: "🏥",
    name: "Santé & Pharmacie",
    nameEn: "Healthcare & Pharma",
    regs: "HDS · RGPD · CIM-10 · ANSSI · CNIL",
    metaTitle: "BPO Santé France — Traitement données médicales HDS externalisé",
    metaTitleEn: "BPO Healthcare France — Outsourced HDS Medical Data Processing",
    metaDescription: "Externalisation des données de santé certifiée HDS, codification CIM-10, support patients en français. Corpshore BPO Santé France — zéro incident sécurité sur 18+ mois.",
    metaDescriptionEn: "HDS-certified health data outsourcing, ICD-10 coding, French-language patient support. Corpshore Healthcare BPO France — zero security incidents over 18+ months.",
    keywords: "BPO santé France, traitement données médicales externalisé, HDS hébergeur données santé, codification CIM-10 France, BPO pharmacie France, externalisation santé RGPD, support patients externalisé France",
    keywordsEn: "BPO healthcare France, outsourced medical data processing France, HDS health data hosting, ICD-10 coding outsourcing France, pharma BPO France, healthcare outsourcing GDPR France",
    body: "Corpshore est l'un des rares prestataires BPO à opérer avec une certification hébergeur données de santé (HDS) type 1 et 2. Nos équipes traitent les dossiers médicaux, la codification CIM-10 et le support téléphonique patients exclusivement en français, sous des protocoles ANSSI et CNIL stricts. Zéro incident de sécurité sur 18+ mois de références actives.",
    bodyEn: "Corpshore is one of the few BPO providers operating with HDS type 1 and 2 health data hosting certification. Our teams process medical records, ICD-10 coding and French-language patient phone support, under strict ANSSI and CNIL protocols. Zero security incidents across 18+ months of active references.",
    services: ["Dossiers médicaux HDS", "Codification CIM-10", "Support patients FR", "Numérisation archives médicales", "Conformité ANSSI/CNIL", "Back-office assurance santé"],
    servicesEn: ["HDS medical records", "ICD-10 coding", "French patient support", "Medical archive digitisation", "ANSSI/CNIL compliance", "Health insurance back-office"],
    faq: [
      {
        q: "Êtes-vous certifiés HDS pour héberger des données de santé françaises ?",
        a: "Oui. Nous opérons sous certification HDS type 1 (infrastructure) et type 2 (services gérés), telle qu'exigée par l'article L. 1111-8 du Code de la santé publique pour tout traitement de données de santé à caractère personnel.",
        qEn: "Are you HDS certified to host French health data?",
        aEn: "Yes. We operate under HDS type 1 (infrastructure) and type 2 (managed services) certification, as required by French health code article L. 1111-8 for processing personal health data.",
      },
      {
        q: "Vos agents peuvent-ils traiter des données patients sous la contrainte CNIL ?",
        a: "Oui. Chaque agent signe un accord de confidentialité renforcé. Nos processus sont audités annuellement et nous maintenons un registre de traitement conforme à l'article 30 du RGPD, disponible sur demande.",
        qEn: "Can your agents process patient data under CNIL constraints?",
        aEn: "Yes. Each agent signs an enhanced confidentiality agreement. Our processes are audited annually and we maintain a processing register compliant with GDPR article 30, available on request.",
      },
      {
        q: "Proposez-vous la codification CIM-10 pour les établissements de santé français ?",
        a: "Oui. Nos codificateurs médicaux sont formés à la Classification Internationale des Maladies CIM-10 (version française de l'OMS) et aux référentiels PMSI utilisés par les établissements de santé français.",
        qEn: "Do you offer ICD-10 coding for French healthcare establishments?",
        aEn: "Yes. Our medical coders are trained in the ICD-10 International Classification of Diseases (French WHO version) and the PMSI frameworks used by French healthcare institutions.",
      },
    ],
    heroImage: "/images/service-client-multicanal-ecommerce-france.webp",
  },
  {
    slug: "assurance",
    icon: "🛡️",
    name: "Assurance & Mutuelles",
    nameEn: "Insurance & Mutual Funds",
    regs: "ACPR · Solvabilité II · RGPD · IARD · DDA",
    metaTitle: "BPO Assurance France — Gestion sinistres & back-office mutuelles",
    metaTitleEn: "BPO Insurance France — Claims Management & Mutual Back-Office",
    metaDescription: "Externalisation de la gestion des sinistres IARD, du service adhérents mutuelles et de la conformité ACPR/Solvabilité II pour les assureurs français. Corpshore BPO.",
    metaDescriptionEn: "IARD claims management outsourcing, mutual member services and ACPR/Solvency II compliance for French insurers. Corpshore BPO.",
    keywords: "BPO assurance France, gestion sinistres externalisée, back-office mutuelle France, conformité ACPR Solvabilité II, externalisation assurance IARD, centre d'appels assurance France, BPO courtage assurance",
    keywordsEn: "BPO insurance France, outsourced claims management France, mutual back-office France, ACPR Solvency II compliance outsourcing, IARD insurance BPO France, insurance contact center France",
    body: "Nos équipes assurance sont formées aux conventions IRSA, IRCA et aux spécificités des contrats IARD et santé collectif français. Gestion des sinistres, traitement des contrats, service adhérents et conformité réglementaire (ACPR, Solvabilité II, DDA) — tout en maintenant les SLA exigés par les assureurs de premier rang.",
    bodyEn: "Our insurance teams are trained in IRSA, IRCA conventions and the specificities of French IARD and group health contracts. Claims management, contract processing, member services and regulatory compliance (ACPR, Solvency II, IDD) — while maintaining the SLAs required by tier-one insurers.",
    services: ["Gestion sinistres IARD", "Service adhérents mutuelles", "Conformité ACPR / Solvabilité II", "Traitement contrats santé", "Détection fraude", "Back-office réassurance"],
    servicesEn: ["IARD claims management", "Mutual member services", "ACPR / Solvency II compliance", "Health contract processing", "Fraud detection", "Reinsurance back-office"],
    faq: [
      {
        q: "Vos agents connaissent-ils les conventions IRSA et IRCA ?",
        a: "Oui. Nos responsables sinistres sont formés aux conventions IRSA (responsabilité matérielle) et IRCA (responsabilité corporelle) qui régissent les relations entre assureurs en France pour les sinistres automobiles.",
        qEn: "Are your agents familiar with IRSA and IRCA conventions?",
        aEn: "Yes. Our claims handlers are trained in IRSA (material liability) and IRCA (bodily injury liability) conventions governing relations between French insurers for motor claims.",
      },
      {
        q: "Pouvez-vous gérer le service adhérents d'une mutuelle santé avec les codifications CCAM/NGAP ?",
        a: "Oui. Nos équipes santé maîtrisent la CCAM et la NGAP pour le traitement des remboursements et le support aux adhérents. Nous assurons les remontées NOEMIE et la coordination avec les régimes obligatoires.",
        qEn: "Can you manage a health mutual's member services with CCAM/NGAP codes?",
        aEn: "Yes. Our health teams master CCAM and NGAP for reimbursement processing and member support. We handle NOEMIE submissions and coordination with mandatory insurance schemes.",
      },
      {
        q: "Comment garantissez-vous la conformité aux exigences de la DDA (directive distribution d'assurance) ?",
        a: "Nos scripts de vente et de conseil sont validés par des juristes spécialisés assurance. Nous assurons l'enregistrement des appels à des fins de traçabilité et produisons les documents d'information DDA requis.",
        qEn: "How do you ensure compliance with IDD (insurance distribution directive) requirements?",
        aEn: "Our sales and advisory scripts are validated by insurance law specialists. We ensure call recording for traceability and produce the required IDD information documents.",
      },
    ],
    heroImage: "/images/secteur-public-digitalisation.webp",
  },
  {
    slug: "telecom",
    icon: "📡",
    name: "Télécommunications",
    nameEn: "Telecommunications",
    regs: "ARCEP · RGPD · Code des postes et télécommunications",
    metaTitle: "BPO Télécommunications France — Back-office abonnés & support technique",
    metaTitleEn: "BPO Telecommunications France — Subscriber Back-Office & Technical Support",
    metaDescription: "Externalisation du back-office abonnés télécoms, gestion portabilité, support technique N1/N2 en français et litiges de facturation. Corpshore BPO Télécom France.",
    metaDescriptionEn: "Telecommunications subscriber back-office outsourcing, portability management, French-language N1/N2 technical support and billing disputes. Corpshore BPO France.",
    keywords: "BPO télécommunications France, back-office abonnés externalisé, support technique télécom France, gestion portabilité opérateur, litiges facturation télécom, centre d'appels télécom France, BPO opérateur mobile France",
    keywordsEn: "BPO telecommunications France, outsourced subscriber back-office France, telecom technical support France, mobile number portability management, billing dispute resolution telecom France",
    body: "Corpshore gère le back-office abonnés pour des opérateurs télécoms traitant plus de 2 millions d'abonnés. Nos équipes maîtrisent les processus de portabilité fixe et mobile (RIO, délais ARCEP), le support technique N1 à N3 en français et la résolution des litiges de facturation, avec une optimisation continue des coûts unitaires.",
    bodyEn: "Corpshore manages subscriber back-office for telecom operators handling over 2 million subscribers. Our teams master fixed and mobile portability processes (RIO, ARCEP deadlines), French-language N1 to N3 technical support and billing dispute resolution, with continuous unit cost optimisation.",
    services: ["Back-office abonnés", "Gestion portabilité RIO", "Support technique N1/N2/N3", "Litiges facturation", "Activation & provisioning", "Rétention & fidélisation"],
    servicesEn: ["Subscriber back-office", "RIO portability management", "N1/N2/N3 technical support", "Billing dispute resolution", "Activation & provisioning", "Retention & loyalty"],
    faq: [
      {
        q: "Pouvez-vous gérer la portabilité des numéros conformément aux délais ARCEP ?",
        a: "Oui. Nos équipes portabilité respectent les délais réglementaires ARCEP (1 jour ouvrable pour le fixe, 3 jours pour le mobile) et coordonnent les transferts avec tous les opérateurs français via le RIO.",
        qEn: "Can you manage number portability within ARCEP deadlines?",
        aEn: "Yes. Our portability teams comply with ARCEP regulatory deadlines (1 business day for fixed, 3 days for mobile) and coordinate transfers with all French operators via RIO.",
      },
      {
        q: "Vos agents peuvent-ils assurer le support technique N2 pour les services ADSL/Fibre ?",
        a: "Oui. Nous assurons le support N1 (prise en charge, diagnostic de base) et N2 (diagnostic avancé CPE, configuration routeur, escalade technicien terrain) pour les services xDSL, FTTH et FTTB.",
        qEn: "Can your agents provide N2 technical support for ADSL/Fibre services?",
        aEn: "Yes. We provide N1 (intake, basic diagnosis) and N2 (advanced CPE diagnosis, router configuration, field technician escalation) support for xDSL, FTTH and FTTB services.",
      },
    ],
    heroImage: "/images/secteur-public-digitalisation.webp",
  },
  {
    slug: "tourisme",
    icon: "✈️",
    name: "Tourisme & Hôtellerie",
    nameEn: "Tourism & Hospitality",
    regs: "RGPD · Loi Montagne · Atout France · IATA",
    metaTitle: "BPO Tourisme France — Conciergerie & réservations multilingues externalisées",
    metaTitleEn: "BPO Tourism France — Outsourced Multilingual Concierge & Reservations",
    metaDescription: "Conciergerie multilingue 24/7, gestion des réservations et SAV voyages externalisés pour hôtels, compagnies aériennes et agences de voyage en France. Corpshore BPO.",
    metaDescriptionEn: "24/7 multilingual concierge, reservation management and travel after-sales outsourced for hotels, airlines and travel agencies in France. Corpshore BPO.",
    keywords: "BPO tourisme France, conciergerie multilingue externalisée, gestion réservations hôtel externalisée, SAV voyages France, BPO compagnies aériennes, service client hôtellerie France, back-office agence de voyage",
    keywordsEn: "BPO tourism France, outsourced multilingual concierge, outsourced hotel reservation management France, travel after-sales France, airline BPO France, hospitality customer service France",
    body: "Corpshore déploie des équipes de conciergerie multilingue pour hôtels palace, chaînes hôtelières et compagnies aériennes avec une maîtrise de 6 langues sur des équipes dédiées. Disponibilité 24/7, gestion des modifications et annulations dans les GDS (Amadeus, Sabre), conformité IATA et traitement des réclamations voyageurs.",
    bodyEn: "Corpshore deploys multilingual concierge teams for palace hotels, hotel chains and airlines with 6-language capability on dedicated teams. 24/7 availability, modifications and cancellations management in GDS (Amadeus, Sabre), IATA compliance and traveller claims processing.",
    services: ["Conciergerie 24/7 multilingue", "Réservations GDS (Amadeus, Sabre)", "SAV voyages & réclamations", "Gestion annulations/modifications", "Support vols & bagages", "Retentissement client VIP"],
    servicesEn: ["24/7 multilingual concierge", "GDS reservations (Amadeus, Sabre)", "Travel after-sales & claims", "Cancellation/modification management", "Flight & baggage support", "VIP client retention"],
    faq: [
      {
        q: "En combien de langues vos agents peuvent-ils assurer la conciergerie hôtelière ?",
        a: "Nos équipes hôtellerie opèrent en français, anglais, espagnol, arabe, néerlandais et portugais brésilien. Des équipes en allemand et mandarin sont disponibles sur demande pour les hôtels à forte clientèle internationale.",
        qEn: "In how many languages can your agents provide hotel concierge services?",
        aEn: "Our hospitality teams operate in French, English, Spanish, Arabic, Dutch and Brazilian Portuguese. German and Mandarin teams are available on request for hotels with a strong international clientele.",
      },
      {
        q: "Vos agents sont-ils formés aux GDS (Amadeus, Sabre, Galileo) ?",
        a: "Oui. Nos agents réservations reçoivent une certification interne sur Amadeus et Sabre, couvrant la recherche de disponibilités, la création de PNR, les modifications et les émissions de billets électroniques.",
        qEn: "Are your agents trained on GDS systems (Amadeus, Sabre, Galileo)?",
        aEn: "Yes. Our reservations agents receive internal certification on Amadeus and Sabre, covering availability searches, PNR creation, modifications and e-ticket issuance.",
      },
    ],
    heroImage: "/images/recrutement-teletravail-france.webp",
  },
  {
    slug: "secteur-public",
    icon: "🏛️",
    name: "Secteur public & Collectivités",
    nameEn: "Public Sector & Local Authorities",
    regs: "ANSSI · HDS · Code marchés publics · LCEN · RGS",
    metaTitle: "BPO Secteur public France — Externalisation administrations & collectivités",
    metaTitleEn: "BPO Public Sector France — Outsourcing for Administrations & Local Authorities",
    metaDescription: "Traitement de dossiers administratifs, numérisation d'archives, helpdesk agents publics et centres de contact citoyens pour administrations françaises. Corpshore BPO.",
    metaDescriptionEn: "Administrative file processing, archive digitisation, public agent helpdesk and citizen contact centres for French administrations. Corpshore BPO.",
    keywords: "BPO secteur public France, externalisation administration publique, numérisation archives collectivités, helpdesk agents publics France, centre de contact citoyens, BPO marchés publics France",
    keywordsEn: "BPO public sector France, outsourcing public administration France, local authority archive digitisation, French public agent helpdesk, citizen contact centre France",
    body: "Corpshore accompagne ministères, collectivités territoriales et établissements publics français sur la numérisation des archives, le traitement de dossiers administratifs et les centres de contact citoyens. Conformité ANSSI (référentiel RGS), respect du code des marchés publics, habilitation sur les données sensibles disponible.",
    bodyEn: "Corpshore supports French ministries, local authorities and public establishments on archive digitisation, administrative file processing and citizen contact centres. ANSSI compliance (RGS framework), public procurement code compliance, sensitive data clearance available.",
    services: ["Numérisation archives publiques", "Traitement dossiers administratifs", "Centre de contact citoyens", "Helpdesk agents publics", "Conformité ANSSI/RGS", "Accessibilité RGAA"],
    servicesEn: ["Public archive digitisation", "Administrative file processing", "Citizen contact centre", "Public agent helpdesk", "ANSSI/RGS compliance", "RGAA accessibility"],
    faq: [
      {
        q: "Pouvez-vous répondre à un appel d'offres marché public pour des services BPO ?",
        a: "Oui. Corpshore dispose d'une expérience dans les marchés publics français. Nous pouvons répondre seuls ou en groupement momentané d'entreprises (GME). Nos références incluent des prestations pour des collectivités et des établissements publics nationaux.",
        qEn: "Can you respond to a public procurement tender for BPO services?",
        aEn: "Yes. Corpshore has experience in French public procurement. We can respond alone or as part of a temporary group of companies. Our references include services for local authorities and national public establishments.",
      },
      {
        q: "Vos systèmes sont-ils conformes aux exigences ANSSI pour les administrations ?",
        a: "Oui. Nous respectons le Référentiel Général de Sécurité (RGS) de l'ANSSI. Nos accès distants sont sécurisés par VPN certifié, MFA et journalisation des accès. Nos locaux peuvent faire l'objet d'une inspection de sécurité sur demande.",
        qEn: "Are your systems compliant with ANSSI requirements for public administrations?",
        aEn: "Yes. We comply with the ANSSI General Security Reference (RGS). Our remote accesses are secured by certified VPN, MFA and access logging. Our premises can be subject to a security inspection on request.",
      },
    ],
    heroImage: "/images/secteur-public-digitalisation.webp",
  },
  {
    slug: "pme-eti",
    icon: "🏗️",
    name: "PME & ETI françaises",
    nameEn: "French SMEs & Mid-Caps",
    regs: "PCG · DSN · RGPD · URSSAF",
    metaTitle: "BPO PME ETI France — Externalisation comptabilité, paie & service client",
    metaTitleEn: "BPO SME France — Accounting, Payroll & Customer Service Outsourcing",
    metaDescription: "Externalisation de la comptabilité PCG, de la paie DSN, du service client et du support IT adaptée aux PME et ETI françaises. Formules flexibles sans engagement long terme.",
    metaDescriptionEn: "PCG accounting, DSN payroll, customer service and IT support outsourcing tailored to French SMEs and mid-caps. Flexible packages without long-term commitment.",
    keywords: "BPO PME France, externalisation comptabilité PME, paie DSN externalisée France, service client PME externalisé, BPO ETI France, externalisation back-office PME, solution BPO flexible PME France",
    keywordsEn: "BPO SME France, SME accounting outsourcing France, DSN payroll outsourcing France, SME customer service outsourcing, mid-cap BPO France, flexible BPO solution SME France",
    body: "Corpshore propose aux PME et ETI françaises des solutions d'externalisation calibrées sur leur taille et leur budget : équipes partagées à partir de 0,5 FTE, engagement mensuel sans engagement pluriannuel, montée en charge progressive. Comptabilité PCG, paie DSN, service client, support IT — tout dans un contrat-cadre simplifié.",
    bodyEn: "Corpshore offers French SMEs and mid-caps outsourcing solutions calibrated to their size and budget: shared teams from 0.5 FTE, monthly commitment without multi-year lock-in, progressive scale-up. PCG accounting, DSN payroll, customer service, IT support — all in one simplified framework contract.",
    services: ["Comptabilité PCG externalisée", "Paie & DSN", "Service client partagé", "Support IT N1/N2", "Secrétariat externalisé", "Permanence téléphonique"],
    servicesEn: ["Outsourced PCG accounting", "Payroll & DSN", "Shared customer service", "N1/N2 IT support", "Outsourced secretarial", "Telephone answering service"],
    faq: [
      {
        q: "Quel est le minimum d'engagement pour une PME qui veut externaliser son service client ?",
        a: "Nous acceptons des engagements à partir de 0,5 FTE (équivalent temps plein) sur une base mensuelle. Idéal pour les PME qui veulent tester l'externalisation avant de passer à une équipe dédiée.",
        qEn: "What is the minimum commitment for an SME looking to outsource its customer service?",
        aEn: "We accept commitments from 0.5 FTE (full-time equivalent) on a monthly basis. Ideal for SMEs looking to test outsourcing before moving to a dedicated team.",
      },
      {
        q: "Pouvez-vous gérer notre paie avec les spécificités de la convention collective française qui nous concerne ?",
        a: "Oui. Nos gestionnaires de paie maîtrisent les principales conventions collectives françaises (SYNTEC, commerce, métallurgie, restauration, bâtiment, etc.) et assurent les déclarations DSN mensuelles et annuelles.",
        qEn: "Can you manage our payroll with the specificities of our French collective agreement?",
        aEn: "Yes. Our payroll managers master the main French collective agreements (SYNTEC, commerce, metallurgy, hospitality, construction, etc.) and handle monthly and annual DSN declarations.",
      },
    ],
    heroImage: "/images/recrutement-teletravail-france.webp",
  },
];

export function getSectorBySlug(slug: string): IndustrySector | undefined {
  return industrySectors.find((s) => s.slug === slug);
}
