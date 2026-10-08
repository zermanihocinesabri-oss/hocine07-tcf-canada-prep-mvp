import { cn } from "@/lib/utils/scoring";
import { HTMLAttributes } from "react";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-surface-200 bg-white p-5 shadow-card",
        className
      )}
      {...props}
    />
  );
}
