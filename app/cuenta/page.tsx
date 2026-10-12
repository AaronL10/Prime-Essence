import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { formatPoints, GS_PER_POINT } from "@/lib/points";
import RedeemPointsPanel from "@/components/RedeemPointsPanel";

export const metadata = {
  title: "Mi cuenta | Prime Essence",
};

export default async function CuentaPage() {
  const supabase = await createClient();

  // 1. Usuario logueado (si no, al login)
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // 2. Perfil con puntos
  const { data: profile } = await supabase
    .from("profiles")
    .select("points, full_name")
    .eq("id", user.id)
    .maybeSingle();

  const points = profile?.points ?? 0;
  const displayName =
    profile?.full_name ??
    (user.user_metadata?.full_name as string | undefined) ??
    (user.user_metadata?.name as string | undefined) ??
    user.email?.split("@")[0] ??
    "";

  // 3. Descuento activo (canje existente sin usar)
  const { data: activeRedemption } = await supabase
    .from("redemptions")
    .select("id, points_used, discount_percent")
    .eq("user_id", user.id)
    .eq("status", "active")
    .maybeSingle();

  // 4. Historial de movimientos (opcional, si tenés la tabla points_ledger)
  const { data: ledger } = await supabase
    .from("points_ledger")
    .select("id, points, reason, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(20);

  return (
    <main className="mx-auto min-h-screen max-w-3xl px-5 pb-24 pt-28 md:px-8">
      {/* Saludo */}
      <p className="font-body text-xs uppercase tracking-[0.2em] text-neutral-400">
        Mi cuenta
      </p>
      <h1 className="mt-2 font-display text-4xl text-black">
        Hola, {displayName}
      </h1>
      <p className="mt-1 font-body text-sm text-neutral-500">{user.email}</p>

      {/* Tarjeta de puntos */}
      <div className="mt-10 rounded-2xl border border-neutral-200 bg-black p-8 text-white">
        <p className="font-body text-xs uppercase tracking-[0.2em] text-white/60">
          Tus puntos
        </p>
        <p className="mt-3 font-mono text-6xl font-medium">
          {formatPoints(points)}
        </p>
        <p className="mt-3 font-body text-sm text-white/60">
          = Gs. {(points * GS_PER_POINT).toLocaleString("es-AR")} en valor
        </p>
        <Link
          href="/productos"
          className="mt-6 inline-block rounded-full bg-white px-6 py-2.5 font-body text-[12px] font-semibold uppercase tracking-[0.12em] text-black transition-colors hover:bg-amber"
        >
          Seguir comprando
        </Link>
      </div>

      {/* Panel de canje (usa tu actions.ts y RPC redeem_points) */}
      <RedeemPointsPanel
        balance={points}
        activeRedemption={activeRedemption ?? null}
      />

      {/* Historial (solo si existe la tabla points_ledger) */}
      {ledger && ledger.length > 0 && (
        <div className="mt-10">
          <h2 className="font-display text-2xl text-black">Movimientos</h2>
          <ul className="mt-4 divide-y divide-neutral-200 rounded-2xl border border-neutral-200 bg-white">
            {ledger.map((entry) => (
              <li
                key={entry.id}
                className="flex items-center justify-between px-5 py-4"
              >
                <div>
                  <p className="font-body text-sm text-black">
                    {entry.reason ?? "Movimiento de puntos"}
                  </p>
                  <p className="font-mono text-[11px] text-neutral-400">
                    {new Date(entry.created_at).toLocaleDateString("es-AR")}
                  </p>
                </div>
                <span
                  className={`font-mono text-sm font-medium ${
                    entry.points >= 0 ? "text-green-700" : "text-wine"
                  }`}
                >
                  {entry.points >= 0 ? "+" : ""}
                  {formatPoints(entry.points)} pts
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Cerrar sesión */}
      <form action="/auth/logout" method="post" className="mt-12">
        <button
          type="submit"
          className="rounded-full border border-neutral-200 px-6 py-2.5 font-body text-[12px] font-semibold uppercase tracking-[0.12em] text-black transition-all hover:bg-black hover:text-white"
        >
          Cerrar sesión
        </button>
      </form>
    </main>
  );
}