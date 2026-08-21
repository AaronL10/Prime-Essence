import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center gap-5 px-5 py-24 text-center">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-amber-ink">
        Error 404
      </p>
      <h1 className="font-display text-3xl text-ink sm:text-4xl">
        No encontramos esta página
      </h1>
      <p className="max-w-[42ch] font-body text-sm leading-relaxed text-ink/60">
        El enlace que seguiste puede estar roto, o la página puede haberse
        movido.
      </p>
      <div className="mt-2 flex flex-wrap justify-center gap-4">
        <Link
          href="/"
          className="rounded-full bg-ink px-6 py-3 font-body text-[13px] font-medium uppercase tracking-[0.12em] text-bone transition-colors hover:bg-amber hover:text-ink"
        >
          Volver al inicio
        </Link>
        <Link
          href="/productos"
          className="rounded-full border border-ink px-6 py-3 font-body text-[13px] font-medium uppercase tracking-[0.12em] text-ink transition-colors hover:bg-ink hover:text-bone"
        >
          Ver catálogo
        </Link>
      </div>
    </main>
  );
}