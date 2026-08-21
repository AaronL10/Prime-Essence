"use client";

import Link from "next/link";
import { useState } from "react";
import { getStartingPrice, isAnyVariantInStock, type ProductVariant } from "@/lib/product-helpers";

interface ProductCardProps {
  slug: string;
  name: string;
  brand: string;
  description: string;
  image: string;
  variants: ProductVariant[];
}

const ACCENTS = ["#FF2E93", "#7A1554", "#9AA0AC"] as const;

function pickAccent(seed: string) {
  const hash = Array.from(seed).reduce(
    (acc, char) => acc + char.charCodeAt(0),
    0
  );
  return ACCENTS[hash % ACCENTS.length];
}

function formatPrice(price: number) {
  return `$${price.toLocaleString("es-AR")}`;
}

export default function ProductCard({
  slug,
  name,
  brand,
  description,
  image,
  variants,
}: ProductCardProps) {
  const [imgFailed, setImgFailed] = useState(false);
  const accent = pickAccent(brand + name);
  const inStock = isAnyVariantInStock(variants);
  const startingPrice = getStartingPrice(variants);

  return (
    <Link
      href={`/productos/${slug}`}
      className="group flex flex-col overflow-hidden rounded-card border border-ink/10 bg-paper transition-all duration-300 hover:-translate-y-1 hover:border-amber/50 hover:shadow-xl hover:shadow-ink/10"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-ink/5">
        {image && !imgFailed ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image}
            alt={`${brand} ${name}`}
            loading="lazy"
            onError={() => setImgFailed(true)}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <BottlePlaceholder color={accent} initial={brand.charAt(0)} />
        )}

        <span className="absolute left-3 top-3 rounded-full bg-ink/80 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-bone backdrop-blur-sm">
          {inStock ? "En stock" : "Agotado"}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <p className="font-body text-[11px] font-semibold uppercase tracking-[0.16em] text-ink/45">
            {brand}
          </p>
          <h3 className="mt-1 font-display text-xl text-ink">{name}</h3>
        </div>

        <p className="line-clamp-2 flex-1 font-body text-sm leading-relaxed text-ink/60">
          {description}
        </p>

        <div className="flex items-center justify-between gap-3 pt-1">
          <span className="font-mono text-sm text-ink/50">Desde</span>
          <span className="font-mono text-lg text-ink">
            {formatPrice(startingPrice)}
          </span>
        </div>

        <span className="mt-1 w-full rounded-full bg-ink py-3 text-center font-body text-[13px] font-medium uppercase tracking-[0.12em] text-bone transition-colors duration-300 group-hover:bg-amber group-hover:text-ink">
          Ver tamaños
        </span>
      </div>
    </Link>
  );
}

function BottlePlaceholder({
  color,
  initial,
}: {
  color: string;
  initial: string;
}) {
  return (
    <div
      className="flex h-full w-full items-center justify-center"
      style={{ backgroundColor: `${color}14` }}
    >
      <svg width="72" height="110" viewBox="0 0 72 110" fill="none">
        <rect x="24" y="4" width="24" height="14" rx="3" fill={color} opacity="0.85" />
        <rect x="18" y="18" width="36" height="10" rx="2" fill={color} opacity="0.5" />
        <path
          d="M14 32c0-2 2-4 4-4h36c2 0 4 2 4 4v64a10 10 0 0 1-10 10H24a10 10 0 0 1-10-10V32Z"
          fill={color}
          opacity="0.18"
          stroke={color}
          strokeWidth="1.5"
        />
        <text
          x="36"
          y="76"
          textAnchor="middle"
          fontFamily="serif"
          fontStyle="italic"
          fontSize="22"
          fill={color}
          opacity="0.7"
        >
          {initial}
        </text>
      </svg>
    </div>
  );
}