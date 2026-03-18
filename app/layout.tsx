import type { Metadata } from "next";
import { Bebas_Neue, DM_Sans } from "next/font/google";
import { trainerConfig } from "@/lib/getConfig";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ConditionalLayout } from "@/components/layout/ConditionalLayout";
import { FloatingButtons } from "@/components/layout/FloatingButtons";
import { Analytics as VercelAnalytics } from "@vercel/analytics/react";
import { Analytics } from "@/components/Analytics";
import { Toaster } from "sonner";
import "@/styles/globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm",
  display: "swap",
});

const siteUrl =
  (typeof process.env.NEXT_PUBLIC_SITE_URL === "string" &&
    process.env.NEXT_PUBLIC_SITE_URL) ||
  trainerConfig.siteUrl;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${trainerConfig.name} | ${trainerConfig.tagline}`,
    template: `%s | ${trainerConfig.name}`,
  },
  description: trainerConfig.heroSubheadline,
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: siteUrl,
    siteName: trainerConfig.name,
    title: `${trainerConfig.name} | ${trainerConfig.tagline}`,
    description: trainerConfig.heroSubheadline,
    images: [{ url: "/og", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${bebasNeue.variable} ${dmSans.variable}`}>
      <body className="antialiased">
        <ThemeProvider>
          <ConditionalLayout>{children}</ConditionalLayout>
          <Toaster position="top-center" richColors closeButton />
          <Analytics />
          <VercelAnalytics />
          <FloatingButtons />
        </ThemeProvider>
      </body>
    </html>
  );
}
