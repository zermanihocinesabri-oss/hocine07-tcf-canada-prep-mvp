"use client";

import { useState } from "react";
import { Headphones, BookOpenText, PenLine, Mic, PlayCircle, Trophy } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { LevelSelector } from "@/components/ui/LevelSelector";
import { QuizPlayer } from "@/components/quiz/QuizPlayer";
import { WritingEditor } from "@/components/writing/WritingEditor";
import { OralSimulator } from "@/components/eo/OralSimulator";
import { getQuestionsForLevel } from "@/lib/data/questions";
import { getWritingTasksForLevel } from "@/lib/data/writingTasks";
import { CefrLevel } from "@/lib/types";
import { estimateNclcLevel, levelBadgeColor, cefrLevelColor } from "@/lib/utils/scoring";

const sections = [
  { key: "CO", label: "Compréhension Orale", icon: Headphones, duration: "≈ 5 min" },
  { key: "CE", label: "Compréhension Écrite", icon: BookOpenText, duration: "≈ 5 min" },
  { key: "EE", label: "Expression Écrite (3 tâches)", icon: PenLine, duration: "≈ 30 min" },
  { key: "EO", label: "Expression Orale (simulateur)", icon: Mic, duration: "≈ 12 min" },
] as const;

const MAX_STAGE = 6; // 0..5 épreuves + 6 = résumé

const stageMeta = [
  { label: "Épreuve 1 — Compréhension Orale" },
  { label: "Épreuve 2 — Compréhension Écrite" },
  { label: "Épreuve 3 — Expression Écrite · Tâche 1 (message 40–60 mots)" },
  { label: "Épreuve 4 — Expression Écrite · Tâche 2 (article/récit 120–150 mots)" },
  { label: "Épreuve 5 — Expression Écrite · Tâche 3 (point de vue 120–150 mots)" },
  { label: "Épreuve 6 — Expression Orale · simulateur cadencé (3 tâches)" },
];

export function ExamBlancRunner() {
  const [stage, setStage] = useState<number>(-1);
  const [level, setLevel] = useState<CefrLevel>("B1");
  const [coScore, setCoScore] = useState<number | null>(null);
  const [ceScore, setCeScore] = useState<number | null>(null);
  const [eoScore, setEoScore] = useState<number | null>(null);

  if (stage === -1) {
    return (
      <Card className="mx-auto max-w-2xl text-center">
        <Trophy className="mx-auto mb-3 text-brand-600" size={32} />
        <h2 className="text-xl font-bold text-surface-900">Examen Blanc — Simulation réelle</h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-surface-600">
          Vous allez enchaîner les 4 épreuves officielles du TCF Canada, dans l'ordre,
          avec un chronomètre pour chacune. Indiquez d'abord le niveau CECRL sur lequel
          vous souhaitez vous entraîner.
        </p>
        <div className="mx-auto mt-6 max-w-md text-left">
          <p className="mb-2 text-sm font-semibold text-surface-800">
            Niveau ciblé pour cette session
          </p>
          <LevelSelector value={level} onChange={setLevel} />
        </div>
        <div className="mx-auto mt-6 grid max-w-md grid-cols-2 gap-3">
          {sections.map((s) => (
            <div
              key={s.key}
              className="flex items-center gap-2 rounded-xl bg-surface-50 p-3 text-left"
            >
              <s.icon size={18} className="text-brand-600" />
              <div>
                <p className="text-xs font-semibold text-surface-800">{s.label}</p>
                <p className="text-[11px] text-surface-500">{s.duration}</p>
              </div>
            </div>
          ))}
        </div>
        <Button className="mt-6" size="lg" onClick={() => setStage(0)}>
          <PlayCircle size={18} /> Démarrer l'examen blanc (niveau {level})
        </Button>
      </Card>
    );
  }

  if (stage === MAX_STAGE) {
    const scored = [coScore, ceScore, eoScore].filter((s) => s !== null) as number[];
    const globalScore = scored.length
      ? Math.round(scored.reduce((a, b) => a + b, 0) / scored.length)
      : 0;
    const levelNclc = estimateNclcLevel(globalScore);
    return (
      <Card className="mx-auto max-w-lg text-center">
        <Trophy className="mx-auto mb-3 text-brand-600" size={32} />
        <h2 className="text-lg font-bold text-surface-900">Examen blanc terminé !</h2>
        <p className="mt-2 text-4xl font-extrabold text-surface-900">{globalScore}%</p>
        <p className="mt-1 text-sm text-surface-500">
          Score combiné (CO + CE + EO) sur les {scored.length} épreuves évaluées
          automatiquement
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          <Badge className={levelBadgeColor(levelNclc)}>Niveau estimé global : {levelNclc}</Badge>
          <Badge className={cefrLevelColor(level)}>Entraînement niveau {level}</Badge>
        </div>
        <p className="mt-4 text-xs text-surface-400">
          Vos 3 productions écrites ont été vérifiées sur le nombre de mots (« respect de la
          consigne ») et votre simulation orale (transcription + grille d'auto-évaluation) a
          été sauvegardée dans votre navigateur. Consultez les corrigés types depuis les pages
          d'entraînement pour évaluer chaque tâche en détail.
        </p>
        <Button className="mt-6" onClick={() => setStage(-1)}>
          Retour à l'accueil de l'examen
        </Button>
      </Card>
    );
  }

  const coQuestions = getQuestionsForLevel("CO", level);
  const ceQuestions = getQuestionsForLevel("CE", level);
  const eeTasks = getWritingTasksForLevel(level);

  return (
    <div>
      <div className="mx-auto mb-6 flex max-w-2xl items-center justify-center gap-2">
        {Array.from({ length: MAX_STAGE }, (_, i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full ${
              i <= stage ? "bg-brand-600" : "bg-surface-200"
            }`}
          />
        ))}
      </div>
      <p className="mb-4 text-center text-xs font-semibold uppercase tracking-wide text-surface-400">
        {stageMeta[stage].label}
      </p>

      {stage === 0 && (
        <QuizPlayer
          key={`co-${level}`}
          questions={coQuestions}
          skillLabel="Compréhension Orale"
          onComplete={(score) => {
            setCoScore(score);
            setStage(1);
          }}
        />
      )}
      {stage === 1 && (
        <QuizPlayer
          key={`ce-${level}`}
          questions={ceQuestions}
          skillLabel="Compréhension Écrite"
          onComplete={(score) => {
            setCeScore(score);
            setStage(2);
          }}
        />
      )}
      {stage === 2 && (
        <WritingEditor
          key={eeTasks[0].id}
          task={eeTasks[0]}
          onComplete={() => setStage(3)}
        />
      )}
      {stage === 3 && (
        <WritingEditor
          key={eeTasks[1].id}
          task={eeTasks[1]}
          onComplete={() => setStage(4)}
        />
      )}
      {stage === 4 && (
        <WritingEditor
          key={eeTasks[2].id}
          task={eeTasks[2]}
          onComplete={() => setStage(5)}
        />
      )}
      {stage === 5 && (
        <OralSimulator
          key={`eo-${level}`}
          level={level}
          onComplete={(score) => {
            setEoScore(score);
            setStage(MAX_STAGE);
          }}
        />
      )}
    </div>
  );
}