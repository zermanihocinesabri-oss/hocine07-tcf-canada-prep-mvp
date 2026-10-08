"use client";

import Link from "next/link";
import { ArrowRight, Headphones, BookOpenText, PenLine, Mic, AlarmClock } from "lucide-react";
import { Topbar } from "@/components/layout/Topbar";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { tcfOfficial } from "@/lib/data/tcf";
import { Skill } from "@/lib/types";
import { useProgress } from "@/lib/utils/progressStore";

const skillMeta: Record<
  Skill,
  { icon: typeof Headphones; accent: string; href: string }
> = {
  CO: { icon: Headphones, accent: "bg-brand-600", href: "/evaluations/CO" },
  CE: { icon: BookOpenText, accent: "bg-sky-600", href: "/evaluations/CE" },
  EE: { icon: PenLine, accent: "bg-violet-600", href: "/evaluations/EE" },
  EO: { icon: Mic, accent: "bg-rose-600", href: "/evaluations/EO" },
};

export default function EvaluationsPage() {
  const { countAttempts } = useProgress();

  return (
    <>
      <Topbar title="Évaluations chronométrées" />
      <div className="mx-auto max-w-4xl space-y-6 px-4 py-6 lg:px-8">
        <Card>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-600 text-white">
                <AlarmClock size={22} />
              </div>
              <div>
                <h1 className="text-lg font-bold text-surface-900">
                  Reproduisez les conditions réelles de l'examen
                </h1>
                <p className="text-sm text-surface-500">
                  Chaque évaluation respecte le chronomètre officiel du TCF Canada et convertit
                  votre score sur l'échelle 0-699, puis en CECRL et NCLC.
                </p>
              </div>
            </div>
            <Badge className="bg-surface-100 text-surface-600">
              {countAttempts()} évaluation(s) passée(s)
            </Badge>
          </div>
        </Card>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {(Object.keys(tcfOfficial) as Skill[]).map((skill) => {
            const spec = tcfOfficial[skill];
            const meta = skillMeta[skill];
            const Icon = meta.icon;
            return (
              <Link key={skill} href={meta.href}>
                <Card className="flex h-full flex-col gap-3 transition-colors hover:border-brand-300">
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-white ${meta.accent}`}
                    >
                      <Icon size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-surface-900">{spec.label}</p>
                      <p className="text-xs text-surface-500">
                        {spec.durationMinutes} min · {spec.itemsOfficial} items
                      </p>
                    </div>
                  </div>
                  <p className="flex-1 text-xs leading-relaxed text-surface-500">
                    {spec.description}
                  </p>
                  <span className="flex items-center gap-1 text-xs font-semibold text-brand-600">
                    Passer l'évaluation <ArrowRight size={13} />
                  </span>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}