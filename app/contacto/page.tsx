"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { trainerConfig } from "@/lib/getConfig";
import { trackEvent } from "@/lib/analytics";

const schema = z.object({
  name: z.string().min(2, "El nombre es requerido"),
  email: z.string().email("Email inválido"),
  phone: z.string().optional(),
  message: z.string().min(10, "El mensaje debe tener al menos 10 caracteres"),
  fitnessGoal: z.string().optional(),
  website: z.string().max(0).optional(), // honeypot
});

type FormData = z.infer<typeof schema>;

export default function ContactoPage() {
  const [status, setStatus] = useState<"idle" | "loading">("idle");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();

      if (res.ok) {
        trackEvent("contact_form_submitted");
        toast.success("¡Mensaje enviado! Te responderé pronto.");
        reset();
      } else {
        toast.error(json.error || "Hubo un error. Intentá de nuevo.");
      }
    } catch {
      toast.error("Hubo un error. Intentá de nuevo o contactame por WhatsApp.");
    } finally {
      setStatus("idle");
    }
  };

  return (
    <>
      <section className="pt-32 pb-16 bg-[var(--secondary)] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-4xl md:text-6xl mb-4">Contacto</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Escribime y te respondo a la brevedad
          </p>
        </div>
      </section>
      <section className="py-20 md:py-28">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <div className="absolute -left-[9999px] opacity-0" aria-hidden>
              <label htmlFor="website">Website</label>
              <input
                id="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                {...register("website")}
              />
            </div>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium mb-2 text-[var(--secondary)]"
              >
                Nombre
              </label>
              <input
                id="name"
                {...register("name")}
                className="w-full px-4 py-3 rounded-lg border border-[var(--secondary)]/20 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                placeholder="Tu nombre"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium mb-2 text-[var(--secondary)]"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                {...register("email")}
                className="w-full px-4 py-3 rounded-lg border border-[var(--secondary)]/20 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                placeholder="tu@email.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium mb-2 text-[var(--secondary)]"
              >
                Teléfono
              </label>
              <input
                id="phone"
                type="tel"
                {...register("phone")}
                className="w-full px-4 py-3 rounded-lg border border-[var(--secondary)]/20 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                placeholder="+54 9 11 1234-5678"
              />
            </div>
            <div>
              <label
                htmlFor="fitnessGoal"
                className="block text-sm font-medium mb-2 text-[var(--secondary)]"
              >
                Objetivo fitness
              </label>
              <select
                id="fitnessGoal"
                {...register("fitnessGoal")}
                className="w-full px-4 py-3 rounded-lg border border-[var(--secondary)]/20 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
              >
                <option value="">Seleccionar...</option>
                <option value="perder-peso">Bajar de peso</option>
                <option value="ganar-musculo">Ganar masa muscular</option>
                <option value="mejorar-condicion">Mejorar condición física</option>
                <option value="otro">Otro</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium mb-2 text-[var(--secondary)]"
              >
                Mensaje
              </label>
              <textarea
                id="message"
                {...register("message")}
                rows={5}
                className="w-full px-4 py-3 rounded-lg border border-[var(--secondary)]/20 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] resize-none"
                placeholder="¿En qué puedo ayudarte?"
              />
              {errors.message && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.message.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full py-4 bg-[var(--primary)] text-[var(--secondary)] font-display font-bold text-lg uppercase hover:opacity-90 disabled:opacity-50 transition-opacity flex items-center justify-center gap-2"
            >
              {status === "loading" ? (
                <>
                  <span
                    className="inline-block w-5 h-5 border-2 border-[var(--secondary)] border-t-transparent rounded-full animate-spin"
                    aria-hidden
                  />
                  Enviando...
                </>
              ) : (
                "Enviar mensaje"
              )}
            </button>
          </motion.form>
          <div className="mt-12 text-center space-y-4">
            <p className="text-[var(--secondary)]/70">
              O contactame directamente:
            </p>
            {trainerConfig.whatsapp && (
              <a
                href={trainerConfig.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                WhatsApp
              </a>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
