"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { GraduationCap } from "lucide-react";
import { useAuth } from "@/lib/utils/authStore";

function Splash() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-surface-50">
      <div className="flex animate-pulse items-center gap-2 text-surface-400">
        <GraduationCap size={22} />
        <span className="text-sm font-semibold">Chargement de votre session…</span>
      </div>
    </div>
  );
}

/**
 * Garde globale des routes de l'espace app : redirige vers /login
 * si aucun utilisateur n'est connecté.
 */
export function ProtectedApp({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [loading, user, router]);

  if (loading) return <Splash />;
  if (!user) return null; // redirection en cours
  return <>{children}</>;
}

/**
 * Garde de l'espace administration : exige un compte admin,
 * sinon redirige vers /dashboard.
 */
export function AdminGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.replace("/login");
    } else if (user.role !== "admin") {
      router.replace("/dashboard");
    }
  }, [loading, user, router]);

  if (loading) return <Splash />;
  if (!user || user.role !== "admin") return null; // redirection en cours
  return <>{children}</>;
}