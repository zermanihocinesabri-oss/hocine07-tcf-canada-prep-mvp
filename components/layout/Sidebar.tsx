"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Headphones,
  BookOpenText,
  Mic,
  PenLine,
  Clock3,
  GraduationCap,
  Map,
  Timer,
  ShieldCheck,
  Library,
  Tags,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils/scoring";
import { useAuth } from "@/lib/utils/authStore";
import { useRouter } from "next/navigation";

const navItems = [
  { href: "/dashboard", label: "Tableau de bord", icon: LayoutDashboard },
  { href: "/parcours", label: "Parcours", icon: Map },
  { href: "/grammaire", label: "Grammaire", icon: Library },
  { href: "/vocabulaire", label: "Vocabulaire", icon: Tags },
  { href: "/evaluations", label: "Évaluations", icon: Timer },
  { href: "/entrainement/comprehension-orale", label: "Compréhension Orale", icon: Headphones },
  { href: "/entrainement/comprehension-ecrite", label: "Compréhension Écrite", icon: BookOpenText },
  { href: "/entrainement/expression-ecrite", label: "Expression Écrite", icon: PenLine },
  { href: "/entrainement/expression-orale", label: "Expression Orale", icon: Mic },
  { href: "/examen-blanc", label: "Examen Blanc", icon: Clock3 },
];

export function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const router = useRouter();

  const items = user?.role === "admin"
    ? [...navItems, { href: "/admin", label: "Administration", icon: ShieldCheck }]
    : navItems;

  function handleLogout() {
    logout();
    router.replace("/login");
  }

  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-surface-200 bg-white px-4 py-6 lg:flex">
      <div className="mb-8 flex items-center gap-2 px-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-white">
          <GraduationCap size={20} />
        </div>
        <div>
          <p className="text-sm font-bold text-surface-900">TCF Prep</p>
          <p className="text-xs text-surface-500">Préparation TCF Canada</p>
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-1">
        {items.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-brand-50 text-brand-700"
                  : "text-surface-600 hover:bg-surface-100 hover:text-surface-900"
              )}
            >
              <Icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-4 rounded-xl bg-surface-50 p-4 text-xs text-surface-500">
        Objectif : <span className="font-semibold text-surface-700">NCLC 9</span> dans les 4 épreuves
      </div>

      <div className="mt-3 flex items-center gap-3 rounded-xl border border-surface-200 p-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-600 text-xs font-bold text-white">
          {(user?.name || "TCF").slice(0, 2).toUpperCase()}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-surface-900">{user?.name}</p>
          <p className="truncate text-xs text-surface-500">{user?.email}</p>
        </div>
        <button
          onClick={handleLogout}
          title="Se déconnecter"
          className="rounded-lg p-1.5 text-surface-400 transition-colors hover:bg-surface-100 hover:text-red-600"
        >
          <LogOut size={16} />
        </button>
      </div>
    </aside>
  );
}
