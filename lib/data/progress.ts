import { SkillProgress, TestAttempt } from "@/lib/types";

export const skillsProgress: SkillProgress[] = [
  { skill: "CO", label: "Compréhension Orale", progressPercent: 68, estimatedLevel: "NCLC 8", bestScoreOn699: 480 },
  { skill: "CE", label: "Compréhension Écrite", progressPercent: 54, estimatedLevel: "NCLC 7", bestScoreOn699: 440 },
  { skill: "EO", label: "Expression Orale", progressPercent: 40, estimatedLevel: "NCLC 7", bestScoreOn699: 0 },
  { skill: "EE", label: "Expression Écrite", progressPercent: 35, estimatedLevel: "NCLC 7", bestScoreOn699: 0 },
];

export const testHistory: TestAttempt[] = [
  { id: "t1", date: "2026-08-02", type: "entrainement", skill: "CO", scorePercent: 62, nclcLevel: "NCLC 7" },
  { id: "t2", date: "2026-08-09", type: "entrainement", skill: "CE", scorePercent: 58, nclcLevel: "NCLC 7" },
  { id: "t3", date: "2026-08-16", type: "examen-blanc", skill: "GLOBAL", scorePercent: 65, nclcLevel: "NCLC 7" },
  { id: "t4", date: "2026-09-01", type: "entrainement", skill: "CO", scorePercent: 74, nclcLevel: "NCLC 8" },
  { id: "t5", date: "2026-09-10", type: "entrainement", skill: "EE", scorePercent: 55, nclcLevel: "NCLC 7" },
  { id: "t6", date: "2026-09-18", type: "examen-blanc", skill: "GLOBAL", scorePercent: 70, nclcLevel: "NCLC 8" },
];

export function getGlobalProgressPercent(): number {
  const total = skillsProgress.reduce((sum, s) => sum + s.progressPercent, 0);
  return Math.round(total / skillsProgress.length);
}
