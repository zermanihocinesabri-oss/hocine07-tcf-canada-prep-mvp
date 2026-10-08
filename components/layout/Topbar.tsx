"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { useAuth } from "@/lib/utils/authStore";

export function Topbar({ title }: { title: string }) {
  const { user, logout } = useAuth();
  const router = useRouter();
  const initials = (user?.name || user?.email || "TCF")
    .slice(0, 2)
    .toUpperCase();

  function handleLogout() {
    logout();
    router.replace("/login");
  }

  return (
    <header className="flex items-center justify-between border-b border-surface-200 bg-white px-4 py-4 lg:px-8">
      <h1 className="text-lg font-bold text-surface-900 lg:text-xl">{title}</h1>
      <div className="flex items-center gap-3">
        <div className="hidden items-center gap-2 sm:flex">
          <div className="text-right">
            <p className="text-sm font-semibold text-surface-900 leading-tight">
              {user?.name}
            </p>
            <p className="text-xs text-surface-500 leading-tight">
              {user?.role === "admin" ? "Administrateur" : "Utilisateur"}
            </p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          title="Se déconnecter"
          className="rounded-lg p-2 text-surface-500 transition-colors hover:bg-surface-100 hover:text-red-600"
        >
          <LogOut size={18} />
        </button>
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-600 text-sm font-semibold text-white">
          {initials}
        </div>
      </div>
    </header>
  );
}