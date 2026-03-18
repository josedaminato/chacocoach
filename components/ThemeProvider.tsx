"use client";

import { trainerConfig } from "@/lib/getConfig";
import { useEffect } from "react";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--color-primary", trainerConfig.theme.primary);
    root.style.setProperty("--color-secondary", trainerConfig.theme.secondary);
    root.style.setProperty("--color-accent", trainerConfig.theme.accent);
    root.style.setProperty("--color-text", trainerConfig.theme.text);
    root.style.setProperty(
      "--font-display",
      `var(--font-bebas), sans-serif`
    );
    root.style.setProperty(
      "--font-body",
      `var(--font-dm), sans-serif`
    );
    root.style.setProperty("--primary", trainerConfig.theme.primary);
    root.style.setProperty("--secondary", trainerConfig.theme.secondary);
    root.style.setProperty("--accent", trainerConfig.theme.accent);
    root.style.setProperty("--text", trainerConfig.theme.text);
  }, []);

  return <>{children}</>;
}
