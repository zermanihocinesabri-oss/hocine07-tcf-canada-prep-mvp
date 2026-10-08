"use client";

import { useMemo, useState } from "react";
import {
  AlertTriangle,
  Award,
  BookMarked,
  Check,
  Copy,
  FileText,
  Hash,
  Info,
  Layers,
  Languages,
  ListChecks,
  ScrollText,
  Sparkles,
  SpellCheck,
  Wand2,
  XCircle,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { CefrLevel } from "@/lib/types";
import {
  analyzeWriting,
  CorrectionIssue,
  WritingCriterionId,
} from "@/lib/ee/correction-engine";
import {
  rewriteForExcellence,
  RewriteEdit,
  RewriteTechnique,
} from "@/lib/ee/rewrite-excellence";
import { cn } from "@/lib/utils/scoring";

const CRITERION_ICONS: Record<WritingCriterionId, typeof ListChecks> = {
  consigne: ListChecks,
  structure: Layers,
  grammaire: FileText,
  lexique: Languages,
  orthographe: SpellCheck,
};

const TECHNIQUE_BADGES: Record<RewriteTechnique, string> = {
  "registre-soutenu": "bg-violet-100 text-violet-700",
  "connecteur-haut-niveau": "bg-sky-100 text-sky-700",
  nominalisation: "bg-emerald-100 text-emerald-700",
  subjonctif: "bg-amber-100 text-amber-700",
  "incise-de-precision": "bg-brand-100 text-brand-700",
};

const TECHNIQUE_LABELS: Record<RewriteTechnique, string> = {
  "registre-soutenu": "Registre soutenu",
  "connecteur-haut-niveau": "Connecteur de haut niveau",
  nominalisation: "Nominalisation",
  subjonctif: "Mode subjonctif",
  "incise-de-precision": "Précision ajoutée",
};

const CRITERION_COLORS: Record<WritingCriterionId, string> = {
  consigne: "bg-emerald-500",
  structure: "bg-sky-500",
  grammaire: "bg-violet-500",
  lexique: "bg-brand-600",
  orthographe: "bg-amber-500",
};

function cefrBadgeClass(cefr: CefrLevel): string {
  switch (cefr) {
    case "C2":
      return "bg-rose-100 text-rose-700";
    case "C1":
      return "bg-violet-100 text-violet-700";
    case "B2":
      return "bg-brand-100 text-brand-700";
    case "B1":
      return "bg-sky-100 text-sky-700";
    case "A2":
      return "bg-amber-100 text-amber-700";
    default:
      return "bg-slate-100 text-slate-600";
  }
}

function issueStyles(issue: CorrectionIssue) {
  switch (issue.severity) {
    case "error":
      return {
        icon: XCircle,
        chip: "border-red-200 bg-red-50",
        text: "text-red-700",
        iconCls: "text-red-500",
      };
    case "warning":
      return {
        icon: AlertTriangle,
        chip: "border-amber-200 bg-amber-50",
        text: "text-amber-800",
        iconCls: "text-amber-500",
      };
    default:
      return {
        icon: Info,
        chip: "border-sky-200 bg-sky-50",
        text: "text-sky-800",
        iconCls: "text-sky-500",
      };
  }
}

function planKindLabel(kind: "explicite" | "implicite" | "absent"): string {
  switch (kind) {
    case "explicite":
      return "Plan explicite";
    case "implicite":
      return "Plan implicite";
    default:
      return "Plan absent";
  }
}

export function WritingAnalyst({
  text,
  taskNumber,
  minWords,
  maxWords,
}: {
  text: string;
  taskNumber: 1 | 2 | 3;
  minWords: number;
  maxWords: number;
}) {
  const result = useMemo(
    () => analyzeWriting(text, { taskNumber, minWords, maxWords }),
    [text, taskNumber, minWords, maxWords]
  );
  const rewrite = useMemo(() => rewriteForExcellence(text), [text]);
  const [copied, setCopied] = useState(false);

  async function handleCopyRewritten() {
    if (!rewrite.rewritten || !navigator.clipboard) return;
    try {
      await navigator.clipboard.writeText(rewrite.rewritten);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  if (!result.valid) {
    return (
      <Card className="mx-auto max-w-2xl">
        <p className="flex items-center gap-2 text-sm text-surface-600">
          <Info size={16} className="text-surface-400" />
          Copie vide : rédigez un texte avant de lancer l'analyse du correcteur.
        </p>
      </Card>
    );
  }

  const wcOk = result.wordCount.status === "ok";
  const barrier = result.weightedScore20 >= 17 ? "C2" : result.weightedScore20 >= 15 ? "C1" : null;

  return (
    <div className="mx-auto max-w-5xl space-y-5">
      <Card className="border-t-4 border-t-brand-600">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-600 text-white">
              <Sparkles size={22} />
            </div>
            <div>
              <p className="text-sm font-semibold text-surface-900">
                Analyse du correcteur — objectif C2
              </p>
              <Badge className={cn("mt-1", cefrBadgeClass(result.cefr.cefr))}>
                Niveau estimé : {result.cefr.cefr}
              </Badge>
              <Badge className="ml-1 bg-surface-100 text-surface-600">
                {result.cefr.score699}/699 · {result.cefr.nclc}
              </Badge>
            </div>
          </div>
          <div className="text-right">
            <p className="text-4xl font-extrabold text-surface-900">
              {result.weightedScore20.toFixed(1)}
              <span className="text-lg font-semibold text-surface-400"> / 20</span>
            </p>
            <p className="text-xs text-surface-500">
              Confiance {result.cefr.confidence} · {result.wordCount.words} mots
              ({result.wordCount.minWords}–{result.wordCount.maxWords})
            </p>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <Badge
            className={cn(
              wcOk
                ? "bg-emerald-100 text-emerald-700"
                : result.wordCount.status === "short"
                  ? "bg-red-100 text-red-700"
                  : "bg-amber-100 text-amber-700"
            )}
          >
            {wcOk
              ? "Longueur conforme"
              : result.wordCount.status === "short"
                ? "Texte trop court (non corrigé officiellement)"
                : "Texte trop long (pénalité consigne)"}
          </Badge>
          {barrier && (
            <Badge className={cn("bg-rose-100", barrier === "C2" ? "text-rose-700" : "text-violet-700")}>
              <Award size={13} className="mr-1 inline" />
              Seuil {barrier} : {result.weightedScore20 >= 17 ? "atteint" : "proche"}
            </Badge>
          )}
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {result.criteria.map((c) => {
          const Icon = CRITERION_ICONS[c.id];
          return (
            <Card key={c.id} className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div
                  className={cn(
                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-white",
                    CRITERION_COLORS[c.id]
                  )}
                >
                  <Icon size={16} />
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-surface-900">
                    {c.points}
                    <span className="text-xs font-medium text-surface-400">/20</span>
                  </p>
                  <p className="text-[10px] text-surface-400">poids {Math.round(c.weight * 100)}%</p>
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold leading-tight text-surface-900">{c.label}</p>
                <p className="mt-1 text-[11px] leading-snug text-surface-500">{c.note}</p>
              </div>
              <ProgressBar
                value={c.points * 5}
                colorClassName={cn(
                  c.points >= 15
                    ? "bg-emerald-500"
                    : c.points >= 12
                      ? "bg-brand-500"
                      : "bg-amber-500"
                )}
              />
              {c.findings.length > 0 && (
                <ul className="space-y-1">
                  {c.findings.map((f, i) => (
                    <li key={i} className="flex gap-1.5 text-[11px] leading-snug text-surface-600">
                      <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-surface-300" />
                      {f}
                    </li>
                  ))}
                </ul>
              )}
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <div className="mb-3 flex items-center gap-2 text-surface-900">
            <ScrollText size={17} />
            <h3 className="text-sm font-semibold">Analyse structurelle</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge className="bg-surface-100 text-surface-600">
              {result.plan.paragraphs} paragraphe(s)
            </Badge>
            <Badge className="bg-surface-100 text-surface-600">
              {planKindLabel(result.plan.planKind)}
            </Badge>
            <Badge className="bg-surface-100 text-surface-600">
              {result.plan.connectorTotal} connecteur(s) · densité {result.plan.connectorDensity}
            </Badge>
            {result.plan.hasAntithesis && (
              <Badge className="bg-emerald-100 text-emerald-700">antithèse</Badge>
            )}
            {result.plan.hasSynthesis && (
              <Badge className="bg-emerald-100 text-emerald-700">synthèse</Badge>
            )}
          </div>
          <div className="mt-3 space-y-1.5">
            {result.plan.byCategory.length > 0 ? (
              result.plan.byCategory.map((c) => (
                <div key={c.id} className="flex items-center justify-between text-xs">
                  <span className="text-surface-600">{c.label}</span>
                  <span className="font-semibold text-surface-800">{c.count}</span>
                </div>
              ))
            ) : (
              <p className="text-xs text-surface-500">Aucun connecteur logique détecté.</p>
            )}
          </div>
        </Card>

        <Card>
          <div className="mb-3 flex items-center gap-2 text-surface-900">
            <BookMarked size={17} />
            <h3 className="text-sm font-semibold">Registre &amp; richesse lexicale</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge
              className={cn(
                result.register.register === "soutenu"
                  ? "bg-violet-100 text-violet-700"
                  : result.register.register === "familier"
                    ? "bg-red-100 text-red-700"
                    : result.register.register === "mixte"
                      ? "bg-amber-100 text-amber-700"
                      : "bg-sky-100 text-sky-700"
              )}
            >
              Registre {result.register.register}
            </Badge>
            <Badge className="bg-surface-100 text-surface-600">
              TTR {result.lexical.ttr.toFixed(2)} · diversité {result.lexical.diversityLabel}
            </Badge>
            {result.lexical.c2Signals.length > 0 && (
              <Badge className="bg-rose-100 text-rose-700">
                {result.lexical.c2Signals.length} signal(aux) C2
              </Badge>
            )}
          </div>
          {result.lexical.c2Signals.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {result.lexical.c2Signals.map((w) => (
                <span
                  key={w}
                  className="rounded-full bg-rose-50 px-2 py-0.5 text-[11px] font-medium text-rose-700"
                >
                  {w}
                </span>
              ))}
            </div>
          )}
          {result.register.familiarSignals.length > 0 && (
            <div className="mt-3">
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-red-500">
                Marques de registre à corriger
              </p>
              <div className="flex flex-wrap gap-1.5">
                {result.register.familiarSignals.map((w) => (
                  <span
                    key={w}
                    className="rounded-full bg-red-50 px-2 py-0.5 text-[11px] font-medium text-red-700"
                  >
                    {w}
                  </span>
                ))}
              </div>
            </div>
          )}
          {result.lexical.anglicisms.length > 0 && (
            <div className="mt-3">
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-amber-600">
                Anglicismes / usages à préférer
              </p>
              <ul className="space-y-1">
                {result.lexical.anglicisms.map((a) => (
                  <li key={a.match} className="text-xs text-surface-700">
                    <span className="font-semibold">{a.match}</span>
                    <span className="text-surface-400"> → </span>
                    {a.preferred}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Card>
      </div>

      <Card>
        <div className="mb-3 flex items-center gap-2 text-surface-900">
          <Hash size={17} />
          <h3 className="text-sm font-semibold">Pistes d'amélioration</h3>
        </div>
        {result.issues.length === 0 ? (
          <p className="text-sm text-emerald-700">
            <Check size={15} className="mr-1 inline" />
            Aucun point bloquant détecté par les règles locales : votre copie est solide.
          </p>
        ) : (
          <ul className="space-y-2">
            {result.issues.map((issue) => {
              const styles = issueStyles(issue);
              const Icon = styles.icon;
              return (
                <li
                  key={issue.id}
                  className={cn("flex items-start gap-2.5 rounded-xl border p-3", styles.chip)}
                >
                  <Icon size={16} className={cn("mt-0.5 shrink-0", styles.iconCls)} />
                  <div className="min-w-0 flex-1">
                    <p className={cn("text-xs font-medium", styles.text)}>{issue.message}</p>
                    {issue.suggestion && (
                      <p className="mt-0.5 text-[11px] italic text-surface-500">
                        Corrigez : {issue.suggestion}
                      </p>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </Card>

      <Card className="border-t-4 border-t-violet-600">
        <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-surface-900">
            <Wand2 size={18} />
            <h3 className="text-sm font-semibold">Réécriture « Excellence C2 »</h3>
          </div>
          {rewrite.edits.length > 0 && (
            <Button size="sm" variant="secondary" onClick={handleCopyRewritten}>
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? "Copié" : "Copier la version C2"}
            </Button>
          )}
        </div>
        <p className="mb-4 text-xs leading-relaxed text-surface-600">{rewrite.summary}</p>

        {rewrite.edits.length > 0 && (
          <div className="mb-4 space-y-2">
            {rewrite.edits.map((edit) => (
              <div
                key={edit.id}
                className="rounded-xl border border-surface-200 bg-surface-50 p-3"
              >
                <div className="mb-2 flex flex-wrap gap-1.5">
                  <Badge className={TECHNIQUE_BADGES[edit.technique]}>
                    {TECHNIQUE_LABELS[edit.technique]}
                  </Badge>
                  <Badge className="bg-surface-200 text-surface-600">{edit.criterion}</Badge>
                </div>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  <p className="rounded-lg bg-red-50 px-3 py-2 text-xs leading-relaxed text-red-800">
                    <span className="mb-0.5 block text-[10px] font-semibold uppercase tracking-wide text-red-400">
                      Avant
                    </span>
                    {edit.before}
                  </p>
                  <p className="rounded-lg bg-emerald-50 px-3 py-2 text-xs leading-relaxed text-emerald-800">
                    <span className="mb-0.5 block text-[10px] font-semibold uppercase tracking-wide text-emerald-400">
                      Après
                    </span>
                    {edit.after}
                  </p>
                </div>
                <p className="mt-2 flex items-start gap-1.5 text-[11px] leading-snug text-surface-600">
                  <Sparkles size={13} className="mt-0.5 shrink-0 text-violet-500" />
                  {edit.justification}
                </p>
              </div>
            ))}
          </div>
        )}

        <div>
          <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-surface-400">
            Version complète rehaussée
          </p>
          <textarea
            readOnly
            value={rewrite.rewritten}
            className="h-44 w-full resize-none rounded-xl border border-surface-200 p-4 text-sm leading-relaxed text-surface-800 focus:outline-none"
          />
        </div>
      </Card>
    </div>
  );
}