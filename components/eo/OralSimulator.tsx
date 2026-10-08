"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  Activity,
  AlertTriangle,
  BarChart3,
  ChevronRight,
  ClipboardCheck,
  Hourglass,
  Info,
  Mic,
  MicOff,
  PlayCircle,
  RotateCcw,
  Save,
  Square,
  TimerReset,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  CefrLevel,
  NclcLevel,
  OralCriterionKey,
  OralCriterionScores,
  OralMetrics,
  OralSimulationRecord,
  OralSimulationTaskRecord,
  SpeakingTopic,
  SpeechSample,
} from "@/lib/types";
import { oralCriteria, gradeOral, OralGradeResult } from "@/lib/eo/examinerGrid";
import { computeOralMetrics, mergeOralMetrics } from "@/lib/eo/oralMetrics";
import { getSpeakingTopicsForLevel } from "@/lib/data/speakingTopics";
import { cefrLevelColor, cn } from "@/lib/utils/scoring";
import { useAuth } from "@/lib/utils/authStore";
import { userScopedKey } from "@/lib/utils/userStorage";
import { readJson, isOralSimulationRecordArray } from "@/lib/utils/sanitize";
import { randomTokenB64url } from "@/lib/utils/password";

// ---------------------------------------------------------------------------
// Typage minimaliste de la Web Speech API (non fournie par les types DOM TS).
// ---------------------------------------------------------------------------

interface SpeechRecognitionResultLike {
  length: number;
  [index: number]: { transcript: string; isFinal: boolean };
}

interface SpeechRecognitionEventLike {
  resultIndex: number;
  results: SpeechRecognitionResultLike[];
}

interface SpeechRecognitionErrorLike {
  error: string;
}

type SpeechRecognitionConstructor = new () => {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onstart: (() => void) | null;
  onend: (() => void) | null;
  onerror: ((event: SpeechRecognitionErrorLike) => void) | null;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  start: () => void;
  stop: () => void;
};

interface SpeechRecognitionWindow extends Window {
  SpeechRecognition?: SpeechRecognitionConstructor;
  webkitSpeechRecognition?: SpeechRecognitionConstructor;
}

