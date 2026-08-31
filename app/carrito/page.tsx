"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/context/CartContext";

function formatPrice(price: number) {
  return `Gs. ${price.toLocaleString("es-AR")}`;
}

export default function CarritoPage() {
  const { cart, updateQuantity, removeFromCart, cartTotal, cartCount, decantDiscount, cartTotalWithDecantDiscount } =
    useCart();

  if (cart.length === 0) {
    return (
      <main className="min-h-[60vh]">
        <section className="mx-auto flex max-w-3xl flex-col items-center justify-center gap-5 px-5 py-24 text-center md:px-8">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-400">
            Carrito
          </p>
          <h1 className="font-display text-3xl text-black sm:text-4xl">
            Tu carrito está vacío
          </h1>
          <p className="max-w-[42ch] font-body text-sm leading-relaxed text-neutral-500">
            Todavía no agregaste ninguna fragancia. Explorá el catálogo y
            encontrá tu próximo decant.
          </p>
          <Link
            href="/productos"
            className="mt-2 rounded-full bg-black px-8 py-3.5 font-body text-[13px] font-semibold uppercase tracking-[0.12em] text-white transition-all hover:bg-neutral-800"
          >
            Ver productos
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main>
      <section className="border-b border-neutral-200">
        <div className="mx-auto max-w-6xl px-5 py-12 md:px-8 md:py-16">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-400">
            Carrito
          </p>
          <h1 className="mt-2 font-display text-3xl text-black sm:text-4xl">
            Tu selección
          </h1>
          <p className="mt-3 font-body text-sm text-neutral-500">
            {cartCount} {cartCount === 1 ? "producto" : "productos"} en tu
            carrito.
          </p>
        </div>
      </section>

      <section>
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-5 py-10 md:px-8 lg:grid-cols-[1fr_360px] lg:gap-12">
          <div className="flex flex-col gap-4">
            {/* Mensaje de descuento */}
            {decantDiscount.count > 0 && (
              <div className="rounded-xl border border-black bg-black p-4">
                <p className="font-body text-sm text-white">
                  {decantDiscount.message}
                </p>
              </div>
            )}

            <ul className="flex flex-col gap-4">
              {cart.map((item) => (
                <CartRow
                  key={item.id}
                  id={item.id}
                  slug={item.slug}
                  name={item.name}
                  brand={item.brand}
                  sizeMl={item.sizeMl}
                  price={item.price}
                  image={item.image}
                  quantity={item.quantity}
                  stock={item.stock}
                  onUpdateQuantity={updateQuantity}
                  onRemove={removeFromCart}
                />
              ))}
            </ul>
          </div>

          <aside className="h-fit rounded-xl border border-neutral-200 bg-neutral-50 p-6 lg:p-8">
            <h2 className="font-display text-xl text-black">Resumen</h2>

            <div className="mt-6 space-y-3 border-t border-neutral-200 pt-6">
              <div className="flex items-center justify-between">
                <span className="font-body text-sm text-neutral-500">Subtotal</span>
                <span className="font-mono text-lg font-medium text-black">
                  {formatPrice(cartTotal)}
                </span>
              </div>

              {decantDiscount.amount > 0 && (
                <div className="flex items-center justify-between">
                  <span className="font-body text-sm text-neutral-500">
                    Descuento por cantidad ({Math.round(decantDiscount.rate * 100)}%)
                  </span>
                  <span className="font-mono text-lg font-medium text-black">
                    -{formatPrice(decantDiscount.amount)}
                  </span>
                </div>
              )}

              <div className="flex items-center justify-between">
                <span className="font-body text-sm text-neutral-500">Envío</span>
                <span className="font-body text-sm text-neutral-400">
                  A coordinar
                </span>
              </div>
            </div>

            <div className="mt-4 border-t border-neutral-200 pt-4">
              <div className="flex items-center justify-between">
                <span className="font-body text-base font-medium text-black">Total</span>
                <span className="font-mono text-2xl font-medium text-black">
                  {formatPrice(cartTotalWithDecantDiscount)}
                </span>
              </div>
            </div>

            <p className="mt-3 font-body text-xs text-neutral-400">
              Envío y forma de pago se coordinan por WhatsApp luego de confirmar el pedido.
            </p>

            <Link
              href="/checkout"
              className="mt-6 block w-full rounded-full bg-black py-4 text-center font-body text-sm font-semibold uppercase tracking-[0.1em] text-white transition-all hover:bg-neutral-800"
            >
              Continuar con el pedido
            </Link>

            <Link
              href="/productos"
              className="mt-3 block text-center font-body text-sm text-neutral-500 transition-colors hover:text-black"
            >
              Seguir comprando
            </Link>
          </aside>
        </div>
      </section>
    </main>
  );
}

// ... resto del componente CartRow igual que antes