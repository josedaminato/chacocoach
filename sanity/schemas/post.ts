import { defineType, defineArrayMember } from "sanity";

export const postSchema = defineType({
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Título",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "coverImage",
      title: "Imagen de portada",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "excerpt",
      title: "Extracto",
      type: "text",
    },
    {
      name: "body",
      title: "Contenido",
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
        }),
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
        }),
      ],
    },
    {
      name: "category",
      title: "Categoría",
      type: "string",
    },
    {
      name: "publishedAt",
      title: "Fecha de publicación",
      type: "datetime",
    },
    {
      name: "seoDescription",
      title: "Descripción SEO",
      type: "text",
    },
  ],
});
