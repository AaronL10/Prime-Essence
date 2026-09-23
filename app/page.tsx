import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import FormatGuide from "@/components/FormatGuide";
import ConciergeExpress from "@/components/ConciergeExpress";
import CollectorReviews from "@/components/CollectorReviews";
import { getProducts } from "@/data/products";

const STEPS = [
  { title: "Elegí", text: "Seleccioná entre casas de nicho y clásicos de autor." },
  { title: "Fraccionamos", text: "Extraemos tu fragancia del original a un vial de vidrio." },
  { title: "Recibís", text: "Envío discreto en 24–48hs." },
];

export default async function Home() {
  const products = await getProducts();
  const featured = products.slice(0, 4);

  return (
    <main>
      {/* HERO */}
      <section className="relative border-b border-neutral-200">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center lg:grid-cols-2">
          <div className="px-5 py-16 md:px-8 lg:py-24">
            <div className="max-w-lg">
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-neutral-500">
                Prime Essence
              </p>
              <h1 className="mt-5 font-display text-4xl leading-[1.05] text-black sm:text-5xl lg:text-[3.5rem]">
                Perfumería de nicho, por mililitro.
              </h1>
              <p className="mt-5 font-body text-base leading-relaxed text-neutral-600">
                Explorá casas de autor sin comprar el frasco completo.
                Decants desde 3ml, seleccionados y fraccionados a mano.
              </p>
              <div className="mt-8">
                <Link
                  href="/productos"
                  className="inline-flex items-center justify-center rounded-full bg-black px-8 py-4 font-body text-sm font-semibold uppercase tracking-[0.08em] text-white transition-all hover:bg-neutral-800"
                >
                  Ver catálogo
                </Link>
              </div>

              <div className="mt-10 flex items-center gap-6 border-t border-neutral-200 pt-6">
                <div>
                  <p className="font-mono text-xl font-medium text-black">+40</p>
                  <p className="mt-0.5 font-body text-[10px] uppercase tracking-wide text-neutral-400">Casas</p>
                </div>
                <div className="h-6 w-px bg-neutral-200" />
                <div>
                  <p className="font-mono text-xl font-medium text-black">3ml</p>
                  <p className="mt-0.5 font-body text-[10px] uppercase tracking-wide text-neutral-400">Desde</p>
                </div>
                <div className="h-6 w-px bg-neutral-200" />
                <div>
                  <p className="font-mono text-xl font-medium text-black">48h</p>
                  <p className="mt-0.5 font-body text-[10px] uppercase tracking-wide text-neutral-400">Envío</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative h-64 w-full bg-neutral-100 lg:h-full lg:min-h-[600px]">
            <img
              src="/banner.jpg"
              alt="Prime Essence"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* PRODUCTOS DESTACADOS */}
      <section id="destacados" className="scroll-mt-24 border-b border-neutral-200">
        <div className="mx-auto max-w-7xl px-5 py-20 md:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-500">
                Destacados
              </p>
              <h2 className="mt-3 font-display text-3xl text-black sm:text-4xl">
                Selección de la semana
              </h2>
            </div>
            <Link
              href="/productos"
              className="group inline-flex items-center gap-2 font-body text-sm font-medium text-neutral-500 transition-colors hover:text-black"
            >
              Ver todo
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="transition-transform group-hover:translate-x-1">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {featured.length === 0 ? (
            <p className="mt-12 font-body text-sm text-neutral-400">
              Próximamente nuevas fragancias.
            </p>
          ) : (
            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {featured.map((p) => (
                <ProductCard key={p.id} {...p} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* GUIA DE FORMATOS */}
      <FormatGuide />

      {/* CONCIERGE OLFATIVO */}
      <ConciergeExpress />

      {/* RESEÑAS */}
      <CollectorReviews />

      {/* CÓMO FUNCIONA */}
      <section className="border-b border-neutral-200 bg-neutral-50">
        <div className="mx-auto max-w-7xl px-5 py-14 md:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {STEPS.map((step, i) => (
              <div key={step.title} className="flex items-start gap-4">
                <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-neutral-300 font-mono text-xs text-neutral-500">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-display text-lg text-black">{step.title}</h3>
                  <p className="mt-1 font-body text-sm leading-relaxed text-neutral-500">
                    {step.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}