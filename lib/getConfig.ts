import { defaultConfig } from "./config";
import type { TrainerConfig } from "./config";

/**
 * Lee la config del trainer desde variables de entorno en producción.
 * Fallback a lib/config.ts en desarrollo.
 * Permite deployar el mismo repo en Vercel N veces, una por trainer.
 */
export function getConfig(): TrainerConfig {
  const envConfig = process.env.TRAINER_CONFIG;
  if (envConfig) {
    try {
      const parsed = JSON.parse(envConfig) as Partial<TrainerConfig>;
      return deepMerge(defaultConfig, parsed) as TrainerConfig;
    } catch {
      return defaultConfig;
    }
  }
  return defaultConfig;
}

function deepMerge<T extends object>(base: T, override: Partial<T>): T {
  const result = { ...base };
  for (const key of Object.keys(override) as (keyof T)[]) {
    const val = override[key];
    if (val != null) {
      if (
        typeof val === "object" &&
        !Array.isArray(val) &&
        typeof (base as Record<string, unknown>)[key as string] === "object"
      ) {
        (result as Record<string, unknown>)[key as string] = deepMerge(
          (base as Record<string, unknown>)[key as string] as object,
          val as object
        );
      } else {
        (result as Record<string, unknown>)[key as string] = val;
      }
    }
  }
  return result;
}

export const trainerConfig = getConfig();
