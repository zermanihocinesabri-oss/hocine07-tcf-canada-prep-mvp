"use client";

import { useState } from "react";
import { Topbar } from "@/components/layout/Topbar";
import { LevelSelector } from "@/components/ui/LevelSelector";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { WritingEditor } from "@/components/writing/WritingEditor";
import { getWritingTasksForLevel } from "@/lib/data/writingTasks";
import { CefrLevel, WritingTask } from "@/lib/types";
import { cefrLevelColor } from "@/lib/utils/scoring";
import { cn } from "@/lib/utils/scoring";

export default function ExpressionEcritePage() {
  const [level, setLevel] = useState<CefrLevel>("B1");
  const tasks = getWritingTasksForLevel(level);
  const [selectedId, setSelectedId] = useState<string>(tasks[0].id);

  function handleLevelChange(newLevel: CefrLevel) {
    setLevel(newLevel);
    const nextTasks = getWritingTasksForLevel(newLevel);
    setSelectedId(nextTasks[0].id);
  }

  const task = tasks.find((t) => t.id === selectedId) ?? tasks[0];

  return (
    <>
      <Topbar title="Expression Écrite" />
      <div className="space-y-6 px-4 py-6 lg:px-8">
        <Card className="mx-auto w-full max-w-5xl">
          <h2 className="mb-2 text-sm font-semibold text-surface-900">
            Choisissez votre niveau CECRL
          </h2>
          <p className="mb-3 text-xs text-surface-500">
            Les 3 tâches officielles du TCF Canada, avec compteur de mots strict et
            corrigé type détaillé : Tâche 1 (40–60 mots), Tâches 2 et 3 (120–150 mots).
          </p>
          <LevelSelector value={level} onChange={handleLevelChange} />
          <div className="mt-4 flex flex-wrap gap-3">
            {tasks.map((t: WritingTask) => (
              <button key={t.id} onClick={() => setSelectedId(t.id)}>
                <Card
                  className={cn(
                    "cursor-pointer px-4 py-2.5",
                    selectedId === t.id && "border-brand-400 bg-brand-50"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <Badge className={cefrLevelColor(t.level)}>Tâche {t.taskNumber}</Badge>
                    <p className="text-sm font-semibold text-surface-800">{t.title}</p>
                  </div>
                  <Badge className="mt-1 bg-surface-100 text-surface-500">
                    {t.minWords}–{t.maxWords} mots · {t.timeLimitMinutes} min
                  </Badge>
                </Card>
              </button>
            ))}
          </div>
        </Card>
        <WritingEditor key={task.id} task={task} />
      </div>
    </>
  );
}