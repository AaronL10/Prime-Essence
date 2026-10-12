import { createClient } from "@/lib/supabase/server";

export default async function DebugCuentaPage() {
  const supabase = await createClient();
  const results: any = {};

  // 1. Verificar sesión
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  results.user = user ? { id: user.id, email: user.email } : null;
  results.userError = userError?.message ?? null;

  // 2. Verificar tabla profiles (o la que uses para puntos)
  if (user) {
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();
    
    results.profile = profile;
    results.profileError = profileError?.message ?? null;

    // 3. Verificar tabla de puntos (ajustá el nombre si es diferente)
    const { data: points, error: pointsError } = await supabase
      .from("user_points")
      .select("*")
      .eq("user_id", user.id)
      .single();
    
    results.points = points;
    results.pointsError = pointsError?.message ?? null;

    // 4. Verificar pedidos/órdenes
    const { data: orders, error: ordersError } = await supabase
      .from("orders")
      .select("*")
      .eq("user_id", user.id);
    
    results.orders = orders;
    results.ordersError = ordersError?.message ?? null;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Debug Cuenta</h1>
      <pre className="bg-gray-100 p-4 rounded overflow-auto text-sm">
        {JSON.stringify(results, null, 2)}
      </pre>
    </div>
  );
}