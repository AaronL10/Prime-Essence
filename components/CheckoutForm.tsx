"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent, type ReactNode } from "react";
import { useCart } from "@/context/CartContext";
import { createOrder } from "@/app/checkout/actions";
import {
  formatPoints,
  GS_PER_POINT,
  POINTS_DISCOUNT_CAP_RATIO,
} from "@/lib/points";

function formatPrice(price: number) {
  return `$${price.toLocaleString("es-AR")}`;
}

interface CheckoutFormProps {
  defaultName: string;
  availablePoints: number;
}

export default function CheckoutForm({
  defaultName,
  availablePoints,
}: CheckoutFormProps) {
  const { cart, cartTotal, clearCart } = useCart();
  const router = useRouter();

  const [fullName, setFullName] = useState(defaultName);
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [notes, setNotes] = useState("");
  const [pointsToUse, setPointsToUse] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const maxPointsByCap = Math.floor(
    (cartTotal * POINTS_DISCOUNT_CAP_RATIO) / GS_PER_POINT
  );
  const maxPointsUsable = Math.max(0, Math.min(availablePoints, maxPointsByCap));

  const discountAmount = pointsToUse * GS_PER_POINT;
  const totalToPay = Math.max(cartTotal - discountAmount, 0);

  function handlePointsChange(value: number) {
    const clamped = Math.max(0, Math.min(value, maxPointsUsable));
    setPointsToUse(clamped);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (cart.length === 0) {
      setError("Tu carrito está vacío.");
      return;
    }

    setLoading(true);

    const result = await createOrder(
      { fullName, phone, address, city, notes },
      cart.map((item) => ({
        variantId: item.id,
        quantity: item.quantity,
      })),
      pointsToUse
    );

    setLoading(false);

    if ("error" in result) {
      setError(result.error);
      return;
    }

    clearCart();
    router.push(`/pedido/${result.orderId}`);
  }

  if (cart.length === 0) {
    return (
      <p className="font-body text-sm text-ink/60">
        Tu carrito está vacío. Volvé a{" "}
        <Link href="/productos" className="underline underline-offset-4">
          productos
        </Link>{" "}
        para agregar algo antes de continuar.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_320px]">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Field label="Nombre y apellido">
          <input
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="input"
            type="text"
            autoComplete="name"
          />
        </Field>

        <Field label="Teléfono">
          <input
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="input"
            type="tel"
            autoComplete="tel"
            placeholder="+54 9 11 ..."
          />
        </Field>

        <Field label="Dirección">
          <input
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="input"
            type="text"
            autoComplete="street-address"
          />
        </Field>

        <Field label="Ciudad">
          <input
            required
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="input"
            type="text"
            autoComplete="address-level2"
          />
        </Field>

        <Field label="Notas (opcional)">
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="input min-h-24 resize-none"
            placeholder="Referencias de entrega, horarios, etc."
          />
        </Field>

        {error && <p className="font-body text-sm text-wine">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="mt-2 w-full rounded-full bg-ink py-3.5 font-body text-sm font-medium uppercase tracking-[0.1em] text-bone transition-colors hover:bg-amber hover:text-ink disabled:opacity-50"
        >
          {loading ? "Confirmando..." : "Confirmar pedido"}
        </button>
      </form>

      <aside className="h-fit rounded-card border border-ink/10 bg-paper p-6">
        <h2 className="font-display text-xl text-ink">Tu pedido</h2>
        <ul className="mt-4 flex flex-col gap-3">
          {cart.map((item) => (
            <li key={item.id} className="flex justify-between gap-3 text-sm">
              <span className="font-body text-ink/70">
                {item.quantity}× {item.name} ({item.sizeMl}ml)
              </span>
              <span className="font-mono text-ink">
                {formatPrice(item.price * item.quantity)}
              </span>
            </li>
          ))}
        </ul>

        {maxPointsUsable > 0 && (
          <div className="mt-5 border-t border-ink/10 pt-4">
            <div className="flex items-center justify-between">
              <span className="font-body text-xs uppercase tracking-wide text-ink/50">
                Usar puntos (tenés {formatPoints(availablePoints)})
              </span>
              <button
                type="button"
                onClick={() => handlePointsChange(maxPointsUsable)}
                className="font-body text-xs text-amber-ink underline underline-offset-4"
              >
                Usar máximo
              </button>
            </div>
            <input
              type="range"
              min={0}
              max={maxPointsUsable}
              value={pointsToUse}
              onChange={(e) => handlePointsChange(Number(e.target.value))}
              className="mt-2 w-full accent-amber"
            />
            <div className="mt-1 flex items-center justify-between font-mono text-xs text-ink/60">
              <span>{formatPoints(pointsToUse)} pts</span>
              <span>-{formatPrice(discountAmount)}</span>
            </div>
          </div>
        )}

        <div className="mt-5 flex items-center justify-between border-t border-ink/10 pt-4">
          <span className="font-body text-sm text-ink/60">Total a pagar</span>
          <span className="font-mono text-lg text-ink">
            {formatPrice(totalToPay)}
          </span>
        </div>
      </aside>
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="font-body text-xs font-medium uppercase tracking-wide text-ink/50">
        {label}
      </span>
      {children}
    </label>
  );
}