import { GrammarCategory, GrammarLesson, QcmQuestion } from "@/lib/types";
import { GRAMMAR_QUIZ_BANK } from "@/lib/data/grammarQuiz";

/**
 * MODULES DE COURS THEMATIQUES — GRAMMAIRE B2/C1.
 * Les 6 catégories incontournables des épreuves écrites et orales du TCF :
 * hypotaxe, subordination, mise en relief, subjonctif, accords des participes
 * passés, connecteurs logiques.
 * Chaque leçon s'appuie sur la banque centralisée GRAMMAR_QUIZ_BANK
 * (voir grammarQuiz.ts) pour l'application notée.
 */

/**
 * Catégories grammaticales ciblées B2/C1, conformes aux attentes du TCF
 * (épreuves d'expression écrite et orale : syntaxe complexe, connecteurs,
 * correction des accords).
 */
export const GRAMMAR_CATEGORIES: GrammarCategory[] = [
  {
    id: "hypotaxe",
    title: "L'hypotaxe : subordonnées et longueur maîtrisée",
    level: "C1",
    description:
      "Construire des phrases complexes à subordonnées multiples sans perdre le fil : c'est la différence entre un niveau B2 efficace et un C1 authentique.",
    icon: "git-branch",
  },
  {
    id: "subordination",
    title: "La subordination : relatives, complétives et circonstancielles",
    level: "B2",
    description:
      "Relier des idées avec des propositions relatives, complétives et circonstancielles pour enrichir la syntaxe au lieu d'aligner des phrases simples.",
    icon: "link-2",
  },
  {
    id: "mise-en-relief",
    title: "La mise en relief : c'est... qui / que",
    level: "B2",
    description:
      "Mettre en valeur un élément de la phrase (c'est... qui, c'est... que, ce qui/ce que) pour insister et nuancer à l'écrit comme à l'oral.",
    icon: "highlight",
  },
  {
    id: "subjonctif",
    title: "Le subjonctif : emplois indispensables",
    level: "B2",
    description:
      "Le subjonctif après les verbes de volonté, d'émotion et de doute : un marqueur fort du niveau B2 que les correcteurs TCF repèrent immédiatement.",
    icon: "shield-alert",
  },
  {
    id: "accords-participe",
    title: "L'accord des participes passés",
    level: "C1",
    description:
      "Maîtriser les accords du participe passé avec être, avoir et les verbes pronominaux : 90 % des erreurs de morphologie relevées par le TCF.",
    icon: "check-check",
  },
  {
    id: "connecteurs",
    title: "Les connecteurs logiques indispensables",
    level: "B2",
    description:
      "Le squelette argumentatif des 3 tâches écrites et orales : opposition, cause, conséquence, concession, illustration, synthèse.",
    icon: "waypoints",
  },
];

/**
 * Leçons de grammaire — chaque leçon mobilise la banque de questions
 * `GRAMMAR_QUIZ_BANK` (voir grammarQuiz.ts).
 */
