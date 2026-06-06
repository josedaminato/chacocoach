# Deploy en Hostinger — Chaco Coach

La landing es **estática** (HTML + CSS + JS + imágenes + video). No necesitás Node.js en el servidor.

## Requisitos en Hostinger

- Plan con **hosting web** (shared hosting)
- Dominio apuntando a Hostinger (ej. `chacocoach.com`)
- **SSL** activado (HTTPS) en hPanel → SSL

## Paso 1 — Generar los archivos

En tu PC, dentro del proyecto:

```bash
npm install
npm run prepare:hostinger
```

Con tu dominio real (recomendado):

```bash
# Windows PowerShell
$env:NEXT_PUBLIC_SITE_URL="https://chacocoach.com"; npm run prepare:hostinger

# Mac / Linux
NEXT_PUBLIC_SITE_URL=https://chacocoach.com npm run prepare:hostinger
```

Eso crea la carpeta **`hostinger-upload/`** con todo listo para subir.

## Paso 2 — Subir a Hostinger

1. Entrá a **hPanel** → **Administrador de archivos**
2. Abrí la carpeta **`public_html`**
3. Borrá el contenido por defecto (`index.php`, etc.) si es un sitio nuevo
4. Subí **todo el contenido** de `hostinger-upload/` (no la carpeta en sí, sino lo que hay adentro):
   - `_next/`
   - `index.html`
   - `presentacion.mp4`
   - `hero-logo.png`, `hero.jpg`, imágenes, etc.
   - `.htaccess` (importante: activá “mostrar archivos ocultos” al subir)

**FTP alternativo:** FileZilla → host `ftp.tudominio.com`, usuario/contraseña de hPanel → carpeta `public_html`.

## Paso 3 — Verificar

- Abrí `https://tudominio.com`
- Recarga forzada: **Ctrl + Shift + R**
- Probá el menú (anclas a secciones), WhatsApp, video y mobile

## Configuración del sitio

Los datos del trainer (WhatsApp, Instagram, textos, video) están en **`lib/config.ts`**.

Antes de generar el build, revisá:

| Campo | Qué es |
|--------|--------|
| `siteUrl` | URL final (`https://chacocoach.com`) |
| `whatsapp` | Link de WhatsApp |
| `instagram` | Perfil de Instagram |
| `email` | Correo de contacto |
| `presentationVideoUrl` | Video en `/presentacion.mp4` |
| `phone` | Teléfono en formato internacional |

Después de cambiar algo: volvé a correr `npm run prepare:hostinger` y subí de nuevo los archivos.

## Qué funciona en Hostinger (estático)

| Funciona | Notas |
|----------|--------|
| Landing completa (home, secciones, menú) | ✓ |
| WhatsApp, Instagram, correo | ✓ |
| Video de presentación | ✓ (~32 MB, primera carga puede tardar) |
| Blog (contenido mock) | ✓ |
| Formulario `/contacto` | Abre tu cliente de correo con el mensaje |
| SEO (sitemap, robots, OG con hero) | ✓ |

| No disponible en hosting estático |
|-----------------------------------|
| Panel `/studio` (usar Sanity en la nube) |
| API de emails Resend |

## Actualizar el sitio

1. Editá el proyecto localmente
2. `npm run prepare:hostinger`
3. Subí de nuevo el contenido de `hostinger-upload/` a `public_html` (podés reemplazar todo)

## GitHub Pages vs Hostinger

| | GitHub Pages | Hostinger |
|--|--------------|-----------|
| Comando | `npm run build:gh` | `npm run prepare:hostinger` |
| URL ejemplo | `/chacocoach/` | `/` (raíz del dominio) |
| Carpeta a subir | rama `gh-pages` | `hostinger-upload/` → `public_html` |

Podés mantener ambos: GitHub para pruebas y Hostinger para el dominio oficial.

## Problemas frecuentes

**404 en rutas como `/planes` o `/blog`**  
→ Falta `.htaccess` en `public_html`. Volvé a subirlo desde `hostinger-upload/.htaccess`.

**Video no carga**  
→ Verificá que `presentacion.mp4` esté en `public_html` (~32 MB). La primera carga puede tardar.

**CSS roto**  
→ Subí la carpeta `_next/` completa. No subas solo `index.html`.

**Dominio muestra página de Hostinger**  
→ En hPanel → Dominios, apuntá el dominio al hosting correcto y esperá propagación DNS (hasta 24 h).
