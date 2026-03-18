"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import type { Plan } from "@/lib/types";
import { trackEvent } from "@/lib/analytics";

const questions = [
  {
    id: "goal",
    question: "¿Cuál es tu objetivo principal?",
    options: [
      { value: 1, label: "Bajar de peso", icon: "🎯" },
      { value: 2, label: "Ganar masa muscular", icon: "💪" },
      { value: 3, label: "Ambos", icon: "🔥" },
    ],
  },
  {
    id: "experience",
    question: "¿Cuánta experiencia tenés con el entrenamiento?",
    options: [
      { value: 1, label: "Ninguna / principiante", icon: "🌱" },
      { value: 2, label: "Algo de experiencia", icon: "📈" },
      { value: 3, label: "Avanzado", icon: "🏆" },
    ],
  },
  {
    id: "frequency",
    question: "¿Cuántos días por semana podés entrenar?",
    options: [
      { value: 1, label: "2-3 días", icon: "📅" },
      { value: 2, label: "4-5 días", icon: "📆" },
      { value: 3, label: "6 o más días", icon: "⚡" },
    ],
  },
  {
    id: "support",
    question: "¿Qué nivel de seguimiento necesitás?",
    options: [
      { value: 1, label: "Plan + consultas ocasionales", icon: "📋" },
      { value: 2, label: "Seguimiento semanal", icon: "📊" },
      { value: 3, label: "Acompañamiento total", icon: "🤝" },
    ],
  },
];

interface PlanQuizProps {
  plans: Plan[];
}

export function PlanQuiz({ plans }: PlanQuizProps) {
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState<number[]>([]);
  const [recommendedPlan, setRecommendedPlan] = useState<Plan | null>(null);

  const currentQuestion = questions[step];
  const isLastStep = step === questions.length - 1;

  const handleAnswer = (score: number) => {
    const newScores = [...scores, score];
    setScores(newScores);

    if (isLastStep) {
      const avg = newScores.reduce((a, b) => a + b, 0) / newScores.length;
      const targetScore = Math.round(avg);
      const plan =
        plans.find((p) => p.quizScore === targetScore) ||
        plans.sort((a, b) => (b.quizScore ?? 0) - (a.quizScore ?? 0))[0];
      setRecommendedPlan(plan);
      trackEvent("quiz_completed", { plan: plan.name });
    } else {
      setStep(step + 1);
    }
  };

  const reset = () => {
    setStep(0);
    setScores([]);
    setRecommendedPlan(null);
  };

  if (plans.length === 0) return null;

  return (
    <section
      id="quiz"
      className="py-20 md:py-28 bg-white text-[var(--secondary)]"
      aria-labelledby="quiz-heading"
    >
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          id="quiz-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-4xl md:text-5xl text-center mb-4"
        >
          ¿Qué plan es para vos?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-[var(--secondary)]/70 mb-12"
        >
          Respondé 4 preguntas y te recomendamos el plan ideal
        </motion.p>

        <AnimatePresence mode="wait">
          {recommendedPlan ? (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="text-center p-8 rounded-2xl bg-[var(--secondary)] text-white"
            >
              <h3 className="font-display text-2xl mb-2">Te recomendamos</h3>
              <p className="text-3xl font-display text-[var(--primary)] mb-6">
                {recommendedPlan.name}
              </p>
              <Link
                href={recommendedPlan.harbizUrl || "#"}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackEvent("click_harbiz_cta", {
                    location: "quiz",
                    plan: recommendedPlan.name,
                  })
                }
                className="inline-block w-full max-w-xs mx-auto px-8 py-4 bg-[var(--primary)] text-[var(--secondary)] font-display font-bold text-lg uppercase hover:opacity-90 transition-opacity mb-4"
                aria-label={`Reservar plan ${recommendedPlan.name}`}
              >
                Empezar con este plan
              </Link>
              <button
                type="button"
                onClick={reset}
                className="block mx-auto text-sm text-white/70 hover:text-white underline"
              >
                Volver a hacer el quiz
              </button>
            </motion.div>
          ) : (
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <p className="text-sm text-[var(--secondary)]/60">
                Pregunta {step + 1} de {questions.length}
              </p>
              <h3 className="font-display text-2xl">{currentQuestion.question}</h3>
              <div className="space-y-3">
                {currentQuestion.options.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => handleAnswer(opt.value)}
                    className="w-full p-4 rounded-xl border-2 border-[var(--secondary)]/20 hover:border-[var(--primary)] hover:bg-[var(--primary)]/5 text-left transition-all flex items-center gap-3"
                  >
                    <span className="text-2xl">{opt.icon}</span>
                    {opt.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