function getRecognitionCtor(): SpeechRecognitionConstructor | null {
  if (typeof window === "undefined") return null;
  const w = window as SpeechRecognitionWindow;
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

// ---------------------------------------------------------------------------

const CRITERION_KEYS: OralCriterionKey[] = [
  "task",
  "fluency",
  "cohesion",
  "lexicon",
  "grammar",
  "pronunciation",
];

const nclcBadge: Record<NclcLevel, string> = {
  "NCLC 4-6": "bg-red-100 text-red-700",
  "NCLC 7": "bg-amber-100 text-amber-700",
  "NCLC 8": "bg-sky-100 text-sky-700",
  "NCLC 9": "bg-violet-100 text-violet-700",
  "NCLC 10+": "bg-emerald-100 text-emerald-700",
};

function emptyScores(): OralCriterionScores {
  return { task: 3, fluency: 3, cohesion: 3, lexicon: 3, grammar: 3, pronunciation: 3 };
}

function formatClock(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m.toString()}:${s.toString().padStart(2, "0")}`;
}

function readSims(storageKey: string): OralSimulationRecord[] {
  return readJson(storageKey, isOralSimulationRecordArray, []);
}

function persistSims(storageKey: string, records: OralSimulationRecord[]): boolean {
  try {
    localStorage.setItem(storageKey, JSON.stringify(records));
    return true;
  } catch {
    return false;
  }
}

type Phase = "intro" | "prep" | "speak" | "recap" | "result";

const TICK_MS = 250;

export function OralSimulator({
  level,
  onComplete,
}: {
  level: CefrLevel;
  onComplete?: (scorePercent: number) => void;
}) {
  const { user } = useAuth();
  const storageKey = userScopedKey("tcf-oral-sims", user?.id ?? null);

  const recognitionCtor = useMemo(() => getRecognitionCtor(), []);

  const tasks = useMemo<SpeakingTopic[]>(() => {
    const byTaskNumber = [1, 2, 3].map((num) =>
      getSpeakingTopicsForLevel(level).find((t) => t.taskNumber === num)
    );
    return byTaskNumber.filter(Boolean) as SpeakingTopic[];
  }, [level]);

  const [phase, setPhase] = useState<Phase>("intro");
  const [taskIndex, setTaskIndex] = useState(0);
  const [prepRemaining, setPrepRemaining] = useState(0);
  const [speakRemaining, setSpeakRemaining] = useState(0);
  const [liveTranscript, setLiveTranscript] = useState("");
  const [micSupported, setMicSupported] = useState(true);
  const [currentMetrics, setCurrentMetrics] = useState<OralMetrics | null>(null);
  const [taskScores, setTaskScores] = useState<OralCriterionScores>(emptyScores);
  const [records, setRecords] = useState<OralSimulationTaskRecord[]>([]);
  const [result, setResult] = useState<OralGradeResult | null>(null);
  const [savedCount, setSavedCount] = useState(() => readSims(storageKey).length);
  const [justSaved, setJustSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const samplesRef = useRef<SpeechSample[]>([]);
  const recognitionRef = useRef<{
    stop: () => void;
  } | null>(null);
  const deadlineRef = useRef(0);
  const shouldAutoRestartRef = useRef(false);
  const finalizedRef = useRef(false);
  const autoSavedRef = useRef(false);

  const currentTopic = tasks[taskIndex];

  function pushSample() {
    const last = samplesRef.current[samplesRef.current.length - 1];
    samplesRef.current = [...samplesRef.current, { t: performance.now(), text: last?.text ?? "" }];
  }

  function stopRecognition() {
    shouldAutoRestartRef.current = false;
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        // ignore
      }
      recognitionRef.current = null;
    }
    pushSample();
  }

  function startRecognition() {
    if (!recognitionCtor) {
      setMicSupported(false);
      return;
    }
    try {
      const rec = new recognitionCtor();
      rec.continuous = true;
      rec.interimResults = true;
      rec.lang = "fr-CA";

      rec.onresult = (event) => {
        let transcript = "";
        for (let i = 0; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        const now = performance.now();
        const last = samplesRef.current[samplesRef.current.length - 1];
        if (!last || now - last.t > TICK_MS || last.text !== transcript) {
          if (samplesRef.current.length < 5000) {
            samplesRef.current = [...samplesRef.current, { t: now, text: transcript }];
          }
        }
        setLiveTranscript(transcript);
      };
      rec.onend = () => {
        recognitionRef.current = null;
        if (shouldAutoRestartRef.current) {
          try {
            rec.start();
            recognitionRef.current = rec;
          } catch {
            shouldAutoRestartRef.current = false;
          }
        }
      };
      rec.onerror = (event) => {
        if (event.error === "not-allowed" || event.error === "service-not-allowed") {
          setMicSupported(false);
          shouldAutoRestartRef.current = false;
        }
      };

      rec.start();
      recognitionRef.current = rec;
      shouldAutoRestartRef.current = true;
      setMicSupported(true);
    } catch {
      setMicSupported(false);
    }
  }

  function finalizeSpeak() {
    if (finalizedRef.current) return;
    finalizedRef.current = true;
    stopRecognition();
    setCurrentMetrics(computeOralMetrics(samplesRef.current));
    setTaskScores(emptyScores());
    setPhase("recap");
  }

  // Décompte strict (préparation puis parole) piloté par une échéance absolue.
  useEffect(() => {
    if (phase !== "prep" && phase !== "speak") return;
    const interval = setInterval(() => {
      const remaining = Math.max(0, Math.round((deadlineRef.current - performance.now()) / 1000));
      if (phase === "prep") {
        setPrepRemaining(remaining);
        if (remaining <= 0) {
          clearInterval(interval);
          setPhase("speak");
        }
      } else {
        setSpeakRemaining(remaining);
        if (remaining <= 0) {
          clearInterval(interval);
          finalizeSpeak();
        }
      }
    }, TICK_MS);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, taskIndex]);

  // Transitions d'entrée : préparation → parole (reconnaissance), etc.
  useEffect(() => {
    if (phase === "prep") {
      finalizedRef.current = false;
      deadlineRef.current = performance.now() + currentTopic.prepTimeSeconds * 1000;
      setPrepRemaining(currentTopic.prepTimeSeconds);
      setTaskScores(emptyScores());
    } else if (phase === "speak") {
      deadlineRef.current = performance.now() + currentTopic.speakTimeSeconds * 1000;
      setSpeakRemaining(currentTopic.speakTimeSeconds);
      samplesRef.current = [];
      setLiveTranscript("");
      startRecognition();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, taskIndex]);

  // Arrêt de la reconnaissance au démontage.
  useEffect(() => {
    return () => {
      shouldAutoRestartRef.current = false;
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {
          // ignore
        }
      }
    };
  }, []);

  // Sauvegarde automatique de la session une fois le résultat calculé.
  useEffect(() => {
    if (phase !== "result" || records.length === 0 || autoSavedRef.current) return;

    const merged = mergeOralMetrics(records.map((r) => r.metrics));
    const averaged = {} as OralCriterionScores;
    for (const key of CRITERION_KEYS) {
      averaged[key] =
        records.reduce((sum, r) => sum + r.scores[key], 0) / records.length;
    }
    const grade = gradeOral(merged, averaged);
    setResult(grade);

    const record: OralSimulationRecord = {
      id: randomTokenB64url(12),
      date: new Date().toISOString(),
      level,
      tasks: records,
      averageScorePercent: grade.scorePercent,
      nclc: grade.nclc,
      cefr: grade.cefr,
    };
    const next = [record, ...readSims(storageKey)];
    if (persistSims(storageKey, next)) {
      setSavedCount(next.length);
      setJustSaved(true);
    } else {
      setError("Stockage local saturé : la simulation n'a pas pu être sauvegardée.");
    }
    autoSavedRef.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, records]);

  function goToPrep() {
    setPhase("prep");
  }

  function skipPrep() {
    setPhase("speak");
  }

  function handleAdvanceTask() {
    if (!currentMetrics) return;
    const record: OralSimulationTaskRecord = {
      taskNumber: currentTopic.taskNumber,
      theme: currentTopic.theme,
      metrics: currentMetrics,
      scores: taskScores,
    };
    const next = [...records, record];
    setRecords(next);

    if (taskIndex >= tasks.length - 1) {
      setPhase("result");
    } else {
      setTaskIndex((i) => i + 1);
      setPhase("prep");
    }
  }

  function resetAll() {
    samplesRef.current = [];
    recognitionRef.current = null;
    finalizedRef.current = false;
    autoSavedRef.current = false;
    setLiveTranscript("");
    setCurrentMetrics(null);
    setTaskScores(emptyScores());
    setRecords([]);
    setResult(null);
    setTaskIndex(0);
    setError(null);
    setPhase("intro");
  }

  function pickScore(key: OralCriterionKey, value: number) {
    setTaskScores((prev) => ({ ...prev, [key]: value }));
  }

  const liveMetrics =
    phase === "speak"
      ? computeOralMetrics(samplesRef.current)
      : currentMetrics ?? computeOralMetrics([]);

  const totalFillerCount = (metrics: OralMetrics) =>
    metrics.filledPauses.reduce((sum, f) => sum + f.count, 0);

  if (tasks.length < 3) {
    return (
      <Card className="mx-auto max-w-2xl">
        <p className="text-sm text-surface-700">
          Le niveau {level} ne propose pas encore les 3 tâches du simulateur.
        </p>
      </Card>
    );
  }

  return (
    <Card className="mx-auto max-w-2xl">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Badge className={cefrLevelColor(level)}>Niveau {level}</Badge>
          <Badge className="bg-brand-50 text-brand-700">Simulateur cadencé EO</Badge>
        </div>
        {phase !== "intro" && phase !== "result" && (
          <div className="flex items-center gap-2">
            <Badge className="bg-surface-100 text-surface-600">
              Tâche {taskIndex + 1} / {tasks.length}
            </Badge>
            {phase === "prep" || phase === "speak" ? (
              <span className="font-mono text-xl font-semibold text-surface-900">
                {phase === "prep" ? formatClock(prepRemaining) : formatClock(speakRemaining)}
              </span>
            ) : null}
          </div>
        )}
      </div>

      {error && (
        <p className="mb-4 flex items-center gap-1.5 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600">
          <AlertTriangle size={14} className="shrink-0" /> {error}
        </p>
      )}

      {/* ---------------- Intro ---------------- */}
      {phase === "intro" && (
        <div className="space-y-5">
          <div className="rounded-xl bg-surface-50 p-5">
            <p className="mb-3 text-sm font-semibold text-surface-900">
              Comment se déroule la simulation ?
            </p>
            <ul className="space-y-2 text-xs text-surface-700">
              <li className="flex gap-2">
                <Hourglass size={14} className="mt-0.5 shrink-0 text-brand-600" />
                Les 3 tâches officielles s&apos;enchaînent avec des chronomètres stricts
                (préparation puis parole), comme à l&apos;examen.
              </li>
              <li className="flex gap-2">
                <Mic size={14} className="mt-0.5 shrink-0 text-brand-600" />
                Votre voix est transcrite en direct (reconnaissance fr-CA) pour calculer
                débit, hésitations et pauses longues.
              </li>
              <li className="flex gap-2">
                <ClipboardCheck size={14} className="mt-0.5 shrink-0 text-brand-600" />
                Après chaque tâche, ajustez les 6 critères de la grille ; un niveau
                indicatif (CECRL / NCLC) est estimé en fin de session.
              </li>
            </ul>
            {!recognitionCtor && (
              <p className="mt-3 flex items-start gap-1.5 rounded-lg bg-amber-50 px-3 py-2 text-[11px] text-amber-700">
                <AlertTriangle size={14} className="mt-0.5 shrink-0" />
                La reconnaissance vocale n&apos;est pas disponible sur ce navigateur : la
                simulation fonctionnera en chronomètre strict. Utilisez Chrome ou Edge
                pour la transcription et les métriques vocales.
              </p>
            )}
          </div>

          <div className="space-y-2">
            {tasks.map((t, i) => (
              <div
                key={t.id}
                className="flex items-center gap-3 rounded-xl border border-surface-200 p-3"
              >
                <Badge className="bg-surface-100 text-surface-600">Tâche {i + 1}</Badge>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-surface-800">{t.theme}</p>
                  <p className="text-[11px] text-surface-400">
                    Préparation {t.prepTimeSeconds}s · Expression {t.speakTimeSeconds}s
                  </p>
                </div>
              </div>
            ))}
          </div>

          <Button onClick={goToPrep} className="w-full">
            <PlayCircle size={16} /> Lancer la simulation
          </Button>
        </div>
      )}

      {/* ---------------- Préparation ---------------- */}
      {phase === "prep" && (
        <div className="space-y-4">
          <div className="rounded-xl bg-surface-50 p-5">
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-surface-400">
              Tâche {currentTopic.taskNumber} · {currentTopic.theme}
            </p>
            <p className="text-sm leading-relaxed text-surface-700">{currentTopic.prompt}</p>
            {currentTopic.situation && (
              <p className="mt-2 text-xs italic text-surface-500">{currentTopic.situation}</p>
            )}
          </div>
          <div className="rounded-xl border border-brand-100 bg-brand-50/50 p-4">
            <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-brand-800">
              <Info size={13} /> Points clés attendus
            </p>
            <ul className="list-disc space-y-1 pl-5 text-xs text-surface-700">
              {currentTopic.samplePoints.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-2">
            <Button onClick={skipPrep}>Passer à la parole</Button>
            <Button variant="ghost" onClick={resetAll}>
              <RotateCcw size={15} /> Recommencer
            </Button>
          </div>
        </div>
      )}

      {/* ---------------- Parole ---------------- */}
      {phase === "speak" && (
        <div className="space-y-4">
          <div className="rounded-xl bg-surface-50 p-5">
            <p className="mb-3 text-sm font-semibold text-surface-900">
              À vous de parler — {formatClock(speakRemaining)}
            </p>
            {liveTranscript.trim() ? (
              <p className="rounded-lg bg-white p-3 text-sm leading-relaxed text-surface-800">
                {liveTranscript}
              </p>
            ) : (
              <p className="rounded-lg border border-dashed border-surface-300 p-3 text-xs text-surface-400">
                {micSupported
                  ? "La transcription de votre voix apparaîtra ici…"
                  : "Reconnaissance indisponible : parlez quand même, les chronomètres sont actifs."}
              </p>
            )}
            <div className="mt-3 flex flex-wrap gap-2">
              <Badge className="bg-surface-100 text-surface-600">
                <Activity size={12} className="mr-1" /> {liveMetrics.wordCount} mots
              </Badge>
              <Badge className="bg-surface-100 text-surface-600">
                {liveMetrics.wordsPerMinute} mots/min
              </Badge>
              <Badge className="bg-surface-100 text-surface-600">
                {totalFillerCount(liveMetrics)} hésitation
                {totalFillerCount(liveMetrics) > 1 ? "s" : ""}
              </Badge>
              <Badge className="bg-surface-100 text-surface-600">
                {liveMetrics.longestPauseSeconds > 0
                  ? `Pause max : ${liveMetrics.longestPauseSeconds}s`
                  : "Pause max : —"}
              </Badge>
            </div>
          </div>
          {!micSupported && (
            <div className="flex flex-col gap-2">
              <Button variant="secondary" onClick={() => startRecognition()}>
                <Mic size={16} /> Réessayer le micro
              </Button>
              <p className="text-[11px] text-surface-400">
                Autorisez le micro dans la barre d&apos;adresse du navigateur puis
                réessayez ; le chronomètre continue de tourner.
              </p>
            </div>
          )}
          <Button variant="secondary" onClick={finalizeSpeak}>
            <Square size={15} /> J&apos;ai terminé ma prise de parole
          </Button>
        </div>
      )}

      {/* ---------------- Auto-évaluation ---------------- */}
      {phase === "recap" && currentMetrics && (
        <div className="space-y-4">
          <div className="rounded-xl bg-surface-50 p-5">
            <p className="mb-2 text-sm font-semibold text-surface-900">Récapitulatif mesuré</p>
            <div className="grid grid-cols-2 gap-2 text-xs sm:grid-cols-3">
              <div className="rounded-lg bg-white p-2.5">
                <p className="font-mono text-lg font-semibold text-surface-900">
                  {currentMetrics.wordCount}
                </p>
                <p className="text-surface-400">mots</p>
              </div>
              <div className="rounded-lg bg-white p-2.5">
                <p className="font-mono text-lg font-semibold text-surface-900">
                  {currentMetrics.wordsPerMinute}
                </p>
                <p className="text-surface-400">mots/min</p>
              </div>
              <div className="rounded-lg bg-white p-2.5">
                <p className="font-mono text-lg font-semibold text-surface-900">
                  {totalFillerCount(currentMetrics)}
                </p>
                <p className="text-surface-400">hésitations</p>
              </div>
              <div className="rounded-lg bg-white p-2.5">
                <p className="font-mono text-lg font-semibold text-surface-900">
                  {currentMetrics.longPauses.length}
                </p>
                <p className="text-surface-400">pauses longues</p>
              </div>
              <div className="rounded-lg bg-white p-2.5">
                <p className="font-mono text-lg font-semibold text-surface-900">
                  {currentMetrics.longestPauseSeconds}s
                </p>
                <p className="text-surface-400">pause max</p>
              </div>
              <div className="rounded-lg bg-white p-2.5">
                <p className="font-mono text-lg font-semibold text-surface-900">
                  {currentMetrics.repeatedWordCount}
                </p>
                <p className="text-surface-400">répétitions</p>
              </div>
            </div>
            <p className="mt-3 text-[11px] text-surface-400">
              Mots reconnus : {currentMetrics.transcript.slice(0, 200)}
              {currentMetrics.transcript.length > 200 ? "…" : ""}
            </p>
          </div>

          <div className="rounded-xl border border-brand-100 bg-brand-50/50 p-4">
            <p className="mb-1 flex items-center gap-1.5 text-sm font-semibold text-brand-800">
              <ClipboardCheck size={15} /> Auto-évaluation selon la grille TCF
            </p>
            <p className="mb-3 text-[11px] text-brand-700">
              Notez chaque critère de 1 à 5 (la « fluidité » est recoupée avec les métriques
              mesurées).
            </p>
            <ul className="space-y-3">
              {oralCriteria.map((criterion) => (
                <li key={criterion.key}>
                  <p className="mb-1 text-xs font-semibold text-surface-800">{criterion.label}</p>
                  <div className="grid grid-cols-5 gap-1.5">
                    {[1, 2, 3, 4, 5].map((value) => {
                      const selected = taskScores[criterion.key] === value;
                      return (
                        <button
                          key={value}
                          onClick={() => pickScore(criterion.key, value)}
                          className={cn(
                            "rounded-lg border py-1.5 text-center text-sm font-semibold transition-colors",
                            selected
                              ? "border-brand-600 bg-brand-600 text-white"
                              : "border-surface-200 bg-white text-surface-600 hover:border-brand-300 hover:bg-brand-50"
                          )}
                        >
                          {value}
                        </button>
                      );
                    })}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <Button onClick={handleAdvanceTask} className="w-full">
            {taskIndex >= tasks.length - 1 ? "Voir mon résultat" : "Tâche suivante"}
            <ChevronRight size={16} />
          </Button>
        </div>
      )}

      {/* ---------------- Résultat ---------------- */}
      {phase === "result" && result && (
        <div className="space-y-4">
          <div className="rounded-xl bg-surface-50 p-5 text-center">
            <p className="text-xs font-semibold uppercase tracking-wide text-surface-400">
              Niveau indicatif estimé
            </p>
            <div className="mt-2 flex flex-wrap items-center justify-center gap-2">
              <Badge className={cefrLevelColor(result.cefr)}>Niveau {result.cefr}</Badge>
              <Badge className={nclcBadge[result.nclc]}>{result.nclc}</Badge>
            </div>
            <div className="mx-auto mt-4 flex max-w-xs items-center justify-center gap-6">
              <div>
                <p className="font-mono text-3xl font-bold text-brand-700">
                  {result.scorePercent}%
                </p>
                <p className="text-[11px] text-surface-400">score moyen</p>
              </div>
              <div className="h-10 w-px bg-surface-200" />
              <div>
                <p className="font-mono text-3xl font-bold text-surface-800">
                  {result.score699}
                </p>
                <p className="text-[11px] text-surface-400">/ 699 points</p>
              </div>
            </div>
            {justSaved && (
              <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-emerald-600">
                <Save size={13} /> Simulation sauvegardée localement (
                {savedCount} simulation{savedCount > 1 ? "s" : ""}).
              </p>
            )}
          </div>

          <div className="rounded-xl border border-surface-200 p-4">
            <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-surface-400">
              <BarChart3 size={13} /> Détail par tâche
            </p>
            <div className="space-y-2">
              {records.map((r, i) => {
                const rowGrade = gradeOral(r.metrics, r.scores);
                return (
                  <div
                    key={i}
                    className="flex items-center gap-3 rounded-lg bg-surface-50 px-3 py-2 text-xs"
                  >
                    <Badge className="bg-surface-100 text-surface-600">Tâche {r.taskNumber}</Badge>
                    <p className="min-w-0 flex-1 truncate font-medium text-surface-700">
                      {r.theme}
                    </p>
                    <span className="text-surface-400">{r.metrics.wordCount} mots</span>
                    <span className="text-surface-400">{r.metrics.wordsPerMinute} m/min</span>
                    <Badge className={nclcBadge[rowGrade.nclc]}>{rowGrade.scorePercent}%</Badge>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-xl border border-surface-200 p-4">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-surface-400">
              Critères (moyenne sur la session)
            </p>
            <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
              {oralCriteria.map((criterion) => (
                <div key={criterion.key} className="flex items-center justify-between gap-2">
                  <span className="text-xs text-surface-600">{criterion.label}</span>
                  <span className="flex items-center gap-1.5">
                    <span className="font-mono text-sm font-semibold text-surface-800">
                      {result.criterionScores[criterion.key].toFixed(1)}
                    </span>
                    <span className="text-[11px] text-surface-300">/ 5</span>
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-3 border-t border-surface-100 pt-2 text-[11px] italic leading-relaxed text-surface-500">
              Fluidité : {result.fluencyComment}
            </p>
          </div>

          <div className="flex flex-col gap-2">
            {onComplete ? (
              <Button onClick={() => onComplete(result.scorePercent)}>
                Valider ce niveau au récapitulatif de l&apos;examen · {result.scorePercent}%
              </Button>
            ) : (
              <Button onClick={resetAll}>
                <TimerReset size={16} /> Recommencer une simulation
              </Button>
            )}
            <Button variant="ghost" onClick={resetAll}>
              <RotateCcw size={15} /> Nouvelle simulation
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
}