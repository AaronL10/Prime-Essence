import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { formatPoints } from "@/lib/points";
import AdjustPointsForm from "@/components/admin/AdjustPointsForm";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminClienteDetailPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("id, email, points, is_admin")
    .eq("id", id)
    .single();

  if (error || !profile) {
    notFound();
  }

  const { data: transactions } = await supabase
    .from("points_transactions")
    .select("id, amount, reason, created_at")
    .eq("user_id", id)
    .order("created_at", { ascending: false });

  return (
    <div>
      <h1 className="font-display text-3xl text-ink">
        {profile.email ?? "Cliente"}
      </h1>
      <p className="mt-2 font-mono text-2xl text-ink">
        {formatPoints(profile.points)} pts
      </p>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_320px]">
        <div className="overflow-x-auto rounded-card border border-ink/10 bg-paper">
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
                    Sin movimientos todavía.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <AdjustPointsForm userId={profile.id} />
      </div>
    </div>
  );
}