"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { AttemptRecord, ProgressState, Skill } from "@/lib/types";
import { useAuth } from "@/lib/utils/authStore";
import { migrateLegacyIfNeeded, userScopedKey } from "@/lib/utils/userStorage";
import { isProgressState, readJson } from "@/lib/utils/sanitize";

interface ProgressContextValue {
  state: ProgressState;
  isLessonCompleted: (lessonId: string) => boolean;
  completeLesson: (lessonId: string, lessonLabel: string, skill: Skill, scorePercent: number) => void;
  addAttempt: (
    attempt: Omit<AttemptRecord, "id" | "date">
  ) => void;
  clearProgress: () => void;
  /** % de leçons validées parmi le parcours complet (16 leçons) */
  globalProgressPercent: () => number;
  /** Moyenne par compétence sur les tentatives ; 0 si aucune */
  averageBySkill: () => Record<Skill, number>;
  /** Compétence la plus faible (= moyenne la plus basse), null si pas de donnée */
  weakestSkill: () => Skill | null;
  countAttempts: () => number;
}

const ProgressContext = createContext<ProgressContextValue | null>(null);

function uid(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

const EMPTY_STATE: ProgressState = { completedLessonIds: [], attempts: [] };

function readState(key: string): ProgressState {
  return readJson(key, isProgressState, EMPTY_STATE);
}

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const userId = user?.id ?? null;
  // Espace de stockage personnel : la progression est liée au compte connecté.
  const storageKey = userScopedKey("tcf-progress", userId);

  const [state, setState] = useState<ProgressState>(() => readState(storageKey));

  // À la connexion (changement de compte) : migration des données héritées
  // puis restauration automatique de l'avancement de l'utilisateur.
  useEffect(() => {
    if (userId) migrateLegacyIfNeeded(userId);
    if (userId === null) return; // jamais atteint (routes protégées), simple garde
    setState(readState(storageKey));
  }, [userId, storageKey]);

  useEffect(() => {
    if (!userId) return;
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(state));
    } catch {
      // localStorage indisponible (mode privé, quota) : on ignore silencieusement
    }
  }, [state, storageKey, userId]);

  const isLessonCompleted = useCallback(
    (lessonId: string) => state.completedLessonIds.includes(lessonId),
    [state.completedLessonIds]
  );

  const completeLesson = useCallback(
    (lessonId: string, lessonLabel: string, skill: Skill, scorePercent: number) => {
      setState((prev) => ({
        completedLessonIds: prev.completedLessonIds.includes(lessonId)
          ? prev.completedLessonIds
          : [...prev.completedLessonIds, lessonId],
        attempts: [
          {
            id: uid(),
            date: new Date().toISOString(),
            kind: "leçon",
            skill,
            label: lessonLabel,
            scorePercent,
          },
          ...prev.attempts,
        ],
      }));
    },
    []
  );

  const addAttempt = useCallback(
    (attempt: Omit<AttemptRecord, "id" | "date">) => {
      setState((prev) => ({
        ...prev,
        attempts: [
          { ...attempt, id: uid(), date: new Date().toISOString() },
          ...prev.attempts,
        ],
      }));
    },
    []
  );

  const clearProgress = useCallback(() => {
    setState(EMPTY_STATE);
  }, []);

  const globalProgressPercent = useCallback(
    () => (state.completedLessonIds.length / 16) * 100,
    [state.completedLessonIds]
  );

  const averageBySkill = useCallback(() => {
    const sums: Record<Skill, { total: number; count: number }> = {
      CO: { total: 0, count: 0 },
      CE: { total: 0, count: 0 },
      EE: { total: 0, count: 0 },
      EO: { total: 0, count: 0 },
    };
    for (const a of state.attempts) {
      sums[a.skill].total += a.scorePercent;
      sums[a.skill].count += 1;
    }
    const result = {} as Record<Skill, number>;
    (Object.keys(sums) as Skill[]).forEach((s) => {
      result[s] = sums[s].count > 0 ? Math.round(sums[s].total / sums[s].count) : 0;
    });
    return result;
  }, [state.attempts]);

  const weakestSkill = useCallback(() => {
    const averages = averageBySkill();
    let weakest: Skill | null = null;
    let best = Infinity; // convention : plus basse moyenne = point faible
    let hasData = false;
    (["CO", "CE", "EE", "EO"] as Skill[]).forEach((s) => {
      if (averages[s] > 0) {
        hasData = true;
        if (averages[s] < best) {
          best = averages[s];
          weakest = s;
        }
      }
    });
    return hasData ? weakest : null;
  }, [averageBySkill]);

  const countAttempts = useCallback(() => state.attempts.length, [state.attempts]);

  const value = useMemo<ProgressContextValue>(
    () => ({
      state,
      isLessonCompleted,
      completeLesson,
      addAttempt,
      clearProgress,
      globalProgressPercent,
      averageBySkill,
      weakestSkill,
      countAttempts,
    }),
    [
      state,
      isLessonCompleted,
      completeLesson,
      addAttempt,
      clearProgress,
      globalProgressPercent,
      averageBySkill,
      weakestSkill,
      countAttempts,
    ]
  );

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress(): ProgressContextValue {
  const ctx = useContext(ProgressContext);
  if (!ctx) {
    throw new Error("useProgress doit être utilisé dans <ProgressProvider>");
  }
  return ctx;
}