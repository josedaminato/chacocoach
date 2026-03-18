import { defineType } from "sanity";

export const planSchema = defineType({
  name: "plan",
  title: "Plan",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Nombre",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "price",
      title: "Precio",
      type: "number",
    },
    {
      name: "billingPeriod",
      title: "Período de facturación",
      type: "string",
      options: {
        list: [
          { title: "Mensual", value: "monthly" },
          { title: "Trimestral", value: "quarterly" },
          { title: "Anual", value: "yearly" },
        ],
      },
    },
    {
      name: "features",
      title: "Características",
      type: "array",
      of: [{ type: "string" }],
    },
    {
      name: "harbizUrl",
      title: "URL Harbiz del plan",
      type: "url",
    },
    {
      name: "isFeatured",
      title: "Más popular",
      type: "boolean",
      initialValue: false,
    },
    {
      name: "isActive",
      title: "Activo",
      type: "boolean",
      initialValue: true,
    },
    {
      name: "quizScore",
      title: "Puntuación quiz (1-3 para mapear con PlanQuiz)",
      type: "number",
    },
  ],
});
