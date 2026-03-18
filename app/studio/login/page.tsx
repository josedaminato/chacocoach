"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { trainerConfig } from "@/lib/getConfig";

export default function StudioLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") || "/studio";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/studio/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, from }),
      });
      const data = await res.json();

      if (res.ok) {
        router.push(from);
        router.refresh();
      } else {
        setError(data.error || "Contraseña incorrecta");
      }
    } catch {
      setError("Error de conexión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        backgroundColor: trainerConfig.theme.secondary,
        color: trainerConfig.theme.text,
      }}
    >
      <div className="w-full max-w-sm">
        <h1
          className="font-display text-3xl mb-2 text-center"
          style={{ color: trainerConfig.theme.primary }}
        >
          {trainerConfig.name}
        </h1>
        <p className="text-center text-white/70 mb-8">Panel de administración</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm mb-2 text-white/80">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
              required
              className="w-full px-4 py-3 rounded-lg border border-white/20 bg-white/5 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
              placeholder="Ingresá la contraseña"
            />
          </div>
          {error && (
            <p className="text-sm text-red-400">{error}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg font-display font-bold uppercase transition-opacity disabled:opacity-50"
            style={{
              backgroundColor: trainerConfig.theme.primary,
              color: trainerConfig.theme.secondary,
            }}
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}
