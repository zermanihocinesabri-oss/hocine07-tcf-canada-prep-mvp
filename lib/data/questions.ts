import { QcmQuestion } from "@/lib/types";
import {
  comprehensionEcriteC2Questions,
  comprehensionOraleC2Questions,
} from "./questionsC2";

/**
 * Banque d'exercices — Compréhension Orale (CO) et Compréhension Écrite (CE).
 * Questions classées par niveau CECRL (A1 à C2), inspirées des formats officiels
 * du TCF Canada (items 1 à 39 pour chaque épreuve).
 *
 * Pour la CO, les fichiers audio réels sont simulés par un « audioPrompt » (mise
 * en situation) et une retranscription complète (« transcript ») révélée après
 * réponse, ce qui permet d'exploiter l'exercice sans fichier MP3.
 */

export const comprehensionOraleQuestions: QcmQuestion[] = [
  // ============================ NIVEAU A1 ============================
  {
    id: "co-a1-1",
    skill: "CO",
    level: "A1",
    theme: "Aéroport",
    sequence: "Item 1",
    audioPrompt: "Un message diffusé dans un aéroport annonce un vol.",
    transcript:
      "« Votre attention s'il vous plaît. Le vol AC 42 à destination de Toronto va commencer à embarquer à la porte numéro 12. Merci de vous présenter à l'embarquement. »",
    question: "Que doivent faire les passagers du vol AC 42 ?",
    options: [
      { id: "a", text: "Aller à la porte numéro 12." },
      { id: "b", text: "Attendre à la boutique de l'aéroport." },
      { id: "c", text: "Récupérer leurs bagages." },
      { id: "d", text: "Prendre un taxi." },
    ],
    correctOptionId: "a",
    explanation:
      "L'annonce invite clairement les passagers à se présenter à l'embarquement à la porte numéro 12. C'est la seule information d'action donnée.",
    vocabularyNotes: ["embarquer", "porte", "destination", "vol"],
    difficulty: "facile",
  },
  {
    id: "co-a1-2",
    skill: "CO",
    level: "A1",
    theme: "Commerce",
    sequence: "Item 2",
    audioPrompt: "Un client demande le prix d'un article dans un magasin.",
    transcript:
      "— Excusez-moi, combien coûte ce pain aux raisins ? — Trois dollars quarante. — Et le pain complet ? — Quatre dollars. Vous prenez quelque chose ? — Oui, je prends le pain complet.",
    question: "Quel article le client décide-t-il d'acheter ?",
    options: [
      { id: "a", text: "Le pain aux raisins." },
      { id: "b", text: "Le pain complet." },
      { id: "c", text: "Les deux pains." },
      { id: "d", text: "Aucun pain." },
    ],
    correctOptionId: "b",
    explanation:
      "Le client demande le prix du pain aux raisins puis du pain complet, et répond finalement « je prends le pain complet ». L'achat concerne donc uniquement le pain complet.",
    vocabularyNotes: ["combien coûte", "je prends", "le pain"],
    difficulty: "facile",
  },
  {
    id: "co-a1-3",
    skill: "CO",
    level: "A1",
    theme: "Vie quotidienne",
    sequence: "Item 3",
    audioPrompt: "Deux personnes se fixent un rendez-vous.",
    transcript:
      "— On se voit samedi ? — Samedi, je ne peux pas, je travaille. — Et dimanche matin ? — Dimanche matin, c'est parfait. À quelle heure ? — À dix heures, au café du centre-ville.",
    question: "Quand les deux personnes se retrouvent-elles ?",
    options: [
      { id: "a", text: "Samedi soir." },
      { id: "b", text: "Dimanche matin à dix heures." },
      { id: "c", text: "Dimanche soir." },
      { id: "d", text: "Samedi matin." },
    ],
    correctOptionId: "b",
    explanation:
      "Après avoir écarté samedi, ils conviennent de « dimanche matin à dix heures » au café du centre-ville. La réponse correcte reprend cette information précise.",
    vocabularyNotes: ["rendez-vous", "centre-ville", "heure"],
    difficulty: "facile",
  },

  // ============================ NIVEAU A2 ============================
  {
    id: "co-a2-1",
    skill: "CO",
    level: "A2",
    theme: "Transports",
    sequence: "Item 4",
    audioPrompt: "Une annonce dans une gare donne des informations sur un train en retard.",
    transcript:
      "« Le train en direction de Québec, prévu à quinze heures trente, partira avec un retard d'environ vingt minutes. Il partira de la voie numéro 5. La direction de la gare vous présente ses excuses. »",
    question: "Quelle est la situation du train pour Québec ?",
    options: [
      { id: "a", text: "Il est annulé." },
      { id: "b", text: "Il part de la voie 5 avec vingt minutes de retard." },
      { id: "c", text: "Il part à l'heure de la voie 3." },
      { id: "d", text: "Il partira demain matin." },
    ],
    correctOptionId: "b",
    explanation:
      "L'annonce indique que le train de 15h30 pour Québec partira avec environ vingt minutes de retard, depuis la voie numéro 5. Les autres propositions sont contredites par le message.",
    vocabularyNotes: ["retard", "voie", "en direction de", "excuses"],
    difficulty: "moyen",
  },
  {
    id: "co-a2-2",
    skill: "CO",
    level: "A2",
    theme: "Santé",
    sequence: "Item 5",
    audioPrompt: "Un message sur un répondeur d'un cabinet médical.",
    transcript:
      "« La clinique Santé Plus est fermée pour les deux prochains jours. En cas d'urgence, contactez le numéro 911 ou rendez-vous à l'hôpital Saint-Joseph. Pour prendre rendez-vous, rappelez lundi à partir de neuf heures. »",
    question: "Que propose le message en cas d'urgence ?",
    options: [
      { id: "a", text: "Appeler le 911 ou aller à l'hôpital Saint-Joseph." },
      { id: "b", text: "Attendre lundi pour être soigné." },
      { id: "c", text: "Écrire un courriel à la clinique." },
      { id: "d", text: "Se rendre à la pharmacie la plus proche." },
    ],
    correctOptionId: "a",
    explanation:
      "Le message précise : « en cas d'urgence, contactez le 911 ou rendez-vous à l'hôpital Saint-Joseph ». La bonne réponse reprend exactement ces deux possibilités.",
    vocabularyNotes: ["urgence", "répondeur", "rendez-vous", "cabinet"],
    difficulty: "moyen",
  },
  {
    id: "co-a2-3",
    skill: "CO",
    level: "A2",
    theme: "Travail",
    sequence: "Item 6",
    audioPrompt: "Un collègue explique une nouvelle organisation de la semaine.",
    transcript:
      "À partir de lundi prochain, la réunion d'équipe aura lieu le mardi matin au lieu du jeudi. Pensez à envoyer vos rapports d'activité avant la réunion. Merci de confirmer votre présence par courriel.",
    question: "Qu'est-ce qui change à partir de lundi ?",
    options: [
      { id: "a", text: "La réunion d'équipe passe du jeudi au mardi matin." },
      { id: "b", text: "La réunion est supprimée." },
      { id: "c", text: "Les rapports ne doivent plus être envoyés." },
      { id: "d", text: "L'équipe change de bâtiment." },
    ],
    correctOptionId: "a",
    explanation:
      "L'orateur annonce que la réunion d'équipe « aura lieu le mardi matin au lieu du jeudi ». C'est le seul changement mentionné.",
    vocabularyNotes: ["réunion d'équipe", "rapport d'activité", "confirmer sa présence"],
    difficulty: "moyen",
  },

  // ============================ NIVEAU B1 ============================
  {
    id: "co-b1-1",
    skill: "CO",
    level: "B1",
    theme: "Météo",
    sequence: "Item 7",
    audioPrompt: "Un bulletin météo radiophonique régional.",
    transcript:
      "Du côté de la météo, la dépression qui traverse la province depuis hier va s'éloigner progressivement. Attention toutefois : des orages isolés sont prévus en fin d'après-midi dans le secteur de la capitale. Le reste de la semaine sera sec et légèrement plus frais, avec des températures autour de dix-huit degrés.",
    question: "Quelle prévision concerne le secteur de la capitale ?",
    options: [
      { id: "a", text: "De la neige abondante." },
      { id: "b", text: "Des orages isolés en fin d'après-midi." },
      { id: "c", text: "Une canicule durable." },
      { id: "d", text: "Des vents violents toute la journée." },
    ],
    correctOptionId: "b",
    explanation:
      "Le bulletin précise que « des orages isolés sont prévus en fin d'après-midi dans le secteur de la capitale ». Les autres propositions ne correspondent à aucune information du bulletin.",
    vocabularyNotes: ["dépression", "orages isolés", "prévisions", "secteur"],
    difficulty: "moyen",
  },
  {
    id: "co-b1-2",
    skill: "CO",
    level: "B1",
    theme: "Éducation",
    sequence: "Item 8",
    audioPrompt: "Une session d'information pour de futurs étudiants.",
    transcript:
      "Bienvenue à cette séance d'information. Sachez que les demandes d'admission doivent être déposées avant le 1er février pour la rentrée de septembre. Dans les très prochaines semaines, vous recevrez un courriel confirmant la réception de votre dossier. Le logement universitaire, lui, se réserve en ligne dès le mois de mars.",
    question: "Quelle est la date limite pour déposer une demande d'admission ?",
    options: [
      { id: "a", text: "Le 1er mars." },
      { id: "b", text: "Le 1er septembre." },
      { id: "c", text: "Le 1er février." },
      { id: "d", text: "Le 1er décembre." },
    ],
    correctOptionId: "c",
    explanation:
      "L'intervenante indique explicitement que les demandes d'admission « doivent être déposées avant le 1er février pour la rentrée de septembre ». Le mois de mars concerne la réservation du logement.",
    vocabularyNotes: ["admission", "déposer un dossier", "rentrée", "logement universitaire"],
    difficulty: "difficile",
  },
  {
    id: "co-b1-3",
    skill: "CO",
    level: "B1",
    theme: "Vie quotidienne",
    sequence: "Item 9",
    audioPrompt: "Un client se plaint d'une livraison auprès d'un service client.",
    transcript:
      "— Bonjour, j'ai commandé une table en ligne il y a dix jours, mais je n'ai toujours rien reçu. Le suivi indique « livrée » alors que je n'ai rien reçu. — Je vous prie de m'excuser. Pouvez-vous me donner votre numéro de commande ? Je vais vérifier auprès du transporteur et je vous tiens au courant sous 48 heures.",
    question: "Que propose le conseiller au client ?",
    options: [
      { id: "a", text: "Renvoyer immédiatement un nouvel article." },
      { id: "b", text: "Vérifier auprès du transporteur et le tenir informé sous 48 heures." },
      { id: "c", text: "Rembourser la commande sans vérification." },
      { id: "d", text: "Demander au client de venir chercher la table." },
    ],
    correctOptionId: "b",
    explanation:
      "Le conseiller s'excuse, demande le numéro de commande et promet de « vérifier auprès du transporteur » puis de « tenir au courant sous 48 heures ». Il ne propose ni renvoi immédiat, ni remboursement.",
    vocabularyNotes: ["suivi de commande", "transporteur", "tenir au courant", "livraison"],
    difficulty: "moyen",
  },

  // ============================ NIVEAU B2 ============================
  {
    id: "co-b2-1",
    skill: "CO",
    level: "B2",
    theme: "Actualité",
    sequence: "Item 10",
    audioPrompt: "Un journaliste présente un reportage sur les transports en commun.",
    transcript:
      "Après un an de travaux, la ligne de tramway du centre-ville à l'aéroport sera mise en service au printemps. Selon la ville, ce projet, financé en partie par le gouvernement fédéral, permettra de réduire d'un tiers les déplacements en voiture dans le secteur. Les associations de riverains se disent toutefois préoccupées par le niveau de bruit à proximité des habitations.",
    question: "Quelle inquiétude est mentionnée dans le reportage ?",
    options: [
      { id: "a", text: "Le coût du projet pour les contribuables." },
      { id: "b", text: "Le niveau de bruit près des habitations." },
      { id: "c", text: "Le retard du chantier." },
      { id: "d", text: "Le manque de places de stationnement." },
    ],
    correctOptionId: "b",
    explanation:
      "Le reportage précise que « les associations de riverains se disent préoccupées par le niveau de bruit à proximité des habitations ». C'est la seule inquiétude explicitement citée.",
    vocabularyNotes: ["mise en service", "riverains", "travaux", "déplacements"],
    difficulty: "difficile",
  },
  {
    id: "co-b2-2",
    skill: "CO",
    level: "B2",
    theme: "Travail",
    sequence: "Item 11",
    audioPrompt: "Un entretien d'embauche où la candidate présente son parcours.",
    transcript:
      "Après un master en gestion des ressources humaines à l'Université de Montréal, j'ai travaillé trois ans dans un cabinet de conseil. J'y ai notamment piloté la mise en place du télétravail pour une centaine de collaborateurs. C'est cette expérience de conduite d'un changement organisationnel qui m'a donné envie d'évoluer vers un poste de responsable RH dans une entreprise de cette taille.",
    question: "Quel est l'argument principal de la candidate pour ce poste ?",
    options: [
      { id: "a", text: "Son expérience de conduite d'un changement organisationnel." },
      { id: "b", text: "Sa connaissance de plusieurs langues étrangères." },
      { id: "c", text: "Son réseau dans le conseil." },
      { id: "d", text: "Sa maîtrise des outils de paie." },
    ],
    correctOptionId: "a",
    explanation:
      "La candidate affirme que « c'est cette expérience de conduite d'un changement organisationnel qui m'a donné envie d'évoluer ». Elle met ainsi en avant une expérience précise, et non des compétences techniques générales.",
    vocabularyNotes: ["piloté", "mise en place", "collaborateurs", "évoluer"],
    difficulty: "difficile",
  },
  {
    id: "co-b2-3",
    skill: "CO",
    level: "B2",
    theme: "Médias",
    sequence: "Item 12",
    audioPrompt: "Le débat d'une émission de radio sur les réseaux sociaux.",
    transcript:
      "L'invité soutient que les réseaux sociaux, souvent accusés de fragmenter le débat public, jouent en réalité un rôle de vigie : ils permettent de faire remonter des sujets que les médias traditionnels ignorent. La journaliste lui oppose que la rapidité de diffusion y favorise la circulation de fausses informations, sans véritable temps de vérification.",
    question: "Quel reproche la journaliste adresse-t-elle aux réseaux sociaux ?",
    options: [
      { id: "a", text: "Ils diffusent des fausses informations sans vérification." },
      { id: "b", text: "Ils sont réservés à une élite." },
      { id: "c", text: "Ils coûtent trop cher aux utilisateurs." },
      { id: "d", text: "Ils remplacent les médias traditionnels." },
    ],
    correctOptionId: "a",
    explanation:
      "La journaliste « lui oppose que la rapidité de diffusion y favorise la circulation de fausses informations, sans véritable temps de vérification ». C'est précisément ce reproche que la bonne réponse reformule.",
    vocabularyNotes: ["fragmenter", "vigie", "fausses informations", "diffusion"],
    difficulty: "difficile",
  },

  // ============================ NIVEAU C1 ============================
  {
    id: "co-c1-1",
    skill: "CO",
    level: "C1",
    theme: "Économie",
    sequence: "Item 13",
    audioPrompt: "Une chronique économique sur la pénurie de main-d'œuvre.",
    transcript:
      "La pénurie de main-d'œuvre que connaît le Québec depuis 2021 ne doit pas être lue comme un simple effet démographique. C'est aussi le résultat d'une inadéquation entre les formations proposées et les besoins réels des entreprises. La solution ne réside donc pas uniquement dans un recours accru à l'immigration : elle passe par une refonte des programmes professionnels et par des politiques de rétention des travailleurs expérimentés.",
    question: "Selon la chronique, quelle est la cause principale de la pénurie ?",
    options: [
      { id: "a", text: "Un problème de formation inadaptée aux besoins des entreprises." },
      { id: "b", text: "Une baisse générale des salaires dans la province." },
      { id: "c", text: "Le manque de candidats étrangers." },
      { id: "d", text: "La fermeture de nombreuses entreprises." },
    ],
    correctOptionId: "a",
    explanation:
      "La chronique explique que la pénurie est « aussi le résultat d'une inadéquation entre les formations proposées et les besoins réels des entreprises », et précise que la solution ne passe pas uniquement par l'immigration. La cause organisationnelle (formation inadaptée) est centrale.",
    vocabularyNotes: ["pénurie", "inadéquation", "rétention", "refonte"],
    difficulty: "difficile",
  },
  {
    id: "co-c1-2",
    skill: "CO",
    level: "C1",
    theme: "Sciences",
    sequence: "Item 14",
    audioPrompt: "Un extrait d'une émission scientifique sur les batteries.",
    transcript:
      "Le principal frein à l'adoption massive du véhicule électrique ne tient pas à la capacité des batteries, aujourd'hui satisfaisante pour un usage urbain, mais à la question du recyclage. Les technologies de récupération des métaux rares restent coûteuses et énergivores. Or, sans filière de recyclage rentable, l'empreinte environnementale du véhicule électrique risque de décevoir les exigences des réglementations à venir.",
    question: "Quel est le principal frein évoqué à l'adoption du véhicule électrique ?",
    options: [
      { id: "a", text: "L'autonomie insuffisante des batteries." },
      { id: "b", text: "Le coût et la difficulté du recyclage des métaux rares." },
      { id: "c", text: "Le prix élevé de l'électricité." },
      { id: "d", text: "Le manque de bornes de recharge." },
    ],
    correctOptionId: "b",
    explanation:
      "L'orateur écarte la capacité des batteries (« aujourd'hui satisfaisante ») et insiste sur « la question du recyclage », dont les technologies « restent coûteuses et énergivores ». C'est le frein central de l'extrait.",
    vocabularyNotes: ["frein", "recyclage", "métaux rares", "empreinte environnementale"],
    difficulty: "difficile",
  },
  {
    id: "co-c1-3",
    skill: "CO",
    level: "C1",
    theme: "Société",
    sequence: "Item 15",
    audioPrompt: "Un documentaire radiophonique sur les habitudes de lecture.",
    transcript:
      "Contrairement à une idée reçue, le numérique n'a pas tué la lecture de fond. Les statistiques montrent plutôt une polarisation : une partie de la population lit davantage, mais de manière fragmentée et discontinue, tandis qu'une autre partie maintient des pratiques de lecture longue. Le véritable enjeu n'est donc pas la quantité de textes consultés, mais la capacité des lecteurs à construire un raisonnement suivi à partir de sources diverses et contradictoires.",
    question: "Quelle affirmation correspond au point de vue de l'auteur ?",
    options: [
      { id: "a", text: "La lecture de fond a disparu au profit du numérique." },
      { id: "b", text: "Le numérique a créé une lecture plus fragmentée mais pas moins répandue." },
      { id: "c", text: "Tous les lecteurs lisent désormais les mêmes sources." },
      { id: "d", text: "La lecture longue ne concerne plus personne." },
    ],
    correctOptionId: "b",
    explanation:
      "L'auteur décrit une « polarisation » : les lectures sont plus fragmentées, mais pas moins nombreuses. Il souligne surtout l'enjeu du raisonnement construit à partir de sources contradictoires. La bonne réponse résume cette idée centrale.",
    vocabularyNotes: ["polarisation", "fragmenté", "idée reçue", "raisonnement suivi"],
    difficulty: "difficile",
  },

  // ============================ NIVEAU C2 ============================
  {
    id: "co-c2-1",
    skill: "CO",
    level: "C2",
    theme: "Politique",
    sequence: "Item 16",
    audioPrompt: "Un commentaire de politique étrangère, ton analytique.",
    transcript:
      "La notion même de souveraineté, dans un monde où les chaînes de production sont mondiales et où les données circulent sans frontières, mérite d'être repensée. La souveraineté ne se manifeste plus par la capacité à se protéger, mais par la capacité à peser sur les normes qui régissent la circulation des biens et des informations. C'est un renversement fondamental : la puissance n'est plus défensive, elle est normative.",
    question: "Quelle idée résume le mieux le commentaire ?",
    options: [
      { id: "a", text: "La souveraineté devient la capacité à influencer les normes mondiales." },
      { id: "b", text: "La souveraineté reste fondée sur la protection des frontières." },
      { id: "c", text: "Les États ont perdu tout pouvoir face aux multinationales." },
      { id: "d", text: "La mondialisation a supprimé la notion de puissance." },
    ],
    correctOptionId: "a",
    explanation:
      "L'auteur opère un « renversement fondamental » : la puissance « n'est plus défensive, elle est normative », c'est-à-dire qu'elle se mesure par l'influence sur les règles qui encadrent la circulation mondiale. La bonne réponse rend compte de cette thèse nuancée.",
    vocabularyNotes: ["souveraineté", "normes", "circulation", "normatif"],
    difficulty: "difficile",
  },
  {
    id: "co-c2-2",
    skill: "CO",
    level: "C2",
    theme: "Recherche",
    sequence: "Item 17",
    audioPrompt: "Une allocution universitaire sur l'éthique de la recherche.",
    transcript:
      "Ce que la recherche doit aux citoyens, ce n'est pas seulement des résultats, c'est une exigence de redevabilité : expliquer comment les choix scientifiques sont faits, qui les fait, et avec quelles hypothèses. À terme, la confiance ne se restaurera pas par plus de communication, mais par une transparence radicale sur l'incertitude elle-même, c'est-à-dire sur ce que l'on sait ne pas savoir.",
    question: "Que propose l'orateur pour restaurer la confiance dans la recherche ?",
    options: [
      { id: "a", text: "Multiplier les campagnes de communication vers le public." },
      { id: "b", text: "Une transparence radicale, y compris sur les incertitudes." },
      { id: "c", text: "Faire approuver tous les projets par référendum." },
      { id: "d", text: "Réduire le nombre de publications scientifiques." },
    ],
    correctOptionId: "b",
    explanation:
      "L'orateur est explicite : la confiance « ne se restaurera pas par plus de communication, mais par une transparence radicale sur l'incertitude elle-même ». La proposition b reprend fidèlement, en la synthétisant, cette exigence.",
    vocabularyNotes: ["redevabilité", "transparence", "incertitude", "hypothèses"],
    difficulty: "difficile",
  },
  {
    id: "co-c2-3",
    skill: "CO",
    level: "C2",
    theme: "Culture",
    sequence: "Item 18",
    audioPrompt: "Une critique culturelle sur la traduction littéraire.",
    transcript:
      "Le grand paradoxe de la traduction littéraire, c'est que sa réussite se mesure à son invisibilité. Pourtant, ce travail d'effacement est le produit d'un choix constant : chaque mot retenu suppose des milliers de mots écartés. Le traducteur n'est pas un passeur neutre, c'est un coauteur qui engage l'œuvre dans une langue nouvelle, avec son histoire et ses connotations. Traduire, c'est réécrire, et c'est précisément pour cela qu'aucune traduction n'est définitive.",
    question: "Quelle est la thèse de l'auteur sur la traduction ?",
    options: [
      { id: "a", text: "Le traducteur est un coauteur dont le travail n'est jamais définitif." },
      { id: "b", text: "La traduction idéale est une traduction littérale mot à mot." },
      { id: "c", text: "Les traductions doivent être signées par l'auteur original." },
      { id: "d", text: "Toute traduction est une trahison de l'œuvre." },
    ],
    correctOptionId: "a",
    explanation:
      "L'auteur affirme que « le traducteur n'est pas un passeur neutre, c'est un coauteur » et qu'« aucune traduction n'est définitive ». La thèse n'est pas la trahison mais le rôle créatif et jamais achevé du traducteur.",
    vocabularyNotes: ["invisibilité", "traducteur", "coauteur", "connotations"],
    difficulty: "difficile",
  },

  // ============================ BANQUE THÉMATIQUE SUPPLÉMENTAIRE ============================
  // Formats variés : annonces, mini-textes, reportages, entretiens-oraux (interviews),
  // avec correction pédagogique systématique. Les thèmes reprennent les grands sujets
  // des vocabulaires thématiques (Environnement, Éducation, Travail, Technologie, Santé).

  {
    id: "co-n1",
    skill: "CO",
    level: "B1",
    theme: "Travail",
    sequence: "Item 19",
    audioPrompt: "Un message vocal d'un collègue qui prévient de son retard.",
    transcript:
      "— Allô Marie, c'est Karim. Écoute, je suis coincé dans les embouteillages sur le pont. Je vais arriver avec environ trente minutes de retard. Pourrais-tu nous faire commencer la réunion sans moi, et surtout noter les points importants ? Je rejoint tout ça à la pause. Merci !",
    question: "Que demande Karim à Marie ?",
    options: [
      { id: "a", text: "Commencer la réunion sans lui et noter les points importants." },
      { id: "b", text: "Annuler complètement la réunion." },
      { id: "c", text: "L'attendre au café avant le début." },
      { id: "d", text: "Renvoyer l'ordre du jour à tous." },
    ],
    correctOptionId: "a",
    explanation:
      "Le message vocal de Karim contient une demande claire en deux parties : commencer la réunion sans lui et noter les points importants. Il rejoint ensuite à la pause.",
    vocabularyNotes: ["embouteillages", "pointer", "les points importants", "la pause"],
    difficulty: "facile",
  },
  {
    id: "co-n2",
    skill: "CO",
    level: "B1",
    theme: "Vie quotidienne",
    sequence: "Item 20",
    audioPrompt: "Une annonce au micro dans un centre communautaire.",
    transcript:
      "« Bonjour à toutes et à tous. Rappelons que l'inscription aux ateliers de cuisine du samedi matin se termine vendredi à midi. Il reste une dizaine de places. Les personnes intéressées doivent se présenter à l'accueil avec une pièce d'identité. L'atelier est gratuit pour les membres de l'association. »",
    question: "Que doit faire une personne souhaitant s'inscrire à l'atelier ?",
    options: [
      { id: "a", text: "S'inscrire sur le site internet avant vendredi." },
      { id: "b", text: "Se présenter à l'accueil avec une pièce d'identité." },
      { id: "c", text: "Payer une cotisation avant l'atelier." },
      { id: "d", text: "Appeler la mairie pour réserver une place." },
    ],
    correctOptionId: "b",
    explanation:
      "L'annonce indique que les intéressés « doivent se présenter à l'accueil avec une pièce d'identité ». L'inscription est en présentiel, et gratuite pour les membres — il n'est pas question d'inscription en ligne.",
    vocabularyNotes: ["inscription", "ateliers", "pièce d'identité", "membres"],
    difficulty: "moyen",
  },
  {
    id: "co-n3",
    skill: "CO",
    level: "B2",
    theme: "Éducation",
    sequence: "Item 21",
    audioPrompt: "Un extrait d'émission radio : une formatrice répond aux auditeurs sur la formation continue.",
    transcript:
      "— Bonjour Madame. Beaucoup d'auditeurs nous demandent si la formation continue est vraiment utile pour changer de métier. — Absolument, et ce pour une raison simple : le marché du travail évolue plus vite que jamais. Une formation courte, bien choisie, permet souvent une reconversion en moins de deux ans. Le plus important, c'est de choisir un programme reconnu par les ordres professionnels, sinon vous risquez de gaspiller votre temps et votre argent.",
    question: "Quel conseil clé la formatrice donne-t-elle pour une reconversion ?",
    options: [
      { id: "a", text: "Choisir un programme reconnu par les ordres professionnels." },
      { id: "b", text: "Suivre la formation la moins chère possible." },
      { id: "c", text: "Changer de métier uniquement après dix ans d'expérience." },
      { id: "d", text: "Éviter toute formation en ligne." },
    ],
    correctOptionId: "a",
    explanation:
      "La formatrice insiste : « le plus important, c'est de choisir un programme reconnu par les ordres professionnels », sinon on risque de perdre son temps et son argent. C'est le conseil central de l'extrait.",
    vocabularyNotes: ["formation continue", "reconversion", "ordres professionnels", "reconnu"],
    difficulty: "moyen",
  },
  {
    id: "co-n4",
    skill: "CO",
    level: "B2",
    theme: "Environnement",
    sequence: "Item 22",
    audioPrompt: "Un reportage radio sur un nouveau projet énergétique.",
    transcript:
      "La municipalité de Rimouski lance un projet pilote de réseau de chaleur alimenté par la géothermie. Le principe est simple : utiliser la température du sous-sol pour chauffer et climatiser les bâtiments publics. L'investissement initial est important, mais les économies d'énergie attendues sont estimées à quarante pour cent par rapport aux chaudières actuelles. Si le bilan est concluant, le réseau sera étendu à tout le centre-ville.",
    question: "Quelle est la condition pour étendre le projet au centre-ville ?",
    options: [
      { id: "a", text: "Que le réseau fasse des économies d'énergie de quarante pour cent." },
      { id: "b", text: "Que le bilan du projet pilote soit concluant." },
      { id: "c", text: "Que les bâtiments publics soient rénovés." },
      { id: "d", text: "Que la municipalité recrute de nouveaux employés." },
    ],
    correctOptionId: "b",
    explanation:
      "Le reportage précise : « si le bilan est concluant, le réseau sera étendu à tout le centre-ville ». L'extension dépend donc de la réussite de la phase pilote.",
    vocabularyNotes: ["projet pilote", "géothermie", "bilan", "étendu"],
    difficulty: "difficile",
  },
  {
    id: "co-n5",
    skill: "CO",
    level: "B2",
    theme: "Santé",
    sequence: "Item 23",
    audioPrompt: "Un entretien entre une patiente et un pharmacien.",
    transcript:
      "— Bonjour, voici l'ordonnance de mon médecin pour une antibiothérapie. — J'vois ça. Sachez qu'il faut prendre ce médicament avec un verre d'eau plein, et surtout pas avec du jus de pamplemousse, car cela diminue l'efficacité. Et terminez tout le traitement, même si vous vous sentez mieux au bout de trois jours. — D'accord, je note. Merci beaucoup.",
    question: "Quelle recommandation le pharmacien donne-t-il ?",
    options: [
      { id: "a", text: "Arrêter le traitement dès que l'on se sent mieux." },
      { id: "b", text: "Terminer le traitement même si les symptômes disparaissent." },
      { id: "c", text: "Prendre le médicament avec du jus de pamplemousse." },
      { id: "d", text: "Remplacer ce médicament par un sirop." },
    ],
    correctOptionId: "b",
    explanation:
      "Le pharmacien insiste sur deux points : pas de pamplemousse (qui diminue l'efficacité) et surtout « terminez tout le traitement, même si vous vous sentez mieux ». La bonne réponse reprend ce dernier conseil essentiel.",
    vocabularyNotes: ["ordonnance", "antibiothérapie", "pamplemousse", "traitement"],
    difficulty: "difficile",
  },
  {
    id: "co-n6",
    skill: "CO",
    level: "B2",
    theme: "Médias",
    sequence: "Item 24",
    audioPrompt: "Une interview radiophonique d'une sociologue sur le télétravail.",
    transcript:
      "— Selon vos travaux, que se passe-t-il dans les équipes à distance ? — On observe un paradoxe : les gens communiquent plus, envoient plus de messages, mais échangent moins de ce que j'appelle les « informations froides », celles qui ne sont pas directement liées au travail : les impressions, les signaux faibles de fatigue ou de tension. Résultat, les managers perdent une partie importante de la lecture des situations. Ils doivent apprendre à mieux écouter, sur le fond.",
    question: "Que disent les travaux de la sociologue sur les équipes à distance ?",
    options: [
      { id: "a", text: "Elles communiquent plus mais échangent moins d'informations informelles essentielles." },
      { id: "b", text: "Elles rencontrent uniquement des problèmes de matériel." },
      { id: "c", text: "Elles ont remplacé toute communication écrite." },
      { id: "d", text: "Elles fonctionnent de la même façon qu'en présentiel." },
    ],
    correctOptionId: "a",
    explanation:
      "La sociologue identifie un paradoxe : davantage de messages, mais moins d'« informations froides » (impressions, signaux de fatigue). Les managers perdent ainsi une lecture fine des situations. C'est cette idée que la bonne réponse reformule.",
    vocabularyNotes: ["paradoxe", "signaux faibles", "managers", "lecture"],
    difficulty: "difficile",
  },
  {
    id: "co-n7",
    skill: "CO",
    level: "C1",
    theme: "Technologies",
    sequence: "Item 25",
    audioPrompt: "Un débat radio sur l'intelligence artificielle dans le recrutement.",
    transcript:
      "— L'IA trie des milliers de CV en quelques secondes : où est le problème ? — Le problème, c'est qu'un algorithme n'apprend pas à mieux recruter, il apprend à reproduire les recrutements passés. Si l'entreprise a historiquement sélectionné un profil donné, l'outil va amplifier ce biais au lieu de le corriger. — Mais l'humain n'est pas neutre non plus ! — Certes, mais l'humain peut rendre compte de ses choix. Un algorithme, lui, reste une boîte noire tant qu'on ne lui impose pas des exigences de transparence.",
    question: "Quel danger lié à l'IA de recrutement le débatteur met-il en avant ?",
    options: [
      { id: "a", text: "Elle amplifie les biais des recrutements passés plutôt que de les corriger." },
      { id: "b", text: "Elle est trop coûteuse pour les petites entreprises." },
      { id: "c", text: "Elle supprime tout recrutement humain." },
      { id: "d", text: "Elle privilégie systématiquement les candidats internes." },
    ],
    correctOptionId: "a",
    explanation:
      "Le débatteur affirme que l'algorithme « n'apprend pas à mieux recruter, il apprend à reproduire les recrutements passés », donc il amplifie le biais historique. La transparence est posée comme exigence manquante, ce qui renforce l'idée de la réponse a.",
    vocabularyNotes: ["recrutement", "biais", "boîte noire", "transparence"],
    difficulty: "difficile",
  },
  {
    id: "co-n8",
    skill: "CO",
    level: "C1",
    theme: "Société",
    sequence: "Item 26",
    audioPrompt: "Une chronique sociale sur la semaine de travail et la productivité.",
    transcript:
      "Les défenseurs de la semaine de quatre jours la présentent comme une victoire des salariés. En réalité, c'est d'abord une révolution de la méthode. L'entreprise est contrainte de supprimer les réunions stériles, de responsabiliser les équipes sur des objectifs, et de mesurer davantage la production. C'est pourquoi elle ne fonctionne que si les dirigeants acceptent de revoir en profondeur leurs processus — sans quoi elle aboutit simplement à faire en cinq jours un travail qui en demandait cinq.",
    question: "Selon l'auteur, à quelle condition la semaine de quatre jours fonctionne-t-elle ?",
    options: [
      { id: "a", text: "À condition de revoir les processus de travail en profondeur." },
      { id: "b", text: "À condition d'augmenter les salaires." },
      { id: "c", text: "À condition de réduire les horaires de nuit." },
      { id: "d", text: "À condition de recruter des employés supplémentaires." },
    ],
    correctOptionId: "a",
    explanation:
      "La chronique est claire : la semaine de quatre jours ne fonctionne « que si les dirigeants acceptent de revoir en profondeur leurs processus ». Elle illustre la contrainte par l'exemple final des réunions stériles.",
    vocabularyNotes: ["réunions stériles", "processus", "responsabiliser", "mesurer"],
    difficulty: "difficile",
  },
  {
    id: "co-n9",
    skill: "CO",
    level: "C1",
    theme: "Culture",
    sequence: "Item 27",
    audioPrompt: "Un entretien avec une bibliothécaire sur l'avenir des bibliothèques.",
    transcript:
      "— La bibliothèque va-t-elle devenir un simple lieu de prêt numérique ? — Ce serait une erreur de la réduire à cela. Notre vraie mission, c'est l'accès à l'écrit et à l'information pour tous, en particulier pour ceux qui n'ont pas les moyens d'en acheter. Et aussi un lieu d'accueil : des personnes viennent ici surtout pour rompre l'isolement. Le numérique, c'est un complément, pas un substitut. La bibliothèque est le seul service public où l'on peut venir sans consommer.",
    question: "Comment la bibliothécaire définit-elle la mission principale de la bibliothèque ?",
    options: [
      { id: "a", text: "La rendre accessible à tous et lutter contre l'isolement, le numérique en complément." },
      { id: "b", text: "La transformer entièrement en service de prêt numérique." },
      { id: "c", text: "En faire un lieu commercial avec cafés et boutiques." },
      { id: "d", text: "Réservée uniquement aux étudiants." },
    ],
    correctOptionId: "a",
    explanation:
      "La bibliothécaire insiste sur la mission d'accès pour tous et de lutte contre l'isolement, et précise que « le numérique, c'est un complément, pas un substitut ». C'est exactement la nuance proposée par la réponse a.",
    vocabularyNotes: ["prêt numérique", "isolement", "substitut", "service public"],
    difficulty: "difficile",
  },
  {
    id: "co-n10",
    skill: "CO",
    level: "C1",
    theme: "Environnement",
    sequence: "Item 28",
    audioPrompt: "Une interview d'un climatologue sur les solutions fondées sur la nature.",
    transcript:
      "— Peut-on réellement compter sur les forêts pour absorber notre carbone ? — Les forêts sont un puits indispensable, mais elles ne sont pas une éponge illimitée. Leur capacité dépend du climat, du type d'essences, de la gestion qu'on en fait. Une forêt mal gérée peut même devenir une source d'émissions si elle brûle ou dépérit. Le danger, c'est de les considérer comme un permis d'émettre : planter des arbres pour acheter le droit de polluer ailleurs, voilà une illusion dangereuse.",
    question: "Quel danger le climatologue dénonce-t-il à propos des forêts ?",
    options: [
      { id: "a", text: "L'idée que planter des arbres permet d'acheter le droit de polluer ailleurs." },
      { id: "b", text: "Le fait que les forêts ne stockent aucun carbone." },
      { id: "c", text: "La décision de réduire le nombre d'essences." },
      { id: "d", text: "L'absence totale de forêts protégées au Canada." },
    ],
    correctOptionId: "a",
    explanation:
      "Le climatologue met en garde contre la vision des forêts comme « permis d'émettre » : « planter des arbres pour acheter le droit de polluer ailleurs, voilà une illusion dangereuse ». Il ne nie pas leur rôle de puits.",
    vocabularyNotes: ["puits", "émissions", "permis d'émettre", "illusion"],
    difficulty: "difficile",
  },
  {
    id: "co-n11",
    skill: "CO",
    level: "C2",
    theme: "Technologies",
    sequence: "Item 29",
    audioPrompt: "Une conférence sur la sobriété numérique.",
    transcript:
      "Parler de sobriété numérique suppose d'abord un aveu d'impuissance : nous n'avons jamais vraiment su mesurer l'empreinte du numérique, car les centres de données sont répartis dans le monde entier et leurs performances en énergie sont des secrets commerciaux. Dès lors, le geste individuel — fermer ses mails, diminuer ses vidéos — a une portée réelle mais limitée. La vraie sobriété serait structurelle : décider collectivement des usages qui méritent nos ressources, plutôt que de laisser la rentabilité des acteurs trancher à notre place.",
    question: "Que propose l'orateur pour une « vraie sobriété numérique » ?",
    options: [
      { id: "a", text: "Une décision collective sur les usages qui méritent les ressources, plutôt qu'un choix individuel." },
      { id: "b", text: "La fermeture immédiate de tous les centres de données." },
      { id: "c", text: "L'interdiction de la vidéo sur internet." },
      { id: "d", text: "Une limitation individuelle absolue de ses propres usages." },
    ],
    correctOptionId: "a",
    explanation:
      "L'orateur affirme que les gestes individuels ont « une portée réelle mais limitée » et que la « vraie sobriété serait structurelle » : une décision collective sur les usages, au lieu du choix imposé par la seule rentabilité.",
    vocabularyNotes: ["sobriété numérique", "empreinte", "structurel", "usage"],
    difficulty: "difficile",
  },
  {
    id: "co-n12",
    skill: "CO",
    level: "C2",
    theme: "Société",
    sequence: "Item 30",
    audioPrompt: "Un débat entre deux invités sur la notion de transparence des données.",
    transcript:
      "— Il faut exiger des géants du numérique une transparence totale des algorithmes. — Attention : la transparence n'est pas une fin en soi. Rendre public un algorithme n'équivaut pas à le rendre compréhensible. La transparence authentique, c'est celle qui permet à un tiers indépendant de vérifier les effets d'un système sur ses utilisateurs. Or cette vérification ne dépend pas du code ouvert, mais des droits accordés aux régulateurs : inspecter, auditer, et faire corriger sous peine de sanctions.",
    question: "Quelle conception de la transparence le second invité défend-il ?",
    options: [
      { id: "a", text: "La transparence doit passer par des pouvoirs réels de contrôle accordés aux régulateurs." },
      { id: "b", text: "La transparence se limite à publier le code source des algorithmes." },
      { id: "c", text: "La transparence est une fin en soi même si personne ne la comprend." },
      { id: "d", text: "La transparence ne concerne pas les géants du numérique." },
    ],
    correctOptionId: "a",
    explanation:
      "Le second invité distingue transparence réelle (vérification des effets) et publication du code : « cette vérification ne dépend pas du code ouvert, mais des droits accordés aux régulateurs ». La réponse a traduit fidèlement cette position nuancée.",
    vocabularyNotes: ["transparence", "algorithmes", "régulateurs", "sanctions"],
    difficulty: "difficile",
  },
];

