import Link from "next/link";
import { GraduationCap } from "lucide-react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-brand-50 via-surface-50 to-surface-100 px-4 py-10">
      <Link href="/" className="mb-8 flex items-center gap-2.5">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-600 text-white shadow-card">
          <GraduationCap size={22} />
        </div>
        <div>
          <p className="text-lg font-bold text-surface-900">TCF Prep</p>
          <p className="text-xs text-surface-500">Préparation TCF Canada</p>
        </div>
      </Link>

      {children}

      <p className="mt-8 max-w-sm text-center text-xs leading-relaxed text-surface-400">
        Vos progrès, enregistrements audio et brouillons sont enregistrés localement
        sur cet appareil et liés à votre compte.
      </p>
    </div>
  );
}