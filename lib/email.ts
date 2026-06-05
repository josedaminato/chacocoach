import { trainerConfig } from "@/lib/getConfig";

const DEFAULT_SUBJECT = "Consulta - Chaco Coach";
const DEFAULT_BODY =
  "Hola Agustín, me interesa tu servicio de entrenamiento. Quisiera recibir más información.";

export function getMailtoHref(options?: {
  subject?: string;
  body?: string;
}): string {
  const email = trainerConfig.email;
  if (!email) return "#";

  const subject = encodeURIComponent(options?.subject ?? DEFAULT_SUBJECT);
  const body = encodeURIComponent(options?.body ?? DEFAULT_BODY);
  return `mailto:${email}?subject=${subject}&body=${body}`;
}
