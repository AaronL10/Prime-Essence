import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/data/products";

export default async function ProductosPage() {
  const products = await getProducts();

  return (
    <main>
      <section className="border-b border-ink/10 bg-paper">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-amber-ink">
            Catálogo
          </p>
          <h1 className="mt-3 max-w-[26ch] font-display text-4xl text-ink sm:text-5xl">
            Todas las fragancias
          </h1>
          <p className="mt-4 max-w-[52ch] font-body text-sm leading-relaxed text-ink/60 sm:text-base">
            {products.length} fragancias disponibles, todas fraccionables
            en decants desde 3ml.
          </p>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-5 py-14 md:px-8">
          {products.length === 0 ? (
            <p className="font-body text-sm text-ink/50">
              Todavía no hay productos cargados en la base de datos.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((p) => (
                <ProductCard key={p.id} {...p} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}