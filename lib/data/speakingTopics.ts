import { SpeakingTopic } from "@/lib/types";

/**
 * Banque d'exercices — Expression Orale (EO).
 * Les 3 tâches officielles du TCF Canada, déclinées par niveau CECRL (A1 à C2) :
 *   - Tâche 1 : entretien dirigé (présentation, routine, habitudes)
 *   - Tâche 2 : interaction (poser des questions à partir d'une situation)
 *   - Tâche 3 : exposé argumenté sur un sujet de société
 * Chaque sujet comprend les points clés attendus (corrigé type) et la grille de
 * correction officielle utilisée par le TCF.
 */

const speakingCriteria: SpeakingTopic["evaluationCriteria"] = [
  {
    label: "Tâche accomplie",
    description:
      "Le candidat traite bien le sujet et remplit l'objectif de communication (se présenter, obtenir des informations, défendre une position).",
  },
  {
    label: "Fluidité et interaction",
    description:
      "La parole est continue, le rythme est régulier, le candidat enchaîne les idées sans efforts visibles.",
  },
  {
    label: "Vocabulaire",
    description:
      "Lexique riche, précis et adapté au thème ; peu de recherche de mots.",
  },
  {
    label: "Correction grammaticale",
    description:
      "Accords, temps et structures syntaxiques maîtrisés ; erreurs rares et peu gênantes.",
  },
  {
    label: "Prononciation",
    description:
      "Articulation claire, intonation naturelle ; la prononciation ne gêne pas la compréhension.",
  },
];

