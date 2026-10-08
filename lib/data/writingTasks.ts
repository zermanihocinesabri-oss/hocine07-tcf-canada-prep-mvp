import { WritingTask } from "@/lib/types";

/**
 * Banque d'exercices — Expression Écrite (EE).
 * Les 3 tâches officielles du TCF Canada, déclinées par niveau CECRL (A1 à C2) :
 *   - Tâche 1 : message ou courriel court (40 à 60 mots)
 *   - Tâche 2 : article, récit ou compte-rendu (120 à 150 mots)
 *   - Tâche 3 : point de vue argumenté sur un sujet de société (120 à 150 mots)
 * Chaque tâche est accompagnée d'un corrigé type et de l'analyse de ce qui fait
 * que le modèle répond aux critères de correction du TCF.
 */

const standardCriteria: WritingTask["evaluationCriteria"] = [
  {
    label: "Respect de la consigne",
    description:
      "Le texte traite bien le sujet, répond à toutes les consignes (destinataire, registre, longueur demandée).",
  },
  {
    label: "Cohérence et progression",
    description:
      "Les idées s'enchaînent logiquement, le texte est organisé en paragraphes, les connecteurs sont utilisés.",
  },
  {
    label: "Vocabulaire",
    description: "Lexique varié, précis et adapté au sujet et au destinataire.",
  },
  {
    label: "Correction grammaticale",
    description: "Orthographe, conjugaison, syntaxe et accords maîtrisés.",
  },
];

