"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent, type ReactNode } from "react";
import {
  createReward,
  updateReward,
  type RewardFormInput,
} from "@/app/admin/recompensas/actions";

interface RewardFormProps {
  mode: "create" | "edit";
  rewardId?: string;
  initialValues?: RewardFormInput;
}

const EMPTY_VALUES: RewardFormInput = {
  name: "",
  description: "",
  image: "",
  points_cost: 0,
  stock: 0,
  active: true,
};

export default function RewardForm({
  mode,
  rewardId,
  initialValues,
}: RewardFormProps) {
  const router = useRouter();
  const [values, setValues] = useState<RewardFormInput>(
    initialValues ?? EMPTY_VALUES
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function update<K extends keyof RewardFormInput>(
    key: K,
    value: RewardFormInput[K]
  ) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const result =
      mode === "create"
        ? await createReward(values)
        : await updateReward(rewardId!, values);

    setLoading(false);

    if ("error" in result) {
      setError(result.error);
      return;
    }

    router.push("/admin/recompensas");
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
      <Field label="Costo en puntos">
        <input
          required
          value={values.points_cost}
          onChange={(e) => update("points_cost", Number(e.target.value))}
          className="input"
          type="number"
          min={1}
          step={1}
        />
      </Field>
      <Field label="Stock">
        <input
          required
          value={values.stock}
          onChange={(e) => update("stock", Number(e.target.value))}
          className="input"
          type="number"
          min={0}
          step={1}
        />
      </Field>
      <label className="flex items-center gap-2 font-body text-sm text-ink/70">
        <input
          type="checkbox"
          checked={values.active}
          onChange={(e) => update("active", e.target.checked)}
        />
        Activa (visible en el catálogo público)
      </label>

      {error && <p className="font-body text-sm text-wine">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="mt-2 w-full rounded-full bg-ink py-3.5 font-body text-sm font-medium uppercase tracking-[0.1em] text-bone transition-colors hover:bg-amber hover:text-ink disabled:opacity-50"
      >
        {loading
          ? "Guardando..."
          : mode === "create"
          ? "Crear recompensa"
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