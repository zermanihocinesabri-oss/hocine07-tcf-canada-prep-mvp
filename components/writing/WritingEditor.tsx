"use client";

import { useMemo, useRef, useState } from "react";
import { CheckCircle2, ListChecks, Send, FileText, BookMarked, Save } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Timer } from "@/components/quiz/Timer";
import { WritingAidPanel } from "@/components/writing/WritingAidPanel";
import { WritingAnalyst } from "@/components/ee/WritingAnalyst";
import { WritingTask } from "@/lib/types";
import { cefrLevelColor, cn } from "@/lib/utils/scoring";
import { useAuth } from "@/lib/utils/authStore";
import { userScopedKey } from "@/lib/utils/userStorage";
import {
  isStoredDraftArray,
  MAX_DRAFT_TEXT_LENGTH,
  readJson,
  sanitizeText,
  StoredDraft,
} from "@/lib/utils/sanitize";

function countWords(text: string): number {
  const trimmed = text.trim();
  if (!trimmed) return 0;
  return trimmed.split(/\s+/).length;
}

function saveLocalDraft(
  storageKey: string,
  task: WritingTask,
  text: string
) {
  try {
    const safeTitle = sanitizeText(task.title, 120);
    const safeText = sanitizeText(text, MAX_DRAFT_TEXT_LENGTH, true);
    const existing = readJson<StoredDraft[]>(storageKey, isStoredDraftArray, []);
    existing.push({
      taskId: sanitizeText(task.id, 60),
      taskTitle: safeTitle,
      date: new Date().toISOString(),
      text: safeText,
    });
    localStorage.setItem(storageKey, JSON.stringify(existing.slice(-50)));
    return true;
  } catch {
    return false;
  }
}

