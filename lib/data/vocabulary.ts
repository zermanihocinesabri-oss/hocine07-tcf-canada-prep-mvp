import { CefrLevel, QcmQuestion, VocabularyTheme } from "@/lib/types";

/** État intermédiaire d'une question de vocabulaire, converti en QcmQuestion pour QuizPlayer. */
export interface VocabQuizQuestion {
  id: string;
  theme: string;
  level: CefrLevel;
  passage: string;
  question: string;
  options: { id: string; text: string }[];
  correctOptionId: string;
  explanation: string;
  difficulty: "facile" | "moyen" | "difficile";
}

/**
 * VOCABULAIRE THEMATIQUE — grands sujets récurrents du TCF Canada.
 * Environnement, Éducation, Travail/Entreprise, Technologies & Société, Santé.
 * Chaque thème : liste de mots essentiels (définition + exemple + famille) et
 * un mini-quiz QCM d'application.
 */

export const vocabularyThemes: VocabularyTheme[] = [
  // ============================ ENVIRONNEMENT ============================
  {
    id: "environnement",
    title: "Environnement et climat",
    emoji: "🌱",
    level: "B2",
    description:
      "Transition écologique, énergie, déchets, biodiversité : un lexique incontournable des tâches écrites et orales du TCF.",
    words: [
      {
        word: "la transition écologique",
        translation: "ecological / green transition",
        wordClass: "groupe nominal",
        definition: "Le passage progressif d'une économie polluante vers un modèle durable.",
        example: "La transition écologique crée des emplois dans l'énergie solaire et l'éolien.",
        family: ["transitionner (rare)", "écologique", "durable"],
      },
      {
        word: "une énergie renouvelable",
        translation: "renewable energy",
        wordClass: "nom",
        definition: "Énergie issue de sources inépuisables : soleil, vent, eau.",
        example: "Le Canada mise sur les énergies renouvelables, notamment l'hydroélectricité.",
        family: ["renouvelable", "s'épuiser", "le gisement"],
      },
      {
        word: "l'empreinte carbone",
        translation: "carbon footprint",
        wordClass: "nom féminin",
        definition: "Quantité de gaz à effet de serre émise par une activité ou une personne.",
        example: "Réduire son empreinte carbone passe par moins de déplacements en avion.",
        family: ["les émissions", "le gaz à effet de serre", "décarboner"],
      },
      {
        word: "le gaspillage",
        translation: "wastefulness, wastage",
        wordClass: "nom masculin",
        definition: "Consommation inutile ou excessive d'une ressource.",
        example: "Le gaspillage alimentaire représente un tiers de la production mondiale.",
        family: ["gaspiller", "le gâchis", "l'anti-gaspi"],
      },
      {
        word: "la biodiversité",
        translation: "biodiversity",
        wordClass: "nom féminin",
        definition: "Diversité des espèces vivantes et des écosystèmes.",
        example: "La destruction des zones humides menace la biodiversité locale.",
        family: ["biologique", "divers", "l'écosystème"],
      },
      {
        word: "un déchet",
        translation: "waste, litter",
        wordClass: "nom masculin",
        definition: "Ce que l'on jette après usage.",
        example: "Le tri des déchets permet de recycler le plastique et le verre.",
        family: ["jeter", "le tri", "recycler", "incinérer"],
      },
      {
        word: "dépolluer",
        translation: "to clean up (pollution)",
        wordClass: "verbe",
        definition: "Retirer les polluants d'un lieu ou d'un milieu.",
        example: "Des projets de dépollution des sols industriels sont lancés.",
        family: ["la pollution", "polluer", "un polluant", "le dépolluant"],
      },
      {
        word: "la sécheresse",
        translation: "drought",
        wordClass: "nom féminin",
        definition: "Période prolongée sans pluie, qui assèche les sols.",
        example: "La sécheresse de l'été a entraîné des restrictions d'eau.",
        family: ["sec", "s'assécher", "la canicule", "les précipitations"],
      },
      {
        word: "une politique de développement durable",
        translation: "sustainable development policy",
        wordClass: "groupe nominal",
        definition: "Une politique qui concilie progrès économique, équité sociale et préservation de l'environnement.",
        example: "La ville a adopté une politique de développement durable ambitieuse.",
        family: ["durable", "soutenable", "l'équité", "préserver"],
      },
      {
        word: "le réchauffement climatique",
        translation: "global warming",
        wordClass: "nom masculin",
        definition: "Hausse des températures moyennes de la planète, due aux activités humaines.",
        example: "Le réchauffement climatique accélère la fonte des glaciers.",
        family: ["réchauffer", "climatique", "la fonte", "s'adapter"],
      },
      {
        word: "réglementer",
        translation: "to regulate",
        wordClass: "verbe",
        definition: "Fixer des règles que les acteurs doivent respecter.",
        example: "Il faut réglementer davantage les émissions des industriels.",
        family: ["la réglementation", "la norme", "l'encadrement", "contraindre"],
      },
      {
        word: "compenser",
        translation: "to offset / compensate",
        wordClass: "verbe",
        definition: "Équilibrer un impact négatif par une action positive équivalente.",
        example: "L'entreprise compense ses émissions en plantant des forêts.",
        family: ["la compensation", "l'offset carbone", "compensatoire"],
      },
    ],
  },

  // ============================ EDUCATION ============================
  {
    id: "education",
    title: "Éducation et formation",
    emoji: "🎓",
    level: "B2",
    description:
      "Système scolaire, apprentissages, reconnaissance des diplômes : des sujets très fréquents pour les candidats immigrants.",
    words: [
      {
        word: "la reconnaissance des diplômes",
        translation: "credential / degree recognition",
        wordClass: "groupe nominal",
        definition: "Procédure par laquelle un titre obtenu à l'étranger est accepté dans le pays d'accueil.",
        example: "La reconnaissance des diplômes est un enjeu majeur pour les nouveaux arrivants.",
        family: ["reconnaître", "un diplôme", "l'équivalence", "la qualification"],
      },
      {
        word: "l'insertion professionnelle",
        translation: "workforce / professional integration",
        wordClass: "nom féminin",
        definition: "Le fait pour une personne de trouver sa place sur le marché du travail.",
        example: "Les stages facilitent l'insertion professionnelle des étudiants.",
        family: ["insérer", "l'employabilité", "le marché du travail", "intégrer"],
      },
      {
        word: "une compétence",
        translation: "skill",
        wordClass: "nom féminin",
        definition: "Capacité à réaliser une tâche, acquise par la formation ou l'expérience.",
        example: "Les compétences numériques sont très recherchées sur le marché actuel.",
        family: ["compétent", "la qualification", "l'aptitude", "le savoir-faire"],
      },
      {
        word: "une formation continue",
        translation: "continuing education / lifelong learning",
        wordClass: "groupe nominal",
        definition: "Formation suivie par un adulte après sa formation initiale pour se perfectionner ou se reconvertir.",
        example: "Elle suit une formation continue en comptabilité le soir.",
        family: ["se former", "se perfectionner", "se reconvertir", "la montée en compétences"],
      },
      {
        word: "l'alphabétisation",
        translation: "literacy",
        wordClass: "nom féminin",
        definition: "Apprentissage de la lecture et de l'écriture pour les personnes qui ne les maîtrisent pas.",
        example: "Des centres d'alphabétisation accueillent les adultes débutants.",
        family: ["alphabète", "l'illettrisme", "se familiariser avec l'écrit"],
      },
      {
        word: "un programme d'études",
        translation: "study program / curriculum",
        wordClass: "groupe nominal",
        definition: "Ensemble organisé des matières enseignées dans une filière.",
        example: "Ce programme d'études combine cours théoriques et ateliers pratiques.",
        family: ["étudier", "une filière", "un cursus", "la matière"],
      },
      {
        word: "le décrochage scolaire",
        translation: "school dropout",
        wordClass: "nom masculin",
        definition: "Abandon des études avant la fin du parcours prévu.",
        example: "Le décrochage scolaire touche surtout les élèves sans soutien familial.",
        family: ["décrocher", "l'abandon", "le raccrochage", "la persévérance"],
      },
      {
        word: "évaluer",
        translation: "to assess, evaluate",
        wordClass: "verbe",
        definition: "Mesurer un niveau, un résultat ou une progression.",
        example: "Le TCF évalue quatre compétences langagières.",
        family: ["l'évaluation", "un test", "bilan de compétences", "évaluatif"],
      },
      {
        word: "une bourse d'études",
        translation: "scholarship",
        wordClass: "nom féminin",
        definition: "Aide financière permettant de poursuivre des études.",
        example: "Il a obtenu une bourse d'études pour son master en génie.",
        family: ["boursier", "la subvention", "la gratuité", "soutien financier"],
      },
      {
        word: "un apprentissage",
        translation: "learning / apprenticeship",
        wordClass: "nom masculin",
        definition: "Acquisition de connaissances ou de savoir-faire, ou formation en alternance.",
        example: "L'apprentissage de la grammaire est plus efficace par la pratique.",
        family: ["apprendre", "un apprenti", "l'alternance", "acquérir"],
      },
    ],
  },

  // ============================ TRAVAIL / ENTREPRISE ============================
  {
    id: "travail",
    title: "Travail et entreprise",
    emoji: "💼",
    level: "B2",
    description:
      "Emploi, conditions de travail, recrutement, entrepreneuriat : le lexique indispensable aux tâches liées au monde professionnel.",
    words: [
      {
        word: "un employeur",
        translation: "employer",
        wordClass: "nom masculin",
        definition: "Personne ou organisation qui embauche et rémunère.",
        example: "L'employeur doit fournir un milieu de travail sécuritaire.",
        family: ["embaucher", "l'emploi", "un salarié", "le recrutement"],
      },
      {
        word: "le salaire",
        translation: "salary, wages",
        wordClass: "nom masculin",
        definition: "Rémunération versée en échange du travail fourni.",
        example: "Le salaire doit être négocié avant la signature du contrat.",
        family: ["salarié", "la rémunération", "le traitement", "les avantages"],
      },
      {
        word: "un contrat de travail",
        translation: "employment contract",
        wordClass: "groupe nominal",
        definition: "Document qui fixe les conditions d'emploi : durée, salaire, fonctions.",
        example: "Avant de signer, lisez attentivement votre contrat de travail.",
        family: ["contractuel", "la clause", "la rupture", "l'échéance"],
      },
      {
        word: "la conciliation travail-vie personnelle",
        translation: "work-life balance",
        wordClass: "groupe nominal",
        definition: "Équilibre entre les obligations professionnelles et la vie privée.",
        example: "Le télétravail améliore la conciliation travail-vie personnelle.",
        family: ["concilier", "l'équilibre", "la flexibilité", "les horaires"],
      },
      {
        word: "une pénurie de main-d'œuvre",
        translation: "labor shortage",
        wordClass: "nom féminin",
        definition: "Insuffisance de travailleurs disponibles pour les postes à pourvoir.",
        example: "La pénurie de main-d'œuvre touche le secteur de la santé.",
        family: ["manquer", "un besoin en personnel", "recruter", "la rareté"],
      },
      {
        word: "se reconvertir",
        translation: "to retrain / change career",
        wordClass: "verbe pronominal",
        definition: "Changer de métier ou de secteur d'activité.",
        example: "Après dix ans en finance, elle s'est reconvertie dans l'infirmerie.",
        family: ["une reconversion", "un virage professionnel", "le réemploi"],
      },
      {
        word: "le chômage",
        translation: "unemployment",
        wordClass: "nom masculin",
        definition: "Situation d'une personne sans emploi qui en cherche un.",
        example: "Le chômage des jeunes recule grâce aux programmes d'alternance.",
        family: ["chômeur", "chercher un emploi", "le taux d'emploi", "la précarité"],
      },
      {
        word: "un entrepreneur",
        translation: "entrepreneur",
        wordClass: "nom masculin",
        definition: "Personne qui crée ou développe une entreprise.",
        example: "Cet entrepreneur a fondé sa start-up avec trois associés.",
        family: ["l'entrepreneuriat", "entreprendre", "créer une entreprise", "un fondateur"],
      },
      {
        word: "un stage",
        translation: "internship, placement",
        wordClass: "nom masculin",
        definition: "Période de travail formatif, souvent non permanente, dans une organisation.",
        example: "Son stage de six mois lui a permis de faire ses premières armes.",
        family: ["stagiaire", "la formation en entreprise", "un contrat d'alternance"],
      },
      {
        word: "licencier",
        translation: "to dismiss / lay off",
        wordClass: "verbe",
        definition: "Mettre fin au contrat d'un salarié, souvent pour un motif économique.",
        example: "L'entreprise a dû licencier une partie de son personnel.",
        family: ["un licenciement", "mettre à pied", "la démission", "une indemnité"],
      },
      {
        word: "postuler",
        translation: "to apply",
        wordClass: "verbe",
        definition: "Déposer une candidature pour un poste.",
        example: "Elle a postulé à trois offres cette semaine.",
        family: ["une candidate/candidat", "une offre d'emploi", "un dossier de candidature", "un entretien d'embauche"],
      },
      {
        word: "l'expérience professionnelle",
        translation: "work experience",
        wordClass: "nom féminin",
        definition: "Ensemble des emplois exercés par une personne.",
        example: "Les jeunes diplômés manquent d'expérience professionnelle reconnue.",
        family: ["des acquis", "un parcours", "le cursus professionnel", "la références"],
      },
    ],
  },

  // ============================ TECHNOLOGIES & SOCIETE ============================
  {
    id: "technologies",
    title: "Technologies et société",
    emoji: "🤖",
    level: "B2",
    description:
      "Intelligence artificielle, données personnelles, réseaux sociaux, sobriété numérique : des défis contemporains très présents au TCF.",
    words: [
      {
        word: "les données personnelles",
        translation: "personal data",
        wordClass: "nom féminin pluriel",
        definition: "Informations qui identifient une personne : nom, localisation, préférences.",
        example: "La protection des données personnelles est un droit fondamental.",
        family: ["numérique", "la vie privée", "le profilage", "un traitement (de données)"],
      },
      {
        word: "un algorithme",
        translation: "algorithm",
        wordClass: "nom masculin",
        definition: "Suite de calculs qui guide un programme informatique.",
        example: "Les algorithmes de recommandation nourrissent le flux des réseaux sociaux.",
        family: ["algorithmique", "une recommandation", "côté ouvert/fermé", "un modèle"],
      },
      {
        word: "l'intelligence artificielle (IA)",
        translation: "artificial intelligence (AI)",
        wordClass: "nom féminin",
        definition: "Capacité de machines à reproduire des tâches cognitives humaines.",
        example: "L'intelligence artificielle transforme la pratique médicale.",
        family: ["artificiel", "une machine", "l'automatisation", "un agent conversationnel"],
      },
      {
        word: "le harcèlement en ligne",
        translation: "online harassment",
        wordClass: "nom masculin",
        definition: "Attaques répétées et malveillantes contre une personne sur internet.",
        example: "Les plateformes doivent lutter contre le harcèlement en ligne.",
        family: ["harceler", "modérer", "une cyberattaque", "un signalement"],
      },
      {
        word: "la désinformation",
        translation: "misinformation / disinformation",
        wordClass: "nom féminin",
        definition: "Diffusion volontaire ou involontaire d'informations fausses.",
        example: "La désinformation se propage plus vite qu'un correctif.",
        family: ["informer", "une fausse nouvelle", "vérifier", "un correctif"],
      },
      {
        word: "la sobriété numérique",
        translation: "digital sobriety",
        wordClass: "nom féminin",
        definition: "Limitation volontaire des usages numériques pour réduire leur impact énergétique.",
        example: "La sobriété numérique invite à stocker moins de photos inutiles.",
        family: ["sobre", "l'impact énergétique", "le cloud", "limiter"],
      },
      {
        word: "un réseau social",
        translation: "social network",
        wordClass: "nom masculin",
        definition: "Plateforme en ligne qui relie des personnes partageant des contenus.",
        example: "Les réseaux sociaux polarisent souvent le débat public.",
        family: ["s'abonner", "un abonné", "publier", "un influenceur"],
      },
      {
        word: "numériser",
        translation: "to digitize",
        wordClass: "verbe",
        definition: "Convertir un document physique en version électronique.",
        example: "Les services publics numérisent progressivement leurs démarches.",
        family: ["le numérique", "une démarche en ligne", "un formulaire", "le tout-numérique"],
      },
      {
        word: "l'exclusion numérique",
        translation: "digital divide / exclusion",
        wordClass: "nom féminin",
        definition: "Situation des personnes privées d'accès aux outils numériques ou de la capacité de les utiliser.",
        example: "L'exclusion numérique touche surtout les aînés et les ménages précaires.",
        family: ["exclure", "la fracture numérique", "l'accès", "accompagner"],
      },
      {
        word: "surveiller",
        translation: "to monitor / surveil",
        wordClass: "verbe",
        definition: "Observer de manière continue des personnes, des données ou des lieux.",
        example: "La vidéosurveillance soulève des questions de liberté.",
        family: ["la surveillance", "un dispositif", "la traçabilité", "filmer"],
      },
      {
        word: "un acteur majeur",
        translation: "major player / stakeholder",
        wordClass: "groupe nominal",
        definition: "Organisation qui influence fortement un secteur.",
        example: "Les géants du numérique sont devenus des acteurs majeurs de l'économie.",
        family: ["une plateforme", "un monopole", "la concurrence", "réguler"],
      },
      {
        word: "automatiser",
        translation: "to automate",
        wordClass: "verbe",
        definition: "Confier à des machines ou logiciels des tâches autrefois humaines.",
        example: "La logistique automatisée réduit les erreurs mais change l'emploi.",
        family: ["l'automatisation", "un robot", "remplacer", "la productivité"],
      },
    ],
  },

  // ============================ SANTE ============================
  {
    id: "sante",
    title: "Santé et bien-être",
    emoji: "🩺",
    level: "B2",
    description:
      "Système de soins, prévention, habitudes de vie : des thèmes fréquents pour l'entretien oral et l'essai argumenté.",
    words: [
      {
        word: "prendre rendez-vous",
        translation: "to book an appointment",
        wordClass: "locution",
        definition: "Réserver une consultation auprès d'un professionnel de santé.",
        example: "Prenez rendez-vous en ligne ou par téléphone à la clinique.",
        family: ["un rendez-vous", "une consultation", "un cabinet", "un praticien"],
      },
      {
        word: "la prévention",
        translation: "prevention",
        wordClass: "nom féminin",
        definition: "Ensemble des actions qui évitent l'apparition d'une maladie.",
        example: "La prévention passe par le dépistage et la vaccination.",
        family: ["prévenir", "préventif", "un dépistage", "un vaccin"],
      },
      {
        word: "un dépistage",
        translation: "screening",
        wordClass: "nom masculin",
        definition: "Recherche d'une maladie chez des personnes sans symptômes.",
        example: "Le dépistage précoce améliore nettement les chances de guérison.",
        family: ["dépister", "un test", "un diagnostic", "la détection"],
      },
      {
        word: "le bien-être",
        translation: "well-being",
        wordClass: "nom masculin",
        definition: "État de satisfaction physique et psychologique.",
        example: "Le sommeil participe au bien-être général.",
        family: ["se sentir bien", "l'équilibre", "la qualité de vie", "s'épanouir"],
      },
      {
        word: "un régime alimentaire",
        translation: "diet",
        wordClass: "groupe nominal",
        definition: "Habitudes de consommation de nourriture d'une personne.",
        example: "Un régime alimentaire équilibré prévient le diabète.",
        family: ["manger équilibré", "une alimentation", "nutritif", "les habitudes"],
      },
      {
        word: "la santé mentale",
        translation: "mental health",
        wordClass: "nom féminin",
        definition: "État psychologique d'une personne, incluant la gestion du stress.",
        example: "La santé mentale des soignants est devenue une priorité nationale.",
        family: ["psychologique", "la détresse", "le stress", "écouter", "soutenir"],
      },
      {
        word: "souffrir de",
        translation: "to suffer from",
        wordClass: "verbe",
        definition: "Être atteint d'une maladie ou d'une douleur.",
        example: "Une personne sur quatre souffre de troubles du sommeil.",
        family: ["la souffrance", "la douleur", "un trouble", "chronique"],
      },
      {
        word: "un système de santé",
        translation: "healthcare system",
        wordClass: "groupe nominal",
        definition: "Organisation publique et privée qui dispense les soins.",
        example: "Le système de santé public couvre la plupart des soins au Canada.",
        family: ["soigner", "une infrastructure de soins", "publique", "un hôpital"],
      },
      {
        word: "l'activité physique",
        translation: "physical activity",
        wordClass: "nom féminin",
        definition: "Tout mouvement qui dépense de l'énergie : sport, marche, ménage.",
        example: "Trente minutes d'activité physique par jour protègent le cœur.",
        family: ["bouger", "le sport", "sédentaire", "l'endurance"],
      },
      {
        word: "un médicament",
        translation: "medicine / drug",
        wordClass: "nom masculin",
        definition: "Produit utilisé pour traiter ou prévenir une maladie.",
        example: "Ce médicament se prend de préférence au cours du repas.",
        family: ["médical", "une ordonnance", "un traitement", "pharmaceutique"],
      },
      {
        word: "accompagner",
        translation: "to support / accompany",
        wordClass: "verbe",
        definition: "Soutenir une personne dans une démarche, à chaque étape.",
        example: "L'infirmière accompagne les patients dans leur rétablissement.",
        family: ["un accompagnement", "le suivi", "soutenir", "rassurer"],
      },
      {
        word: "guérir",
        translation: "to heal / recover",
        wordClass: "verbe",
        definition: "Recouvrer la santé après une maladie.",
        example: "Une prise en charge rapide permet de guérir plus vite.",
        family: ["la guérison", "se rétablir", "un traitement efficace", "recouvrer"],
      },
    ],
  },
];

