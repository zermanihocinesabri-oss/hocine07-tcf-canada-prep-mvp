"use client";

import { AdminGuard } from "@/components/auth/Guards";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/lib/utils/authStore";
import { readUserProgress, clearUserData } from "@/lib/utils/userStorage";
import { AppUser, UserRole, ProgressState } from "@/lib/types";
import {
  KeyRound,
  Pencil,
  Plus,
  ShieldCheck,
  Trash2,
  UserRound,
  X,
  ChevronDown,
  ChevronUp,
  BookOpen,
  Trophy,
} from "lucide-react";
import { FormEvent, useEffect, useMemo, useState } from "react";

const inputClass =
  "w-full rounded-xl border border-surface-300 bg-white px-3.5 py-2 text-sm text-surface-900 placeholder:text-surface-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100";

export default function AdminUsersPage() {
  return (
    <AdminGuard>
      <UsersManager />
    </AdminGuard>
  );
}

function UsersManager() {
  const { users, user: self, createUserByAdmin, updateUserByAdmin, resetPasswordByAdmin, deleteUserByAdmin, logout } =
    useAuth();

  const [showCreate, setShowCreate] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [resettingId, setResettingId] = useState<string | null>(null);
  const [flash, setFlash] = useState<{ type: "ok" | "error"; message: string } | null>(null);

  // formulaire création
  const [createName, setCreateName] = useState("");
  const [createEmail, setCreateEmail] = useState("");
  const [createPassword, setCreatePassword] = useState("");
  const [createRole, setCreateRole] = useState<UserRole>("user");

  // formulaire édition
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editRole, setEditRole] = useState<UserRole>("user");

  // formulaire reset
  const [resetPassword, setResetPassword] = useState("");
  const [resetConfirm, setResetConfirm] = useState("");

  const notify = (type: "ok" | "error", message: string) => {
    setFlash({ type, message });
    setTimeout(() => setFlash(null), 4000);
  };

  function resetCreateForm() {
    setCreateName("");
    setCreateEmail("");
    setCreatePassword("");
    setCreateRole("user");
  }

  async function handleCreate(e: FormEvent) {
    e.preventDefault();
    const res = await createUserByAdmin(createName, createEmail, createPassword, createRole);
    if (!res.ok) {
      notify("error", res.error ?? "Création impossible.");
      return;
    }
    resetCreateForm();
    setShowCreate(false);
    notify("ok", "Compte créé avec succès.");
  }

  function startEdit(u: AppUser) {
    setEditingId(u.id);
    setEditName(u.name);
    setEditEmail(u.email);
    setEditRole(u.role);
  }

  async function handleEdit(e: FormEvent) {
    e.preventDefault();
    if (!editingId) return;
    const res = await updateUserByAdmin(editingId, {
      name: editName,
      email: editEmail,
      role: editRole,
    });
    if (!res.ok) {
      notify("error", res.error ?? "Mise à jour impossible.");
      return;
    }
    setEditingId(null);
    notify("ok", "Compte mis à jour.");
  }

  async function handleReset(e: FormEvent) {
    e.preventDefault();
    if (!resettingId) return;
    if (resetPassword !== resetConfirm) {
      notify("error", "Les deux mots de passe ne correspondent pas.");
      return;
    }
    const res = await resetPasswordByAdmin(resettingId, resetPassword);
    if (!res.ok) {
      notify("error", res.error ?? "Réinitialisation impossible.");
      return;
    }
    setResetPassword("");
    setResetConfirm("");
    setResettingId(null);
    notify("ok", "Mot de passe réinitialisé. L'utilisateur se reconnectera avec le nouveau.");
  }

  async function handleDelete(u: AppUser) {
    const label = u.name || u.email;
    if (!window.confirm(`Supprimer définitivement le compte « ${label} » ainsi que ses données de progression ?`)) {
      return;
    }
    const res = await deleteUserByAdmin(u.id);
    if (!res.ok) {
      notify("error", res.error ?? "Suppression impossible.");
      return;
    }
    clearUserData(u.id);
    if (self && u.id === self.id) {
      logout();
      return;
    }
    notify("ok", "Compte supprimé.");
  }

  const sorted = [...users].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [progressMap, setProgressMap] = useState<Record<string, ProgressState>>({});

  useEffect(() => {
    if (typeof window === "undefined") return;
    const map: Record<string, ProgressState> = {};
    for (const u of users) {
      map[u.id] = readUserProgress(u.id);
    }
    setProgressMap(map);
  }, [users]);

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold text-surface-900 lg:text-2xl">Gestion des comptes</h1>
          <p className="mt-1 text-sm text-surface-500">
            {users.length} compte{users.length > 1 ? "s" : ""} enregistré{users.length > 1 ? "s" : ""}.
          </p>
        </div>
        <Button onClick={() => setShowCreate((v) => !v)} size="md">
          {showCreate ? <X size={16} /> : <Plus size={16} />}
          {showCreate ? "Annuler" : "Créer un compte"}
        </Button>
      </div>

      {flash && (
        <div
          className={
            flash.type === "ok"
              ? "mb-5 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700"
              : "mb-5 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700"
          }
        >
          {flash.message}
        </div>
      )}

      {showCreate && (
        <Card className="mb-6">
          <h2 className="mb-4 font-semibold text-surface-900">Nouveau compte</h2>
          <form onSubmit={handleCreate} className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-surface-700">Nom complet</label>
              <input className={inputClass} value={createName} onChange={(e) => setCreateName(e.target.value)} placeholder="Marie Tremblay" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-surface-700">Adresse e-mail</label>
              <input type="email" className={inputClass} value={createEmail} onChange={(e) => setCreateEmail(e.target.value)} placeholder="vous@exemple.ca" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-surface-700">Mot de passe</label>
              <input type="text" className={inputClass} value={createPassword} onChange={(e) => setCreatePassword(e.target.value)} placeholder="min. 8, minuscule, majuscule, chiffre" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-surface-700">Rôle</label>
              <select className={inputClass} value={createRole} onChange={(e) => setCreateRole(e.target.value as UserRole)}>
                <option value="user">Utilisateur</option>
                <option value="admin">Administrateur</option>
              </select>
            </div>
            <div className="sm:col-span-2 flex justify-end">
              <Button type="submit">Créer le compte</Button>
            </div>
          </form>
        </Card>
      )}

      <div className="space-y-3">
        {sorted.map((u) => {
          const isSelf = self?.id === u.id;
          const isEditing = editingId === u.id;
          const isResetting = resettingId === u.id;
          return (
            <Card key={u.id} className="p-4">
              {isEditing ? (
                <form onSubmit={handleEdit} className="grid gap-3 sm:grid-cols-[1fr_1fr_auto_auto] sm:items-end">
                  <div>
                    <label className="mb-1 block text-xs font-medium text-surface-500">Nom</label>
                    <input className={inputClass} value={editName} onChange={(e) => setEditName(e.target.value)} />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-surface-500">E-mail</label>
                    <input type="email" className={inputClass} value={editEmail} onChange={(e) => setEditEmail(e.target.value)} />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-surface-500">Rôle</label>
                    <select className={inputClass} value={editRole} onChange={(e) => setEditRole(e.target.value as UserRole)}>
                      <option value="user">Utilisateur</option>
                      <option value="admin">Administrateur</option>
                    </select>
                  </div>
                  <div className="flex gap-2">
                    <Button type="submit" size="sm">Enregistrer</Button>
                    <Button type="button" variant="ghost" size="sm" onClick={() => setEditingId(null)}>Annuler</Button>
                  </div>
                </form>
              ) : isResetting ? (
                <form onSubmit={handleReset} className="grid gap-3 sm:grid-cols-[1fr_1fr_auto] sm:items-end">
                  <div>
                    <label className="mb-1 block text-xs font-medium text-surface-500">Nouveau mot de passe</label>
                    <input type="text" className={inputClass} value={resetPassword} onChange={(e) => setResetPassword(e.target.value)} placeholder="min. 8, minuscule, majuscule, chiffre" />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-surface-500">Confirmation</label>
                    <input type="text" className={inputClass} value={resetConfirm} onChange={(e) => setResetConfirm(e.target.value)} placeholder="Même mot de passe" />
                  </div>
                  <div className="flex gap-2">
                    <Button type="submit" size="sm">Valider</Button>
                    <Button type="button" variant="ghost" size="sm" onClick={() => { setResettingId(null); setResetPassword(""); setResetConfirm(""); }}>Annuler</Button>
                  </div>
                </form>
              ) : (
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-50 text-xs font-bold text-brand-700">
                      {u.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="truncate text-sm font-semibold text-surface-900">
                          {u.name}
                          {isSelf && <span className="ml-1 text-xs font-normal text-surface-400">(vous)</span>}
                        </p>
                        <Badge className={u.role === "admin" ? "bg-violet-50 text-violet-700" : "bg-surface-100 text-surface-600"}>
                          {u.role === "admin" ? <ShieldCheck size={11} className="mr-1" /> : <UserRound size={11} className="mr-1" />}
                          {u.role === "admin" ? "Admin" : "Utilisateur"}
                        </Badge>
                      </div>
                      <p className="truncate text-xs text-surface-500">
                        {u.email} · inscrit le {new Date(u.createdAt).toLocaleDateString("fr-CA")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Button variant="ghost" size="sm" onClick={() => startEdit(u)}>
                      <Pencil size={14} /> Modifier
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => { setResettingId(u.id); setResetPassword(""); setResetConfirm(""); }}>
                      <KeyRound size={14} /> Mot de passe
                    </Button>
                    <Button variant="danger" size="sm" onClick={() => handleDelete(u)} disabled={u.role === "admin" && users.filter((x) => x.role === "admin").length === 1}>
                      <Trash2 size={14} /> Supprimer
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          );
        })}
        {sorted.length === 0 && (
          <Card className="p-8 text-center text-sm text-surface-400">
            Aucun compte enregistré pour l'instant.
          </Card>
        )}
      </div>
    </div>
  );
}