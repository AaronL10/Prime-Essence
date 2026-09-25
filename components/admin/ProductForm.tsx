"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent, type ReactNode } from "react";
import {
  createProduct,
  updateProduct,
  type ProductFormInput,
} from "@/app/admin/productos/actions";

interface ProductFormProps {
  mode: "create" | "edit";
  productId?: string;
  initialValues?: ProductFormInput;
}

const SIZES = [2, 5, 10, 20];

const EMPTY_VALUES: ProductFormInput = {
  slug: "",
  name: "",
  brand: "",
  description: "",
  image: "",
  variants: SIZES.map((sizeMl) => ({ sizeMl, price: 0, stock: 0 })),
};

export default function ProductForm({
  mode,
  productId,
  initialValues,
}: ProductFormProps) {
  const router = useRouter();
  const [values, setValues] = useState<ProductFormInput>(
    initialValues ?? EMPTY_VALUES
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function update<K extends keyof ProductFormInput>(
    key: K,
    value: ProductFormInput[K]
  ) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function updateVariant(
    sizeMl: number,
    field: "price" | "stock",
    value: number
  ) {
    setValues((prev) => ({
      ...prev,
      variants: prev.variants.map((v) =>
        v.sizeMl === sizeMl ? { ...v, [field]: value } : v
      ),
    }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const result =
      mode === "create"
        ? await createProduct(values)
        : await updateProduct(productId!, values);

    setLoading(false);

    if ("error" in result) {
      setError(result.error);
      return;
    }

    router.push("/admin/productos");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="flex max-w-xl flex-col gap-4">
      <Field label="Nombre">
        <input
          required
          value={values.name}
          onChange={(e) => update("name", e.target.value)}
          className="input"
          type="text"
        />
      </Field>
      <Field label="Marca">
        <input
          required
          value={values.brand}
          onChange={(e) => update("brand", e.target.value)}
          className="input"
          type="text"
        />
      </Field>
      <Field label="Slug">
        <input
          required
          value={values.slug}
          onChange={(e) => update("slug", e.target.value)}
          className="input"
          type="text"
        />
      </Field>
      <Field label="Descripción">
        <textarea
          value={values.description}
          onChange={(e) => update("description", e.target.value)}
          className="input min-h-24 resize-none"
        />
      </Field>
      <Field label="URL de imagen">
        <input
          value={values.image}
          onChange={(e) => update("image", e.target.value)}
          className="input"
          type="text"
        />
      </Field>

      <div>
        <p className="font-body text-xs font-medium uppercase tracking-wide text-ink/50">
          Tamaños, precios y stock
        </p>
        <div className="mt-2 flex flex-col gap-2">
          {values.variants.map((v) => (
            <div
              key={v.sizeMl}
              className="grid grid-cols-3 items-center gap-3 rounded-card border border-ink/10 p-3"
            >
              <span className="font-mono text-sm text-ink">{v.sizeMl}ml</span>
              <label className="flex flex-col gap-1">
                <span className="font-body text-[10px] uppercase tracking-wide text-ink/40">
                  Precio
                </span>
                <input
                  required
                  value={v.price}
                  onChange={(e) =>
                    updateVariant(v.sizeMl, "price", Number(e.target.value))
                  }
                  className="input"
                  type="number"
                  min={0}
                  step="0.01"
                />
              </label>
              <label className="flex flex-col gap-1">
                <span className="font-body text-[10px] uppercase tracking-wide text-ink/40">
                  Stock
                </span>
                <input
                  required
                  value={v.stock}
                  onChange={(e) =>
                    updateVariant(v.sizeMl, "stock", Number(e.target.value))
                  }
                  className="input"
                  type="number"
                  min={0}
                  step={1}
                />
              </label>
            </div>
          ))}
        </div>
      </div>

      {error && <p className="font-body text-sm text-wine">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="mt-2 w-full rounded-full bg-ink py-3.5 font-body text-sm font-medium uppercase tracking-[0.1em] text-bone transition-colors hover:bg-amber hover:text-ink disabled:opacity-50"
      >
        {loading
          ? "Guardando..."
          : mode === "create"
          ? "Crear producto"
          : "Guardar cambios"}
      </button>
    </form>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="font-body text-xs font-medium uppercase tracking-wide text-ink/50">
        {label}
      </span>
      {children}
    </label>
  );
}