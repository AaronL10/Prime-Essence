export default function LoadingProductos() {
  return (
    <main>
      <section className="border-b border-ink/10 bg-paper">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
          <div className="h-3 w-24 animate-pulse rounded-full bg-ink/10" />
          <div className="mt-4 h-9 w-2/3 max-w-md animate-pulse rounded-full bg-ink/10" />
          <div className="mt-4 h-4 w-1/2 max-w-sm animate-pulse rounded-full bg-ink/10" />
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-5 py-14 md:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-card border border-ink/10 bg-paper"
              >
                <div className="aspect-[4/5] animate-pulse bg-ink/5" />
                <div className="flex flex-col gap-3 p-5">
                  <div className="h-3 w-16 animate-pulse rounded-full bg-ink/10" />
                  <div className="h-5 w-3/4 animate-pulse rounded-full bg-ink/10" />
                  <div className="h-3 w-full animate-pulse rounded-full bg-ink/10" />
                  <div className="mt-2 h-10 w-full animate-pulse rounded-full bg-ink/10" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}