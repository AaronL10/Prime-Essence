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
    <article className="flex flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white transition-all hover:border-black hover:shadow-lg">
      <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100">
        {image && !imgFailed ? (
          <img
            src={image}
            alt={name}
            onError={() => setImgFailed(true)}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center font-display text-4xl italic text-neutral-200">
            {name.charAt(0)}
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <h3 className="font-display text-lg text-black">{name}</h3>
        {description && (
          <p className="line-clamp-2 font-body text-sm text-neutral-500">
            {description}
          </p>
        )}
        <p className="mt-auto font-mono text-lg font-medium text-black">
          {formatPoints(pointsCost)} pts
        </p>

        {done ? (
          <p className="rounded-full bg-neutral-100 py-2.5 text-center font-body text-[13px] text-neutral-600">
            ¡Canjeado! Revisá tu cuenta.
          </p>
        ) : !isLoggedIn ? (
          <Link
            href="/login?redirect=/canje"
            className="rounded-full border border-neutral-200 px-4 py-2.5 text-center font-body text-[13px] font-semibold uppercase tracking-[0.1em] text-black transition-all hover:bg-black hover:text-white"
          >
            Iniciar sesión para canjear
          </Link>
        ) : (
          <button
            type="button"
            disabled={outOfStock || insufficientPoints || loading}
            onClick={handleRedeem}
            className="rounded-full bg-black py-2.5 font-body text-[13px] font-semibold uppercase tracking-[0.12em] text-white transition-all hover:bg-neutral-800 disabled:cursor-not-allowed disabled:bg-neutral-200 disabled:text-neutral-400"
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
        {error && <p className="font-body text-xs text-neutral-600">{error}</p>}
      </div>
    </article>
  );
}