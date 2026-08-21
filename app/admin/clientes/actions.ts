    "use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

type ActionResult = { success: true } | { error: string };

export async function adjustPoints(
  userId: string,
  amount: number,
  reason: string
): Promise<ActionResult> {
  if (!reason.trim()) {
    return { error: "Ingresá un motivo para el ajuste." };
  }

  if (!Number.isFinite(amount) || amount === 0) {
    return { error: "Ingresá una cantidad de puntos distinta de cero." };
  }

  const supabase = await createClient();

  const { error } = await supabase.rpc("admin_adjust_points", {
    p_user_id: userId,
    p_amount: Math.trunc(amount),
    p_reason: reason.trim(),
  });

  if (error) {
    console.error("Error al ajustar puntos:", error.message);
    return { error: "No se pudo ajustar los puntos." };
  }

  revalidatePath(`/admin/clientes/${userId}`);
  revalidatePath("/admin/clientes");
  return { success: true };
}