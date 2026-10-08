"use client";

import {
  AppUser,
  AttemptRecord,
  OralCriterionKey,
  OralMetrics,
  OralSimulationRecord,
  ProgressState,
  UserRole,
  UserSession,
} from "@/lib/types";

/**
 * Assainissement (sanitization) et validation rigoureuse des données
 * saisies par l'utilisateur et des données sorties du stockage local.
 *
 * L'app est 100 % client-side (pas de base SQL) : le risque d'injection
 * réside dans le chargement de JSON corrompus/manipulés et dans les valeurs
 * injectées dans des attributs HTML (URLs). React échappe déjà le texte ;
 * ce module ajoute une couche de défense à l'entrée du stockage.
 */

export const MAX_NAME_LENGTH = 100;
export const MAX_EMAIL_LENGTH = 254;
export const MAX_RECORDING_NAME_LENGTH = 60;
export const MAX_DRAFT_TEXT_LENGTH = 6000;

const CONTROL_CHARS = /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g;

/** Supprime les caractères de contrôle, normalise et limite la longueur. */
export function sanitizeText(
  value: unknown,
  max: number = MAX_NAME_LENGTH,
  multiline = false
): string {
  if (typeof value !== "string") return "";
  let out = value.replace(CONTROL_CHARS, "");
  if (!multiline) out = out.replace(/\r\n?/g, " ").replace(/\s+/g, " ").trim();
  else out = out.replace(/\r/g, "").trim();
  return out.slice(0, max);
}

