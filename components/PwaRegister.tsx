"use client";

import { useEffect } from "react";

export function PwaRegister() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    if (!("serviceWorker" in navigator)) return;

    const register = () => {
      navigator.serviceWorker
        .register("/sw.js")
        .catch(() => {
          /* SW indisponible (HTTP, mode privé...) : on laisse l'app fonctionner sans */
        });
    };

    if (document.readyState === "complete") {
      register();
    } else {
      window.addEventListener("load", register);
    }
    return () => window.removeEventListener("load", register);
  }, []);

  return null;
}