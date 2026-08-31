// app/carrito/CartRow.tsx
"use client";

import Link from "next/link";
import Image from "next/image";

interface CartRowProps {
  id: string;
  slug: string;
  name: string;
  brand: string;
  sizeMl: number;
  price: number;
  image?: string | null;
  quantity: number;
  stock: number;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

function formatPrice(price: number) {
  return `Gs. ${price.toLocaleString("es-AR")}`;
}

const FALLBACK = "/placeholder.jpg";

export default function CartRow({
  id,
  slug,
  name,
  brand,
  sizeMl,
  price,
  image,
  quantity,
  stock,
  onUpdateQuantity,
  onRemove,
}: CartRowProps) {
  const raw = image?.trim() || "";
  const src =
    raw === ""
      ? FALLBACK
      : raw.startsWith("/") || raw.startsWith("http")
        ? raw
        : `/${raw}`;

  return (
    <li className="flex gap-4 rounded-xl border border-neutral-200 bg-white p-4 sm:p-5">
      <Link href={`/productos/${slug}`} className="shrink-0">
        <div className="relative h-24 w-24 overflow-hidden rounded-lg bg-neutral-100 sm:h-28 sm:w-28">
          <Image
            src={src}
            alt={name}
            fill
            className="object-cover"
            sizes="112px"
            unoptimized={src.startsWith("http")}
          />
        </div>
      </Link>

      <div className="flex flex-1 flex-col justify-between">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-neutral-400">
              {brand}
            </p>
            <Link href={`/productos/${slug}`}>
              <h3 className="mt-0.5 font-display text-base text-black sm:text-lg">
                {name}
              </h3>
            </Link>
            <p className="mt-1 font-body text-xs text-neutral-500">{sizeMl} ml</p>
          </div>
          <button
            onClick={() => onRemove(id)}
            className="shrink-0 rounded-full p-1.5 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-red-500"
            aria-label="Eliminar"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
          </button>
        </div>

        <div className="mt-3 flex items-end justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onUpdateQuantity(id, quantity - 1)}
              disabled={quantity <= 1}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-200 text-neutral-600 transition-colors hover:bg-neutral-100 disabled:opacity-40"
            >−</button>
            <span className="w-6 text-center font-mono text-sm text-black">{quantity}</span>
            <button
              onClick={() => onUpdateQuantity(id, quantity + 1)}
              disabled={quantity >= stock}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-200 text-neutral-600 transition-colors hover:bg-neutral-100 disabled:opacity-40"
            >+</button>
          </div>
          <span className="font-mono text-base font-medium text-black sm:text-lg">
            {formatPrice(price * quantity)}
          </span>
        </div>
      </div>
    </li>
  );
}