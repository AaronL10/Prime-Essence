"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export interface ProductFormInput {
  slug: string;
  name: string;
  brand: string;
  description: string;
  price: number;
  image: string;
  stock: number;
}

type ActionResult = { success: true } | { error: string };

export async function createProduct(
  input: ProductFormInput
): Promise<ActionResult> {
  const supabase = await createClient();

  const { error } = await supabase.from("products").insert(input);

  if (error) {
    console.error("Error al crear producto:", error.message);
    return { error: "No se pudo crear el producto." };
  }

  revalidatePath("/admin/productos");
  revalidatePath("/productos");
  revalidatePath("/");
  return { success: true };
}

export async function updateProduct(
  id: string,
  input: ProductFormInput
): Promise<ActionResult> {
  const supabase = await createClient();

  const { error } = await supabase.from("products").update(input).eq("id", id);

  if (error) {
    console.error("Error al actualizar producto:", error.message);
    return { error: "No se pudo actualizar el producto." };
  }

  revalidatePath("/admin/productos");
  revalidatePath("/productos");
  revalidatePath("/");
  return { success: true };
}

export async function deleteProduct(id: string): Promise<ActionResult> {
  const supabase = await createClient();

  const { error } = await supabase.from("products").delete().eq("id", id);

  if (error) {
    console.error("Error al eliminar producto:", error.message);
    return { error: "No se pudo eliminar el producto." };
  }

  revalidatePath("/admin/productos");
  revalidatePath("/productos");
  revalidatePath("/");
  return { success: true };
}