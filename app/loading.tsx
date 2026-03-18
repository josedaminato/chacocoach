export default function Loading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div
          className="w-12 h-12 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin"
          aria-hidden
        />
        <p className="text-[var(--secondary)]/70">Cargando...</p>
      </div>
    </div>
  );
}
