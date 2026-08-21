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
    <main>
      <section>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-10 px-5 py-14 md:grid-cols-2 md:px-8 md:py-20">
          <ProductImage image={product.image} name={product.name} brand={product.brand} />

          <div>
            <p className="font-body text-xs font-semibold uppercase tracking-[0.16em] text-ink/45">
              {product.brand}
            </p>
            <h1 className="mt-1 font-display text-3xl text-ink sm:text-4xl">
              {product.name}
            </h1>
            <p className="mt-5 font-body text-sm leading-relaxed text-ink/65">
              {product.description}
            </p>

            <div className="mt-8">
              <ProductDetailAddToCart
                productId={product.id}
                slug={product.slug}
                name={product.name}
                brand={product.brand}
                image={product.image}
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
    <div className="aspect-square overflow-hidden rounded-card bg-ink/5">
      {image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={image}
          alt={`${brand} ${name}`}
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center font-display text-6xl italic text-ink/20">
          {brand.charAt(0)}
        </div>
      )}
    </div>
  );
}