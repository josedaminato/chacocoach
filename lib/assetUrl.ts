/**
 * Prefija rutas de public/ con basePath en GitHub Pages (/chacocoach).
 */
export function assetUrl(path: string): string {
  if (!path || path.startsWith("http")) return path;
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
