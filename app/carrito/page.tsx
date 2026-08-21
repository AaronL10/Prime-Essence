"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/context/CartContext";

function formatPrice(price: number) {
  return `$${price.toLocaleString("es-AR")}`;
}

export default function CarritoPage() {
  const { cart, updateQuantity, removeFromCart, cartTotal, cartCount } =
    useCart();

  if (cart.length === 0) {
    return (
      <main>
        <section className="mx-auto flex min-h-[50vh] max-w-3xl flex-col items-center justify-center gap-5 px-5 py-24 text-center md:px-8">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-amber-ink">
            Carrito
          </p>
          <h1 className="font-display text-3xl text-ink sm:text-4xl">
            Tu carrito está vacío
          </h1>
          <p className="max-w-[42ch] font-body text-sm leading-relaxed text-ink/60">
            Todavía no agregaste ninguna fragancia. Explorá el catálogo y
            encontrá tu próximo decant.
          </p>
          <Link
            href="/productos"
            className="mt-2 rounded-full bg-ink px-6 py-3 font-body text-[13px] font-medium uppercase tracking-[0.12em] text-bone transition-colors hover:bg-amber hover:text-ink"
          >
            Ver productos
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main>
      <section className="border-b border-ink/10 bg-paper">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-amber-ink">
            Carrito
          </p>
          <h1 className="mt-3 font-display text-4xl text-ink sm:text-5xl">
            Tu selección
          </h1>
          <p className="mt-4 font-body text-sm leading-relaxed text-ink/60 sm:text-base">
            {cartCount} {cartCount === 1 ? "producto" : "productos"} en tu
            carrito.
          </p>
        </div>
      </section>

      <section>
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-5 py-14 md:px-8 lg:grid-cols-[1fr_340px]">
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

          <aside className="h-fit rounded-card border border-ink/10 bg-paper p-6">
            <h2 className="font-display text-xl text-ink">Resumen</h2>

            <div className="mt-5 flex items-center justify-between border-t border-ink/10 pt-4">
              <span className="font-body text-sm text-ink/60">Subtotal</span>
              <span className="font-mono text-lg text-ink">
                {formatPrice(cartTotal)}
              </span>
            </div>

            <p className="mt-2 font-body text-xs text-ink/40">
              Envío y forma de pago se coordinan luego de confirmar el pedido.
            </p>

            <Link
              href="/checkout"
              className="mt-6 block w-full rounded-full bg-ink py-3 text-center font-body text-[13px] font-medium uppercase tracking-[0.12em] text-bone transition-colors hover:bg-amber hover:text-ink"
            >
              Continuar con el pedido
            </Link>

            <Link
              href="/productos"
              className="mt-3 block text-center font-body text-[13px] font-medium uppercase tracking-[0.1em] text-ink/60 underline-offset-4 hover:text-ink hover:underline"
            >
              Seguir comprando
            </Link>
          </aside>
        </div>
      </section>
    </main>
  );
}

interface CartRowProps {
  id: string;
  slug: string;
  name: string;
  brand: string;
  sizeMl: number;
  price: number;
  image: string;
  quantity: number;
  stock: number;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

function CartRow({
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
  const [imgFailed, setImgFailed] = useState(false);
  const maxReached = quantity >= stock;

  return (
    <li className="flex gap-4 rounded-card border border-ink/10 bg-paper p-4">
      <Link
        href={`/productos/${slug}`}
        className="h-24 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-ink/5"
      >
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
            {brand.charAt(0)}
          </div>
        )}
      </Link>

      <div className="flex flex-1 flex-col justify-between">
        <div>
          <p className="font-body text-[11px] font-semibold uppercase tracking-[0.14em] text-ink/45">
            {brand}
          </p>
          <Link
            href={`/productos/${slug}`}
            className="font-display text-lg text-ink hover:text-amber-ink"
          >
            {name}
          </Link>
          <p className="font-mono text-xs text-ink/45">{sizeMl}ml</p>
        </div>

        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 rounded-full border border-ink/15">
            <button
              type="button"
              aria-label="Restar cantidad"
              onClick={() => onUpdateQuantity(id, quantity - 1)}
              className="flex h-8 w-8 items-center justify-center font-body text-ink/70 transition-colors hover:text-ink"
            >
              −
            </button>
            <span className="w-5 text-center font-mono text-sm text-ink">
              {quantity}
            </span>
            <button
              type="button"
              aria-label="Sumar cantidad"
              disabled={maxReached}
              onClick={() => onUpdateQuantity(id, quantity + 1)}
              className="flex h-8 w-8 items-center justify-center font-body text-ink/70 transition-colors hover:text-ink disabled:cursor-not-allowed disabled:text-ink/25"
            >
              +
            </button>
          </div>

          <span className="font-mono text-sm text-ink">
            {formatPrice(price * quantity)}
          </span>
        </div>
      </div>

      <button
        type="button"
        aria-label="Eliminar del carrito"
        onClick={() => onRemove(id)}
        className="self-start font-body text-xs uppercase tracking-[0.1em] text-ink/40 transition-colors hover:text-wine"
      >
        Quitar
      </button>
    </li>
  );
}