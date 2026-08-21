"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

const VALID_STATUSES = [
  "pendiente",
  "confirmado",
  "enviado",
  "entregado",
  "cancelado",
] as const;

export type OrderStatus = (typeof VALID_STATUSES)[number];

type ActionResult = { success: true } | { error: string };

export async function updateOrderStatus(
  orderId: string,
  status: OrderStatus
): Promise<ActionResult> {
  if (!VALID_STATUSES.includes(status)) {
    return { error: "Estado inválido." };
  }

  const supabase = await createClient();

  const { error } = await supabase.rpc("admin_set_order_status", {
    p_order_id: orderId,
    p_new_status: status,
  });

  if (error) {
    console.error("Error al actualizar estado del pedido:", error.message);
    return { error: "No se pudo actualizar el estado." };
  }

  revalidatePath("/admin/pedidos");
  revalidatePath(`/admin/pedidos/${orderId}`);
  revalidatePath("/admin/productos");
  revalidatePath("/admin/clientes");
  revalidatePath("/productos");
  revalidatePath("/");

  return { success: true };
}