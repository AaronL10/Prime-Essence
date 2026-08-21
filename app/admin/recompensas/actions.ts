"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export interface RewardFormInput {
  name: string;
  description: string;
  image: string;
  points_cost: number;
  stock: number;
  active: boolean;
}

type ActionResult = { success: true } | { error: string };

export async function createReward(
  input: RewardFormInput
): Promise<ActionResult> {
  const supabase = await createClient();

  const { error } = await supabase.from("rewards").insert(input);

  if (error) {
    console.error("Error al crear recompensa:", error.message);
    return { error: "No se pudo crear la recompensa." };
  }

  revalidatePath("/admin/recompensas");
  revalidatePath("/canje");
  return { success: true };
}

export async function updateReward(
  id: string,
  input: RewardFormInput
): Promise<ActionResult> {
  const supabase = await createClient();

  const { error } = await supabase.from("rewards").update(input).eq("id", id);

  if (error) {
    console.error("Error al actualizar recompensa:", error.message);
    return { error: "No se pudo actualizar la recompensa." };
  }

  revalidatePath("/admin/recompensas");
  revalidatePath("/canje");
  return { success: true };
}

export async function deleteReward(id: string): Promise<ActionResult> {
  const supabase = await createClient();

  const { error } = await supabase.from("rewards").delete().eq("id", id);

  if (error) {
    console.error("Error al eliminar recompensa:", error.message);
    return { error: "No se pudo eliminar la recompensa." };
  }

  revalidatePath("/admin/recompensas");
  revalidatePath("/canje");
  return { success: true };
}