import { CourseStep, CourseStepId, LessonExercise } from "@/lib/types";

/**
 * PARCOURS D'APPRENTISSAGE PROGRESSIF — TCF Canada.
 *
 * Plan de formation structuré en 4 étapes, calqué sur la progression officielle
 * du CECRL (A1 → C2) et sur les tâches du TCF Canada :
 *
 *   1. Compréhension Orale    — structures, repérage, mini-dialogues, audio simulés
 *   2. Compréhension Écrite   — lecture rapide, documents admin / publicité / presse
 *   3. Expression Écrite      — méthodologie des 3 tâches + grille d'évaluation
 *   4. Expression Orale       — guide méthodologique des 3 tâches + enregistrement
 *
 * Chaque leçon = contenu théorique (théorie) puis exercice pratique réutilisant
 * la banque d'exercices (quiz, rédaction ou enregistrement).
 */

const CO_QUIZ = (level: "A1" | "A2" | "B1" | "B2" | "C1" | "C2", count = 3): LessonExercise => ({
  kind: "quiz",
  skill: "CO",
  level,
  count,
});

const CE_QUIZ = (level: "A1" | "A2" | "B1" | "B2" | "C1" | "C2", count = 3): LessonExercise => ({
  kind: "quiz",
  skill: "CE",
  level,
  count,
});

