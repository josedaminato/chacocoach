export default function BlogLoading() {
  return (
    <div className="pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-12 w-48 bg-[var(--secondary)]/10 rounded-lg animate-pulse mx-auto mb-8" />
        <div className="h-4 w-96 bg-[var(--secondary)]/10 rounded animate-pulse mx-auto mb-16" />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-[4/3] bg-[var(--secondary)]/10 rounded-2xl mb-4" />
              <div className="h-6 bg-[var(--secondary)]/10 rounded mb-2 w-3/4" />
              <div className="h-4 bg-[var(--secondary)]/10 rounded w-1/2" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
