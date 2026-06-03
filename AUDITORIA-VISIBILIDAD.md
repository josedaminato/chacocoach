# Auditoría de visibilidad - Chaco Coach

**Fecha:** 18 de marzo de 2025  
**Problema reportado:** Imagen principal rota, menú y título no visibles. Solo se ve "Empezá hoy" e "Inicio".

---

## Hallazgos

### 1. Navbar (menú)
- **Problema:** El fondo era semi-transparente (`rgba(10,10,10,0.6)`) en la parte superior de la página, lo que hacía que el menú se confundiera con el hero.
- **En móvil:** El menú desplegable usaba `bg-[var(--secondary)]/98`, que podía verse demasiado transparente.

### 2. Título hero
- **Problema:** El título "Transformá tu cuerpo. Cambiá tu vida." podía perderse sobre la imagen de fondo si esta era clara o si había problemas de contraste.
- **Subtítulo:** Usaba `text-white/90`, lo que reducía la legibilidad.

### 3. Imagen hero
- **Problema:** La URL de Unsplash (`?w=1920`) podía no cargar correctamente en algunos entornos (hotlinking, CORS, etc.).
- **Sin fallback:** Si la imagen fallaba, se mostraba el icono de imagen rota.

---

## Correcciones aplicadas

### Navbar (`components/layout/Navbar.tsx`)
- Fondo fijo `rgba(10, 10, 10, 0.95)` para que el menú sea siempre visible.
- `style` inline para que el fondo se vea desde el primer render (antes de la hidratación).
- Menú móvil con fondo sólido `bg-[var(--secondary)]`.
- Sombra (`shadow-lg`) para separar el navbar del contenido.

### Hero (`components/sections/Hero.tsx`)
- **Título:** `text-shadow` para mejorar la legibilidad sobre cualquier fondo.
- **Subtítulo:** Cambio de `text-white/90` a `text-white` con sombra.
- **Imagen:** Handler `onError` para ocultar la imagen si falla y mostrar solo el fondo oscuro.

### Config (`lib/config.ts`)
- URL de Unsplash actualizada al formato recomendado: `?auto=format&fit=crop&w=1920&q=80`.

---

## Cómo desplegar

```bash
npm run deploy
```

O manualmente:

```bash
npm run build:gh
npx gh-pages -d out --nojekyll
```

---

## Si la imagen sigue rota

1. **Imagen local:** Colocá `hero.jpg` en `public/` y actualizá `lib/config.ts`:

   ```ts
   heroMedia: "/hero.jpg",
   ```

2. **Otra URL:** Probá con otra fuente (p. ej. Picsum: `https://picsum.photos/seed/fitness/1920/1080`).
