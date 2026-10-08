import { OralPhraseCategory, OralSelfAssessment, SelfCriterion } from "@/lib/types";

/**
 * AIDE A L'EXPRESSION ORALE (Tâches 1, 2, 3).
 * 1. Grille d'auto-évaluation inspirée des critères officiels du TCF :
 *    aisance, lexique, grammaire, prononciation — 4 niveaux de 1 à 4.
 * 2. Banque de phrases utiles : structurer son intervention, argumenter,
 *    gérer les tâches 1 à 3, garder la parole pendant la durée imposée.
 */

// ============================ 1. GRILLE D'AUTO-EVALUATION ============================

export const selfAssessmentCriteria = [
  {
    key: "aisance",
    label: "Aisance",
    description: "Fluidité, rythme, capacité à enchaîner sans blocage ni pause excessive.",
    levels: [
      {
        label: "1 — Hésitant",
        description: "Pauses nombreuses et longues, phrases interrompues, débit irrégulier.",
      },
      {
        label: "2 — Assez fluide",
        description: "Quelques hésitations qui n'empêchent pas la compréhension ; débit correct.",
      },
      {
        label: "3 — Fluide",
        description: "Discours continu avec peu de pauses ; l'autocorrection ne gêne pas le sens.",
      },
      {
        label: "4 — Très fluide",
        description: "Enchaînements naturels, intonation expressive, débit soutenu et régulier.",
      },
    ],
  },
  {
    key: "lexique",
    label: "Lexique",
    description: "Étendue et précision du vocabulaire, reformulations, mots précis du sujet.",
    levels: [
      {
        label: "1 — Limité",
        description: "Vocabulaire restreint, répétitions, mots génériques très fréquents.",
      },
      {
        label: "2 — Satisfaisant",
        description: "Vocabulaire courant correct, quelques mots précis du thème.",
      },
      {
        label: "3 — Large",
        description: "Vocabulaire varié et précis, expressions idiomatiques, reformulations.",
      },
      {
        label: "4 — Riche",
        description: "Vocabulaire riche et nuancé, registres adaptés, expressions soignées.",
      },
    ],
  },
  {
    key: "grammaire",
    label: "Grammaire",
    description: "Correction syntaxique et morphologique, emploi des temps et de la phrase complexe.",
    levels: [
      {
        label: "1 — Fragile",
        description: "Erreurs fréquentes qui peuvent gêner la compréhension.",
      },
      {
        label: "2 — Correcte",
        description: "Erreurs occasionnelles sans gêne de la compréhension ; structures simples sûres.",
      },
      {
        label: "3 — Solide",
        description: "Bonne maîtrise des structures complexes (subordonnées, subjonctif) malgré quelques lapsus.",
      },
      {
        label: "4 — Excellente",
        description: "Structures complexes maîtrisées, rares erreurs, autocorrection pertinente.",
      },
    ],
  },
  {
    key: "prononciation",
    label: "Prononciation",
    description: "Sons, rythme, prosodie, intelligibilité pour un locuteur natif.",
    levels: [
      {
        label: "1 — Difficile",
        description: "Accent marqué, erreurs phonétiques qui compliquent l'écoute.",
      },
      {
        label: "2 — Compréhensible",
        description: "Accent perceptible mais l'énoncé reste clair.",
      },
      {
        label: "3 — Propre",
        description: "Prononciation nette, rythme et intonation naturels, rares écarts.",
      },
      {
        label: "4 — Quasi natif",
        description: "Prosodie naturelle, sons bien articulés, intonation expressive.",
      },
    ],
  },
] satisfies SelfCriterion[];

// ============================ 2. PHRASES UTILES A L'ORAL ============================