export const grammarLessons: GrammarLesson[] = [
  {
    id: "g-hypotaxe-1",
    category: "hypotaxe",
    level: "C1",
    order: 1,
    title: "Construire des phrases à subordonnées multiples",
    summary:
      "L'hypotaxe organise la phrase par subordination : une idée principale portée par une proposition qui commande des compléments. La maîtrise de l'hypotaxe traduit une pensée qui hiérarchise.",
    durationMinutes: 35,
    exerciseCount: 4,
    sections: [
      {
        heading: "Qu'est-ce que l'hypotaxe ?",
        content: [
          "L'hypotaxe (du grec « sous l'ordre ») consiste à subordonner des propositions à une principale : « Si l'on tient compte des contraintes budgétaires, la solution qu'a retenue le conseil, bien qu'elle ne satisfasse pas tout le monde, reste la plus réaliste. »",
          "Elle s'oppose à la parataxe (juxtaposition) : avec l'hypotaxe, les liens logiques sont explicites (que, si, bien que, dont...).",
          "Au TCF, c'est à l'hypotaxe qu'on reconnaît une construction C1 : une phrase longue mais parfaitement lisible, avec une hiérarchie claire.",
        ],
        tip: "Règle d'or : une phrase complexe = UNE idée principale + des compléments. Relisez chaque phrase en cherchant la principale : si elle disparaît, la phrase est cassée.",
        examples: [
          "Parataxe (B1) : « Le conseil a retenu une solution. Elle ne satisfait pas tout le monde. Elle reste réaliste. »",
          "Hypotaxe (C1) : « La solution qu'a retenue le conseil, bien qu'elle ne satisfasse pas tout le monde, reste la plus réaliste. »",
        ],
      },
      {
        heading: "Les pièges de l'hypotaxe spontanée",
        content: [
          "L'accumulation : ajouter « qui » après « qui » (« l'idée qui a été proposée, qui a été discutée, qui a été rejetée ») — inefficace. Reformulez en préférant un nom : « après discussion ».",
          "Le sujet oublié : « Ayant décidé de partir, une réunion fut organisée » (accord impossible : qui « ayant décidé » ? Quelqu'un !).",
          "La relative sans antécédent : « c'est ce dont on ne parle jamais » : ce dont est un pronom relatif prépositionnel ; ne le remplacez pas par « c'est de quoi » à l'oral soutenu écrit.",
        ],
        tip: "Au niveau C1, privilégiez la nominalisation pour alléger l'hypotaxe : au lieu de « parce qu'on augmente les coûts », écrivez « en raison de la hausse des coûts ».",
      },
    ],
    traps: [
      "Multiplier deux relatives dont dont consécutives si l'antécédent est le même (« le projet dont dont on parle » → « le projet dont on parle »).",
      "Conjuguer la subordonnée comme si elle était principale (elle se met au mode requis par le verbe introducteur).",
    ],
  },
  {
    id: "g-subordination-1",
    category: "subordination",
    level: "B2",
    order: 1,
    title: "Relatives, complétives et circonstancielles",
    summary:
      "Trois familles de subordonnées : la relative (dont, qui, que, lequel) enrichit un nom ; la complétive (que) complète un verbe ; la circonstancielle (quand, parce que, bien que) exprime un rapport logique.",
    durationMinutes: 30,
    exerciseCount: 4,
    sections: [
      {
        heading: "La proposition relative",
        content: [
          "La relative complète un nom (l'antécédent) : « Le programme que la ville a lancé », « les infrastructures dont les quartiers manquent », « l'entrepreneuse grâce à qui le projet a abouti ».",
          "Avec préposition, on emploie lequel/laquelle/lesquels : « le dossier pour lequel je me bats » (et non « pour qu'il »).",
          "À l'oral B2, un excès de relatives annonce le « niveau C1 manqué » : variez avec les complétives et les circonstancielles.",
        ],
        tip: "Dès que deux relatives se suivent, cherchez si une nominalisation (un nom) ne ferait pas plus net : « les mesures, qui ont été votées, et qui entreront... » → « les mesures votées entreront... ».",
        examples: [
          "« L'établissement où j'étudie » / « la raison pour laquelle je suis venu » / « ce dont je me souviens ».",
        ],
      },
      {
        heading: "La complétive et la circonstancielle",
        content: [
          "La complétive est complément du verbe : « Je pense que la réforme aura des effets », « Il s'agit de savoir si l'enquête suffira ».",
          "La circonstancielle exprime le temps (quand, dès que), la cause (parce que, puisque), le but (pour que + subjonctif), la concession (bien que + subjonctif), la condition (si, à condition que).",
          "Attention au mode après pour que et bien que : TOUJOURS le subjonctif.",
        ],
        tip: "Un bon repère : si vous pouvez remplacer votre subordonnée par un nom (cause → « à cause de cela »), la construction est correcte.",
      },
    ],
    traps: [
      "Utiliser « que » à la place de « dont »/« à qui » après un verbe prépositionnel (penser à, se souvenir de, avoir besoin de).",
      "Introduire une circonstancielle par « bien que » suivi de l'indicatif (le mode exigé est le subjonctif).",
    ],
  },
  {
    id: "g-mise-relief-1",
    category: "mise-en-relief",
    level: "B2",
    order: 1,
    title: "C'est... qui / que et les tours de relief",
    summary:
      "La mise en relief détache un élément pour le mettre en valeur : c'est l'expression (c'est... qui/que), le tour « ce qui... c'est », et les présentatifs il y a... qui.",
    durationMinutes: 25,
    exerciseCount: 4,
    sections: [
      {
        heading: "Les deux constructions de base",
        content: [
          "Sujet mis en valeur : c'est + élément + qui + verbe. « C'est l'expérience qui compte le plus. »",
          "Objet ou complément mis en valeur : c'est + élément + que + proposition. « C'est la régularité que les chercheurs privilégient. »",
          "Ne confondez pas : « qui » reprend un SUJET, « que » reprend un OBJET. « C'est la loi qui interdit » (la loi est sujet) vs « c'est la loi que l'on oppose » (la loi est objet).",
        ],
        tip: "La mise en relief sert à RÉPONDRE à une question implicite : « qu'est-ce qui compte le plus ? » → la réponse commence par c'est...",
        examples: [
          "« Ce qui m'importe, c'est la sécurité. » (ce qui donne le sujet)",
          "« Ce que j'apprécie, c'est sa franchise. » (ce que donne l'objet)",
        ],
      },
      {
        heading: "Variantes riches pour l'écrit",
        content: [
          "ce qui / ce que + c'est : « Ce qui frappe, c'est la rapidité du changement. »",
          "il y a ... qui/que : « Il y a une chose qui m'inquiète : le coût. »",
          "La dislocation (plus orale) : « La régulation, c'est le vrai sujet. » Utile pour varier l'expression orale en tâche 3.",
        ],
        tip: "Un usage mesuré : une mise en relief par paragraphe suffit — l'effet d'insistance s'émousse si on la répète partout.",
      },
    ],
    traps: [
      "« C'est ... qui » devant une forme verbale qui n'est pas le sujet réel (accord du verbe avec l'élément introduit par qui).",
      "Inverser qui/que : « c'est la solution qui je défends » (faux → que).",
    ],
  },
  {
    id: "g-subjonctif-1",
    category: "subjonctif",
    level: "B2",
    order: 1,
    title: "Le subjonctif : volonté, émotion, doute",
    summary:
      "Le subjonctif marque le subjectif : après un verbe de volonté, d'émotion, de doute ou des locutions comme il faut que, pour que, bien que. Son absence signale vite un niveau B1.",
    durationMinutes: 30,
    exerciseCount: 4,
    sections: [
      {
        heading: "Après les verbes et locutions qui appellent le subjonctif",
        content: [
          "Volonté et nécessité : vouloir que, exiger que, il faut que, il est nécessaire que. « Le ministre exige que les données soient publiées. »",
          "Émotion : être content que, regretter que, redouter que. « Je regrette que la décision ait été prise sans concertation. »",
          "Doute et incertitude : douter que, il est peu probable que, il se peut que. « Je doute qu'il accepte ces conditions. »",
        ],
        tip: "Verbes de pensée et de certitude (penser que, croire que, il est certain que) exigent l'INDICATIF à la forme affirmative, mais le SUBJONCTIF à la forme négative ou interrogative : « je ne pense pas qu'il vienne ».",
        examples: [
          "« Il faut que nous adaptions nos méthodes. » (subjonctif présent adaptions)",
          "« Je ne crois pas que le projet aboutisse à temps. » (subjonctif aboutisse)",
        ],
      },
      {
        heading: "Après certaines conjonctions",
        content: [
          "pour que, afin que, bien que, quoique, encore que, avant que (avec ne explétif parfois), pourvu que : TOUJOURS le subjonctif.",
          "de peur que (+ ne), sans que : subjonctif. ",
          "« Bien que » suivi de l'indicatif est une faute extrêmement fréquente au TCF : entraînez-vous sur cette seule paire.",
        ],
        tip: "Mémorisez les 4 conjonctions rois : bien que, pour que, pourvu que, avant que. Chaque fois que vous les écrivez, vérifiez le subjonctif.",
      },
    ],
    traps: [
      "« Bien que je suis... » → bien que je SOIS.",
      "« Il faut que nous allons... » → il faut que nous ALLIONS.",
      "Oublier le subjonctif après la négation d'un verbe de pensée (« je ne pense pas qu'il vient »).",
    ],
  },
  {
    id: "g-accords-participe-1",
    category: "accords-participe",
    level: "C1",
    order: 1,
    title: "L'accord des participes passés sans faute",
    summary:
      "Avec être, on accorde ; avec avoir, on accorde avec le COD placé AVANT ; les pronominaux suivent des règles précises. Ces accords sont décisifs à l'écrit.",
    durationMinutes: 30,
    exerciseCount: 4,
    sections: [
      {
        heading: "Les trois règles de base",
        content: [
          "Avec être : accord avec le sujet. « Elles sont parties », « les mesures ont été votées ».",
          "Avec avoir : accord avec le COMPLÉMENT D'OBJET DIRECT s'il est placé AVANT le verbe. « Les lettres que j'ai écrites » (que = lettres, COD avant → accord) ; « j'ai écrit les lettres » (COD après → invariable).",
          "Pas d'accord avec avoir si le COD n'existe pas : « elles ont discuté », « les années ont passé » (passer intransitif).",
        ],
        tip: "Astuce de vérification : remplacez le participe par un infinitif courant. « Les fruits que j'ai mangé(s) » → « j'ai prit les fruits » : on accorderait « pris » avec fruits → donc on accorde « mangés ».",
        examples: [
          "« La décision qu'elle a prise » (que = décision, COD avant → prise)",
          "« Elles se sont parlé » (parler à quelqu'un : pas de COD, se = COI → parlé sans e)",
        ],
      },
      {
        heading: "Les participes passés des verbes pronominaux",
        content: [
          "Principe : on accorde avec le COD si le pronom réfléchi est COD. « Elles se sont lavées » (se = COD), mais « elles se sont lavé les mains » (les mains = COD placé après, se = COI → lavé).",
          "Cas fréquents invariables : se parler, se téléphoner, se sourire, se succéder, se plaire (verbes à COI).",
          "À l'écrit soutenu, l'accord erroné des pronominaux attire l'œil du correcteur : c'est une cible C1.",
        ],
        tip: "Testez la nature de « se » : peut-on le remplacer par « quelqu'un/à quelqu'un » ? « se téléphoner » = téléphoner À quelqu'un → COI → pas d'accord.",
      },
    ],
    traps: [
      "Accorder avec avoir quand le COD est derrière (faute classique : « les solutions que j'ai apportées » est correct PARCE QUE que est avant ; « j'ai apporté les solutions » est invariable).",
      "Laisser « parlé » accorder dans « elles se sont parlé ».",
    ],
  },
  {
    id: "g-connecteurs-1",
    category: "connecteurs",
    level: "B2",
    order: 1,
    title: "Le squelette argumentatif : connecteurs à maîtriser",
    summary:
      "Opposition, cause, conséquence, concession, illustration, bilan : c'est avec cette boîte à outils que l'on passe d'une liste d'idées à une argumentation.",
    durationMinutes: 25,
    exerciseCount: 4,
    sections: [
      {
        heading: "Les 6 grandes fonctions",
        content: [
          "Opposition : mais, cependant, en revanche, tandis que, par contre (familier, à éviter à l'écrit).",
          "Cause : parce que, puisque, car, étant donné que, vu que (familier), sous prétexte que.",
          "Conséquence : donc, par conséquent, ainsi, c'est pourquoi, il en résulte que, de sorte que.",
          "Concession : certes..., mais ; bien que (+ subjonctif) ; même si (+ indicatif) ; en dépit de (+ nom).",
          "Illustration : par exemple, notamment, en particulier, ainsi, c'est le cas de.",
          "Bilan : en somme, en définitive, pour conclure, en bref, au total.",
        ],
        tip: "La concession (certes... mais / bien que) est LE marqueur du niveau avancé : elle prouve que vous voyez les deux faces d'un sujet. Utilisez-en au moins une par tâche 3.",
        examples: [
          "« Certes, le coût est élevé, mais l'investissement se justifie sur le long terme. »",
          "« Bien que les sondages soient favorables, la prudence reste de mise. »",
        ],
      },
      {
        heading: "Éviter les tics et les confusions",
        content: [
          "Ne confondez pas car (cause) et donc (conséquence) : « il est absent, car il est malade » / « il est malade, donc il est absent ».",
          "« En effet » introduit une justification (après une affirmation) ; « par ailleurs » ajoute un point ; « en revanche » oppose. Les trois ne s'échangent pas.",
          "Un texte B2 compte 8 à 12 connecteurs ; un texte qui en aligne 2-3 sent le niveau A2-B1.",
        ],
        tip: "Variez la place du connecteur : en tête de phrase (« pourtant, ... »), après virgule, ou en incise — la variété syntaxique compte autant que le choix du connecteur.",
      },
    ],
    traps: [
      "« Par contre » à l'écrit formel (préférez en revanche / en contrepartie).",
      "« Car » utilisé en début de phrase de façon systématique (utilisez plutôt puisque/étant donné que).",
      "« Cependant » répété trois fois dans le même paragraphe.",
    ],
  },
];

// ============================ HELPERS ============================

export function getGrammarCategories(): GrammarCategory[] {
  return GRAMMAR_CATEGORIES;
}

export function getGrammarLessons(): GrammarLesson[] {
  return grammarLessons;
}

export function getGrammarLessonById(id: string): GrammarLesson | undefined {
  return grammarLessons.find((l) => l.id === id);
}

export function getGrammarLessonsForCategory(categoryId: string): GrammarLesson[] {
  return grammarLessons.filter((l) => l.category === categoryId);
}

export function getGrammarCategoryById(id: string): GrammarCategory | undefined {
  return GRAMMAR_CATEGORIES.find((c) => c.id === id);
}

// ============================ BANQUE DE QUESTIONS DE GRAMMAIRE ============================

/** Questions des leçons — filtrées par catégorie depuis la banque centralisée. */
export function getGrammarQuestionsForCategory(
  categoryId: string,
  count = 4
): QcmQuestion[] {
  return GRAMMAR_QUIZ_BANK.filter((q) => q.theme === categoryId).slice(0, count);
}