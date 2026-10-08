import type { Metadata, Viewport } from "next";
import "./globals.css";
import { PwaRegister } from "@/components/PwaRegister";
import { AuthProvider } from "@/lib/utils/authStore";

export const metadata: Metadata = {
  title: "TCF Prep — Préparation TCF Canada",
  description:
    "Plateforme d'entraînement interactive pour préparer les 4 épreuves du TCF Canada.",
  manifest: "/manifest.json",
  applicationName: "TCF Prep",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "TCF Prep",
  },
  icons: {
    icon: [
      { url: "/icons/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icons/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#2563eb",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <AuthProvider>
          <PwaRegister />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}