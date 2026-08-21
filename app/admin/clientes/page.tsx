import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { formatPoints } from "@/lib/points";

export default async function AdminClientesPage() {
  const supabase = await createClient();

  const { data: profiles } = await supabase
    .from("profiles")
    .select("id, email, points, is_admin")
    .order("points", { ascending: false });

  return (
    <div>
      <h1 className="font-display text-3xl text-ink">Clientes</h1>

      <div className="mt-8 overflow-x-auto rounded-card border border-ink/10 bg-paper">
        <table className="w-full text-left">
          <thead className="border-b border-ink/10 font-body text-xs uppercase tracking-wide text-ink/50">
            <tr>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Puntos</th>
              <th className="px-4 py-3"></th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="font-body text-sm text-ink/80">
            {(profiles ?? []).map((p) => (
              <tr key={p.id} className="border-b border-ink/5 last:border-0">
                <td className="px-4 py-3">{p.email ?? "—"}</td>
                <td className="px-4 py-3 font-mono">
                  {formatPoints(p.points)}
                </td>
                <td className="px-4 py-3">
                  {p.is_admin && (
                    <span className="rounded-full bg-amber/20 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide text-amber-ink">
                      Admin
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/admin/clientes/${p.id}`}
                    className="text-ink/60 underline underline-offset-4 hover:text-ink"
                  >
                    Ver
                  </Link>
                </td>
              </tr>
            ))}
            {(profiles ?? []).length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-center text-ink/40">
                  Todavía no hay clientes registrados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}