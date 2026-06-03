"use client";

import { useMemo, useState, useCallback } from "react";
import { motion } from "framer-motion";
import {
  type Sex,
  SKINFOLD_SITES,
  FORMULA_REFERENCE,
  ACSM_TABLE,
  calculateBodyFat,
  validateBodyFatInput,
} from "@/lib/bodyFatCalculator";
import { getWhatsAppHref } from "@/lib/whatsapp";
import { WHATSAPP_MESSAGES } from "@/lib/landing";

function parseNum(value: string): number | null {
  const trimmed = value.trim();
  if (trimmed === "") return null;
  const n = Number(trimmed);
  return Number.isFinite(n) ? n : null;
}

const inputClass =
  "w-full px-4 py-3 rounded-lg bg-white border border-slate-200 text-[var(--secondary)] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent";

export function BodyFatCalculator() {
  const [sex, setSex] = useState<Sex>("male");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [fold1, setFold1] = useState("");
  const [fold2, setFold2] = useState("");
  const [fold3, setFold3] = useState("");
  const [formulasOpen, setFormulasOpen] = useState(false);
  const [tableOpen, setTableOpen] = useState(false);

  const selectSex = useCallback((value: Sex) => {
    setSex(value);
    setFold1("");
    setFold2("");
    setFold3("");
  }, []);

  const sites = SKINFOLD_SITES[sex];
  const setters = [setFold1, setFold2, setFold3];
  const foldValues = [fold1, fold2, fold3];

  const parsed = useMemo(() => {
    const ageN = parseNum(age);
    const weightN = parseNum(weight);
    const f1 = parseNum(fold1);
    const f2 = parseNum(fold2);
    const f3 = parseNum(fold3);

    if (ageN === null || weightN === null || f1 === null || f2 === null || f3 === null) {
      return null;
    }

    return {
      sex,
      age: ageN,
      weightKg: weightN,
      skinfolds: { fold1: f1, fold2: f2, fold3: f3 },
    };
  }, [sex, age, weight, fold1, fold2, fold3]);

  const validation = useMemo(
    () => (parsed ? validateBodyFatInput(parsed) : null),
    [parsed]
  );

  const result = useMemo(
    () => (parsed && validation?.valid ? calculateBodyFat(parsed) : null),
    [parsed, validation]
  );

  const hasAnyInput =
    age !== "" || weight !== "" || fold1 !== "" || fold2 !== "" || fold3 !== "";

  const formula = FORMULA_REFERENCE[sex];

  return (
    <section
      id="calculadora-igc"
      className="py-20 md:py-28 bg-white text-[var(--secondary)]"
      aria-labelledby="igc-heading"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2
            id="igc-heading"
            className="font-display text-3xl md:text-5xl mb-3"
          >
            Calculadora de IGC
          </h2>
          <p className="text-[var(--color-muted)] text-base md:text-lg max-w-xl mx-auto">
            Estimá tu porcentaje de grasa corporal con la fórmula de Jackson &amp;
            Pollock (3 pliegues) y la conversión de Siri.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-slate-200 bg-[var(--color-surface)] p-6 md:p-8 shadow-sm"
        >
          <fieldset className="mb-8">
            <legend className="font-display text-lg mb-4 block w-full">
              Sexo biológico
            </legend>
            <div className="grid grid-cols-2 gap-3">
              {(
                [
                  { value: "male" as const, label: "Masculino" },
                  { value: "female" as const, label: "Femenino" },
                ] as const
              ).map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => selectSex(opt.value)}
                  className={`py-4 px-4 rounded-xl font-display text-lg uppercase tracking-wide transition-all border-2 ${
                    sex === opt.value
                      ? "border-[var(--primary)] bg-[var(--primary)] text-white shadow-md"
                      : "border-slate-200 bg-white text-[var(--secondary)] hover:border-[var(--primary)]/50"
                  }`}
                  aria-pressed={sex === opt.value}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            <p className="mt-3 text-sm text-[var(--color-muted)]">
              {sex === "male"
                ? "Pliegues: pecho, abdomen y muslo."
                : "Pliegues: tríceps, suprailiaco y muslo."}
            </p>
          </fieldset>

          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            <div>
              <label htmlFor="igc-age" className="block text-sm font-medium mb-1.5">
                Edad (años)
              </label>
              <input
                id="igc-age"
                type="number"
                inputMode="numeric"
                min={18}
                max={80}
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Ej. 28"
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="igc-weight" className="block text-sm font-medium mb-1.5">
                Peso (kg)
              </label>
              <input
                id="igc-weight"
                type="number"
                inputMode="decimal"
                min={30}
                max={250}
                step="0.1"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="Ej. 75"
                className={inputClass}
              />
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-display text-lg mb-4">Pliegues cutáneos (mm)</h3>
            <div className="grid gap-4">
              {sites.map((site, i) => (
                <div key={`${sex}-${site.key}`}>
                  <label
                    htmlFor={`igc-${sex}-${site.key}`}
                    className="block text-sm font-medium mb-1.5"
                  >
                    {site.label}
                  </label>
                  <input
                    id={`igc-${sex}-${site.key}`}
                    type="number"
                    inputMode="decimal"
                    min={1}
                    max={100}
                    step="0.5"
                    value={foldValues[i]}
                    onChange={(e) => setters[i](e.target.value)}
                    placeholder="mm"
                    className={inputClass}
                  />
                  <p className="mt-1 text-xs text-[var(--color-muted)]">{site.hint}</p>
                </div>
              ))}
            </div>
          </div>

          {validation && validation.warnings.length > 0 && (
            <div
              role="status"
              className="mb-4 p-4 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-sm space-y-1"
            >
              {validation.warnings.map((w) => (
                <p key={w}>{w}</p>
              ))}
            </div>
          )}

          {validation && validation.errors.length > 0 && hasAnyInput && (
            <div
              role="alert"
              className="mb-4 p-4 rounded-lg bg-red-50 border border-red-200 text-red-800 text-sm space-y-1"
            >
              {validation.errors.map((e) => (
                <p key={e}>{e}</p>
              ))}
            </div>
          )}

          {result && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-5 md:p-6 rounded-xl bg-[var(--secondary)] text-white"
              aria-live="polite"
            >
              <p className="text-sm text-white/70 mb-1">Tu resultado estimado</p>
              <p className="font-display text-4xl md:text-5xl text-[var(--primary)] mb-4">
                {result.fatPercent}%
                <span className="text-lg text-white/80 font-body ml-2">
                  grasa corporal
                </span>
              </p>
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div className="p-3 rounded-lg bg-white/10">
                  <p className="text-xs text-white/60 uppercase tracking-wider">
                    Masa grasa
                  </p>
                  <p className="text-xl font-semibold">{result.fatMassKg} kg</p>
                </div>
                <div className="p-3 rounded-lg bg-white/10">
                  <p className="text-xs text-white/60 uppercase tracking-wider">
                    Masa libre de grasa (MLG)
                  </p>
                  <p className="text-xl font-semibold">{result.leanMassKg} kg</p>
                </div>
              </div>
              <p className="text-sm">
                Categoría ACSM:{" "}
                <span className="font-semibold text-[var(--primary)]">
                  {result.category}
                </span>
                <span className="text-white/60">
                  {" "}
                  ({sex === "male" ? "hombres" : "mujeres"})
                </span>
              </p>
            </motion.div>
          )}

          <p className="text-xs text-[var(--color-muted)] leading-relaxed mb-6">
            Referencia orientativa. Los valores óptimos varían según deporte, edad y
            objetivo. Interpretación a cargo del profesional.
          </p>

          <details
            open={formulasOpen}
            onToggle={(e) => setFormulasOpen(e.currentTarget.open)}
            className="mb-3 group"
          >
            <summary className="cursor-pointer text-sm font-medium text-[var(--primary)] hover:underline list-none flex items-center gap-2">
              <span className="transition-transform group-open:rotate-90">▶</span>
              Ver fórmulas utilizadas
            </summary>
            <div className="mt-3 p-4 rounded-lg bg-white border border-slate-200 text-sm font-mono space-y-2 text-[var(--secondary)]">
              <p className="font-sans font-semibold text-base font-display">
                {FORMULA_REFERENCE.title}
              </p>
              <p>{formula.sites}</p>
              <p>{formula.density}</p>
              <p>{FORMULA_REFERENCE.siri}</p>
            </div>
          </details>

          <details
            open={tableOpen}
            onToggle={(e) => setTableOpen(e.currentTarget.open)}
            className="mb-6 group"
          >
            <summary className="cursor-pointer text-sm font-medium text-[var(--primary)] hover:underline list-none flex items-center gap-2">
              <span className="transition-transform group-open:rotate-90">▶</span>
              Tabla de categorías ACSM
            </summary>
            <div className="mt-3 overflow-x-auto rounded-lg border border-slate-200 bg-white">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th className="px-4 py-2 font-display">Categoría</th>
                    <th className="px-4 py-2 font-display">Hombres</th>
                    <th className="px-4 py-2 font-display">Mujeres</th>
                  </tr>
                </thead>
                <tbody>
                  {ACSM_TABLE.male.map((row, i) => (
                    <tr key={row.category} className="border-b border-slate-100">
                      <td className="px-4 py-2 font-medium">{row.category}</td>
                      <td className="px-4 py-2">{row.range}</td>
                      <td className="px-4 py-2">{ACSM_TABLE.female[i].range}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </details>

          <a
            href={getWhatsAppHref(WHATSAPP_MESSAGES.general)}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center py-4 bg-[var(--primary)] text-white font-display font-bold text-lg uppercase rounded-lg hover:opacity-90 transition-opacity"
          >
            Consultar con el entrenador
          </a>
        </motion.div>
      </div>
    </section>
  );
}
