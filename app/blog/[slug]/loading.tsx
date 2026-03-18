export default function BlogPostLoading() {
  return (
    <div className="pt-32 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-4 w-24 bg-[var(--secondary)]/10 rounded animate-pulse mb-8" />
        <div className="aspect-video bg-[var(--secondary)]/10 rounded-2xl mb-8 animate-pulse" />
        <div className="h-8 bg-[var(--secondary)]/10 rounded mb-4 w-3/4 animate-pulse" />
        <div className="h-4 bg-[var(--secondary)]/10 rounded mb-8 w-1/3 animate-pulse" />
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-4 bg-[var(--secondary)]/10 rounded animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  );
}
