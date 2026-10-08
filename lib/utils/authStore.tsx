"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { AppUser, UserRole } from "@/lib/types";
import {
  PBKDF2_ITERATIONS,
  hashPassword as deriveNewPassword,
  verifyPassword,
  randomTokenB64url,
} from "@/lib/utils/password";
import {
  evaluateLoginAttempt,
  recordLoginFailure,
  clearLoginFailures,
} from "@/lib/utils/rateLimit";
import {
  isAppUserArray,
  isSessionRegistry,
  isValidEmail,
  readJson,
  sanitizeEmail,
  sanitizeText,
  MAX_NAME_LENGTH,
  MAX_EMAIL_LENGTH,
  SessionRegistry,
} from "@/lib/utils/sanitize";

const USERS_KEY = "tcf-users";
const SESSIONS_KEY = "tcf-sessions"; // registre des sessions actives (révocables)
const LEGACY_SESSION_KEY = "tcf-session"; // ancien format mono-session
const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000; // 7 jours

export interface AuthResult {
  ok: boolean;
  error?: string;
  /** secondes restantes avant déblocage, si la tentative est bloquée */
  remainingSeconds?: number;
}

interface AuthContextValue {
  user: AppUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<AuthResult>;
  register: (
    name: string,
    email: string,
    password: string
  ) => Promise<AuthResult>;
  logout: () => void;
  users: AppUser[];
  createUserByAdmin: (
    name: string,
    email: string,
    password: string,
    role: UserRole
  ) => Promise<AuthResult>;
  updateUserByAdmin: (
    userId: string,
    data: { name?: string; email?: string; role?: UserRole }
  ) => Promise<AuthResult>;
  resetPasswordByAdmin: (
    userId: string,
    newPassword: string
  ) => Promise<AuthResult>;
  deleteUserByAdmin: (userId: string) => Promise<AuthResult>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

// ------------------------------ utilitaires ------------------------------

function uid(): string {
  return `${Date.now()}-${randomTokenB64url(16)}`;
}

export function validatePassword(password: string): string | null {
  if (password.length < 8) {
    return "Le mot de passe doit contenir au moins 8 caractères.";
  }
  if (!/[a-z]/.test(password) || !/[A-Z]/.test(password) || !/[0-9]/.test(password)) {
    return "Le mot de passe doit contenir une minuscule, une majuscule et un chiffre.";
  }
  return null;
}

export function validateEmail(email: string): string | null {
  const normalized = sanitizeEmail(email);
  if (!normalized || normalized.length > MAX_EMAIL_LENGTH) {
    return "Adresse e-mail invalide.";
  }
  if (!isValidEmail(normalized)) return "Adresse e-mail invalide.";
  return null;
}

// ------------------------------ stockage des comptes ------------------------------

function readUsers(): AppUser[] {
  return readJson(USERS_KEY, isAppUserArray, []);
}

function writeUsers(users: AppUser[]): void {
  try {
    window.localStorage.setItem(USERS_KEY, JSON.stringify(users));
  } catch {
    /* quota / mode privé : on ignore */
  }
}

// ------------------------------ sessions révocables ------------------------------

function readRegistry(): SessionRegistry {
  return readJson(SESSIONS_KEY, isSessionRegistry, {});
}

function writeRegistry(registry: SessionRegistry): void {
  try {
    window.localStorage.setItem(SESSIONS_KEY, JSON.stringify(registry));
  } catch {
    /* ignore */
  }
}

function revokeSession(userId: string): void {
  const registry = readRegistry();
  if (registry[userId]) {
    delete registry[userId];
    writeRegistry(registry);
  }
  try {
    window.localStorage.removeItem(LEGACY_SESSION_KEY);
  } catch {
    /* ignore */
  }
}

function openSession(userId: string): void {
  const token = randomTokenB64url(32);
  const createdAt = new Date().toISOString();
  const expiresAt = new Date(Date.now() + SESSION_DURATION_MS).toISOString();
  const registry = readRegistry();
  registry[userId] = { token, createdAt, expiresAt };
  writeRegistry(registry);
}

/**
 * Restaure la session active au chargement.
 * Gère le registre actuel ET la migration de l'ancien format mono-session.
 */
function readActiveSession(users: AppUser[]): AppUser | null {
  const registry = readRegistry();
  const nowTs = Date.now();

  // Purge des sessions expirées (si modifications, on persiste).
  let changed = false;
  let activeUser: AppUser | null = null;
  for (const [userId, entry] of Object.entries(registry)) {
    if (new Date(entry.expiresAt).getTime() <= nowTs) {
      delete registry[userId];
      changed = true;
      continue;
    }
    if (!activeUser) {
      activeUser = users.find((u) => u.id === userId) ?? null;
    }
  }
  if (changed) writeRegistry(registry);

  if (activeUser) {
    // Une session moderne existe : l'ancienne clé n'est plus utile.
    try {
      window.localStorage.removeItem(LEGACY_SESSION_KEY);
    } catch {
      /* ignore */
    }
    return activeUser;
  }

  // Migration de l'ancien format mono-session (avant ce durcissement).
  try {
    const raw = window.localStorage.getItem(LEGACY_SESSION_KEY);
    if (!raw) return null;
    const legacy = JSON.parse(raw) as Record<string, unknown>;
    if (
      legacy &&
      typeof legacy.token === "string" &&
      typeof legacy.userId === "string" &&
      typeof legacy.expiresAt === "string" &&
      new Date(legacy.expiresAt).getTime() > nowTs
    ) {
      const user = users.find((u) => u.id === legacy.userId) ?? null;
      if (user) {
        registry[user.id] = {
          token: legacy.token,
          createdAt:
            typeof legacy.createdAt === "string" ? legacy.createdAt : new Date().toISOString(),
          expiresAt: legacy.expiresAt,
        };
        writeRegistry(registry);
        window.localStorage.removeItem(LEGACY_SESSION_KEY);
        return user;
      }
    }
    window.localStorage.removeItem(LEGACY_SESSION_KEY);
  } catch {
    /* donnée illisible : on l'ignore */
  }
  return null;
}

// ------------------------------ comptes ------------------------------

async function createUserRecord(
  name: string,
  email: string,
  password: string,
  role: UserRole
): Promise<{ user?: AppUser; error?: string }> {
  const safeName = sanitizeText(name, MAX_NAME_LENGTH);
  const safeEmail = sanitizeEmail(email);
  const emailError = validateEmail(safeEmail);
  if (emailError) return { error: emailError };
  const passwordError = validatePassword(password);
  if (passwordError) return { error: passwordError };
  if (!safeName) return { error: "Le nom est requis." };

  const users = readUsers();
  if (users.some((u) => u.email === safeEmail)) {
    return { error: "Un compte existe déjà avec cette adresse e-mail." };
  }

  const { passwordHash, passwordSalt, iterations } = await deriveNewPassword(password);
  const now = new Date().toISOString();
  const user: AppUser = {
    id: uid(),
    name: safeName,
    email: safeEmail,
    role,
    passwordSalt,
    passwordHash,
    hashAlgo: "pbkdf2",
    hashIterations: iterations,
    createdAt: now,
    updatedAt: now,
  };
  writeUsers([...users, user]);
  return { user };
}

async function verifyLogin(
  email: string,
  password: string
): Promise<{ user?: AppUser; error?: string; upgraded?: boolean }> {
  const safeEmail = sanitizeEmail(email);
  if (!safeEmail) return { error: "Identifiants incorrects." };

  const users = readUsers();
  const user = users.find((u) => u.email === safeEmail);
  if (!user) return { error: "Identifiants incorrects." };

  const algo = user.hashAlgo ?? "sha256";
  const ok = await verifyPassword(
    password,
    user.passwordSalt,
    user.passwordHash,
    algo,
    user.hashIterations ?? PBKDF2_ITERATIONS
  );
  if (!ok) return { error: "Identifiants incorrects." };

  // Migration automatique des anciens hachages SHA-256 vers PBKDF2.
  let upgraded = false;
  if (algo === "sha256") {
    const rehashed = await deriveNewPassword(password);
    user.passwordSalt = rehashed.passwordSalt;
    user.passwordHash = rehashed.passwordHash;
    user.hashAlgo = "pbkdf2";
    user.hashIterations = rehashed.iterations;
    user.updatedAt = new Date().toISOString();
    writeUsers(users);
    upgraded = true;
  }
  return { user, upgraded };
}

// ------------------------------ provider ------------------------------

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [users, setUsers] = useState<AppUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      let stored = readUsers();
      if (stored.length === 0) {
        // Premier lancement : compte administrateur par défaut (haché en PBKDF2).
        const created = await createUserRecord(
          "Administrateur",
          "admin@tcf.local",
          "Admin123!",
          "admin"
        );
        if (created.user) stored = [created.user];
      }
      setUsers(stored);
      setUser(readActiveSession(stored));
      setLoading(false);
    })();
  }, []);

  const login = useCallback(
    async (email: string, password: string): Promise<AuthResult> => {
      const safeEmail = sanitizeEmail(email);
      if (!safeEmail || !password) {
        return { ok: false, error: "Renseignez votre e-mail et votre mot de passe." };
      }

      // Anti force brute : vérification AVANT toute vérification de mot de passe.
      const gate = evaluateLoginAttempt(safeEmail);
      if (!gate.allowed) {
        return {
          ok: false,
          error: `Trop de tentatives échouées. Réessayez dans ${Math.ceil(
            gate.lockedSeconds / 60
          )} min.`,
          remainingSeconds: gate.lockedSeconds,
        };
      }

      const { user: found, error } = await verifyLogin(safeEmail, password);
      if (error || !found) {
        recordLoginFailure(safeEmail);
        return { ok: false, error: error ?? "Identifiants incorrects." };
      }

      clearLoginFailures(safeEmail);
      openSession(found.id); // rotation du jeton : l'ancienne session est révoquée
      setUser(found);
      setUsers(readUsers());
      return { ok: true };
    },
    []
  );

  const register = useCallback(
    async (name: string, email: string, password: string): Promise<AuthResult> => {
      const safeName = sanitizeText(name, MAX_NAME_LENGTH);
      const safeEmail = sanitizeEmail(email);
      const { user: created, error } = await createUserRecord(
        safeName,
        safeEmail,
        password,
        "user"
      );
      if (error || !created) {
        return { ok: false, error: error ?? "Inscription impossible." };
      }
      openSession(created.id);
      setUser(created);
      setUsers(readUsers());
      return { ok: true };
    },
    []
  );

  const logout = useCallback(() => {
    if (user) revokeSession(user.id);
    setUser(null);
    setUsers(readUsers());
  }, [user]);

  const createUserByAdmin = useCallback(
    async (name: string, email: string, password: string, role: UserRole) => {
      const { error } = await createUserRecord(name, email, password, role);
      if (error) return { ok: false, error };
      setUsers(readUsers());
      return { ok: true };
    },
    []
  );

  const updateUserByAdmin = useCallback(
    async (userId: string, data: { name?: string; email?: string; role?: UserRole }) => {
      const current = readUsers();
      const index = current.findIndex((u) => u.id === userId);
      if (index === -1) return { ok: false, error: "Compte introuvable." };

      const safeEmail = data.email !== undefined ? sanitizeEmail(data.email) : undefined;
      if (safeEmail !== undefined) {
        const emailError = validateEmail(safeEmail);
        if (emailError) return { ok: false, error: emailError };
        if (current.some((u) => u.email === safeEmail && u.id !== userId)) {
          return { ok: false, error: "Un compte utilise déjà cette adresse e-mail." };
        }
      }

      current[index] = {
        ...current[index],
        name:
          data.name !== undefined
            ? sanitizeText(data.name, MAX_NAME_LENGTH) || current[index].name
            : current[index].name,
        email: safeEmail ?? current[index].email,
        role: data.role ?? current[index].role,
        updatedAt: new Date().toISOString(),
      };
      writeUsers(current);
      setUsers(current);
      return { ok: true };
    },
    []
  );

  const resetPasswordByAdmin = useCallback(async (userId: string, newPassword: string) => {
    const passwordError = validatePassword(newPassword);
    if (passwordError) return { ok: false, error: passwordError };

    const current = readUsers();
    const index = current.findIndex((u) => u.id === userId);
    if (index === -1) return { ok: false, error: "Compte introuvable." };

    const { passwordHash, passwordSalt, iterations } = await deriveNewPassword(newPassword);
    current[index] = {
      ...current[index],
      passwordSalt,
      passwordHash,
      hashAlgo: "pbkdf2",
      hashIterations: iterations,
      updatedAt: new Date().toISOString(),
    };
    writeUsers(current);
    setUsers(current);
    // Révoque les sessions actives : l'utilisateur est forcé de se reconnecter.
    revokeSession(userId);
    return { ok: true };
  }, []);

  const deleteUserByAdmin = useCallback(async (userId: string) => {
    const current = readUsers();
    const target = current.find((u) => u.id === userId);
    if (!target) return { ok: false, error: "Compte introuvable." };
    if (target.role === "admin" && current.filter((u) => u.role === "admin").length <= 1) {
      return { ok: false, error: "Impossible de supprimer le dernier administrateur." };
    }
    writeUsers(current.filter((u) => u.id !== userId));
    revokeSession(userId);
    setUsers(readUsers());
    return { ok: true };
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      users,
      loading,
      login,
      register,
      logout,
      createUserByAdmin,
      updateUserByAdmin,
      resetPasswordByAdmin,
      deleteUserByAdmin,
    }),
    [
      user,
      users,
      loading,
      login,
      register,
      logout,
      createUserByAdmin,
      updateUserByAdmin,
      resetPasswordByAdmin,
      deleteUserByAdmin,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth doit être utilisé dans <AuthProvider>");
  return ctx;
}