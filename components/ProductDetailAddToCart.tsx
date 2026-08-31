"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import type { ProductVariant } from "@/lib/product-helpers";

function formatPrice(price: number) {
  return `Gs. ${price.toLocaleString("es-AR")}`;
}

interface ProductDetailAddToCartProps {
  productId: string;
  slug: string;
  name: string;
  brand: string;
  image: string;
  category: string;  // ← AGREGAR
  variants: ProductVariant[];
}

export default function ProductDetailAddToCart({
  productId,
  slug,
  name,
  brand,
  image,
  category,      // ← AGREGAR ESTA LÍNEA
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
        category,
      },
      quantity
    );
    setAdded(true);
  }


  if (variants.length === 0) {
    return (
      <p className="font-body text-sm text-neutral-400">
        Este producto todavía no tiene tamaños cargados.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Selector de tamaño */}
      <div>
        <p className="font-body text-xs font-medium uppercase tracking-wide text-neutral-400">
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
                className={`flex flex-col items-center gap-1 rounded-xl border-2 px-3 py-3 transition-all ${
                  isSelected
                    ? "border-black bg-black text-white"
                    : outOfStock
                    ? "cursor-not-allowed border-neutral-100 bg-neutral-50 text-neutral-300"
                    : "border-neutral-200 text-black hover:border-black"
                }`}
              >
                <span className="font-mono text-sm font-medium">{v.sizeMl}ml</span>
                <span className="font-mono text-xs opacity-80">
                  {formatPrice(v.price)}
                </span>
                {outOfStock && (
                  <span className="font-mono text-[10px] uppercase tracking-wide">
                    Agotado
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {selectedVariant && (
        <>
          {/* Precio y stock */}
          <div className="flex items-end justify-between">
            <div>
              <p className="font-body text-xs text-neutral-400">Precio</p>
              <p className="font-mono text-3xl font-medium text-black">
                {formatPrice(selectedVariant.price * quantity)}
              </p>
            </div>
            <p className="font-body text-sm text-neutral-500">
              {selectedVariant.stock > 0
                ? selectedVariant.stock <= 3
                  ? `Últimas ${selectedVariant.stock} unidades`
                  : `${selectedVariant.stock} en stock`
                : "Sin stock"}
            </p>
          </div>

          {/* Cantidad + botón */}
          <div className="flex items-center gap-4">
            <div className="flex items-center rounded-full border border-neutral-200">
              <button
                type="button"
                aria-label="Restar cantidad"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="flex h-12 w-12 items-center justify-center text-neutral-500 transition-colors hover:text-black"
              >
                −
              </button>
              <span className="w-8 text-center font-mono text-sm text-black">
                {quantity}
              </span>
              <button
                type="button"
                aria-label="Sumar cantidad"
                disabled={quantity >= selectedVariant.stock}
                onClick={() =>
                  setQuantity((q) => Math.min(selectedVariant.stock, q + 1))
                }
                className="flex h-12 w-12 items-center justify-center text-neutral-500 transition-colors hover:text-black disabled:cursor-not-allowed disabled:text-neutral-200"
              >
                +
              </button>
            </div>

            <button
              type="button"
              disabled={selectedVariant.stock === 0}
              onClick={handleAddToCart}
              className="flex-1 rounded-full bg-black py-4 font-body text-sm font-semibold uppercase tracking-[0.1em] text-white transition-all hover:bg-neutral-800 disabled:cursor-not-allowed disabled:bg-neutral-200 disabled:text-neutral-400"
            >
              {selectedVariant.stock === 0
                ? "Sin stock"
                : added
                ? "Agregado ✓"
                : "Agregar al carrito"}
            </button>
          </div>

          {/* Feedback de agregado */}
          {added && (
            <div className="flex items-center justify-between rounded-xl border border-neutral-200 bg-neutral-50 px-5 py-4">
              <span className="font-body text-sm text-neutral-600">
                Agregado al carrito
              </span>
              <button
                type="button"
                onClick={() => router.push("/carrito")}
                className="font-body text-sm font-semibold text-black underline underline-offset-4 hover:text-neutral-600"
              >
                Ver carrito →
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}