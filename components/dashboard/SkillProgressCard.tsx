import Link from "next/link";
import { Headphones, BookOpenText, Mic, PenLine, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { SkillProgress } from "@/lib/types";
import { levelBadgeColor } from "@/lib/utils/scoring";

const skillMeta = {
  CO: { icon: Headphones, href: "/entrainement/comprehension-orale" },
  CE: { icon: BookOpenText, href: "/entrainement/comprehension-ecrite" },
  EO: { icon: Mic, href: "/entrainement/expression-orale" },
  EE: { icon: PenLine, href: "/entrainement/expression-ecrite" },
};

export function SkillProgressCard({
  progress,
  noEstimate = false,
}: {
  progress: SkillProgress;
  noEstimate?: boolean;
}) {
  const meta = skillMeta[progress.skill];
  const Icon = meta.icon;

  return (
    <Card className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
            <Icon size={20} />
          </div>
          <div>
            <p className="text-sm font-semibold text-surface-900">{progress.label}</p>
            <p className="text-xs text-surface-500">{progress.skill}</p>
          </div>
        </div>
        {noEstimate ? (
          <Badge className="bg-surface-100 text-surface-500">Pas de score</Badge>
        ) : (
          <Badge className={levelBadgeColor(progress.estimatedLevel)}>
            {progress.estimatedLevel}
          </Badge>
        )}
      </div>

      <div>
        <div className="mb-1.5 flex items-center justify-between text-xs text-surface-500">
          <span>Progression du programme</span>
          <span className="font-semibold text-surface-700">{progress.progressPercent}%</span>
        </div>
        <ProgressBar value={progress.progressPercent} />
      </div>

      <Link
        href={meta.href}
        className="flex items-center gap-1 text-sm font-semibold text-brand-600 hover:text-brand-700"
      >
        S'entraîner <ArrowRight size={15} />
      </Link>
    </Card>
  );
}
