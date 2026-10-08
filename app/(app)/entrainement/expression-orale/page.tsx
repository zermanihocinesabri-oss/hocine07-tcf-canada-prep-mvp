"use client";

import { useState } from "react";
import { Topbar } from "@/components/layout/Topbar";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { LevelSelector } from "@/components/ui/LevelSelector";
import { SpeakingSession } from "@/components/speaking/SpeakingSession";
import { OralSimulator } from "@/components/eo/OralSimulator";
import { getSpeakingTopicsForLevel } from "@/lib/data/speakingTopics";
import { CefrLevel } from "@/lib/types";
import { cefrLevelColor } from "@/lib/utils/scoring";
import { cn } from "@/lib/utils/scoring";

type Mode = "classique" | "simulateur";

export default function ExpressionOralePage() {
  const [level, setLevel] = useState<CefrLevel>("B1");
  const [mode, setMode] = useState<Mode>("classique");
  const topics = getSpeakingTopicsForLevel(level);
  const [selectedId, setSelectedId] = useState<string>(topics[0].id);

  function handleLevelChange(newLevel: CefrLevel) {
    setLevel(newLevel);
    const nextTopics = getSpeakingTopicsForLevel(newLevel);
    setSelectedId(nextTopics[0].id);
  }

  const topic = topics.find((t) => t.id === selectedId) ?? topics[0];

  return (
    <>
      <Topbar title="Expression Orale" />
      <div className="space-y-6 px-4 py-6 lg:px-8">
        <Card className="mx-auto w-full max-w-2xl">
          <h2 className="mb-2 text-sm font-semibold text-surface-900">
            Choisissez votre niveau CECRL
          </h2>
          <p className="mb-3 text-xs text-surface-500">
            Mode classique : enregistrez votre voix avec votre micro (MediaRecorder),
            réécoutez-vous, téléchargez ou sauvegardez votre audio, puis consultez le
            corrigé type. Mode simulateur : enchaînez les 3 tâches officielles avec
            chronomètres stricts, transcription vocale et grille d&apos;évaluation.
          </p>
          <LevelSelector value={level} onChange={handleLevelChange} />
          <div className="mt-4 grid grid-cols-2 gap-2">
            <button
              onClick={() => setMode("classique")}
              className={cn(
                "rounded-xl border px-3 py-2 text-sm font-medium transition-colors",
                mode === "classique"
                  ? "border-brand-600 bg-brand-600 text-white"
                  : "border-surface-200 bg-white text-surface-600 hover:bg-brand-50"
              )}
            >
              Classique
            </button>
            <button
              onClick={() => setMode("simulateur")}
              className={cn(
                "rounded-xl border px-3 py-2 text-sm font-medium transition-colors",
                mode === "simulateur"
                  ? "border-brand-600 bg-brand-600 text-white"
                  : "border-surface-200 bg-white text-surface-600 hover:bg-brand-50"
              )}
            >
              Simulateur cadencé
            </button>
          </div>
          {mode === "classique" && (
            <div className="mt-4 flex flex-wrap gap-3">
              {topics.map((t) => (
                <button key={t.id} onClick={() => setSelectedId(t.id)}>
                  <Card
                    className={cn(
                      "cursor-pointer px-4 py-2.5",
                      selectedId === t.id && "border-brand-400 bg-brand-50"
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <Badge className={cefrLevelColor(t.level)}>Tâche {t.taskNumber}</Badge>
                      <p className="text-sm font-semibold text-surface-800">{t.theme}</p>
                    </div>
                    <Badge className="mt-1 bg-surface-100 text-surface-500">
                      Préparation {t.prepTimeSeconds}s · Parole {t.speakTimeSeconds}s
                    </Badge>
                  </Card>
                </button>
              ))}
            </div>
          )}
        </Card>
        {mode === "classique" ? (
          <SpeakingSession key={topic.id} topic={topic} />
        ) : (
          <OralSimulator key={level} level={level} />
        )}
      </div>
    </>
  );
}