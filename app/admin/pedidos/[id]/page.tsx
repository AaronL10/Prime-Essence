import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import OrderStatusSelect from "@/components/admin/OrderStatusSelect";

function formatPrice(price: number) {
  return `$${price.toLocaleString("es-AR")}`;
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminPedidoDetailPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: order, error } = await supabase
    .from("orders")
    .select("id, full_name, phone, address, city, notes, total, status, created_at")
    .eq("id", id)
    .single();

  if (error || !order) {
    notFound();
  }

  const { data: items } = await supabase
    .from("order_items")
    .select("id, product_name, product_brand, size_ml, unit_price, quantity, subtotal")
    .eq("order_id", id);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-3xl text-ink">
          Pedido #{order.id.slice(0, 8)}
        </h1>
        <OrderStatusSelect orderId={order.id} currentStatus={order.status} />
      </div>

      <div className="mt-8 rounded-card border border-ink/10 bg-paper p-6">
        <h2 className="font-display text-lg text-ink">Productos</h2>
        <ul className="mt-4 flex flex-col gap-3 border-t border-ink/10 pt-4">
          {(items ?? []).map((item) => (
            <li key={item.id} className="flex justify-between text-sm">
              <span className="text-ink/70">
                {item.quantity}× {item.product_brand} — {item.product_name}
                {item.size_ml ? ` (${item.size_ml}ml)` : ""}
              </span>
              <span className="font-mono text-ink">
                {formatPrice(item.subtotal)}
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex justify-between border-t border-ink/10 pt-4">
          <span className="text-sm text-ink/60">Total</span>
          <span className="font-mono text-lg text-ink">
            {formatPrice(order.total)}
          </span>
        </div>
      </div>

      <div className="mt-6 rounded-card border border-ink/10 bg-paper p-6 font-body text-sm leading-relaxed text-ink/70">
        <h2 className="font-display text-lg text-ink">Datos de contacto</h2>
        <p className="mt-3">
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
  );
}