import { CefrLevel } from "@/lib/types";
import { allCefrLevels, cefrLevelColor, cefrLevelDescription, cn } from "@/lib/utils/scoring";

interface LevelSelectorProps {
  value: CefrLevel;
  onChange: (level: CefrLevel) => void;
  className?: string;
}

export function LevelSelector({ value, onChange, className }: LevelSelectorProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex flex-wrap gap-2">
        {allCefrLevels.map((level) => (
          <button
            key={level}
            type="button"
            onClick={() => onChange(level)}
            aria-pressed={value === level}
            className={cn(
              "min-w-[3.25rem] rounded-xl border px-3 py-2 text-sm font-bold transition-colors",
              value === level
                ? "border-brand-500 bg-brand-600 text-white shadow-sm"
                : "border-surface-200 bg-white text-surface-600 hover:border-brand-300"
            )}
          >
            {level}
          </button>
        ))}
      </div>
      <div
        className={cn(
          "rounded-xl px-3 py-2 text-xs leading-relaxed",
          value === "C2" && "bg-rose-50 text-rose-800",
          value === "C1" && "bg-violet-50 text-violet-800",
          value === "B2" && "bg-brand-50 text-brand-800",
          value === "B1" && "bg-sky-50 text-sky-800",
          value === "A2" && "bg-teal-50 text-teal-800",
          value === "A1" && "bg-emerald-50 text-emerald-800"
        )}
      >
        <span
          className={cn(
            "mr-1.5 inline-block rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide",
            cefrLevelColor(value)
          )}
        >
          {value}
        </span>
        {cefrLevelDescription(value)}
      </div>
    </div>
  );
}