export const oralPhraseCategories: OralPhraseCategory[] = [
  {
    id: "ouverture",
    title: "Ouvrir son intervention (toutes tâches)",
    phrases: [
      "D'après la consigne, …",
      "Je dois / Je peux vous parler de…",
      "La question que l'on me pose est la suivante : …",
      "Pour commencer, …",
      "Commençons par…",
    ],
  },
  {
    id: "structure",
    title: "Structurer son discours",
    phrases: [
      "Tout d'abord, … / Ensuite, … / Enfin, …",
      "Deux idées me semblent essentielles : d'une part…, d'autre part…",
      "J'aborderai l'aspect… avant de conclure.",
      "Pour ce qui est de…, …",
      "Revenons maintenant à…",
    ],
  },
  {
    id: "argumentation",
    title: "Argumenter et nuancer",
    phrases: [
      "À mon avis, … / Pour ma part, je pense que…",
      "Ce qui me semble important, c'est que…",
      "On pourrait objecter que…, mais il faut rappeler que…",
      "Bien que certains estiment que…, je reste convaincu(e) que…",
      "Ce point de vue s'explique par…",
      "Il vaudrait mieux… plutôt que de…",
      "D'un autre côté, il ne faut pas négliger…",
    ],
  },
  {
    id: "exemples",
    title: "Donner des exemples",
    phrases: [
      "Prenons l'exemple de…",
      "Par exemple, au Canada, on constate que…",
      "J'ai personnellement vécu cette situation : …",
      "Les chiffres le montrent : …",
    ],
  },
  {
    id: "tache1",
    title: "Tâche 1 — Raconter une expérience",
    phrases: [
      "C'était à l'époque où je…",
      "Tout a commencé quand…",
      "Sur le moment, je ne savais pas quoi faire.",
      "Finalement, j'ai décidé de…",
      "Avec le recul, je me dis que…",
      "Cette expérience m'a appris que…",
    ],
  },
  {
    id: "tache2",
    title: "Tâche 2 — Mise en situation",
    phrases: [
      "Je comprends votre situation, et voici ce que je vous propose : …",
      "Pour vous aider, je peux…",
      "Il serait plus raisonnable de…",
      "Je vous conseille de…, car…",
      "Si j'étais vous, je commencerais par…",
      "Rassurez-vous, il y a plusieurs solutions : …",
    ],
  },
  {
    id: "tache3",
    title: "Tâche 3 — Point de vue argumenté",
    phrases: [
      "D'après moi, ce sujet mérite d'être débattu car…",
      "Il existe au moins deux positions sur cette question.",
      "Pour certains, … ; pour d'autres, …",
      "Je penche plutôt pour… puisque…",
      "Un argument de taille est…",
      "En conclusion, je maintiens que…",
    ],
  },
  {
    id: "gestion",
    title: "Gérer le temps et la parole",
    phrases: [
      "Pour être bref(e), …",
      "Pour résumer en une phrase, …",
      "Je vais maintenant conclure.",
      "Si vous me permettez, une dernière idée : …",
      "Je manque peut-être de temps, mais je dirai que…",
    ],
  },
];

// ============================ 3. GESTION DES ENREGISTREMENTS ============================

const SELF_ASSESSMENT_KEY = "tcf-self-assessments";

export function loadSelfAssessments(): OralSelfAssessment[] {
  if (typeof window === "undefined") return [];
  const existing = JSON.parse(window.localStorage.getItem(SELF_ASSESSMENT_KEY) || "[]");
  return Array.isArray(existing) ? (existing as OralSelfAssessment[]) : [];
}

export function saveSelfAssessment(assessment: OralSelfAssessment): OralSelfAssessment[] {
  const all = loadSelfAssessments();
  const next = [assessment, ...all.filter((a) => a.id !== assessment.id)];
  try {
    window.localStorage.setItem(SELF_ASSESSMENT_KEY, JSON.stringify(next));
  } catch {
    // stockage plein : ignore silencieusement
  }
  return next;
}

// ============================ HELPERS ============================

export function getSelfAssessmentCriteria() {
  return selfAssessmentCriteria;
}

export function getOralPhraseCategories(): OralPhraseCategory[] {
  return oralPhraseCategories;
}

export function getOralPhrasesForCategory(categoryId: string): string[] {
  return oralPhraseCategories.find((c) => c.id === categoryId)?.phrases ?? [];
}