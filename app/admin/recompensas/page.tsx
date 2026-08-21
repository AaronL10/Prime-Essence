import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import DeleteRewardButton from "@/components/admin/DeleteRewardButton";
import { formatPoints } from "@/lib/points";

export default async function AdminRecompensasPage() {
  const supabase = await createClient();

  const { data: rewards } = await supabase
    .from("rewards")
    .select("id, name, points_cost, stock, active")
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-3xl text-ink">Recompensas</h1>
        <Link
          href="/admin/recompensas/nuevo"
          className="rounded-full bg-ink px-5 py-2.5 font-body text-[13px] font-medium uppercase tracking-[0.1em] text-bone transition-colors hover:bg-amber hover:text-ink"
        >
          + Nueva recompensa
        </Link>
      </div>

      <div className="mt-8 overflow-x-auto rounded-card border border-ink/10 bg-paper">
        <table className="w-full text-left">
          <thead className="border-b border-ink/10 font-body text-xs uppercase tracking-wide text-ink/50">
            <tr>
              <th className="px-4 py-3">Nombre</th>
              <th className="px-4 py-3">Costo</th>
              <th className="px-4 py-3">Stock</th>
              <th className="px-4 py-3">Estado</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="font-body text-sm text-ink/80">
            {(rewards ?? []).map((r) => (
              <tr key={r.id} className="border-b border-ink/5 last:border-0">
                <td className="px-4 py-3">{r.name}</td>
                <td className="px-4 py-3 font-mono">
                  {formatPoints(r.points_cost)}
                </td>
                <td className="px-4 py-3 font-mono">{r.stock}</td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide ${
                      r.active
                        ? "bg-sage/15 text-sage"
                        : "bg-ink/10 text-ink/50"
                    }`}
                  >
                    {r.active ? "Activa" : "Inactiva"}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-3">
                    <Link
                      href={`/admin/recompensas/${r.id}`}
                      className="text-ink/60 underline underline-offset-4 hover:text-ink"
                    >
                      Editar
                    </Link>
                    <DeleteRewardButton id={r.id} name={r.name} />
                  </div>
                </td>
              </tr>
            ))}
            {(rewards ?? []).length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-ink/40">
                  Todavía no hay recompensas.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}