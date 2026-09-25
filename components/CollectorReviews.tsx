"use client";

interface Review {
  quote: string;
  name: string;
  location: string;
  product: string;
}

const REVIEWS: Review[] = [
  {
    quote:
      "Pedí mi decant de Liquid Brun y quedé sorprendido con la presentación. Es una excelente forma de probar una fragancia antes de comprar el frasco completo.",
    name: "Mateo R.",
    location: "Capiatá",
    product: "Liquid Brun",
  },
  {
    quote:
      "Compré 3 decants por 69.000 Gs y además recibí un Erba Pura de 2 ml de regalo. Me gustó mucho poder probar varias fragancias en una sola compra.",
    name: "Sebas M.",
    location: "Encarnación",
    product: "JPG Le Male, Paradise Garden, 9pm",
  },
  {
    quote:
      "Probé Khamrah y después terminé descubriendo varias fragancias más de la tienda. La idea de los decants me parece perfecta para conocer perfumes nuevos sin comprar el frasco completo.",
    name: "Diego A.",
    location: "Capitán Miranda",
    product: "Khamrah",
  },
];

function Star() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="text-black"
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function CheckBadge() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-neutral-400"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export default function CollectorReviews() {
  return (
    <section className="border-b border-neutral-200">
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-8">
        <div className="text-center">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-500">
            Testimonios
          </p>

          <h2 className="mt-3 font-display text-3xl text-black sm:text-4xl">
            Reseñas de coleccionistas
          </h2>

          <p className="mx-auto mt-3 max-w-lg font-body text-sm leading-relaxed text-neutral-500">
            Experiencias de clientes que descubrieron nuevas fragancias a través
            de los decants de Prime Essence.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {REVIEWS.map((r, i) => (
            <div
              key={i}
              className="flex flex-col rounded-xl border border-neutral-200 bg-white p-6 transition-all hover:border-black hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] sm:p-8"
            >
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} />
                ))}
              </div>

              <blockquote className="mt-5 flex-1 font-display text-base italic leading-relaxed text-black">
                “{r.quote}”
              </blockquote>

              <div className="mt-6 border-t border-neutral-100 pt-5">
                <p className="font-body text-sm font-semibold text-black">
                  {r.name}
                </p>

                <p className="mt-0.5 font-body text-xs text-neutral-400">
                  {r.location}
                </p>

                <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-neutral-50 px-2.5 py-1">
                  <CheckBadge />

                  <span className="font-mono text-[10px] uppercase tracking-wide text-neutral-500">
                    Compró {r.product}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

