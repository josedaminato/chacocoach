# Auditoría: Deploy a GitHub Pages

## Problema
La web se veía sin diseño (solo menú y texto plano). Los estilos CSS y JavaScript no cargaban.

## Causa raíz
1. **Jekyll ignora `_next/`**: GitHub Pages usa Jekyll por defecto. Jekyll ignora carpetas que empiezan con `_`, como `_next/` donde están los CSS y JS de Next.js.

2. **`.nojekyll` no se desplegaba**: El paquete `gh-pages` ignora archivos que empiezan con `.` (dotfiles) por defecto. Por eso `.nojekyll` nunca llegaba al branch `gh-pages`.

## Solución aplicada
Añadir `--nojekyll` al comando de deploy en `package.json`:

```json
"deploy": "npm run build:gh && gh-pages -d out --nojekyll"
```

Esto hace que `gh-pages` genere y suba automáticamente el archivo `.nojekyll`, indicando a GitHub Pages que no use Jekyll y sirva todos los archivos, incluida la carpeta `_next/`.

## Configuración actual (next.config.mjs)
- `output: "export"` – Export estático para hosting estático
- `basePath: "/chacocoach"` – Ruta base para el repo
- `assetPrefix: "https://josedaminato.github.io/chacocoach"` – URL absoluta para assets
- `images.unoptimized: true` – Imágenes sin API de optimización (no existe en static export)

## Verificación
1. `.nojekyll` debe estar en el root del branch `gh-pages` ✓
2. La carpeta `_next/` debe ser accesible en `https://josedaminato.github.io/chacocoach/_next/`
3. GitHub Pages puede tardar 1–2 minutos en actualizar tras cada deploy

## Comando para desplegar
```bash
npm run deploy
```
