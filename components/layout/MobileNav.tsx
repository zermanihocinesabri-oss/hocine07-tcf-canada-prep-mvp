"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Timer, Map, BookOpenText, PenLine, ShieldCheck, Library, Tags } from "lucide-react";
import { cn } from "@/lib/utils/scoring";
import { useAuth } from "@/lib/utils/authStore";

export function MobileNav() {
  const pathname = usePathname();
  const { user } = useAuth();

  const items = [
    { href: "/dashboard", label: "Accueil", icon: LayoutDashboard },
    { href: "/parcours", label: "Parcours", icon: Map },
    { href: "/grammaire", label: "Gram.", icon: Library },
    { href: "/vocabulaire", label: "Vocab.", icon: Tags },
    { href: "/evaluations", label: "Évals", icon: Timer },
    { href: "/entrainement/comprehension-ecrite", label: "CE", icon: BookOpenText },
    { href: "/entrainement/expression-ecrite", label: "EE", icon: PenLine },
    ...(user?.role === "admin"
      ? [{ href: "/admin", label: "Admin", icon: ShieldCheck }]
      : []),
  ];
  return (
    <nav className="fixed inset-x-0 bottom-0 z-20 flex justify-around border-t border-surface-200 bg-white py-2 lg:hidden">
      {items.map((item) => {
        const active = pathname === item.href;
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col items-center gap-0.5 rounded-lg px-1.5 py-1 text-[10px] font-medium",
              active ? "text-brand-700" : "text-surface-500"
            )}
          >
            <Icon size={18} />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
