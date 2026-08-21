"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

type ActionResult = { success: true; redemptionId: string } | { error: string };

export async function redeemPoints(points: number): Promise<ActionResult> {
  const supabase = await createClient();

  const { data, error } = await supabase.rpc("redeem_points", {
    p_points: points,
  });

  if (error) {
    console.error("Error al canjear puntos:", error.message);
    return { error: error.message.includes("suficientes")
      ? "No tenés suficientes puntos para este canje."
      : error.message.includes("disponible sin usar")
      ? "Ya tenés un descuento disponible sin usar. Usalo o esperá a que se aplique a un pedido."
      : "No se pudo procesar el canje." };
  }

  revalidatePath("/cuenta");

  return { success: true, redemptionId: data as string };
}