export const writingTasks: WritingTask[] = [
  // ============================ NIVEAU A1 ============================
  {
    id: "ee-a1-1",
    taskNumber: 1,
    level: "A1",
    title: "Tâche 1 — Message court",
    type: "message",
    situation:
      "Vous venez d'emménager à Montréal dans un appartement dont le chauffage ne fonctionne plus.",
    prompt:
      "Vous venez d'emménager dans un appartement à Montréal. Le chauffage ne fonctionne pas depuis hier. Écrivez un message à votre propriétaire (40 à 60 mots) pour lui expliquer le problème et demander une solution rapide.",
    minWords: 40,
    maxWords: 60,
    timeLimitMinutes: 10,
    modelAnswer:
      "Bonjour Madame Lefèvre, je m'appelle Camille. Je suis votre nouvelle locataire au 12, rue Sherbrooke. Depuis hier, mon chauffage ne fonctionne plus et il fait très froid. Pouvez-vous m'aider ? Je suis disponible demain après-midi pour ouvrir ma porte à un technicien. Merci beaucoup. Camille",
    modelAnswerAnalysis: [
      "Formule d'appel et de politesse correctes pour un message formel écrit à un propriétaire.",
      "Tous les éléments demandés sont présents : qui écrit, le problème précis (chauffage), la demande d'aide.",
      "Structure simple mais complète : situation, problème, proposition, remerciement.",
    ],
    evaluationCriteria: standardCriteria,
    vocabularyNotes: [
      "ne fonctionne plus",
      "je suis disponible",
      "faire réparer",
      "locataire / propriétaire",
    ],
  },
  {
    id: "ee-a1-2",
    taskNumber: 2,
    level: "A1",
    title: "Tâche 2 — Compte-rendu / Récit",
    type: "article",
    situation: "Vous avez participé à votre première fête de quartier à Québec.",
    prompt:
      "Vous avez participé pour la première fois à une fête de quartier dans votre ville. Écrivez un texte (120 à 150 mots) pour raconter cette journée à vos amis : ce que vous avez fait, les personnes rencontrées, ce qui vous a plu.",
    minWords: 120,
    maxWords: 150,
    timeLimitMinutes: 15,
    modelAnswer:
      "Samedi dernier, j'ai participé pour la première fois à la fête de mon quartier à Québec. Quand je suis arrivé, il y avait déjà beaucoup de monde dans la rue principale, fermée aux voitures pour l'occasion. J'ai commencé la journée par un petit marché où des artisans vendaient des objets faits à la main. J'ai acheté un cadeau pour ma sœur. Ensuite, j'ai écouté un groupe de musique qui jouait au centre de la place. J'ai aussi goûté des plats de différents pays, préparés par les habitants du quartier. J'ai rencontré mes voisins, qui sont très gentils et qui m'ont proposé de m'aider à déménager mes meubles. J'ai adoré cette journée parce que j'ai découvert que ma nouvelle ville est chaleureuse et accueillante. J'ai hâte à la prochaine fête.",
    modelAnswerAnalysis: [
      "Récit chronologique simple et clair : arrivée, activités de la journée, impression finale.",
      "Utilisation du passé composé, adapté à un récit d'événements passés.",
      "Lexique simple mais précis du quotidien et de la fête (marché, artisans, groupe de musique, plats).",
    ],
    evaluationCriteria: standardCriteria,
    vocabularyNotes: [
      "j'ai participé",
      "je suis arrivé(e)",
      "se sont rencontrés",
      "un événement",
    ],
  },
  {
    id: "ee-a1-3",
    taskNumber: 3,
    level: "A1",
    title: "Tâche 3 — Point de vue argumenté",
    type: "essai",
    situation: "Un débat local demande aux habitants de donner leur avis sur les parcs publics.",
    prompt:
      "Le journal de votre quartier demande l'avis des habitants : faut-il créer plus de parcs publics dans la ville ? Écrivez un texte (120 à 150 mots) dans lequel vous donnez votre opinion et vous l'expliquez avec des exemples.",
    minWords: 120,
    maxWords: 150,
    timeLimitMinutes: 20,
    modelAnswer:
      "À mon avis, il faut créer plus de parcs publics dans notre ville. Les parcs sont importants pour plusieurs raisons. D'abord, c'est un endroit agréable pour les familles. Les enfants peuvent jouer dehors et les parents peuvent se reposer sur des bancs. Ensuite, les parcs sont bons pour la santé parce que les gens font du sport en plein air. Dans mon quartier, le petit parc est toujours plein de promeneurs le soir. Enfin, les arbres et les plantes rendent la ville plus jolie et l'air plus propre en été. Bien sûr, créer un parc coûte de l'argent à la ville. Mais je pense que c'est un bon investissement pour tout le monde. Pour conclure, je suis vraiment favorable à la création de nouveaux parcs, car ils améliorent la vie de tous les habitants.",
    modelAnswerAnalysis: [
      "Opinion annoncée clairement dès la première phrase et maintenue jusqu'à la conclusion.",
      "Arguments simples (familles, santé, esthétique) illustrés par un exemple concret tiré du quartier.",
      "Connecteurs logiques de base : d'abord, ensuite, enfin, bien sûr, pour conclure.",
    ],
    evaluationCriteria: standardCriteria,
    vocabularyNotes: [
      "à mon avis",
      "d'abord / ensuite / enfin",
      "un investissement",
      "favorable / opposé(e)",
    ],
  },

  // ============================ NIVEAU A2 ============================
  {
    id: "ee-a2-1",
    taskNumber: 1,
    level: "A2",
    title: "Tâche 1 — Courriel",
    type: "message",
    situation: "Vous devez vous absenter de votre cours de français pour un rendez-vous médical.",
    prompt:
      "Vous ne pourrez pas assister à votre cours de français demain matin. Écrivez un courriel (40 à 60 mots) à votre professeur pour vous excuser, expliquer la raison de votre absence et demander les devoirs à faire.",
    minWords: 40,
    maxWords: 60,
    timeLimitMinutes: 10,
    modelAnswer:
      "Bonjour Madame Roy, je vous écris pour vous informer que je ne pourrai pas assister au cours de demain matin, car j'ai un rendez-vous médical important. Je m'excuse pour ce désagrément. Pourriez-vous m'envoyer les devoirs à faire à la maison ? Je les ferai avant la prochaine leçon. Merci d'avance. Sincères salutations, Nadia",
    modelAnswerAnalysis: [
      "Situation de communication parfaitement respectée : excuse, raison, demande précise.",
      "Registre semi-formel adapté à un enseignant.",
      "Structure courte et complète : formule d'appel, contexte, demande, politesse finale.",
    ],
    evaluationCriteria: standardCriteria,
    vocabularyNotes: [
      "je vous écris pour",
      "je ne pourrai pas",
      "je m'excuse",
      "pourriez-vous",
    ],
  },
  {
    id: "ee-a2-2",
    taskNumber: 2,
    level: "A2",
    title: "Tâche 2 — Article",
    type: "article",
    situation: "Votre ville a inauguré une nouvelle bibliothèque, et le journal local sollicite vos impressions.",
    prompt:
      "Le journal local vous demande d'écrire un article (120 à 150 mots) sur la nouvelle bibliothèque de votre quartier : ce qu'elle propose, ce que vous y avez trouvé, vos impressions.",
    minWords: 120,
    maxWords: 150,
    timeLimitMinutes: 15,
    modelAnswer:
      "Notre quartier a enfin une nouvelle bibliothèque moderne, et j'ai voulu la découvrir dès son ouverture. Le bâtiment est lumineux et spacieux. Au rez-de-chaussée, on trouve un grand espace pour les enfants avec des livres, des jeux et des ordinateurs. Au premier étage, il y a une salle de lecture calme où les étudiants viennent travailler, et de nombreux postes informatiques à la disposition de tous. J'ai été surpris par la richesse des collections : des romans en français et en anglais, mais aussi des films et de la musique à emprunter gratuitement. Le personnel est très accueillant et m'a aidé à créer ma carte de lecteur. J'y suis retourné déjà deux fois cette semaine. Cette bibliothèque est une grande chance pour notre quartier : elle offre un lieu convivial pour apprendre, se rencontrer et partager. Je recommande vivement une visite à tous les habitants.",
    modelAnswerAnalysis: [
      "Article descriptif organisé par lieux (rez-de-chaussée, premier étage) et par aspects (collections, personnel).",
      "Réactions et impressions personnelles intégrées naturellement au texte.",
      "Phrases variées : constats, descriptions, recommandations finales.",
    ],
    evaluationCriteria: standardCriteria,
    vocabularyNotes: [
      "un espace",
      "à la disposition de",
      "emprunter",
      "je recommande",
    ],
  },
  {
    id: "ee-a2-3",
    taskNumber: 3,
    level: "A2",
    title: "Tâche 3 — Point de vue argumenté",
    type: "essai",
    situation: "Un forum en ligne discute de l'importance d'apprendre une nouvelle langue pour immigrer au Canada.",
    prompt:
      "Sur un forum, des immigrants échangent : faut-il apprendre l'anglais avant de venir au Canada ? Donnez votre opinion dans un texte de 120 à 150 mots et justifiez-la.",
    minWords: 120,
    maxWords: 150,
    timeLimitMinutes: 20,
    modelAnswer:
      "Personnellement, je pense qu'il est très utile d'apprendre l'anglais avant de venir au Canada, même si ce n'est pas obligatoire. Tout d'abord, l'anglais permet de communiquer dès l'arrivée. Quand on ne parle pas la langue, les choses simples comme faire des courses ou aller chez le médecin deviennent difficiles. Ensuite, la connaissance de l'anglais facilite la recherche de travail, car la plupart des employeurs demandent un niveau minimum de langue. Mon cousin a trouvé un emploi beaucoup plus vite parce qu'il avait déjà un bon niveau. Enfin, apprendre la langue avant le départ réduit le stress de l'installation et donne confiance. Bien sûr, on peut aussi commencer à apprendre sur place, dans des cours gratuits. Mais je crois qu'il vaut mieux préparer ce projet sérieusement dès que possible. C'est pourquoi je recommande de commencer avant le départ.",
    modelAnswerAnalysis: [
      "Thèse claire (utile de commencer avant) défendue avec trois arguments hiérarchisés.",
      "Argument personnel (l'exemple du cousin) qui illustre le point de vue.",
      "Nuanciation finale (« on peut aussi... mais ») qui enrichit la réflexion.",
    ],
    evaluationCriteria: standardCriteria,
    vocabularyNotes: [
      "personnellement",
      "tout d'abord",
      "faciliter la recherche",
      "je recommande",
    ],
  },

  // ============================ NIVEAU B1 ============================
  {
    id: "ee-b1-1",
    taskNumber: 1,
    level: "B1",
    title: "Tâche 1 — Courriel formel",
    type: "message",
    situation: "Vous devez reporter un rendez-vous à l'immigration Canada.",
    prompt:
      "Vous avez un rendez-vous à l'immigration Canada, mais vous devez le reporter pour un motif professionnel. Écrivez un courriel (40 à 60 mots) au service responsable pour expliquer votre situation et demander un nouveau rendez-vous.",
    minWords: 40,
    maxWords: 60,
    timeLimitMinutes: 10,
    modelAnswer:
      "Bonjour, je me permets de vous écrire afin de reporter mon rendez-vous du 15 mars, prévu à 10h, en raison d'un déplacement professionnel imprévu. Je suis très disponible à partir du 20 mars, n'importe quel jour de la semaine. Pourriez-vous me proposer un créneau ? Je vous remercie par avance pour votre compréhension. Cordialement, Ali Benali, dossier n° 452",
    modelAnswerAnalysis: [
      "Objet de la demande exposé clairement et immédiatement avec la date et l'heure.",
      "Disponibilités proposées, ce qui facilite la réponse du service.",
      "Formules de politesse entièrement formelles, adaptées à une administration.",
    ],
    evaluationCriteria: standardCriteria,
    vocabularyNotes: [
      "je me permets de vous écrire",
      "reporter un rendez-vous",
      "n'importe quel",
      "cordialement",
    ],
  },
  {
    id: "ee-b1-2",
    taskNumber: 2,
    level: "B1",
    title: "Tâche 2 — Compte-rendu",
    type: "article",
    situation: "Vous avez assisté à une conférence sur les métiers du numérique au Canada.",
    prompt:
      "Vous avez assisté à une conférence intitulée « Les métiers du numérique au Canada ». Rédigez un compte-rendu (120 à 150 mots) pour votre association : les thèmes abordés, les points marquants et ce que vous en retenez.",
    minWords: 120,
    maxWords: 150,
    timeLimitMinutes: 15,
    modelAnswer:
      "Le 12 novembre, j'ai assisté à la conférence « Les métiers du numérique au Canada », organisée au Palais des congrès de Montréal. L'intervenante, une spécialiste en ressources humaines, a présenté les secteurs qui recrutent le plus : l'intelligence artificielle, la cybersécurité et le développement de logiciels. Elle a expliqué que ces métiers manquent de candidats, en particulier en région. Un point a particulièrement retenu mon attention : selon plusieurs études, les entreprises valorisent désormais les compétences humaines, comme la communication et le travail d'équipe, autant que les compétences techniques. La conférence s'est terminée par une session de questions. J'ai retenu qu'il existe de nombreux programmes de formation gratuits ou à coût réduit pour se former à ces métiers. Ce compte-rendu m'a été utile et je recommande à toute personne intéressée par l'immigration de participer à ces événements pour mieux comprendre le marché du travail canadien.",
    modelAnswerAnalysis: [
      "Compte-rendu clair : contexte, résumé du contenu, point marquant identifié, conclusion personnelle.",
      "Informations factuelles précisées (date, lieu, thèmes).",
      "Discours rapporté et vocabulaire du monde professionnel maîtrisés.",
    ],
    evaluationCriteria: standardCriteria,
    vocabularyNotes: [
      "j'ai assisté",
      "recruter",
      "un secteur d'activité",
      "se former",
    ],
  },
  {
    id: "ee-b1-3",
    taskNumber: 3,
    level: "B1",
    title: "Tâche 3 — Point de vue argumenté",
    type: "essai",
    situation: "Le télétravail fait débat dans la presse canadienne.",
    prompt:
      "De nombreuses entreprises proposent désormais le télétravail. Selon vous, le télétravail est-il une avancée ou une source de difficultés ? Développez votre point de vue (120 à 150 mots) en vous appuyant sur des arguments et des exemples.",
    minWords: 120,
    maxWords: 150,
    timeLimitMinutes: 20,
    modelAnswer:
      "Le télétravail s'est imposé ces dernières années, et je considère qu'il représente une avancée, à condition d'être bien encadré. D'un côté, ses avantages sont réels : il supprime les déplacements, ce qui fait gagner un temps précieux, et il offre une plus grande autonomie dans l'organisation du travail. Ma sœur, qui télétravaille trois jours par semaine, confirme qu'elle est plus concentrée et moins fatiguée. D'un autre côté, il ne faut pas sous-estimer les difficultés. L'isolement et la porosité entre vie professionnelle et vie privée guettent les salariés qui restent trop souvent chez eux. C'est pourquoi les entreprises doivent fixer des règles claires, comme des horaires de disponibilité communs et des réunions d'équipe régulières. En conclusion, je pense que le télétravail est un progrès, à condition de préserver le lien social et de délimiter son temps de travail.",
    modelAnswerAnalysis: [
      "Thèse claire et nuancée (« une avancée à condition d'être encadré ») soutenue d'emblée.",
      "Structure dialectique efficace : avantages, limites, solution, conclusion.",
      "Exemple personnel (la sœur) et connecteurs variés (d'un côté, d'un autre côté, c'est pourquoi).",
    ],
    evaluationCriteria: standardCriteria,
    vocabularyNotes: [
      "une avancée",
      "à condition de",
      "la porosité",
      "préserver le lien social",
    ],
  },

  // ============================ NIVEAU B2 ============================
  {
    id: "ee-b2-1",
    taskNumber: 1,
    level: "B2",
    title: "Tâche 1 — Réponse officielle",
    type: "message",
    situation: "Vous contestez une facture de téléphone et écrivez à l'opérateur.",
    prompt:
      "Vous avez reçu une facture de téléphone supérieure au montant prévu par votre contrat. Écrivez un courriel (40 à 60 mots) à l'opérateur pour contester cette facture, préciser le montant et demander une vérification.",
    minWords: 40,
    maxWords: 60,
    timeLimitMinutes: 10,
    modelAnswer:
      "Bonjour, je conteste le montant de ma facture d'octobre, de 89 dollars, alors que mon forfait est de 39 dollars. Cette différence ne correspond à aucun appel ni option. Je vous demande donc une vérification rapide et la correction de cette facture. Cordialement, Sofia Marzouk",
    modelAnswerAnalysis: [
      "Objet contesté précis et chiffré (89 $ facturé au lieu de 39 $).",
      "Demande d'action claire (vérification) et preuve jointe.",
      "Tonalité ferme mais courtoise, adaptée à un litige commercial.",
    ],
    evaluationCriteria: standardCriteria,
    vocabularyNotes: [
      "je conteste",
      "le montant",
      "une pièce jointe",
      "procéder à une vérification",
    ],
  },
  {
    id: "ee-b2-2",
    taskNumber: 2,
    level: "B2",
    title: "Tâche 2 — Article argumentatif",
    type: "article",
    situation: "Un magazine en ligne lance une tribune sur les avantages et limites des grandes villes.",
    prompt:
      "Un magazine en ligne publie une série d'articles sur la vie en grande ville. Vous devez écrire un article (120 à 150 mots) présentant, selon vous, les principaux atouts et les principales limites de la vie urbaine.",
    minWords: 120,
    maxWords: 150,
    timeLimitMinutes: 15,
    modelAnswer:
      "Les grandes villes exercent une fascination qui ne se dément pas, et il faut reconnaître leurs atouts considérables. L'offre y est incomparable : institutions culturelles, opportunités professionnelles, services de santé spécialisés. Vivre en ville, c'est aussi un réseau de transports qui permet de se passer de voiture. Pourtant, ce tableau a des ombres. Le coût de la vie y est élevé, le logement y est rare et souvent exigu, et la densité peut générer stress et anonymat. Surtout, la ville creuse des inégalités : seuls ceux qui disposent de revenus confortables peuvent véritablement en profiter. Si la ville reste un moteur d'émancipation, elle n'est pas pour autant une promesse tenue pour tous. Une politique ambitieuse en matière de logement accessible et de transports abordables permettrait de corriger ce déséquilibre. C'est la condition pour que la ville demeure un espace de réussite partagée.",
    modelAnswerAnalysis: [
      "Texte organisé en deux volets équilibrés : atouts puis limites, avec une ouverture prospective.",
      "Thèse finale nuancée (« une promesse non tenue pour tous ») qui dépasse le simple catalogue.",
      "Vocabulaire abstrait et nominalisations (émancipation, anonymat) adaptés au niveau B2.",
    ],
    evaluationCriteria: standardCriteria,
    vocabularyNotes: [
      "un atout",
      "les inégalités",
      "se passer de",
      "un espace de réussite",
    ],
  },
  {
    id: "ee-b2-3",
    taskNumber: 3,
    level: "B2",
    title: "Tâche 3 — Point de vue argumenté",
    type: "essai",
    situation: "Un débat public porte sur la place de l'intelligence artificielle dans l'éducation.",
    prompt:
      "Certains pensent que l'intelligence artificielle doit être largement intégrée dans l'éducation, d'autres s'y opposent. Développez votre point de vue (120 à 150 mots) en justifiant votre position par des arguments précis.",
    minWords: 120,
    maxWords: 150,
    timeLimitMinutes: 20,
    modelAnswer:
      "L'intelligence artificielle fait irruption dans les salles de classe, et je pense qu'il faut l'intégrer avec discernement plutôt que l'interdire. Ses atouts pédagogiques sont indéniables : les outils d'IA peuvent individualiser les exercices, proposer des corrections immédiates et aider les élèves en difficulté à progresser à leur rythme. On ne l'utilise alors pas à la place du travail, mais comme un assistant. En revanche, les risques sont réels. Une dépendance excessive à l'outil fragilise l'apprentissage de la méthode et de la mémorisation, et pose la question de la tricherie et de l'équité. C'est pourquoi l'IA doit rester au service de l'enseignant, lui-même formé pour l'encadrer. En conclusion, l'IA est un outil puissant, ni miracle, ni menace : son intégration réfléchie, avec des règles claires, peut réellement enrichir l'école sans la dénaturer.",
    modelAnswerAnalysis: [
      "Position nuancée annoncée dès l'introduction (« avec discernement plutôt que l'interdire »).",
      "Deux arguments en faveur, deux risques identifiés, puis une proposition d'encadrement.",
      "Conclusion qui résume sans répéter : l'outil « ni miracle, ni menace » est utile s'il est encadré.",
    ],
    evaluationCriteria: standardCriteria,
    vocabularyNotes: [
      "avec discernement",
      "individualiser",
      "l'équité",
      "au service de",
    ],
  },

  // ============================ NIVEAU C1 ============================
  {
    id: "ee-c1-1",
    taskNumber: 1,
    level: "C1",
    title: "Tâche 1 — Courriel de réclamation",
    type: "message",
    situation: "Une assurance refuse de couvrir un sinistre que vous jugez légitime.",
    prompt:
      "Votre assurance habitation refuse de vous indemniser après un dégât des eaux. Écrivez un courriel (40 à 60 mots) à votre assureur pour contester ce refus, rappeler les termes de votre contrat et demander une réévaluation du dossier.",
    minWords: 40,
    maxWords: 60,
    timeLimitMinutes: 10,
    modelAnswer:
      "Bonjour, je ne peux accepter la décision de refus d'indemnisation concernant le dégât des eaux déclaré le 2 mars. Votre courrier invoque une clause de vétusté, or ma police d'assurance couvre expressément les dommages hydrauliques. Je demande donc une réévaluation de mon dossier sous huitaine, faute de quoi je me réserve le droit de saisir le médiateur. Cordialement, Jean-Claude Martin",
    modelAnswerAnalysis: [
      "Contestation précise et argumentée : le refus est confronté aux clauses réelles du contrat.",
      "Dernière phrase inscrit la demande dans un cadre juridique crédible (recours au médiateur).",
      "Formulation dense et formelle, conforme au registre de la réclamation assurantielle.",
    ],
    evaluationCriteria: standardCriteria,
    vocabularyNotes: [
      "indemnisation",
      "la vétusté",
      "saisir le médiateur",
      "sous huitaine",
    ],
  },
  {
    id: "ee-c1-2",
    taskNumber: 2,
    level: "C1",
    title: "Tâche 2 — Article d'analyse",
    type: "article",
    situation: "Une revue professionnelle vous demande d'analyser l'évolution du recrutement des immigrants diplômés.",
    prompt:
      "Une revue professionnelle vous demande un article (120 à 150 mots) analysant pourquoi les immigrants diplômés au Canada rencontrent souvent des difficultés à faire reconnaître leurs compétences, et quelles solutions pourraient être envisagées.",
    minWords: 120,
    maxWords: 150,
    timeLimitMinutes: 15,
    modelAnswer:
      "Le décalage entre les compétences des immigrants diplômés et les emplois qu'ils occupent à leur arrivée demeure l'un des angles morts des politiques d'intégration canadiennes. Les causes sont multiples : l'équivalence des diplômes obtenus à l'étranger n'est pas toujours reconnue, l'expérience dite « canadienne » est exigée alors même qu'elle est inaccessible sans premier emploi, et les réseaux professionnels, déterminants dans le recrutement, échappent largement aux nouveaux arrivants. Les conséquences ne se limitent pas à une perte de revenus : elles engendrent un sentiment de déclassement et un gaspillage de talents que le pays ne peut durablement négliger. Des solutions existent néanmoins : harmoniser la reconnaissance des titres, multiplier les programmes de mentorat et évaluer les compétences par la pratique, par exemple lors de stages ciblés. Une immigration réussie ne se mesure pas à l'admission, mais à la capacité du pays à valoriser réellement ce qu'elle apporte.",
    modelAnswerAnalysis: [
      "Analyse causale structurée : causes, conséquences, solutions, chacune développée.",
      "Registre soutenu et nominalisation (déclassement, gaspillage, reconnaissance).",
      "Thèse finale forte qui élève le propos de la simple liste d'observations.",
    ],
    evaluationCriteria: standardCriteria,
    vocabularyNotes: [
      "l'angle mort",
      "le déclassement",
      "la reconnaissance des titres",
      "valoriser les compétences",
    ],
  },
  {
    id: "ee-c1-3",
    taskNumber: 3,
    level: "C1",
    title: "Tâche 3 — Point de vue argumenté",
    type: "essai",
    situation: "Le collectif pour le climat et le milieu entrepreneurial s'opposent sur la décroissance.",
    prompt:
      "Dans un débat de société, certains affirment que la croissance économique doit être abandonnée pour préserver la planète, d'autres jugent cette position irréaliste. Exposez votre point de vue (120 à 150 mots) en argumentant avec rigueur.",
    minWords: 120,
    maxWords: 150,
    timeLimitMinutes: 20,
    modelAnswer:
      "Opposer frontalement croissance et préservation de la planète me paraît un faux dilemme, encore qu'il mérite d'être pris au sérieux. Prôner l'abandon pur et simple de la croissance suppose de définir des indicateurs de bien-être alternatifs au PIB, ce qui engagerait une refonte profonde de nos économies, dont le coût social et politique est rarement évalué. À l'inverse, poursuivre une course aveugle à l'augmentation du PIB reviendrait à ignorer les limites physiques de la croissance. La voie la plus réaliste consiste à réorienter la croissance plutôt qu'à la nier : soutenir les secteurs sobres et créateurs d'emplois qualifiés, décarboner l'énergie et instaurer une comptabilité environnementale obligatoire. En somme, ce n'est pas la croissance qui est contestable, c'est sa nature. La convertir en outil de transition écologique est plus ambitieux et plus crédible qu'une décroissance que personne n'a su définir concrètement.",
    modelAnswerAnalysis: [
      "Thèse complexe et rigoureusement défendue : ni croissance aveugle ni décroissance, mais « réorientation ».",
      "Recul critique sur chaque camp (« faussement stimulante », « sans coût évalué »).",
      "Conclusion conceptuelle (« ce n'est pas la croissance qui est contestable, c'est sa nature »).",
    ],
    evaluationCriteria: standardCriteria,
    vocabularyNotes: [
      "un faux dilemme",
      "soutenable",
      "la décarbonation",
      "l'extraction des ressources",
    ],
  },

  // ============================ NIVEAU C2 ============================
  {
    id: "ee-c2-1",
    taskNumber: 1,
    level: "C2",
    title: "Tâche 1 — Mise en demeure",
    type: "message",
    situation: "Vous adressez une mise en demeure à un employeur qui n'a pas versé votre dernier salaire.",
    prompt:
      "Votre ancien employeur ne vous a pas versé votre salaire du dernier mois malgré deux relances. Rédigez un courriel (40 à 60 mots) constituant une mise en demeure : rappelez la situation, le montant dû, la date butoir de paiement et les recours envisagés.",
    minWords: 40,
    maxWords: 60,
    timeLimitMinutes: 10,
    modelAnswer:
      "Madame, Monsieur, le salaire de mon dernier mois, soit 3 240 dollars, demeure impayé malgré mes relances des 5 et 20 novembre. Je vous mets en demeure de le régler sous huitaine. À défaut, je saisirai la Commission des normes du travail et réclamerai les intérêts légaux. Jean-Baptiste Roy",
    modelAnswerAnalysis: [
      "Registre juridique maîtrisé : mise en demeure, délai, recours, intérêts.",
      "Montant et dates précis, indispensables à la validité du recours.",
      "Concision et gravité du ton, conformes au genre du courrier injonctif.",
    ],
    evaluationCriteria: standardCriteria,
    vocabularyNotes: [
      "impayé",
      "mettre en demeure",
      "à défaut",
      "les intérêts légaux",
    ],
  },
  {
    id: "ee-c2-2",
    taskNumber: 2,
    level: "C2",
    title: "Tâche 2 — Tribune d'analyse",
    type: "article",
    situation: "Une revue de sciences sociales vous demande une analyse du rapport entre mémoire et identité chez les communautés immigrantes.",
    prompt:
      "Une revue de sciences sociales vous commande une tribune (120 à 150 mots) sur le rôle de la mémoire collective dans la construction identitaire des communautés immigrantes au Canada.",
    minWords: 120,
    maxWords: 150,
    timeLimitMinutes: 15,
    modelAnswer:
      "La mémoire collective constitue pour les communautés immigrantes un point d'ancrage paradoxal : vecteur de continuité avec une culture d'origine, elle devient aussi le prisme à travers lequel l'expérience migratoire est relue et réinventée. En transmettant aux générations suivantes des récits, des pratiques culinaires ou des commémorations, la communauté assure une continuité identitaire, mais une continuité forgée dans l'ailleurs et l'adaptation. Le Canada, société officiellement multiculturelle, encadre cette dynamique en reconnaissant des fêtes et des lieux de mémoire, mais cette institutionnalisation n'est pas sans risque : en essentialisant les « héritages », elle peut figer des identités qui, en réalité, se recomposent en permanence au contact d'autres mémoires. C'est dans cet entre-deux, entre préservation et réinvention, que se négocie une identité diasporique que l'on ne saurait réduire ni à une survivance ni à une simple acculturation.",
    modelAnswerAnalysis: [
      "Analyse conceptuelle nuancée, tissée d'antithèses (continuité/réinvention, préservation/figement).",
      "Ressort critique sur la politique multiculturelle canadienne, attendu au niveau C2.",
      "Lecture de haut niveau de la notion d'identité, conclusive et dialectique.",
    ],
    evaluationCriteria: standardCriteria,
    vocabularyNotes: [
      "la mémoire collective",
      "l'essentialisation",
      "la recomposition",
      "l'acculturation",
    ],
  },
  {
    id: "ee-c2-3",
    taskNumber: 3,
    level: "C2",
    title: "Tâche 3 — Point de vue argumenté",
    type: "essai",
    situation: "L'Académie canadienne a lancé un débat sur le rôle politique du savoir scientifique.",
    prompt:
      "La contestation publique de l'autorité scientifique s'est généralisée. Dans un texte argumenté (120 à 150 mots), exposez votre position sur le rôle que doit jouer la science dans la décision publique et sur la manière de restaurer sa crédibilité.",
    minWords: 120,
    maxWords: 150,
    timeLimitMinutes: 20,
    modelAnswer:
      "La science ne saurait fonder seule la décision politique, mais elle ne saurait non plus en être exclue ; c'est à cette articulation que se joue sa crédibilité retrouvée. D'un côté, l'instrumentalisation de l'expertise à des fins partisanes a érigé la défiance en méthode, et la multiplication d'avis contradictoires présentés comme équivalents a brouillé la frontière entre fait et opinion. De l'autre, exiger de la science une certitude qu'elle ne peut offrir condamne toute politique fondée sur le doute méthodique. Restaurer la confiance suppose donc moins de communication que de honnêteté épistémique : exposer explicitement les incertitudes, séparer nettement les faits établis des hypothèses, et garantir l'indépendance des organismes d'évaluation. La science ne légitime pas la décision, elle l'éclaire ; en acceptant cette distinction, on réinstaurera un débat public où le savoir redevient un bien commun plutôt qu'un argument d'autorité.",
    modelAnswerAnalysis: [
      "Position dialectique affirmée dès la première phrase (ni fondement seul, ni exclusion).",
      "Analyse des causes de la défiance et non simple constat (instrumentalisation, équivalence fabriquée).",
      "Proposition originale (« honnêteté épistémique ») et distinction conclusive féconde (éclairer/légitimer).",
    ],
    evaluationCriteria: standardCriteria,
    vocabularyNotes: [
      "le doute méthodique",
      "l'honnêteté épistémique",
      "l'instrumentalisation",
      "un bien commun",
    ],
  },

  // ============================ VARIANTES THÉMATIQUES ============================
  // Déclinaisons supplémentaires des 3 tâches : lettres formelles et informelles,
  // comptes-rendus, récits, articles et essais sur les grands sujets des
  // vocabulaires thématiques (environnement, éducation, travail, santé, numérique).

  {
    id: "ee-v1",
    taskNumber: 1,
    level: "B1",
    title: "Tâche 1 — Lettre informelle (informer)",
    type: "message",
    situation: "Vous venez d'emménager à Toronto et vous écrivez à une amie restée à l'étranger.",
    prompt:
      "Vous venez d'emménager à Toronto et vous écrivez une lettre informelle (40 à 60 mots) à votre amie Leïla pour lui annoncer votre nouvelle vie : le quartier, votre appartement, et lui proposer de venir vous voir.",
    minWords: 40,
    maxWords: 60,
    timeLimitMinutes: 10,
    modelAnswer:
      "Chère Leïla, je suis enfin installée à Toronto ! Mon appartement donne sur un petit parc, le quartier est vivant et les gens très accueillants. Mon travail commence lundi, je suis impatiente et un peu stressée. Tu devrais venir me rejoindre un week-end, il y a des concerts gratuits en été. Je pense fort à toi, gros bisous, Amina",
    modelAnswerAnalysis: [
      "Registre familier adapté à une amie : tutoiement, formules affectives (« gros bisous »).",
      "Répéritoire des nouveautés (logement, quartier, travail) conforme à la consigne.",
      "Proposition de visite qui rend la question implicite de la consigne explicite.",
    ],
    evaluationCriteria: standardCriteria,
    vocabularyNotes: ["emménager", "donner sur", "tutoiement", "je pense fort à toi"],
  },
  {
    id: "ee-v2",
    taskNumber: 1,
    level: "B2",
    title: "Tâche 1 — Lettre de motivation",
    type: "message",
    situation: "Vous candidatez à un stage dans une entreprise et vous joignez une lettre de motivation.",
    prompt:
      "Vous postulez pour un stage de trois mois dans une entreprise de votre secteur. Écrivez une lettre de motivation (40 à 60 mots) : présentez-vous brièvement, expliquez pourquoi vous êtes intéressé(e) par cette entreprise et ce que vous pouvez apporter.",
    minWords: 40,
    maxWords: 60,
    timeLimitMinutes: 10,
    modelAnswer:
      "Madame, Monsieur, titulaire d'un diplôme en gestion et fort d'une première expérience en service client, je souhaite mettre mes compétences au service de votre entreprise lors d'un stage de trois mois. Votre rayonnement régional et vos pratiques innovantes m'ont particulièrement attiré. Motivé et autonome, je saurai m'intégrer rapidement à votre équipe. Je reste disponible pour un entretien. Cordialement, Samuel Nkosi",
    modelAnswerAnalysis: [
      "Éléments du message maîtrisés : parcours, motivation liée à l'entreprise, valeur ajoutée, disponibilité.",
      "Ton formel immédiatement identifiable (Madame, Monsieur, Cordialement).",
      "Concis et percutant, conforme à l'exigence des 60 mots.",
    ],
    evaluationCriteria: standardCriteria,
    vocabularyNotes: ["titulaire d'un diplôme", "fort de", "rayonnement", "autonome"],
  },
  {
    id: "ee-v3",
    taskNumber: 2,
    level: "B1",
    title: "Tâche 2 — Compte-rendu d'un article",
    type: "article",
    situation: "Un journal paroissial vous demande un compte-rendu de l'article « Reconnaissance des diplômes étrangers ».",
    prompt:
      "Vous lisez dans un journal l'article « Les diplômes étrangers, un parcours du combattant au Canada ». Rédigez un compte-rendu (120 à 150 mots) : les informations principales, le point de vue de l'auteur et votre réaction.",
    minWords: 120,
    maxWords: 150,
    timeLimitMinutes: 15,
    modelAnswer:
      "L'article que je viens de lire présente un constat qui ne m'a pas surpris : la reconnaissance des diplômes obtenus à l'étranger reste un parcours du combattant pour bien des immigrants au Canada. L'auteur décrit des démarches longues, des frais élevés et, souvent, l'obligation de recommencer une partie de la formation, même pour des professions réglementées comme l'ingénierie ou l'enseignement. Il pointe aussi un paradoxe : ces mêmes secteurs manquent de travailleurs qualifiés. L'auteur estime qu'une harmonisation des critères entre les provinces et des programmes de mise à niveau encadrés offriraient une issue plus équitable. Pour ma part, je trouve cette analyse juste et je partage l'importance accordée aux programmes d'accompagnement : sans guide, le labyrinthe administratif décourage même les profils les plus solides.",
    modelAnswerAnalysis: [
      "Compte-rendu fidèle : informations principales, point de vue de l'auteur, réaction personnelle.",
      "Discours indirect bien maîtrisé (« l'auteur décrit... estime... »).",
      "Registre argumentatif équilibré, avec une prise de position finale claire.",
    ],
    evaluationCriteria: standardCriteria,
    vocabularyNotes: ["parcours du combattant", "démarches", "mise à niveau", "équitable"],
  },
  {
    id: "ee-v4",
    taskNumber: 2,
    level: "B2",
    title: "Tâche 2 — Article de blog (santé)",
    type: "article",
    situation: "Un blogue santé publie une série sur les habitudes de vie au Canada.",
    prompt:
      "Un blogue santé vous demande un article (120 à 150 mots) sur l'importance de l'activité physique au quotidien : ses bienfaits et des conseils concrets pour les intégrer malgré un emploi du temps chargé.",
    minWords: 120,
    maxWords: 150,
    timeLimitMinutes: 15,
    modelAnswer:
      "L'activité physique n'est pas un luxe réservé à ceux qui ont le temps : c'est une décision d'organisation. Les bienfaits sont maintenant bien documentés : meilleur sommeil, régulation du stress, prévention des maladies cardiovasculaires et gain de concentration qui profite directement au travail. Le piège, c'est de croire qu'il faut des heures en salle de sport. Or la marche rapide pendant la pause du midi, les escaliers plutôt que l'ascenseur ou vingt minutes de vélo pour se rendre au bureau suffisent déjà à transformer un quotidien sédentaire. Quelques conseils simples : bloquer des créneaux dans son agenda comme on le ferait pour une réunion, commencer par objectifs modestes et surtout choisir une activité que l'on aime, faute de quoi la bonne résolution s'éteint en quelques semaines. Bouger chaque jour, même un peu, reste ce qu'il y a de plus rentable pour sa santé.",
    modelAnswerAnalysis: [
      "Article convaincant : thèse claire (c'est une question d'organisation), arguments, conseils concrets.",
      "Structure mobilisante : constat, démonstration chiffrée, solutions, appel à l'action.",
      "Registre direct et accessible, proche d'un blogue grand public.",
    ],
    evaluationCriteria: standardCriteria,
    vocabularyNotes: ["sédentaire", "créneaux", "bloquer", "rentable"],
  },
  {
    id: "ee-v5",
    taskNumber: 2,
    level: "B2",
    title: "Tâche 2 — Récit d'expérience",
    type: "article",
    situation: "Un magazine pour immigrants raconte les premières expériences professionnelles au Canada.",
    prompt:
      "Un magazine pour nouveaux arrivants vous demande un article (120 à 150 mots) racontant votre première expérience professionnelle au Canada : le poste, les premières impressions, ce qui vous a étonné(e) et ce que cette expérience vous a appris.",
    minWords: 120,
    maxWords: 150,
    timeLimitMinutes: 15,
    modelAnswer:
      "Ma première expérience professionnelle au Canada fut un mélange de fierté et de vertige. Embauche comme adjoint administratif dans une firme de Montréal, je découvrais un univers où le « hum, va falloir regarder ça » remplaçait les directives que j'avais connues ailleurs. De ce décalage, j'ai appris l'essentiel : ici, on attend que chacun prenne des initiatives, et la question préférée de mes collègues, « qu'en pensez-vous ? », m'a d'abord déstabilisé avant de devenir un moteur. Les premières semaines ont été éprouvantes : codes implicites, humour de bureau, logistique des réunions. Mais à la fin du troisième mois, c'est devenu une évidence : cette culture de la consultation me rendait plus compétent, pas moins. Cette expérience m'a aussi appris la valeur des premiers réseaux professionnels : un collègue m'a confié des outils de formation qui m'ont ouvert ensuite d'autres portes. En définitive, ce premier emploi m'a moins appris un métier qu'une manière de travailler.",
    modelAnswerAnalysis: [
      "Récit vivant avec une progression : découverte, choc initial, apprentissage, bilan.",
      "Choix narratifs efficaces : citations et anecdotes donnent réel aux impressions générales.",
      "Fin conclusive qui tire une leçon (une manière de travailler) plutôt qu'un simple résumé.",
    ],
    evaluationCriteria: standardCriteria,
    vocabularyNotes: ["embauche", "codes implicites", "prendre des initiatives", "réseaux professionnels"],
  },
  {
    id: "ee-v6",
    taskNumber: 3,
    level: "B1",
    title: "Tâche 3 — Point de vue (environnement)",
    type: "essai",
    situation: "Un centre écocitoyen demande l'avis des habitants sur la gestion des déchets.",
    prompt:
      "Dans le cadre d'une consultation locale, donnez votre point de vue (120 à 150 mots) : « Le tri des déchets suffit-il à résoudre le problème des déchets ? » Justifiez par des arguments et des exemples.",
    minWords: 120,
    maxWords: 150,
    timeLimitMinutes: 20,
    modelAnswer:
      "Je ne crois pas que le tri des déchets suffise, même s'il reste indispensable. D'abord, le tri ne fabrique pas de solution pour les déchets non recyclables : plastiques complexes, textiles usagés ou résidus alimentaires partent encore majoritairement à l'enfouissement ou à l'incinération. Ensuite, le tri crée parfois une illusion : on se libère la conscience en plaçant la bouteille dans le bon bac, sans s'interroger sur ce que l'on achète. Or le problème commence au moment de la production : réduire les emballages à la source, encourager le vrac et les produits réparables diminuerait le volume de déchets bien plus efficacement que tous les bacs de tri réunis. Cela dit, je ne minimise pas le geste du tri : il a une valeur pédagogique et il alimente des filières de recyclage réelles. Je pense simplement qu'il doit être complété par une logique de sobriété et par une responsabilisation des producteurs.",
    modelAnswerAnalysis: [
      "Thèse claire et nuancée : indispensable mais insuffisant, avec limitation des limites du tri.",
      "Deux arguments développés (non-recyclables, illusion morale) et une solution structurelle.",
      "Nuanciation finale (« cela dit... je ne minimise pas ») qui renforce la crédibilité.",
    ],
    evaluationCriteria: standardCriteria,
    vocabularyNotes: ["enfouissement", "illusion", "vrac", "sobriété"],
  },
  {
    id: "ee-v7",
    taskNumber: 3,
    level: "B2",
    title: "Tâche 3 — Point de vue (numérique)",
    type: "essai",
    situation: "Un débat public national reflète l'inquiétude des parents sur l'usage des réseaux sociaux par les adolescents.",
    prompt:
      "Un débat public oppose les partisans d'une interdiction des réseaux sociaux avant 16 ans à ceux qui préfèrent l'éducation à l'usage. Développez votre point de vue (120 à 150 mots) de manière argumentée.",
    minWords: 120,
    maxWords: 150,
    timeLimitMinutes: 20,
    modelAnswer:
      "J'estime que l'interdiction brute des réseaux sociaux avant 16 ans, séduisante en apparence, est à la fois impraticable et contre-productive. Impraticable, car une interdiction nationale reste contournée par la simple modification d'âge déclarée, ainsi que le montrent les expériences étrangères. Contre-productive, car elle évacue la vraie question : celle de l'apprentissage du discernement numérique. Un adolescent laissé seul, sans cadre, derrière un écran, apprendra coûte que coûte les usages qu'on lui aura refusés — mais sans médiation. L'éducation critique, elle, apprend à repérer la désinformation, à protéger ses données et à réguler son temps d'écran. Certes, les plateformes doivent aussi être régulées davantage, et les parents accompagnés. Mais la solution réside dans un tiers-lieu entre la fessée normative et le laissez-faire : un cadre parental éclairé, des initiatives scolaires d'éducation aux médias et des obligations renforcées pour les plateformes. C'est ce triptyque qu'il faut construire.",
    modelAnswerAnalysis: [
      "Thèse dialectique affirmée et soutenue par deux objections fondées (contournement, absence de médiation).",
      "Recul critique sur la position adverse et proposition d'encadrement en trois volets.",
      "Registre soutenu avec un vocabulaire du débat social précis (discernement, médiation).",
    ],
    evaluationCriteria: standardCriteria,
    vocabularyNotes: ["contournée", "discernement", "médiation", "triptyque"],
  },
  {
    id: "ee-v8",
    taskNumber: 3,
    level: "C1",
    title: "Tâche 3 — Point de vue (économie du travail)",
    type: "essai",
    situation: "Un cercle de réflexion canadien interroge des écrivains sur la semaine de quatre jours.",
    prompt:
      "Le télétravail a bouleversé l'organisation du travail ; la semaine de quatre jours est désormais débattue. Dans un essai (120 à 150 mots), exposez et défendez votre position sur cette réforme de l'organisation du travail.",
    minWords: 120,
    maxWords: 150,
    timeLimitMinutes: 20,
    modelAnswer:
      "La semaine de quatre jours ne doit pas être confondue avec un aménagement du temps de repos : c'est une épreuve de vérité pour l'entreprise contemporaine. Réduire le temps présent sans réduire le temps travaillé contraint à reconsidérer les réunions superflues, à responsabiliser les équipes sur des objectifs de résultat et à assumer une mesure réellement exigeante de la production. Les entreprises pionnières observent une hausse de la satisfaction et, surtout, une qualité de réponse qui justifie l'expérience. Les craintes légitimes — continuité de service, inégalités entre secteurs — appellent des réponses sectorielles plutôt qu'un rejet du principe. Mais ce serait trahir l'ambition que de s'arrêter aux statistiques d'heures : la question profonde est celle de la valeur que nous accordons au temps de travail. La semaine de quatre jours révélera que la productivité est un art de l'organisation, non une métrique de la présence.",
    modelAnswerAnalysis: [
      "Thèse conceptuelle : la réforme comme « épreuve de vérité », au-delà de l'argument des heures.",
      "Anticipation et réponse aux objections (continuité, inégalités sectorielles).",
      "Conclusion philosophique qui élève le débat pratique en question de valeur.",
    ],
    evaluationCriteria: standardCriteria,
    vocabularyNotes: ["aménagement", "superflu", "objectifs de résultat", "métrique"],
  },
];

export function getWritingTasksForLevel(level: WritingTask["level"]): WritingTask[] {
  return writingTasks.filter((t) => t.level === level);
}