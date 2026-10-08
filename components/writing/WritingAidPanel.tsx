"use client";

import { useState } from "react";
import {
  ClipboardList,
  GitMerge,
  HandHeart,
  Lightbulb,
  MousePointerClick,
  Waypoints,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import {
  getConnectorCategories,
  getFormuleRegisters,
  getWritingPlan,
} from "@/lib/data/writingAid";
import { cn } from "@/lib/utils/scoring";

type Tab = "plan" | "connecteurs" | "formules";

export function WritingAidPanel({
  taskNumber,
  onInsert,
}: {
  taskNumber: 1 | 2 | 3;
  onInsert: (text: string) => void;
}) {
  const [tab, setTab] = useState<Tab>("plan");
  const [activeCat, setActiveCat] = useState<string | null>(null);

  const plan = getWritingPlan(taskNumber);
  const connectorCategories = getConnectorCategories();
  const selected = connectorCategories.find((c) => c.id === activeCat);
  const formuleRegisters = getFormuleRegisters();

  const tabs: { id: Tab; label: string; icon: typeof GitMerge }[] = [
    { id: "plan", label: "Plan type", icon: ClipboardList },
    { id: "connecteurs", label: "Connecteurs", icon: GitMerge },
    { id: "formules", label: "Formules", icon: HandHeart },
  ];

  return (
    <Card className="h-fit">
      <div className="mb-3 flex flex-wrap gap-1.5">
        {tabs.map((t) => {
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={cn(
                "flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-colors",
                tab === t.id
                  ? "bg-brand-600 text-white"
                  : "bg-surface-100 text-surface-600 hover:bg-surface-200"
              )}
            >
              <Icon size={14} /> {t.label}
            </button>
          );
        })}
      </div>

      {tab === "plan" && plan && (
        <div className="space-y-3">
          {plan.sections.map((s, i) => (
            <div key={i} className="rounded-xl bg-surface-50 p-3">
              <p className="text-sm font-semibold text-surface-800">{s.label}</p>
              <p className="mt-0.5 text-xs text-surface-500">{s.description}</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {s.starters.map((starter, j) => (
                  <button
                    key={j}
                    onClick={() => onInsert(starter + " ")}
                    className="rounded-full border border-brand-200 bg-white px-2 py-1 text-[11px] font-medium text-brand-700 transition-colors hover:bg-brand-50"
                  >
                    {starter}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "connecteurs" && (
        <div className="space-y-3">
          {!activeCat ? (
            <ul className="grid grid-cols-2 gap-1.5">
              {connectorCategories.map((c) => (
                <li key={c.id}>
                  <button
                    onClick={() => setActiveCat(c.id)}
                    className="w-full rounded-lg bg-surface-50 px-2.5 py-2 text-left text-xs font-semibold text-surface-700 transition-colors hover:bg-brand-50 hover:text-brand-700"
                  >
                    {c.title}
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="space-y-2">
              <button
                onClick={() => setActiveCat(null)}
                className="text-xs font-medium text-brand-600 hover:underline"
              >
                ← Toutes les catégories
              </button>
              <p className="text-xs text-surface-500">{selected?.description}</p>
              {selected?.connectors.map((connector, i) => (
                <button
                  key={i}
                  onClick={() => onInsert(connector.text + " ")}
                  className="block w-full rounded-lg border border-surface-200 p-2.5 text-left transition-colors hover:border-brand-300 hover:bg-brand-50"
                >
                  <span className="flex items-center gap-1.5 text-sm font-semibold text-surface-800">
                    <MousePointerClick size={12} className="text-brand-600" /> {connector.text}
                  </span>
                  <span className="mt-0.5 block text-[11px] italic leading-snug text-surface-500">
                    {connector.example}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {tab === "formules" && (
        <div className="space-y-3">
          {formuleRegisters.map((reg) => (
            <div key={reg.id} className="rounded-xl bg-surface-50 p-3">
              <p className="text-sm font-semibold text-surface-800">{reg.title}</p>
              <p className="mt-2 mb-1 text-[11px] font-semibold uppercase tracking-wide text-surface-400">
                Formules d'appel
              </p>
              <div className="flex flex-wrap gap-1.5">
                {reg.openers.map((o, i) => (
                  <button
                    key={i}
                    onClick={() => onInsert(o.text + "\n\n")}
                    title={o.usage}
                    className="rounded-full bg-white px-2 py-1 text-[11px] font-medium text-surface-700 transition-colors hover:bg-brand-50 hover:text-brand-700"
                  >
                    {o.text}
                  </button>
                ))}
              </div>
              <p className="mt-2 mb-1 text-[11px] font-semibold uppercase tracking-wide text-surface-400">
                Formules de clôture
              </p>
              <div className="flex flex-wrap gap-1.5">
                {reg.closers.map((c, i) => (
                  <button
                    key={i}
                    onClick={() => onInsert("\n" + c.text)}
                    title={c.usage}
                    className="rounded-full bg-white px-2 py-1 text-[11px] font-medium text-surface-700 transition-colors hover:bg-brand-50 hover:text-brand-700"
                  >
                    {c.text}
                  </button>
                ))}
              </div>
            </div>
          ))}
          <p className="flex items-start gap-1.5 rounded-xl bg-brand-50 p-3 text-xs text-brand-800">
            <Lightbulb size={14} className="mt-0.5 shrink-0" />
            Une formule insérée s'ajoute au texte à la position de votre curseur — ajustez ensuite
            l'interlocuteur et le registre.
          </p>
        </div>
      )}

      <p className="mt-3 flex items-start gap-1.5 border-t border-surface-100 pt-3 text-[11px] text-surface-400">
        <Waypoints size={13} className="mt-0.5 shrink-0" />
        Cliquez sur un élément pour l'insérer directement dans votre texte (aucune saisie
        manuelle nécessaire).
      </p>
    </Card>
  );
}