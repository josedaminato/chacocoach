import { defineType } from "sanity";

export const serviceSchema = defineType({
  name: "service",
  title: "Servicio",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Título",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "description",
      title: "Descripción",
      type: "text",
    },
    {
      name: "icon",
      title: "Ícono",
      type: "string",
      description: "Nombre del ícono (laptop, dumbbell, apple, chart, etc.)",
    },
  ],
});
