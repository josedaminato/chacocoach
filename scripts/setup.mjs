#!/usr/bin/env node

import * as readline from "readline";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

function ask(rl, question, defaultVal = "") {
  const suffix = defaultVal ? ` (${defaultVal})` : "";
  return new Promise((resolve) => {
    rl.question(`${question}${suffix}: `, (answer) => {
      resolve(answer.trim() || defaultVal);
    });
  });
}

function main() {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

  console.log("\n🏋️ Harbiz Trainer — Setup inicial\n");

  const answers = {};

  Promise.resolve()
    .then(() => ask(rl, "Nombre del trainer", "Juan Pérez"))
    .then((name) => {
      answers.name = name;
      return ask(rl, "Email", "juan@example.com");
    })
    .then((email) => {
      answers.email = email;
      return ask(rl, "URL de Harbiz (ej: https://app.harbiz.com/tu-usuario)", "https://app.harbiz.com/juanperez");
    })
    .then((harbizUrl) => {
      answers.harbizUrl = harbizUrl;
      return ask(rl, "Color primario (hex)", "#E8FF00");
    })
    .then((primary) => {
      answers.primary = primary;
      return ask(rl, "Color secundario (hex)", "#0A0A0A");
    })
    .then((secondary) => {
      answers.secondary = secondary;
      return ask(rl, "WhatsApp (ej: https://wa.me/5492614000000)", "https://wa.me/5492614000000");
    })
    .then((whatsapp) => {
      answers.whatsapp = whatsapp;
      return ask(rl, "Instagram (ej: https://instagram.com/tu-usuario)", "https://instagram.com/juanperez.fit");
    })
    .then((instagram) => {
      answers.instagram = instagram;
      return ask(rl, "Site URL (para SEO)", "https://ejemplo.com");
    })
    .then((siteUrl) => {
      answers.siteUrl = siteUrl;
      rl.close();

      const config = {
        name: answers.name,
        tagline: "Entrenador Personal Online",
        bio: "Entrenador certificado con más de 10 años de experiencia transformando vidas.",
        email: answers.email,
        phone: "+5492614000000",
        country: "Argentina",
        siteUrl: answers.siteUrl,
        harbizUrl: answers.harbizUrl,
        instagram: answers.instagram,
        instagramEmbedUrl: "",
        youtube: "",
        tiktok: "",
        whatsapp: answers.whatsapp,
        heroHeadline: "Transformá tu cuerpo. Cambiá tu vida.",
        heroSubheadline:
          "Entrenamiento online personalizado para alcanzar tus objetivos. Sin excusas, con resultados.",
        heroMedia: "/hero.jpg",
        ctaHeadline: "¿Listo para empezar?",
        ctaSubheadline: "Los cupos son limitados.",
        theme: {
          primary: answers.primary,
          secondary: answers.secondary,
          accent: "#FF4500",
          text: "#FFFFFF",
          fontDisplay: "Bebas Neue",
          fontBody: "DM Sans",
        },
      };

      const theme = `{
    primary: "${config.theme.primary}",
    secondary: "${config.theme.secondary}",
    accent: "#FF4500",
    text: "#FFFFFF",
    fontDisplay: "Bebas Neue",
    fontBody: "DM Sans",
  }`;

      const configContent = `/**
 * Configuración por defecto del trainer.
 * En producción con TRAINER_CONFIG en env, se usa esa config.
 * En desarrollo, se usa esta.
 */
export const defaultConfig = {
  name: "${config.name}",
  tagline: "Entrenador Personal Online",
  bio: "Entrenador certificado con más de 10 años de experiencia transformando vidas.",
  email: "${config.email}",
  phone: "+5492614000000",
  country: "Argentina",
  siteUrl: "${config.siteUrl}",
  harbizUrl: "${config.harbizUrl}",
  instagram: "${config.instagram}",
  instagramEmbedUrl: "",
  youtube: "",
  tiktok: "",
  whatsapp: "${config.whatsapp}",
  heroHeadline: "Transformá tu cuerpo. Cambiá tu vida.",
  heroSubheadline:
    "Entrenamiento online personalizado para alcanzar tus objetivos. Sin excusas, con resultados.",
  heroMedia: "/hero.jpg",
  ctaHeadline: "¿Listo para empezar?",
  ctaSubheadline: "Los cupos son limitados.",
  theme: ${theme},
} as const;

export type TrainerConfig = typeof defaultConfig;
`;

      const configPath = path.join(ROOT, "lib", "config.ts");
      fs.writeFileSync(configPath, configContent, "utf8");
      console.log("\n✅ lib/config.ts generado correctamente.\n");

      console.log("📋 Próximos pasos:\n");
      console.log("1. Sanity: Crear proyecto en https://sanity.io/manage");
      console.log("   - Agregar NEXT_PUBLIC_SANITY_PROJECT_ID y NEXT_PUBLIC_SANITY_DATASET a .env");
      console.log("   - Ejecutar 'npx sanity deploy' para desplegar el Studio\n");
      console.log("2. Resend: Crear cuenta en https://resend.com para emails de contacto");
      console.log("   - Agregar RESEND_API_KEY y RESEND_FROM_EMAIL a .env\n");
      console.log("3. Vercel: Conectar el repo y configurar variables de entorno");
      console.log("   - TRAINER_CONFIG (JSON del trainer para multi-tenant)");
      console.log("   - NEXT_PUBLIC_SITE_URL");
      console.log("   - STUDIO_PASSWORD (para proteger /studio)\n");
      console.log("4. Copiar .env.example a .env y completar los valores.\n");

      const openSanity = process.env.OPEN_BROWSER !== "0";
      if (openSanity && typeof process.stdout.write === "function") {
        console.log("¿Abrir sanity.io/manage en el navegador? (s/n)");
        const rl2 = readline.createInterface({ input: process.stdin, output: process.stdout });
        rl2.question("> ", (ans) => {
          rl2.close();
          if (ans.toLowerCase() === "s" || ans.toLowerCase() === "si") {
            import("child_process").then(({ exec }) => {
              const cmd = process.platform === "win32" ? "start" : "open";
              exec(`${cmd} https://sanity.io/manage`);
            });
          }
        });
      }
    })
    .catch((err) => {
      console.error(err);
      rl.close();
      process.exit(1);
    });
}

main();
