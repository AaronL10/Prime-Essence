"use client";

import { useState, useTransition, type FormEvent } from "react";
import { adjustPoints } from "@/app/admin/clientes/actions";

export default function AdjustPointsForm({ userId }: { userId: string }) {
  const [amount, setAmount] = useState("");
  const [reason, setReason] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    const numericAmount = Number(amount);

    startTransition(async () => {
      const result = await adjustPoints(userId, numericAmount, reason);

      if ("error" in result) {
        setError(result.error);
        return;
      }

      setAmount("");
      setReason("");
      setSuccess(true);
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 rounded-card border border-ink/10 bg-paper p-5"
    >
      <h3 className="font-display text-lg text-ink">Ajustar puntos</h3>
      <p className="font-body text-xs text-ink/50">
        Usá un número negativo para restar (ej. -50).
      </p>

      <div className="flex flex-col gap-1.5">
        <label className="font-body text-xs font-medium uppercase tracking-wide text-ink/50">
          Cantidad
        </label>
        <input
          required
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="input"
          type="number"
          step={1}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="font-body text-xs font-medium uppercase tracking-wide text-ink/50">
          Motivo
        </label>
        <input
          required
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="input"
          type="text"
          placeholder="Ej: devolución, cortesía"
        />
      </div>

      {error && <p className="font-body text-sm text-wine">{error}</p>}
      {success && (
        <p className="font-body text-sm text-sage">Puntos ajustados.</p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="mt-1 rounded-full bg-ink py-2.5 font-body text-[13px] font-medium uppercase tracking-[0.1em] text-bone transition-colors hover:bg-amber hover:text-ink disabled:opacity-50"
      >
        {isPending ? "Guardando..." : "Aplicar ajuste"}
      </button>
    </form>
  );
}