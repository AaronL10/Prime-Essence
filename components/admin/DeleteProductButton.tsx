"use client";

import { useState, useTransition } from "react";
import { deleteProduct } from "@/app/admin/productos/actions";

export default function DeleteProductButton({
  id,
  name,
}: {
  id: string;
  name: string;
}) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleDelete() {
    if (!confirm(`¿Eliminar "${name}"? Esta acción no se puede deshacer.`)) {
      return;
    }

    startTransition(async () => {
      const result = await deleteProduct(id);
      if ("error" in result) {
        setError(result.error);
      }
    });
  }

  return (
    <div className="inline-flex flex-col items-end">
      <button
        type="button"
        onClick={handleDelete}
        disabled={isPending}
        className="text-wine underline underline-offset-4 hover:opacity-70 disabled:opacity-50"
      >
        {isPending ? "Eliminando..." : "Eliminar"}
      </button>
      {error && <span className="mt-1 text-xs text-wine">{error}</span>}
    </div>
  );
}