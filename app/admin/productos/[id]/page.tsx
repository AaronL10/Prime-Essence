import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import ProductForm from "@/components/admin/ProductForm";

interface PageProps {
  params: Promise<{ id: string }>;
}

const SIZES = [2, 5, 10, 20];

export default async function EditarProductoPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: product, error } = await supabase
    .from("products")
    .select(
      "id, slug, name, brand, description, image, product_variants(id, size_ml, price, stock)"
    )
    .eq("id", id)
    .single();

  if (error || !product) {
    notFound();
  }

  const existingVariants = ((product as any).product_variants ?? []) as {
    id: string;
    size_ml: number;
    price: number;
    stock: number;
  }[];

  const variants = SIZES.map((sizeMl) => {
    const existing = existingVariants.find((v) => v.size_ml === sizeMl);
    return existing
      ? {
          sizeMl: existing.size_ml,
          price: Number(existing.price),
          stock: existing.stock,
        }
      : { sizeMl, price: 0, stock: 0 };
  });

  return (
    <div>
      <h1 className="font-display text-3xl text-ink">Editar producto</h1>
      <div className="mt-8">
        <ProductForm
          mode="edit"
          productId={product.id}
          initialValues={{
            slug: product.slug,
            name: product.name,
            brand: product.brand,
            description: product.description ?? "",
            image: product.image ?? "",
            variants,
          }}
        />
      </div>
    </div>
  );
}