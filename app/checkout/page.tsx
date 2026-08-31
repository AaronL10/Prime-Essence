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

  return (
    <main>
      <section className="border-b border-neutral-200">
        <div className="mx-auto max-w-6xl px-5 py-12 md:px-8 md:py-16">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-400">
            Checkout
          </p>
          <h1 className="mt-2 font-display text-3xl text-black sm:text-4xl">
            Datos de envío
          </h1>
          <p className="mt-3 font-body text-sm text-neutral-500">
            Completá tus datos para confirmar el pedido.
          </p>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-3xl px-5 py-10 md:px-8">
          <CheckoutForm defaultName={defaultName} />
        </div>
      </section>
    </main>
  );
}