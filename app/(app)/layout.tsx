import { Sidebar } from "@/components/layout/Sidebar";
import { MobileNav } from "@/components/layout/MobileNav";
import { ProtectedApp } from "@/components/auth/Guards";
import { ProgressProvider } from "@/lib/utils/progressStore";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedApp>
      <ProgressProvider>
        <div className="flex min-h-screen bg-surface-50">
          <Sidebar />
          <div className="flex-1 pb-20 lg:pb-0">{children}</div>
          <MobileNav />
        </div>
      </ProgressProvider>
    </ProtectedApp>
  );
}
