import { cn } from "@/lib/utils/scoring";
import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
}

export function Button({
  className,
  variant = "primary",
  size = "md",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50",
        variant === "primary" &&
          "bg-brand-600 text-white hover:bg-brand-700 shadow-sm",
        variant === "secondary" &&
          "bg-brand-50 text-brand-700 hover:bg-brand-100",
        variant === "ghost" && "bg-transparent text-surface-700 hover:bg-surface-100",
        variant === "danger" && "bg-red-50 text-red-600 hover:bg-red-100",
        size === "sm" && "px-3 py-1.5 text-sm",
        size === "md" && "px-4 py-2.5 text-sm",
        size === "lg" && "px-6 py-3 text-base",
        className
      )}
      {...props}
    />
  );
}
