import { defineType } from "sanity";

export const testimonialSchema = defineType({
  name: "testimonial",
  title: "Testimonio",
  type: "document",
  fields: [
    {
      name: "clientName",
      title: "Nombre del cliente",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "clientPhoto",
      title: "Foto del cliente",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "text",
      title: "Texto",
      type: "text",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "rating",
      title: "Estrellas (1-5)",
      type: "number",
      validation: (Rule) => Rule.min(1).max(5),
    },
    {
      name: "videoUrl",
      title: "URL video (YouTube/Vimeo)",
      type: "url",
    },
    {
      name: "discipline",
      title: "Disciplina",
      type: "string",
    },
  ],
});
