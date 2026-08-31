import { notFound } from "next/navigation";
import { getProductBySlug } from "@/data/products";
import ProductDetailAddToCart from "@/components/ProductDetailAddToCart";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductoDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen">
      <section className="mx-auto max-w-6xl px-5 py-8 md:px-8 md:py-12">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 font-body text-xs text-neutral-400">
          <a href="/productos" className="hover:text-black">Productos</a>
          <span>/</span>
          <span className="text-neutral-500">{product.brand}</span>
          <span>/</span>
          <span className="text-black">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
          {/* Imagen */}
          <ProductImage image={product.image} name={product.name} brand={product.brand} />

          {/* Info + compra */}
          <div className="flex flex-col">
            <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400">
              {product.brand}
            </p>
            <h1 className="mt-2 font-display text-3xl leading-tight text-black sm:text-4xl lg:text-[2.75rem]">
              {product.name}
            </h1>
            
            <p className="mt-6 font-body text-sm leading-relaxed text-neutral-500 lg:text-base">
              {product.description}
            </p>

            <div className="mt-8 border-t border-neutral-200 pt-8">
          <ProductDetailAddToCart
                productId={product.id}
                slug={product.slug}
                name={product.name}
                brand={product.brand}
                image={product.image}
                category={product.category || "decants"}  // ← AGREGAR
                variants={product.variants}
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function ProductImage({
  image,
  name,
  brand,
}: {
  image: string;
  name: string;
  brand: string;
}) {
  return (
    <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-neutral-100 lg:aspect-square">
      {image ? (
        <img
          src={image}
          alt={`${brand} — ${name}`}
          className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <span className="font-display text-6xl italic text-neutral-200">
            {brand.charAt(0)}
          </span>
        </div>
      )}
    </div>
  );
}