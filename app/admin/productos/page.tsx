import Link from "next/link";
import { getProducts } from "@/data/products";
import DeleteProductButton from "@/components/admin/DeleteProductButton";
import { LOW_STOCK_THRESHOLD } from "@/lib/stock";

function formatPrice(price: number) {
  return `$${price.toLocaleString("es-AR")}`;
}

export default async function AdminProductosPage() {
  const products = await getProducts();

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-3xl text-ink">Productos</h1>
        <Link
          href="/admin/productos/nuevo"
          className="rounded-full bg-ink px-5 py-2.5 font-body text-[13px] font-medium uppercase tracking-[0.1em] text-bone transition-colors hover:bg-amber hover:text-ink"
        >
          + Nuevo producto
        </Link>
      </div>

      <div className="mt-8 flex flex-col gap-4">
        {products.map((p) => (
          <div
            key={p.id}
            className="rounded-card border border-ink/10 bg-paper p-5"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-body text-[11px] uppercase tracking-wide text-ink/45">
                  {p.brand}
                </p>
                <h2 className="font-display text-lg text-ink">{p.name}</h2>
              </div>
              <div className="flex gap-3">
                <Link
                  href={`/admin/productos/${p.id}`}
                  className="font-body text-sm text-ink/60 underline underline-offset-4 hover:text-ink"
                >
                  Editar
                </Link>
                <DeleteProductButton id={p.id} name={p.name} />
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {p.variants.map((v) => {
                const isOutOfStock = v.stock === 0;
                const isLowStock = !isOutOfStock && v.stock <= LOW_STOCK_THRESHOLD;

                return (
                  <div
                    key={v.id}
                    className="rounded-2xl border border-ink/10 p-3 text-center"
                  >
                    <p className="font-mono text-sm text-ink">{v.sizeMl}ml</p>
                    <p className="mt-1 font-mono text-xs text-ink/60">
                      {formatPrice(v.price)}
                    </p>
                    <p
                      className={`mt-1 font-mono text-[11px] uppercase tracking-wide ${
                        isOutOfStock
                          ? "text-wine"
                          : isLowStock
                          ? "text-amber-ink"
                          : "text-ink/50"
                      }`}
                    >
                      {isOutOfStock
                        ? "Agotado"
                        : isLowStock
                        ? `Bajo: ${v.stock}`
                        : `Stock: ${v.stock}`}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {products.length === 0 && (
          <p className="rounded-card border border-ink/10 bg-paper px-4 py-6 text-center text-sm text-ink/40">
            Todavía no hay productos.
          </p>
        )}
      </div>
    </div>
  );
}