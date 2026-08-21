import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?redirect=/admin");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", user.id)
    .maybeSingle();

  if (!profile?.is_admin) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-bone">
      <div className="border-b border-ink/10 bg-paper">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-6 px-5 py-4 md:px-8">
          <Link href="/admin" className="font-display text-lg text-ink">
            Panel Admin
          </Link>
          <nav className="flex flex-wrap gap-5">
            <Link
              href="/admin/productos"
              className="font-body text-sm text-ink/70 hover:text-ink"
            >
              Productos
            </Link>
            <Link
              href="/admin/pedidos"
              className="font-body text-sm text-ink/70 hover:text-ink"
            >
              Pedidos
            </Link>
            <Link
              href="/admin/clientes"
              className="font-body text-sm text-ink/70 hover:text-ink"
            >
              Clientes
            </Link>
            <Link
              href="/admin/recompensas"
              className="font-body text-sm text-ink/70 hover:text-ink"
            >
              Recompensas
            </Link>
            <Link
              href="/admin/canjes"
              className="font-body text-sm text-ink/70 hover:text-ink"
            >
              Canjes
            </Link>
          </nav>
          <Link
            href="/"
            className="ml-auto font-body text-sm text-ink/50 hover:text-ink"
          >
            ← Volver a la tienda
          </Link>
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-5 py-10 md:px-8">{children}</div>
    </div>
  );
}