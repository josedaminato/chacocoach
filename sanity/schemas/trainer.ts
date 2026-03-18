import { defineType, defineArrayMember } from "sanity";

export const trainerSchema = defineType({
  name: "trainer",
  title: "Trainer",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Nombre",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "bio",
      title: "Biografía",
      type: "array",
      of: [defineArrayMember({ type: "block" })],
    },
    {
      name: "photo",
      title: "Foto",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "certifications",
      title: "Certificaciones",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", title: "Título", type: "string" },
            { name: "icon", title: "Ícono", type: "string" },
          ],
        },
      ],
    },
    {
      name: "metrics",
      title: "Métricas",
      type: "object",
      fields: [
        { name: "clients", title: "Clientes transformados", type: "number" },
        { name: "years", title: "Años de experiencia", type: "number" },
        { name: "countries", title: "Países", type: "number" },
      ],
    },
  ],
});
