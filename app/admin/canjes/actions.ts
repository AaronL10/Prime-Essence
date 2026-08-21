"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

const VALID_STATUSES = ["pendiente", "entregado", "cancelado"] as const;

export type RedemptionStatus = (typeof VALID_STATUSES)[number];

type ActionResult = { success: true } | { error: string };

export async function updateRedemptionStatus(
  redemptionId: string,
  status: RedemptionStatus
): Promise<ActionResult> {
  if (!VALID_STATUSES.includes(status)) {
    return { error: "Estado inválido." };
  }

  const supabase = await createClient();

  const { error } = await supabase.rpc("admin_set_redemption_status", {
    p_redemption_id: redemptionId,
    p_new_status: status,
  });

  if (error) {
    console.error("Error al actualizar canje:", error.message);
    return {
      error:
        error.message.includes("suficientes") || error.message.includes("stock")
          ? error.message
          : "No se pudo actualizar el canje.",
    };
  }

  revalidatePath("/admin/canjes");
  revalidatePath("/admin/recompensas");
  revalidatePath("/admin/clientes");
  revalidatePath("/canje");
  return { success: true };
}