"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, Mail, User } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useAuth, validateEmail, validatePassword } from "@/lib/utils/authStore";

const inputClass =
  "w-full rounded-xl border border-surface-300 bg-white px-4 py-2.5 text-sm text-surface-900 placeholder:text-surface-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100";

export default function RegisterPage() {
  const router = useRouter();
  const { user, loading, register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Déjà connecté ? On redirige vers le tableau de bord.
  useEffect(() => {
    if (!loading && user) {
      router.replace("/dashboard");
    }
  }, [loading, user, router]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError("Renseignez votre nom.");
      return;
    }
    const emailError = validateEmail(email);
    if (emailError) {
      setError(emailError);
      return;
    }
    const passwordError = validatePassword(password);
    if (passwordError) {
      setError(passwordError);
      return;
    }
    if (password !== confirm) {
      setError("Les deux mots de passe ne correspondent pas.");
      return;
    }

    setSubmitting(true);
    const res = await register(name, email, password);
    setSubmitting(false);
    if (!res.ok) setError(res.error ?? "Inscription impossible.");
  }

  return (
    <Card className="w-full max-w-md p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-surface-900">Créer un compte</h1>
        <p className="mt-1 text-sm text-surface-500">
          Votre progression sera sauvegardée sur cet appareil, liée à votre compte.
        </p>
      </div>

      {error && (
        <div className="mb-5 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-surface-700">
            Nom complet
          </label>
          <div className="relative">
            <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-surface-400" />
            <input
              id="name"
              type="text"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Marie Tremblay"
              maxLength={100}
              className={inputClass + " pl-10"}
            />
          </div>
        </div>

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
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="8+ caractères, minuscule, majuscule, chiffre"
              maxLength={128}
              className={inputClass + " pl-10"}
            />
          </div>
        </div>

        <div>
          <label htmlFor="confirm" className="mb-1.5 block text-sm font-medium text-surface-700">
            Confirmer le mot de passe
          </label>
          <div className="relative">
            <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-surface-400" />
            <input
              id="confirm"
              type="password"
              autoComplete="new-password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="••••••••"
              className={inputClass + " pl-10"}
            />
          </div>
        </div>

        <Button type="submit" size="lg" className="w-full" disabled={submitting || loading}>
          {submitting ? "Création…" : "Créer mon compte"}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-surface-500">
        Déjà inscrit ?{" "}
        <Link href="/login" className="font-semibold text-brand-600 hover:text-brand-700">
          Se connecter
        </Link>
      </p>
    </Card>
  );
}