#!/usr/bin/env node
/**
 * Sube hostinger-upload/ a public_html vía FTP.
 *
 * Variables de entorno (desde hPanel → Archivos → Cuentas FTP):
 *   HOSTINGER_FTP_HOST     (ej. ftp.chacocoach.com)
 *   HOSTINGER_FTP_USER     (ej. u123456789)
 *   HOSTINGER_FTP_PASSWORD
 *   HOSTINGER_FTP_REMOTE   (opcional, default: /public_html)
 */
import { Client } from "basic-ftp";
import { existsSync, readdirSync, statSync } from "node:fs";
import { join, dirname, relative } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const uploadDir = join(root, "hostinger-upload");

const host = process.env.HOSTINGER_FTP_HOST;
const user = process.env.HOSTINGER_FTP_USER;
const password = process.env.HOSTINGER_FTP_PASSWORD;
const remotePath = process.env.HOSTINGER_FTP_REMOTE || "/public_html";

if (!host || !user || !password) {
  console.error("\nFaltan credenciales FTP de Hostinger.\n");
  console.error("Obtenelas en hPanel → Archivos → Cuentas FTP\n");
  console.error("Luego ejecutá (PowerShell):");
  console.error('  $env:HOSTINGER_FTP_HOST="ftp.chacocoach.com"');
  console.error('  $env:HOSTINGER_FTP_USER="tu_usuario"');
  console.error('  $env:HOSTINGER_FTP_PASSWORD="tu_contraseña"');
  console.error("  npm run deploy:hostinger\n");
  process.exit(1);
}

if (!existsSync(uploadDir)) {
  console.error("\nNo existe hostinger-upload/. Corré primero: npm run prepare:hostinger\n");
  process.exit(1);
}

async function uploadDirectory(client, localDir, remoteDir) {
  await client.ensureDir(remoteDir);
  const entries = readdirSync(localDir, { withFileTypes: true });

  for (const entry of entries) {
    const localPath = join(localDir, entry.name);
    const remoteFile = `${remoteDir}/${entry.name}`.replace(/\/+/g, "/");

    if (entry.isDirectory()) {
      await uploadDirectory(client, localPath, remoteFile);
    } else {
      process.stdout.write(`  ↑ ${relative(uploadDir, localPath)}\n`);
      await client.uploadFrom(localPath, remoteFile);
    }
  }
}

const client = new Client(60000);
client.ftp.verbose = false;

try {
  console.log(`\nConectando a ${host}...`);
  await client.access({
    host,
    user,
    password,
    secure: false,
  });

  console.log(`Subiendo a ${remotePath}...\n`);
  await uploadDirectory(client, uploadDir, remotePath);

  console.log("\n✓ Sitio subido. Abrí https://chacocoach.com (Ctrl+Shift+R)\n");
} catch (error) {
  console.error("\nError FTP:", error.message);
  console.error("\nVerificá credenciales en hPanel → Archivos → Cuentas FTP");
  console.error("Si el dominio muestra 'Parked Domain', conectalo al hosting en hPanel → Sitios web.\n");
  process.exit(1);
} finally {
  client.close();
}
