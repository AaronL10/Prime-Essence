"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export interface VariantInput {
  sizeMl: number;
  price: number;
  stock: number;
}

export interface ProductFormInput {
  slug: string;
  name: string;
  brand: string;
  description: string;
  image: string;
  variants: VariantInput[];
}

type ActionResult = { success: true } | { error: string };

export async function createProduct(
  input: ProductFormInput
): Promise<ActionResult> {
  const supabase = await createClient();

  const { data: product, error: productError } = await supabase
    .from("products")
    .insert({
      slug: input.slug,
      name: input.name,
      brand: input.brand,
      description: input.description,
      image: input.image,
      price: 0,
      stock: 0,
    })
    .select("id")
    .single();

  if (productError || !product) {
    console.error("Error al crear producto:", productError?.message);
    return { error: "No se pudo crear el producto." };
  }

  const variantsPayload = input.variants.map((v) => ({
    product_id: product.id,
    size_ml: v.sizeMl,
    price: v.price,
    stock: v.stock,
  }));

  const { error: variantsError } = await supabase
    .from("product_variants")
    .insert(variantsPayload);

  if (variantsError) {
    console.error("Error al crear variantes:", variantsError.message);
    return { error: "El producto se creó pero fallaron las variantes." };
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

  const { error: productError } = await supabase
    .from("products")
    .update({
      slug: input.slug,
      name: input.name,
      brand: input.brand,
      description: input.description,
      image: input.image,
    })
    .eq("id", id);

  if (productError) {
    console.error("Error al actualizar producto:", productError.message);
    return { error: "No se pudo actualizar el producto." };
  }

  const variantsPayload = input.variants.map((v) => ({
    product_id: id,
    size_ml: v.sizeMl,
    price: v.price,
    stock: v.stock,
  }));

  const { error: variantsError } = await supabase
    .from("product_variants")
    .upsert(variantsPayload, {
      onConflict: "product_id,size_ml",
      ignoreDuplicates: false,
    });

  if (variantsError) {
    console.error("Error al actualizar variantes:", variantsError.message);
    return { error: "El producto se actualizó pero fallaron las variantes." };
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