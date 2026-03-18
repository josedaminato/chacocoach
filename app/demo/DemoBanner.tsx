"use client";

import Link from "next/link";

export function DemoBanner() {
  return (
    <div
      className="fixed top-0 left-0 right-0 z-[100] bg-[var(--primary)] text-[var(--secondary)] py-2 px-4 text-center text-sm font-medium"
      role="banner"
    >
      Esta es una demo. ¿Querés tu propia web?{" "}
      <Link
        href="/contacto"
        className="underline font-bold hover:opacity-80"
      >
        Contactanos →
      </Link>
    </div>
  );
}
