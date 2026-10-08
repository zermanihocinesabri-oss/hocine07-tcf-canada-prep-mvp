"use client";

/**
 * Dérivation de clé mots de passe — PBKDF2-HMAC-SHA256 (recommandation OWASP).
 *
 * - Contexte sécurisé (HTTPS / localhost) : Web Crypto natif (très rapide, non bloquant).
 * - Contexte non sécurisé (LAN en HTTP, ex. iPhone 10.100.8.30:3000) : implémentation
 *   JavaScript pur, identique au niveau des octets produits.
 *
 * Les deux chemins produisent le MÊME résultat : un compte peut être créé dans un
 * contexte et vérifié dans l'autre, sans incompatibilité.
 */

export const PBKDF2_ITERATIONS = 210_000; // OWASP pour PBKDF2-HMAC-SHA256
export const SALT_BYTES = 16;
export const KEY_LENGTH_BYTES = 32;

export type HashAlgo = "pbkdf2" | "sha256";

// ---------------------------------------------------------------------------
// Utilitaires d'encodage
// ---------------------------------------------------------------------------

export function bytesToBase64(bytes: Uint8Array): string {
  let binary = "";
  bytes.forEach((b) => (binary += String.fromCharCode(b)));
  return btoa(binary);
}

export function base64ToBytes(value: string): Uint8Array {
  const binary = atob(value);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

/** Comparaison en temps constant (évite les oracles de timing). */
function constantTimeEqB64(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  const ab = base64ToBytes(a);
  const bb = base64ToBytes(b);
  if (ab.length !== bb.length) return false;
  let diff = 0;
  for (let i = 0; i < ab.length; i++) diff |= ab[i] ^ bb[i];
  return diff === 0;
}

/** 256 bits aléatoires (crypto.getRandomValues est autorisé en contexte non sécurisé). */
export function randomTokenB64url(byteLength = 32): string {
  const bytes = new Uint8Array(byteLength);
  if (typeof crypto !== "undefined") crypto.getRandomValues(bytes);
  else for (let i = 0; i < byteLength; i++) bytes[i] = Math.floor(Math.random() * 256);
  return btoa(String.fromCharCode(...Array.from(bytes)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

export function newSalt(): string {
  return bytesToBase64(crypto.getRandomValues(new Uint8Array(SALT_BYTES)));
}

// ---------------------------------------------------------------------------
// SHA-256 + HMAC + PBKDF2 en JavaScript pur (secours contexte non sécurisé)
// ---------------------------------------------------------------------------

const SHA256_K = new Uint32Array([
  0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
  0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
  0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
  0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
  0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
  0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
  0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
  0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2,
]);

function rotlXor(x: number, n: number): number {
  return (x >>> n) | (x << (32 - n));
}

export function sha256Bytes(bytes: Uint8Array): Uint8Array {
  const H = new Uint32Array([
    0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19,
  ]);
  const w = new Uint32Array(64);
  const len = bytes.length;
  const paddedLen = (((len + 8) >> 6) + 1) << 6;
  const padded = new Uint8Array(paddedLen);
  padded.set(bytes);
  padded[len] = 0x80;
  const view = new DataView(padded.buffer);
  view.setUint32(paddedLen - 8, Math.floor((len * 8) / 0x100000000));
  view.setUint32(paddedLen - 4, (len * 8) >>> 0);

  for (let off = 0; off < paddedLen; off += 64) {
    const wv = new DataView(padded.buffer, off, 64);
    for (let j = 0; j < 16; j++) w[j] = wv.getUint32(j * 4);
    for (let j = 16; j < 64; j++) {
      const s0 = rotlXor(w[j - 15], 7) ^ rotlXor(w[j - 15], 18) ^ (w[j - 15] >>> 3);
      const s1 = rotlXor(w[j - 2], 17) ^ rotlXor(w[j - 2], 19) ^ (w[j - 2] >>> 10);
      w[j] = (w[j - 16] + s0 + w[j - 7] + s1) >>> 0;
    }
    let a = H[0], b = H[1], c = H[2], d = H[3], e = H[4], f = H[5], g = H[6], h = H[7];
    for (let j = 0; j < 64; j++) {
      const S1 = rotlXor(e, 6) ^ rotlXor(e, 11) ^ rotlXor(e, 25);
      const ch = (e & f) ^ (~e & g);
      const t1 = (h + S1 + ch + SHA256_K[j] + w[j]) >>> 0;
      const S0 = rotlXor(a, 2) ^ rotlXor(a, 13) ^ rotlXor(a, 22);
      const maj = (a & b) ^ (a & c) ^ (b & c);
      const t2 = (S0 + maj) >>> 0;
      h = g; g = f; f = e; e = (d + t1) >>> 0;
      d = c; c = b; b = a; a = (t1 + t2) >>> 0;
    }
    H[0] = (H[0] + a) >>> 0; H[1] = (H[1] + b) >>> 0;
    H[2] = (H[2] + c) >>> 0; H[3] = (H[3] + d) >>> 0;
    H[4] = (H[4] + e) >>> 0; H[5] = (H[5] + f) >>> 0;
    H[6] = (H[6] + g) >>> 0; H[7] = (H[7] + h) >>> 0;
  }
  const out = new Uint8Array(32);
  const outView = new DataView(out.buffer);
  for (let i = 0; i < 8; i++) outView.setUint32(i * 4, H[i]);
  return out;
}

function hmacSha256(key: Uint8Array, message: Uint8Array): Uint8Array {
  const block = new Uint8Array(64);
  block.set(key.slice(0, 64), 0);
  const ipad = block.map((x) => x ^ 0x36);
  const opad = block.map((x) => x ^ 0x5c);
  const inner = new Uint8Array(64 + message.length);
  inner.set(ipad, 0);
  inner.set(message, 64);
  const h1 = sha256Bytes(inner);
  const outer = new Uint8Array(64 + h1.length);
  outer.set(opad, 0);
  outer.set(h1, 64);
  return sha256Bytes(outer);
}

function pbkdf2Sha256(
  passwordBytes: Uint8Array,
  saltBytes: Uint8Array,
  iterations: number,
  dkLen = KEY_LENGTH_BYTES
): Uint8Array {
  const blocks = Math.ceil(dkLen / 32);
  const out = new Uint8Array(blocks * 32);
  const saltBlock = new Uint8Array(saltBytes.length + 4);
  for (let bi = 1; bi <= blocks; bi++) {
    saltBlock.fill(0, saltBytes.length);
    saltBlock.set(saltBytes, 0);
    saltBlock[saltBytes.length] = (bi >>> 24) & 0xff;
    saltBlock[saltBytes.length + 1] = (bi >>> 16) & 0xff;
    saltBlock[saltBytes.length + 2] = (bi >>> 8) & 0xff;
    saltBlock[saltBytes.length + 3] = bi & 0xff;

    let u = hmacSha256(passwordBytes, saltBlock);
    const t = u.slice();
    for (let i = 1; i < iterations; i++) {
      u = hmacSha256(passwordBytes, u);
      for (let j = 0; j < 32; j++) t[j] ^= u[j];
    }
    out.set(t, (bi - 1) * 32);
  }
  return out.slice(0, dkLen);
}

// ---------------------------------------------------------------------------
// API publique
// ---------------------------------------------------------------------------

const encoder = new TextEncoder();

function hasWebCrypto(): boolean {
  return typeof crypto !== "undefined" && !!crypto.subtle;
}

async function deriveKey(
  password: string,
  saltBytes: Uint8Array,
  iterations: number,
  dkLen = KEY_LENGTH_BYTES
): Promise<Uint8Array> {
  const passwordBytes = encoder.encode(password);
  if (hasWebCrypto()) {
    const keyMaterial = await crypto.subtle.importKey(
      "raw",
      passwordBytes,
      "PBKDF2",
      false,
      ["deriveBits"]
    );
    const bits = await crypto.subtle.deriveBits(
      { name: "PBKDF2", salt: saltBytes, iterations, hash: "SHA-256" },
      keyMaterial,
      dkLen * 8
    );
    return new Uint8Array(bits);
  }
  return pbkdf2Sha256(passwordBytes, saltBytes, iterations, dkLen);
}

/** Hachage neuf en PBKDF2-HMAC-SHA256 (sel aléatoire de 128 bits). */
export async function hashPassword(
  password: string
): Promise<{ passwordHash: string; passwordSalt: string; iterations: number }> {
  const salt = newSalt();
  const derived = await deriveKey(password, base64ToBytes(salt), PBKDF2_ITERATIONS);
  return {
    passwordSalt: salt,
    passwordHash: bytesToBase64(derived),
    iterations: PBKDF2_ITERATIONS,
  };
}

/**
 * Vérifie un mot de passe. Gère :
 *  - algo "sha256" : ancien format (SHA-256(salt || password)), migration automatique
 *    vers PBKDF2 effectuée par l'appelant.
 *  - algo "pbkdf2" : format actuel.
 */
export async function verifyPassword(
  password: string,
  saltBase64: string,
  hashBase64: string,
  algo: HashAlgo,
  iterations = PBKDF2_ITERATIONS
): Promise<boolean> {
  if (algo === "sha256") {
    const salt = base64ToBytes(saltBase64);
    const pwBytes = encoder.encode(password);
    const merged = new Uint8Array(salt.length + pwBytes.length);
    merged.set(salt, 0);
    merged.set(pwBytes, salt.length);
    return constantTimeEqB64(bytesToBase64(sha256Bytes(merged)), hashBase64);
  }
  const derived = await deriveKey(password, base64ToBytes(saltBase64), iterations);
  return constantTimeEqB64(bytesToBase64(derived), hashBase64);
}