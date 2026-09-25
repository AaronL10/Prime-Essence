import ProductCatalog from "@/components/ProductCatalog";
import { getProducts } from "@/data/products";

export default async function ProductosPage() {
  const products = await getProducts();

  return (
    <main>
      <section className="border-b border-neutral-200">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-500">
            Catálogo
          </p>
          <h1 className="mt-3 max-w-[26ch] font-display text-4xl text-black sm:text-5xl">
            Todas las fragancias
          </h1>
          <p className="mt-4 max-w-[52ch] font-body text-sm leading-relaxed text-neutral-500 sm:text-base">
            {products.length} fragancias disponibles, todas fraccionables
            en decants desde 2ml. Explorá por categoría o buscá la tuya.
          </p>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-5 py-14 md:px-8">
          <ProductCatalog products={products} />
        </div>
      </section>
    </main>
  );
}