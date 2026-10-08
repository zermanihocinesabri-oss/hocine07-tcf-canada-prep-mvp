import { CefrLevel, NclcLevel } from "@/lib/types";

export const allCefrLevels: CefrLevel[] = ["A1", "A2", "B1", "B2", "C1", "C2"];

export function cefrLevelColor(level: CefrLevel): string {
  switch (level) {
    case "A1":
      return "bg-emerald-100 text-emerald-700";
    case "A2":
      return "bg-teal-100 text-teal-700";
    case "B1":
      return "bg-sky-100 text-sky-700";
    case "B2":
      return "bg-brand-100 text-brand-700";
    case "C1":
      return "bg-violet-100 text-violet-700";
    case "C2":
      return "bg-rose-100 text-rose-700";
  }
}

export function cefrLevelDescription(level: CefrLevel): string {
  switch (level) {
    case "A1":
      return "Élémentaire — phrases simples, informations concrètes de la vie quotidienne.";
    case "A2":
      return "Élémentaire avancé — situations courantes, échanges simples et directs.";
    case "B1":
      return "Intermédiaire — comprendre l'essentiel, s'exprimer sur des sujets familiers.";
    case "B2":
      return "Intermédiaire avancé — aisance dans les sujets concrets et abstraits.";
    case "C1":
      return "Avancé — langue riche et nuancée, productions organisées et argumentées.";
    case "C2":
      return "Maîtrise — compréhension fine de tout contenu, précision et subtilité.";
  }
}

/**
 * Estimation indicative du niveau NCLC à partir d'un pourcentage de réussite
 * à un test d'entraînement. Barème simplifié à des fins pédagogiques (MVP) :
 * il ne remplace pas le barème officiel du TCF Canada.
 */
export function estimateNclcLevel(scorePercent: number): NclcLevel {
  if (scorePercent >= 90) return "NCLC 10+";
  if (scorePercent >= 75) return "NCLC 9";
  if (scorePercent >= 60) return "NCLC 8";
  if (scorePercent >= 45) return "NCLC 7";
  return "NCLC 4-6";
}

// Correspondance indicative CECRL → NCLC (barème pédagogique, non officiel)
export function cefrToNclc(level: CefrLevel): NclcLevel {
  switch (level) {
    case "C2":
      return "NCLC 10+";
    case "C1":
      return "NCLC 9";
    case "B2":
      return "NCLC 8";
    case "B1":
      return "NCLC 7";
    default:
      return "NCLC 4-6";
  }
}

/**
 * Estimation du niveau CECRL à partir d'un pourcentage de réussite.
 * Barème simplifié calibré sur la logique du TCF (0-699 points).
 */
export function estimateCefrLevel(scorePercent: number): CefrLevel {
  if (scorePercent >= 90) return "C2";
  if (scorePercent >= 80) return "C1";
  if (scorePercent >= 65) return "B2";
  if (scorePercent >= 50) return "B1";
  if (scorePercent >= 35) return "A2";
  return "A1";
}

/**
 * Conversion d'un pourcentage de réussite en score sur l'échelle
 * officielle du TCF (0-699 points par compétence).
 */
export function estimateTcfScore(scorePercent: number): number {
  return Math.round(scorePercent * 6.99);
}

export function tcfScoreToCefr(score699: number): CefrLevel {
  if (score699 >= 600) return "C2";
  if (score699 >= 500) return "C1";
  if (score699 >= 400) return "B2";
  if (score699 >= 300) return "B1";
  if (score699 >= 200) return "A2";
  return "A1";
}

export function levelBadgeColor(level: NclcLevel): string {
  switch (level) {
    case "NCLC 10+":
      return "bg-emerald-100 text-emerald-700";
    case "NCLC 9":
      return "bg-brand-100 text-brand-700";
    case "NCLC 8":
      return "bg-sky-100 text-sky-700";
    case "NCLC 7":
      return "bg-amber-100 text-amber-700";
    default:
      return "bg-slate-100 text-slate-600";
  }
}

export function cn(...classes: (string | false | undefined | null)[]) {
  return classes.filter(Boolean).join(" ");
}
