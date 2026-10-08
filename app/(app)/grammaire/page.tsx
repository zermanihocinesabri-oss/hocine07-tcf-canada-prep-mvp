"use client";

import { useState } from "react";
import {
  ArrowRight,
  BookOpenCheck,
  CheckCheck,
  CornerDownLeft,
  GitBranch,
  Highlighter,
  Layers,
  Link2,
  ListChecks,
  ShieldAlert,
  Waypoints,
} from "lucide-react";
import { Topbar } from "@/components/layout/Topbar";
import { GrammarPlayer } from "@/components/grammar/GrammarPlayer";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { getGrammarCategories, getGrammarLessonsForCategory } from "@/lib/data/grammar";
import { GrammarLesson } from "@/lib/types";

const categoryIcons: Record<string, typeof GitBranch> = {
  hypotaxe: GitBranch,
  subordination: Link2,
  "mise-en-relief": Highlighter,
  subjonctif: ShieldAlert,
  "accords-participe": CheckCheck,
  connecteurs: Waypoints,
};

export default function GrammairePage() {
  const [selected, setSelected] = useState<GrammarLesson | null>(null);
  const categories = getGrammarCategories();

  if (selected) {
    return (
      <>
        <Topbar title="Grammaire B2/C1" />
        <div className="mx-auto max-w-3xl space-y-6 px-4 py-6 lg:px-8">
          <GrammarPlayer lesson={selected} onBack={() => setSelected(null)} />
        </div>
      </>
    );
  }

  return (
    <>
      <Topbar title="Grammaire B2/C1" />
      <div className="mx-auto max-w-5xl space-y-6 px-4 py-6 lg:px-8">
        <Card>
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand-600 text-white">
              <BookOpenCheck size={22} />
            </div>
            <div>
              <h1 className="text-lg font-bold text-surface-900">
                Maîtrisez les structures avancées
              </h1>
              <p className="mt-0.5 text-sm text-surface-500">
                Six catégories grammaticales B2/C1, les plus récurrentes des épreuves écrites et
                orales du TCF, chacune avec une fiche de théorie, des pièges à éviter et un QCM
                d'application corrigé.
              </p>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {categories.map((cat) => {
            const lessons = getGrammarLessonsForCategory(cat.id);
            const Icon = categoryIcons[cat.id] ?? BookOpenCheck;
            return (
              <Card key={cat.id} className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                    <Icon size={18} />
                  </div>
                  <div>
                    <p className="text-base font-semibold text-surface-900">{cat.title}</p>
                    <Badge className="mt-0.5 bg-surface-100 text-surface-600">
                      Niveau {cat.level}
                    </Badge>
                  </div>
                </div>
                <p className="text-xs text-surface-600">{cat.description}</p>

                <ul className="space-y-1.5">
                  {lessons.map((lesson) => (
                    <li key={lesson.id}>
                      <button
                        onClick={() => setSelected(lesson)}
                        className="group w-full rounded-xl border border-surface-200 px-3 py-2.5 text-left transition-colors hover:border-brand-300 hover:bg-brand-50"
                      >
                        <span className="flex items-center justify-between gap-2">
                          <span className="text-sm font-semibold text-surface-800">
                            {lesson.title}
                          </span>
                          <ArrowRight
                            size={15}
                            className="shrink-0 text-surface-300 transition-colors group-hover:text-brand-600"
                          />
                        </span>
                        <span className="mt-0.5 flex items-center gap-1 text-[11px] text-surface-500">
                          <ListChecks size={12} /> {lesson.exerciseCount} questions · ~
                          {lesson.durationMinutes} min · {lesson.summary.slice(0, 70)}…
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </Card>
            );
          })}
        </div>

        <Card className="!bg-surface-50">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
              <CornerDownLeft size={18} />
            </div>
            <div>
              <p className="flex items-center gap-1.5 text-sm font-semibold text-surface-800">
                <Layers size={15} /> Conseil de méthode
              </p>
              <p className="mt-1 text-xs leading-relaxed text-surface-600">
                Les erreurs de grammaire avancée pénalisent surtout l'expression écrite et orale
                (tâches 3 du TCF). Étudiez chaque fiche, puis répétez le QCM jusqu'à obtenir 100 %
                de bonnes réponses : la correction vous explique à chaque fois pourquoi une réponse
                est fausse.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}