// ============================ QUIZ DE VOCABULAIRE ============================

export const vocabularyQuizzes: VocabQuizQuestion[] = [
  // ---- Environnement ----
  {
    id: "voc-env-1",
    theme: "environnement",
    level: "B2",
    passage: "L'usine a été fermée après avoir __ les rivières voisines pendant des années.",
    question: "Quel mot complète la phrase ?",
    options: [
      { id: "a", text: "réglementé" },
      { id: "b", text: "pollué" },
      { id: "c", text: "compensé" },
      { id: "d", text: "renouvelé" },
    ],
    correctOptionId: "b",
    explanation:
      "« Polluer » signifie dégrader l'environnement par des rejets nocifs : l'usine a « pollué » les rivières. « Réglementé » (fixer des règles), « compensé » (équilibrer un impact) et « renouvelé » (remis à neuf) n'ont pas de sens ici.",
    difficulty: "facile",
  },
  {
    id: "voc-env-2",
    theme: "environnement",
    level: "B2",
    passage: "Pour lutter contre le réchauffement climatique, il faut réduire notre __ carbone.",
    question: "Complétez avec le mot exact.",
    options: [
      { id: "a", text: "empreinte" },
      { id: "b", text: "surface" },
      { id: "c", text: "mesure" },
      { id: "d", text: "traces" },
    ],
    correctOptionId: "a",
    explanation:
      "La collocation exacte est « réduire son empreinte carbone », c'est-à-dire ses émissions de gaz à effet de serre. « Surface », « mesure » et « traces » ne se combinent pas avec « carbone » dans cette expression figée (on dirait « traces de carbone » dans un autre contexte scientifique, mais pas ici).",
    difficulty: "moyen",
  },
  {
    id: "voc-env-3",
    theme: "environnement",
    level: "B2",
    passage: "Le tri des __ permet de recycler une grande partie de nos déchets.",
    question: "Quel mot manque ?",
    options: [
      { id: "a", text: "déchets" },
      { id: "b", text: "gisements" },
      { id: "c", text: "écarts" },
      { id: "d", text: "composteurs" },
    ],
    correctOptionId: "a",
    explanation:
      "Le « tri des déchets » est l'expression figée pour désigner la séparation des ordures avant recyclage. « Gisements » (réserves naturelles), « écarts » (différences) et « composteurs » (conteneurs) ne conviennent pas à la collocation.",
    difficulty: "facile",
  },
  {
    id: "voc-env-4",
    theme: "environnement",
    level: "B2",
    passage: "La période sans pluie a provoqué une grave __ dans la région agricole.",
    question: "Complétez.",
    options: [
      { id: "a", text: "sécheresse" },
      { id: "b", text: "canicule" },
      { id: "c", text: "humidité" },
      { id: "d", text: "fonte" },
    ],
    correctOptionId: "a",
    explanation:
      "La « sécheresse » est précisément une période prolongée sans pluie. La « canicule » désigne une chaleur extrême (pas forcément l'absence de pluie sur la durée), l'« humidité » est l'inverse, et la « fonte » concerne la glace ou la neige.",
    difficulty: "moyen",
  },
  {
    id: "voc-env-5",
    theme: "environnement",
    level: "B2",
    passage: "La destruction des zones humides menace gravement la __ locale.",
    question: "Complétez.",
    options: [
      { id: "a", text: "biodiversité" },
      { id: "b", text: "hydroélectricité" },
      { id: "c", text: "réglementation" },
      { id: "d", text: "dépollution" },
    ],
    correctOptionId: "a",
    explanation:
      "La « biodiversité » désigne la diversité des espèces ; elle est effectivement menacée par la destruction des milieux naturels. Les autres termes (production électrique, règles, nettoyage des polluants) n'ont aucun lien avec la destruction des zones humides.",
    difficulty: "facile",
  },

  // ---- Éducation ----
  {
    id: "voc-edu-1",
    theme: "education",
    level: "B2",
    passage: "Sans traduction officielle, son diplôme d'ingénieur exige une procédure de __.",
    question: "Complétez.",
    options: [
      { id: "a", text: "reconnaissance" },
      { id: "b", text: "connaissance" },
      { id: "c", text: "reconduction" },
      { id: "d", text: "réduction" },
    ],
    correctOptionId: "a",
    explanation:
      "On parle de « reconnaissance des diplômes » : la procédure qui accepte un titre étranger. « Reconduction » (renouvellement d'un contrat), « réduction » et « connaissance » (savoir) sont des faux-amis de sens ici.",
    difficulty: "facile",
  },
  {
    id: "voc-edu-2",
    theme: "education",
    level: "B2",
    passage: "Son bachelor en poche, elle suit une __ pour se perfectionner en gestion de projets.",
    question: "Complétez.",
    options: [
      { id: "a", text: "formation continue" },
      { id: "b", text: "récréation" },
      { id: "c", text: "démission" },
      { id: "d", text: "isolement" },
    ],
    correctOptionId: "a",
    explanation:
      "La « formation continue » est destinée aux adultes qui se perfectionnent après leur formation initiale. Les autres termes (pause, départ, retrait) n'ont aucun rapport avec l'apprentissage professionnel.",
    difficulty: "facile",
  },
  {
    id: "voc-edu-3",
    theme: "education",
    level: "B2",
    passage: "Grâce à son __ en alternance, il apprend sur le terrain tout en étant salarié.",
    question: "Complétez.",
    options: [
      { id: "a", text: "apprentissage" },
      { id: "b", text: "décrochage" },
      { id: "c", text: "licenciement" },
      { id: "d", text: "gaspillage" },
    ],
    correctOptionId: "a",
    explanation:
      "L'« apprentissage » en alternance combine cours et expérience en entreprise, l'apprenti étant rémunéré. Le « décrochage » est l'abandon scolaire et le « licenciement » la fin d'un contrat — l'inverse d'une formation.",
    difficulty: "moyen",
  },
  {
    id: "voc-edu-4",
    theme: "education",
    level: "B2",
    passage: "Le conseil de classe a __ les progrès de l'élève depuis le début de l'année.",
    question: "Complétez.",
    options: [
      { id: "a", text: "évalué" },
      { id: "b", text: "évoqué" },
      { id: "c", text: "émigré" },
      { id: "d", text: "employé" },
    ],
    correctOptionId: "a",
    explanation:
      "« Évaluer » signifie mesurer un niveau ou une progression : le conseil de classe évalue les progrès. « Évoquer » (mentionner), « émigrer » (changer de pays) et « employer » (utiliser) ne conviennent pas au sens de mesurer des résultats.",
    difficulty: "moyen",
  },
  {
    id: "voc-edu-5",
    theme: "education",
    level: "B2",
    passage: "Faute de soutien, de nombreux élèves abandonnent : le __ scolaire progresse.",
    question: "Complétez.",
    options: [
      { id: "a", text: "décrochage" },
      { id: "b", text: "travail" },
      { id: "c", text: "recrutement" },
      { id: "d", text: "stage" },
    ],
    correctOptionId: "a",
    explanation:
      "Le « décrochage scolaire » désigne précisément l'abandon des études avant la fin du parcours. Le « recrutement » concerne l'embauche, le « stage » une formation en entreprise, et le « travail » ne convient pas à ce contexte.",
    difficulty: "facile",
  },

  // ---- Travail / Entreprise ----
  {
    id: "voc-trav-1",
    theme: "travail",
    level: "B2",
    passage: "Après dix ans dans la restauration, il a décidé de __ dans l'infirmerie.",
    question: "Complétez.",
    options: [
      { id: "a", text: "se reconvertir" },
      { id: "b", text: "se retirer" },
      { id: "c", text: "se succéder" },
      { id: "d", text: "se moquer" },
    ],
    correctOptionId: "a",
    explanation:
      "« Se reconvertir » signifie changer de métier ou de secteur : c'est exactement ce que fait ce salarié en se tournant vers l'infirmerie. « Se retirer » (partir), « se succéder » (se remplacer) et « se moquer » (rire de) sont sans lien.",
    difficulty: "moyen",
  },
  {
    id: "voc-trav-2",
    theme: "travail",
    level: "B2",
    passage: "Le secteur des soins manque de personnel : il souffre d'une __ de main-d'œuvre.",
    question: "Complétez.",
    options: [
      { id: "a", text: "pénurie" },
      { id: "b", text: "abondance" },
      { id: "c", text: "rémunération" },
      { id: "d", text: "qualification" },
    ],
    correctOptionId: "a",
    explanation:
      "La « pénurie de main-d'œuvre » est l'expression consacrée pour une insuffisance de travailleurs. L'« abondance » est le contraire, et « rémunération »/« qualification » désignent la paye et les compétences, pas un manque de personnes.",
    difficulty: "facile",
  },
  {
    id: "voc-trav-3",
    theme: "travail",
    level: "B2",
    passage: "Avant de signer, vérifiez les __ du contrat : durée, salaire et préavis.",
    question: "Complétez.",
    options: [
      { id: "a", text: "clauses" },
      { id: "b", text: "cloisons" },
      { id: "c", text: "claques" },
      { id: "d", text: "classes" },
    ],
    correctOptionId: "a",
    explanation:
      "Les « clauses » d'un contrat sont ses conditions précises inscrites par écrit. « Cloisons » (murs légers), « claques » (gifles/échecs) et « classes » (groupes) sont des paronymes sans lien avec le contrat.",
    difficulty: "moyen",
  },
  {
    id: "voc-trav-4",
    theme: "travail",
    level: "B2",
    passage: "Sa lettre de motivation rédigée, elle a __ à trois offres en ligne.",
    question: "Complétez.",
    options: [
      { id: "a", text: "postulé" },
      { id: "b", text: "protesté" },
      { id: "c", text: "plaidé" },
      { id: "d", text: "posté" },
    ],
    correctOptionId: "a",
    explanation:
      "« Postuler à une offre » signifie y déposer sa candidature. « Protester » (s'indigner), « plaider » (défendre en justice) et « poster » (envoyer par courrier) ne correspondent pas au contexte d'une démarche de candidature en ligne.",
    difficulty: "moyen",
  },
  {
    id: "voc-trav-5",
    theme: "travail",
    level: "B2",
    passage: "Le chômage recule parce que les créateurs d'entreprise, les __, relancent l'activité.",
    question: "Complétez.",
    options: [
      { id: "a", text: "entrepreneurs" },
      { id: "b", text: "chômeurs" },
      { id: "c", text: "retraités" },
      { id: "d", text: "stagiaires" },
    ],
    correctOptionId: "a",
    explanation:
      "Les « entrepreneurs » créent et développent des entreprises, ce qui crée de l'emploi et fait reculer le chômage. Les trois autres termes sont compatibles avec le recul du chômage : ils n'en sont pas l'acteur.",
    difficulty: "facile",
  },

  // ---- Technologies & société ----
  {
    id: "voc-tech-1",
    theme: "technologies",
    level: "B2",
    passage: "Sans votre accord, aucune application ne peut collecter vos __ personnelles.",
    question: "Complétez.",
    options: [
      { id: "a", text: "données" },
      { id: "b", text: "dépôts" },
      { id: "c", text: "dessins" },
      { id: "d", text: "devoirs" },
    ],
    correctOptionId: "a",
    explanation:
      "« Les données personnelles » est la collocation technique et juridique pour les informations identifiantes. « Dépôts », « dessins » et « devoirs » sont des paronymes de « données » sans rapport avec la vie privée numérique.",
    difficulty: "facile",
  },
  {
    id: "voc-tech-2",
    theme: "technologies",
    level: "B2",
    passage: "Les plateformes peinent à freiner la propagation de la __ sur leurs réseaux.",
    question: "Complétez.",
    options: [
      { id: "a", text: "désinformation" },
      { id: "b", text: "désobéissance" },
      { id: "c", text: "déconsidération" },
      { id: "d", text: "décontamination" },
    ],
    correctOptionId: "a",
    explanation:
      "La « désinformation » est la diffusion de fausses informations — c'est ce que les plateformes cherchent à limiter. Les autres termes (désobéissance, perte d'estime, nettoyage) ne correspondent pas à une propagation de contenus faux.",
    difficulty: "moyen",
  },
  {
    id: "voc-tech-3",
    theme: "technologies",
    level: "B2",
    passage: "Pour réduire l'impact énergétique du numérique, les défenseurs plaident pour la __ numérique.",
    question: "Complétez.",
    options: [
      { id: "a", text: "sobriété" },
      { id: "b", text: "prospérité" },
      { id: "c", text: "célérité" },
      { id: "d", text: "intégrité" },
    ],
    correctOptionId: "a",
    explanation:
      "La « sobriété numérique » est le terme consacré désignant la réduction volontaire des usages numériques. « Prospérité » (richesse), « célérité » (rapidité) et « intégrité » (honnêteté) sont des paronymes trompeurs.",
    difficulty: "moyen",
  },
  {
    id: "voc-tech-4",
    theme: "technologies",
    level: "B2",
    passage: "Sans accès ni compétences, les aînés subissent une véritable __ numérique.",
    question: "Complétez.",
    options: [
      { id: "a", text: "exclusion" },
      { id: "b", text: "inclusion" },
      { id: "c", text: "explosion" },
      { id: "d", text: "attention" },
    ],
    correctOptionId: "a",
    explanation:
      "L'« exclusion numérique » désigne la mise à l'écart des personnes privées d'accès aux outils et usages du numérique. L'« inclusion » est l'inverse, et les deux autres termes n'ont pas de rapport avec la fracture numérique.",
    difficulty: "facile",
  },
  {
    id: "voc-tech-5",
    theme: "technologies",
    level: "B2",
    passage: "Les algorithmes de recommandation __ les contenus en fonction de vos goûts.",
    question: "Complétez.",
    options: [
      { id: "a", text: "personnalisent" },
      { id: "b", text: "personnifient" },
      { id: "c", text: "personnent" },
      { id: "d", text: "persécutent" },
    ],
    correctOptionId: "a",
    explanation:
      "« Personnaliser » signifie adapter un contenu à un utilisateur précis — c'est le rôle des algorithms de recommandation. « Personnifier » (incarner un rôle), « persécuter » (harceler) et « personnent » (qui n'existe pas) sont fautifs.",
    difficulty: "moyen",
  },

  // ---- Santé ----
  {
    id: "voc-sant-1",
    theme: "sante",
    level: "B2",
    passage: "Le médecin prescrit un __ précoce pour détecter la maladie avant les symptômes.",
    question: "Complétez.",
    options: [
      { id: "a", text: "dépistage" },
      { id: "b", text: "département" },
      { id: "c", text: "dépannage" },
      { id: "d", text: "déplacement" },
    ],
    correctOptionId: "a",
    explanation:
      "Le « dépistage » est précisément la recherche d'une maladie chez des personnes sans symptômes. « Département », « dépannage » (réparation) et « déplacement » sont des paronymes trompeurs.",
    difficulty: "moyen",
  },
  {
    id: "voc-sant-2",
    theme: "sante",
    level: "B2",
    passage: "Le sommeil, l'alimentation et le sport sont les piliers du __ général.",
    question: "Complétez.",
    options: [
      { id: "a", text: "bien-être" },
      { id: "b", text: "mal-être" },
      { id: "c", text: "malheur" },
      { id: "d", text: "bienfait" },
    ],
    correctOptionId: "a",
    explanation:
      "Le « bien-être » est l'état de satisfaction physique et psychologique, soutenu par le sommeil, l'alimentation équilibrée et l'activité. Les trois autres mots expriment des difficultés ou un don, pas un état général de santé.",
    difficulty: "facile",
  },
  {
    id: "voc-sant-3",
    theme: "sante",
    level: "B2",
    passage: "Une personne sur trois __ de troubles du sommeil chroniques.",
    question: "Complétez.",
    options: [
      { id: "a", text: "souffre" },
      { id: "b", text: "se moque" },
      { id: "c", text: "se débrouille" },
      { id: "d", text: "s'absente" },
    ],
    correctOptionId: "a",
    explanation:
      "« Souffrir de » est la construction verbe + préposition de pour signaler une maladie ou un trouble. « Se moquer de » (rire de), « se débrouiller » (s'organiser) et « s'absenter » (manquer) n'ont aucun sens médical.",
    difficulty: "moyen",
  },
  {
    id: "voc-sant-4",
    theme: "sante",
    level: "B2",
    passage: "Une prise en charge rapide permet souvent de __ plus vite.",
    question: "Complétez.",
    options: [
      { id: "a", text: "guérir" },
      { id: "b", text: "gaspiller" },
      { id: "c", text: "garantir" },
      { id: "d", text: "germer" },
    ],
    correctOptionId: "a",
    explanation:
      "« Guérir » signifie recouvrer la santé — c'est l'objectif de toute prise en charge. « Gaspiller » (gâcher), « garantir » (promettre) et « germer » (pousser, pour une plante) sont hors sujet médical.",
    difficulty: "facile",
  },
  {
    id: "voc-sant-5",
    theme: "sante",
    level: "B2",
    passage: "Le dépistage et la vaccination relèvent de la __, qui évite d'être malade.",
    question: "Complétez.",
    options: [
      { id: "a", text: "prévention" },
      { id: "b", text: "prescription" },
      { id: "c", text: "prédiction" },
      { id: "d", text: "privé" },
    ],
    correctOptionId: "a",
    explanation:
      "La « prévention » est l'ensemble des actions (dépistage, vaccin, hygiène) pour éviter l'apparition de la maladie. « Prescription » (ordonnance) et « prédiction » (prévoir l'avenir) ne désignent pas ces mesures.",
    difficulty: "moyen",
  },
];

// ============================ HELPERS ============================

export function getVocabularyThemes(): VocabularyTheme[] {
  return vocabularyThemes;
}

export function getVocabularyThemeById(id: string): VocabularyTheme | undefined {
  return vocabularyThemes.find((t) => t.id === id);
}

export function getVocabularyQuizForTheme(themeId: string): QcmQuestion[] {
  return vocabularyQuizzes
    .filter((q) => q.theme === themeId)
    .map((q) => ({
      ...q,
      skill: "CE",
      sequence: "Vocabulaire",
      passageType: "Exercice de vocabulaire",
    }));
}

export function getAllVocabularyQuizzes(): QcmQuestion[] {
  return getVocabularyThemes().flatMap((t) => getVocabularyQuizForTheme(t.id));
}