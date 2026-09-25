"use client";

import { useState } from "react";

import Link from "next/link";

interface Suggestion {
  house: string;
  name: string;
  notes: string;
  price: string;
  slug: string;
}

interface Tab {
  id: string;
  label: string;
  suggestions: Suggestion[];
}

const TABS: Tab[] = [
  {
    id: "firma",
    label: "Firma Diaria",
    suggestions: [
      {
        house: "Giorgio Armani",
        name: "Acqua di Giò Profondo",
        notes: "Marino & Cítricos",
        price: "Desde 45.000gs",
        slug: "acqua-di-gio-profondo",
      },
      {
        house: "Valentino",
        name: "Born in Roma",
        notes: "Violeta & Vainilla",
        price: "Desde 48.000gs",
        slug: "valentino-born-in-roma",
      },
      {
        house: "Rasasi",
        name: "Hawas Ice",
        notes: "Cítricos & Acorde Acuático",
        price: "Desde 35.000gs",
        slug: "rasasi-hawas-ice",
      },
    ],
  },

  {
    id: "gala",
    label: "Noches de Gala",
    suggestions: [
      {
        house: "Valentino",
        name: "Uomo Intense",
        notes: "Vainilla & Cuero",
        price: "Desde 35.000gs",
        slug: "valentino-uomo-intense",
      },
      {
        house: "Lattafa",
        name: "Khamrah",
        notes: "Canela & Nuez Moscada",
        price: "Desde 25.000gs",
        slug: "lattafa-khamrah",
      },
      {
        house: "Xerjoff",
        name: "Erba Pura",
        notes: "Cítricos & Frutas & Almizcle",
        price: "Consultar",
        slug: "xerjoff-erba-pura",
      },
    ],
  },

  {
    id: "calido",
    label: "Climas Cálidos",
    suggestions: [
      {
        house: "Rasasi",
        name: "Hawas Ice",
        notes: "Cítricos & Acorde Acuático",
        price: "Desde 35.000gs",
        slug: "rasasi-hawas-ice",
      },
      {
        house: "Armaf",
        name: "Odyssey Aqua",
        notes: "Cítricos & Notas Acuáticas",
        price: "Desde 35.000gs",
        slug: "armaf-odyssey-aqua",
      },
      {
        house: "Maison Tropical",
        name: "Tropical Vibe",
        notes: "Frutal & Tropical",
        price: "Desde 35.000gs",
        slug: "maison-tropical-tropical-vibe",
      },
    ],
  },

  {
    id: "frios",
    label: "Climas Fríos",
    suggestions: [
      {
        house: "Afnan",
        name: "9 PM",
        notes: "Manzana & Canela & Vainilla",
        price: "Desde 30.000gs",
        slug: "afnan-9-pm",
      },
      {
        house: "Lattafa",
        name: "Asad",
        notes: "Pimienta & Tabaco & Vainilla",
        price: "Desde 30.000gs",
        slug: "lattafa-asad",
      },
      {
        house: "French Avenue",
        name: "Liquid Brun",
        notes: "Canela & Vainilla & Maderas",
        price: "Desde 35.000gs",
        slug: "french-avenue-liquid-brun",
      },
    ],
  },
];

export default function ConciergeExpress() {
  const [active, setActive] = useState<string>("firma");
  const activeTab = TABS.find((t) => t.id === active) ?? TABS[0];

  return (
    <section className="border-b border-neutral-200 bg-neutral-50">
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-8">
        <div className="text-center">
          <span className="inline-flex rounded-full border border-neutral-200 bg-white px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-widest text-neutral-500">
            Concierge Olfativo Express
          </span>

          <h2 className="mt-5 font-display text-3xl italic text-black sm:text-4xl">
            ¿Para qué ocasión buscás tu próxima fragancia?
          </h2>

          <p className="mx-auto mt-3 max-w-lg font-body text-sm leading-relaxed text-neutral-500">
            Seleccioná un momento y descubrí tres recomendaciones curadas por nuestro equipo.
          </p>
        </div>

        {/* Tabs */}
        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {TABS.map((tab) => {
            const isActive = tab.id === active;

            return (
              <button
                key={tab.id}
                onClick={() => setActive(tab.id)}
                className={[
                  "rounded-full px-5 py-2.5 font-body text-sm font-medium transition-all",
                  isActive
                    ? "bg-black text-white"
                    : "bg-white text-neutral-600 hover:bg-neutral-200",
                ].join(" ")}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Cards */}
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {activeTab.suggestions.map((s) => (
            <div
              key={s.slug}
              className="group flex flex-col rounded-xl border border-neutral-200 bg-white p-6 transition-all hover:border-black hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)]"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400">
                {s.house}
              </p>

              <h3 className="mt-1 font-display text-xl text-black">
                {s.name}
              </h3>

              <p className="mt-1 font-body text-sm italic text-neutral-500">
                {s.notes}
              </p>

              <div className="mt-auto flex items-center justify-between pt-6">
                <span className="font-mono text-sm font-medium text-black">
                  {s.price}
                </span>

                <Link
                  href={`/productos/${s.slug}`}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-white transition-transform hover:scale-110"
                  aria-label={`Ver ${s.name}`}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  >
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

