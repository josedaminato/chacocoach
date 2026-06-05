"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { trainerConfig } from "@/lib/getConfig";
import { getWhatsAppHref } from "@/lib/whatsapp";
import { WHATSAPP_MESSAGES } from "@/lib/landing";
import { trackEvent } from "@/lib/analytics";
import { BrandLogo } from "@/components/layout/BrandLogo";

const navLinks = [
  { href: "/#presentacion", label: "Presentación" },
  { href: "/#about", label: "Sobre mí" },
  { href: "/#como-trabajo", label: "Cómo trabajo" },
  { href: "/#planificacion", label: "Planificación" },
  { href: "/#programa", label: "Programa" },
  { href: "/#transformaciones", label: "Resultados" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const whatsappHref = getWhatsAppHref(WHATSAPP_MESSAGES.general);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 shadow-lg backdrop-blur-md"
      style={{ backgroundColor: "rgba(15, 23, 42, 0.95)" }}
      role="navigation"
      aria-label="Navegación principal"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-18">
          <Link
            href="/"
            className="flex items-center shrink-0 rounded-md overflow-hidden ring-1 ring-white/10 hover:ring-[var(--primary)]/40 transition-shadow"
            aria-label={`${trainerConfig.name} — Inicio`}
          >
            <BrandLogo height={42} priority className="rounded-md" />
          </Link>
          <ul className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm uppercase tracking-wider text-white/80 hover:text-[var(--primary)] transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            {trainerConfig.instagram && (
              <li>
                <a
                  href={trainerConfig.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent("instagram_click", { location: "navbar" })}
                  className="text-sm uppercase tracking-wider text-white/80 hover:text-[var(--primary)] transition-colors"
                  aria-label={`Instagram ${trainerConfig.instagramHandle}`}
                >
                  {trainerConfig.instagramHandle}
                </a>
              </li>
            )}
            <li>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("whatsapp_click", { location: "navbar" })}
                className="px-5 py-2.5 bg-[var(--primary)] text-white font-display font-bold text-sm uppercase rounded-lg hover:opacity-90 transition-opacity"
                aria-label="Contactar por WhatsApp"
              >
                WhatsApp
              </a>
            </li>
          </ul>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 text-white"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden border-t border-white/10 bg-[var(--secondary)]"
          >
            <ul className="flex flex-col p-4 gap-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block py-2 text-white/90 hover:text-[var(--primary)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              {trainerConfig.instagram && (
                <li>
                  <a
                    href={trainerConfig.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                      trackEvent("instagram_click", { location: "navbar_mobile" });
                      setOpen(false);
                    }}
                    className="block py-2 text-[var(--primary)] font-medium"
                  >
                    {trainerConfig.instagramHandle}
                  </a>
                </li>
              )}
              <li className="pt-2">
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    trackEvent("whatsapp_click", { location: "navbar_mobile" });
                    setOpen(false);
                  }}
                  className="block w-full text-center py-3 bg-[var(--primary)] text-white font-display font-bold uppercase rounded-lg"
                >
                  WhatsApp
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
