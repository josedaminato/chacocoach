# Harbiz Trainer Web

Template web reutilizable para personal trainers que usan Harbiz. Presencia profesional que capta leads y redirige a Harbiz para reservas y pagos.

Para lanzar una web nueva basta con ejecutar `npm run setup` o editar `lib/config.ts` y conectar un proyecto Sanity.

## Ver la web (GitHub Pages)

La web se despliega automáticamente en **https://josedaminato.github.io/chacocoach** al hacer push a `master`. Para activarlo: Settings → Pages → Source: **GitHub Actions**.

## Stack

- **Next.js 14** (App Router)
- **Tailwind CSS** + CSS Variables para theming
- **Sanity.io** (headless CMS)
- **Framer Motion** (animaciones)
- **React Hook Form** + **Resend** (formulario de contacto)
- **Vercel** (deploy)
- **Google Fonts** vía `next/font` (Bebas Neue, DM Sans)

## Requisitos previos

- Node.js 18+
- Cuenta en [Sanity.io](https://sanity.io)
- Cuenta en [Resend](https://resend.com) (emails)
- Cuenta en [Harbiz](https://harbiz.com) (links de reserva)
- Cuenta en [Vercel](https://vercel.com) (deploy)

## Setup paso a paso

### 1. Clonar e instalar

```bash
git clone <repo-url> mi-trainer-web
cd mi-trainer-web
npm install
```

### 2. Configurar el trainer

Ejecutar el setup interactivo:

```bash
npm run setup
```

O editar manualmente `lib/config.ts` con los datos reales.

### 3. Sanity

1. Crear proyecto en [sanity.io/manage](https://sanity.io/manage)
2. Copiar el **Project ID**
3. Crear `.env.local`:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=tu-project-id
NEXT_PUBLIC_SANITY_DATASET=production
```

4. Ejecutar `npm run studio` para abrir Sanity Studio
5. Crear documentos: trainer, planes, servicios, testimonios, transformaciones, posts

### 4. Resend (formulario de contacto)

1. Crear cuenta en [resend.com](https://resend.com)
2. Verificar dominio para producción
3. Agregar a `.env.local`:

```
RESEND_API_KEY=re_xxxxx
RESEND_FROM_EMAIL=noreply@tudominio.com
CONTACT_EMAIL=hola@tudominio.com
```

### 5. Variables de entorno

| Variable | Descripción |
|----------|-------------|
| `TRAINER_CONFIG` | JSON del trainer (multi-tenant). Si no se define, usa `lib/config.ts` |
| `NEXT_PUBLIC_SITE_URL` | URL del sitio (para SEO, sitemap, OG) |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | ID del proyecto Sanity |
| `NEXT_PUBLIC_SANITY_DATASET` | Dataset (production) |
| `NEXT_PUBLIC_SANITY_STUDIO_URL` | URL del Studio desplegado (opcional, si no se usa el default) |
| `STUDIO_PASSWORD` | Contraseña para proteger `/studio` |
| `RESEND_API_KEY` | API key de Resend |
| `RESEND_FROM_EMAIL` | Email de envío |
| `CONTACT_EMAIL` | Email de destino del formulario |
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4 (opcional) |

### 6. Deploy en Vercel

1. Conectar el repositorio a Vercel
2. Agregar todas las variables de entorno
3. Deploy
4. Configurar dominio personalizado en Settings → Domains

## Deploy para un nuevo trainer (multi-tenant)

El mismo repo se puede desplegar N veces en Vercel, una por trainer, sin tocar código:

1. **Fork** del repo (o usar como template en GitHub)
2. Crear **nuevo proyecto en Vercel** apuntando al repo
3. Agregar `TRAINER_CONFIG` como variable de entorno (JSON del trainer, ver ejemplo abajo)
4. Crear **proyecto nuevo en Sanity** y agregar `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`
5. Configurar `STUDIO_PASSWORD` para proteger el panel `/studio`
6. Deploy — web nueva lista

Ejemplo de `TRAINER_CONFIG` (JSON stringificado):

```json
{"name":"Martina García","tagline":"Transformá tu cuerpo en 90 días","email":"martina@ejemplo.com","harbizUrl":"https://app.harbiz.com/martina","whatsapp":"https://wa.me/5491112345678","theme":{"primary":"#E8FF00","secondary":"#0A0A0A"}}
```

## Demo pública

La ruta `/demo` muestra el template con datos ficticios atractivos (Martina García, planes en ARS, testimonios, etc.). Pensada para mostrar a trainers potenciales como portfolio.

- **Metadata**: noindex, nofollow (no se indexa en Google)
- **Banner**: "Esta es una demo. ¿Querés tu propia web? → Contactanos"
- Excluida del sitemap

## Personalizar para un nuevo trainer (desarrollo local)

1. Ejecutar `npm run setup` o editar `lib/config.ts` (nombre, Harbiz URLs, tema, redes)
2. Conectar un proyecto Sanity (nuevo o existente)
3. La OG image se genera dinámicamente en `/og` (nombre + tagline + colores del tema)
4. Deploy

## Estructura de carpetas

```
app/              — Páginas y rutas
  page.tsx        — Landing
  blog/           — Listado y posts
  planes/         — Planes + quiz
  contacto/       — Formulario
  api/contact/    — API del formulario
components/
  layout/         — Navbar, Footer
  sections/       — Hero, About, Plans, etc.
lib/
  config.ts       — Config central
  sanity.ts       — Fetch de datos
  sanity-queries.ts — Queries GROQ
  mockData.ts     — Datos para desarrollo sin Sanity
sanity/
  schemas/        — Modelos de Sanity
  lib/client.ts   — Cliente Sanity
styles/
  globals.css     — Variables CSS
```

## Agregar un nuevo schema de Sanity

1. Crear `sanity/schemas/mi-schema.ts`
2. Exportar en `sanity/schemas/index.ts`
3. Agregar query en `lib/sanity-queries.ts`
4. Crear función en `lib/sanity.ts`

## Troubleshooting

**Build falla con "Cannot find module 'sanity'"**  
→ Ejecutar `npm install` con `--legacy-peer-deps`

**Formulario no envía**  
→ Verificar RESEND_API_KEY y que el dominio esté verificado en Resend

**Imágenes de Sanity no cargan**  
→ Verificar NEXT_PUBLIC_SANITY_PROJECT_ID y que las imágenes estén en el dataset

**Mock data en producción**  
→ Configurar NEXT_PUBLIC_SANITY_PROJECT_ID con un ID válido
