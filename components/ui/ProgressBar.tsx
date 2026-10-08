import { cn } from "@/lib/utils/scoring";

interface ProgressBarProps {
  value: number; // 0-100
  className?: string;
  colorClassName?: string;
}

export function ProgressBar({ value, className, colorClassName }: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <div className={cn("h-2 w-full overflow-hidden rounded-full bg-surface-100", className)}>
      <div
        className={cn("h-full rounded-full bg-brand-600 transition-all", colorClassName)}
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}
