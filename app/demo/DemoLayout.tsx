"use client";

import { useEffect } from "react";

interface DemoConfig {
  name: string;
  tagline: string;
  theme: {
    primary: string;
    secondary: string;
    accent: string;
    text: string;
  };
}

export function DemoLayout({
  children,
  config,
}: {
  children: React.ReactNode;
  config: DemoConfig;
}) {
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--primary", config.theme.primary);
    root.style.setProperty("--secondary", config.theme.secondary);
    root.style.setProperty("--accent", config.theme.accent);
    root.style.setProperty("--text", config.theme.text);
    root.style.setProperty("--color-primary", config.theme.primary);
    root.style.setProperty("--color-secondary", config.theme.secondary);
    root.style.setProperty("--color-accent", config.theme.accent);
    root.style.setProperty("--color-text", config.theme.text);
  }, [config.theme]);

  return <div className="pt-10">{children}</div>;
}
