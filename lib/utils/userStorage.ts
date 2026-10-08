"use client";

/**
 * Stockage local scopé par identifiant d'utilisateur.
 * Toute donnée d'avancement (progression, enregistrements audio, brouillons)
 * est nommée « <base>:<userId> » afin que chaque compte ait son propre suivi.
 */

const LEGACY_KEYS = ["tcf-progress", "tcf-recordings", "tcf-writings"];

export function userScopedKey(base: string, userId: string | null): string {
  return userId ? `${base}:${userId}` : `${base}:anon`;
}

/**
 * Migration unique : si un compte possède des données « héritées » stockées
 * sous l'ancienne clé globale (avant l'authentification), on les copie dans
 * son espace personnel puis on supprime la clé globale.
 */
export function migrateLegacyIfNeeded(userId: string): void {
  if (typeof window === "undefined") return;
  for (const base of LEGACY_KEYS) {
    const scoped = `${base}:${userId}`;
    if (localStorage.getItem(scoped) == null) {
      const legacy = localStorage.getItem(base);
      if (legacy != null) {
        try {
          localStorage.setItem(scoped, legacy);
          localStorage.removeItem(base);
        } catch {
          /* quota : on laisse la clé globale en place */
        }
      }
    }
  }
}

/** Supprime toutes les données persistées d'un compte (utilisé à sa suppression). */
export function clearUserData(userId: string): void {
  if (typeof window === "undefined") return;
  for (const base of LEGACY_KEYS) {
    try {
      localStorage.removeItem(`${base}:${userId}`);
    } catch {
      /* ignore */
    }
  }
}