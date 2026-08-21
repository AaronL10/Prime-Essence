// Evita "open redirect": solo permite rutas internas que empiecen con "/",
// rechazando protocolos absolutos (https://...) y rutas "//host" que el
// navegador podría interpretar como un dominio externo.
export function sanitizeRedirect(path: string | null | undefined): string {
  if (!path) return "/";
  if (!path.startsWith("/") || path.startsWith("//") || path.includes("://")) {
    return "/";
  }
  return path;
}