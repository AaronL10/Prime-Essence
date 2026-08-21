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

  const { data: profile } = await supabase
    .from("profiles")
    .select("points")
    .eq("id", user.id)
    .maybeSingle();

  const { data: transactions } = await supabase
    .from("points_transactions")
    .select("id, amount, reason, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  const { data: redemptions } = await supabase
    .from("reward_redemptions")
    .select("id, reward_name, points_spent, status, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return (
    <main>
      <section className="border-b border-ink/10 bg-paper">
        <div className="mx-auto max-w-4xl px-5 py-16 md:px-8 md:py-20">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-amber-ink">
            Mi cuenta
          </p>
          <h1 className="mt-3 font-display text-4xl text-ink sm:text-5xl">
            Puntos Prime
          </h1>
          <p className="mt-4 font-body text-sm leading-relaxed text-ink/60 sm:text-base">
            Ganás 1 punto por cada 1000 Gs pagados en compras confirmadas.
          </p>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-4xl px-5 py-14 md:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-card border border-amber/40 bg-amber/10 p-6">
            <div>
              <p className="font-body text-xs uppercase tracking-wide text-amber-ink">
                Saldo actual
              </p>
              <p className="mt-2 font-mono text-4xl text-ink">
                {formatPoints(profile?.points ?? 0)} pts
              </p>
            </div>
            <Link
              href="/canje"
              className="rounded-full bg-ink px-5 py-2.5 font-body text-[13px] font-medium uppercase tracking-[0.1em] text-bone transition-colors hover:bg-amber hover:text-ink"
            >
              Ver recompensas
            </Link>
          </div>

          <h2 className="mt-10 font-display text-xl text-ink">
            Historial de movimientos
          </h2>

          <div className="mt-4 overflow-x-auto rounded-card border border-ink/10 bg-paper">
            <table className="w-full text-left">
              <thead className="border-b border-ink/10 font-body text-xs uppercase tracking-wide text-ink/50">
                <tr>
                  <th className="px-4 py-3">Fecha</th>
                  <th className="px-4 py-3">Motivo</th>
                  <th className="px-4 py-3 text-right">Puntos</th>
                </tr>
              </thead>
              <tbody className="font-body text-sm text-ink/80">
                {(transactions ?? []).map((t) => (
                  <tr key={t.id} className="border-b border-ink/5 last:border-0">
                    <td className="px-4 py-3">
                      {new Date(t.created_at).toLocaleDateString("es-AR")}
                    </td>
                    <td className="px-4 py-3 capitalize">{t.reason}</td>
                    <td
                      className={`px-4 py-3 text-right font-mono ${
                        t.amount >= 0 ? "text-sage" : "text-wine"
                      }`}
                    >
                      {t.amount >= 0 ? "+" : ""}
                      {formatPoints(t.amount)}
                    </td>
                  </tr>
                ))}
                {(transactions ?? []).length === 0 && (
                  <tr>
                    <td colSpan={3} className="px-4 py-6 text-center text-ink/40">
                      Todavía no tenés movimientos de puntos.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <h2 className="mt-10 font-display text-xl text-ink">
            Recompensas canjeadas
          </h2>

          <div className="mt-4 overflow-x-auto rounded-card border border-ink/10 bg-paper">
            <table className="w-full text-left">
              <thead className="border-b border-ink/10 font-body text-xs uppercase tracking-wide text-ink/50">
                <tr>
                  <th className="px-4 py-3">Fecha</th>
                  <th className="px-4 py-3">Recompensa</th>
                  <th className="px-4 py-3">Puntos</th>
                  <th className="px-4 py-3 text-right">Estado</th>
                </tr>
              </thead>
              <tbody className="font-body text-sm text-ink/80">
                {(redemptions ?? []).map((r) => (
                  <tr key={r.id} className="border-b border-ink/5 last:border-0">
                    <td className="px-4 py-3">
                      {new Date(r.created_at).toLocaleDateString("es-AR")}
                    </td>
                    <td className="px-4 py-3">{r.reward_name}</td>
                    <td className="px-4 py-3 font-mono">
                      {formatPoints(r.points_spent)}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className="rounded-full bg-ink/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide text-ink/60">
                        {r.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {(redemptions ?? []).length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-4 py-6 text-center text-ink/40">
                      Todavía no canjeaste ninguna recompensa.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <Link
            href="/productos"
            className="mt-8 inline-block rounded-full bg-ink px-6 py-3 font-body text-[13px] font-medium uppercase tracking-[0.12em] text-bone transition-colors hover:bg-amber hover:text-ink"
          >
            Seguir comprando
          </Link>
        </div>
      </section>
    </main>
  );
}