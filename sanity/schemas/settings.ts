import { defineType } from "sanity";

export const settingsSchema = defineType({
  name: "settings",
  title: "Configuración",
  type: "document",
  fields: [
    {
      name: "howItWorks",
      title: "¿Cómo trabajo?",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "step", title: "Paso (número)", type: "number" },
            { name: "title", title: "Título", type: "string" },
            { name: "description", title: "Descripción", type: "text" },
          ],
        },
      ],
    },
  ],
});
