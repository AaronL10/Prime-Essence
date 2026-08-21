export default function Loading() {
  return (
    <main className="flex min-h-[50vh] items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <span className="h-8 w-8 animate-spin rounded-full border-2 border-ink/15 border-t-amber" />
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink/40">
          Cargando...
        </p>
      </div>
    </main>
  );
}