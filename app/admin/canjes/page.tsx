import { createClient } from "@/lib/supabase/server";
import { formatPoints } from "@/lib/points";
import RedemptionStatusSelect from "@/components/admin/RedemptionStatusSelect";

export default async function AdminCanjesPage() {
  const supabase = await createClient();

  const { data: redemptions } = await supabase
    .from("reward_redemptions")
    .select("id, reward_name, points_spent, status, created_at, user_id")
    .order("created_at", { ascending: false });

  const userIds = Array.from(new Set((redemptions ?? []).map((r) => r.user_id)));
  let emailsById: Record<string, string> = {};

  if (userIds.length > 0) {
    const { data: profiles } = await supabase
      .from("profiles")
      .select("id, email")
      .in("id", userIds);
    emailsById = Object.fromEntries(
      (profiles ?? []).map((p) => [p.id, p.email ?? "—"])
    );
  }

  return (
    <div>
      <h1 className="font-display text-3xl text-ink">Canjes</h1>

      <div className="mt-8 overflow-x-auto rounded-card border border-ink/10 bg-paper">
        <table className="w-full text-left">
          <thead className="border-b border-ink/10 font-body text-xs uppercase tracking-wide text-ink/50">
            <tr>
              <th className="px-4 py-3">Cliente</th>
              <th className="px-4 py-3">Recompensa</th>
              <th className="px-4 py-3">Puntos</th>
              <th className="px-4 py-3">Fecha</th>
              <th className="px-4 py-3 text-right">Estado</th>
            </tr>
          </thead>
          <tbody className="font-body text-sm text-ink/80">
            {(redemptions ?? []).map((r) => (
              <tr key={r.id} className="border-b border-ink/5 last:border-0">
                <td className="px-4 py-3">{emailsById[r.user_id] ?? "—"}</td>
                <td className="px-4 py-3">{r.reward_name}</td>
                <td className="px-4 py-3 font-mono">
                  {formatPoints(r.points_spent)}
                </td>
                <td className="px-4 py-3">
                  {new Date(r.created_at).toLocaleDateString("es-AR")}
                </td>
                <td className="px-4 py-3 text-right">
                  <RedemptionStatusSelect
                    redemptionId={r.id}
                    currentStatus={r.status}
                  />
                </td>
              </tr>
            ))}
            {(redemptions ?? []).length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-ink/40">
                  Todavía no hay canjes.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}