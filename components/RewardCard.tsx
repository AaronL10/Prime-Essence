"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState, useTransition } from "react";
import { redeemReward } from "@/app/canje/actions";
import { formatPoints } from "@/lib/points";

interface RewardCardProps {
  id: string;
  name: string;
  description: string | null;
  image: string | null;
  pointsCost: number;
  stock: number;
  isLoggedIn: boolean;
  userPoints: number;
}

export default function RewardCard({
  id,
  name,
  description,
  image,
  pointsCost,
  stock,
  isLoggedIn,
  userPoints,
}: RewardCardProps) {
  const [imgFailed, setImgFailed] = useState(false);
  const [loading, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const router = useRouter();

  const outOfStock = stock <= 0;
  const insufficientPoints = isLoggedIn && userPoints < pointsCost;

  function handleRedeem() {
    setError(null);
    startTransition(async () => {
      const result = await redeemReward(id);
      if ("error" in result) {
        setError(result.error);
        return;
      }
      setDone(true);
      router.refresh();
    });
  }

  return (
    <article className="flex flex-col overflow-hidden rounded-card border border-ink/10 bg-paper">
      <div className="relative aspect-[4/3] overflow-hidden bg-ink/5">
        {image && !imgFailed ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image}
            alt={name}
            onError={() => setImgFailed(true)}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center font-display italic text-ink/30">
            {name.charAt(0)}
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <h3 className="font-display text-lg text-ink">{name}</h3>
        {description && (
          <p className="line-clamp-2 font-body text-sm text-ink/60">
            {description}
          </p>
        )}
        <p className="mt-auto font-mono text-lg text-amber-ink">
          {formatPoints(pointsCost)} pts
        </p>

        {done ? (
          <p className="rounded-full bg-sage/15 py-2.5 text-center font-body text-[13px] text-sage">
            ¡Canjeado! Revisá tu cuenta.
          </p>
        ) : !isLoggedIn ? (
          <Link
            href="/login?redirect=/canje"
            className="rounded-full border border-ink px-4 py-2.5 text-center font-body text-[13px] uppercase tracking-[0.1em] text-ink transition-colors hover:bg-ink hover:text-bone"
          >
            Iniciar sesión para canjear
          </Link>
        ) : (
          <button
            type="button"
            disabled={outOfStock || insufficientPoints || loading}
            onClick={handleRedeem}
            className="rounded-full bg-ink py-2.5 font-body text-[13px] font-medium uppercase tracking-[0.12em] text-bone transition-colors hover:bg-amber hover:text-ink disabled:cursor-not-allowed disabled:bg-ink/20 disabled:text-ink/40"
          >
            {outOfStock
              ? "Sin stock"
              : insufficientPoints
              ? "Puntos insuficientes"
              : loading
              ? "Canjeando..."
              : "Canjear"}
          </button>
        )}
        {error && <p className="font-body text-xs text-wine">{error}</p>}
      </div>
    </article>
  );
}