export const courseSteps: CourseStep[] = [
  // ========================================================================
  // ÉTAPE 1 — COMPRÉHENSION ORALE
  // ========================================================================
  {
    id: 1,
    skill: "CO",
    title: "Compréhension Orale",
    chapter: "Module CO — Structures, repérage et audio simulés",
    subtitle:
      "Maîtrisez les structures de phrases, apprenez à repérer les informations clés, puis entraînez-vous sur des mini-dialogues et des audio simulés.",
    icon: "headphones",
    lessons: [
      {
        id: "co-1-1",
        step: 1,
        order: 1,
        level: "A1",
        title: "Structures de base et présentations",
        objective:
          "Comprendre les phrases simples de la vie quotidienne : présentations, horaires, prix, indiquer une action.",
        durationMinutes: 20,
        minScoreToPass: 60,
        theory: [
          {
            heading: "Les structures de phrases simples",
            content: [
              "À l'oral, ordonnez vos repérages : qui parle ? (pronom/verbe) → à qui ? → où ? → quand ? → combien ?",
              "Repérez d'abord les mots-clés porteurs de sens : noms (train, prix, rendez-vous), verbes (démarrer, ouvrir, partir), chiffres et heures.",
              "Les consignes du TCF : les questions de niveau A1 portent sur l'information directe — la bonne réponse est formulée presque mot pour mot.",
            ],
            tip: "Ne traduisez pas : écoutez par blocs de sens. « Le vol AC 42 va commencer à embarquer à la porte 12 » → action (embarquer) + lieu (porte 12).",
            examples: [
              "« Le vol pour Toronto va commencer à embarquer à la porte numéro 12. » → Q : Que font les passagers ? R : Ils embarquent à la porte 12.",
              "« Dimanche matin, c'est parfait. À dix heures, au café. » → Q : Quand ? R : Dimanche matin à dix heures.",
            ],
          },
          {
            heading: "La technique du repérage d'informations clés",
            content: [
              "Avant l'écoute, lisez la question et anticipez le type d'information attendue (un lieu ? une heure ? un prix ? une raison ?).",
              "Pendant l'écoute, notez sur une feuille les éléments factuels : chiffres, heures, lieux, personnes.",
              "Après l'écoute, éliminez les options absentes du message ou en contradiction avec lui.",
            ],
            tip: "Au TCF réel, chaque audio n'est diffusé qu'UNE fois. Entraînez-vous en n'écoutant chaque mini-dialogue qu'une seule fois.",
          },
        ],
        exercise: CO_QUIZ("A1", 3),
      },
      {
        id: "co-1-2",
        step: 1,
        order: 2,
        level: "A2",
        title: "Repérage dans les annonces et messages",
        objective:
          "Repérer une information précise dans des annonces publiques (gare, aéroport, répondeur) et des messages quotidiens.",
        durationMinutes: 25,
        minScoreToPass: 60,
        theory: [
          {
            heading: "Les annonces publiques : structure type",
            content: [
              "Une annonce suit presque toujours le même squelette : situation → contrainte → action attendue → excuse/détail.",
              "Au niveau A2, le piège est l'information « en plus » : une annonce qui mentionne un retard mentionne aussi une voie. Questionnez-vous : quelle est LA réponse demandée ?",
              "Les messages sur répondeur combinent : raison de l'appel → consignes → conditions (jours, heures).",
            ],
            tip: "En cas de doute entre deux options proches, préférez celle qui reprend exactement un élément factuel du message, sans lui ajouter d'info.",
            examples: [
              "« Le train partira avec un retard d'environ vingt minutes, de la voie numéro 5. » → Retard (20 min) + voie (5).",
              "« En cas d'urgence, contactez le 911 ou rendez-vous à l'hôpital Saint-Joseph. » → Action : urgence = 911 ou hôpital.",
            ],
          },
          {
            heading: "Comprendre un message téléphonique",
            content: [
              "Écoutez le début : l'appelant annonce généralement le but (« je vous rappelle pour... »).",
              "Relevez les conditions : jours, horaires, numéros, procédures en cas d'urgence.",
              "Distinguez ce qui est conseillé (« nous vous recommandons... ») de ce qui est obligatoire (« il faut... »).",
            ],
            tip: "Aux niveaux A1-A2, la réponse correcte paraphrase rarement : elle colle au message. Méfiez-vous de la réponse « séduisante » mais non énoncée.",
          },
        ],
        exercise: CO_QUIZ("A2", 3),
      },
      {
        id: "co-1-3",
        step: 1,
        order: 3,
        level: "B1",
        title: "Mini-dialogues du quotidien",
        objective:
          "Suivre le fil d'un échange (client/service, travail, aménagement) et comprendre l'intention de chaque locuteur.",
        durationMinutes: 30,
        minScoreToPass: 60,
        theory: [
          {
            heading: "Suivre un échange entre deux personnes",
            content: [
              "Identifiez à tour de rôle ce que veut CHAQUE locuteur : une demande, une objection, une proposition, un accord.",
              "Les questions du TCF au niveau B1 portent souvent sur la FINALITÉ : quelle est l'intention de la personne ? Que propose-t-elle ?",
              "Repérez les reformulations : le locuteur répète souvent l'essentiel avec d'autres mots — c'est un indice de l'information importante.",
            ],
            tip: "Faites la différence entre ce qui est dit et ce qui est proposé. Dans un dialogue client/service, la réponse « service » est presque toujours une proposition d'action.",
            examples: [
              "Client : « Je n'ai rien reçu. » → Conseiller : « Je vais vérifier auprès du transporteur et vous tenir au courant. » → Ce qui est proposé : une vérification + un suivi.",
            ],
          },
          {
            heading: "Comprendre l'implicite léger",
            content: [
              "Au niveau B1, le sens explicite reste dominant, mais des indices de politesse, de regret, d'hésitation signalent l'attitude du locuteur.",
              "Les formules « je regrette », « malheureusement », « il faudrait » orientent vers la réponse attendue.",
              "Gérez le décalage : le locuteur peut refuser poliment puis proposer une alternative. La question porte alors sur l'alternative.",
            ],
            tip: "Une objection n'est pas une fin de conversation : écoutez ce qui suit. L'accord final (« c'est parfait ») est l'information qu'on vous demandera souvent.",
          },
        ],
        exercise: CO_QUIZ("B1", 3),
      },
      {
        id: "co-1-4",
        step: 1,
        order: 4,
        level: "B2",
        title: "Reportages, interviews et idées principales",
        objective:
          "Dégager la thèse d'un reportage ou d'une interview et identifier les informations importantes par rapport aux détails.",
        durationMinutes: 35,
        minScoreToPass: 65,
        theory: [
          {
            heading: "Distinguer information principale et détails",
            content: [
              "Un reportage s'articule autour d'un sujet (le « fil rouge ») : repérez-le dès la première phrase.",
              "Les chiffres, noms propres et dates sont des détails au service de l'idée : notez-les, mais rattachez-les toujours au thème.",
              "Les citations (« selon le maire... », « les riverains estiment... ») introduisent des points de vue différents. Identifiez QUI dit QUOI.",
            ],
            tip: "Pour les questions « qu'est-ce qui pose problème / qu'est-ce qui change », concentrez-vous sur les parties de l'audio contenant des mots d'opinion : estime, redoute, se plaint, salue.",
            examples: [
              "« La ligne de tramway sera mise en service au printemps... Les riverains se disent toutefois préoccupés par le niveau de bruit. » → Le point de vue cité : inquiétude sur le bruit.",
            ],
          },
          {
            heading: "Le registre du journalisme",
            content: [
              "Les reportages utilisent des verbes introducteurs et des nominalisations : vous devez reformuler mentalement « l'entreprise annonce une hausse » → « il y a une hausse ».",
              "Repérez les marqueurs d'opposition : cependant, toutefois, en revanche, or — ils signalent le virage argumentatif, souvent attendu dans les questions.",
              "Enfin, soyez attentif aux causes et conséquences : « parce que », « c'est pourquoi », « grâce à », « ce qui a conduit à ».",
            ],
            tip: "Avant de répondre, formulez la phrase : « Ce reportage parle de ... et le problème/le point est ... ». Cette synthèse vous donne la bonne réponse dans 90 % des cas.",
          },
        ],
        exercise: CO_QUIZ("B2", 3),
      },
      {
        id: "co-1-5",
        step: 1,
        order: 5,
        level: "C2",
        title: "Chroniques et débats : nuances et implicite",
        objective:
          "Comprendre des textes oraux complexes : argumentation, abstraction, positions nuancées et termes techniques.",
        durationMinutes: 40,
        minScoreToPass: 70,
        theory: [
          {
            heading: "Analyser un commentaire complexe",
            content: [
              "Au niveau avancé, la question ne porte plus sur le repérage mais sur la SYNTHÈSE : quelle idée résume la position de l'orateur ?",
              "Les orateurs avancent des thèses nuancées (« pas seulement... mais aussi... ») : la bonne réponse combine les deux pôles de la nuance.",
              "Repérez le cadre argumentatif : la thèse défendue, l'objection concédée, la conséquence tirée.",
            ],
            tip: "Écartez les réponses extrêmes et les réponses qui ne reprennent qu'une moitié de la thèse : au niveau C1, la bonne réponse est souvent la formulation la plus équilibrée.",
            examples: [
              "« La souveraineté n'est plus défensive, elle est normative. » → Synthèse : la puissance se mesure à l'influence sur les règles, pas à la seule protection.",
            ],
          },
          {
            heading: "Vocabulaire abstrait et rendu du discours",
            content: [
              "Mémorisez le vocabulaire de l'abstraction : enjeu, redevabilité, instrumentalisation, polarisation, dialectique.",
              "Le niveau C1 exige de replacer chaque idée dans le projet de l'orateur : que cherche-t-il à démontrer ?",
              "Les questions portent souvent sur la « thèse », le « paradoxe », « l'idée résumant le mieux » l'extrait.",
            ],
            tip: "Pendant l'écoute, notez 3-4 mots abstraits ou oppositions ; ils dessinent la carte argumentative de l'audio.",
          },
        ],
        exercise: CO_QUIZ("C2", 3),
      },
    ],
  },

  // ========================================================================
  // ÉTAPE 2 — COMPRÉHENSION ÉCRITE
  // ========================================================================
  {
    id: 2,
    skill: "CE",
    title: "Compréhension Écrite",
    chapter: "Module CE — Lecture rapide, documents et presse",
    subtitle:
      "Développez les techniques de lecture rapide et entraînez-vous sur des documents administratifs, publicitaires et articles de presse.",
    icon: "book",
    lessons: [
      {
        id: "ce-2-1",
        step: 2,
        order: 1,
        level: "A1",
        title: "Lecture rapide : panneaux et annonces",
        objective:
          "Lire l'essentiel d'un panneau, d'un horaire ou d'un court message : le public concerné, l'action, les conditions.",
        durationMinutes: 20,
        minScoreToPass: 60,
        theory: [
          {
            heading: "Les stratégies du repérage visuel",
            content: [
              "Attaquez le document en diagonale : titres, mots en majuscules, chiffres, dates, heures.",
              "Repérez les mots de restriction : réservé, interdit, uniquement, sauf, uniquement en magasin.",
              "Reliez les indices à la question : QUI ? (public cible) / QUOI ? (action ou information) / QUAND ? (dates, horaires) / COMBIEN ? (prix, quantités).",
            ],
            tip: "La réponse aux questions A1 se trouve presque toujours dans un mot-clé du texte. Soulignez-le avant de choisir.",
            examples: [
              "« PARKING RÉSERVÉ AUX PERSONNES HANDICAPÉES » → mot-clé : réservé → public exclusif.",
              "« Samedi : 10h - 16h » → ouverture du samedi : 10h.",
            ],
          },
          {
            heading: "Titres et mise en forme",
            content: [
              "Au TCF, les documents A1 sont très visuels : titre, liste, horaires. La mise en page EST porteuse de sens.",
              "Méfiez-vous des intrus visuels : une information affichée en grand n'est pas forcément celle demandée.",
            ],
            tip: "S'entraîner à lire vite, c'est s'entraîner à skimmer : parcourez le document en 5 secondes, puis allez à la question.",
          },
        ],
        exercise: CE_QUIZ("A1", 3),
      },
      {
        id: "ce-2-2",
        step: 2,
        order: 2,
        level: "A2",
        title: "Documents administratifs et annonces",
        objective:
          "Comprendre les documents officiels simples : avis, annonces, règlements : obligations, interdictions, démarches.",
        durationMinutes: 25,
        minScoreToPass: 60,
        theory: [
          {
            heading: "Comprendre les obligations et interdictions",
            content: [
              "Les annonces administratives combinent un fait (interruption, maintenance, changement) et une consigne (merci de..., il est interdit de..., veuillez...).",
              "Relevez systématiquement les conditions et exclusions : « uniquement », « à partir du », « jusqu'au », « non cumulable », « sous 10 jours ».",
              "La question A2 porte souvent sur la CONSIGNE : que doit faire le lecteur ?",
            ],
            tip: "Faites deux colonnes mentales : FAITS (ce qui se passe) / CONSIGNES (ce que le lecteur doit faire). La question teste presque toujours une colonne.",
            examples: [
              "« L'ascenseur sera en maintenance jeudi de 8h à 12h. Merci d'utiliser l'escalier de service. » → Consigne : escalier de service.",
              "« Promo jusqu'au 31 janvier, uniquement en magasin, non cumulable. » → Conditions : date + lieu + non-cumul.",
            ],
          },
          {
            heading: "Le lexique du documentaire",
            content: [
              "Mémorisez : maintenance, fermeture exceptionnelle, se présenter muni de, sous réserve de, à compter de, dérogation.",
              "Les reformulations : « posséder un permis de travail valide » = « être autorisé à travailler ».",
            ],
            tip: "Quand deux conditions semblent contradictoires, l'ordre des phrases reflète la hiérarchie : la dernière consigne prime souvent.",
          },
        ],
        exercise: CE_QUIZ("A2", 3),
      },
      {
        id: "ce-2-3",
        step: 2,
        order: 3,
        level: "B1",
        title: "Publicités, notices et informations pratiques",
        objective:
          "Interpréter un document à visée commerciale ou informative : avantages, conditions, offre, public visé.",
        durationMinutes: 30,
        minScoreToPass: 60,
        theory: [
          {
            heading: "Décoder un document à visée persuasive",
            content: [
              "Publicités, promotions et offres jouent sur un registre positif : avantages, « jusqu'à -40 % », « limité ». Cherchez les limites sous le marketing.",
              "Le texte distingue : l'annonce (le produit/l'offre), les conditions (dates, lieu, exclusions) et l'incitation à agir.",
              "Exercez-vous à reformuler : « jusqu'au 31 janvier » → fin de validité = 31 janvier.",
            ],
            tip: "La question B1 ne porte pas sur l'attrait de l'offre mais sur sa logique : ce qu'elle permet, ce qu'elle exclut, ce qu'elle coûte.",
            examples: [
              "« Aucune expérience requise. Les candidats doivent posséder un permis de travail valide. » → L'unique condition : permis valide.",
              "« Le délai total dépend de l'âge du candidat. » → Facteur déterminant : l'âge + l'expérience.",
            ],
          },
          {
            heading: "La hiérarchie de l'information",
            content: [
              "Dans un texte court, distinguez l'information principale des précisions secondaires (exemples, conditions particulières).",
              "Les connecteurs de conséquence (en conséquence, par conséquent, ainsi) signalent ce qui découle — souvent la réponse.",
            ],
            tip: "Repérez la phrase qui répond à la question AVANT de lire les options ; comparez ensuite sans vous laisser guider par la formulation.",
          },
        ],
        exercise: CE_QUIZ("B1", 3),
      },
      {
        id: "ce-2-4",
        step: 2,
        order: 4,
        level: "B2",
        title: "Articles de presse : idée principale et nuances",
        objective:
          "Lire des articles de presse et extraire l'idée principale, les nuances et les implications, au-delà du mot à mot.",
        durationMinutes: 35,
        minScoreToPass: 65,
        theory: [
          {
            heading: "La méthode SQ3R appliquée au TCF",
            content: [
              "Survol : parcourez titre, introduction et conclusion pour capter le sujet.",
              "Question : convertissez le titre en question (De quoi parle-t-il ? Qu'est-ce qui change ?).",
              "Lecture active : soulignez les thèses, les données chiffrées, les citations.",
              "Restitution : résumez en une phrase ; Revoyez : vérifiez que les options ne contredisent pas ce résumé.",
            ],
            tip: "Pour les questions « selon l'auteur », la bonne réponse est la reformulation de la THÈSE, pas un détail ni une contrevérité.",
            examples: [
              "« Le télétravail... un tableau contrasté : autonomie mais difficultés d'évaluation. » → Synthèse : gains d'autonomie + difficultés de gestion = réponse attendue.",
            ],
          },
          {
            heading: "Reformuler sans déformer",
            content: [
              "La réponse correcte utilise des synonymes et des permutations de structure : elle EQUIVAUT au texte sans le copier.",
              "Éliminez les options qui introduisent une généralisation excessive (« totalement », « jamais », « tous ») non présente dans le texte.",
              "Attention aux pièges inversés : une option peut reprendre les mots du texte mais inverser le sens (cause/conséquence).",
            ],
            tip: "La nuance qui change tout au B2 : l'auteur ne dit pas la même chose que les personnes qu'il cite.",
          },
        ],
        exercise: CE_QUIZ("B2", 3),
      },
      {
        id: "ce-2-5",
        step: 2,
        order: 5,
        level: "C2",
        title: "Essais, éditoriaux et lecture fine",
        objective:
          "Analyser des textes denses et abstraits : thèse, critique, position de l'auteur, connotations et registre.",
        durationMinutes: 40,
        minScoreToPass: 70,
        theory: [
          {
            heading: "Lire la position de l'auteur",
            content: [
              "Repérez d'abord ce que l'auteur critique : il s'appuie souvent sur une idée reçue pour la réfuter (« dénier à la littérature toute portée... est réducteur »).",
              "Identifiez la thèse positive (ce que l'auteur affirme À LA PLACE de l'idée reçue) : généralisée souvent en une formule.",
              "Distinguer l'analyse de ses objets : l'auteur analyse un discours, une pratique ou une institution — la question porte sur SON analyse.",
            ],
            tip: "Au niveau C2, écartez les lectures littérales et les jugements moraux. La bonne réponse restitue le mouvement argumentatif : critique → thèse → conséquence.",
            examples: [
              "« Le discours du local détourne l'attention des enjeux de redistribution. » → Position : critique de l'usage politique du « local ».",
            ],
          },
          {
            heading: "Le vocabulaire de l'analyse",
            content: [
              "Niveau C2 oblige : il faut connaître les mots de la nuance (paradoxalement, sous couvert de, au nom de) et de la structure argumentative (thèse, objection, concession).",
              "La question teste votre capacité à DÉGAGER la thèse et non à résumer le texte : reformulez en une proposition abstraite.",
            ],
            tip: "Relisez la première et la dernière phrase : l'encadrement du texte contient presque toujours la clé de la position de l'auteur.",
          },
        ],
        exercise: CE_QUIZ("C2", 3),
      },
    ],
  },

  // ========================================================================
  // ÉTAPE 3 — EXPRESSION ÉCRITE
  // ========================================================================
  {
    id: 3,
    skill: "EE",
    title: "Expression Écrite",
    chapter: "Module EE — Méthodologie des 3 tâches",
    subtitle:
      "Appliquez la méthode officielle : message court (40-60 mots), article/compte-rendu (120-150 mots) et essai argumenté (120-150 mots), avec compteur strict et grille d'auto-évaluation.",
    icon: "pen",
    lessons: [
      {
        id: "ee-3-1",
        step: 3,
        order: 1,
        level: "B1",
        title: "Tâche 1 — Rédiger un message ou un courriel",
        objective:
          "Rédiger un message clair et complet (40-60 mots) : demander, signaler, contester ou s'excuser avec un registre adapté.",
        durationMinutes: 30,
        minScoreToPass: 70,
        theory: [
          {
            heading: "La structure en 5 blocs du message",
            content: [
              "1) Formule d'appel adaptée au destinataire (Bonjour Madame X / Madame, Monsieur).",
              "2) Le contexte : qui vous êtes, pourquoi vous écrivez (je me permets de vous écrire pour...).",
              "3) Le cœur : l'objet concret de votre demande (problème, prix, dates, références).",
              "4) L'action attendue : que doit faire le destinataire ? (vérifier, appeler, remplacer, confirmer).",
              "5) La formule de politesse finale (Merci, je vous salue, Cordialement).",
            ],
            tip: "40 à 60 mots : PERDU si sous 40 (texte non corrigé au TCF) ; un message est TOUJOURS structuré, même bref. Comptez vos mots avant de soumettre.",
            examples: [
              "« Bonjour, je vous écris pour signaler que le chauffage de mon appartement ne fonctionne plus. Pouvez-vous me proposer une intervention rapide ? Merci. Camille »",
            ],
          },
          {
            heading: "Le registre : formel vs familier",
            content: [
              "Un message à un propriétaire, un assureur, une administration = registre formel : formules figées (je vous prie de, dans l'attente de).",
              "À un ami/voisin = registre neutre : courtois mais naturel (tu peux...).",
              "Le mélange des registres est typiquement sanctionné par les correcteurs du TCF.",
            ],
            tip: "Réapprenez les formules d'appel et de clôture par cœur : elles rapportent gros pour peu de mots. « Je vous remercie par avance » « Cordialement ».",
          },
        ],
        exercise: { kind: "writing", level: "B2", taskNumber: 1 },
      },
      {
        id: "ee-3-2",
        step: 3,
        order: 2,
        level: "B2",
        title: "Tâche 2 — Article, récit ou compte-rendu",
        objective:
          "Rédiger un texte organisé de 120-150 mots : informer et raconter avec une progression logique et des connecteurs.",
        durationMinutes: 35,
        minScoreToPass: 70,
        theory: [
          {
            heading: "La méthode du texte organisé",
            content: [
              "Tâche 2 = communiquer une information (compte-rendu, article, récit). Trois types possibles : raconter (chronologie), décrire/expliquer, rendre compte d'un événement.",
              "Structure en 3 paragraphes : introduction (sujet + contexte), développement (faits / aspects), conclusion (bilan ou ouverture).",
              "Utilisez des connecteurs : tout d'abord, ensuite, enfin ; cependant, par ailleurs ; c'est pourquoi.",
            ],
            tip: "120-150 mots : ne descendez jamais sous 120. Un compte-rendu doit mentionner : QUOI (l'événement), QUAND, LIEU, ce qui a marqué, et ce qu'on en retient.",
            examples: [
              "Compte-rendu : « Le 12 novembre, j'ai assisté à la conférence... L'intervenante a présenté... Un point a particulièrement retenu mon attention... J'ai retenu que... »",
            ],
          },
          {
            heading: "Le respect de la consigne",
            content: [
              "Relisez la consigne et cochez ce qu'elle demande : destinataire, type de texte, informations à inclure.",
              "Le hors-sujet (texte général qui ne répond pas à la situation) est éliminatoire au TCF : restez ancré dans la situation donnée.",
              "Ne copiez pas le sujet : reformulez et développez avec vos propres idées.",
            ],
            tip: "L'auto-évaluation officielle : respect du nombre de mots (120-150), cohérence (paragraphes + connecteurs), qualité de la langue.",
          },
        ],
        exercise: { kind: "writing", level: "C1", taskNumber: 2 },
      },
      {
        id: "ee-3-3",
        step: 3,
        order: 3,
        level: "C1",
        title: "Tâche 3 — L'essai argumenté",
        objective:
          "Défendre un point de vue (120-150 mots) sur un sujet de société : thèse, arguments hiérarchisés, exemples, nuance.",
        durationMinutes: 40,
        minScoreToPass: 70,
        theory: [
          {
            heading: "La structure du mini-essai",
            content: [
              "1) Introduction : annoncez le sujet et VOTRE position (la thèse) dès la première phrase.",
              "2) Développement : 2 à 3 arguments ordonnés, chacun illustré par un exemple concret.",
              "3) Une nuance : reconnaissez un contre-argument et répondez-y (certes... mais).",
              "4) Conclusion : réaffirmez votre position sans la recopier.",
            ],
            tip: "Une thèse n'est pas un simple « pour/contre » : elle précise une condition (« à condition que »), une limite (« dans une certaine mesure »), un critère.",
            examples: [
              "« Le télétravail est une avancée, à condition d'être encadré » → thèse nuancée, défendable.",
            ],
          },
          {
            heading: "Les outils de l'argumentation",
            content: [
              "Connecteurs logiques : d'une part/d'autre part, toutefois, en revanche, par conséquent, en définitive.",
              "Mots de la thèse : à mon avis, je considère que, il me semble que, je suis favorable/opposé à.",
              "Les exemples : anecdotes personnelles, faits d'actualité, données chiffrées (soyez crédible, les chiffres exacts ne sont pas exigés mais vraisemblables).",
            ],
            tip: "L'auto-évaluation au niveau C1 : position claire, arguments illustrés, vocabulaire précis, syntaxe de la complexité (propositions relatives, subordonnées de concession).",
          },
        ],
        exercise: { kind: "writing", level: "C2", taskNumber: 3 },
      },
    ],
  },

  // ========================================================================
  // ÉTAPE 4 — EXPRESSION ORALE
  // ========================================================================
  {
    id: 4,
    skill: "EO",
    title: "Expression Orale",
    chapter: "Module EO — Guide méthodologique des 3 tâches",
    subtitle:
      "Apprenez la méthode officielle des 3 tâches orales, entraînez-vous avec l'enregistrement audio du navigateur, puis évaluez votre production.",
    icon: "mic",
    lessons: [
      {
        id: "eo-4-1",
        step: 4,
        order: 1,
        level: "B1",
        title: "Tâche 1 — L'entretien dirigé",
        objective:
          "Parler de soi, de son parcours et de ses projets : répondre avec fluidité à des questions personnelles.",
        durationMinutes: 25,
        minScoreToPass: 70,
        theory: [
          {
            heading: "Comprendre la tâche 1 (≈ 1,5 à 2 min)",
            content: [
              "L'examinateur pose une série de questions personnelles : identité, origine, parcours, situation actuelle, projets.",
              "Ce n'est pas une dissertation : répondez précisément à chaque question puis laissez-vous guider.",
              "L'objectif est de montrer votre capacité à parler de vous SANS texte préparé.",
            ],
            tip: "Préparez un « stock de phrases » à adapter : je m'appelle / je suis originaire de / après mes études / depuis mon arrivée / je projette de.",
            examples: [
              "« Parlez-moi de votre arrivée au Canada. » → Répondez en 3 temps : contexte → démarche → situation actuelle.",
            ],
          },
          {
            heading: "Techniques de fluidité",
            content: [
              "Utilisez les expressions de liaison naturelles : en fait, au début, ensuite, aujourd'hui.",
              "Si vous cherchez un mot, paraphraze : « c'est une machine qui permet de... » plutôt que de rester silencieux.",
              "Le temps de parole est court : structurez vos réponses (d'abord, ensuite, enfin) même pour une simple présentation.",
            ],
            tip: "Enregistrez-vous, réécoutez-vous : vérifiez le débit (ni trop lent ni trop rapide), la fluidité et l'articulation.",
          },
        ],
        exercise: { kind: "speaking", level: "B1", taskNumber: 1 },
      },
      {
        id: "eo-4-2",
        step: 4,
        order: 2,
        level: "B2",
        title: "Tâche 2 — L'exercice d'interaction",
        objective:
          "Poser des questions appropriées à partir d'une situation : obtenir des informations précises, complètes et polies.",
        durationMinutes: 30,
        minScoreToPass: 70,
        theory: [
          {
            heading: "Le principe de la tâche 2",
            content: [
              "L'examinateur incarne un rôle (agent immobilier, conseillère, responsable). Vous devez obtenir les informations nécessaires à votre décision.",
              "On attend des QUESTIONS, pas un monologue : variez les points abordés (coût, conditions, délais, exigences, procédures).",
              "Utilisez des introducteurs polis : pourriez-vous, j'aimerais savoir, serait-il possible de.",
            ],
            tip: "Préparez-vous à reformuler : si une réponse est vague, relancez — « Pour être précis, combien... ? »",
            examples: [
              "« Quels sont les frais exacts ? » « Les charges sont-elles incluses ? » « Quelles aides existent pour les nouveaux entrepreneurs ? »",
            ],
          },
          {
            heading: "La qualité des questions",
            content: [
              "Visez la COMPLÉTUDE : couvrez 4-5 dimensions (montant, délai, conditions, documents, échéances).",
              "Variez les structures interrogatives : interrogation directe (où, combien), inversion, est-ce que, et les formes polies (je voudrais savoir si...).",
              "Répondez aussi aux questions que l'examinateur vous pose : l'interaction est à double sens.",
            ],
            tip: "N'oubliez pas les formules de courtoisie au début et à la fin de l'entretien : merci, je vous remercie, c'est très clair.",
          },
        ],
        exercise: { kind: "speaking", level: "B2", taskNumber: 2 },
      },
      {
        id: "eo-4-3",
        step: 4,
        order: 3,
        level: "C1",
        title: "Tâche 3 — Le point de vue argumenté",
        objective:
          "Défendre une position sur un sujet de société avec une argumentation structurée, riche et personnelle (≈ 3 à 4 min).",
        durationMinutes: 35,
        minScoreToPass: 75,
        theory: [
          {
            heading: "La méthode des 3 temps",
            content: [
              "1) Annonce : reformulez le sujet et posez votre thèse (avec une nuance d'emblée).",
              "2) Développement : 2-3 arguments ordonnés et illustrés (exemple, fait concret, expérience).",
              "3) Conclusion : synthèse + ouverture (conséquence, critique, perspective).",
              "Animez le tout avec des connecteurs : selon moi, en ce qui concerne, il est vrai que..., bien que, en définitive.",
            ],
            tip: "La nuance fait la différence au niveau C1 : « Certes... mais » montre votre maturité argumentative. Exercez-vous à concéder puis à répondre.",
            examples: [
              "Sujet : la régulation des données personnelles. → Thèse nuancée : régulation renforcée, surtout pour la souveraineté, mais proportionnée aux entreprises.",
            ],
          },
          {
            heading: "Tenir la parole 3-4 minutes",
            content: [
              "Tenez un canevas écrit (3 colonnes : arguments / exemples / connecteurs) pendant le temps de préparation.",
              "Regardez votre canevas, pas le papier : l'oral s'adresse à l'examinateur.",
              "Gérez votre respiration et votre rythme ; les pauses marquées valent mieux que le remplissage (« euh »).",
            ],
            tip: "Après votre exposé, l'examinateur peut vous poser une question complémentaire : répondez en 2-3 phrases argumentées.",
          },
        ],
        exercise: { kind: "speaking", level: "C1", taskNumber: 3 },
      },
    ],
  },
];

// ============================ HELPERS ============================

export function getCourseSteps(): CourseStep[] {
  return courseSteps;
}

export function getStepById(id: CourseStepId): CourseStep | undefined {
  return courseSteps.find((s) => s.id === id);
}

export function getLessonById(id: string): CourseStep["lessons"][number] | undefined {
  for (const step of courseSteps) {
    const lesson = step.lessons.find((l) => l.id === id);
    if (lesson) return lesson;
  }
  return undefined;
}

export function getAllLessons(): CourseStep["lessons"][number][] {
  return courseSteps.flatMap((s) => s.lessons);
}

export function getCourseTotalLessons(): number {
  return getAllLessons().length;
}

export const stepTitles: Record<CourseStepId, string> = {
  1: "Compréhension Orale",
  2: "Compréhension Écrite",
  3: "Expression Écrite",
  4: "Expression Orale",
};