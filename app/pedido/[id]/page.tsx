import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { buildOrderWhatsAppMessage, buildWhatsAppLink } from "@/lib/whatsapp";

function formatPrice(price: number) {
  return `$${price.toLocaleString("es-AR")}`;
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function PedidoPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(`/login?redirect=/pedido/${id}`);
  }

  const { data: order, error: orderError } = await supabase
    .from("orders")
    .select(
      "id, full_name, phone, address, city, notes, total, status, created_at, points_used, discount_amount, total_paid"
    )
    .eq("id", id)
    .single();

  if (orderError || !order) {
    notFound();
  }

  const { data: items } = await supabase
    .from("order_items")
    .select("id, product_name, product_brand, size_ml, unit_price, quantity, subtotal")
    .eq("order_id", id);

  const whatsappHref = buildWhatsAppLink(
    buildOrderWhatsAppMessage({
      id: order.id,
      fullName: order.full_name,
      phone: order.phone,
      address: order.address,
      city: order.city,
      notes: order.notes,
      total: order.total,
      pointsUsed: order.points_used,
      discountAmount: order.discount_amount,
      totalPaid: order.total_paid,
      items: (items ?? []).map((item) => ({
        quantity: item.quantity,
        brand: item.product_brand,
        name: item.product_name,
        sizeMl: item.size_ml,
        subtotal: item.subtotal,
      })),
    })
  );

  return (
    <main>
      <section className="border-b border-ink/10 bg-paper">
        <div className="mx-auto max-w-3xl px-5 py-16 md:px-8 md:py-20">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-amber-ink">
            Pedido confirmado
          </p>
          <h1 className="mt-3 font-display text-4xl text-ink sm:text-5xl">
            ¡Gracias, {order.full_name.split(" ")[0]}!
          </h1>
          <p className="mt-4 font-body text-sm leading-relaxed text-ink/60 sm:text-base">
            Registramos tu pedido. Enviánoslo por WhatsApp para coordinar el
            pago y la entrega.
          </p>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-3xl px-5 py-14 md:px-8">
          <div className="rounded-card border border-ink/10 bg-paper p-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="font-display text-xl text-ink">
                Pedido #{order.id.slice(0, 8)}
              </h2>
              <span className="rounded-full bg-amber/20 px-3 py-1 font-mono text-[11px] uppercase tracking-wide text-amber-ink">
                {order.status}
              </span>
            </div>

            <ul className="mt-6 flex flex-col gap-3 border-t border-ink/10 pt-5">
              {(items ?? []).map((item) => (
                <li key={item.id} className="flex justify-between gap-3 text-sm">
                  <span className="font-body text-ink/70">
                    {item.quantity}× {item.product_brand} — {item.product_name}
                    {item.size_ml ? ` (${item.size_ml}ml)` : ""}
                  </span>
                  <span className="font-mono text-ink">
                    {formatPrice(item.subtotal)}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-5 flex flex-col gap-1.5 border-t border-ink/10 pt-4">
              <div className="flex items-center justify-between">
                <span className="font-body text-sm text-ink/60">Subtotal</span>
                <span className="font-mono text-ink">
                  {formatPrice(order.total)}
                </span>
              </div>
              {order.points_used > 0 && (
                <div className="flex items-center justify-between">
                  <span className="font-body text-sm text-ink/60">
                    Descuento ({order.points_used} pts)
                  </span>
                  <span className="font-mono text-sage">
                    -{formatPrice(order.discount_amount)}
                  </span>
                </div>
              )}
              <div className="flex items-center justify-between">
                <span className="font-body text-sm font-medium text-ink">
                  Total a pagar
                </span>
                <span className="font-mono text-lg text-ink">
                  {formatPrice(order.total_paid)}
                </span>
              </div>
            </div>

            <div className="mt-6 border-t border-ink/10 pt-5 font-body text-sm leading-relaxed text-ink/60">
              <p>
                {order.full_name} — {order.phone}
              </p>
              <p>
                {order.address}, {order.city}
              </p>
              {order.notes && (
                <p className="mt-1 text-ink/45">Notas: {order.notes}</p>
              )}
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
              <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 font-body text-[13px] font-medium uppercase tracking-[0.12em] text-white transition-opacity hover:opacity-90"
            >
              Enviar pedido por WhatsApp
            </a>

            <Link
              href="/productos"
              className="inline-block rounded-full border border-ink px-6 py-3 font-body text-[13px] font-medium uppercase tracking-[0.12em] text-ink transition-colors hover:bg-ink hover:text-bone"
            >
              Seguir comprando
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}