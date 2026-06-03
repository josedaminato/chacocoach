import { trainerConfig } from "@/lib/getConfig";
import { WHATSAPP_MESSAGES } from "@/lib/landing";

const DEFAULT_MSG = WHATSAPP_MESSAGES.general;

export function getWhatsAppHref(message: string = DEFAULT_MSG): string {
  const base = trainerConfig.whatsapp;
  if (!base) return "#";
  const separator = base.includes("?") ? "&" : "?";
  return `${base}${separator}text=${encodeURIComponent(message)}`;
}
