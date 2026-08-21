import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

function formatPrice(price: number) {
  return `$${price.toLocaleString("es-AR")}`;
}

export default async function AdminPedidosPage() {
  const supabase = await createClient();

  const { data: orders } = await supabase
    .from("orders")
    .select("id, full_name, city, total, status, created_at")
    .order("created_at", { ascending: false });

  return (
    <div>
      <h1 className="font-display text-3xl text-ink">Pedidos</h1>

      <div className="mt-8 overflow-x-auto rounded-card border border-ink/10 bg-paper">
        <table className="w-full text-left">
          <thead className="border-b border-ink/10 font-body text-xs uppercase tracking-wide text-ink/50">
            <tr>
              <th className="px-4 py-3">Pedido</th>
              <th className="px-4 py-3">Cliente</th>
              <th className="px-4 py-3">Ciudad</th>
              <th className="px-4 py-3">Total</th>
              <th className="px-4 py-3">Estado</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="font-body text-sm text-ink/80">
            {(orders ?? []).map((order) => (
              <tr key={order.id} className="border-b border-ink/5 last:border-0">
                <td className="px-4 py-3 font-mono text-xs">
                  #{order.id.slice(0, 8)}
                </td>
                <td className="px-4 py-3">{order.full_name}</td>
                <td className="px-4 py-3">{order.city}</td>
                <td className="px-4 py-3 font-mono">
                  {formatPrice(order.total)}
                </td>
                <td className="px-4 py-3">
                  <span className="rounded-full bg-amber/20 px-2.5 py-1 font-mono text-[11px] uppercase tracking-wide text-amber-ink">
                    {order.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/admin/pedidos/${order.id}`}
                    className="text-ink/60 underline underline-offset-4 hover:text-ink"
                  >
                    Ver
                  </Link>
                </td>
              </tr>
            ))}
            {(orders ?? []).length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-center text-ink/40">
                  Todavía no hay pedidos.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}