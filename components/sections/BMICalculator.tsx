"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { trainerConfig } from "@/lib/getConfig";

const BMI_CATEGORIES = [
  { max: 18.5, label: "Bajo peso", color: "bg-blue-500" },
  { max: 25, label: "Normal", color: "bg-green-500" },
  { max: 30, label: "Sobrepeso", color: "bg-yellow-500" },
  { max: 35, label: "Obesidad I", color: "bg-orange-500" },
  { max: 40, label: "Obesidad II", color: "bg-red-500" },
  { max: 100, label: "Obesidad III", color: "bg-red-700" },
];

function getBMICategory(bmi: number) {
  return BMI_CATEGORIES.find((c) => bmi < c.max) || BMI_CATEGORIES[5];
}

interface BMICalculatorProps {
  ctaHref?: string;
}

export function BMICalculator({ ctaHref }: BMICalculatorProps = {}) {
  const href = ctaHref ?? trainerConfig.harbizUrl;
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [activity, setActivity] = useState<
    "sedentary" | "light" | "moderate" | "active" | "very"
  >("moderate");
  const [result, setResult] = useState<{
    bmi: number;
    tdee: number;
    category: string;
  } | null>(null);

  const activityMultipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    very: 1.9,
  };

  const handleCalculate = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height) / 100;
    const a = parseInt(age, 10);

    if (!w || !h || !a || h <= 0) return;

    const bmi = w / (h * h);
    const bmr = 10 * w + 6.25 * (h * 100) - 5 * a + 5;
    const tdee = Math.round(bmr * activityMultipliers[activity]);
    const category = getBMICategory(bmi);

    setResult({
      bmi: Math.round(bmi * 10) / 10,
      tdee,
      category: category.label,
    });
  };

  const bmiPercent = result
    ? Math.min((result.bmi / 40) * 100, 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="rounded-2xl p-6 md:p-8 bg-[var(--secondary)] text-white border border-white/10"
    >
      <h3 className="font-display text-2xl mb-6">Calculadora BMI / TDEE</h3>
      <div className="grid gap-4 mb-6">
        <div>
          <label htmlFor="weight" className="block text-sm mb-1 text-white/80">
            Peso (kg)
          </label>
          <input
            id="weight"
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="70"
            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
          />
        </div>
        <div>
          <label htmlFor="height" className="block text-sm mb-1 text-white/80">
            Altura (cm)
          </label>
          <input
            id="height"
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="175"
            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
          />
        </div>
        <div>
          <label htmlFor="age" className="block text-sm mb-1 text-white/80">
            Edad
          </label>
          <input
            id="age"
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="30"
            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
          />
        </div>
        <div>
          <label htmlFor="activity" className="block text-sm mb-1 text-white/80">
            Nivel de actividad
          </label>
          <select
            id="activity"
            value={activity}
            onChange={(e) =>
              setActivity(e.target.value as typeof activity)
            }
            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
          >
            <option value="sedentary">Sedentario</option>
            <option value="light">Ligera (1-3 días/semana)</option>
            <option value="moderate">Moderada (3-5 días/semana)</option>
            <option value="active">Activa (6-7 días/semana)</option>
            <option value="very">Muy activa (atleta)</option>
          </select>
        </div>
      </div>
      <button
        type="button"
        onClick={handleCalculate}
        className="w-full py-4 bg-[var(--primary)] text-[var(--secondary)] font-display font-bold text-lg uppercase hover:opacity-90 transition-opacity"
      >
        Calcular
      </button>
      {result && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 space-y-4 p-4 rounded-lg bg-white/5"
        >
          <div>
            <p className="flex justify-between mb-2">
              <strong>BMI:</strong> {result.bmi}
              <span className="text-[var(--primary)]">{result.category}</span>
            </p>
            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${bmiPercent}%` }}
                transition={{ duration: 0.5 }}
                className="h-full bg-[var(--primary)]"
              />
            </div>
          </div>
          <p>
            <strong>Calorías estimadas (TDEE):</strong> ~{result.tdee} kcal/día
          </p>
          <p className="text-sm text-white/70">
            Valores orientativos. Consultá con un profesional para un plan
            personalizado.
          </p>
          <Link
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center py-3 bg-[var(--primary)] text-[var(--secondary)] font-display font-bold uppercase hover:opacity-90 transition-opacity"
            aria-label="Quiero un plan personalizado"
          >
            Quiero un plan personalizado
          </Link>
        </motion.div>
      )}
    </motion.div>
  );
}
