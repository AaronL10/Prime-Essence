"use client";

import { useState } from "react";

interface Format {
  ml: number;
  title: string;
  sprays: string;
  description: string;
  ideal: string;
  highlight?: boolean;
}

const FORMATS: Format[] = [
  {
    ml: 2,
    title: "La Prueba Esencial",
    sprays: "~30 SPRAYS",
    description: "Duración aproximada de 5–7 días de cata. Suficiente para conocer la evolución olfativa de una fragancia en distintos contextos.",
    ideal: "CATACIÓN PRELIMINAR",
  },
  {
    ml: 5,
    title: "El Viajero Refinado",
    sprays: "~75 SPRAYS",
    description: "Rotación de temporada, cabina de avión o bolso de mano. Rendimiento de 1–2 meses según frecuencia de uso.",
    ideal: "VIAJES & ROTACIÓN",
    highlight: true,
  },
  {
    ml: 10,
    title: "La Experiencia Completa",
    sprays: "~150 SPRAYS",
    description: "Uso diario prolongado sin preocupaciones. La elección del coleccionista que ya sabe lo que quiere.",
    ideal: "USO DIARIO PROLONGADO",
  },
];

export default function FormatGuide() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="border-b border-neutral-200">
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-8">
        <div className="text-center">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-500">
            Formatos
          </p>
          <h2 className="mt-3 font-display text-3xl text-black sm:text-4xl">
            Elegí tu medida
          </h2>
          <p className="mx-auto mt-3 max-w-xl font-body text-sm leading-relaxed text-neutral-500">
            Tres tamaños pensados para cada momento de tu relación con una fragancia.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {FORMATS.map((f) => {
            const isHighlight = f.highlight;
            const isHovered = hovered === f.ml;

            return (
              <div
                key={f.ml}
                onMouseEnter={() => setHovered(f.ml)}
                onMouseLeave={() => setHovered(null)}
                className={[
                  "relative flex flex-col rounded-xl border p-6 transition-all duration-300 sm:p-8",
                  isHighlight
                    ? "border-neutral-900 bg-black text-white"
                    : "border-neutral-200 bg-white text-black",
                  isHovered && !isHighlight
                    ? "border-black shadow-[0_4px_20px_rgba(0,0,0,0.06)]"
                    : "",
                  isHovered && isHighlight
                    ? "shadow-[0_4px_24px_rgba(0,0,0,0.25)]"
                    : "",
                ].join(" ")}
              >
                {isHighlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="whitespace-nowrap rounded-full bg-white px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-black">
                      Más popular
                    </span>
                  </div>
                )}

                <span
                  className={[
                    "inline-flex w-fit rounded-full px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider",
                    isHighlight
                      ? "bg-neutral-800 text-neutral-300"
                      : "bg-neutral-100 text-neutral-500",
                  ].join(" ")}
                >
                  {f.sprays}
                </span>

                <h3 className="mt-5 font-display text-2xl">
                  {f.ml} ml
                </h3>
                <p
                  className={[
                    "mt-1 font-body text-sm font-medium",
                    isHighlight ? "text-neutral-300" : "text-neutral-500",
                  ].join(" ")}
                >
                  {f.title}
                </p>

                <p
                  className={[
                    "mt-4 font-body text-sm leading-relaxed",
                    isHighlight ? "text-neutral-400" : "text-neutral-500",
                  ].join(" ")}
                >
                  {f.description}
                </p>

                <div className="mt-auto pt-6">
                  <span
                    className={[
                      "inline-block rounded-full px-3 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-wider",
                      isHighlight
                        ? "bg-neutral-800 text-neutral-200"
                        : "bg-neutral-100 text-neutral-500",
                    ].join(" ")}
                  >
                    Ideal para: {f.ideal}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}