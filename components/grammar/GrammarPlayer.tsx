"use client";

import { CheckCircle2, Lightbulb, ListChecks, Target, TriangleAlert } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { QuizPlayer } from "@/components/quiz/QuizPlayer";
import {
  getGrammarCategoryById,
  getGrammarQuestionsForCategory,
} from "@/lib/data/grammar";
import { GrammarLesson } from "@/lib/types";

export function GrammarPlayer({
  lesson,
  onBack,
}: {
  lesson: GrammarLesson;
  onBack?: () => void;
}) {
  const category = getGrammarCategoryById(lesson.category);
  const questions = getGrammarQuestionsForCategory(lesson.category);

  return (
    <div className="space-y-6">
      {onBack && (
        <Button variant="ghost" size="sm" onClick={onBack}>
          ← Retour aux leçons
        </Button>
      )}

      <Card>
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <Badge className="bg-brand-600 text-white">Niveau {lesson.level}</Badge>
          {category && <Badge className="bg-surface-100 text-surface-600">{category.title}</Badge>}
          <Badge className="bg-surface-100 text-surface-600">
            ~{lesson.durationMinutes} min · {questions.length} questions
          </Badge>
        </div>
        <h2 className="text-xl font-bold text-surface-900">{lesson.title}</h2>
        <p className="mt-1 flex items-start gap-1.5 text-sm text-surface-600">
          <Target size={15} className="mt-0.5 shrink-0 text-brand-600" />
          {lesson.summary}
        </p>
      </Card>

      <div className="space-y-4">
        {lesson.sections.map((section, i) => (
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

      {lesson.traps && lesson.traps.length > 0 && (
        <Card className="!border-red-200 !bg-red-50">
          <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold text-red-700">
            <TriangleAlert size={16} /> Pièges classiques au TCF
          </h3>
          <ul className="space-y-1.5">
            {lesson.traps.map((trap, i) => (
              <li key={i} className="flex gap-2 text-sm text-red-700">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400" />
                {trap}
              </li>
            ))}
          </ul>
        </Card>
      )}

      <Card className="!bg-surface-50">
        <div className="mb-3 flex items-center gap-2 text-surface-900">
          <ListChecks size={17} />
          <h3 className="text-sm font-semibold">Application — QCM de grammaire</h3>
        </div>
        <QuizPlayer
          key={lesson.id}
          questions={questions}
          skillLabel="Grammaire"
          nextLabel="Terminer la leçon"
        />
      </Card>
    </div>
  );
}