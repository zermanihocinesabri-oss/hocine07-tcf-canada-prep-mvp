"use client";

import { useState } from "react";
import { Topbar } from "@/components/layout/Topbar";
import { QuizPlayer } from "@/components/quiz/QuizPlayer";
import { LevelSelector } from "@/components/ui/LevelSelector";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { getQuestionsForLevel } from "@/lib/data/questions";
import { CefrLevel } from "@/lib/types";
import { cn } from "@/lib/utils/scoring";

export default function ComprehensionOralePage() {
  const [level, setLevel] = useState<CefrLevel>("A2");
  const [theme, setTheme] = useState<string | null>(null);
  const questions = getQuestionsForLevel("CO", level);
  const themes = Array.from(new Set(questions.map((q) => q.theme)));
  const filtered = theme ? questions.filter((q) => q.theme === theme) : questions;

  function handleLevelChange(next: CefrLevel) {
    setLevel(next);
    setTheme(null);
  }

  return (
    <>
      <Topbar title="Compréhension Orale" />
      <div className="space-y-6 px-4 py-6 lg:px-8">
        <Card className="mx-auto max-w-3xl">
          <h2 className="mb-2 text-sm font-semibold text-surface-900">
            Choisissez votre niveau CECRL
          </h2>
          <p className="mb-3 text-xs text-surface-500">
            Les audios sont simulés par lecture vocale de retranscriptions réalistes
            (annonces, dialogues, reportages, interviews). Écoutez, répondez, puis consultez la
            correction détaillée.
          </p>
          <LevelSelector value={level} onChange={handleLevelChange} />
          {themes.length > 0 && (
            <div className="mt-4">
              <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-surface-400">
                Filtrer par thème
              </p>
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => setTheme(null)}
                  className={cn(
                    "rounded-full px-2.5 py-1 text-xs font-medium transition-colors",
                    theme === null
                      ? "bg-brand-600 text-white"
                      : "bg-surface-100 text-surface-600 hover:bg-surface-200"
                  )}
                >
                  Tous
                </button>
                {themes.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTheme(theme === t ? null : t)}
                    className={cn(
                      "rounded-full px-2.5 py-1 text-xs font-medium transition-colors",
                      theme === t
                        ? "bg-brand-600 text-white"
                        : "bg-surface-100 text-surface-600 hover:bg-surface-200"
                    )}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          )}
          <div className="mt-4 flex items-center justify-between">
            <Badge className="bg-surface-100 text-surface-600">
              {filtered.length} exercice{filtered.length > 1 ? "s" : ""} disponibles
            </Badge>
            <Badge className="bg-brand-50 text-brand-700">Chronomètre : 60 s / question</Badge>
          </div>
        </Card>
        <QuizPlayer
          key={`${level}-${theme ?? "tous"}-${filtered.length}`}
          questions={filtered}
          skillLabel="Compréhension Orale"
        />
      </div>
    </>
  );
}