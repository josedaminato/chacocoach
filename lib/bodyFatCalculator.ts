export type Sex = "male" | "female";

export interface SkinfoldInput {
  fold1: number;
  fold2: number;
  fold3: number;
}

export interface BodyFatInput {
  sex: Sex;
  age: number;
  weightKg: number;
  skinfolds: SkinfoldInput;
}

export interface BodyFatResult {
  sum3: number;
  density: number;
  fatPercent: number;
  fatMassKg: number;
  leanMassKg: number;
  category: string;
}

export interface ValidationState {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

const AGE_MIN = 18;
const AGE_MAX = 80;
const FOLD_MIN = 1;
const FOLD_MAX = 100;
const WEIGHT_MIN = 30;
const WEIGHT_MAX = 250;

/** Advertencia si el pliegue parece poco habitual en medición clínica (sigue siendo válido 1–100 mm). */
const FOLD_PHYSIO_WARN_LOW = 5;
const FOLD_PHYSIO_WARN_HIGH = 50;

export const SKINFOLD_SITES = {
  male: [
    { key: "fold1", label: "Pecho", hint: "Pliegue diagonal en línea media" },
    { key: "fold2", label: "Abdomen", hint: "Pliegue vertical, 2 cm al lado del ombligo" },
    { key: "fold3", label: "Muslo", hint: "Pliegue vertical en mitad del muslo anterior" },
  ],
  female: [
    { key: "fold1", label: "Tríceps", hint: "Pliegue vertical en mitad del brazo posterior" },
    { key: "fold2", label: "Suprailiaco", hint: "Pliegue oblicuo sobre cresta ilíaca" },
    { key: "fold3", label: "Muslo", hint: "Pliegue vertical en mitad del muslo anterior" },
  ],
} as const;

export function sumSkinfolds(s: SkinfoldInput): number {
  return s.fold1 + s.fold2 + s.fold3;
}

/** Densidad corporal — Jackson & Pollock (3 pliegues). */
export function bodyDensity(sex: Sex, sum3: number, age: number): number {
  if (sex === "male") {
    return (
      1.10938 -
      0.0008267 * sum3 +
      0.0000016 * sum3 * sum3 -
      0.0002574 * age
    );
  }
  return (
    1.099421 -
    0.0009929 * sum3 +
    0.0000023 * sum3 * sum3 -
    0.0001392 * age
  );
}

/** % grasa — ecuación de Siri (1956). */
export function siriFatPercent(density: number): number {
  return (4.95 / density - 4.5) * 100;
}

export function getAcsmCategory(fatPercent: number, sex: Sex): string {
  if (sex === "male") {
    if (fatPercent < 6) return "Esencial";
    if (fatPercent <= 13) return "Atlético";
    if (fatPercent <= 17) return "Fitness";
    if (fatPercent <= 24) return "Normal";
    if (fatPercent <= 31) return "Alto";
    return "Obesidad";
  }
  if (fatPercent < 12) return "Esencial";
  if (fatPercent <= 20) return "Atlético";
  if (fatPercent <= 24) return "Fitness";
  if (fatPercent <= 31) return "Normal";
  if (fatPercent <= 38) return "Alto";
  return "Obesidad";
}

export function validateBodyFatInput(input: BodyFatInput): ValidationState {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!Number.isFinite(input.age) || input.age < AGE_MIN || input.age > AGE_MAX) {
    errors.push(`La edad debe estar entre ${AGE_MIN} y ${AGE_MAX} años.`);
  }

  if (
    !Number.isFinite(input.weightKg) ||
    input.weightKg < WEIGHT_MIN ||
    input.weightKg > WEIGHT_MAX
  ) {
    errors.push(`El peso debe estar entre ${WEIGHT_MIN} y ${WEIGHT_MAX} kg.`);
  }

  const folds = [input.skinfolds.fold1, input.skinfolds.fold2, input.skinfolds.fold3];
  const labels =
    input.sex === "male"
      ? ["pecho", "abdomen", "muslo"]
      : ["tríceps", "suprailiaco", "muslo"];

  folds.forEach((f, i) => {
    if (!Number.isFinite(f)) {
      errors.push(`Completá el pliegue de ${labels[i]}.`);
    } else if (f < FOLD_MIN || f > FOLD_MAX) {
      errors.push(
        `El pliegue de ${labels[i]} debe estar entre ${FOLD_MIN} y ${FOLD_MAX} mm.`
      );
    } else if (f < FOLD_PHYSIO_WARN_LOW || f > FOLD_PHYSIO_WARN_HIGH) {
      warnings.push(
        `El pliegue de ${labels[i]} (${f} mm) parece fuera del rango habitual. Verificá la medición.`
      );
    }
  });

  return { valid: errors.length === 0, errors, warnings };
}

export function calculateBodyFat(input: BodyFatInput): BodyFatResult | null {
  const validation = validateBodyFatInput(input);
  if (!validation.valid) return null;

  const sum3 = sumSkinfolds(input.skinfolds);
  const density = bodyDensity(input.sex, sum3, input.age);

  if (density <= 0 || !Number.isFinite(density)) return null;

  const fatPercentRaw = siriFatPercent(density);
  if (!Number.isFinite(fatPercentRaw) || fatPercentRaw < 0 || fatPercentRaw > 70) {
    return null;
  }

  const fatPercent = Math.round(fatPercentRaw * 10) / 10;
  const fatMassKg = Math.round(((input.weightKg * fatPercent) / 100) * 10) / 10;
  const leanMassKg = Math.round((input.weightKg - fatMassKg) * 10) / 10;

  return {
    sum3,
    density,
    fatPercent,
    fatMassKg,
    leanMassKg,
    category: getAcsmCategory(fatPercent, input.sex),
  };
}

export const FORMULA_REFERENCE = {
  title: "Jackson & Pollock (3 pliegues) + Siri (1956)",
  male: {
    density:
      "DC = 1.10938 − (0.0008267 × Σ3) + (0.0000016 × Σ3²) − (0.0002574 × edad)",
    sites: "Σ3 = pecho + abdomen + muslo (mm)",
  },
  female: {
    density:
      "DC = 1.099421 − (0.0009929 × Σ3) + (0.0000023 × Σ3²) − (0.0001392 × edad)",
    sites: "Σ3 = tríceps + suprailiaco + muslo (mm)",
  },
  siri: "% Grasa = [(4.95 / DC) − 4.5] × 100",
} as const;

export const ACSM_TABLE = {
  male: [
    { category: "Esencial", range: "< 6%" },
    { category: "Atlético", range: "6–13%" },
    { category: "Fitness", range: "14–17%" },
    { category: "Normal", range: "18–24%" },
    { category: "Alto", range: "25–31%" },
    { category: "Obesidad", range: "> 32%" },
  ],
  female: [
    { category: "Esencial", range: "< 12%" },
    { category: "Atlético", range: "12–20%" },
    { category: "Fitness", range: "21–24%" },
    { category: "Normal", range: "25–31%" },
    { category: "Alto", range: "32–38%" },
    { category: "Obesidad", range: "> 39%" },
  ],
} as const;
