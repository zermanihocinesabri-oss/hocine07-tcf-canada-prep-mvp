"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, GraduationCap, Headphones, BookOpenText, PenLine, Mic } from "lucide-react";
import { Topbar } from "@/components/layout/Topbar";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { courseSteps, getCourseTotalLessons } from "@/lib/data/course";
import { CourseStepId } from "@/lib/types";
import { useProgress } from "@/lib/utils/progressStore";

const stepIcons: Record<CourseStepId, typeof Headphones> = {
  1: Headphones,
  2: BookOpenText,
  3: PenLine,
  4: Mic,
};

const stepAccent: Record<CourseStepId, string> = {
  1: "bg-brand-600",
  2: "bg-sky-600",
  3: "bg-violet-600",
  4: "bg-rose-600",
};

export default function ParcoursPage() {
  const { state, isLessonCompleted } = useProgress();
  const total = getCourseTotalLessons();
  const done = state.completedLessonIds.length;
  const percent = Math.round((done / total) * 100);

  return (
    <>
      <Topbar title="Parcours d'apprentissage" />
      <div className="mx-auto max-w-4xl space-y-6 px-4 py-6 lg:px-8">
        <Card>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-600 text-white">
                <GraduationCap size={22} />
              </div>
              <div>
                <h1 className="text-lg font-bold text-surface-900">
                  Suivez votre formation progressive
                </h1>
                <p className="text-sm text-surface-500">
                  {total} leçons réparties en 4 étapes, de A1 à C2, calquées sur le programme
                  officiel du TCF Canada.
                </p>
              </div>
            </div>
            <div className="min-w-[160px]">
              <div className="mb-1.5 flex items-center justify-between text-xs text-surface-500">
                <span>Progression</span>
                <span className="font-semibold text-surface-700">
                  {done} / {total} leçons
                </span>
              </div>
              <ProgressBar value={percent} />
            </div>
          </div>
        </Card>

        <div className="space-y-4">
          {courseSteps.map((step) => {
            const Icon = stepIcons[step.id];
            const stepDone = step.lessons.filter((l) => isLessonCompleted(l.id)).length;
            const stepPercent = Math.round((stepDone / step.lessons.length) * 100);
            const complete = stepDone === step.lessons.length;
            return (
              <Link key={step.id} href={`/parcours/${step.id}`}>
                <Card className="flex flex-col gap-3 transition-colors hover:border-brand-300 sm:flex-row sm:items-center">
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-white ${stepAccent[step.id]}`}
                  >
                    <Icon size={22} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-base font-semibold text-surface-900">
                        Étape {step.id} — {step.title}
                      </p>
                      {complete && (
                        <Badge className="bg-emerald-100 text-emerald-700">
                          <CheckCircle2 size={13} className="mr-1 inline" /> Terminée
                        </Badge>
                      )}
                    </div>
                    <p className="mt-0.5 text-xs text-surface-500">{step.chapter}</p>
                    <p className="mt-1 text-sm text-surface-600">{step.subtitle}</p>
                  </div>
                  <div className="w-full shrink-0 sm:w-48">
                    <div className="mb-1.5 flex items-center justify-between text-xs text-surface-500">
                      <span>
                        {stepDone} / {step.lessons.length} leçons
                      </span>
                      <span className="font-semibold text-surface-700">{stepPercent}%</span>
                    </div>
                    <ProgressBar value={stepPercent} />
                    <span className="mt-2 flex items-center gap-1 text-xs font-semibold text-brand-600">
                      Commencer <ArrowRight size={13} />
                    </span>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}