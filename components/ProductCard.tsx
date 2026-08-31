"use client";

import Link from "next/link";
import { useState } from "react";
import {
  getStartingPrice,
  isAnyVariantInStock,
  type ProductVariant,
} from "@/lib/product-helpers";

function formatPrice(price: number) {
  return `Gs. ${price.toLocaleString("es-AR")}`;
}

interface ProductCardProps {
  slug: string;
  name: string;
  brand: string;
  description: string;
  image: string;
  variants: ProductVariant[];
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
  const inStock = isAnyVariantInStock(variants);
  const startingPrice = getStartingPrice(variants);

  return (
    <Link
      href={`/productos/${slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white transition-all duration-300 hover:border-black hover:shadow-lg"
    >
      {/* Imagen */}
      <div className="relative aspect-[4/5] overflow-hidden bg-neutral-100">
        {image && !imgFailed ? (
          <img
            src={image}
            alt={`${brand} — ${name}`}
            loading="lazy"
            onError={() => setImgFailed(true)}
            className="h-full w-full object-contain p-4 transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <BottlePlaceholder initial={brand.charAt(0)} />
        )}

        {/* Badge stock */}
        <span
          className={`absolute left-3 top-3 rounded-full px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-widest ${
            inStock
              ? "bg-black text-white"
              : "border border-neutral-300 bg-white text-neutral-400"
          }`}
        >
          {inStock ? "En stock" : "Agotado"}
        </span>
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div>
          <p className="font-body text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-400">
            {brand}
          </p>
          <h3 className="mt-0.5 font-display text-lg leading-tight text-black">
            {name}
          </h3>
        </div>

        <p className="line-clamp-2 flex-1 font-body text-sm leading-relaxed text-neutral-500">
          {description}
        </p>

        <div className="flex items-baseline justify-between gap-3 pt-2">
          <span className="font-body text-xs text-neutral-400">Desde</span>
          <span className="font-mono text-base font-medium text-black">
            {formatPrice(startingPrice)}
          </span>
        </div>

        <span className="mt-2 w-full rounded-full border border-neutral-200 py-2.5 text-center font-body text-[12px] font-semibold uppercase tracking-[0.1em] text-black transition-all duration-300 group-hover:bg-black group-hover:text-white">
          Ver opciones
        </span>
      </div>
    </Link>
  );
}

function BottlePlaceholder({ initial }: { initial: string }) {
  return (
    <div className="flex h-full w-full items-center justify-center bg-neutral-100">
      <svg width="64" height="96" viewBox="0 0 64 96" fill="none">
        <rect x="20" y="4" width="24" height="12" rx="2" fill="#000000" opacity="0.15" />
        <rect x="16" y="16" width="32" height="8" rx="2" fill="#000000" opacity="0.1" />
        <path
          d="M12 28c0-1.5 1.5-3 3-3h34c1.5 0 3 1.5 3 3v56a8 8 0 0 1-8 8H20a8 8 0 0 1-8-8V28Z"
          fill="#000000"
          opacity="0.06"
          stroke="#000000"
          strokeWidth="1"
        />
        <text
          x="32"
          y="68"
          textAnchor="middle"
          fontFamily="var(--font-fraunces), serif"
          fontStyle="italic"
          fontSize="20"
          fill="#000000"
          opacity="0.25"
        >
          {initial}
        </text>
      </svg>
    </div>
  );
}