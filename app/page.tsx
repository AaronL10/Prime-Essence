import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/data/products";

const VALUES = [
  {
    title: "Casas seleccionadas",
    text: "Trabajamos solo con perfumistas y casas de nicho que valen la exploración.",
    icon: <IconFlask />,
  },
  {
    title: "Fraccionado con precisión",
    text: "Cada decant se mide a mano y se envasa en vidrio ámbar que protege la fragancia.",
    icon: <IconDrop />,
  },
  {
    title: "Envío discreto",
    text: "Tu pedido llega en un empaque simple, sin señas, directo a tu puerta.",
    icon: <IconBox />,
  },
];

const STEPS = [
  {
    title: "Selección",
    text: "Elegís entre casas de nicho y clásicos de autor en nuestro catálogo.",
  },
  {
    title: "Fraccionado",
    text: "Extraemos tu fragancia del original en un vial de vidrio, medido a mano.",
  },
  {
    title: "Etiquetado y envío",
    text: "Sellamos y enviamos con el mismo cuidado que el frasco original.",
  },
];

export default async function Home() {
  const products = await getProducts();
  const featured = products.slice(0, 4);

  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-5 pb-20 pt-16 md:px-8 md:pb-28 md:pt-24 lg:grid-cols-2">
          <div className="animate-fade-up">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-amber-ink">
              Perfumería de nicho, por mililitro
            </p>
            <h1 className="mt-5 font-display text-4xl leading-[1.08] text-ink sm:text-5xl lg:text-6xl">
              El perfume correcto no necesita el frasco completo.
            </h1>
            <p className="mt-6 max-w-[46ch] font-body text-base leading-relaxed text-ink/65">
              Seleccionamos casas de nicho y clásicos de autor para que
              explores tu próxima fragancia en decants desde 3ml — sin
              comprometer tu presupuesto ni tu curiosidad.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                href="/productos"
                className="rounded-full bg-ink px-7 py-3.5 font-body text-sm font-medium uppercase tracking-[0.1em] text-bone transition-colors hover:bg-amber hover:text-ink"
              >
                Explorar catálogo
              </Link>
              <Link
                href="#decants"
                className="link-underline pb-1 font-body text-sm font-medium uppercase tracking-[0.1em] text-ink/70 hover:text-ink"
              >
                Cómo funciona
              </Link>
            </div>

            <dl className="mt-14 grid grid-cols-3 gap-6 border-t border-ink/10 pt-6">
              <div>
                <dt className="font-mono text-2xl text-ink">+40</dt>
                <dd className="mt-1 font-body text-xs uppercase tracking-wide text-ink/50">
                  Casas de nicho
                </dd>
              </div>
              <div>
                <dt className="font-mono text-2xl text-ink">3ml</dt>
                <dd className="mt-1 font-body text-xs uppercase tracking-wide text-ink/50">
                  Decant mínimo
                </dd>
              </div>
              <div>
                <dt className="font-mono text-2xl text-ink">48h</dt>
                <dd className="mt-1 font-body text-xs uppercase tracking-wide text-ink/50">
                  Envío discreto
                </dd>
              </div>
            </dl>
          </div>

          <div className="relative flex justify-center lg:justify-end">
            <div
              aria-hidden
              className="absolute -inset-10 -z-10 rounded-full bg-amber/15 blur-3xl"
            />
            <HeroVial />
          </div>
        </div>
      </section>

      {/* Presentación de la tienda */}
      <section id="nosotros" className="scroll-mt-24 border-t border-ink/10 bg-paper">
        <div className="mx-auto max-w-6xl px-5 py-20 md:px-8">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-amber-ink">
            La casa
          </p>
          <h2 className="mt-3 max-w-[24ch] font-display text-3xl text-ink sm:text-4xl">
            Una selección curada, pensada para explorar sin comprometerse.
          </h2>

          <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-3">
            {VALUES.map((v) => (
              <div key={v.title}>
                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-amber/40 text-amber-ink">
                  {v.icon}
                </div>
                <h3 className="mt-5 font-display text-lg text-ink">
                  {v.title}
                </h3>
                <p className="mt-2 font-body text-sm leading-relaxed text-ink/60">
                  {v.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Productos destacados */}
      <section className="border-t border-ink/10">
        <div className="mx-auto max-w-6xl px-5 py-20 md:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-amber-ink">
                Destacados
              </p>
              <h2 className="mt-3 font-display text-3xl text-ink sm:text-4xl">
                Selección de la semana
              </h2>
            </div>
            <Link
              href="/productos"
              className="link-underline pb-1 font-body text-sm font-medium text-ink/70 hover:text-ink"
            >
              Ver todo el catálogo →
            </Link>
          </div>

          {featured.length === 0 ? (
            <p className="mt-12 font-body text-sm text-ink/50">
              Todavía no hay productos cargados.
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

      {/* Qué son los decants */}
      <section id="decants" className="scroll-mt-24 border-t border-ink/10 bg-ink text-bone">
        <div className="mx-auto max-w-6xl px-5 py-20 md:px-8">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-amber">
                El proceso
              </p>
              <h2 className="mt-3 font-display text-3xl sm:text-4xl">
                De frasco completo a tu tamaño ideal.
              </h2>
              <p className="mt-5 max-w-[50ch] font-body text-sm leading-relaxed text-bone/65">
                Un decant es una porción real de un perfume original,
                fraccionada desde el frasco de fábrica a un vial de vidrio
                ámbar — sin diluir, sin imitar. Comprás la misma fragancia,
                en la cantidad que realmente vas a usar.
              </p>

              <ol className="mt-10 space-y-6">
                {STEPS.map((step, i) => (
                  <li key={step.title} className="flex gap-5">
                    <span className="font-mono text-sm text-amber">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="font-display text-lg">{step.title}</h3>
                      <p className="mt-1 font-body text-sm leading-relaxed text-bone/60">
                        {step.text}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <DecantDiagram />
          </div>
        </div>
      </section>
    </main>
  );
}

function HeroVial() {
  return (
    <svg
      width="220"
      height="320"
      viewBox="0 0 220 320"
      fill="none"
      aria-hidden
      className="drop-shadow-xl"
    >
      <rect x="90" y="10" width="40" height="26" rx="4" fill="#16130F" />
      <rect x="82" y="34" width="56" height="16" rx="3" fill="#B8853A" />
      <path
        d="M60 58c0-4 4-8 8-8h84c4 0 8 4 8 8v210a34 34 0 0 1-34 34H94a34 34 0 0 1-34-34V58Z"
        fill="#FBF8F2"
        stroke="#16130F"
        strokeOpacity="0.15"
        strokeWidth="2"
      />
      <clipPath id="vialClip">
        <path d="M60 58c0-4 4-8 8-8h84c4 0 8 4 8 8v210a34 34 0 0 1-34 34H94a34 34 0 0 1-34-34V58Z" />
      </clipPath>
      <g clipPath="url(#vialClip)">
        <rect
          x="60"
          y="120"
          width="100"
          height="182"
          fill="#B8853A"
          className="origin-bottom animate-fill"
        />
      </g>
      {[
        { y: 250, label: "3ml" },
        { y: 190, label: "5ml" },
        { y: 110, label: "10ml" },
      ].map((t) => (
        <g key={t.label}>
          <line
            x1="168"
            y1={t.y}
            x2="180"
            y2={t.y}
            stroke="#16130F"
            strokeOpacity="0.3"
            strokeWidth="1.5"
          />
          <text
            x="186"
            y={t.y + 4}
            fontFamily="var(--font-mono)"
            fontSize="11"
            fill="#16130F"
            opacity="0.45"
          >
            {t.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

function DecantDiagram() {
  return (
    <div className="flex items-end justify-center gap-6 sm:gap-10">
      <div className="flex flex-col items-center gap-3">
        <svg width="64" height="140" viewBox="0 0 64 140" fill="none" aria-hidden>
          <rect x="22" y="6" width="20" height="14" rx="3" fill="#C9A227" />
          <path
            d="M14 26c0-3 3-6 6-6h24c3 0 6 3 6 6v98a10 10 0 0 1-10 10H24a10 10 0 0 1-10-10V26Z"
            fill="#F2EAD9"
            fillOpacity="0.12"
            stroke="#F2EAD9"
            strokeOpacity="0.35"
            strokeWidth="1.5"
          />
        </svg>
        <span className="font-mono text-[11px] uppercase tracking-wide text-bone/50">
          Original
        </span>
      </div>

      <ArrowIcon />

      <div className="flex items-end gap-4">
        {[
          { h: 70, label: "10ml" },
          { h: 52, label: "5ml" },
          { h: 38, label: "3ml" },
        ].map((v) => (
          <div key={v.label} className="flex flex-col items-center gap-3">
            <svg
              width="34"
              height={v.h + 20}
              viewBox={`0 0 34 ${v.h + 20}`}
              fill="none"
              aria-hidden
            >
              <rect x="12" y="0" width="10" height="8" rx="2" fill="#B8853A" />
              <path
                d={`M6 12c0-2 2-4 4-4h14c2 0 4 2 4 4v${v.h}a6 6 0 0 1-6 6H12a6 6 0 0 1-6-6V12Z`}
                fill="#B8853A"
                fillOpacity="0.85"
              />
            </svg>
            <span className="font-mono text-[11px] uppercase tracking-wide text-bone/50">
              {v.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ArrowIcon() {
  return (
    <svg
      width="32"
      height="16"
      viewBox="0 0 32 16"
      fill="none"
      aria-hidden
      className="mb-8 text-bone/30"
    >
      <path
        d="M0 8h28M22 2l8 6-8 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconFlask() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M10 2v6.5L4.5 18a2 2 0 0 0 1.7 3h11.6a2 2 0 0 0 1.7-3L14 8.5V2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8.5 2h7" strokeLinecap="round" />
      <path d="M7 15h10" strokeLinecap="round" />
    </svg>
  );
}

function IconDrop() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M12 3s7 7.5 7 12a7 7 0 1 1-14 0c0-4.5 7-12 7-12Z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconBox() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M3 8l9-5 9 5-9 5-9-5Z" strokeLinejoin="round" />
      <path d="M3 8v8l9 5 9-5V8" strokeLinejoin="round" />
      <path d="M12 13v8" />
    </svg>
  );
}