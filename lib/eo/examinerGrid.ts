import {
  CefrLevel,
  NclcLevel,
  OralCriterionKey,
  OralCriterionScores,
} from "@/lib/types";
import { estimateCefrLevel, estimateNclcLevel } from "@/lib/utils/scoring";
import { OralMetrics } from "@/lib/types";

/**
 * Grille d'évaluation de l'expression orale alignée sur les 6 critères du TCF
 * Canada : tâche accomplie, aisance, cohérence du discours, lexique, grammaire
 * et prononciation. Descripteurs par bande NCLC (4-6 / 7 / 8 / 9 / 10+).
 *
 * Le niveau indiqué reste un estimateur pédagogique : seule l'évaluation
 * officielle (en centre, par des examinateurs formés) fait foi.
 */

export interface OralCriterion {
  key: OralCriterionKey;
  label: string;
  description: string;
  bands: Record<NclcLevel, string>;
}

export const oralCriteria: OralCriterion[] = [
  {
    key: "task",
    label: "Tâche accomplie",
    description: "Traitement complet du sujet et objectif de communication atteint.",
    bands: {
      "NCLC 4-6": "Sujet partiellement traité ; objectif de communication atteint avec lacunes.",
      "NCLC 7": "Sujet traité de façon globale, quelques points secondaires oubliés.",
      "NCLC 8": "Sujet bien traité, tous les éléments demandés présents.",
      "NCLC 9": "Sujet traité avec précision et exhaustivité remarquables.",
      "NCLC 10+": "Traitement riche, nuancé et complet, objectif dépassé avec aisance.",
    },
  },
  {
    key: "fluency",
    label: "Aisance et fluidité",
    description:
      "Rythme de parole, hésitations, faux départs et silences (croisé avec les métriques objectives).",
    bands: {
      "NCLC 4-6": "Parole heurtée, nombreuses pauses et hésitations gênantes.",
      "NCLC 7": "Parole continue mais ralentissements visibles en fin d'énoncé.",
      "NCLC 8": "Fluidité correcte, rares hésitations sans rupture du débit.",
      "NCLC 9": "Débit régulier et soutenu, hésitations naturelles et discrètes.",
      "NCLC 10+": "Fluidité quasi native, aucune recherche de mots perceptible.",
    },
  },
  {
    key: "cohesion",
    label: "Cohérence du discours",
    description: "Organisation des idées, connecteurs logiques et progression du propos.",
    bands: {
      "NCLC 4-6": "Propos enchaîné par juxtaposition, progression difficile à suivre.",
      "NCLC 7": "Discours structuré mais connecteurs répétitifs et simples.",
      "NCLC 8": "Bonne organisation, connecteurs variés et efficaces.",
      "NCLC 9": "Discours structuré avec finesse, transitions et reprises maîtrisées.",
      "NCLC 10+": "Construction argumentative souple, articulations subtiles et élégantes.",
    },
  },
  {
    key: "lexicon",
    label: "Étendue et maîtrise du lexique",
    description: "Richesse du vocabulaire, précision terminologique et idiomes.",
    bands: {
      "NCLC 4-6": "Lexique limité, paraphrases fréquentes et imprécisions marquées.",
      "NCLC 7": "Vocabulaire suffisant mais parfois approximatif ou répétitif.",
      "NCLC 8": "Lexique étendu et précis, expressions idiomatiques occasionnelles.",
      "NCLC 9": "Vocabulaire riche et nuancé, registres adaptés, idiomatismes maîtrisés.",
      "NCLC 10+": "Lexique vaste, précis, idiomatique et subtilement choisi.",
    },
  },
  {
    key: "grammar",
    label: "Correction grammaticale",
    description: "Accords, temps verbaux, structures syntaxiques et complexité de la phrase.",
    bands: {
      "NCLC 4-6": "Erreurs fréquentes gênant parfois la compréhension.",
      "NCLC 7": "Erreurs occasionnelles, essentiellement dans les structures complexes.",
      "NCLC 8": "Syntaxe variée et maîtrisée, erreurs rares et autocorrigées.",
      "NCLC 9": "Correction quasi constante, y compris dans les subordonnées complexes.",
      "NCLC 10+": "Maîtrise totale des structures, aucune erreur récurrente.",
    },
  },
  {
    key: "pronunciation",
    label: "Prononciation",
    description: "Articulation, rythme, intonation et intelligibilité.",
    bands: {
      "NCLC 4-6": "Accent et erreurs de rythme pouvant nuire à la compréhension.",
      "NCLC 7": "Prononciation globalement claire, accent perceptible.",
      "NCLC 8": "Articulation claire, intonation naturelle, accent discret.",
      "NCLC 9": "Prononciation proche du locuteur natif, intonation expressive.",
      "NCLC 10+": "Prononciation et prosodie de niveau natif.",
    },
  },
];

