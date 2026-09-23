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
      { house: "Creed", name: "Aventus", notes: "Piña & Abedul", price: "Desde €4.50", slug: "creed-aventus" },
      { house: "Parfums de Marly", name: "Layton", notes: "Manzana & Vainilla", price: "Desde €4.20", slug: "parfums-de-marly-layton" },
      { house: "Xerjoff", name: "Torino21", notes: "Menta & Limón", price: "Desde €5.00", slug: "xerjoff-torino21" },
    ],
  },
  {
    id: "gala",
    label: "Noches de Gala",
    suggestions: [
      { house: "Kilian", name: "Angels' Share", notes: "Coñac & Canela", price: "Desde €6.00", slug: "kilian-angels-share" },
      { house: "MFK", name: "Grand Soir", notes: "Ámbar & Benjuí", price: "Desde €5.50", slug: "mfk-grand-soir" },
      { house: "Tom Ford", name: "Tobacco Vanille", notes: "Tabaco & Vainilla", price: "Desde €5.80", slug: "tom-ford-tobacco-vanille" },
    ],
  },
  {
    id: "calido",
    label: "Climas Cálidos",
    suggestions: [
      { house: "Creed", name: "Silver Mountain Water", notes: "Té Negro & Mandarina", price: "Desde €4.50", slug: "creed-silver-mountain-water" },
      { house: "Xerjoff", name: "Renaissance", notes: "Amalfi & Bergamota", price: "Desde €5.00", slug: "xerjoff-renaissance" },
      { house: "Roja", name: "Elysium", notes: "Pomelo & Limón", price: "Desde €6.50", slug: "roja-elysium" },
    ],
  },
  {
    id: "intimo",
    label: "Citas Íntimas",
    suggestions: [
      { house: "MFK", name: "Baccarat Rouge 540 Extrait", notes: "Azafrán & Ámbar", price: "Desde €7.00", slug: "mfk-baccarat-rouge-540-extrait" },
      { house: "Initio", name: "Side Effect", notes: "Rhum & Tabaco", price: "Desde €6.20", slug: "initio-side-effect" },
      { house: "YSL", name: "Tuxedo", notes: "Pimienta & Pachulí", price: "Desde €4.80", slug: "ysl-tuxedo" },
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
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
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