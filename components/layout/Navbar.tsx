"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useScroll, useMotionValueEvent } from "framer-motion";
import { trainerConfig } from "@/lib/getConfig";

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/#about", label: "Sobre mí" },
  { href: "/#planes", label: "Planes" },
  { href: "/blog", label: "Blog" },
  { href: "/contacto", label: "Contacto" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isTransparent = !scrolled && pathname === "/";

  return (
    <motion.nav
      initial={false}
      animate={{
        backgroundColor: isTransparent
          ? "rgba(10, 10, 10, 0)"
          : "rgba(10, 10, 10, 0.95)",
        backdropFilter: isTransparent ? "blur(0px)" : "blur(12px)",
      }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-white/10"
      role="navigation"
      aria-label="Navegación principal"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link
            href="/"
            className="font-display text-xl md:text-2xl text-white"
          >
            {trainerConfig.name}
          </Link>
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : link.href === "/blog"
                    ? pathname.startsWith("/blog")
                    : link.href === "/contacto"
                      ? pathname === "/contacto"
                      : false;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`text-sm uppercase tracking-wider transition-colors ${
                      isActive
                        ? "text-[var(--primary)]"
                        : "text-white/80 hover:text-[var(--primary)]"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
            <li>
              <Link
                href={trainerConfig.harbizUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-[var(--primary)] text-[var(--secondary)] font-display font-bold text-sm uppercase hover:opacity-90 transition-opacity"
                aria-label="Empezá hoy en Harbiz"
              >
                Empezá hoy
              </Link>
            </li>
          </ul>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 text-white"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {open ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
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
            transition={{ duration: 0.3 }}
            className="md:hidden border-t border-white/10 bg-[var(--secondary)]/98"
          >
            <ul className="flex flex-col p-4 gap-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block text-white/80 hover:text-[var(--primary)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href={trainerConfig.harbizUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="block w-full text-center py-3 bg-[var(--primary)] text-[var(--secondary)] font-display font-bold uppercase"
                >
                  Empezá hoy
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
