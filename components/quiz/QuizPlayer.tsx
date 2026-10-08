"use client";

import { useMemo, useState } from "react";
import {
  Brain,
  CheckCircle2,
  XCircle,
  Volume2,
  Mic,
  ArrowRight,
  RotateCcw,
  ScrollText,
  BookMarked,
  Square,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Timer } from "@/components/quiz/Timer";
import { QcmQuestion, SpeechAccent, SpeechSpeed } from "@/lib/types";
import { cn } from "@/lib/utils/scoring";
import {
  cefrLevelColor,
  estimateNclcLevel,
  levelBadgeColor,
} from "@/lib/utils/scoring";

const SECONDS_PER_QUESTION = 60;

const ACCENT_LABELS: Record<SpeechAccent, string> = {
  "accent-montrealais": "Accent montréalais",
  "accent-quebecois": "Accent québécois",
  "accent-acadien": "Accent acadien",
  "accent-francais": "Accent français",
  "accent-neutre": "Accent neutre",
};

const SPEED_LABELS: Record<SpeechSpeed, string> = {
  lent: "Débit lent",
  normal: "Débit normal",
  rapide: "Débit rapide",
};

interface QuizPlayerProps {
  questions: QcmQuestion[];
  skillLabel: string;
  nextLabel?: string;
  onComplete?: (scorePercent: number) => void;
}

