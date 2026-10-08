"use client";

import { useState } from "react";
import { ArrowRight, Boxes, Lightbulb } from "lucide-react";
import { Topbar } from "@/components/layout/Topbar";
import { VocabularyWorkshop } from "@/components/vocabulary/VocabularyWorkshop";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { getVocabularyThemes } from "@/lib/data/vocabulary";
import { VocabularyTheme } from "@/lib/types";
import { cefrLevelColor } from "@/lib/utils/scoring";

export default function VocabulairePage() {
  const [selected, setSelected] = useState<VocabularyTheme | null>(null);
  const themes = getVocabularyThemes();

  if (selected) {
    return (
      <>
        <Topbar title="Vocabulaire thématique" />
        <div className="mx-auto max-w-5xl space-y-6 px-4 py-6 lg:px-8">
          <VocabularyWorkshop theme={selected} onBack={() => setSelected(null)} />
        </div>
      </>
    );
  }

  return (
    <>
      <Topbar title="Vocabulaire thématique" />
      <div className="mx-auto max-w-5xl space-y-6 px-4 py-6 lg:px-8">
        <Card>
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand-600 text-white">
              <Boxes size={22} />
            </div>
            <div>
              <h1 className="text-lg font-bold text-surface-900">
                Enrichissez votre lexique par thèmes
              </h1>
              <p className="mt-0.5 text-sm text-surface-500">
                Les cinq grands sujets du TCF Canada, avec leurs mots essentiels (définition,
                exemple, famille, traduction) et un mini-quiz corrigé pour ancrer le vocabulaire.
              </p>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {themes.map((theme) => (
            <button
              key={theme.id}
              onClick={() => setSelected(theme)}
              className="group text-left"
            >
              <Card className="flex h-full flex-col gap-3 transition-colors group-hover:border-brand-300">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-xl">
                    {theme.emoji}
                  </div>
                  <div>
                    <p className="text-base font-semibold text-surface-900">{theme.title}</p>
                    <Badge className="mt-0.5 bg-surface-100 text-surface-600">
                      {theme.words.length} mots
                    </Badge>
                  </div>
                  <ArrowRight
                    size={16}
                    className="ml-auto shrink-0 text-surface-300 transition-colors group-hover:text-brand-600"
                  />
                </div>
                <span className="block text-xs leading-relaxed text-surface-600">
                  {theme.description}
                </span>
                <span className="mt-auto flex items-center gap-2">
                  <Badge className={cefrLevelColor(theme.level)}>Niveau {theme.level}</Badge>
                  <Badge className="bg-brand-50 text-brand-700">Quiz inclus</Badge>
                </span>
              </Card>
            </button>
          ))}
        </div>

        <Card className="!bg-surface-50">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
              <Lightbulb size={18} />
            </div>
            <div>
              <p className="text-sm font-semibold text-surface-800">Stratégie gagnante</p>
              <p className="mt-1 text-xs leading-relaxed text-surface-600">
                Le vocabulaire compte jusqu'à un tiers de la note d'expression. Pour chaque thème :
                apprenez les mots par familles (un verbe, son nom, son adjectif), puis enchaînez le
                mini-quiz — la correction immédiate fixe le mot dans son contexte.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}