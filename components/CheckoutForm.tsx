"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent, type ReactNode } from "react";
import { useCart } from "@/context/CartContext";
import { createOrder } from "@/app/checkout/actions";

function formatPrice(price: number) {
  return `Gs. ${price.toLocaleString("es-AR")}`;
}

interface CheckoutFormProps {
  defaultName: string;
}

export default function CheckoutForm({ defaultName }: CheckoutFormProps) {
  const { cart, cartTotal, clearCart } = useCart();
  const router = useRouter();

  const [fullName, setFullName] = useState(defaultName);
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
      }))
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
      <p className="font-body text-sm text-neutral-500">
        Tu carrito está vacío. Volvé a{" "}
        <Link href="/productos" className="underline underline-offset-4 hover:text-black">
          productos
        </Link>{" "}
        para agregar algo antes de continuar.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_340px]">
      {/* Formulario */}
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
            placeholder="+595 981 000 000"
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

        {error && <p className="font-body text-sm text-neutral-600">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="mt-2 w-full rounded-full bg-black py-4 font-body text-sm font-semibold uppercase tracking-[0.1em] text-white transition-all hover:bg-neutral-800 disabled:opacity-50"
        >
          {loading ? "Confirmando..." : "Confirmar pedido"}
        </button>
      </form>

      {/* Resumen */}
      <aside className="h-fit rounded-xl border border-neutral-200 bg-neutral-50 p-6 lg:p-8">
        <h2 className="font-display text-xl text-black">Tu pedido</h2>
        <ul className="mt-5 flex flex-col gap-3">
          {cart.map((item) => (
            <li key={item.id} className="flex justify-between gap-3 text-sm">
              <span className="font-body text-neutral-600">
                {item.quantity}× {item.name} ({item.sizeMl}ml)
              </span>
              <span className="font-mono text-black">
                {formatPrice(item.price * item.quantity)}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-5 border-t border-neutral-200 pt-5">
          <div className="flex items-center justify-between">
            <span className="font-body text-base font-medium text-black">Total</span>
            <span className="font-mono text-2xl font-medium text-black">
              {formatPrice(cartTotal)}
            </span>
          </div>
        </div>

        <p className="mt-3 font-body text-xs text-neutral-400">
          Envío y forma de pago se coordinan por WhatsApp luego de confirmar el pedido.
        </p>
      </aside>
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="font-body text-xs font-medium uppercase tracking-wide text-neutral-400">
        {label}
      </span>
      {children}
    </label>
  );
}