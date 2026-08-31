import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { formatPoints } from "@/lib/points";

export default async function CuentaPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?redirect=/cuenta");
  }

  const displayName =
    (user.user_metadata?.full_name as string | undefined) ??
    (user.user_metadata?.name as string | undefined) ??
    user.email?.split("@")[0] ??
    "Cliente";

  const { data: profile } = await supabase
    .from("profiles")
    .select("points")
    .eq("id", user.id)
    .maybeSingle();

  const points = profile?.points ?? 0;

  const { data: transactions } = await supabase
    .from("points_transactions")
    .select("id, amount, reason, order_id, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  const { data: redemptions } = await supabase
    .from("reward_redemptions")
    .select("id, reward_name, points_spent, status, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  // Próxima recompensa
  const REWARD_TIERS = [250, 500, 900, 2000];
  const nextTier = REWARD_TIERS.find((t) => t > points) ?? REWARD_TIERS[REWARD_TIERS.length - 1];
  const prevTier = REWARD_TIERS.filter((t) => t <= points).pop() ?? 0;
  const progress = Math.min(((points - prevTier) / (nextTier - prevTier)) * 100, 100);

  return (
    <main>
      {/* Header */}
      <section className="border-b border-neutral-200">
        <div className="mx-auto max-w-4xl px-5 py-12 md:px-8 md:py-16">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-400">
            Mi cuenta
          </p>
          <h1 className="mt-2 font-display text-3xl text-black sm:text-4xl">
            Hola, {displayName}
          </h1>
          <p className="mt-3 font-body text-sm text-neutral-500">
            Club de Decants — acumulá puntos y desbloqueá recompensas.
          </p>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-4xl px-5 py-10 md:px-8">
          {/* Tarjeta de puntos */}
          <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-6 md:p-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="font-body text-xs uppercase tracking-wide text-neutral-400">
                  Tenés
                </p>
                <p className="mt-1 font-mono text-4xl font-medium text-black">
                  {formatPoints(points)} pts
                </p>
              </div>
              <div className="flex gap-3">
                <Link
                  href="/canje"
                  className="rounded-full bg-black px-6 py-2.5 font-body text-[13px] font-semibold uppercase tracking-[0.1em] text-white transition-all hover:bg-neutral-800"
                >
                  Canjear mis puntos
                </Link>
                <Link
                  href="/canje"
                  className="rounded-full border border-neutral-200 px-6 py-2.5 font-body text-[13px] font-semibold uppercase tracking-[0.1em] text-black transition-all hover:bg-black hover:text-white"
                >
                  Ver recompensas
                </Link>
              </div>
            </div>

            {/* Barra de progreso */}
            <div className="mt-8">
              <div className="flex items-center justify-between">
                <p className="font-body text-sm text-neutral-500">
                  {points >= nextTier
                    ? "¡Ya podés canjear tu próxima recompensa!"
                    : `Te faltan ${formatPoints(nextTier - points)} puntos para desbloquear tu próximo beneficio.`}
                </p>
                <span className="font-mono text-xs text-neutral-400">
                  {formatPoints(prevTier)} / {formatPoints(nextTier)} pts
                </span>
              </div>
              <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-neutral-200">
                <div
                  className="h-full rounded-full bg-black transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>

          {/* Historial de movimientos */}
          <h2 className="mt-12 font-display text-xl text-black">
            Historial de puntos
          </h2>

          <div className="mt-4 overflow-x-auto rounded-xl border border-neutral-200">
            <table className="w-full text-left">
              <thead className="border-b border-neutral-200 bg-neutral-50 font-body text-xs uppercase tracking-wide text-neutral-400">
                <tr>
                  <th className="px-4 py-3">Fecha</th>
                  <th className="px-4 py-3">Motivo</th>
                  <th className="px-4 py-3">Pedido</th>
                  <th className="px-4 py-3 text-right">Puntos</th>
                </tr>
              </thead>
              <tbody className="font-body text-sm text-neutral-700">
                {(transactions ?? []).map((t) => (
                  <tr key={t.id} className="border-b border-neutral-100 last:border-0">
                    <td className="px-4 py-3 whitespace-nowrap">
                      {new Date(t.created_at).toLocaleDateString("es-AR")}
                    </td>
                    <td className="px-4 py-3 capitalize">{t.reason}</td>
                    <td className="px-4 py-3 font-mono text-xs text-neutral-400">
                      {t.order_id ? `#${t.order_id.slice(0, 8)}` : "—"}
                    </td>
                    <td
                      className={`px-4 py-3 text-right font-mono font-medium ${
                        t.amount >= 0 ? "text-black" : "text-neutral-500"
                      }`}
                    >
                      {t.amount >= 0 ? "+" : ""}
                      {formatPoints(t.amount)}
                    </td>
                  </tr>
                ))}
                {(transactions ?? []).length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-4 py-6 text-center text-neutral-400">
                      Todavía no tenés movimientos de puntos.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Recompensas canjeadas */}
          <h2 className="mt-12 font-display text-xl text-black">
            Recompensas canjeadas
          </h2>

          <div className="mt-4 overflow-x-auto rounded-xl border border-neutral-200">
            <table className="w-full text-left">
              <thead className="border-b border-neutral-200 bg-neutral-50 font-body text-xs uppercase tracking-wide text-neutral-400">
                <tr>
                  <th className="px-4 py-3">Fecha</th>
                  <th className="px-4 py-3">Recompensa</th>
                  <th className="px-4 py-3">Puntos</th>
                  <th className="px-4 py-3 text-right">Estado</th>
                </tr>
              </thead>
              <tbody className="font-body text-sm text-neutral-700">
                {(redemptions ?? []).map((r) => (
                  <tr key={r.id} className="border-b border-neutral-100 last:border-0">
                    <td className="px-4 py-3 whitespace-nowrap">
                      {new Date(r.created_at).toLocaleDateString("es-AR")}
                    </td>
                    <td className="px-4 py-3">{r.reward_name}</td>
                    <td className="px-4 py-3 font-mono">{formatPoints(r.points_spent)}</td>
                    <td className="px-4 py-3 text-right">
                      <span className="inline-flex rounded-full border border-neutral-200 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide text-neutral-500">
                        {r.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {(redemptions ?? []).length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-4 py-6 text-center text-neutral-400">
                      Todavía no canjeaste ninguna recompensa.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <Link
            href="/productos"
            className="mt-8 inline-block rounded-full bg-black px-6 py-3 font-body text-[13px] font-semibold uppercase tracking-[0.12em] text-white transition-all hover:bg-neutral-800"
          >
            Seguir comprando
          </Link>
        </div>
      </section>
    </main>
  );
}