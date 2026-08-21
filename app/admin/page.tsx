import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { LOW_STOCK_THRESHOLD } from "@/lib/stock";

export default async function AdminDashboard() {
  const supabase = await createClient();

  const { count: productCount } = await supabase
    .from("products")
    .select("*", { count: "exact", head: true });

  const { count: orderCount } = await supabase
    .from("orders")
    .select("*", { count: "exact", head: true });

  const { count: pendingCount } = await supabase
    .from("orders")
    .select("*", { count: "exact", head: true })
    .eq("status", "pendiente");

  const { count: lowStockCount } = await supabase
    .from("product_variants")
    .select("*", { count: "exact", head: true })
    .lte("stock", LOW_STOCK_THRESHOLD);

  return (
    <div>
      <h1 className="font-display text-3xl text-ink">Dashboard</h1>

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Productos"
          value={productCount ?? 0}
          href="/admin/productos"
        />
        <StatCard
          label="Pedidos totales"
          value={orderCount ?? 0}
          href="/admin/pedidos"
        />
        <StatCard
          label="Pedidos pendientes"
          value={pendingCount ?? 0}
          href="/admin/pedidos"
        />
        <StatCard
          label="Tamaños con stock bajo"
          value={lowStockCount ?? 0}
          href="/admin/productos"
          alert={(lowStockCount ?? 0) > 0}
        />
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  href,
  alert,
}: {
  label: string;
  value: number;
  href: string;
  alert?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`block rounded-card border p-6 transition-colors ${
        alert
          ? "border-wine/40 bg-wine/5 hover:border-wine"
          : "border-ink/10 bg-paper hover:border-amber/50"
      }`}
    >
      <p
        className={`font-mono text-3xl ${alert ? "text-wine" : "text-ink"}`}
      >
        {value}
      </p>
      <p className="mt-1 font-body text-sm text-ink/60">{label}</p>
    </Link>
  );
}