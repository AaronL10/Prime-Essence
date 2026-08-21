"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center gap-5 px-5 py-24 text-center">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-amber-ink">
        Error
      </p>
      <h1 className="font-display text-3xl text-ink sm:text-4xl">
        Algo salió mal
      </h1>
      <p className="max-w-[42ch] font-body text-sm leading-relaxed text-ink/60">
        Ocurrió un error inesperado. Podés intentar de nuevo o volver al
        inicio.
      </p>
      <div className="mt-2 flex flex-wrap justify-center gap-4">
        <button
          type="button"
          onClick={() => reset()}
          className="rounded-full bg-ink px-6 py-3 font-body text-[13px] font-medium uppercase tracking-[0.12em] text-bone transition-colors hover:bg-amber hover:text-ink"
        >
          Reintentar
        </button>
        <Link
          href="/"
          className="rounded-full border border-ink px-6 py-3 font-body text-[13px] font-medium uppercase tracking-[0.12em] text-ink transition-colors hover:bg-ink hover:text-bone"
        >
          Volver al inicio
        </Link>
      </div>
    </main>
  );
}