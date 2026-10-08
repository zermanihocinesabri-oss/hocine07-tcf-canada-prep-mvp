"use client";

import Link from "next/link";
import { AdminGuard } from "@/components/auth/Guards";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { useAuth } from "@/lib/utils/authStore";
import {
  Users,
  ShieldCheck,
  UserRound,
  CalendarDays,
  AlertTriangle,
  ArrowRight,
} from "lucide-react";

export default function AdminPage() {
  return (
    <AdminGuard>
      <AdminOverview />
    </AdminGuard>
  );
}

function AdminOverview() {
  const { user, users, loading } = useAuth();

  const admins = users.filter((u) => u.role === "admin");
  const members = users.filter((u) => u.role === "user");
  const recent = [...users]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 6);
    const defaultAdminStillActive = false;

  const stats = [
    {
      label: "Total des comptes",
      value: users.length,
      icon: Users,
      accent: "text-brand-600",
    },
    {
      label: "Administrateurs",
      value: admins.length,
      icon: ShieldCheck,
      accent: "text-violet-600",
    },
    {
      label: "Utilisateurs",
      value: members.length,
      icon: UserRound,
      accent: "text-emerald-600",
    },
  ];

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold text-surface-900 lg:text-2xl">Administration</h1>
          <p className="mt-1 text-sm text-surface-500">
            Gestion des comptes et vue d'ensemble de la plateforme.
          </p>
        </div>
        <Link
          href="/admin/users"
          className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-brand-700"
        >
          Gérer les comptes <ArrowRight size={16} />
        </Link>
      </div>

      {defaultAdminStillActive && (
        <div className="mb-6 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
          <AlertTriangle size={18} className="mt-0.5 shrink-0" />
          <p>
            Le compte administrateur par défaut est encore actif. Pour des raisons de sécurité, changez son mot de passe ou supprimez-le dans{" "}
            <Link href="/admin/users" className="font-semibold underline">Gérer les comptes</Link>.
          </p>
        </div>
      )}

      {!loading && users.length === 0 && (
        <p className="mb-6 text-sm text-surface-500">Aucun compte pour l'instant.</p>
      )}

      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <Card key={s.label} className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-surface-100">
                <Icon size={20} className={s.accent} />
              </div>
              <div>
                <p className="text-2xl font-bold text-surface-900">{s.value}</p>
                <p className="text-xs font-medium text-surface-500">{s.label}</p>
              </div>
            </Card>
          );
        })}
      </div>

      <Card className="overflow-hidden p-0">
        <div className="flex items-center justify-between border-b border-surface-200 px-6 py-4">
          <h2 className="font-semibold text-surface-900">Derniers comptes créés</h2>
          <Link
            href="/admin/users"
            className="text-sm font-semibold text-brand-600 hover:text-brand-700"
          >
            Tout voir
          </Link>
        </div>
        <div className="divide-y divide-surface-100">
          {recent.map((u) => (
            <div key={u.id} className="flex items-center justify-between px-6 py-3">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-50 text-xs font-bold text-brand-700">
                  {u.name.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-medium text-surface-900">{u.name}</p>
                  <p className="text-xs text-surface-500">{u.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge
                  className={
                    u.role === "admin"
                      ? "bg-brand-50 text-brand-700"
                      : "bg-surface-100 text-surface-600"
                  }
                >
                  {u.role === "admin" ? "Admin" : "Utilisateur"}
                </Badge>
                <span className="flex items-center gap-1 text-xs text-surface-400">
                  <CalendarDays size={12} />
                  {new Date(u.createdAt).toLocaleDateString("fr-CA")}
                </span>
              </div>
            </div>
          ))}
          {recent.length === 0 && (
            <p className="px-6 py-6 text-sm text-surface-400">Aucun compte créé.</p>
          )}
        </div>
      </Card>
    </div>
  );
}