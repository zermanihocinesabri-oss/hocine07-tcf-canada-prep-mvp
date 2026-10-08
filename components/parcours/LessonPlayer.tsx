"use client";

import { useState } from "react";
import {
  ArrowRight,
  Award,
  CheckCircle2,
  Lightbulb,
  ListChecks,
  RotateCcw,
  Target,
  XCircle,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { QuizPlayer } from "@/components/quiz/QuizPlayer";
import { WritingEditor } from "@/components/writing/WritingEditor";
import { SpeakingSession } from "@/components/speaking/SpeakingSession";
import { CourseLesson, Skill } from "@/lib/types";
import { getQuestionsForLevel } from "@/lib/data/questions";
import { getWritingTasksForLevel } from "@/lib/data/writingTasks";
import { getSpeakingTopicsForLevel } from "@/lib/data/speakingTopics";
import { cefrLevelColor } from "@/lib/utils/scoring";
import { useProgress } from "@/lib/utils/progressStore";

export const stepToSkill: Record<1 | 2 | 3 | 4, Skill> = {
  1: "CO",
  2: "CE",
  3: "EE",
  4: "EO",
};

export const stepSkillLabel: Record<1 | 2 | 3 | 4, string> = {
  1: "Compréhension Orale",
  2: "Compréhension Écrite",
  3: "Expression Écrite",
  4: "Expression Orale",
};

export function LessonPlayer({
  lesson,
  onBack,
}: {
  lesson: CourseLesson;
  onBack?: () => void;
}) {
  const { completeLesson, addAttempt, isLessonCompleted } = useProgress();
  const [validated, setValidated] = useState(isLessonCompleted(lesson.id));
  const [score, setScore] = useState<number | null>(null);
  const skill = stepToSkill[lesson.step];
  const skillLabel = stepSkillLabel[lesson.step];

  function handleComplete(s: number) {
    setScore(s);
    if (s >= lesson.minScoreToPass) {
      completeLesson(lesson.id, lesson.title, skill, s);
      setValidated(true);
    } else {
      addAttempt({ kind: "leçon", skill, label: lesson.title, scorePercent: s });
      setValidated(false);
    }
  }

  const exercise = lesson.exercise;

  return (
    <div className="space-y-6">
      {onBack && (
        <Button variant="ghost" size="sm" onClick={onBack}>
          ← Retour à l'étape
        </Button>
      )}

      <Card>
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <Badge className={cefrLevelColor(lesson.level)}>Niveau {lesson.level}</Badge>
          <Badge className="bg-surface-100 text-surface-600">
            Leçon {lesson.order} · ~{lesson.durationMinutes} min
          </Badge>
          {validated && (
            <Badge className="bg-emerald-100 text-emerald-700">
              <CheckCircle2 size={13} className="mr-1 inline" /> Leçon validée
            </Badge>
          )}
        </div>
        <h2 className="text-xl font-bold text-surface-900">{lesson.title}</h2>
        <p className="mt-1 flex items-start gap-1.5 text-sm text-surface-600">
          <Target size={15} className="mt-0.5 shrink-0 text-brand-600" />
          {lesson.objective}
        </p>
      </Card>

      <div className="space-y-4">
        {lesson.theory.map((section, i) => (
          <Card key={i}>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-surface-900">
              {section.heading}
            </h3>
            <ul className="space-y-2">
              {section.content.map((point, j) => (
                <li key={j} className="flex gap-2 text-sm leading-relaxed text-surface-700">
                  <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-surface-300" />
                  {point}
                </li>
              ))}
            </ul>
            {section.examples && section.examples.length > 0 && (
              <div className="mt-3 space-y-1.5 rounded-xl bg-surface-50 p-3">
                {section.examples.map((ex, j) => (
                  <p key={j} className="text-xs italic leading-relaxed text-surface-600">
                    <span className="font-semibold not-italic text-brand-700">Exemple : </span>
                    {ex}
                  </p>
                ))}
              </div>
            )}
            {section.tip && (
              <div className="mt-3 flex items-start gap-2 rounded-xl bg-brand-50 p-3 text-sm text-brand-800">
                <Lightbulb size={16} className="mt-0.5 shrink-0" />
                <p>
                  <span className="font-semibold">À retenir : </span>
                  {section.tip}
                </p>
              </div>
            )}
          </Card>
        ))}
      </div>

      <Card className="!bg-surface-50">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-surface-900">
            <ListChecks size={17} />
            <h3 className="text-sm font-semibold">Exercice d'application</h3>
          </div>
          <Badge className="bg-brand-600 text-white">Score requis : {lesson.minScoreToPass}%</Badge>
        </div>

        {score === null && exercise.kind === "quiz" && (
          <QuizPlayer
            questions={getQuestionsForLevel(exercise.skill, exercise.level).slice(
              0,
              exercise.count ?? 3
            )}
            skillLabel={exercise.skill === "CO" ? "Compréhension Orale" : "Compréhension Écrite"}
            nextLabel="Valider la leçon"
            onComplete={handleComplete}
          />
        )}

        {score === null && exercise.kind === "writing" && (
          <WritingEditor
            task={
              getWritingTasksForLevel(exercise.level).find(
                (t) => t.taskNumber === exercise.taskNumber
              ) ?? getWritingTasksForLevel(exercise.level)[0]
            }
            completeLabel="Valider la leçon"
            onComplete={({ withinRange }) =>
              handleComplete(withinRange ? 100 : 35)
            }
          />
        )}

        {score === null && exercise.kind === "speaking" && (
          <SpeakingSession
            topic={
              getSpeakingTopicsForLevel(exercise.level).find(
                (t) => t.taskNumber === exercise.taskNumber
              ) ?? getSpeakingTopicsForLevel(exercise.level)[0]
            }
            completeLabel="Valider la leçon"
            onComplete={() => handleComplete(100)}
          />
        )}

        {score !== null && (
          <Card className="!bg-white text-center">
            <div
              className={`mx-auto flex h-12 w-12 items-center justify-center rounded-full ${
                validated ? "bg-emerald-100 text-emerald-600" : "bg-red-100 text-red-600"
              }`}
            >
              {validated ? <Award size={24} /> : <XCircle size={24} />}
            </div>
            <h4 className="mt-3 text-lg font-bold text-surface-900">
              {validated ? "Leçon validée !" : "Leçon non validée"}
            </h4>
            <p
              className={`mt-1 text-sm ${
                validated ? "text-emerald-700" : "text-red-700"
              }`}
            >
              Votre score : <strong>{score} %</strong>
              {validated
                ? ` — seuil atteint (${lesson.minScoreToPass} %).`
                : ` — seuil non atteint (minimum ${lesson.minScoreToPass} %).`}
            </p>
            <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:justify-center">
              {onBack && (
                <Button onClick={onBack}>
                  Continuer le parcours <ArrowRight size={16} />
                </Button>
              )}
              {!validated && (
                <Button variant="ghost" onClick={() => setScore(null)}>
                  <RotateCcw size={16} /> Recommencer l'exercice
                </Button>
              )}
            </div>
          </Card>
        )}
      </Card>
    </div>
  );
}