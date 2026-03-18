# Checklist pre-deploy

## Configuración

- [ ] `lib/config.ts` con datos reales del trainer
- [ ] `og-image.jpg` (1200x630) subida a `/public`
- [ ] Variables de entorno configuradas en Vercel

## Sanity

- [ ] Sanity dataset en "production"
- [ ] Documento trainer creado
- [ ] Planes creados con harbizUrl
- [ ] Servicios y howItWorks configurados

## Resend

- [ ] Dominio verificado en Resend
- [ ] RESEND_FROM_EMAIL configurado
- [ ] CONTACT_EMAIL configurado

## Opcional

- [ ] Google Analytics: NEXT_PUBLIC_GA_ID configurado
- [ ] Dominio personalizado en Vercel

## Verificación final

- [ ] Probar formulario de contacto en producción
- [ ] Verificar sitemap en `/sitemap.xml`
- [ ] Verificar robots en `/robots.txt`
- [ ] Test de velocidad en [PageSpeed Insights](https://pagespeed.web.dev/) (objetivo: 90+)
- [ ] Probar en mobile (375px) — sin overflow horizontal
- [ ] Todos los links de Harbiz abren en `target="_blank"` con `rel="noopener noreferrer"`
- [ ] Formulario muestra errores de validación correctamente
- [ ] Quiz: verificar que cada combinación de respuestas recomienda un plan
