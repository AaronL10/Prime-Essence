import { createClient } from "@/lib/supabase/server";
import RewardCard from "@/components/RewardCard";
import { formatPoints } from "@/lib/points";

export default async function CanjePage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  let userPoints = 0;

  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("points")
      .eq("id", user.id)
      .maybeSingle();
    userPoints = profile?.points ?? 0;
  }

  const { data: rewards } = await supabase
    .from("rewards")
    .select("id, name, description, image, points_cost, stock, active")
    .eq("active", true)
    .order("points_cost", { ascending: true });

  return (
    <main>
      <section className="border-b border-ink/10 bg-paper">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-amber-ink">
            Canje de puntos
          </p>
          <h1 className="mt-3 font-display text-4xl text-ink sm:text-5xl">
            Recompensas
          </h1>
          <p className="mt-4 font-body text-sm leading-relaxed text-ink/60 sm:text-base">
            {user
              ? `Tenés ${formatPoints(userPoints)} puntos disponibles.`
              : "Iniciá sesión para ver tus puntos y canjear recompensas."}
          </p>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-5 py-14 md:px-8">
          {(rewards ?? []).length === 0 ? (
            <p className="font-body text-sm text-ink/50">
              Todavía no hay recompensas cargadas.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {(rewards ?? []).map((r) => (
                <RewardCard
                  key={r.id}
                  id={r.id}
                  name={r.name}
                  description={r.description}
                  image={r.image}
                  pointsCost={r.points_cost}
                  stock={r.stock}
                  isLoggedIn={!!user}
                  userPoints={userPoints}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}