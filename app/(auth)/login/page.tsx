"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Info, Lock, Mail, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useAuth } from "@/lib/utils/authStore";
import { evaluateLoginAttempt } from "@/lib/utils/rateLimit";
import { sanitizeEmail } from "@/lib/utils/sanitize";

const inputClass =
  "w-full rounded-xl border border-surface-300 bg-white px-4 py-2.5 text-sm text-surface-900 placeholder:text-surface-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100";

function formatRemaining(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return m > 0 ? `${m} min ${s} s` : `${s} s`;
}

export default function LoginPage() {
  const router = useRouter();
  const { user, loading, users, login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [remaining, setRemaining] = useState<number>(0);
  const [submitting, setSubmitting] = useState(false);

    const showDefaultAdmin = false;

  // Déjà connecté ? On redirige (également utilisé après une connexion réussie).
  useEffect(() => {
    if (!loading && user) {
      router.replace(user.role === "admin" ? "/admin" : "/dashboard");
    }
  }, [loading, user, router]);

  // Vérification anti force brute en amont (l'état est recalculé par login()).
  const gate = evaluateLoginAttempt(email.trim().toLowerCase());

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setRemaining(0);

    const safeEmail = sanitizeEmail(email);
    if (!password) {
      setError("Renseignez votre adresse e-mail et votre mot de passe.");
      return;
    }
    if (!safeEmail) {
      setError("Adresse e-mail invalide.");
      return;
    }

    setSubmitting(true);
    const res = await login(safeEmail, password);
    setSubmitting(false);
    if (!res.ok) {
      setRemaining(res.remainingSeconds ?? 0);
      setError(res.error ?? "Identifiants incorrects.");
    }
  }

  return (
    <Card className="w-full max-w-md p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-surface-900">Connexion</h1>
        <p className="mt-1 text-sm text-surface-500">
          Retrouvez votre progression et vos résultats.
        </p>
      </div>

      {showDefaultAdmin && (
        <div className="mb-5 flex items-start gap-3 rounded-xl border border-brand-100 bg-brand-50 p-3 text-xs text-brand-800">
          <Info size={16} className="mt-0.5 shrink-0" />
          <p>
            Compte administrateur par défaut : connectez-vous avec{" "}
            <span className="font-semibold">admin@tcf.local</span> /{" "}
            <span className="font-semibold">Admin123!</span>. Changez son mot de passe
            ou supprimez-le depuis l'espace admin après connexion.
          </p>
        </div>
      )}

      {error && (
        <div
          className={
            remaining > 0
              ? "mb-5 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800"
              : "mb-5 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700"
          }
        >
          {remaining > 0 && <ShieldAlert size={16} className="mt-0.5 shrink-0" />}
          <span>
            {error}
            {remaining > 0 && (
              <span className="mt-1 block text-xs font-semibold">
                Réessayez dans {formatRemaining(remaining)}.
              </span>
            )}
          </span>
        </div>
      )}

      {!gate.allowed && (
        <div className="mb-5 flex items-start gap-3 rounded-xl border border-amber-300 bg-amber-100 p-3 text-sm text-amber-900">
          <ShieldAlert size={16} className="mt-0.5 shrink-0" />
          <span>
            Connexion temporairement bloquée (trop de tentatives).
            <br />
            Réessayez dans <b>{formatRemaining(gate.lockedSeconds)}</b>.
          </span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-surface-700">
            Adresse e-mail
          </label>
          <div className="relative">
            <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-surface-400" />
            <input
              id="email"
              type="email"
              autoComplete="email"
              maxLength={254}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="vous@exemple.ca"
              className={inputClass + " pl-10"}
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-surface-700">
            Mot de passe
          </label>
          <div className="relative">
            <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-surface-400" />
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              maxLength={128}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className={inputClass + " pl-10"}
            />
          </div>
        </div>

        <Button
          type="submit"
          size="lg"
          className="w-full"
          disabled={submitting || loading || !gate.allowed}
        >
          {submitting ? "Vérification…" : gate.allowed ? "Se connecter" : "Bloqué"}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-surface-500">
        Pas encore de compte ?{" "}
        <Link href="/register" className="font-semibold text-brand-600 hover:text-brand-700">
          Créer un compte
        </Link>
      </p>
    </Card>
  );
}