"use client";

import { useState } from "react";
import { ArrowRight, BookOpen, CheckCircle2, Clock3, Headphones, BookOpenText, PenLine, Mic } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { CourseStep, CourseStepId } from "@/lib/types";
import { cefrLevelColor } from "@/lib/utils/scoring";
import { useProgress } from "@/lib/utils/progressStore";
import { LessonPlayer } from "@/components/parcours/LessonPlayer";

const stepIcons: Record<CourseStepId, typeof Headphones> = {
  1: Headphones,
  2: BookOpenText,
  3: PenLine,
  4: Mic,
};

export function EtapeView({ step }: { step: CourseStep }) {
  const { isLessonCompleted } = useProgress();
  const [openLessonId, setOpenLessonId] = useState<string | null>(null);
  const Icon = stepIcons[step.id];
  const doneCount = step.lessons.filter((l) => isLessonCompleted(l.id)).length;

  if (openLessonId) {
    const lesson = step.lessons.find((l) => l.id === openLessonId);
    if (!lesson) {
      return <p className="text-sm text-surface-500">Leçon introuvable.</p>;
    }
    return <LessonPlayer lesson={lesson} onBack={() => setOpenLessonId(null)} />;
  }

  return (
    <div>
      <div className="mb-4 flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-600 text-white">
          <Icon size={24} />
        </div>
        <div>
          <h1 className="text-xl font-bold text-surface-900">{step.title}</h1>
          <p className="mt-1 flex items-center gap-1 text-xs text-surface-500">
            <BookOpen size={13} /> {step.chapter}
          </p>
          <p className="mt-1 text-sm text-surface-600">{step.subtitle}</p>
        </div>
      </div>

      <div className="mb-4 flex items-center gap-2">
        <Badge className="bg-emerald-100 text-emerald-700">
          <CheckCircle2 size={13} className="mr-1 inline" />
          {doneCount} / {step.lessons.length} leçons validées
        </Badge>
        <Badge className="bg-surface-100 text-surface-600">
          <Clock3 size={13} className="mr-1 inline" />
          ≈ {step.lessons.reduce((a, l) => a + l.durationMinutes, 0)} min de travail
        </Badge>
      </div>

      <div className="space-y-3">
        {step.lessons.map((lesson) => {
          const done = isLessonCompleted(lesson.id);
          return (
            <Card
              key={lesson.id}
              className="flex cursor-pointer flex-col gap-3 transition-colors hover:border-brand-300 sm:flex-row sm:items-center"
              onClick={() => setOpenLessonId(lesson.id)}
            >
              <div className="flex flex-1 items-start gap-3">
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-sm font-bold ${
                    done ? "bg-emerald-100 text-emerald-700" : "bg-surface-100 text-surface-600"
                  }`}
                >
                  {lesson.order}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-surface-900">{lesson.title}</p>
                  <p className="mt-0.5 line-clamp-2 text-xs text-surface-500">{lesson.objective}</p>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <div className="hidden flex-col items-end gap-1 sm:flex">
                  <Badge className={cefrLevelColor(lesson.level)}>Niveau {lesson.level}</Badge>
                  <span className="text-[11px] text-surface-400">~{lesson.durationMinutes} min</span>
                </div>
                {done ? (
                  <CheckCircle2 size={20} className="text-emerald-500" />
                ) : (
                  <ArrowRight size={18} className="text-surface-300" />
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}