/** Normalise une adresse e-mail (minuscules, sans espaces) ou renvoie "" si invalide. */
export function sanitizeEmail(value: unknown): string {
  if (typeof value !== "string") return "";
  const email = value.trim().toLowerCase().slice(0, MAX_EMAIL_LENGTH);
  return email;
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

// ---------------------------------------------------------------------------
// Lecture sécurisée du JSON de stockage
// ---------------------------------------------------------------------------

type Guard<T> = (value: unknown) => value is T;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isDateStr(value: unknown): boolean {
  return typeof value === "string" && !Number.isNaN(Date.parse(value));
}

export function isAttemptRecord(value: unknown): value is AttemptRecord {
  if (!isRecord(value)) return false;
  const kinds = ["leçon", "évaluation", "examen"];
  return (
    typeof value.id === "string" &&
    isDateStr(value.date) &&
    typeof value.kind === "string" &&
    kinds.includes(value.kind) &&
    typeof value.skill === "string" &&
    ["CO", "CE", "EE", "EO"].includes(value.skill) &&
    typeof value.label === "string" &&
    typeof value.scorePercent === "number" &&
    Number.isFinite(value.scorePercent) &&
    value.scorePercent >= 0 &&
    value.scorePercent <= 100
  );
}

export function isProgressState(value: unknown): value is ProgressState {
  if (!isRecord(value)) return false;
  return (
    Array.isArray(value.completedLessonIds) &&
    value.completedLessonIds.every((x) => typeof x === "string") &&
    Array.isArray(value.attempts) &&
    value.attempts.every(isAttemptRecord)
  );
}

export type StoredRecording = {
  id: string;
  name: string;
  createdAt: string;
  durationSeconds: number;
  dataUrl: string;
};

// ---------------------------------------------------------------------------
// Simulation orale (métriques mesurées + auto-évaluation)
// ---------------------------------------------------------------------------

const ORAL_CRITERION_KEYS: OralCriterionKey[] = [
  "task",
  "fluency",
  "cohesion",
  "lexicon",
  "grammar",
  "pronunciation",
];

function isFiniteNumber(value: unknown): boolean {
  return typeof value === "number" && Number.isFinite(value);
}

function isOralScores(value: unknown): value is Record<OralCriterionKey, number> {
  if (!isRecord(value)) return false;
  return ORAL_CRITERION_KEYS.every(
    (key) => isFiniteNumber(value[key]) && (value[key] as number) >= 1 && (value[key] as number) <= 5
  );
}

function isFilledPause(value: unknown): boolean {
  return (
    isRecord(value) &&
    typeof value.token === "string" &&
    isFiniteNumber(value.count) &&
    (value.count as number) >= 0
  );
}

function isLongPause(value: unknown): boolean {
  return (
    isRecord(value) &&
    isFiniteNumber(value.start) &&
    isFiniteNumber(value.end) &&
    isFiniteNumber(value.duration) &&
    (value.duration as number) >= 0
  );
}

export function isOralMetrics(value: unknown): value is OralMetrics {
  if (!isRecord(value)) return false;
  return (
    typeof value.transcript === "string" &&
    isFiniteNumber(value.wordCount) &&
    (value.wordCount as number) >= 0 &&
    isFiniteNumber(value.elapsedSeconds) &&
    (value.elapsedSeconds as number) >= 0 &&
    isFiniteNumber(value.speechSeconds) &&
    (value.speechSeconds as number) >= 0 &&
    isFiniteNumber(value.wordsPerMinute) &&
    (value.wordsPerMinute as number) >= 0 &&
    Array.isArray(value.filledPauses) &&
    (value.filledPauses as unknown[]).every(isFilledPause) &&
    Array.isArray(value.longPauses) &&
    (value.longPauses as unknown[]).every(isLongPause) &&
    isFiniteNumber(value.longestPauseSeconds) &&
    (value.longestPauseSeconds as number) >= 0 &&
    isFiniteNumber(value.repeatedWordCount) &&
    (value.repeatedWordCount as number) >= 0
  );
}

export function isOralSimulationRecord(value: unknown): value is OralSimulationRecord {
  if (!isRecord(value)) return false;
  if (typeof value.id !== "string" || typeof value.level !== "string" || !isDateStr(value.date)) {
    return false;
  }
  if (!["A1", "A2", "B1", "B2", "C1", "C2"].includes(value.level as string)) return false;
  if (!Array.isArray(value.tasks)) return false;
  const tasksValid = (value.tasks as unknown[]).every((t) => {
    if (!isRecord(t)) return false;
    if (![1, 2, 3].includes(t.taskNumber as number)) return false;
    return (
      typeof t.theme === "string" &&
      isOralMetrics(t.metrics) &&
      isOralScores(t.scores) &&
      isFiniteNumber(t.scores.fluency) &&
      isFiniteNumber(t.scores.task) &&
      isFiniteNumber(t.scores.cohesion) &&
      isFiniteNumber(t.scores.lexicon) &&
      isFiniteNumber(t.scores.grammar) &&
      isFiniteNumber(t.scores.pronunciation)
    );
  });
  if (!tasksValid) return false;
  return (
    isFiniteNumber(value.averageScorePercent) &&
    (value.averageScorePercent as number) >= 0 &&
    (value.averageScorePercent as number) <= 100 &&
    typeof value.nclc === "string" &&
    typeof value.cefr === "string"
  );
}

export function isOralSimulationRecordArray(
  value: unknown
): value is OralSimulationRecord[] {
  return Array.isArray(value) && value.every(isOralSimulationRecord);
}

/** N'accepter que des véritables fichiers audio locaux en data URL. */
export function isStoredRecording(value: unknown): value is StoredRecording {
  if (!isRecord(value)) return false;
  return (
    typeof value.id === "string" &&
    typeof value.name === "string" &&
    value.name.length <= MAX_RECORDING_NAME_LENGTH &&
    isDateStr(value.createdAt) &&
    typeof value.durationSeconds === "number" &&
    Number.isFinite(value.durationSeconds) &&
    value.durationSeconds >= 0 &&
    typeof value.dataUrl === "string" &&
    value.dataUrl.startsWith("data:audio")
  );
}

export function isStoredRecordingArray(value: unknown): value is StoredRecording[] {
  return Array.isArray(value) && value.every(isStoredRecording);
}

export type StoredDraft = {
  taskId: string;
  taskTitle: string;
  date: string;
  text: string;
};

export function isStoredDraft(value: unknown): value is StoredDraft {
  if (!isRecord(value)) return false;
  return (
    typeof value.taskId === "string" &&
    typeof value.taskTitle === "string" &&
    isDateStr(value.date) &&
    typeof value.text === "string" &&
    value.text.length <= MAX_DRAFT_TEXT_LENGTH
  );
}

export function isStoredDraftArray(value: unknown): value is StoredDraft[] {
  return Array.isArray(value) && value.every(isStoredDraft);
}

export function isUserRole(value: unknown): value is UserRole {
  return value === "admin" || value === "user";
}

export function isAppUser(value: unknown): value is AppUser {
  if (!isRecord(value)) return false;
  return (
    typeof value.id === "string" &&
    typeof value.name === "string" &&
    value.name.length <= MAX_NAME_LENGTH &&
    typeof value.email === "string" &&
    isValidEmail(value.email) &&
    isUserRole(value.role) &&
    typeof value.passwordSalt === "string" &&
    value.passwordSalt.length > 0 &&
    typeof value.passwordHash === "string" &&
    value.passwordHash.length > 0 &&
    isDateStr(value.createdAt) &&
    isDateStr(value.updatedAt) &&
    (value.hashAlgo === undefined ||
      value.hashAlgo === "pbkdf2" ||
      value.hashAlgo === "sha256")
  );
}

export function isAppUserArray(value: unknown): value is AppUser[] {
  return Array.isArray(value) && value.every(isAppUser);
}

export function isUserSession(value: unknown): value is UserSession {
  if (!isRecord(value)) return false;
  return (
    typeof value.token === "string" &&
    value.token.length >= 24 &&
    typeof value.userId === "string" &&
    isValidEmail(typeof value.email === "string" ? value.email : "") &&
    typeof value.name === "string" &&
    isUserRole(value.role) &&
    isDateStr(value.createdAt) &&
    isDateStr(value.expiresAt)
  );
}

export type SessionRegistry = Record<
  string,
  { token: string; createdAt: string; expiresAt: string }
>;

export function isSessionRegistry(value: unknown): value is SessionRegistry {
  if (!isRecord(value)) return false;
  return Object.values(value).every(
    (entry) =>
      isRecord(entry) &&
      typeof entry.token === "string" &&
      entry.token.length >= 24 &&
      isDateStr(entry.createdAt) &&
      isDateStr(entry.expiresAt)
  );
}

/** Analyse un JSON de façon tolérante : format invalide → fallback (jamais de crash). */
export function safeJsonParse<T>(raw: string | null, guard: Guard<T>, fallback: T): T {
  if (raw == null) return fallback;
  try {
    const parsed: unknown = JSON.parse(raw);
    return guard(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
}

/** Lit une clé localStorage avec garde de validation ; données corrompues → fallback. */
export function readJson<T>(key: string, guard: Guard<T>, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    return safeJsonParse(window.localStorage.getItem(key), guard, fallback);
  } catch {
    return fallback;
  }
}