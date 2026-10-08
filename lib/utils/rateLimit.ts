"use client";

import { readJson } from "@/lib/utils/sanitize";

/**
 * Limitation de taux (rate limiting) côté client pour la page de connexion.
 *
 * Honnêteté : un verrouillage strictement côté navigateur est contournable
 * (purge du localStorage, autre appareil). Il protège néanmoins contre les
 * attaques de force brute naïves et sert de filet en attendant un vrai
 * backend (mise en place documentée dans la page de connexion).
 *
 * Stratégie : 5 échecs consécutifs → verrouillage 15 minutes ;
 * et plafond de 12 échecs par fenêtre glissante d'1 h par e-mail.
 */

const ATTEMPTS_KEY = "tcf-login-attempts";
const MAX_CONSECUTIVE_FAILS = 5;
const LOCK_MS = 15 * 60 * 1000; // reçoit 15 minutes
const WINDOW_MS = 60 * 60 * 1000; // fenêtre glissante d'1 h
const MAX_FAILS_PER_WINDOW = 12;

interface AttemptGate {
  expiresAt: number;
  fails: number;
  windowStart: number;
}

type AttemptMap = Record<string, AttemptGate>;

function isAttemptGate(value: unknown): value is AttemptGate {
  if (typeof value !== "object" || value === null || Array.isArray(value)) return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.expiresAt === "number" &&
    typeof v.fails === "number" &&
    typeof v.windowStart === "number" &&
    Number.isFinite(v.expiresAt) &&
    Number.isFinite(v.fails) &&
    Number.isFinite(v.windowStart)
  );
}

function readMap(): AttemptMap {
  return readJson<AttemptMap>(
    ATTEMPTS_KEY,
    (v): v is AttemptMap => {
      if (typeof v !== "object" || v === null || Array.isArray(v)) return false;
      return Object.entries(v).every(
        ([k, g]) => typeof k === "string" && isAttemptGate(g)
      );
    },
    {}
  );
}

function writeMap(map: AttemptMap): void {
  try {
    window.localStorage.setItem(ATTEMPTS_KEY, JSON.stringify(map));
  } catch {
    /* quota / privé : on ignore */
  }
}

export interface LoginGate {
  allowed: boolean;
  /** secondes restantes avant déblocage de la clé externe */
  lockedSeconds: number;
  fails: number;
}

function now(): number {
  return Date.now();
}

/** Évalue l'état du verrou pour un e-mail (à appeler AVANT chaque tentative). */
export function evaluateLoginAttempt(email: string): LoginGate {
  const map = readMap();
  const gate = map[email];
  if (!gate) return { allowed: true, lockedSeconds: 0, fails: 0 };

  const stillLocked = gate.expiresAt > now();
  const inWindow = gate.windowStart + WINDOW_MS > now();

  if (stillLocked) {
    return {
      allowed: false,
      lockedSeconds: Math.ceil((gate.expiresAt - now()) / 1000),
      fails: gate.fails,
    };
  }
  if (inWindow && gate.fails >= MAX_FAILS_PER_WINDOW) {
    return {
      allowed: false,
      lockedSeconds: Math.ceil((gate.windowStart + WINDOW_MS - now()) / 1000),
      fails: gate.fails,
    };
  }
  return { allowed: true, lockedSeconds: 0, fails: gate.fails };
}

/** Enregistre un échec de mot de passe (appelé après une vérification négative). */
export function recordLoginFailure(email: string): void {
  const t = now();
  const map = readMap();
  const prev = map[email];
  const fails = prev && prev.windowStart + WINDOW_MS > t ? prev.fails + 1 : 1;
  const expiresAt =
    fails >= MAX_CONSECUTIVE_FAILS ? t + LOCK_MS : prev && prev.expiresAt > t ? prev.expiresAt : 0;
  map[email] = {
    expiresAt,
    fails,
    windowStart: prev && prev.windowStart + WINDOW_MS > t ? prev.windowStart : t,
  };
  // Nettoyage : ne conserve que les clés encore actives.
  const entries = Object.entries(map).filter(
    ([, g]) => g.expiresAt > t || g.windowStart + WINDOW_MS > t
  );
  writeMap(Object.fromEntries(entries));
}

/** Réinitialise le compteur après une connexion réussie. */
export function clearLoginFailures(email: string): void {
  const map = readMap();
  delete map[email];
  writeMap(map);
}

export const RATE_LIMIT_CONSTANTS = {
  MAX_CONSECUTIVE_FAILS,
  LOCK_MS,
  WINDOW_MS,
  MAX_FAILS_PER_WINDOW,
};