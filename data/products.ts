import { createClient } from "@/lib/supabase/server";
import type { Product, ProductVariant } from "@/lib/product-helpers";

export type { Product, ProductVariant } from "@/lib/product-helpers";
export { getStartingPrice, isAnyVariantInStock } from "@/lib/product-helpers";

// ── Mapeo marca → categoría (no necesitás tocar Supabase) ──
const BRAND_TO_CATEGORY: Record<string, string> = {
  // Árabes
  "Bharara": "arabes",
  "Rasasi": "arabes",
  "Armaf": "arabes",
  "Afnan": "arabes",
  "Lattafa": "arabes",
  "French Avenue": "arabes",
  "Maison Tropical": "arabes",
  // Diseñador
  "Valentino": "disenador",
  "Giorgio Armani": "disenador",
  "Dior": "disenador",
  "Jean Paul Gaultier": "disenador",
  // Artistas
  "Shakira": "artistas",
  "Sabrina Carpenter": "artistas",
  // Nicho
  "Xerjoff": "nicho",
};

function inferCategory(brand: string): string {
  const normalized = brand.trim();
  return BRAND_TO_CATEGORY[normalized] || "";
}

function mapVariants(rows: any[]): ProductVariant[] {
  return (rows ?? [])
    .map((v) => ({
      id: v.id,
      sizeMl: v.size_ml,
      price: Number(v.price),
      stock: v.stock ?? 0,
    }))
    .sort((a, b) => a.sizeMl - b.sizeMl);
}

export async function getProducts(): Promise<Product[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .select(
      "id, slug, name, brand, description, image, product_variants(id, size_ml, price, stock)"
    )
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error al traer productos:", error.message);
    return [];
  }

  return (data ?? []).map((row: any) => ({
    id: row.id,
    slug: row.slug,
    name: row.name,
    brand: row.brand,
    description: row.description ?? "",
    image: row.image ?? "",
    category: inferCategory(row.brand),
    variants: mapVariants(row.product_variants),
  }));
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .select(
      "id, slug, name, brand, description, image, product_variants(id, size_ml, price, stock)"
    )
    .eq("slug", slug)
    .maybeSingle();

  if (error || !data) {
    if (error) console.error("Error al traer producto:", error.message);
    return null;
  }

  return {
    id: data.id,
    slug: data.slug,
    name: data.name,
    brand: data.brand,
    description: data.description ?? "",
    image: data.image ?? "",
    category: inferCategory(data.brand),
    variants: mapVariants((data as any).product_variants),
  };
}