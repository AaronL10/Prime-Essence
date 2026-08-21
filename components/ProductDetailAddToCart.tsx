"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import type { ProductVariant } from "@/lib/product-helpers";

function formatPrice(price: number) {
  return `$${price.toLocaleString("es-AR")}`;
}

interface ProductDetailAddToCartProps {
  productId: string;
  slug: string;
  name: string;
  brand: string;
  image: string;
  variants: ProductVariant[];
}

export default function ProductDetailAddToCart({
  productId,
  slug,
  name,
  brand,
  image,
  variants,
}: ProductDetailAddToCartProps) {
  const { addToCart } = useCart();
  const router = useRouter();

  const firstInStock = variants.find((v) => v.stock > 0) ?? variants[0];
  const [selectedSizeMl, setSelectedSizeMl] = useState<number | undefined>(
    firstInStock?.sizeMl
  );
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const selectedVariant = useMemo(
    () => variants.find((v) => v.sizeMl === selectedSizeMl),
    [variants, selectedSizeMl]
  );

  function handleSelectSize(sizeMl: number) {
    setSelectedSizeMl(sizeMl);
    setQuantity(1);
    setAdded(false);
  }

  function handleAddToCart() {
    if (!selectedVariant || selectedVariant.stock === 0) return;

    addToCart(
      {
        id: selectedVariant.id,
        productId,
        slug,
        name,
        brand,
        image,
        sizeMl: selectedVariant.sizeMl,
        price: selectedVariant.price,
        stock: selectedVariant.stock,
      },
      quantity
    );

    setAdded(true);
  }

  if (variants.length === 0) {
    return (
      <p className="font-body text-sm text-ink/50">
        Este producto todavía no tiene tamaños cargados.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="font-body text-xs font-medium uppercase tracking-wide text-ink/50">
          Elegí el tamaño
        </p>
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {variants.map((v) => {
            const isSelected = v.sizeMl === selectedSizeMl;
            const outOfStock = v.stock === 0;

            return (
              <button
                key={v.sizeMl}
                type="button"
                disabled={outOfStock}
                onClick={() => handleSelectSize(v.sizeMl)}
                className={`flex flex-col items-center gap-1 rounded-2xl border px-3 py-3 transition-colors ${
                  isSelected
                    ? "border-ink bg-ink text-bone"
                    : outOfStock
                    ? "cursor-not-allowed border-ink/10 text-ink/30"
                    : "border-ink/15 text-ink hover:border-amber"
                }`}
              >
                <span className="font-mono text-sm">{v.sizeMl}ml</span>
                <span className="font-mono text-xs opacity-75">
                  {formatPrice(v.price)}
                </span>
                {outOfStock && (
                  <span className="font-mono text-[10px] uppercase tracking-wide">
                    Sin stock
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {selectedVariant && (
        <>
          <div className="flex items-center justify-between">
            <span className="font-body text-sm text-ink/60">
              {selectedVariant.stock > 0
                ? selectedVariant.stock <= 3
                  ? `Últimas ${selectedVariant.stock} unidades`
                  : "En stock"
                : "Sin stock"}
            </span>
            <span className="font-mono text-2xl text-ink">
              {formatPrice(selectedVariant.price)}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 rounded-full border border-ink/15">
              <button
                type="button"
                aria-label="Restar cantidad"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="flex h-10 w-10 items-center justify-center text-ink/70 hover:text-ink"
              >
                −
              </button>
              <span className="w-6 text-center font-mono text-sm text-ink">
                {quantity}
              </span>
              <button
                type="button"
                aria-label="Sumar cantidad"
                disabled={quantity >= selectedVariant.stock}
                onClick={() =>
                  setQuantity((q) => Math.min(selectedVariant.stock, q + 1))
                }
                className="flex h-10 w-10 items-center justify-center text-ink/70 hover:text-ink disabled:cursor-not-allowed disabled:text-ink/25"
              >
                +
              </button>
            </div>

            <button
              type="button"
              disabled={selectedVariant.stock === 0}
              onClick={handleAddToCart}
              className="flex-1 rounded-full bg-ink py-3.5 font-body text-sm font-medium uppercase tracking-[0.1em] text-bone transition-colors hover:bg-amber hover:text-ink disabled:cursor-not-allowed disabled:bg-ink/20 disabled:text-ink/40"
            >
              {selectedVariant.stock === 0 ? "Sin stock" : "Agregar al carrito"}
            </button>
          </div>

          {added && (
            <div className="flex items-center justify-between rounded-card border border-sage/30 bg-sage/10 px-4 py-3">
              <span className="font-body text-sm text-sage">
                Agregado al carrito.
              </span>
              <button
                type="button"
                onClick={() => router.push("/carrito")}
                className="font-body text-sm font-medium text-sage underline underline-offset-4"
              >
                Ver carrito
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}