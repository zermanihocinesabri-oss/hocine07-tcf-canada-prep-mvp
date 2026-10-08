import { Skill } from "@/lib/types";

/**
 * Référentiel officiel TCF Canada (France Éducation International).
 * Durées et nombre d'items des 4 épreuves, utilisés pour le chronométrage
 * des évaluations et l'extrapolation du temps sur les séries d'entraînement.
 */

export const tcfOfficial: Record<
  Skill,
  {
    durationMinutes: number;
    itemsOfficial: number;
    label: string;
    description: string;
    note: string;
  }
> = {
  CO: {
    durationMinutes: 35,
    itemsOfficial: 39,
    label: "Compréhension Orale",
    description:
      "39 questions à choix multiples à partir d'enregistrements audio diffusés une seule fois.",
    note: "Écoutez attentivement chaque audio, puis choisissez l'unique bonne réponse.",
  },
  CE: {
    durationMinutes: 60,
    itemsOfficial: 39,
    label: "Compréhension Écrite",
    description:
      "39 questions sur des documents écrits (panneaux, annonces, articles) de difficulté croissante.",
    note: "Gérez votre temps : les questions difficiles sont en fin d'épreuve.",
  },
  EE: {
    durationMinutes: 60,
    itemsOfficial: 3,
    label: "Expression Écrite",
    description:
      "3 tâches de rédaction : message (40–60 mots), article/récit (120–150 mots), essai argumenté (120–150 mots).",
    note: "Le nombre de mots est un critère officiel : un texte trop court n'est pas corrigé.",
  },
  EO: {
    durationMinutes: 12,
    itemsOfficial: 3,
    label: "Expression Orale",
    description:
      "3 tâches : entretien dirigé, exercice d'interaction, puis exposé argumenté devant l'examinateur.",
    note: "Les temps de préparation et de parole sont imposés par l'examinateur.",
  },
};

/** Temps moyen par item du TCF officiel, en secondes (pour calibrer nos séries). */
export function officialSecondsPerItem(skill: Skill): number {
  const spec = tcfOfficial[skill];
  return Math.round((spec.durationMinutes * 60) / spec.itemsOfficial);
}

/**
 * Barème pédagogique : conversion d'un pourcentage de réussite vers la notation
 * officielle du TCF Canada (0-699 par compétence) puis en niveaux CECRL / NCLC.
 */
export interface TcfConversion {
  score699: number;
  cefr: "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
  nclc: string;
}

export function convertPercentToTcf(scorePercent: number): TcfConversion {
  const score699 = Math.round(scorePercent * 6.99);
  const cefr =
    score699 >= 600
      ? "C2"
      : score699 >= 500
        ? "C1"
        : score699 >= 400
          ? "B2"
          : score699 >= 300
            ? "B1"
            : score699 >= 200
              ? "A2"
              : "A1";
  const nclc =
    cefr === "C2"
      ? "NCLC 10+"
      : cefr === "C1"
        ? "NCLC 9"
        : cefr === "B2"
          ? "NCLC 8"
          : cefr === "B1"
            ? "NCLC 7"
            : "NCLC 4-6";
  return { score699, cefr, nclc };
}