export const speakingTopics: SpeakingTopic[] = [
  // ============================ NIVEAU A1 ============================
  {
    id: "eo-a1-1",
    taskNumber: 1,
    level: "A1",
    theme: "Présentation personnelle",
    situation: "L'examinateur vous accueille et vous invite à parler de vous.",
    prompt:
      "Présentez-vous : votre nom, votre nationalité, votre ville d'origine, votre situation actuelle et vos activités quotidiennes.",
    prepTimeSeconds: 30,
    speakTimeSeconds: 90,
    samplePoints: [
      "Donner son nom et sa nationalité.",
      "Dire d'où l'on vient et où l'on habite aujourd'hui.",
      "Décrire sa routine : lever, repas, travail ou études.",
      "Mentionner une activité appréciée (sport, musique, lecture).",
    ],
    modelAnswer:
      "Je m'appelle Fatima, je suis algérienne. Avant, je vivais à Alger, mais maintenant je suis à Ottawa. Le matin, je me lève à sept heures, je prends mon petit-déjeuner et je vais à l'école pour apprendre le français. L'après-midi, je fais mes devoirs et je regarde un peu la télévision. Le soir, je cuisine avec ma famille. J'aime beaucoup la musique et les promenades au parc.",
    evaluationCriteria: speakingCriteria,
    vocabularyNotes: [
      "je m'appelle",
      "je vis / je suis",
      "d'abord, ensuite, après",
      "j'aime beaucoup",
    ],
  },
  {
    id: "eo-a1-2",
    taskNumber: 2,
    level: "A1",
    theme: "Visite de la ville",
    situation: "Vous êtes au bureau d'information touristique de Montréal.",
    prompt:
      "Vous êtes un touriste au bureau d'information de Montréal. Posez des questions (où, quand, combien, comment) pour savoir : où se trouve le métro, quand ouvre le musée, combien coûte le billet et comment aller au parc. Répondez ensuite aux questions de l'examinateur qui joue le guide.",
    prepTimeSeconds: 60,
    speakTimeSeconds: 180,
    samplePoints: [
      "Poser une question sur la localisation (Où est le métro ?).",
      "Poser une question sur les horaires (Le musée ouvre à quelle heure ?).",
      "Poser une question sur le prix (Combien coûte le billet ?).",
      "Poser une question sur l'itinéraire (Comment aller au parc ?).",
    ],
    modelAnswer:
      "Bonjour, je suis touriste. Où est la station de métro la plus proche ? Le musée ouvre à quelle heure ? Combien coûte le billet pour visiter ? Comment aller au parc du Mont-Royal, à pied ou en bus ? Avez-vous un plan de la ville en français ?",
    evaluationCriteria: speakingCriteria,
    vocabularyNotes: [
      "où / quand / combien / comment",
      "le billet",
      "à pied",
      "la station de métro",
    ],
  },
  {
    id: "eo-a1-3",
    taskNumber: 3,
    level: "A1",
    theme: "Opinion simple",
    situation: "L'examinateur vous demande ce que vous pensez du climat canadien.",
    prompt:
      "L'examinateur vous demande : « Que pensez-vous du climat au Canada, surtout en hiver ? » Donnez votre opinion et expliquez avec des exemples simples.",
    prepTimeSeconds: 60,
    speakTimeSeconds: 120,
    samplePoints: [
      "Donner son opinion clairement (j'aime / je n'aime pas).",
      "Expliquer son opinion avec une raison simple.",
      "Donner un exemple concret (activité d'hiver, vêtements).",
    ],
    modelAnswer:
      "Moi, j'aime l'hiver au Canada, mais il fait très froid. J'aime la neige parce que c'est joli et parce que je peux faire du ski. Mais en novembre, je n'aime pas attendre le bus dehors quand il fait moins quinze degrés ! Alors, je mets beaucoup de vêtements chauds. Je préfère le printemps, quand il fait plus doux.",
    evaluationCriteria: speakingCriteria,
    vocabularyNotes: [
      "j'aime / je n'aime pas",
      "parce que",
      "il fait froid",
      "je préfère",
    ],
  },

  // ============================ NIVEAU A2 ============================
  {
    id: "eo-a2-1",
    taskNumber: 1,
    level: "A2",
    theme: "Habitudes et routine",
    situation: "L'examinateur vous interroge sur votre semaine type.",
    prompt:
      "L'examinateur vous demande de décrire votre semaine type : votre travail ou vos études, vos loisirs, vos moments de détente et vos projets du week-end.",
    prepTimeSeconds: 45,
    speakTimeSeconds: 120,
    samplePoints: [
      "Décrire une journée type avec les horaires.",
      "Présenter ses loisirs et leur fréquence (deux fois par semaine...).",
      "Expliquer comment on se détend après le travail.",
      "Annoncer un projet pour le week-end.",
    ],
    modelAnswer:
      "Ma semaine est bien organisée. Du lundi au vendredi, je me lève à six heures et demie pour arriver au travail à huit heures. Je finis à dix-sept heures, je fais les courses en rentrant et je prépare le dîner. Deux fois par semaine, le mardi et le jeudi, je vais au cours de français du soir. Le samedi matin, je fais du sport dans le parc, et le dimanche, j'aime me reposer et appeler ma famille à l'étranger. Ce week-end, je veux visiter le marché du vieux Québec avec des amis.",
    evaluationCriteria: speakingCriteria,
    vocabularyNotes: [
      "du lundi au vendredi",
      "deux fois par semaine",
      "les courses",
      "ce week-end",
    ],
  },
  {
    id: "eo-a2-2",
    taskNumber: 2,
    level: "A2",
    theme: "Inscription à un cours",
    situation: "Vous téléphonez à une école de langue pour vous inscrire.",
    prompt:
      "Vous souhaitez suivre un cours de langues dans une école à Toronto. Posez des questions à l'examinateur, qui joue le responsable de l'école, pour obtenir : les types de cours proposés, les horaires, le prix, la durée et les documents nécessaires. Puis répondez à ses questions.",
    prepTimeSeconds: 60,
    speakTimeSeconds: 180,
    samplePoints: [
      "Demander quels cours sont proposés.",
      "Demander les horaires et s'il existe des cours du soir.",
      "Demander le prix total et les modalités de paiement.",
      "Demander la durée du programme et les documents à fournir.",
    ],
    modelAnswer:
      "Bonjour, j'aimerais m'inscrire à un cours de français, mais j'ai quelques questions. Quels types de cours proposez-vous ? Y a-t-il des cours le soir ou le samedi ? Combien coûte un trimestre ? Faut-il payer la totalité à l'avance ? Quelle est la durée minimale du programme ? Et enfin, quels documents dois-je fournir pour m'inscrire ?",
    evaluationCriteria: speakingCriteria,
    vocabularyNotes: [
      "s'inscrire",
      "les horaires",
      "à l'avance",
      "fournir des documents",
    ],
  },
  {
    id: "eo-a2-3",
    taskNumber: 3,
    level: "A2",
    theme: "Sport et santé",
    situation: "L'examinateur vous demande votre avis sur l'importance du sport.",
    prompt:
      "L'examinateur vous demande : « Pensez-vous que faire du sport est important ? » Donnez votre opinion en vous appuyant sur des raisons et des exemples.",
    prepTimeSeconds: 60,
    speakTimeSeconds: 120,
    samplePoints: [
      "Affirmer son opinion dès le début.",
      "Donner deux ou trois raisons simples (santé, détente, rencontres).",
      "Illustrer par un exemple personnel ou d'un proche.",
    ],
    modelAnswer:
      "Oui, je pense vraiment que faire du sport est important, pour plusieurs raisons. D'abord, le sport est bon pour la santé : il aide à rester en forme et à éviter le stress. Ensuite, quand on fait du sport, on se sent plus heureux et plus énergique après. Enfin, le sport permet de rencontrer des gens et de faire des amis, surtout quand on vient d'arriver dans un nouveau pays. Par exemple, je joue au football le week-end avec des collègues, et cela m'a aidé à créer des liens. Pour conclure, je conseille à tout le monde de trouver une activité sportive, même une fois par semaine.",
    evaluationCriteria: speakingCriteria,
    vocabularyNotes: [
      "rester en forme",
      "créer des liens",
      "le stress",
      "je conseille",
    ],
  },

  // ============================ NIVEAU B1 ============================
  {
    id: "eo-b1-1",
    taskNumber: 1,
    level: "B1",
    theme: "Parcours et projets",
    situation: "L'examinateur vous invite à retracer votre parcours et vos objectifs.",
    prompt:
      "L'examinateur vous demande de retracer votre parcours (études, expériences) et d'expliquer pourquoi vous êtes au Canada et quels sont vos projets.",
    prepTimeSeconds: 45,
    speakTimeSeconds: 150,
    samplePoints: [
      "Présenter son parcours de formation et professionnel de façon chronologique.",
      "Expliquer la raison de la venue au Canada.",
      "Décrire son expérience actuelle et son insertion.",
      "Annoncer des projets à court et moyen terme.",
    ],
    modelAnswer:
      "Après des études en gestion dans mon pays, j'ai travaillé trois ans dans une entreprise de logistique, où je coordonnais les livraisons régionales. J'ai décidé de venir au Canada pour rejoindre ma sœur et pour approfondir mes compétences en anglais et en français. Depuis mon arrivée, il y a six mois, je suis un programme d'intégration professionnelle à Montréal et j'effectue un stage dans un entrepôt. Mes projets sont clairs : obtenir une certification reconnue ici, puis postuler à un poste de gestionnaire adjoint dans la logistique. À plus long terme, j'aimerais m'installer définitivement au Québec et faire venir ma femme et mes enfants.",
    evaluationCriteria: speakingCriteria,
    vocabularyNotes: [
      "coordonner",
      "l'intégration",
      "un stage",
      "s'installer définitivement",
    ],
  },
  {
    id: "eo-b1-2",
    taskNumber: 2,
    level: "B1",
    theme: "Location de logement",
    situation: "Vous visiterez un appartement et devez obtenir toutes les informations nécessaires.",
    prompt:
      "Vous cherchez un appartement à Vancouver. L'examinateur joue l'agent immobilier. Posez des questions pour connaître : le loyer et les charges, le dépôt de garantie, la durée du bail, les meubles inclus, et le quartier. Puis répondez aux questions de l'agent.",
    prepTimeSeconds: 90,
    speakTimeSeconds: 240,
    samplePoints: [
      "Interroger sur le loyer mensuel et les charges comprises.",
      "Demander le montant du dépôt de garantie et sa restitution.",
      "S'informer sur la durée du bail et la possibilité de résiliation.",
      "Demander si le logement est meublé et décrire le quartier idéal.",
    ],
    modelAnswer:
      "Bonjour, j'aimerais quelques précisions sur l'appartement annoncé. Quel est le loyer mensuel et est-ce que les charges comme l'eau et l'électricité sont comprises ? Quel est le montant exact du dépôt de garantie et est-il restitué en totalité à la fin ? Quelle est la durée minimale du bail et peut-on le résilier avant échéance ? L'appartement est-il meublé ou devrai-je acheter des meubles ? Enfin, pouvez-vous me décrire le quartier, notamment les commerces et les transports ?",
    evaluationCriteria: speakingCriteria,
    vocabularyNotes: [
      "le dépôt de garantie",
      "le bail",
      "les charges comprises",
      "résilier",
    ],
  },
  {
    id: "eo-b1-3",
    taskNumber: 3,
    level: "B1",
    theme: "Vie en ville / région",
    situation: "L'examinateur vous demande de défendre une position sur le choix de vie.",
    prompt:
      "Selon vous, pour bien s'intégrer au Canada, vaut-il mieux vivre en grande ville ou en région ? Présentez votre point de vue avec des arguments.",
    prepTimeSeconds: 90,
    speakTimeSeconds: 240,
    samplePoints: [
      "Annoncer clairement sa position.",
      "Développer deux ou trois arguments en faveur de son choix.",
      "Reconnaître une limite ou un contre-argument et y répondre.",
      "Conclure en réaffirmant sa position.",
    ],
    modelAnswer:
      "À mon avis, la grande ville est le meilleur choix pour s'intégrer au Canada, du moins dans les premières années. D'abord, elle offre des ressources incomparables pour l'apprentissage de la langue : cours, bibliothèques, associations culturelles et occasions de pratiquer chaque jour. Ensuite, vivre en ville multiplie les opportunités professionnelles, ce qui est essentiel quand on commence de zéro. J'ajoute que la diversité des communautés y est une force : on y rencontre d'autres immigrants et l'on se sent moins isolé. Il est vrai que le coût de la vie est plus élevé et qu'on y perd en calme. Mais ces difficultés sont compensées, à mon sens, par les services publics, le logement étudié et la facilité à se déplacer. Pour conclure, je pense que la ville est un tremplin, et l'on peut toujours, plus tard, choisir la région.",
    evaluationCriteria: speakingCriteria,
    vocabularyNotes: [
      "s'intégrer",
      "un tremplin",
      "le coût de la vie",
      "il est vrai que",
    ],
  },

  // ============================ NIVEAU B2 ============================
  {
    id: "eo-b2-1",
    taskNumber: 1,
    level: "B2",
    theme: "Projet professionnel",
    situation: "L'examinateur vous invite à présenter votre projet professionnel en détail.",
    prompt:
      "L'examinateur vous demande de présenter votre projet professionnel : les étapes déjà réalisées, les difficultés rencontrées, les moyens mis en œuvre et les objectifs à venir.",
    prepTimeSeconds: 60,
    speakTimeSeconds: 180,
    samplePoints: [
      "Formuler un projet précis et réaliste.",
      "Retracer les étapes déjà accomplies (diplômes, validation des acquis, démarches).",
      "Identifier les obstacles et les moyens pour les surmonter.",
      "Établir un calendrier concret des objectifs à venir.",
    ],
    modelAnswer:
      "Mon projet professionnel est de devenir infirmier autorisé au Canada. Ce parcours est rigoureux, ce qui me motive d'autant plus. J'ai d'abord validé mes diplômes par une équivalence, puis entamé la procédure d'évaluation de mon dossier auprès de l'ordre professionnel. La principale difficulté a été la lourdeur administrative et, je le reconnais, la maîtrise du vocabulaire médical en français, très éloigné du langage courant. Pour y faire face, je prépare maintenant d'excellents résultats à l'épreuve de langue, grâce à des cours spécialisés deux soirs par semaine et à des échanges constants avec des professionnels. Mon objectif à six mois est de passer l'examen d'autorisation ; s'il réussit, je solliciterai un poste d'infirmier dans un hôpital de la région, avec à terme une spécialisation en soins d'urgence.",
    evaluationCriteria: speakingCriteria,
    vocabularyNotes: [
      "l'équivalence de diplôme",
      "l'ordre professionnel",
      "un parcours rigoureux",
      "se spécialiser",
    ],
  },
  {
    id: "eo-b2-2",
    taskNumber: 2,
    level: "B2",
    theme: "Ouverture de commerce",
    situation: "Vous êtes entrepreneur et interrogez une conseillère de la ville.",
    prompt:
      "Vous souhaitez ouvrir un commerce (par exemple un café) à Winnipeg. L'examinateur joue la conseillère économique de la ville. Posez des questions pour comprendre : les autorisations nécessaires, les aides financières, les exigences en emploi local, la fréquentation du quartier et les échéances. Puis répondez à ses questions.",
    prepTimeSeconds: 120,
    speakTimeSeconds: 300,
    samplePoints: [
      "Demander les étapes et les autorisations pour ouvrir un commerce.",
      "Interroger sur les subventions ou prêts disponibles pour les nouveaux entrepreneurs.",
      "S'informer sur les obligations d'embauche locale.",
      "Demander des données de fréquentation du quartier et les délais de réponse.",
    ],
    modelAnswer:
      "Bonjour, je prépare l'ouverture d'un café dans le quartier Saint-Boniface et j'ai besoin de repères. Quelles autorisations dois-je obtenir avant l'ouverture, et quel est le délai de traitement ? Existe-t-il des subventions ou des prêts à taux préférentiel pour les nouveaux entrepreneurs ? La ville impose-t-elle une part minimale d'embauche locale ? Pouvez-vous me donner des éléments sur la fréquentation du quartier, notamment le week-end, et m'indiquer les prochaines étapes pour déposer ma demande ?",
    evaluationCriteria: speakingCriteria,
    vocabularyNotes: [
      "une autorisation",
      "une subvention",
      "une part minimale",
      "la fréquentation",
    ],
  },
  {
    id: "eo-b2-3",
    taskNumber: 3,
    level: "B2",
    theme: "Numérique et vie de famille",
    situation: "L'examinateur vous propose un sujet de société à défendre.",
    prompt:
      "Le temps passé par les enfants devant les écrans est un sujet de débat. Pensez-vous qu'il faille limiter strictement le temps d'écran des enfants ? Argumentez.",
    prepTimeSeconds: 120,
    speakTimeSeconds: 300,
    samplePoints: [
      "Définir une position claire, évitant l'extrémisme.",
      "Nuancer : usages éducatifs et usages récréatifs distincts.",
      "Évoquer la responsabilité des adultes et les règles familiales.",
      "Conclure en proposant une approche équilibrée.",
    ],
    modelAnswer:
      "Je refuse à la fois la diabolisation des écrans et le laisser-faire ; la question, à mon sens, est celle de la qualité des usages plus que du temps brut. Les écrans offrent des ressources éducatives considérables — applications d'apprentissage, documentaires, langues étrangères — qu'il serait absurde d'interdire. En revanche, le visionnage passif et non régulé, lui, pose de véritables problèmes de sommeil et de concentration. La solution ne me paraît donc pas être une limite stricte et uniforme, mais un encadrement réfléchi : des créneaux clairement définis, des contenus choisis avec l'enfant et, surtout, l'exemplarité des parents. Car un enfant applique davantage ce qu'il voit que ce qu'on lui dit. Je conclus qu'il convient de réguler les usages, pas de compter les minutes, en gardant le dialogue pour centre du dispositif.",
    evaluationCriteria: speakingCriteria,
    vocabularyNotes: [
      "la diabolisation",
      "un usage passif",
      "l'exemplarité",
      "réguler",
    ],
  },

  // ============================ NIVEAU C1 ============================
  {
    id: "eo-c1-1",
    taskNumber: 1,
    level: "C1",
    theme: "Bilan et perspectives",
    situation: "L'examinateur vous demande un bilan raisonné de votre parcours.",
    prompt:
      "L'examinateur vous demande de faire un bilan de votre parcours en tant que nouvel arrivant au Canada : réussites, difficultés, compétences développées, et votre vision de l'avenir.",
    prepTimeSeconds: 90,
    speakTimeSeconds: 240,
    samplePoints: [
      "Structurer le bilan : aspects positifs, difficultés, compétences acquises.",
      "Prendre du recul sur l'expérience (analyse, pas simple chronologie).",
      "Formuler une vision prospective lucide et nuancée de son avenir.",
    ],
    modelAnswer:
      "Dresser un bilan de ma première année au Canada, c'est reconnaître un contraste entre mes craintes initiales et la réalité vécue. Les difficultés, je les ai rencontrées là où je ne les attendais pas : moins dans la langue, que je maîtrisais, que dans l'accès à ce premier emploi à responsabilités, un marché qui exige des références locales que l'on ne peut obtenir sans expérience locale. Ce cercle, souvent décrit, je l'ai brisé par le bénévolat puis un stage, qui m'ont permis de faire la preuve de mes compétences. Sur le plan personnel, cette année m'a transformé : j'ai développé une capacité d'adaptation et une patience que je n'aurais jamais cultivées autrement. Pour l'avenir, je ne me fais aucune illusion sur les obstacles, mais je suis lucide sur ma trajectoire : j'envisage d'ici deux ans une progression vers un poste de gestion, et je sais aujourd'hui que les réseaux professionnels se construisent autant par la confiance que par le diplôme.",
    evaluationCriteria: speakingCriteria,
    vocabularyNotes: [
      "faire un bilan",
      "par la preuve",
      "un réseau professionnel",
      "la trajectoire",
    ],
  },
  {
    id: "eo-c1-2",
    taskNumber: 2,
    level: "C1",
    theme: "Négociation de contrat",
    situation: "Vous êtes consultant et négociez votre mission avec une entreprise.",
    prompt:
      "Vous êtes consultant indépendant et vous négociez une mission avec une entreprise. L'examinateur joue la responsable des achats. Interrogez-la sur : le périmètre exact de la mission, le calendrier, le budget et les modalités de facturation, les livrables attendus et les pénalités. Puis répondez à ses questions.",
    prepTimeSeconds: 120,
    speakTimeSeconds: 300,
    samplePoints: [
      "Clarifier le périmètre et exclure les ambiguïtés du contrat.",
      "Négocier les délais et la facturation (étapes de paiement).",
      "Définir les livrables et le processus de validation.",
      "Aborder la question des pénalités de façon professionnelle.",
    ],
    modelAnswer:
      "Merci pour cette mise en relation. Avant de signer, j'aimerais lever quelques points. Quel est précisément le périmètre de la mission : l'audit des processus se limite-t-il au service logistique, ou inclut-il les achats ? Quels livrables sont attendus à chaque étape, et qui les valide ? Sur le calendrier, je note que vous souhaitez une livraison en trois mois ; pour un audit fiable, je suggère d'échelonner le travail en quatre phases. Concernant le budget, je propose une facturation en trois étapes correspondant aux livrables, et j'aimerais confirmer le mode de paiement, trente ou quarante-cinq jours. Enfin, s'agissant des pénalités, je préférerais qu'elles soient calculées sur le retard constaté, et non sur l'ensemble du contrat. Ces précisions me semblent indispensables pour construire une relation de confiance.",
    evaluationCriteria: speakingCriteria,
    vocabularyNotes: [
      "le périmètre",
      "un livrable",
      "échelonner",
      "une pénalité",
    ],
  },
  {
    id: "eo-c1-3",
    taskNumber: 3,
    level: "C1",
    theme: "Identité numérique",
    situation: "L'examinateur vous demande d'argumenter sur la gouvernance de l'identité numérique.",
    prompt:
      "La gestion des données personnelles est devenue un enjeu de société. Estimez-vous que l'État doive réglementer plus fortement l'usage des données personnelles par les entreprises ? Argumentez en évoquant des enjeux et des exemples.",
    prepTimeSeconds: 120,
    speakTimeSeconds: 300,
    samplePoints: [
      "Poser le cadre : asymétrie entre usagers et entreprises sur les données.",
      "Développer des arguments pour une régulation renforcée (souveraineté, consentement réel).",
      "Présenter les limites d'une sur-régulation (innovation, coûts) et y répondre.",
      "Conclure sur une régulation équilibrée, fondée sur la transparence.",
    ],
    modelAnswer:
      "Je considère que l'encadrement des données personnelles souffre d'un décalage fondamental : les usagers ont perdu le contrôle effectif d'informations dont la valeur, elle, n'a jamais été aussi grande. Dans ce contexte, une régulation renforcée me paraît non seulement légitime, mais nécessaire. Les arguments ne manquent pas : le « consentement » invoqué par les plateformes relève souvent de la fiction juridique, les algorithmes de profilage opèrent à l'insu de leurs cibles, et les fuites massives montrent qu'aucune entreprise n'est infaillible. À l'échelle d'un pays comme le Canada, protéger ces données, c'est aussi protéger sa souveraineté économique. J'entends l'objection selon laquelle trop de normes handicaperaient l'innovation et pèseraient surtout sur les petites entreprises. Mais cette objection, à mon sens, justifie une régulation intelligente, pas son abandon : des obligations proportionnées à la taille des acteurs, une portabilité réelle des données et des sanctions dissuasives. En somme, la régulation ne doit pas asphyxier l'innovation, elle doit garantir que l'innovation profite aux citoyens plutôt qu'elle ne les exploite.",
    evaluationCriteria: speakingCriteria,
    vocabularyNotes: [
      "le profilage",
      "la souveraineté",
      "la portabilité",
      "une régulation proportionnée",
    ],
  },

  // ============================ NIVEAU C2 ============================
  {
    id: "eo-c2-1",
    taskNumber: 1,
    level: "C2",
    theme: "Valeurs et engagement",
    situation: "L'examinateur vous invite à réfléchir à ce qui fonde votre engagement.",
    prompt:
      "L'examinateur vous demande d'expliquer ce qui vous a conduit à votre choix de vie actuel (immigration, métier, engagements) et d'en tirer une réflexion sur vos valeurs.",
    prepTimeSeconds: 90,
    speakTimeSeconds: 300,
    samplePoints: [
      "Relier le parcours vécu à des valeurs explicites, sans clichés.",
      "Analyser une bifurcation décisive (choix d'immigrer, réorientation).",
      "Projeter ces valeurs dans ses choix futurs.",
    ],
    modelAnswer:
      "Si je devais nommer ce qui a guidé mes choix, je dirais que c'est moins l'aventure que la recherche d'une cohérence entre mes convictions et le quotidien. Le choix d'immigrer au Canada, alors que j'avais une situation stable à l'étranger, n'a pas été pour moi un simple calcul économique : c'était le pari qu'une société qui reconnaît le plurilinguisme m'offrirait la possibilité d'être pleinement moi-même, avec toutes mes langues. Mon métier actuel, la médiation interculturelle, prolonge cette conviction : je crois que les malentendus entre personnes de cultures différentes naissent rarement de la mauvaise foi, et presque toujours de l'absence d'outils pour se comprendre. D'ailleurs, mon engagement bénévole auprès des nouveaux arrivants n'est pas une parenthèse, c'est l'illustration quotidienne de cette valeur. Demain, cette cohérence me conduira sans doute à me former à la résolution de conflits dans les milieux professionnels. Si l'on cherche une formule, je dirais que je ne veux pas choisir entre réussir et servir : je veux que mon travail soit mon engagement.",
    evaluationCriteria: speakingCriteria,
    vocabularyNotes: [
      "la cohérence",
      "un pari",
      "la médiation",
      "être pleinement soi-même",
    ],
  },
  {
    id: "eo-c2-2",
    taskNumber: 2,
    level: "C2",
    theme: "Conseil d'administration",
    situation: "Vous êtes administrateur d'une fondation et interrogez son trésorier sur la gouvernance financière.",
    prompt:
      "Vous êtes administrateur d'une fondation qui distribue des subventions. L'examinateur joue le trésorier. Interrogez-le sur : la politique de placement de la dotation, les critères d'octroi des subventions, la transparence du contrôle interne, la prévision de trésorerie et les risques de conflits d'intérêts. Puis répondez à ses questions.",
    prepTimeSeconds: 180,
    speakTimeSeconds: 360,
    samplePoints: [
      "Demander la logique de placement et les critères de risque acceptables.",
      "Interroger sur la doctrine d'octroi des subventions.",
      "S'assurer de la traçabilité et du contrôle interne.",
      "Questionner la prévention des conflits d'intérêts.",
    ],
    modelAnswer:
      "Avant d'entériner les orientations budgétaires, j'aimerais votre éclairage sur plusieurs points de gouvernance. D'abord, la politique de placement : quelle est la répartition de la dotation entre valeurs liquides et actifs à long terme, et quel niveau de risque le conseil juge-t-il acceptable, sachant que notre mission exige une capacité de décaissement régulier ? Ensuite, pour l'octroi des subventions, pourriez-vous expliciter les critères pondérés qui distinguent un dossier recevable d'un dossier prioritaire, et confirmer que les décisions sont bien actées par le conseil ? Troisièmement, j'aimerais vérifier la sécurité des contrôles : existe-t-il une séparation des tâches entre l'ordonnateur des paiements et le comptable, et un audit externe annuel ? Enfin, sur les conflits d'intérêts, quelle procédure s'applique lorsqu'un administrateur avance un projet dont il est aussi bénéficiaire potentiel, et cette déclaration est-elle inscrite au procès-verbal ? Ces réponses conditionneront ma position sur le budget.",
    evaluationCriteria: speakingCriteria,
    vocabularyNotes: [
      "la dotation",
      "l'octroi",
      "la séparation des tâches",
      "un conflit d'intérêts",
    ],
  },
  {
    id: "eo-c2-3",
    taskNumber: 3,
    level: "C2",
    theme: "Science et décision publique",
    situation: "L'examinateur vous propose de trancher un débat épistémologique et politique.",
    prompt:
      "En démocratie, la science peut-elle fonder seule la décision publique ? Développez une argumentation nuancée, en évoquant notamment l'autorité scientifique, le rôle des experts et la place du citoyen.",
    prepTimeSeconds: 180,
    speakTimeSeconds: 360,
    samplePoints: [
      "Rejeter l'autorité scientifique comme fondement exclusif de la décision.",
      "Analyser la place des experts (indépendance, incertitude, pluralisme).",
      "Intégrer le rôle du citoyen et la délibération dans la décision.",
      "Conclure sur un principe d'articulation entre expertise et démocratie.",
    ],
    modelAnswer:
      "Prétendre que la science peut, à elle seule, fonder la décision publique serait trahir à la fois la nature de la science et celle de la démocratie. La science produit des connaissances, certes robustes, mais toujours provisoires et souvent incertaines ; la décision publique, elle, engage des valeurs, des arbitrages entre intérêts divergents, des choix de société qu'aucun résultat expérimental ne peut dicter. Le rôle des experts n'en est pas pour autant négligeable : ils doivent être entendus, mais pas érigés en magistrature. C'est pourquoi leur indépendance financière et leur pluralisme — la possibilité réelle d'entendre des positions méthodologiquement divergentes — sont les garde-fous essentiels. Inversement, une décision qui ignore l'état des connaissances est une décision qui nie le réel, et c'est une faute républicaine. Reste la place du citoyen : non pas un profane qu'il faudrait éduquer, mais un partenaire de la délibération. La juste formule n'est donc ni l'expertocratie, ni le relativisme, mais une articulation honnête où la science informe un débat que la démocratie éclaire. En somme, la science ne commande pas, elle éclaire ; la démocratie décide, mais elle ne peut décider contre les faits sans se faire illusion.",
    evaluationCriteria: speakingCriteria,
    vocabularyNotes: [
      "l'expertocratie",
      "le relativisme",
      "la délibération",
      "les garde-fous",
    ],
  },

  // ============================ VARIANTES THÉMATIQUES ============================
  // Cartes supplémentaires des 3 tâches : présentations et récits (T1),
  // mises en situation professionnelles et citoyennes (T2) et sujets
  // controversés alignés sur les vocabulaires thématiques (T3).

  {
    id: "eo-v1",
    taskNumber: 1,
    level: "B1",
    theme: "Expérience marquante",
    situation: "L'examinateur vous invite à raconter une expérience qui vous a changé.",
    prompt:
      "L'examinateur vous demande de raconter une expérience marquante depuis votre arrivée au Canada (une première rencontre, un événement, une réussite) : ce qui s'est passé, ce que vous avez ressenti et ce que vous en avez appris.",
    prepTimeSeconds: 60,
    speakTimeSeconds: 180,
    samplePoints: [
      "Choisir une expérience précise et raconter les faits dans l'ordre.",
      "Exprimer des émotions au moment des faits et avec le recul.",
      "Tirer une leçon ou un apprentissage de cette expérience.",
    ],
    modelAnswer:
      "La première expérience que je retiens, c'est mon premier après-midi de bénévolat dans une banque alimentaire. J'arrivais à peine à Montréal, je ne connaissais personne, et je m'étais inscrit pour me rendre utile et, je l'avoue, pour sortir de ma solitude. Sur place, j'ai découvert une équipe très organisée : chacun avait une tâche, du tri des dons à la distribution. Ce qui m'a marqué, c'est la dignité avec laquelle les gens recevaient l'aide, et la façon dont les bénévoles, tous d'origines différentes, échangeaient en plaisantant. Ce jour-là, j'ai compris que s'intégrer, ce n'est pas seulement apprendre une langue ou trouver un emploi : c'est tisser des liens par des actions concrètes. Depuis, je fais partie de cette équipe tous les samedis, et cette expérience a changé ma manière d'envisager mon avenir ici.",
    evaluationCriteria: speakingCriteria,
    vocabularyNotes: ["être bénévole", "se rendre utile", "la dignité", "tisser des liens"],
  },
  {
    id: "eo-v2",
    taskNumber: 2,
    level: "B1",
    theme: "Vie de quartier",
    situation: "Vous organisez une rencontre entre voisins d'un immeuble et devez recueillir les souhaits et convaincre.",
    prompt:
      "Vous organisez une première rencontre des habitants de votre immeuble. L'examinateur joue une voisine. Posez-lui des questions sur ses disponibilités, ses envies d'activité et son avis ; répondez ensuite à ses questions et proposez une solution en cas de désaccord.",
    prepTimeSeconds: 90,
    speakTimeSeconds: 240,
    samplePoints: [
      "Prendre contact et proposer un projet précis de rencontre.",
      "Demander les disponibilités et les préférences d'activité.",
      "Répondre aux craintes (bruit, temps) et proposer un compromis.",
      "Conclure par une décision simple acceptée par tous.",
    ],
    modelAnswer:
      "Bonjour Madame, je suis votre voisin du deuxième étage, et j'aimerais organiser une rencontre des habitants de l'immeuble pour mieux nous connaître. Seriez-vous disponible un samedi après-midi, vers seize heures ? Avez-vous une préférence pour l'activité, par exemple un goûter dans la cour ou, pourquoi pas, un pique-nique si le temps le permet ? Je comprends que la cour puisse être bruyante pour les voisins du rez-de-chaussée ; dans ce cas, nous pourrions limiter la rencontre à deux heures et terminer avant vingt heures. Nous avons aussi pensé à un tableau dans le hall pour chacun propose une idée. Qu'en pensez-vous ? Seriez-vous d'accord pour m'aider à lancer les invitations ?",
    evaluationCriteria: speakingCriteria,
    vocabularyNotes: ["organiser une rencontre", "les disponibilités", "un compromis", "lancer les invitations"],
  },
  {
    id: "eo-v3",
    taskNumber: 2,
    level: "B2",
    theme: "Organisation d'événement",
    situation: "Vous êtes chargé d'organiser une journée portes ouvertes dans votre entreprise.",
    prompt:
      "Vous êtes responsable de l'organisation d'une journée portes ouvertes dans votre entreprise. L'examinateur joue la gestionnaire des services généraux. Posez des questions sur la salle disponible, le budget, la restauration, la sécurité et les délais. Puis répondez à ses questions sur votre plan d'organisation.",
    prepTimeSeconds: 120,
    speakTimeSeconds: 300,
    samplePoints: [
      "Vérifier la disponibilité et la capacité des salles.",
      "Clarifier le budget et les frais autorisés (location, restauration).",
      "Interroger sur les contraintes de sécurité et d'assurance.",
      "Fixer ensemble un calendrier et des responsabilités.",
    ],
    modelAnswer:
      "Bonjour, merci de m'accompagner sur l'organisation de la journée portes ouvertes du 15 juin. D'abord, quelle grande salle est disponible ce jour-là, et quelle capacité d'accueil a-t-elle ? Ensuite, le budget prévu couvre-t-il la location du matériel de sonorisation et la prestation de restauration, ou devez-vous me confirmer des montants ? Ai-je une marge pour faire appel à un traiteur local ? Concernant la sécurité, combien de personnes devons-nous prévoir pour l'accueil et les vigiles, et l'assurance de l'entreprise couvre-t-elle ce type d'événement ? Enfin, quel est le délai maximal pour réserver la salle et valider les commandes ? Je vous présenterai ensuite mon plan : accueil à neuf heures, visites guidées le matin, ateliers l'après-midi. Qu'en pensez-vous ?",
    evaluationCriteria: speakingCriteria,
    vocabularyNotes: ["la capacité d'accueil", "la sonorisation", "un traiteur", "une assurance"],
  },
  {
    id: "eo-v4",
    taskNumber: 3,
    level: "B2",
    theme: "Travail et intelligence artificielle",
    situation: "L'examinateur vous confie un sujet controversé à défendre.",
    prompt:
      "« L'intelligence artificielle menacerait des millions d'emplois. » Partagez-vous cette inquiétude ? Présentez votre position avec des arguments et des exemples.",
    prepTimeSeconds: 120,
    speakTimeSeconds: 300,
    samplePoints: [
      "Prendre position sans catastrophe ni déni.",
      "Développer le lien entre IA, transformation des métiers et qualifications.",
      "Montrer le rôle des politiques publiques et de la formation.",
      "Conclure sur une vision équilibrée de l'avenir du travail.",
    ],
    modelAnswer:
      "Je ne pense pas que l'intelligence artificielle « détruise » des emplois au sens où on l'entend trop souvent ; elle les transforme profondément, et c'est cette transformation qu'il faut regarder en face. Il est vrai que certaines tâches répétitives — saisie, standard, premiers triages — seront largement automatisées. Mais l'histoire de l'automatisation nous enseigne que chaque vague supprime des tâches et crée des métiers que l'on n'imaginait pas quinze ans plus tôt. Le vrai danger n'est donc pas la machine, c'est l'inégalité dans l'accès à la formation. Sans un effort massif de montée en compétences, une partie des travailleurs risque d'être laissée au bord de la route, faute de pouvoir se reconvertir. Si l'on veut que cette transition soit juste, les entreprises et l'État doivent investir dans la formation continue, les programmes d'accompagnement et les dispositifs de sécurisation du parcours. En conclusion, je dirais que la question n'est pas « l'IA va-t-elle nous remplacer ? », mais « saurons-nous organiser la transition ? » L'outil n'est ni ange ni démon : il reflète les priorités que nous choisirons.",
    evaluationCriteria: speakingCriteria,
    vocabularyNotes: ["automatiser", "une vague", "la montée en compétences", "la sécurisation"],
  },
  {
    id: "eo-v5",
    taskNumber: 3,
    level: "B2",
    theme: "Environnement et transport",
    situation: "L'examinateur vous invite à défendre un point de vue sur la mobilité.",
    prompt:
      "Pour lutter contre les émissions, faut-il restreindre l'usage de l'avion et de la voiture individuelle ? Exposez votre position avec des arguments et des exemples.",
    prepTimeSeconds: 120,
    speakTimeSeconds: 300,
    samplePoints: [
      "Affirmer une position réaliste, ni maximaliste ni complaisante.",
      "Évoquer les ordres de grandeur des émissions des transports.",
      "Discuter de l'acceptabilité sociale et des alternatives.",
      "Proposer des pistes équilibrées (incitation, tarification, investissement).",
    ],
    modelAnswer:
      "Si je devais résumer ma position, je dirais qu'il ne s'agit pas d'interdire l'avion ou la voiture, mais de les rendre suffisamment chers pour que chacun arbitre avec lucidité — et d'investir massivement dans les alternatives. Le constat est simple : le transport est l'un des premiers postes d'émissions, et la voiture en ville ou les vols courts sont des usages où les alternatives existent déjà. Une restriction pure et simple serait contre-productive sur le plan social : elle frapperait d'abord les personnes éloignées des services publics, sans nécessairement changer le comportement des grandes flottes. Je suis donc favorable à une combinaison de mesures : une tarification carbone redistribuée, la priorité aux transports collectifs et aux modes actifs dans les centres-villes, et une fiscalité dissuasive sur les vols courts là où le train est compétitif. Ces mesures doivent s'accompagner de solutions concrètes, sinon elles resteront des slogans et seront rapidement contestées. En conclusion, la mobilité durable ne se décrète pas : elle se construit par l'investissement, la tarification juste et la pédagogie.",
    evaluationCriteria: speakingCriteria,
    vocabularyNotes: ["redistribuée", "dissuasif", "les modes actifs", "l'acceptabilité"],
  },
  {
    id: "eo-v6",
    taskNumber: 3,
    level: "B2",
    theme: "Santé mentale",
    situation: "L'examinateur vous propose un sujet de société sur la santé mentale.",
    prompt:
      "La santé mentale est devenue un enjeu public majeur. L'État doit-il investir davantage et banaliser le recours aux soins psychologiques, quitte à étendre les remboursements ? Argumentez.",
    prepTimeSeconds: 120,
    speakTimeSeconds: 300,
    samplePoints: [
      "Reconnaître le poids réel des troubles mentaux dans la population.",
      "Développer les bénéfices sociaux et économiques de la prévention.",
      "Évoquer l'offre de soins, le remboursement et la formation des professionnels.",
      "Conclure sur la dualité prévention et accès aux soins.",
    ],
    modelAnswer:
      "Je plaide pour un investissement public résolu dans la santé mentale, car nous payons lourdement son retard : en souffrance humaine, mais aussi en absentéisme, en inégalités et en coûts pour le système de soins. Pendant longtemps, la santé mentale a été traitée comme une question privée, presque honteuse, alors qu'un quart de la population connaîtra un trouble au cours de sa vie. Le premier levier est la prévention : formation des enseignants, dépistage précoce, lignes d'écoute accessibles. Le second est l'accès aux soins : trop de personnes renoncent à consulter faute de moyens, et les délais d'attente aggravent les situations. Élargir le remboursement des psychologues est un investissement et non une dépense, car il réduit les hospitalisations et les arrêts de travail. Je réponds à l'objection du coût par un constat simple : le coût du non-traitement est bien plus élevé. En conclusion, banaliser le recours aux soins psychologiques, c'est reconnaître que la santé mentale fait partie de la santé tout court — et que sa négligence, elle, a un prix collectif.",
    evaluationCriteria: speakingCriteria,
    vocabularyNotes: ["l'absentéisme", "un levier", "le dépistage", "renoncer à consulter"],
  },
  {
    id: "eo-v7",
    taskNumber: 3,
    level: "C1",
    theme: "Technologie et travail",
    situation: "L'examinateur vous soumet un sujet de société sur l'organisation du travail.",
    prompt:
      "Le travail à distance doit-il devenir la norme par défaut dans les services ? Présentez une argumentation complète, en évoquant productivité, relations de travail, inégalités territoriales et vie privée.",
    prepTimeSeconds: 150,
    speakTimeSeconds: 360,
    samplePoints: [
      "Distinguer secteurs et métiers plutôt qu'une norme uniforme.",
      "Analyser l'impact sur le collectif de travail et l'innovation.",
      "Évoquer les gains pour les régions et la conciliation des temps de vie.",
      "Défendre un modèle hybride encadré.",
    ],
    modelAnswer:
      "Faire du télétravail la norme par défaut serait, à mon sens, une erreur symétrique de la précédente — tout comme l'a été son imposition unilatérale aux bureaux. La question ne se pose pas en termes binaires mais de métiers et d'objectifs. Pour les tâches de concentration, la distance est souvent un gain de productivité : moins de trajets, moins d'interruptions. Mais le collectif de travail, lui, se nourrit d'échanges informels que la visioconférence ne remplace qu'imparfaitement : l'innovation nait souvent des conversations de couloir, des recoupements inattendus. Le télétravail offre en revanche un avantage structurant : il rééquilibre les territoires, désengorge les centres-villes et donne aux familles une souplesse réelle, à condition de protéger le droit à la déconnexion. La bonne réponse me paraît être un modèle hybride négocié : du présentiel pour les temps collectifs — réunions de cadrage, ateliers créatifs, intégration des nouveaux — et de la distance pour le travail individuel. Encadré par des règles claires et des objectifs plutôt que par la présence, ce modèle cumule le meilleur des deux mondes sans céder à la mode ni au repli.",
    evaluationCriteria: speakingCriteria,
    vocabularyNotes: ["un impair", "la concentration", "le droit à la déconnexion", "un modèle hybride"],
  },
  {
    id: "eo-v8",
    taskNumber: 3,
    level: "C1",
    theme: "Éducation et société",
    situation: "L'examinateur vous invite à trancher un débat sur l'éducation.",
    prompt:
      "« Faut-il rendre le service civique ou le bénévolat obligatoire pour tous les jeunes ? » Présentez votre position en argumentant de façon nuancée.",
    prepTimeSeconds: 150,
    speakTimeSeconds: 360,
    samplePoints: [
      "Définir distinctement service obligatoire et bénévolat encouragé.",
      "Évoquer les bénéfices de cohésion et d'expérience sociale.",
      "Analyse critique : contrainte et sens de l'engagement.",
      "Proposer des formules alternatives (volontariat valorisé).",
    ],
    modelAnswer:
      "La proposition de rendre le service civique obligatoire appelle une distinction indispensable : entre une obligation, qui peut renforcer la cohésion, et le bénévolat, dont le sens vient précisément du libre choix. Je reconnais les vertus d'un temps de service obligatoire : il expose les jeunes à des réalités sociales éloignées des leurs, crée du lien intergénérationnel et offre une expérience que le parcours scolaire ne donne pas. Mais je redoute une obligation détournée en formalité : un service universitaire imposé se transforme vite en contrainte administrative, sans l'élan de l'engagement volontaire. L'expérience montre que les dispositifs les plus efficaces sont ceux qui cumulent incitation et laissez-passer : un encouragement fort, encadré, avec reconnaissance des compétences et perspectives de valorisation dans le parcours scolaire ou professionnel, plutôt qu'une sanction. Je conclus qu'il ne faut pas rendre le bénévolat obligatoire — cela détruirait ce qu'il apporte — mais qu'il faut le rendre accessible, visible et gratifiant pour tous, notamment pour les jeunes éloignés de ces réseaux. La cohésion ne se décrète pas par la contrainte ; elle se construit par des points de rencontre offerts à tous.",
    evaluationCriteria: speakingCriteria,
    vocabularyNotes: ["la cohésion", "l'engagement volontaire", "la valorisation", "une formalité"],
  },
  {
    id: "eo-v9",
    taskNumber: 3,
    level: "C1",
    theme: "Société et données",
    situation: "L'examinateur vous soumet un sujet sur les données de santé.",
    prompt:
      "Faut-il autoriser les plateformes privées à exploiter les données de santé des citoyens (sous couvert de recherche) ? Argumentez en évoquant la recherche, le consentement et la protection des libertés.",
    prepTimeSeconds: 150,
    speakTimeSeconds: 360,
    samplePoints: [
      "Poser l'ambiguïté fondatrice : la donnée de santé comme bien sensible.",
      "Reconnaître les bénéfices réels pour la recherche médicale.",
      "Évoquer l'asymétrie et le consentement éclairé.",
      "Défendre un cadre public, transparent et audité.",
    ],
    modelAnswer:
      "Mon point de vue est clair : les données de santé peuvent nourrir une énorme avancée médicale, mais elles ne doivent être exploitées « sous couvert de recherche » — c'est toute la fragilité du sujet — que dans un cadre public, transparent et audité. Le potentiel est réel : croiser les données de milliers de patients peut accélérer la découverte de traitements, la détection précoce de maladies ou la coordination des soins. Mais la donnée de santé est d'une nature particulière : elle ne concerne pas seulement l'individu, elle contient une vérité sur sa vie qu'aucun retour ne pourra réparer en cas de fuite. Confier cette exploitation à un acteur privé, motivé par la valeur économique de la donnée, crée un conflit d'intérêts structurel entre le bien du patient et le modèle de l'entreprise. L'alternative n'est pas l'immobilisme : c'est l'encadrement strict — hébergement sur le territoire, données pseudonymisées, finalités limitées et non étendables, consentement éclairé renouvelable, audit indépendant publié chaque année. Si ces garanties sont en place, je vois peu de raisons d'investir ces acteurs de la confiance ; sinon, aucune justification économique ne saurait légitimer l'exposition de nos vies les plus privées.",
    evaluationCriteria: speakingCriteria,
    vocabularyNotes: ["pseudonymisées", "un conflit d'intérêts", "l'hébergement", "un audit indépendant"],
  },
  {
    id: "eo-v10",
    taskNumber: 3,
    level: "C2",
    theme: "Économie et environnement",
    situation: "L'examinateur vous confie un débat de fond sur le modèle économique.",
    prompt:
      "« Une économie doit elle reposer sur une croissance continue ou viser la décroissance ? » Présentez une argumentation de fond, en évitant les positions de pure forme.",
    prepTimeSeconds: 180,
    speakTimeSeconds: 360,
    samplePoints: [
      "Refuser l'alternative caricaturale croissance/décroissance.",
      "Déconstruire la notion d'indicateur (PIB) et proposer des comptabilités multiples.",
      "Distinguer secteurs à décroître, secteurs à convertir, secteurs à développer.",
      "Conclure sur la planification et la soutenabilité.",
    ],
    modelAnswer:
      "Soumettre le débat à l'alternative de la croissance et de la décroissance, c'est déjà se donner un vocabulaire qui trompe, car la question n'est pas un chiffre agrégé mais la matière de l'activité. Le PIB est un indicateur arbitraire : il compte la production de désordre écologique au même titre que les services les plus utiles. Dès lors, « croître » et « décroître » n'ont pas de signification économique claire. Le vrai travail d'une politique de transition est de discriminer : des activités à forte empreinte et faible valeur sociale, qu'il faut réduire — énergie fossile, consommation non durable — ; des activités sobres et créatrices de valeur, qu'il faut développer — rénovation, santé, éducation, économie de la fonctionnalité. Cette réorientation ne peut être abandonnée à la seule régulation par les prix : elle suppose une planification qui réoriente l'investissement et une refonte des comptabilités publiques pour mesurer ce qui compte. La soutenabilité n'est donc ni un retour à une croissance symbolique, ni l'ascétisme d'une décroissance indifférenciée : c'est une conversion qualitative de l'économie, dont la décroissance de certains secteurs n'est que la conséquence méthodique. C'est le seul programme assez exigeant pour être à la hauteur du siècle qui s'ouvre.",
    evaluationCriteria: speakingCriteria,
    vocabularyNotes: ["un indicateur arbitraire", "l'empreinte", "l'économie de la fonctionnalité", "une conversion qualitative"],
  },
];

export function getSpeakingTopicsForLevel(level: SpeakingTopic["level"]): SpeakingTopic[] {
  return speakingTopics.filter((t) => t.level === level);
}