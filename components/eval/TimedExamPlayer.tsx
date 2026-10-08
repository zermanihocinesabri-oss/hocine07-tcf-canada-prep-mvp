"use client";

import { useMemo, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  Award,
  CheckCircle2,
  Clock3,
  Hourglass,
  PlayCircle,
  RotateCcw,
  ScrollText,
  Square,
  Volume2,
  XCircle,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Timer } from "@/components/quiz/Timer";
import { WritingEditor } from "@/components/writing/WritingEditor";
import { SpeakingSession } from "@/components/speaking/SpeakingSession";
import { Skill } from "@/lib/types";
import { getQuestionsForSkill } from "@/lib/data/questions";
import { getWritingTasksForLevel } from "@/lib/data/writingTasks";
import { getSpeakingTopicsForLevel } from "@/lib/data/speakingTopics";
import { tcfOfficial, officialSecondsPerItem, convertPercentToTcf } from "@/lib/data/tcf";
import { cefrLevelColor } from "@/lib/utils/scoring";
import { useProgress } from "@/lib/utils/progressStore";

const skin = {
  CO: {
    qcm: true as boolean,
    color: "bg-brand-600",
    header: "Évaluation — Compréhension Orale",
    exerciseLabel: "écouter l'audio",
    note: "Temps total calé sur l'épreuve officielle (recalculé pour 18 questions représentatives).",
  },
  CE: {
    qcm: true as boolean,
    color: "bg-sky-600",
    header: "Évaluation — Compréhension Écrite",
    exerciseLabel: "appuyer sur le document",
    note: "Temps total calé sur l'épreuve officielle (recalculé pour 18 questions représentatives).",
  },
  EE: {
    qcm: false as boolean,
    color: "bg-violet-600",
    header: "Évaluation — Expression Écrite",
    exerciseLabel: "rédiger vos 3 textes",
    note: "3 tâches officielles : message (40-60 mots), article/récit (120-150 mots), point de vue (120-150 mots).",
  },
  EO: {
    qcm: false as boolean,
    color: "bg-rose-600",
    header: "Évaluation — Expression Orale",
    exerciseLabel: "enregistrer vos 3 tâches",
    note: "3 tâches officielles d'entretien, d'interaction et de point de vue argumenté.",
  },
};

type Phase = "intro" | "run" | "result";