export const comprehensionEcriteQuestions: QcmQuestion[] = [
  // ============================ NIVEAU A1 ============================
  {
    id: "ce-a1-1",
    skill: "CE",
    level: "A1",
    theme: "Panneau",
    sequence: "Item 1",
    passageType: "Panneau",
    passage: "PARKING RÉSERVÉ AUX PERSONNES HANDICAPÉES",
    question: "Qui peut utiliser ce parking ?",
    options: [
      { id: "a", text: "Tout le monde." },
      { id: "b", text: "Uniquement les personnes handicapées." },
      { id: "c", text: "Les clients du magasin." },
      { id: "d", text: "Les employés uniquement." },
    ],
    correctOptionId: "b",
    explanation:
      "L'adjectif « réservé » indique une exclusivité : seul un public précis, ici les personnes handicapées, peut utiliser ce parking.",
    vocabularyNotes: ["parking réservé", "personnes handicapées"],
    difficulty: "facile",
  },
  {
    id: "ce-a1-2",
    skill: "CE",
    level: "A1",
    theme: "Annonce",
    sequence: "Item 2",
    passageType: "Annonce",
    passage:
      "HORAIRE D'OUVERTURE DE LA BIBLIOTHÈQUE\nLundi au vendredi : 9h - 18h\nSamedi : 10h - 16h\nDimanche : fermé",
    question: "Quand la bibliothèque est-elle ouverte le matin ?",
    options: [
      { id: "a", text: "À 10h le samedi." },
      { id: "b", text: "À 9h le samedi." },
      { id: "c", text: "Elle est fermée le samedi." },
      { id: "d", text: "À midi le dimanche." },
    ],
    correctOptionId: "a",
    explanation:
      "Le samedi, l'ouverture est à 10h. Les autres propositions sont fausses : le dimanche est fermé et le samedi n'ouvre ni à 9h ni à midi.",
    vocabularyNotes: ["horaire d'ouverture", "ouvert", "fermé"],
    difficulty: "facile",
  },
  {
    id: "ce-a1-3",
    skill: "CE",
    level: "A1",
    theme: "Courrier",
    sequence: "Item 3",
    passageType: "Message",
    passage:
      "Paul, je suis sortie. La clé est sous le tapis. Ramène du lait s'il te plaît ! Lucie",
    question: "Que demande Lucie à Paul ?",
    options: [
      { id: "a", text: "Acheter du lait." },
      { id: "b", text: "Fermer la porte à clé." },
      { id: "c", text: "L'appeler au téléphone." },
      { id: "d", text: "Ranger le salon." },
    ],
    correctOptionId: "a",
    explanation:
      "Le verbe « ramène » et le complément « du lait » indiquent une demande d'achat : Paul doit rapporter du lait.",
    vocabularyNotes: ["ramène", "la clé", "sous le tapis"],
    difficulty: "facile",
  },

  // ============================ NIVEAU A2 ============================
  {
    id: "ce-a2-1",
    skill: "CE",
    level: "A2",
    theme: "Annonce",
    sequence: "Item 4",
    passageType: "Annonce",
    passage:
      "PREMIER EMPLOI : recherche commis de cuisine à temps partiel (20 h / semaine), principalement le soir. Aucune expérience requise. Formation assurée. Les candidats doivent posséder un permis de travail valide. Adressez votre candidature au restaurant Le Bistro.",
    question: "Quelle condition doit satisfaire le candidat ?",
    options: [
      { id: "a", text: "Avoir une expérience de cuisine." },
      { id: "b", text: "Posséder un permis de travail valide." },
      { id: "c", text: "Être disponible le matin." },
      { id: "d", text: "Travailler 40 heures par semaine." },
    ],
    correctOptionId: "b",
    explanation:
      "L'annonce précise « aucune expérience requise » et un poste de 20 h/semaine le soir. L'unique condition énoncée est la possession d'un « permis de travail valide ».",
    vocabularyNotes: ["commis de cuisine", "temps partiel", "permis de travail", "candidature"],
    difficulty: "facile",
  },
  {
    id: "ce-a2-2",
    skill: "CE",
    level: "A2",
    theme: "Administration",
    sequence: "Item 5",
    passageType: "Avis",
    passage:
      "Avis aux locataires : l'ascenseur de l'immeuble sera en maintenance le jeudi 12 de 8h à 12h. Les déménagements sont interdits pendant cette période. Merci d'utiliser l'escalier de service pendant la maintenance.",
    question: "Que doivent faire les locataires jeudi matin ?",
    options: [
      { id: "a", text: "Utiliser l'escalier de service." },
      { id: "b", text: "Déménager avant 8h." },
      { id: "c", text: "Payer une taxe de maintenance." },
      { id: "d", text: "Quitter l'immeuble toute la journée." },
    ],
    correctOptionId: "a",
    explanation:
      "L'avis demande aux locataires d'« utiliser l'escalier de service pendant la maintenance ». Les déménagements sont au contraire interdits pendant cette période.",
    vocabularyNotes: ["maintenance", "locataires", "escalier de service", "déménagements"],
    difficulty: "moyen",
  },
  {
    id: "ce-a2-3",
    skill: "CE",
    level: "A2",
    theme: "Publicité",
    sequence: "Item 6",
    passageType: "Annonce",
    passage:
      "PROMOTION HIVERNALE : jusqu'à 40 % de réduction sur les manteaux et les bottes, uniquement en magasin et jusqu'au 31 janvier. Les soldes ne sont pas cumulables avec d'autres offres. Pas de remboursement sur les articles soldés.",
    question: "Quelle information est correcte concernant la promotion ?",
    options: [
      { id: "a", text: "Elle s'applique aussi en ligne." },
      { id: "b", text: "Elle se cumule avec les autres offres." },
      { id: "c", text: "Elle se termine le 31 janvier." },
      { id: "d", text: "Les articles soldés peuvent être remboursés." },
    ],
    correctOptionId: "c",
    explanation:
      "La promotion « jusqu'à 40 % ... jusqu'au 31 janvier » et « uniquement en magasin », « non cumulable », sans remboursement sont toutes précisées. Seule la date de fin (31 janvier) correspond à une information correcte.",
    vocabularyNotes: ["promotion", "réduction", "soldes", "cumulables"],
    difficulty: "moyen",
  },

  // ============================ NIVEAU B1 ============================
  {
    id: "ce-b1-1",
    skill: "CE",
    level: "B1",
    theme: "Presse",
    sequence: "Item 7",
    passageType: "Article de presse",
    passage:
      "La municipalité de Québec lance un programme de végétalisation des toits des bâtiments publics. Outre un bénéfice esthétique, ces toits végétaux absorbent les eaux de pluie, réduisent les îlots de chaleur l'été et améliorent l'isolation thermique. Les travaux de la première phase, qui concernent trois écoles, débuteront au printemps et se termineront avant la rentrée scolaire.",
    question: "Quel est le but principal de ce programme ?",
    options: [
      { id: "a", text: "Réduire les charges d'entretien des bâtiments." },
      { id: "b", text: "Végétaliser les toits pour limiter l'îlot de chaleur." },
      { id: "c", text: "Augmenter le nombre de logements sociaux." },
      { id: "d", text: "Créer des emplois saisonniers." },
    ],
    correctOptionId: "b",
    explanation:
      "L'article énumère trois bénéfices des toits végétaux, dont « réduire les îlots de chaleur l'été ». Le but général du programme est la végétalisation des toits : c'est l'objet même du programme.",
    vocabularyNotes: ["végétalisation", "îlots de chaleur", "isolation thermique", "municipalité"],
    difficulty: "moyen",
  },
  {
    id: "ce-b1-2",
    skill: "CE",
    level: "B1",
    theme: "Vie pratique",
    sequence: "Item 8",
    passageType: "Article pratique",
    passage:
      "Pour obtenir un permis de conduire de classe 5 dans la plupart des provinces canadiennes, il faut d'abord réussir un examen théorique, puis effectuer un minimum d'heures de conduite accompagnée. Le délai total dépend de l'âge du candidat : les candidats de plus de 25 ans avec une bonne expérience peuvent souvent obtenir leur permis en quelques mois, tandis que les plus jeunes doivent respecter un délai minimum d'un an.",
    question: "De quoi dépend la durée totale pour obtenir le permis ?",
    options: [
      { id: "a", text: "Du nombre d'heures de théorie suivies." },
      { id: "b", text: "De l'âge et de l'expérience du candidat." },
      { id: "c", text: "De la taille de la ville de résidence." },
      { id: "d", text: "Du coût de l'examen." },
    ],
    correctOptionId: "b",
    explanation:
      "Le texte affirme que « le délai total dépend de l'âge du candidat » et mentionne l'expérience pour les plus de 25 ans. La bonne réponse combine ces deux facteurs.",
    vocabularyNotes: ["examen théorique", "conduite accompagnée", "délai", "candidats"],
    difficulty: "moyen",
  },
  {
    id: "ce-b1-3",
    skill: "CE",
    level: "B1",
    theme: "Administratif",
    sequence: "Item 9",
    passageType: "Guide officiel",
    passage:
      "Votre demande de statut de résident permanent doit être accompagnée de tous les documents exigés. Si un document est manquant, votre demande sera retournée sans être examinée. Les frais de traitement ne sont pas remboursables. Une fois la demande complète soumise en ligne, vous recevrez une confirmation de réception et un délai de traitement estimé sous 30 jours.",
    question: "Que se passe-t-il si un document est manquant ?",
    options: [
      { id: "a", text: "La demande est mise en attente." },
      { id: "b", text: "La demande est retournée sans examen." },
      { id: "c", text: "Des frais supplémentaires sont facturés." },
      { id: "d", text: "Le demandeur doit passer un entretien." },
    ],
    correctOptionId: "b",
    explanation:
      "Le texte dit explicitement : « Si un document est manquant, votre demande sera retournée sans être examinée. » C'est une conséquence immédiate et ferme, sans possibilité de mise en attente.",
    vocabularyNotes: ["statut de résident", "documents exigés", "frais", "traitement"],
    difficulty: "moyen",
  },

  // ============================ NIVEAU B2 ============================
  {
    id: "ce-b2-1",
    skill: "CE",
    level: "B2",
    theme: "Presse",
    sequence: "Item 10",
    passageType: "Article de presse",
    passage:
      "Le télétravail, massivement généralisé pendant la pandémie, a-t-il eu l'effet attendu sur la productivité ? Une récente enquête menée auprès de 2 000 salariés canadiens révèle un tableau contrasté : si les employés déclarent gagner en autonomie et en concentration, leurs gestionnaires peinent à évaluer la charge de travail réelle et redoutent un affaiblissement de la culture d'entreprise. Les entreprises qui ont établi des règles claires de disponibilité et de temps de travail conjoint semblent toutefois tirer leur épingle du jeu.",
    question: "Quel est le principal constat de l'enquête ?",
    options: [
      { id: "a", text: "Le télétravail est un échec complet pour les entreprises." },
      { id: "b", text: "Les gains d'autonomie coexistent avec des difficultés de gestion et de cohésion." },
      { id: "c", text: "Seuls les salariés sont satisfaits du télétravail." },
      { id: "d", text: "Les entreprises veulent supprimer le télétravail." },
    ],
    correctOptionId: "b",
    explanation:
      "L'article décrit un « tableau contrasté » : les salariés gagnent en autonomie et concentration, mais les gestionnaires redoutent des difficultés d'évaluation et de cohésion. La bonne réponse synthétise ces deux facettes.",
    vocabularyNotes: ["productivité", "gestionnaires", "culture d'entreprise", "contrasté"],
    difficulty: "difficile",
  },
  {
    id: "ce-b2-2",
    skill: "CE",
    level: "B2",
    theme: "Santé",
    sequence: "Item 11",
    passageType: "Article de vulgarisation",
    passage:
      "Le sommeil n'est pas un simple temps mort de l'organisme. C'est durant le sommeil profond que se consolident les apprentissages de la journée et que le cerveau élimine certaines protéines liées aux maladies neurodégénératives. Les chercheurs insistent : ce n'est pas la durée totale de sommeil qui compte d'abord, mais la régularité des horaires. Dormir sept heures par nuit à des heures stables vaut mieux que neuf heures à des horaires changeants.",
    question: "Quel conseil les chercheurs donnent-ils en priorité ?",
    options: [
      { id: "a", text: "Dormir le plus longtemps possible." },
      { id: "b", text: "Maintenir des horaires de sommeil réguliers." },
      { id: "c", text: "Faire du sport avant de dormir." },
      { id: "d", text: "Éviter tout repas le soir." },
    ],
    correctOptionId: "b",
    explanation:
      "L'article hiérarchise : « ce n'est pas la durée totale de sommeil qui compte d'abord, mais la régularité des horaires ». Le conseil central est donc la régularité.",
    vocabularyNotes: ["sommeil profond", "consolider", "régularité", "neurodégénératives"],
    difficulty: "difficile",
  },
  {
    id: "ce-b2-3",
    skill: "CE",
    level: "B2",
    theme: "Actualité",
    sequence: "Item 12",
    passageType: "Reportage",
    passage:
      "Le marché de l'énergie connaît une recomposition rapide. Les géants pétroliers, longtemps moteurs de l'économie, investissent désormais massivement dans les infrastructures électriques, non par conviction écologique mais par calcul lucide : la demande d'électricité, portée par la mobilité électrique et les centres de données, croît deux fois plus vite que celle des hydrocarbures. Pourtant, ce virage pose question : qui financera le réseau, et à quel prix pour le consommateur ?",
    question: "Quelle est la raison du virage des géants pétroliers vers l'électricité ?",
    options: [
      { id: "a", text: "Une conviction écologique profonde." },
      { id: "b", text: "Un calcul économique lié à la croissance de la demande électrique." },
      { id: "c", text: "Une obligation légale du gouvernement." },
      { id: "d", text: "Une baisse de la demande en hydrocarbures." },
    ],
    correctOptionId: "b",
    explanation:
      "L'auteur précise que ce n'est « pas par conviction écologique mais par calcul lucide » face à une demande d'électricité qui croît plus vite. La motivation est économique.",
    vocabularyNotes: ["recomposition", "calcul lucide", "hydrocarbures", "infrastructures"],
    difficulty: "difficile",
  },

  // ============================ NIVEAU C1 ============================
  {
    id: "ce-c1-1",
    skill: "CE",
    level: "C1",
    theme: "Société",
    sequence: "Item 13",
    passageType: "Chronique",
    passage:
      "La semaine de quatre jours, souvent présentée comme une simple faveur accordée aux salariés, révélerait en réalité un saut organisationnel. Elle contraint l'entreprise à revoir ses processus, à supprimer les réunions sans objet et à responsabiliser les équipes sur des objectifs de résultat. Les entreprises pionnières rapportent une hausse de la satisfaction sans perte mesurable de production. Le risque principal se situe ailleurs : la norme se répand, mais sans le travail de repensage qui la fonde, elle risque de n'être qu'un aménagement superficiel, voire contre-productif.",
    question: "Selon l'auteur, quel risque menace la semaine de quatre jours ?",
    options: [
      { id: "a", text: "Elle pourrait être adoptée sans la réorganisation nécessaire à son succès." },
      { id: "b", text: "Elle réduirait systématiquement la production des entreprises." },
      { id: "c", text: "Elle serait refusée par la majorité des salariés." },
      { id: "d", text: "Elle provoquerait une hausse des coûts salariaux." },
    ],
    correctOptionId: "a",
    explanation:
      "L'auteur estime que le risque est « la norme se répand, mais sans le travail de repensage qui la fonde ». La menace n'est pas la baisse de production (non mesurée) mais une adoption de façade.",
    vocabularyNotes: ["saut organisationnel", "processus", "responsabiliser", "contre-productif"],
    difficulty: "difficile",
  },
  {
    id: "ce-c1-2",
    skill: "CE",
    level: "C1",
    theme: "Économie",
    sequence: "Item 14",
    passageType: "Commentaire économique",
    passage:
      "La politique monétaire accommodante des dernières années a eu un effet paradoxal : en rendant le crédit presque gratuit, elle a stimulé l'investissement, mais elle a aussi gonflé le prix des actifs et creusé l'endettement des ménages. Le durcissement actuel des taux oblige désormais à un arbitrage douloureux : les autorités cherchent à contenir l'inflation sans provoquer de correction brutale des marchés immobiliers. Un atterrissage en douceur n'est jamais garanti lorsqu'on a laissé les bulles grossir.",
    question: "Quel est le problème posé par le durcissement des taux ?",
    options: [
      { id: "a", text: "Il favorise la hausse des prix des actifs." },
      { id: "b", text: "Il doit concilier lutte contre l'inflation et stabilité des marchés." },
      { id: "c", text: "Il facilite l'accès au crédit des ménages." },
      { id: "d", text: "Il accroît automatiquement la masse monétaire." },
    ],
    correctOptionId: "b",
    explanation:
      "L'auteur décrit un « arbitrage douloureux » : contenir l'inflation « sans provoquer de correction brutale des marchés immobiliers ». C'est la tension centrale du durcissement des taux.",
    vocabularyNotes: ["accommodante", "arbitrage", "inflation", "bulles"],
    difficulty: "difficile",
  },
  {
    id: "ce-c1-3",
    skill: "CE",
    level: "C1",
    theme: "Environnement",
    sequence: "Item 15",
    passageType: "Essai grand public",
    passage:
      "Opposer croissance et environnement est un faux dilemme, mais l'affirmer ne suffit pas. La décroissance de certains secteurs est souhaitable tout autant que croissance d'autres : il faut distinguer les activités à faible valeur écologique et forte empreinte, qu'il s'agit de réduire, des activités sobres et créatrices d'emplois qualifiés, qu'il faut développer. La vraie question est donc celle d'une planification qui réoriente l'économie, plutôt qu'un renoncement global ou une course aveugle à l'augmentation du PIB.",
    question: "Quelle position l'auteur défend-il ?",
    options: [
      { id: "a", text: "Réduire uniformément toute activité économique." },
      { id: "b", text: "Réorienter l'économie en distinguant les secteurs à développer et à réduire." },
      { id: "c", text: "Maintenir la croissance du PIB comme objectif unique." },
      { id: "d", text: "Parvenir à une croissance sans aucune contrainte écologique." },
    ],
    correctOptionId: "b",
    explanation:
      "L'auteur refuse à la fois le « renoncement global » et la « course aveugle à l'augmentation du PIB », pour défendre une planification qui « réoriente l'économie » en distinguant secteurs à réduire et secteurs à développer.",
    vocabularyNotes: ["faux dilemme", "décroissance", "planification", "empreinte"],
    difficulty: "difficile",
  },

  // ============================ NIVEAU C2 ============================
  {
    id: "ce-c2-1",
    skill: "CE",
    level: "C2",
    theme: "Philosophie politique",
    sequence: "Item 16",
    passageType: "Essai",
    passage:
      "Le discours de la proximité, qui invite à privilégier le local, mérite d'être interrogé non pas en soi, mais dans l'usage politique qu'on en fait. Assez souvent, le « local » sert de substitut commode à la réflexion sur les interdépendances : il déplace l'attention du consommateur vers des circuits vertueux, sans jamais s'interroger sur la redistribution des richesses à l'échelle internationale. La vertu se niche alors dans le geste d'achat, ce qui revient à confier à l'acte individuel une fonction politique qui devrait appartenir au débat public.",
    question: "Quelle est la critique centrale de l'auteur ?",
    options: [
      { id: "a", text: "Le local permet de redistribuer les richesses." },
      { id: "b", text: "Le discours du local détourne l'attention des enjeux structurels de redistribution." },
      { id: "c", text: "La consommation locale est inutile." },
      { id: "d", text: "Le débat public doit être confié à l'acte d'achat." },
    ],
    correctOptionId: "b",
    explanation:
      "L'auteur pointe l'« usage politique » du discours local : il « déplace l'attention ... sans jamais s'interroger sur la redistribution », et confie « à l'acte individuel une fonction politique » qui revient au débat public.",
    vocabularyNotes: ["proximité", "interdépendances", "redistribution", "substitut"],
    difficulty: "difficile",
  },
  {
    id: "ce-c2-2",
    skill: "CE",
    level: "C2",
    theme: "Sciences",
    sequence: "Item 17",
    passageType: "Éditorial scientifique",
    passage:
      "La publication des résultats de recherche demeure gouvernée par la logique du « tout inédit ». Or, la science avance autant par réplications que par découvertes : c'est la reproductibilité d'une expérience qui transforme un résultat intéressant en fait établi. Pourtant, les revues privilégient structurellement les résultats inattendus, ce qui biaise la littérature et conduit à des études non reproductibles. Opposer quantité et qualité de publication est un débat mal posé : le véritable mal-logement se situe dans l'incitation à l'originalité à tout prix.",
    question: "Quelle est la cause identifiée des études non reproductibles ?",
    options: [
      { id: "a", text: "La complexité croissante des protocoles expérimentaux." },
      { id: "b", text: "Une incitation systémique à publier des résultats inédits." },
      { id: "c", text: "Le manque de financement des laboratoires." },
      { id: "d", text: "L'insuffisance des contrôles éthiques." },
    ],
    correctOptionId: "b",
    explanation:
      "L'auteur situe le problème dans « l'incitation à l'originalité à tout prix », liée à la préférence « structurelle » des revues pour « les résultats inattendus ». La cause est systémique et éditoriale.",
    vocabularyNotes: ["réplications", "reproductibilité", "biaiser", "littérature"],
    difficulty: "difficile",
  },
  {
    id: "ce-c2-3",
    skill: "CE",
    level: "C2",
    theme: "Littérature",
    sequence: "Item 18",
    passageType: "Critique littéraire",
    passage:
      "Dénier à la littérature toute portée cognitive au nom de sa fictionalité est aussi réducteur que d'en faire l'égale d'un traité. La fiction développe une forme spécifique de connaissance : non pas celle des faits, mais celle des possibles. En éprouvant par l'imagination des situations que nous n'avons pas vécues, le lecteur affine son intelligence morale : il apprend à peser des responsabilités, à discerner des intentions, à tolérer l'ambiguïté. C'est cette fonction, la plus difficile à quantifier, qui justifie la place de la littérature dans toute formation exigeante.",
    question: "Quelle fonction l'auteur attribue-t-il spécifiquement à la littérature ?",
    options: [
      { id: "a", text: "Une fonction documentaire équivalente au traité." },
      { id: "b", text: "L'exploration de situations possibles qui affine l'intelligence morale." },
      { id: "c", text: "Une fonction purement décorative et de distraction." },
      { id: "d", text: "La transmission d'un savoir factuel cumulatif." },
    ],
    correctOptionId: "b",
    explanation:
      "L'auteur définit la connaissance littéraire comme « celle des possibles » et lui attribue l'affinement de « l'intelligence morale ». C'est la thèse centrale, opposée à la fois à l'utilité documentaire et au divertissement pur.",
    vocabularyNotes: ["fictionalité", "portée cognitive", "intelligence morale", "ambiguïté"],
    difficulty: "difficile",
  },

  // ============================ BANQUE THÉMATIQUE SUPPLÉMENTAIRE ============================
  // Formats variés : annonces, mini-textes, articles de presse, interviews retranscrites,
  // avec correction pédagogique systématique et thèmes alignés sur les vocabulaires
  // thématiques (Environnement, Éducation, Travail, Technologie, Santé, Société).

  {
    id: "ce-n1",
    skill: "CE",
    level: "B1",
    theme: "Éducation",
    sequence: "Item 19",
    passageType: "Annonce",
    passage:
      "COURS DE FRANÇAIS POUR NOUVEAUX ARRIVANTS\nLa maison de quartier propose des cours de français gratuits, trois soirées par semaine, du niveau débutant au niveau intermédiaire. Pour s'inscrire : se présenter au centre avec sa confirmation de résidence. Les places sont limitées à quinze personnes par groupe.",
    question: "Quelle condition doit remplir une personne pour s'inscrire ?",
    options: [
      { id: "a", text: "Avoir un niveau intermédiaire au minimum." },
      { id: "b", text: "Se présenter avec sa confirmation de résidence." },
      { id: "c", text: "Payer les frais d'inscription à l'avance." },
      { id: "d", text: "Être recommandé par une association." },
    ],
    correctOptionId: "b",
    explanation:
      "L'annonce précise les modalités d'inscription : « se présenter au centre avec sa confirmation de résidence ». Tous les niveaux de débutant à intermédiaire sont proposés, et les cours sont gratuits.",
    vocabularyNotes: ["nouveaux arrivants", "inscription", "confirmation de résidence", "groupe"],
    difficulty: "facile",
  },
  {
    id: "ce-n2",
    skill: "CE",
    level: "B1",
    theme: "Vie quotidienne",
    sequence: "Item 20",
    passageType: "Forum",
    passage:
      "Bonjour à tous, je viens d'emménager dans le quartier et je cherche une garderie pour mon fils de deux ans. Quelqu'un peut-il me recommander une place en milieu familial ou une créche à proximité ? Je privilégie les structures qui proposent des activités en extérieur. Merci d'avance !",
    question: "Qu'est-ce qui est demandé dans ce message ?",
    options: [
      { id: "a", text: "Une recommandation de garderie avec des activités en extérieur." },
      { id: "b", text: "Des conseils pour déménager dans le quartier." },
      { id: "c", text: "Un emploi dans une garderie." },
      { id: "d", text: "Des cours de français pour l'enfant." },
    ],
    correctOptionId: "a",
    explanation:
      "La mère cherche une place en garderie pour son fils et « privilégie les structures qui proposent des activités en extérieur ». Le reste du message concerne uniquement cette recherche.",
    vocabularyNotes: ["emménager", "garderie", "milieu familial", "activités en extérieur"],
    difficulty: "facile",
  },
  {
    id: "ce-n3",
    skill: "CE",
    level: "B2",
    theme: "Environnement",
    sequence: "Item 21",
    passageType: "Article de presse",
    passage:
      "La ville de Gatineau poursuit sa stratégie d'« ilots frais » face aux étés plus chauds. Les ruelles vertes — végétalisées, ombragées, équipées de bancs — se multiplient dans plusieurs secteurs résidentiels. Selon la municipalité, la température peut y être réduite de cinq degrés par rapport aux rues bitumées voisines. Les habitants constatent un bénéfice social : les ruelles deviennent des espaces de rencontre et de surveillance naturelle du quartier.",
    question: "Quel bénéfice de la stratégie des ruelles vertes est souligné ?",
    options: [
      { id: "a", text: "Uniquement une baisse des températures estivales." },
      { id: "b", text: "Une baisse des températures et un renforcement du lien social." },
      { id: "c", text: "Une augmentation de la circulation automobile." },
      { id: "d", text: "La création de nouveaux commerces." },
    ],
    correctOptionId: "b",
    explanation:
      "L'article mentionne à la fois la baisse de température (jusqu'à cinq degrés) et un « bénéfice social » : les ruelles deviennent des lieux de rencontre et de surveillance naturelle. La bonne réponse combine ces deux aspects.",
    vocabularyNotes: ["îlots frais", "ruelles vertes", "bénéfice social", "surveillance"],
    difficulty: "moyen",
  },
  {
    id: "ce-n4",
    skill: "CE",
    level: "B2",
    theme: "Travail",
    sequence: "Item 22",
    passageType: "Article de presse",
    passage:
      "Face à la pénurie de personnel en santé, l'hôpital régional s'est tourné vers une politique de fidélisation plutôt que de recrutement à tout prix : hausse des salaires de nuit, places garanties en garderie pour les employés, et tutorat renforcé pour les nouvelles recrues. Six mois après le lancement, le taux de départ des infirmières a diminué de 25 %, un résultat que la direction attribue d'abord à l'encadrement des débutantes.",
    question: "À quoi la direction attribue-t-elle principalement la baisse des départs ?",
    options: [
      { id: "a", text: "À la hausse des salaires de nuit." },
      { id: "b", text: "À l'encadrement renforcé des nouvelles recrues." },
      { id: "c", text: "Aux places garanties en garderie." },
      { id: "d", text: "Au recrutement massif d'infirmières." },
    ],
    correctOptionId: "b",
    explanation:
      "L'article attribue le résultat « d'abord à l'encadrement des débutantes » (le tutorat renforcé). Les autres mesures existent, mais la cause principale retenue par la direction est le tutorat.",
    vocabularyNotes: ["pénurie", "fidélisation", "tutorat", "taux de départ"],
    difficulty: "moyen",
  },
  {
    id: "ce-n5",
    skill: "CE",
    level: "B2",
    theme: "Travail",
    sequence: "Item 23",
    passageType: "Interview",
    passage:
      "« J'ai quitté mon poste de directrice adjointe en banque pour fonder une coopérative d'aide à domicile. La banque m'avait tout appris : la gestion, la rigueur, le contact client. Mais je voyais des aînés isolés qu'aucun service ne rejoignait. Mon pari, c'est de prouver qu'un modèle coopératif peut être rentable et humain. Le plus difficile au début ? Convaincre les banques, justement, de prêter à une coopérative. » — entretien avec Nadia B., entrepreneure sociale.",
    question: "Quelle a été la principale difficulté au début du projet ?",
    options: [
      { id: "a", text: "Convaincre des prêteurs d'accompagner une coopérative." },
      { id: "b", text: "Apprendre les bases de la gestion d'entreprise." },
      { id: "c", text: "Trouver des aînés isolés à aider." },
      { id: "d", text: "Recruter des employés à temps plein." },
    ],
    correctOptionId: "a",
    explanation:
      "Nadia répond elle-même : « le plus difficile au début ? Convaincre les banques, justement, de prêter à une coopérative ». Il s'agit donc bien d'obtenir des financements pour un modèle peu connu des prêteurs.",
    vocabularyNotes: ["coopérative", "aînés isolés", "rentable", "prêter"],
    difficulty: "moyen",
  },
  {
    id: "ce-n6",
    skill: "CE",
    level: "B2",
    theme: "Technologies",
    sequence: "Item 24",
    passageType: "Article de vulgarisation",
    passage:
      "Chaque recherche internet, chaque vidéo en streaming, chaque mail stocké dans le cloud a un coût énergétique réel. Un simple e-mail avec pièce jointe équivaut à l'énergie d'une ampoule allumée pendant deux heures. Les experts appellent à consommer autrement : vider sa boîte, limiter le streaming en haute définition, privilégier le wifi au réseau mobile en intérieur. Sans interdire quoi que ce soit, ces petits gestes réduisent sensiblement l'empreinte numérique collective.",
    question: "Quelle est la recommandation principale de cet article ?",
    options: [
      { id: "a", text: "Interdire le streaming vidéo sur internet." },
      { id: "b", text: "Adopter des gestes simples pour réduire le coût énergétique du numérique." },
      { id: "c", text: "Supprimer tous les comptes en ligne." },
      { id: "d", text: "Utiliser uniquement le réseau mobile." },
    ],
    correctOptionId: "b",
    explanation:
      "L'article propose sans interdiction une série de « petits gestes » (vider sa boîte, limiter la haute définition, privilégier le wifi) pour réduire l'empreinte numérique. C'est une incitation, pas une interdiction.",
    vocabularyNotes: ["streaming", "cloud", "empreinte collective", "petits gestes"],
    difficulty: "moyen",
  },
  {
    id: "ce-n7",
    skill: "CE",
    level: "B2",
    theme: "Éducation",
    sequence: "Item 25",
    passageType: "Article de presse",
    passage:
      "Une étude publiée cette semaine confirme que les élèves qui pratiquent une activité artistique au moins deux heures par semaine améliorent leur concentration et leurs résultats en mathématiques. Les chercheurs se gardent de conclure à un lien de cause à effet direct : en effet, les élèves concernés bénéficient souvent aussi d'un environnement familial plus favorisé. Au-delà des chiffres, ils plaident pour maintenir les arts dans les programmes, non comme supplément, mais comme levier d'expression et d'engagement scolaire.",
    question: "Quelle précision les chercheurs apportent-ils sur les résultats de l'étude ?",
    options: [
      { id: "a", text: "Les résultats confirment un lien strict de cause à effet entre arts et mathématiques." },
      { id: "b", text: "Les élèves pratiquants viennent souvent aussi de milieux plus favorisés." },
      { id: "c", text: "La pratique artistique diminue la concentration scolaire." },
      { id: "d", text: "Les arts ne devraient plus faire partie des programmes." },
    ],
    correctOptionId: "b",
    explanation:
      "Les chercheurs « se gardent de conclure à un lien de cause à effet direct », car les élèves concernés bénéficient souvent d'un environnement familial plus favorisé. La bonne réponse traduit cette prudence méthodologique.",
    vocabularyNotes: ["cause à effet", "environnement favorisé", "levier", "programmes"],
    difficulty: "moyen",
  },
  {
    id: "ce-n8",
    skill: "CE",
    level: "C1",
    theme: "Environnement",
    sequence: "Item 26",
    passageType: "Interview",
    passage:
      "« La tarification carbone a mauvaise presse, mais c'est le seul outil qui agit d'emblée sur tous les comportements. Son problème n'est pas économique, il est social : si elle n'est pas accompagnée de redistribution, elle frappe d'abord les ménages qui n'ont pas les moyens de changer de véhicule ou d'isoler leur maison. La leçon des pays qui l'ont adoptée avec succès, c'est qu'elle ne se décrète pas seule : elle s'accompagne d'un chèque vert ou d'une baisse d'impôts qui la rend acceptable. » — propos recueillis auprès d'A. Marchand, économiste.",
    question: "Que préconise l'économiste pour rendre la tarification carbone acceptable ?",
    options: [
      { id: "a", text: "La supprimer pour éviter de pénaliser les ménages." },
      { id: "b", text: "L'accompagner de mesures de redistribution, comme un chèque vert." },
      { id: "c", text: "L'appliquer uniquement aux entreprises." },
      { id: "d", text: "La remplacer par une taxe sur le véhicule électrique." },
    ],
    correctOptionId: "b",
    explanation:
      "L'économiste est catégorique : la tarification carbone doit être « accompagnée de redistribution » (chèque vert, baisse d'impôts) pour être acceptée. Il ne préconise ni sa suppression ni une application aux seules entreprises.",
    vocabularyNotes: ["tarification carbone", "redistribution", "chèque vert", "acceptable"],
    difficulty: "difficile",
  },
  {
    id: "ce-n9",
    skill: "CE",
    level: "C1",
    theme: "Technologies",
    sequence: "Item 27",
    passageType: "Chronique",
    passage:
      "La ville intelligente, telle qu'on la présente, serait une ville où des capteurs optimisent la circulation et réduisent consommations et émissions. Le piège est insidieux : pour optimiser, il faut mesurer, et pour mesurer, il faut collecter. À force d'ajouter des capteurs, on transforme l'espace public en lieu de surveillance quotidienne des habitants. La vraie question n'est donc pas la performance des capteurs, mais qui contrôle les données et selon quelles règles. Une ville n'est intelligente que si ses habitants gardent la main sur ses systèmes.",
    question: "Quel piège la chronique associe-t-elle à la ville intelligente ?",
    options: [
      { id: "a", text: "La ville intelligente ralentit la circulation." },
      { id: "b", text: "L'optimisation par capteurs débouche sur une surveillance généralisée." },
      { id: "c", text: "Les capteurs coûtent trop cher aux municipalités." },
      { id: "d", text: "Les données sont utilisées pour augmenter les impôts." },
    ],
    correctOptionId: "b",
    explanation:
      "La chronique décrit un « piège insidieux » : pour optimiser il faut mesurer, donc collecter, jusqu'à transformer l'espace public en lieu de surveillance. Le vrai enjeu devient le contrôle des données. C'est la dérive dénoncée.",
    vocabularyNotes: ["capteurs", "surveillance", "données", "espace public"],
    difficulty: "difficile",
  },
  {
    id: "ce-n10",
    skill: "CE",
    level: "C1",
    theme: "Santé",
    sequence: "Item 28",
    passageType: "Article de vulgarisation",
    passage:
      "Les applications de santé qui comptent nos pas, notre sommeil et nos pulsations nourrissent une promesse : mieux se connaître pour mieux se gouverner. Or les études d'usage montrent le contraire : l'objectif finit trop souvent par être la performance des chiffres, et non la sensation de bien-être. Certains utilisateurs développent une anxiété face aux données, à l'inverse de l'effet attendu. Les spécialistes rappellent que ces outils ne valent que s'ils restent au service d'une intuition personnelle et d'un dialogue avec un professionnel.",
    question: "Comment les spécialistes considèrent-ils ces applications ?",
    options: [
      { id: "a", text: "Elles remplacent utilement la consultation médicale." },
      { id: "b", text: "Elles sont dangereuses et devraient être interdites." },
      { id: "c", text: "Elles ne servent que si elles restent au service de l'intuition et du suivi professionnel." },
      { id: "d", text: "Elles mesurent fidèlement le niveau réel de bien-être." },
    ],
    correctOptionId: "c",
    explanation:
      "Les spécialistes n'interdisent pas ces outils mais les encadrent : « ils ne valent que s'ils restent au service d'une intuition personnelle et d'un dialogue avec un professionnel ». Ni remplacement du médecin, ni interdiction.",
    vocabularyNotes: ["applications", "intuition", "bien-être", "professionnel"],
    difficulty: "difficile",
  },
  {
    id: "ce-n11",
    skill: "CE",
    level: "C2",
    theme: "Société",
    sequence: "Item 29",
    passageType: "Essai",
    passage:
      "On a longtemps pensé la densité urbaine comme un mal : entassement, stress, spéculation. La crise du logement et la crise climatique invitent pourtant à la reconsidérer. Une ville dense, bien desservie, produit par mètre carré bien moins d'émissions qu'une ville étalée : elle raccourcit les trajets, mutualise les services et préserve les terres agricoles. Le problème n'est donc pas la densité, c'est l'architecture des inégalités qui s'y loge : le coût du foncier chasse les classes moyennes vers des périphéries mal desservies. Densifier oui, mais en pensant l'habitation collective et les logements d'abord.",
    question: "Quelle est la position de l'auteur sur la densité urbaine ?",
    options: [
      { id: "a", text: "La densité doit être rejetée car elle accentue la spéculation." },
      { id: "b", text: "La densité est souhaitable à condition d'être pensée avec l'habitat collectif et les logements d'abord." },
      { id: "c", text: "L'étalement urbain est la seule solution écologique." },
      { id: "d", text: "La densité profite uniquement aux classes moyennes." },
    ],
    correctOptionId: "b",
    explanation:
      "L'auteur reconsidère la densité comme bénéfique sur le plan climatique, à condition de traiter « l'architecture des inégalités » : « densifier oui, mais en pensant l'habitation collective et les logements d'abord ». La nuance est essentielle.",
    vocabularyNotes: ["densité", "étalement", "foncier", "logements d'abord"],
    difficulty: "difficile",
  },
  {
    id: "ce-n12",
    skill: "CE",
    level: "C2",
    theme: "Économie",
    sequence: "Item 30",
    passageType: "Éditorial économique",
    passage:
      "Vouloir à tout prix attirer les « talents » en reproduisant les politiques des autres métropoles revient à entrer dans une enchère qui ne profite qu'aux salaires, sans jamais régler la question de fond : celle du logement et de la qualité de vie qui retiennent ces mêmes talents. Les villes gagnantes sont celles qui investissent dans l'école et la culture plus que dans les incubateurs de start-ups. Attirer n'est pas retenir : et l'on ne retient pas des travailleurs qualifiés avec des marchés de l'immobilier inaccessibles.",
    question: "Quelle idée résume la thèse de l'éditorialiste ?",
    options: [
      { id: "a", text: "Les métropoles doivent se faire concurrence sur les salaires pour retenir les talents." },
      { id: "b", text: "La qualité de vie et l'investissement dans les services publics retiennent les talents mieux qu'une guerre des salaires." },
      { id: "c", text: "Les incubateurs de start-ups sont la priorité des villes gagnantes." },
      { id: "d", text: "L'attrait des talents dépend uniquement du nombre d'entreprises." },
    ],
    correctOptionId: "b",
    explanation:
      "L'éditorialiste oppose « attirer » et « retenir » : les villes gagnantes investissent « dans l'école et la culture plus que dans les incubateurs ». Retenir, c'est offrir logement et qualité de vie, non gonfler les salaires.",
    vocabularyNotes: ["talent", "enchère", "retenir", "qualité de vie"],
    difficulty: "difficile",
  },
];

export const cefrLevels = ["A1", "A2", "B1", "B2", "C1", "C2"] as const;

export function getQuestionsForSkill(skill: "CO" | "CE"): QcmQuestion[] {
  return skill === "CO"
    ? [...comprehensionOraleQuestions, ...comprehensionOraleC2Questions]
    : [...comprehensionEcriteQuestions, ...comprehensionEcriteC2Questions];
}

export function getQuestionsForLevel(
  skill: "CO" | "CE",
  level: (typeof cefrLevels)[number]
): QcmQuestion[] {
  return getQuestionsForSkill(skill).filter((q) => q.level === level);
}