export function QuizPlayer({ questions, skillLabel, nextLabel = "Épreuve suivante", onComplete }: QuizPlayerProps) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [finished, setFinished] = useState(false);
  const [listenedOnce, setListenedOnce] = useState(false);

  const question = questions[index];
  const isAnswered = selected !== null;
  const isListening = question.skill === "CO";
  const [isSpeaking, setIsSpeaking] = useState(false);

  function speakTranscript(text: string) {
    if (!("speechSynthesis" in window)) {
      alert("Votre navigateur ne supporte pas la lecture audio (Web Speech API).");
      return;
    }
    setListenedOnce(true);
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "fr-CA";
    utterance.rate = 0.95;
    const voices = window.speechSynthesis.getVoices();
    const frenchVoice = voices.find(
      (v) => v.lang === "fr-CA" || v.lang.startsWith("fr")
    );
    if (frenchVoice) utterance.voice = frenchVoice;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  }

  function stopSpeaking() {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }

  const correctCount = useMemo(
    () =>
      Object.entries(answers).filter(
        ([qId, optId]) => questions.find((q) => q.id === qId)?.correctOptionId === optId
      ).length,
    [answers, questions]
  );

  function handleSelect(optionId: string) {
    if (submitted || selected === "__timeout__") return;
    setSelected(optionId);
    setAnswers((prev) => ({ ...prev, [question.id]: optionId }));
  }

  function handleValidate() {
    if (submitted || selected === null) return;
    setSubmitted(true);
  }

  function handleNext() {
    stopSpeaking();
    if (index + 1 >= questions.length) {
      setFinished(true);
      return;
    }
    setIndex((i) => i + 1);
    setSelected(null);
    setSubmitted(false);
    setListenedOnce(false);
  }

  function handleTimeout() {
    if (!isAnswered) {
      setAnswers((prev) => ({ ...prev, [question.id]: "__timeout__" }));
      setSelected("__timeout__");
    }
  }

  function handleRestart() {
    stopSpeaking();
    setIndex(0);
    setSelected(null);
    setSubmitted(false);
    setAnswers({});
    setFinished(false);
    setListenedOnce(false);
  }

  if (!questions.length) {
    return (
      <Card className="mx-auto max-w-lg text-center text-sm text-surface-500">
        Aucun exercice dans la banque pour le moment.
      </Card>
    );
  }

  if (finished) {
    const scorePercent = Math.round((correctCount / questions.length) * 100);
    const level = estimateNclcLevel(scorePercent);
    return (
      <Card className="mx-auto max-w-lg text-center">
        <p className="text-sm font-medium text-surface-500">Résultat — {skillLabel}</p>
        <p className="mt-2 text-5xl font-extrabold text-surface-900">{scorePercent}%</p>
        <p className="mt-1 text-sm text-surface-600">
          {correctCount} / {questions.length} bonnes réponses
        </p>
        <div className="mt-4 flex justify-center gap-2">
          <Badge className={levelBadgeColor(level)}>Niveau estimé : {level}</Badge>
          <Badge className="bg-surface-100 text-surface-600">
            Niveau ciblé : {questions[0].level}
          </Badge>
        </div>
        <div className="mt-6 flex justify-center gap-3">
          <Button variant="ghost" onClick={handleRestart}>
            <RotateCcw size={16} /> Recommencer
          </Button>
          {onComplete && (
            <Button onClick={() => onComplete(scorePercent)}>
              {nextLabel} <ArrowRight size={16} />
            </Button>
          )}
        </div>
      </Card>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <Badge className="bg-surface-100 text-surface-600">
            {question.sequence} · {index + 1} / {questions.length}
          </Badge>
          <Badge className={cefrLevelColor(question.level)}>Niveau {question.level}</Badge>
          <Badge className="bg-brand-50 text-brand-700">{question.theme}</Badge>
          {question.accent && (
            <Badge className="bg-amber-100 text-amber-800">
              <Mic size={12} /> {ACCENT_LABELS[question.accent]}
            </Badge>
          )}
          {question.speed && (
            <Badge className="bg-orange-100 text-orange-800">
              {SPEED_LABELS[question.speed]}
            </Badge>
          )}
          {question.singleListen && (
            <Badge className="bg-rose-100 text-rose-800">Écoute unique</Badge>
          )}
          {question.implicite && (
            <Badge className="bg-violet-100 text-violet-800">Implicite</Badge>
          )}
        </div>
        <Timer
          key={index}
          totalSeconds={SECONDS_PER_QUESTION}
          isRunning={!isAnswered}
          onExpire={handleTimeout}
        />
      </div>

      <Card>
        {isListening && question.audioPrompt && (
          <div className="mb-4 flex items-start gap-3 rounded-xl bg-surface-50 p-4">
            <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-600 text-white">
              <Volume2 size={16} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-surface-400">
                Audio (simulation — lecture puis question)
              </p>
              <p className="text-sm text-surface-700">{question.audioPrompt}</p>
              <div className="mt-2 flex gap-2">
                <Button
                  size="sm"
                  variant="secondary"
                  disabled={question.singleListen && !submitted && listenedOnce}
                  title={
                    question.singleListen && listenedOnce && !submitted
                      ? "Mode officiel : l'audio n'est diffusé qu'une seule fois avant la réponse."
                      : undefined
                  }
                  onClick={() => question.transcript && speakTranscript(question.transcript)}
                >
                  <Volume2 size={14} />
                  {question.singleListen && listenedOnce && !submitted
                    ? "Audio déjà écouté"
                    : "Écouter l'audio"}
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

        {question.passage && (
          <div className="mb-4 rounded-xl bg-surface-50 p-4">
            <p className="mb-1 flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-surface-400">
              <ScrollText size={13} /> Document — {question.passageType}
            </p>
            <p className="text-sm leading-relaxed text-surface-700">{question.passage}</p>
          </div>
        )}

        <h3 className="mb-4 text-base font-semibold text-surface-900">{question.question}</h3>

        <div className="space-y-2">
          {question.options.map((option) => {
            const isCorrect = option.id === question.correctOptionId;
            const isSelected = option.id === selected;
            const isTimedOut = selected === "__timeout__";
            return (
              <button
                key={option.id}
                onClick={() => handleSelect(option.id)}
                disabled={submitted || isTimedOut}
                className={cn(
                  "flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left text-sm transition-colors",
                  submitted && isCorrect && "border-emerald-300 bg-emerald-50 text-emerald-800",
                  submitted &&
                    isSelected &&
                    !isCorrect &&
                    "border-red-300 bg-red-50 text-red-700",
                  submitted &&
                    !isSelected &&
                    !isCorrect &&
                    "border-surface-200 text-surface-500",
                  !submitted &&
                    !isTimedOut &&
                    (isSelected
                      ? "border-brand-500 bg-brand-50 text-brand-800"
                      : "border-surface-200 hover:border-brand-400 hover:bg-brand-50"),
                  !submitted && isTimedOut && "border-surface-200 text-surface-500"
                )}
              >
                <span>{option.text}</span>
                {submitted && isCorrect && <CheckCircle2 size={18} className="shrink-0" />}
                {submitted && isSelected && !isCorrect && (
                  <XCircle size={18} className="shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {submitted && (
          <div className="mt-4 space-y-3 rounded-xl bg-brand-50 p-4 text-sm text-brand-800">
            <div>
              <p className="mb-1 font-semibold">Correction détaillée</p>
              <p>{question.explanation}</p>
            </div>
            {question.distractorExplanations && (
              <div className="rounded-lg bg-white/60 p-3">
                <p className="mb-1 flex items-center gap-1 text-xs font-semibold uppercase tracking-wide">
                  <XCircle size={13} /> Pourquoi les autres réponses sont fausses
                </p>
                <ul className="space-y-1.5 text-xs leading-relaxed">
                  {question.options
                    .filter((o) => o.id !== question.correctOptionId)
                    .map((o) => {
                      const why = question.distractorExplanations?.[o.id];
                      if (!why) return null;
                      return (
                        <li key={o.id}>
                          <span className="font-semibold text-brand-900">« {o.text} »</span> — {why}
                        </li>
                      );
                    })}
                </ul>
              </div>
            )}
            {question.glossary && question.glossary.length > 0 && (
              <div className="rounded-lg bg-white/60 p-3">
                <p className="mb-1 flex items-center gap-1 text-xs font-semibold uppercase tracking-wide">
                  <BookMarked size={13} /> Lexique du document
                </p>
                <dl className="space-y-1.5 text-xs leading-relaxed text-surface-700">
                  {question.glossary.map((g) => (
                    <div key={g.term}>
                      <dt className="font-semibold text-surface-800">« {g.term} »</dt>
                      <dd className="ml-3">{g.definition}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
            {question.logicalDeduction && (
              <div className="rounded-lg bg-white/60 p-3">
                <p className="mb-1 flex items-center gap-1 text-xs font-semibold uppercase tracking-wide">
                  <Brain size={13} /> Déduction attendue
                </p>
                <p className="text-xs leading-relaxed text-surface-700">{question.logicalDeduction}</p>
              </div>
            )}
            {isListening && question.transcript && (
              <div className="rounded-lg bg-white/60 p-3">
                <p className="mb-1 flex items-center gap-1 text-xs font-semibold uppercase tracking-wide">
                  <Volume2 size={13} /> Retranscription complète de l'audio
                </p>
                <p className="text-xs italic leading-relaxed text-surface-700">
                  « {question.transcript} »
                </p>
              </div>
            )}
            {question.vocabularyNotes && (
              <div className="rounded-lg bg-white/60 p-3">
                <p className="mb-1 flex items-center gap-1 text-xs font-semibold uppercase tracking-wide">
                  <BookMarked size={13} /> Lexique à retenir
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {question.vocabularyNotes.map((w) => (
                    <span
                      key={w}
                      className="rounded-full bg-brand-100 px-2 py-0.5 text-xs font-medium text-brand-800"
                    >
                      {w}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        <div className="mt-6 flex justify-end gap-2">
          {submitted ? (
            <Button onClick={handleNext}>
              {index + 1 >= questions.length ? "Voir mon résultat" : "Question suivante"}
              <ArrowRight size={16} />
            </Button>
          ) : (
            <>
              {selected === "__timeout__" && (
                <span className="self-center text-xs font-semibold text-red-500">
                  Temps écoulé
                </span>
              )}
              <Button onClick={handleValidate} disabled={selected === null}>
                <CheckCircle2 size={16} />
                {selected === "__timeout__" ? "Voir la correction" : "Valider ma réponse"}
              </Button>
            </>
          )}
        </div>
      </Card>
    </div>
  );
}