"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

type ActionResult = { success: true; redemptionId: string } | { error: string };

export async function redeemReward(rewardId: string): Promise<ActionResult> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Debés iniciar sesión para canjear." };
  }

  const { data, error } = await supabase.rpc("redeem_reward", {
    p_reward_id: rewardId,
  });

  if (error) {
    console.error("Error al canjear recompensa:", error.message);

    if (error.message.includes("insuficientes")) {
      return { error: "No tenés puntos suficientes." };
    }
    if (error.message.includes("stock")) {
      return { error: "Esta recompensa ya no tiene stock." };
    }
    return { error: "No se pudo procesar el canje." };
  }

  revalidatePath("/canje");
  revalidatePath("/cuenta");

  return { success: true, redemptionId: data as string };
}