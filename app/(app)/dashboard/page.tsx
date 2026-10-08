"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Topbar } from "@/components/layout/Topbar";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Button } from "@/components/ui/Button";
import { SkillProgressCard } from "@/components/dashboard/SkillProgressCard";
import { HistoryTable } from "@/components/dashboard/HistoryTable";
import { courseSteps } from "@/lib/data/course";
import { AttemptRecord, Skill, SkillProgress, TestAttempt } from "@/lib/types";
import { useProgress } from "@/lib/utils/progressStore";
import { cefrToNclc, estimateCefrLevel, estimateTcfScore } from "@/lib/utils/scoring";
import {
  TrendingUp,
  Target,
  Flame,
  AlertTriangle,
  Rocket,
  Timer,
  Map,
} from "lucide-react";

const skillLabels: Record<Skill, string> = {
  CO: "Compréhension Orale",
  CE: "Compréhension Écrite",
  EE: "Expression Écrite",
  EO: "Expression Orale",
};

const skillHref: Record<Skill, string> = {
  CO: "/parcours/1",
  CE: "/parcours/2",
  EE: "/parcours/3",
  EO: "/parcours/4",
};
export default function DashboardPage() {
  const { state, globalProgressPercent, averageBySkill, weakestSkill } = useProgress();
  const attempts = state.attempts;
  const hasData = attempts.length > 0 || state.completedLessonIds.length > 0;

  const lessonsBySkill = useMemo(() => {
    const map: Record<Skill, { total: number; done: number }> = {
      CO: { total: 0, done: 0 },
      CE: { total: 0, done: 0 },
      EE: { total: 0, done: 0 },
      EO: { total: 0, done: 0 },
    };
    for (const step of courseSteps) {
      map[step.skill].total += step.lessons.length;
      map[step.skill].done += step.lessons.filter((l) =>
        state.completedLessonIds.includes(l.id)
      ).length;
    }
    return map;
  }, [state.completedLessonIds]);

  const { skills: liveSkills, noEstimate } = useMemo(() => {
    const averages = averageBySkill();
    const noEstimate = new Set<Skill>();
    const skills = (Object.keys(skillLabels) as Skill[]).map((skill) => {
      const lessonCount = lessonsBySkill[skill];
      const avg = averages[skill];
      const lessonPercent = lessonCount.total
        ? Math.round((lessonCount.done / lessonCount.total) * 100)
        : 0;
      const maxScore = Math.max(
        ...attempts.filter((a) => a.skill === skill).map((a) => estimateTcfScore(a.scorePercent)),
        -1
      );
      if (avg <= 0) noEstimate.add(skill);
      return {
        skill,
        label: skillLabels[skill],
        progressPercent: lessonPercent,
        estimatedLevel: avg > 0 ? cefrToNclc(estimateCefrLevel(avg)) : "NCLC 4-6",
        bestScoreOn699: maxScore >= 0 ? maxScore : 0,
      };
    });
    return { skills, noEstimate };
  }, [lessonsBySkill, averageBySkill, attempts]);

  const latest = attempts.length
    ? [...attempts].sort((a, b) => (a.date < b.date ? 1 : -1))[0]
    : null;

  const mergedHistory = useMemo<TestAttempt[]>(
    () =>
      attempts.map((a) => ({
        id: a.id,
        date: a.date,
        type: a.kind === "examen-blanc" ? "examen-blanc" : "entrainement",
        skill: a.skill,
        scorePercent: a.scorePercent,
        nclcLevel: cefrToNclc(estimateCefrLevel(a.scorePercent)),
      })),
    [attempts]
  );

  const weak = hasData ? weakestSkill() : null;
  const globalPercent = Math.round(globalProgressPercent());

  return (
    <>
      <Topbar title="Tableau de bord" />
      <div className="mx-auto max-w-6xl space-y-6 px-4 py-6 lg:px-8">
        {/* Vue d'ensemble */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Card>
            <div className="flex items-center gap-2 text-surface-500">
              <TrendingUp size={16} />
              <span className="text-xs font-medium">Progression du parcours</span>
            </div>
            <p className="mt-2 text-3xl font-extrabold text-surface-900">{globalPercent}%</p>
            <p className="mt-1 text-xs text-surface-500">
              {state.completedLessonIds.length} / {courseSteps.reduce((a, s) => a + s.lessons.length, 0)}{" "}
              leçons validées
            </p>
            <ProgressBar value={globalPercent} className="mt-3" />
          </Card>
          <Card>
            <div className="flex items-center gap-2 text-surface-500">
              <Target size={16} />
              <span className="text-xs font-medium">Dernier score obtenu</span>
            </div>
            {latest ? (
              <>
                <p className="mt-2 text-3xl font-extrabold text-surface-900">
                  {latest.scorePercent}%
                </p>
                <p className="mt-3 text-xs text-surface-500">
                  {latestLabel(latest)} du {new Date(latest.date).toLocaleDateString("fr-CA")}
                </p>
              </>
            ) : (
              <>
                <p className="mt-2 text-3xl font-extrabold text-surface-300">—</p>
                <p className="mt-3 text-xs text-surface-500">
                  Aucun score pour le moment. Passez une évaluation !
                </p>
              </>
            )}
          </Card>
          <Card>
            <div className="flex items-center gap-2 text-surface-500">
              <Flame size={16} />
              <span className="text-xs font-medium">Tests et leçons</span>
            </div>
            <p className="mt-2 text-3xl font-extrabold text-surface-900">{attempts.length}</p>
            <p className="mt-3 text-xs text-surface-500">Continuez sur votre lancée !</p>
          </Card>
        </div>

        {/* État vide : aucune donnée */}
        {!hasData && (
          <Card className="flex flex-col items-center gap-4 p-10 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
              <Rocket size={26} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-surface-900">
                Votre progression s'affichera ici
              </h2>
              <p className="mx-auto mt-1 max-w-md text-sm text-surface-600">
                Aucune donnée enregistrée pour le moment. Commencez le parcours d'apprentissage ou
                lancez votre première évaluation chronométrée : vos scores et leçons validées
                apparaîtront automatiquement ici.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/parcours">
                <Button>
                  <Map size={16} /> Démarrer le parcours
                </Button>
              </Link>
              <Link href="/evaluations">
                <Button variant="secondary">
                  <Timer size={16} /> Passer une évaluation
                </Button>
              </Link>
            </div>
          </Card>
        )}

        {/* Point faible */}
        {weak && (
          <Card className="flex flex-col gap-3 border-amber-200 bg-amber-50/60 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                <AlertTriangle size={20} />
              </div>
              <div>
                <p className="text-sm font-bold text-surface-900">
                  Point faible : {skillLabels[weak]}
                </p>
                <p className="text-xs text-surface-600">
                  C'est la compétence avec la moyenne la plus basse. Concentrez-vous sur ses leçons
                  du parcours.
                </p>
              </div>
            </div>
            <Link
              href={skillHref[weak]}
              className="inline-flex items-center gap-1 rounded-xl bg-amber-600 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-700 sm:ml-auto"
            >
              Travailler cette compétence
            </Link>
          </Card>
        )}

        {/* Progression par compétence (uniquement avec de vraies données) */}
        {hasData && (
          <div>
            <h2 className="mb-3 text-sm font-semibold text-surface-900">
              Estimation de niveau par compétence
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {liveSkills.map((p) => (
                <SkillProgressCard key={p.skill} progress={p} noEstimate={noEstimate.has(p.skill)} />
              ))}
            </div>
          </div>
        )}

        {/* Historique (uniquement réel) */}
        {hasData && <HistoryTable history={mergedHistory} />}

        {/* Avertissement pédagogique */}
        <p className="flex items-start gap-2 text-xs text-surface-400">
          <AlertTriangle size={14} className="mt-0.5 shrink-0" />
          Barèmes simplifiés à des fins pédagogiques : seuls les barèmes officiels de France
          Éducation International font foi pour la certification TCF Canada.
        </p>
      </div>
    </>
  );
}

function latestLabel(attempt: AttemptRecord): string {
  if (attempt.kind === "examen-blanc") return "Examen blanc";
  if (attempt.kind === "évaluation") return "Évaluation chronométrée";
  if (attempt.kind === "leçon") return "Leçon du parcours";
  return "Entraînement";
}