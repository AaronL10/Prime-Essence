import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import CheckoutForm from "@/components/CheckoutForm";

export default async function CheckoutPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?redirect=/checkout");
  }

  const defaultName =
    (user.user_metadata?.full_name as string | undefined) ??
    (user.user_metadata?.name as string | undefined) ??
    "";

  const { data: profile } = await supabase
    .from("profiles")
    .select("points")
    .eq("id", user.id)
    .maybeSingle();

  return (
    <main>
      <section className="border-b border-ink/10 bg-paper">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-amber-ink">
            Checkout
          </p>
          <h1 className="mt-3 font-display text-4xl text-ink sm:text-5xl">
            Datos de envío
          </h1>
          <p className="mt-4 font-body text-sm leading-relaxed text-ink/60 sm:text-base">
            Completá tus datos para confirmar el pedido.
          </p>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-3xl px-5 py-14 md:px-8">
          <CheckoutForm
            defaultName={defaultName}
            availablePoints={profile?.points ?? 0}
          />
        </div>
      </section>
    </main>
  );
}