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
      <section className="border-b border-neutral-200">
        <div className="mx-auto max-w-6xl px-5 py-12 md:px-8 md:py-16">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-400">
            Canje de puntos
          </p>
          <h1 className="mt-2 font-display text-3xl text-black sm:text-4xl">
            Recompensas
          </h1>
          <p className="mt-3 font-body text-sm text-neutral-500">
            {user
              ? `Tenés ${formatPoints(userPoints)} puntos disponibles.`
              : "Iniciá sesión para ver tus puntos y canjear recompensas."}
          </p>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-5 py-10 md:px-8">
          {(rewards ?? []).length === 0 ? (
            <p className="font-body text-sm text-neutral-400">
              Próximamente nuevas recompensas.
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