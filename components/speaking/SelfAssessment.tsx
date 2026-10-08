"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, ClipboardCheck, Save } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  getSelfAssessmentCriteria,
  loadSelfAssessments,
  saveSelfAssessment,
} from "@/lib/data/speakingAid";
import { SelfCriterionKey } from "@/lib/types";
import { cn } from "@/lib/utils/scoring";

const emptyScores: Record<SelfCriterionKey, number> = {
  aisance: 0,
  lexique: 0,
  grammaire: 0,
  prononciation: 0,
};

function scoreLabel(total: number): string {
  if (total >= 3.5) return "Prêt(e) pour le niveau visé";
  if (total >= 2.5) return "Bonne base — gagnez en régularité";
  if (total >= 1.5) return "À travailler — reprenez les points du corrigé";
  return "Besoin de reprise — revoyez la méthode et enregistrez à nouveau";
}

export function SelfAssessment({ topicId }: { topicId: string }) {
  const criteria = getSelfAssessmentCriteria();
  const [scores, setScores] = useState<Record<SelfCriterionKey, number>>(emptyScores);
  const [comment, setComment] = useState("");
  const [savedCount, setSavedCount] = useState(() =>
    loadSelfAssessments().filter((a) => a.topicId === topicId).length
  );
  const [justSaved, setJustSaved] = useState(false);

  const allChosen = criteria.every((c) => scores[c.key] > 0);
  const average = useMemo(
    () =>
      allChosen
        ? Math.round(
            (criteria.reduce((sum, c) => sum + scores[c.key], 0) / criteria.length) * 10
          ) / 10
        : null,
    [allChosen, criteria, scores]
  );

  function pickCriterion(key: SelfCriterionKey, value: number) {
    setScores((prev) => ({ ...prev, [key]: value }));
  }

  function handleSave() {
    if (!allChosen) return;
    saveSelfAssessment({
      id: `${topicId}-${Date.now()}`,
      topicId,
      date: new Date().toISOString(),
      scores,
      comment: comment.trim() || undefined,
    });
    setJustSaved(true);
    setSavedCount((c) => c + 1);
  }

  return (
    <Card>
      <div className="mb-3 flex items-center gap-2 text-surface-900">
        <ClipboardCheck size={18} className="text-brand-600" />
        <h3 className="text-sm font-semibold">Auto-évaluation de votre oral</h3>
        <Badge className="ml-auto bg-surface-100 text-surface-600">
          {savedCount} évaluation{savedCount > 1 ? "s" : ""} enregistrée{savedCount > 1 ? "s" : ""}
        </Badge>
      </div>

      <ul className="space-y-3">
        {criteria.map((c) => (
          <li key={c.key}>
            <div className="mb-1 flex items-center justify-between">
              <p className="text-sm font-semibold text-surface-800">{c.label}</p>
              <span className="text-[11px] text-surface-400">{c.description}</span>
            </div>
            <div className="grid grid-cols-4 gap-1.5">
              {c.levels.map((level, i) => {
                const value = i + 1;
                const selected = scores[c.key] === value;
                return (
                  <button
                    key={i}
                    onClick={() => pickCriterion(c.key, value)}
                    title={level.description}
                    className={cn(
                      "rounded-lg border p-2 text-left transition-colors",
                      selected
                        ? "border-brand-600 bg-brand-600 text-white"
                        : "border-surface-200 bg-white hover:border-brand-300 hover:bg-brand-50"
                    )}
                  >
                    <span className="block text-[11px] font-bold">{value}</span>
                    <span
                      className={cn(
                        "block text-[10px] font-medium leading-tight",
                        selected ? "text-brand-50" : "text-surface-600"
                      )}
                    >
                      {level.label.replace(/^\d+ — /, "")}
                    </span>
                  </button>
                );
              })}
            </div>
            {c.levels[scores[c.key] - 1] && (
              <p className="mt-1 text-[11px] italic text-surface-500">
                {c.levels[scores[c.key] - 1].description}
              </p>
            )}
          </li>
        ))}
      </ul>

      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value.slice(0, 300))}
        placeholder="Commentaire libre sur votre prestation (ce que vous voulez améliorer)..."
        className="mt-3 h-20 w-full resize-none rounded-xl border border-surface-200 p-3 text-xs text-surface-800 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100"
      />

      <div className="mt-3 flex flex-wrap items-center gap-3">
        <Button onClick={handleSave} disabled={!allChosen}>
          <Save size={15} /> Enregistrer mon auto-évaluation
        </Button>
        {average !== null && (
          <Badge
            className={cn(
              average >= 3
                ? "bg-emerald-100 text-emerald-700"
                : average >= 2
                ? "bg-amber-100 text-amber-700"
                : "bg-red-100 text-red-700"
            )}
          >
            Moyenne : {average} / 4 — {scoreLabel(average)}
          </Badge>
        )}
      </div>

      {justSaved && (
        <p className="mt-2 flex items-center gap-1 text-xs text-emerald-600">
          <CheckCircle2 size={13} /> Auto-évaluation sauvegardée localement.
        </p>
      )}
    </Card>
  );
}