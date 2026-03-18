import { defineType } from "sanity";

export const transformationSchema = defineType({
  name: "transformation",
  title: "Transformación",
  type: "document",
  fields: [
    {
      name: "clientName",
      title: "Nombre del cliente",
      type: "string",
    },
    {
      name: "beforePhoto",
      title: "Foto antes",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "afterPhoto",
      title: "Foto después",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "duration",
      title: "Duración del proceso",
      type: "string",
    },
    {
      name: "discipline",
      title: "Disciplina",
      type: "string",
    },
  ],
});
