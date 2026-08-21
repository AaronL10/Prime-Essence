"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { redeemPoints } from "@/app/cuenta/actions";
import { formatPoints } from "@/lib/points";

const OPTIONS = [100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300, 320, 340, 360, 380, 400];

interface ActiveRedemption {
  id: string;
  points_used: number;
  discount_percent: number;
}

interface RedeemPointsPanelProps {
  balance: number;
  activeRedemption: ActiveRedemption | null;
}

export default function RedeemPointsPanel({
  balance,
  activeRedemption,
}: RedeemPointsPanelProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [selected, setSelected] = useState(100);
  const [error, setError] = useState<string | null>(null);

  const validOptions = OPTIONS.filter((p) => p <= balance);

  function handleRedeem() {
    setError(null);
    startTransition(async () => {
      const result = await redeemPoints(selected);
      if ("error" in result) {
        setError(result.error);
        return;
      }
      router.refresh();
    });
  }

  if (activeRedemption) {
    return (
      <div className="mt-6 rounded-card border border-sage/40 bg-sage/10 p-6">
        <p className="font-body text-xs uppercase tracking-wide text-sage">
          Descuento disponible
        </p>
        <p className="mt-2 font-mono text-2xl text-ink">
          {activeRedemption.discount_percent}% OFF
        </p>
        <p className="mt-2 font-body text-sm text-ink/60">
          Canjeaste {formatPoints(activeRedemption.points_used)} pts por este
          descuento. Elegís si usarlo o no la próxima vez que hagas un pedido, en
          el checkout.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-6 rounded-card border border-ink/10 bg-paper p-6">
      <p className="font-body text-xs uppercase tracking-wide text-ink/50">
        Canjear puntos por descuento
      </p>

      {validOptions.length === 0 ? (
        <p className="mt-3 font-body text-sm text-ink/60">
          Necesitás al menos 100 pts para canjear tu primer descuento.
        </p>
      ) : (
        <>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <select
              value={selected}
              onChange={(e) => setSelected(Number(e.target.value))}
              disabled={isPending}
              className="rounded-full border border-ink/15 bg-paper px-4 py-2 font-mono text-sm text-ink"
            >
              {validOptions.map((p) => (
                <option key={p} value={p}>
                  {formatPoints(p)} pts → {p / 20}% OFF
                </option>
              ))}
            </select>

            <button
              onClick={handleRedeem}
              disabled={isPending}
              className="rounded-full bg-ink px-6 py-2 font-body text-[13px] font-medium uppercase tracking-[0.12em] text-bone transition-colors hover:bg-amber hover:text-ink disabled:opacity-50"
            >
              {isPending ? "Canjeando..." : "Canjear"}
            </button>
          </div>

          {error && <p className="mt-3 font-body text-sm text-wine">{error}</p>}
        </>
      )}
    </div>
  );
}