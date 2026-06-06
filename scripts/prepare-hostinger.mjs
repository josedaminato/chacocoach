#!/usr/bin/env node
/**
 * Genera la carpeta lista para subir a Hostinger (public_html).
 * Uso: npm run prepare:hostinger
 * Opcional: NEXT_PUBLIC_SITE_URL=https://tudominio.com npm run prepare:hostinger
 */
import { execSync } from "node:child_process";
import { copyFileSync, cpSync, existsSync, rmSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://chacocoach.com";
const outDir = join(root, "out");
const uploadDir = join(root, "hostinger-upload");

console.log(`\nChaco Coach — build para Hostinger`);
console.log(`URL de producción: ${siteUrl}\n`);

execSync("npm run build:hostinger", {
  cwd: root,
  stdio: "inherit",
  env: {
    ...process.env,
    NEXT_PUBLIC_SITE_URL: siteUrl,
    NEXT_PUBLIC_STATIC_EXPORT: "1",
    NODE_OPTIONS: process.env.NODE_OPTIONS || "--max-old-space-size=4096",
  },
});

copyFileSync(join(root, "hostinger", ".htaccess"), join(outDir, ".htaccess"));

if (existsSync(uploadDir)) {
  rmSync(uploadDir, { recursive: true, force: true });
}
cpSync(outDir, uploadDir, { recursive: true });

const zipPath = join(root, "chacocoach-site.zip");
if (existsSync(zipPath)) rmSync(zipPath);

console.log("\n✓ Carpeta lista para subir:");
console.log(`  ${uploadDir}`);
console.log("\nOpción A — ZIP (más fácil en hPanel):");
console.log("  1. Subí chacocoach-site.zip a public_html");
console.log("  2. Click derecho → Extract");
console.log("  3. Mové el contenido a public_html (no la carpeta hostinger-upload)");
console.log("\nOpción B — FTP automático:");
console.log("  Configurá HOSTINGER_FTP_* y ejecutá: npm run deploy:hostinger");
console.log("\nGenerando ZIP...");

execSync(
  `powershell -NoProfile -Command "Compress-Archive -Path '${uploadDir.replace(/'/g, "''")}\\*' -DestinationPath '${zipPath.replace(/'/g, "''")}' -Force"`,
  { cwd: root, stdio: "inherit" }
);

console.log(`\n✓ ZIP creado: ${zipPath}\n`);
