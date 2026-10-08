"use client";

import { useState } from "react";
import { Hourglass, Mic, Lightbulb, ListChecks, BookMarked, ClipboardCheck } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Timer } from "@/components/quiz/Timer";
import { AudioRecorder } from "@/components/speaking/AudioRecorder";
import { SelfAssessment } from "@/components/speaking/SelfAssessment";
import { SpeakingTopic } from "@/lib/types";
import { cefrLevelColor, cefrToNclc } from "@/lib/utils/scoring";

type Phase = "ready" | "prep" | "speak";

export function SpeakingSession({
  topic,
  completeLabel = "Terminer l'examen blanc",
  onComplete,
}: {
  topic: SpeakingTopic;
  completeLabel?: string;
  onComplete?: () => void;
}) {
  const [phase, setPhase] = useState<Phase>("ready");
  const [showCorrige, setShowCorrige] = useState(false);
  const [showAssessment, setShowAssessment] = useState(false);

  return (
    <Card className="mx-auto max-w-2xl">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Badge className={cefrLevelColor(topic.level)}>Niveau {topic.level}</Badge>
          <Badge className="bg-brand-50 text-brand-700">
            Sujet {topic.taskNumber} · {topic.theme}
          </Badge>
        </div>
        {phase === "prep" && (
          <Timer
            totalSeconds={topic.prepTimeSeconds}
            isRunning
            onExpire={() => setPhase("speak")}
          />
        )}
        {phase === "speak" && <Timer totalSeconds={topic.speakTimeSeconds} isRunning />}
      </div>

      <p className="mb-6 text-sm leading-relaxed text-surface-700">{topic.prompt}</p>

      {phase === "ready" && (
        <div className="flex flex-col items-center gap-3 rounded-xl bg-surface-50 p-8 text-center">
          <Hourglass className="text-brand-600" size={24} />
          <p className="text-sm text-surface-600">
            Temps de préparation : {topic.prepTimeSeconds}s · Temps de parole :{" "}
            {topic.speakTimeSeconds}s
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button onClick={() => setPhase("prep")}>Commencer la préparation</Button>
            <Button variant="ghost" onClick={() => setShowCorrige(!showCorrige)}>
              <Lightbulb size={16} />
              {showCorrige ? "Masquer" : "Voir"} le corrigé type
            </Button>
          </div>
        </div>
      )}

      {phase === "prep" && (
        <div className="flex flex-col items-center gap-3 rounded-xl bg-surface-50 p-8 text-center">
          <p className="text-sm font-medium text-surface-700">
            Préparez vos idées, l'enregistrement démarrera automatiquement.
          </p>
          <Button variant="secondary" onClick={() => setPhase("speak")}>
            Passer directement à l'oral
          </Button>
        </div>
      )}

      {phase === "speak" && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-medium text-surface-700">
            <Mic size={16} className="text-brand-600" /> À vous de parler
          </div>
          <AudioRecorder recordingLabel={`EO Tâche ${topic.taskNumber} — ${topic.theme}`} />
          <Button variant="secondary" onClick={() => setShowAssessment(!showAssessment)}>
            <ClipboardCheck size={16} />
            {showAssessment ? "Masquer" : "M'auto-évaluer"} selon la grille TCF
          </Button>
          {onComplete && (
            <Button className="w-full" onClick={onComplete}>
              {completeLabel}
            </Button>
          )}
        </div>
      )}

      {phase === "speak" && showAssessment && (
        <div className="mt-6 border-t border-surface-200 pt-4">
          <SelfAssessment topicId={topic.id} />
        </div>
      )}

      {showCorrige && (
        <div className="mt-6 space-y-4 border-t border-surface-200 pt-4">
          <div className="flex items-center gap-2 text-surface-900">
            <Lightbulb size={18} className="text-brand-600" />
            <h3 className="text-sm font-semibold">Corrigé type — points clés à aborder</h3>
          </div>
          <ul className="space-y-2">
            {topic.samplePoints.map((p, i) => (
              <li key={i} className="flex gap-2 rounded-xl bg-surface-50 p-3 text-sm text-surface-700">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-600 text-[11px] font-bold text-white">
                  {i + 1}
                </span>
                {p}
              </li>
            ))}
          </ul>

          {topic.modelAnswer && (
            <div className="rounded-xl bg-emerald-50 p-3">
              <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-emerald-700">
                Exemple de production (niveau {topic.level})
              </p>
              <p className="text-xs leading-relaxed text-surface-700">{topic.modelAnswer}</p>
            </div>
          )}

          {topic.vocabularyNotes && (
            <div>
              <p className="mb-1 flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-surface-400">
                <BookMarked size={13} /> Vocabulaire utile
              </p>
              <div className="flex flex-wrap gap-1.5">
                {topic.vocabularyNotes.map((w) => (
                  <span
                    key={w}
                    className="rounded-full bg-brand-50 px-2 py-0.5 text-xs font-medium text-brand-800"
                  >
                    {w}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div>
            <p className="mb-1 flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-surface-400">
              <ListChecks size={13} /> Critères de correction TCF
            </p>
            <ul className="space-y-1.5">
              {topic.evaluationCriteria.map((c) => (
                <li key={c.label} className="rounded-lg bg-surface-50 p-2.5 text-xs">
                  <span className="font-semibold text-surface-800">{c.label}.</span>{" "}
                  <span className="text-surface-500">{c.description}</span>
                </li>
              ))}
            </ul>
          </div>

          <p className="rounded-xl bg-brand-50 p-3 text-xs text-brand-800">
            Objectif indicatif : un bon oral sur ce sujet à niveau {topic.level} correspond à{" "}
            <span className="font-semibold">{cefrToNclc(topic.level)}</span> à l'échelle NCLC.
          </p>
        </div>
      )}
    </Card>
  );
}