export function TimedExamPlayer({ skill }: { skill: Skill }) {
  const spec = tcfOfficial[skill];
  const cfg = skin[skill];
  const [phase, setPhase] = useState<Phase>("intro");
  const [result, setResult] = useState<number | null>(null);

  // --- QCM (CO / CE) ---
  const questions = useMemo(() => (skill === "CO" || skill === "CE" ? getQuestionsForSkill(skill) : []), [skill]);
  const [qIndex, setQIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [validated, setValidated] = useState<Record<string, boolean>>({});

  // --- EE / EO ---
  const [taskIndex, setTaskIndex] = useState(0);
  const [eeScores, setEeScores] = useState<number[]>([]);
  const [eoDone, setEoDone] = useState(0);
  const eoTopics = useMemo(
    () => (skill === "EO" ? getSpeakingTopicsForLevel("B2") : []),
    [skill]
  );
  const eeTasks = useMemo(
    () => (skill === "EE" ? getWritingTasksForLevel("B2") : []),
    [skill]
  );

  const finalizedRef = useRef(false);
  const { addAttempt } = useProgress();

  const qcmSeconds =
    questions.length > 0 && (skill === "CO" || skill === "CE")
      ? questions.length * officialSecondsPerItem(skill)
      : 0;
  const examSeconds = skill === "CO" || skill === "CE" ? qcmSeconds : spec.durationMinutes * 60;

  function finalize(finalScore: number) {
    if (finalizedRef.current) return;
    finalizedRef.current = true;
    setResult(finalScore);
    addAttempt({
      kind: "évaluation",
      skill,
      label: `${spec.label} — Évaluation chronométrée`,
      scorePercent: finalScore,
    });
    setPhase("result");
  }

  function handleQcmSelect(optionId: string) {
    const q = questions[qIndex];
    if (validated[q.id]) return;
    setAnswers((prev) => ({ ...prev, [q.id]: optionId }));
  }

  function handleQcmValidate() {
    const q = questions[qIndex];
    if (!answers[q.id] || validated[q.id]) return;
    setValidated((prev) => ({ ...prev, [q.id]: true }));
  }

  function handleQcmFinish() {
    const correctCount = questions.filter((q) => answers[q.id] === q.correctOptionId).length;
    finalize(Math.round((correctCount / questions.length) * 100));
  }

  function handleEeComplete(meta: { withinRange: boolean; wordCount: number }) {
    const next = [...eeScores, meta.withinRange ? 100 : 35];
    setEeScores(next);
    if (taskIndex >= eeTasks.length - 1) {
      finalize(Math.round(next.reduce((a, b) => a + b, 0) / next.length));
    } else {
      setTaskIndex((i) => i + 1);
    }
  }

  function handleEoComplete() {
    const next = eoDone + 1;
    setEoDone(next);
    if (next >= eoTopics.length) {
      finalize(100);
    } else {
      setTaskIndex((i) => i + 1);
    }
  }

  // Audio simulé (CO)
  const [isSpeaking, setIsSpeaking] = useState(false);
  function speakTranscript(text: string) {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "fr-CA";
    u.rate = 0.95;
    const voice = window.speechSynthesis.getVoices().find((v) => v.lang.startsWith("fr"));
    if (voice) u.voice = voice;
    u.onstart = () => setIsSpeaking(true);
    u.onend = () => setIsSpeaking(false);
    window.speechSynthesis.speak(u);
  }
  function stopSpeaking() {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }

  // ---------- INTRO ----------
  if (phase === "intro") {
    const seriesMinutes = Math.max(1, Math.round(examSeconds / 60));
    return (
      <Card className="mx-auto max-w-2xl text-center">
        <div className={`mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl text-white ${cfg.color}`}>
          <Hourglass size={22} />
        </div>
        <h2 className="text-xl font-bold text-surface-900">{spec.label} — Évaluation TCF</h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-surface-600">{spec.description}</p>
        <div className="mx-auto mt-5 grid max-w-sm gap-2 text-left">
          <p className="flex items-center gap-2 text-sm text-surface-700">
            <Clock3 size={15} className="text-brand-600" /> Durée officielle au TCF : {spec.durationMinutes} min
          </p>
          <p className="flex items-center gap-2 text-sm text-surface-700">
            <Award size={15} className="text-brand-600" /> {spec.itemsOfficial} items au TCF officiel
          </p>
          <p className="flex items-center gap-2 text-sm text-surface-700">
            <PlayCircle size={15} className="text-brand-600" /> {cfg.exerciseLabel}
          </p>
        </div>
        <p className="mx-auto mt-4 max-w-md rounded-xl bg-surface-50 p-3 text-xs text-surface-500">
          {cfg.note} Le chronomètre de cette évaluation est recadré sur la série proposée
          ({seriesMinutes} min). À la fin, votre score est converti sur l'échelle officielle du TCF
          (0-699) puis en niveaux CECRL et NCLC.
        </p>
        {skill === "CO" || skill === "CE" ? (
          <div className="mx-auto mt-5 max-w-sm text-left">
            <p className="mb-2 text-sm font-semibold text-surface-800">
              Série représentative : {questions.length} questions (tous niveaux, du A1 au C2).
            </p>
          </div>
        ) : (
          <div className="mx-auto mt-5 max-w-sm text-left">
            <p className="mb-2 text-sm font-semibold text-surface-800">
              Niveau des tâches : B2 (référence canadienne).
            </p>
          </div>
        )}
        <Button className="mt-6" size="lg" onClick={() => setPhase("run")}>
          <PlayCircle size={18} /> Démarrer l'évaluation ({seriesMinutes} min)
        </Button>
      </Card>
    );
  }

  // ---------- RESULT ----------
  if (phase === "result") {
    const conversion = convertPercentToTcf(result ?? 0);
    return (
      <Card className="mx-auto max-w-lg text-center">
        <Award className="mx-auto mb-3 text-brand-600" size={32} />
        <h2 className="text-lg font-bold text-surface-900">Évaluation terminée</h2>
        <p className="mt-1 text-xs text-surface-500">{spec.label}</p>
        <p className="mt-4 text-5xl font-extrabold text-surface-900">{result}%</p>
        <div className="mt-5 grid grid-cols-3 gap-3">
          <div className="rounded-xl bg-surface-50 p-3">
            <p className="text-[11px] uppercase tracking-wide text-surface-400">Score TCF</p>
            <p className="text-xl font-bold text-surface-900">{conversion.score699} / 699</p>
          </div>
          <div className="rounded-xl bg-surface-50 p-3">
            <p className="text-[11px] uppercase tracking-wide text-surface-400">Niveau CECRL</p>
            <Badge className={`mt-1 ${cefrLevelColor(conversion.cefr)}`}>{conversion.cefr}</Badge>
          </div>
          <div className="rounded-xl bg-surface-50 p-3">
            <p className="text-[11px] uppercase tracking-wide text-surface-400">Échelle NCLC</p>
            <p className="text-xl font-bold text-surface-900">{conversion.nclc}</p>
          </div>
        </div>
        <p className="mx-auto mt-4 max-w-xs text-xs text-surface-400">
          Conversion indicative à des fins pédagogiques : seule l'échelle officielle du TCF Canada
          fait foi lors de l'examen.
        </p>
        <Button
          className="mt-6"
          onClick={() => {
            finalizedRef.current = false;
            setResult(null);
            setAnswers({});
            setValidated({});
            setQIndex(0);
            setTaskIndex(0);
            setEeScores([]);
            setEoDone(0);
            setPhase("intro");
          }}
        >
          <RotateCcw size={16} /> Recommencer / Fermer
        </Button>
      </Card>
    );
  }

  // ---------- RUN : QCM (CO / CE) ----------
  if (cfg.qcm) {
    const q = questions[qIndex];
    const isAnswered = !!answers[q.id];
    const isRevealed = !!validated[q.id];
    return (
      <div>
        <div className="mx-auto mb-4 flex max-w-2xl items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-sm font-medium text-surface-700">
            <Clock3 size={16} className="text-brand-600" />
            Temps restant
            <Timer totalSeconds={examSeconds} isRunning onExpire={handleQcmFinish} />
          </div>
          <Badge className="bg-surface-100 text-surface-600">
            {qIndex + 1} / {questions.length}
          </Badge>
        </div>
        <div className="mx-auto mb-4 h-1.5 max-w-2xl overflow-hidden rounded-full bg-surface-200">
          <div
            className="h-full bg-brand-600 transition-all"
            style={{ width: `${((qIndex + 1) / questions.length) * 100}%` }}
          />
        </div>

        <Card className="mx-auto max-w-2xl">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <Badge className={cefrLevelColor(q.level)}>Niveau {q.level}</Badge>
            <Badge className="bg-surface-100 text-surface-600">{q.sequence}</Badge>
            <Badge className="bg-brand-50 text-brand-700">{q.theme}</Badge>
          </div>

          {q.skill === "CO" && q.audioPrompt && (
            <div className="mb-4 flex items-start gap-3 rounded-xl bg-surface-50 p-4">
              <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-600 text-white">
                <Volume2 size={16} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-surface-400">
                  Audio (simulation — lecture unique)
                </p>
                <p className="text-sm text-surface-700">{q.audioPrompt}</p>
                <div className="mt-2 flex gap-2">
                  <Button size="sm" variant="secondary" onClick={() => q.transcript && speakTranscript(q.transcript)}>
                    <Volume2 size={14} /> Écouter l'audio
                  </Button>
                  {isSpeaking && (
                    <Button size="sm" variant="danger" onClick={stopSpeaking}>
                      <Square size={14} /> Arrêter
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )}

          {q.passage && (
            <div className="mb-4 rounded-xl bg-surface-50 p-4">
              <p className="mb-1 flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-surface-400">
                <ScrollText size={13} /> Document — {q.passageType}
              </p>
              <p className="text-sm leading-relaxed text-surface-700">{q.passage}</p>
            </div>
          )}

          <h3 className="mb-4 text-base font-semibold text-surface-900">{q.question}</h3>
          <div className="space-y-2">
            {q.options.map((option) => {
              const isCorrect = option.id === q.correctOptionId;
              const isSelected = option.id === answers[q.id];
              return (
                <button
                  key={option.id}
                  onClick={() => handleQcmSelect(option.id)}
                  disabled={isRevealed}
                  className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left text-sm transition-colors ${
                    isRevealed
                      ? isCorrect
                        ? "border-emerald-300 bg-emerald-50 text-emerald-800"
                        : isSelected
                          ? "border-red-300 bg-red-50 text-red-700"
                          : "border-surface-200 text-surface-500"
                      : isSelected
                        ? "border-brand-500 bg-brand-50 text-brand-800"
                        : "border-surface-200 hover:border-brand-400 hover:bg-brand-50"
                  }`}
                >
                  <span>{option.text}</span>
                  {isRevealed && isCorrect && <CheckCircle2 size={18} className="shrink-0" />}
                  {isRevealed && isSelected && !isCorrect && <XCircle size={18} className="shrink-0" />}
                </button>
              );
            })}
          </div>

          {isRevealed && (
            <div className="mt-4 rounded-xl bg-brand-50 p-4 text-sm text-brand-800">
              <p className="mb-1 font-semibold">Correction</p>
              <p>{q.explanation}</p>
            </div>
          )}

          <div className="mt-6 flex items-center justify-between gap-2">
            <Button
              variant="ghost"
              disabled={qIndex === 0}
              onClick={() => {
                stopSpeaking();
                setQIndex((i) => i - 1);
              }}
            >
              <ArrowUp size={15} /> Précédent
            </Button>
            <div className="flex items-center gap-2">
              {isAnswered && !isRevealed && (
                <Button onClick={handleQcmValidate}>
                  <CheckCircle2 size={16} /> Valider ma réponse
                </Button>
              )}
              {(!isAnswered || isRevealed) &&
                (qIndex + 1 >= questions.length ? (
                  <Button onClick={handleQcmFinish} disabled={!isAnswered}>
                    Terminer l'évaluation <ArrowRight size={16} />
                  </Button>
                ) : (
                  <Button
                    onClick={() => {
                      stopSpeaking();
                      setQIndex((i) => i + 1);
                    }}
                  >
                    Question suivante <ArrowDown size={15} />
                  </Button>
                ))}
            </div>
          </div>
        </Card>
      </div>
    );
  }

  // ---------- RUN : EE (écrit) ----------
  if (skill === "EE") {
    return (
      <div>
        <div className="mx-auto mb-4 flex max-w-5xl items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-sm font-medium text-surface-700">
            <Clock3 size={16} className="text-brand-600" />
            Temps officiel restant (60 min)
            <Timer totalSeconds={examSeconds} isRunning onExpire={() => finalize(Math.round(eeScores.reduce((a, b) => a + b, 0) / Math.max(eeScores.length, 1)))} />
          </div>
          <Badge className="bg-surface-100 text-surface-600">
            Tâche {taskIndex + 1} / {eeTasks.length}
          </Badge>
        </div>
        <WritingEditor
          key={eeTasks[taskIndex].id}
          task={eeTasks[taskIndex]}
          completeLabel={taskIndex >= eeTasks.length - 1 ? "Voir mon résultat" : "Tâche suivante"}
          onComplete={handleEeComplete}
        />
      </div>
    );
  }

  // ---------- RUN : EO (oral) ----------
  return (
    <div>
      <div className="mx-auto mb-4 flex max-w-2xl items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-sm font-medium text-surface-700">
          <Clock3 size={16} className="text-brand-600" />
          Temps officiel restant (12 min)
          <Timer totalSeconds={examSeconds} isRunning onExpire={() => finalize(Math.round((eoDone / 3) * 100))} />
        </div>
        <Badge className="bg-surface-100 text-surface-600">
          Tâche {taskIndex + 1} / {eoTopics.length}
        </Badge>
      </div>
      <SpeakingSession
        key={eoTopics[taskIndex].id}
        topic={eoTopics[taskIndex]}
        completeLabel={taskIndex >= eoTopics.length - 1 ? "Voir mon résultat" : "Tâche suivante"}
        onComplete={handleEoComplete}
      />
    </div>
  );
}