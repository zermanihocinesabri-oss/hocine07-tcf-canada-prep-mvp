"use client";

import { useState } from "react";
import { BookOpenCheck, ChevronRight, Languages, MessageSquareQuote, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { QuizPlayer } from "@/components/quiz/QuizPlayer";
import { getVocabularyQuizForTheme } from "@/lib/data/vocabulary";
import { VocabularyTheme } from "@/lib/types";
import { cefrLevelColor } from "@/lib/utils/scoring";

export function VocabularyWorkshop({
  theme,
  onBack,
}: {
  theme: VocabularyTheme;
  onBack?: () => void;
}) {
  const [quizOpen, setQuizOpen] = useState(false);
  const questions = getVocabularyQuizForTheme(theme.id);

  return (
    <div className="space-y-6">
      {onBack && (
        <Button variant="ghost" size="sm" onClick={onBack}>
          ← Retour aux thèmes
        </Button>
      )}

      <Card>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-2xl">
            {theme.emoji}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-xl font-bold text-surface-900">{theme.title}</h2>
              <Badge className={cefrLevelColor(theme.level)}>Niveau {theme.level}</Badge>
            </div>
            <p className="mt-1 text-sm text-surface-600">{theme.description}</p>
          </div>
          <Badge className="bg-surface-100 text-surface-600">
            {theme.words.length} mots · {questions.length} questions
          </Badge>
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {theme.words.map((w, i) => (
          <Card key={i} className="flex flex-col gap-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-base font-bold text-surface-900">{w.word}</span>
              {w.wordClass && (
                <span className="rounded-full bg-surface-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-surface-500">
                  {w.wordClass}
                </span>
              )}
            </div>
            {w.translation && (
              <p className="flex items-center gap-1 text-xs italic text-surface-500">
                <Languages size={12} /> {w.translation}
              </p>
            )}
            <p className="text-sm leading-relaxed text-surface-700">{w.definition}</p>
            <p className="rounded-xl bg-brand-50 p-2.5 text-xs italic leading-relaxed text-surface-600">
              <MessageSquareQuote size={12} className="mr-1 inline text-brand-600" />
              {w.example}
            </p>
            {w.family && w.family.length > 0 && (
              <div className="mt-auto flex flex-wrap gap-1.5 pt-1">
                {w.family.map((f) => (
                  <span
                    key={f}
                    className="rounded-full bg-surface-50 px-2 py-0.5 text-[11px] font-medium text-surface-600"
                  >
                    {f}
                  </span>
                ))}
              </div>
            )}
          </Card>
        ))}
      </div>

      <Card className="!bg-surface-50">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-surface-900">
            <Sparkles size={17} />
            <h3 className="text-sm font-semibold">Mini-quiz du thème</h3>
          </div>
          {!quizOpen && (
            <Button size="sm" onClick={() => setQuizOpen(true)}>
              Lancer le quiz <ChevronRight size={15} />
            </Button>
          )}
        </div>

        {quizOpen ? (
          <>
            <p className="mb-3 mt-1 flex items-center gap-1 text-xs text-surface-500">
              <BookOpenCheck size={13} /> Testez la maîtrise du lexique : chaque question reçoit une
              correction pédagogique immédiate.
            </p>
            <QuizPlayer
              key={theme.id}
              questions={questions}
              skillLabel="Vocabulaire"
              nextLabel="Quiz terminé"
            />
          </>
        ) : (
          <p className="mt-2 text-xs text-surface-500">
            {theme.words.length} mots proposés ci-dessus — lancez le mini-quiz pour vérifier vos
            acquis.
          </p>
        )}
      </Card>
    </div>
  );
}