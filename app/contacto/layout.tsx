import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Escribime y te respondo a la brevedad.",
};

export default function ContactoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
