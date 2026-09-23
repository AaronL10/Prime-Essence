"use client";

import { useState, useMemo } from "react";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/lib/product-helpers";

const CATEGORIES = [
  { id: "all", label: "Ver todo", count: null },
  { id: "arabes", label: "Árabes", emoji: "🇦🇪" },
  { id: "disenador", label: "Diseñador", emoji: "🕴️" },
  { id: "artistas", label: "Artistas", emoji: "🎤" },
  { id: "nicho", label: "Nicho", emoji: "💎" },
];

interface ProductCatalogProps {
  products: Product[];
}

export default function ProductCatalog({ products }: ProductCatalogProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = useMemo(() => {
    let result = products;

    // Filtro por categoría
    if (activeCategory !== "all") {
      result = result.filter(
        (p) => (p.category || "").toLowerCase().trim() === activeCategory
      );
    }

    // Filtro por búsqueda (nombre o marca)
    const q = searchQuery.trim().toLowerCase();
    if (q) {
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q)
      );
    }

    return result;
  }, [products, activeCategory, searchQuery]);

  // Contadores por categoría
  const counts = useMemo(() => {
    const map: Record<string, number> = {};
    CATEGORIES.forEach((cat) => {
      if (cat.id === "all") {
        map[cat.id] = products.length;
      } else {
        map[cat.id] = products.filter(
          (p) => (p.category || "").toLowerCase().trim() === cat.id
        ).length;
      }
    });
    return map;
  }, [products]);

  return (
    <div>
      {/* Barra de búsqueda + filtros */}
      <div className="mb-10 space-y-6">
        {/* Buscador */}
        <div className="relative max-w-md">
          <svg
            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por nombre o marca..."
            className="w-full rounded-full border border-neutral-200 bg-white py-2.5 pl-10 pr-4 font-body text-sm text-black outline-none transition-all placeholder:text-neutral-400 focus:border-black focus:ring-1 focus:ring-black"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-black"
              aria-label="Limpiar búsqueda"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Filtros de categoría */}
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            const count = counts[cat.id] ?? 0;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={[
                  "inline-flex items-center gap-1.5 rounded-full px-4 py-2 font-body text-sm font-medium transition-all",
                  isActive
                    ? "bg-black text-white"
                    : "border border-neutral-200 bg-white text-neutral-600 hover:border-neutral-400 hover:text-black",
                ].join(" ")}
              >
                {cat.emoji && <span className="text-base">{cat.emoji}</span>}
                <span>{cat.label}</span>
                <span
                  className={[
                    "ml-0.5 rounded-full px-1.5 py-0.5 font-mono text-[10px] font-semibold",
                    isActive
                      ? "bg-neutral-800 text-neutral-300"
                      : "bg-neutral-100 text-neutral-400",
                  ].join(" ")}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Resultados */}
      <div className="flex items-center justify-between">
        <p className="font-body text-sm text-neutral-500">
          {filtered.length}{" "}
          {filtered.length === 1 ? "fragancia" : "fragancias"} encontradas
          {activeCategory !== "all" && (
            <span className="text-neutral-400">
              {" "}
              en{" "}
              <span className="font-medium text-black">
                {CATEGORIES.find((c) => c.id === activeCategory)?.label}
              </span>
            </span>
          )}
          {searchQuery && (
            <span className="text-neutral-400">
              {" "}
              para "<span className="font-medium text-black">{searchQuery}</span>"
            </span>
          )}
        </p>
      </div>

      {filtered.length === 0 ? (
        <div className="mt-10 flex flex-col items-center justify-center rounded-xl border border-dashed border-neutral-200 py-16 text-center">
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-neutral-300"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <p className="mt-4 font-display text-lg text-neutral-400">
            No se encontraron fragancias
          </p>
          <p className="mt-1 font-body text-sm text-neutral-400">
            Probá con otro término o cambiá de categoría.
          </p>
          <button
            onClick={() => {
              setActiveCategory("all");
              setSearchQuery("");
            }}
            className="mt-4 rounded-full bg-black px-5 py-2 font-body text-xs font-semibold uppercase tracking-wider text-white transition-all hover:bg-neutral-800"
          >
            Ver todo
          </button>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((p) => (
            <ProductCard key={p.id} {...p} />
          ))}
        </div>
      )}
    </div>
  );
}