export type OralGradeResult = {
  cefr: CefrLevel;
  nclc: NclcLevel;
  scorePercent: number;
  score699: number;
  criterionScores: OralCriterionScores;
  objectiveFluency: number | null;
  fluencyComment: string;
};

const clampScore = (n: number) => Math.min(5, Math.max(1, n));

/** Note de fluidité objective (1-5) calculée sur les métriques mesurées. */
export function objectiveFluencyScore(metrics: OralMetrics): number {
  const { wordsPerMinute: wpm, filledPauses, longestPauseSeconds } = metrics;
  let score: number =
    wpm >= 150 ? 5 : wpm >= 120 ? 4 : wpm >= 90 ? 3 : wpm >= 60 ? 2 : 1;

  const fillerCount = filledPauses.reduce((sum, f) => sum + f.count, 0);
  if (fillerCount >= 12) score -= 1;
  else if (fillerCount >= 6) score -= 0.5;

  if (longestPauseSeconds >= 5) score -= 1;
  else if (longestPauseSeconds >= 3) score -= 0.5;
  else if (longestPauseSeconds >= 2) score -= 0.25;

  return Math.min(5, Math.max(1, score));
}

function buildFluencyComment(metrics: OralMetrics): string {
  const { wordsPerMinute: wpm, filledPauses, longestPauseSeconds } = metrics;
  const fillerCount = filledPauses.reduce((sum, f) => sum + f.count, 0);
  const parts: string[] = [];
  if (wpm > 0) {
    parts.push(
      `débit mesuré d'environ ${wpm} mots/min${
        wpm >= 120 ? " (bon rythme)" : wpm >= 90 ? " (rythme correct)" : " (à travailler)"
      }`
    );
  } else {
    parts.push("aucune parole reconnue : le micro ou la reconnaissance n'ont pas capté votre voix");
  }
  if (fillerCount > 0) {
    parts.push(`${fillerCount} marqueur${fillerCount > 1 ? "s" : ""} d'hésitation détecté${fillerCount > 1 ? "s" : ""}`);
  }
  if (longestPauseSeconds > 0) {
    parts.push(`pause la plus longue de ${longestPauseSeconds}s`);
  }
  return parts.length ? parts.join(" · ") : "Débit et pauses cohérents sur l'échantillon.";
}

/**
 * Note une session orale : la fluidité auto-évaluée est pondérée avec la
 * fluidité objective mesurée, puis la moyenne des 6 critères est convertie
 * en pourcentage, score /699 et bandes CECRL / NCLC (barème pédagogique,
 * cohérent avec le reste de l'application).
 */
export function gradeOral(
  metrics: OralMetrics,
  selfScores: Partial<OralCriterionScores>
): OralGradeResult {
  const weighted: OralCriterionScores = {
    task: clampScore(selfScores.task ?? 3),
    fluency: NaN,
    cohesion: clampScore(selfScores.cohesion ?? 3),
    lexicon: clampScore(selfScores.lexicon ?? 3),
    grammar: clampScore(selfScores.grammar ?? 3),
    pronunciation: clampScore(selfScores.pronunciation ?? 3),
  };

  const objective =
    metrics.transcript.trim().length > 0 ? objectiveFluencyScore(metrics) : null;
  const selfFluency = clampScore(selfScores.fluency ?? 3);
  weighted.fluency =
    objective === null
      ? selfFluency
      : Math.round((selfFluency * 0.6 + objective * 0.4) * 10) / 10;

  const keys = Object.keys(weighted) as OralCriterionKey[];
  const average = keys.reduce((sum, k) => sum + weighted[k], 0) / keys.length;
  const scorePercent = Math.round(clampScore(average) * 20);
  const score699 = Math.round(average * 139.8);

  return {
    cefr: estimateCefrLevel(scorePercent),
    nclc: estimateNclcLevel(scorePercent),
    scorePercent,
    score699,
    criterionScores: weighted,
    objectiveFluency: objective,
    fluencyComment: buildFluencyComment(metrics),
  };
}