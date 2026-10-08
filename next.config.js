/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === "production";

/**
 * Politique de sécurité du contenu (CSP).
 * - Production : blocage strict des scripts distants, objets, iframes, exfiltration
 *   (`frame-ancestors 'none'`, `object-src 'none'`, origines inlines fermées).
 *   NB : Next.js injecte des scripts bootstrap inlines → 'unsafe-inline' requis
 *   tant que l'app n'est pas migrée vers Next 16 (CSP par nonce).
 * - Dev : relâchée ('unsafe-eval', ws:) pour le hot-reload webpack.
 */
const contentSecurityPolicy = isProd
  ? [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob:",
      "font-src 'self' data:",
      "media-src 'self' blob: data:",
      "connect-src 'self' blob: data:",
      "worker-src 'self' blob:",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      "upgrade-insecure-requests",
    ].join("; ")
  : [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob:",
      "font-src 'self' data:",
      "media-src 'self' blob: data:",
      "connect-src 'self' blob: data: ws: wss:",
      "worker-src 'self' blob:",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
    ].join("; ");

const securityHeaders = [
  // Empêche le sniffing MIME et le plagiat de types de contenu.
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Interdit le chargement de l'app dans une iframe (anti clickjacking).
  { key: "X-Frame-Options", value: "DENY" },
  // Réfère uniquement l'origine pour les liens sortants.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Contrôle fin des fonctionnalités du navigateur (micro : autorisé pour l'EO).
  {
    key: "Permissions-Policy",
    value:
      "camera=(), microphone=(self), geolocation=(), payment=(), usb=(), screen-wake-lock=()",
  },
  // Isolement partiel contre les attaques cross-origin.
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  // HSTS : appliqué uniquement par le navigateur sur HTTPS (Vercel = HTTPS).
  { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
];

const nextConfig = {
  reactStrictMode: true,
  // Masque la signature du serveur (X-Powered-By).
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

module.exports = nextConfig;