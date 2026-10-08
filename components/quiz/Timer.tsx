"use client";

import { useEffect, useRef, useState } from "react";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils/scoring";

interface TimerProps {
  totalSeconds: number;
  isRunning: boolean;
  onExpire?: () => void;
  className?: string;
}

export function Timer({ totalSeconds, isRunning, onExpire, className }: TimerProps) {
  const [remaining, setRemaining] = useState(totalSeconds);
  const onExpireRef = useRef(onExpire);
  onExpireRef.current = onExpire;
  const expiredRef = useRef(false);
  const wasRunningRef = useRef(isRunning);

  useEffect(() => {
    setRemaining(totalSeconds);
    expiredRef.current = false;
  }, [totalSeconds]);

  useEffect(() => {
    if (!wasRunningRef.current && isRunning) {
      setRemaining(totalSeconds);
      expiredRef.current = false;
    }
    wasRunningRef.current = isRunning;
  }, [isRunning, totalSeconds]);

  useEffect(() => {
    if (!isRunning) return;
    if (remaining <= 0) {
      if (!expiredRef.current) {
        expiredRef.current = true;
        onExpireRef.current?.();
      }
      return;
    }
    const id = setTimeout(() => setRemaining((r) => r - 1), 1000);
    return () => clearTimeout(id);
  }, [isRunning, remaining]);

  const minutes = Math.floor(remaining / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (remaining % 60).toString().padStart(2, "0");
  const isLow = remaining <= 10;

  return (
    <div
      className={cn(
        "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-semibold",
        isLow ? "bg-red-50 text-red-600" : "bg-surface-100 text-surface-700",
        className
      )}
    >
      <Clock size={15} />
      {minutes}:{seconds}
    </div>
  );
}