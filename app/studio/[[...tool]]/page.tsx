import { trainerConfig } from "@/lib/getConfig";

export const metadata = {
  title: "Studio",
  robots: "noindex" as const,
};

export default function StudioPage() {
  const studioUrl =
    process.env.NEXT_PUBLIC_SANITY_STUDIO_URL ||
    (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
      ? `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.sanity.studio`
      : null);

  if (studioUrl) {
    return (
      <iframe
        src={studioUrl}
        className="w-full h-full min-h-[100dvh] border-0"
        title="Sanity Studio"
      />
    );
  }

  return (
    <div
      className="min-h-[100dvh] flex items-center justify-center p-8"
      style={{
        backgroundColor: trainerConfig.theme.secondary,
        color: trainerConfig.theme.primary,
      }}
    >
      <div className="max-w-md text-center space-y-4">
        <h1 className="font-display text-2xl">Sanity Studio</h1>
        <p className="text-white/80 text-sm">
          Para usar el Studio embebido, configurá{" "}
          <code className="bg-white/10 px-1 rounded">
            NEXT_PUBLIC_SANITY_STUDIO_URL
          </code>{" "}
          en tu .env con la URL de tu Studio (ej: tras{" "}
          <code className="bg-white/10 px-1 rounded">sanity deploy</code>).
        </p>
        <p className="text-white/60 text-sm">
          O ejecutá <code className="bg-white/10 px-1 rounded">npm run studio</code>{" "}
          para desarrollo local.
        </p>
      </div>
    </div>
  );
}