export function WritingEditor({
  task,
  completeLabel = "Épreuve suivante",
  onComplete,
}: {
  task: WritingTask;
  completeLabel?: string;
  onComplete?: (meta: { withinRange: boolean; wordCount: number }) => void;
}) {
  const { user } = useAuth();
  // Brouillons sauvegardés dans l'espace personnel du compte connecté.
  const storageKey = userScopedKey("tcf-writings", user?.id ?? null);

  const [text, setText] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [saved, setSaved] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const wordCount = useMemo(() => countWords(text), [text]);

  const hasMinWords = wordCount >= task.minWords;
  const withinRange = wordCount >= task.minWords && wordCount <= task.maxWords;
  const strictValid = !submitted ? hasMinWords : withinRange;

  const rangeColor = text.length > 0
    ? hasMinWords
      ? withinRange
        ? "text-emerald-600"
        : "text-amber-600"
      : "text-red-600"
    : "text-surface-500";

  function handleSubmit() {
    if (!hasMinWords) return; // consigne stricte : pas de correction sous le minimum
    setSubmitted(true);
    setSaved(saveLocalDraft(storageKey, task, text));
  }

  function insertAtCursor(inserted: string) {
    if (submitted) return;
    const ta = textareaRef.current;
    const start = ta?.selectionStart ?? text.length;
    const end = ta?.selectionEnd ?? text.length;
    const next = text.slice(0, start) + inserted + text.slice(end);
    setText(next);
    requestAnimationFrame(() => {
      ta?.focus();
      ta?.setSelectionRange(start + inserted.length, start + inserted.length);
    });
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.6fr_1fr]">
      <div className="space-y-4">
        <Card>
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Badge className={cefrLevelColor(task.level)}>Niveau {task.level}</Badge>
              <Badge className="bg-brand-50 text-brand-700">{task.title}</Badge>
            </div>
            <Timer totalSeconds={task.timeLimitMinutes * 60} isRunning={!submitted} />
          </div>
          <p className="text-sm leading-relaxed text-surface-700">{task.prompt}</p>
        </Card>

        <Card>
          <textarea
            ref={textareaRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            disabled={submitted}
            placeholder="Rédigez votre texte ici..."
            className="h-64 w-full resize-none rounded-xl border border-surface-200 p-4 text-sm leading-relaxed text-surface-800 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100 disabled:bg-surface-50"
          />
          <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
            <p className={cn("text-sm font-medium", rangeColor)}>
              {wordCount} mots{" "}
              <span className="font-normal text-surface-400">
                (consigne officielle : {task.minWords}–{task.maxWords} mots)
              </span>
            </p>
            {!submitted ? (
              <div className="flex items-center gap-3">
                {text.length > 0 && !hasMinWords && (
                  <p className="text-xs text-red-600">
                    Minimum non atteint : le TCF refuse la correction d'un texte sous les{" "}
                    {task.minWords} mots.
                  </p>
                )}
                <Button onClick={handleSubmit} disabled={!hasMinWords}>
                  <Send size={16} /> Soumettre pour correction
                </Button>
              </div>
            ) : (
              <Badge className="bg-emerald-100 text-emerald-700">
                <CheckCircle2 size={14} className="mr-1 inline" /> Corrigé affiché
              </Badge>
            )}
          </div>
          {submitted && !withinRange && (
            <p className="mt-2 rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-700">
              Attention : votre texte {wordCount > task.maxWords ? "dépasse" : "ne respecte pas"} la
              longueur officielle. Au TCF, un texte trop long perd des points sur le respect de la
              consigne.
            </p>
          )}
        </Card>
      </div>

      <div className="space-y-4">
        {!submitted && <WritingAidPanel taskNumber={task.taskNumber} onInsert={insertAtCursor} />}

        <Card className="h-fit">
          <div className="mb-3 flex items-center gap-2 text-surface-900">
            <ListChecks size={18} />
            <h3 className="text-sm font-semibold">Grille d'évaluation TCF</h3>
          </div>
          <ul className="space-y-3">
            {task.evaluationCriteria.map((c) => (
              <li key={c.label} className="rounded-xl bg-surface-50 p-3">
                <p className="text-sm font-semibold text-surface-800">{c.label}</p>
                <p className="mt-0.5 text-xs text-surface-500">{c.description}</p>
              </li>
            ))}
          </ul>
        </Card>

        {submitted && (
          <>
            <Card>
              <div className="mb-3 flex items-center gap-2 text-surface-900">
                <FileText size={18} />
                <h3 className="text-sm font-semibold">Corrigé type</h3>
                <Badge
                  className={cn(
                    "ml-auto",
                    strictValid
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-amber-100 text-amber-700"
                  )}
                >
                  {strictValid ? "Conforme" : "Longueur à ajuster"}
                </Badge>
              </div>
              <p className="rounded-xl bg-surface-50 p-3 text-xs leading-relaxed text-surface-700">
                {task.modelAnswer}
              </p>
              <div className="mt-3 space-y-2">
                {task.modelAnswerAnalysis.map((a, i) => (
                  <p key={i} className="flex gap-2 text-xs text-surface-600">
                    <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-emerald-500" />
                    {a}
                  </p>
                ))}
              </div>
              {task.vocabularyNotes && (
                <div className="mt-3">
                  <p className="mb-1 flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-surface-400">
                    <BookMarked size={13} /> Vocabulaire attendu
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {task.vocabularyNotes.map((w) => (
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
              {saved && (
                <p className="mt-3 flex items-center gap-1 text-xs text-emerald-600">
                  <Save size={13} /> Votre texte a été sauvegardé localement (localStorage).
                </p>
              )}
            </Card>

            {onComplete && (
              <Button className="w-full" onClick={() => onComplete({ withinRange, wordCount })}>
                {completeLabel}
              </Button>
            )}
          </>
        )}

        </div>

      {submitted && (
        <WritingAnalyst
          text={text}
          taskNumber={task.taskNumber}
          minWords={task.minWords}
          maxWords={task.maxWords}
        />
      )}
      </div>
    </div>
  );
}