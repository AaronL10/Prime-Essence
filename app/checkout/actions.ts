"use server";

import { createClient } from "@/lib/supabase/server";

export interface CheckoutCartItem {
  variantId: string;
  quantity: number;
}

export interface CheckoutFormData {
  fullName: string;
  phone: string;
  address: string;
  city: string;
  notes: string;
}

type CreateOrderResult = { orderId: string } | { error: string };

export async function createOrder(
  formData: CheckoutFormData,
  items: CheckoutCartItem[]
): Promise<CreateOrderResult> {
  if (items.length === 0) {
    return { error: "El carrito está vacío." };
  }

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Debés iniciar sesión para completar el pedido." };
  }

  const variantIds = items.map((item) => item.variantId);

  const { data: variants, error: variantsError } = await supabase
    .from("product_variants")
    .select("id, product_id, size_ml, price, stock, products(name, brand)")
    .in("id", variantIds);

  if (variantsError) {
    console.error("Error al verificar productos:", variantsError.message);
    return { error: "No se pudo verificar el pedido. Intentá de nuevo." };
  }

  const variantById = new Map((variants ?? []).map((v: any) => [v.id, v]));

  const verifiedItems: {
    variantId: string;
    productId: string;
    productName: string;
    productBrand: string;
    sizeMl: number;
    price: number;
    quantity: number;
    subtotal: number;
  }[] = [];

  for (const item of items) {
    const variant = variantById.get(item.variantId) as any;

    if (!variant || !variant.products) {
      return {
        error: "Uno de los tamaños de tu carrito ya no está disponible.",
      };
    }

    const quantity = Math.max(1, Math.floor(item.quantity));

    if (quantity > variant.stock) {
      return {
        error: `No hay stock suficiente de "${variant.products.name}" (${variant.size_ml}ml). Disponible: ${variant.stock}.`,
      };
    }

    const price = Number(variant.price);

    verifiedItems.push({
      variantId: variant.id,
      productId: variant.product_id,
      productName: variant.products.name,
      productBrand: variant.products.brand,
      sizeMl: variant.size_ml,
      price,
      quantity,
      subtotal: price * quantity,
    });
  }

  const total = verifiedItems.reduce((sum, item) => sum + item.subtotal, 0);

  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({
      user_id: user.id,
      full_name: formData.fullName,
      phone: formData.phone,
      address: formData.address,
      city: formData.city,
      notes: formData.notes || null,
      total,
      subtotal: total,
      points_used: 0,
      discount_amount: 0,
      total_paid: total,
    })
    .select("id")
    .single();

  if (orderError || !order) {
    console.error("Error al crear pedido:", orderError?.message);
    return { error: "No se pudo crear el pedido. Intentá de nuevo." };
  }

  const orderItemsPayload = verifiedItems.map((item) => ({
    order_id: order.id,
    product_id: item.productId,
    variant_id: item.variantId,
    size_ml: item.sizeMl,
    product_name: item.productName,
    product_brand: item.productBrand,
    unit_price: item.price,
    quantity: item.quantity,
    subtotal: item.subtotal,
  }));

  const { error: itemsError } = await supabase
    .from("order_items")
    .insert(orderItemsPayload);

  if (itemsError) {
    console.error("Error al crear items del pedido:", itemsError.message);
    return {
      error:
        "El pedido se creó pero hubo un error al guardar los productos. Contactanos.",
    };
  }

  return { orderId: order.id as string };
}