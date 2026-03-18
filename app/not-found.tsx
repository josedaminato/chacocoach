import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-[var(--secondary)] text-white">
      <h1 className="font-display text-6xl md:text-8xl mb-4">404</h1>
      <p className="text-xl text-white/80 mb-8 text-center">
        La página que buscás no existe.
      </p>
      <Link
        href="/"
        className="px-8 py-4 bg-[var(--primary)] text-[var(--secondary)] font-display font-bold text-lg uppercase hover:opacity-90 transition-opacity"
      >
        Volver al inicio
      </Link>
    </div>
  );
}
