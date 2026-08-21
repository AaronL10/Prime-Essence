"use client";

import { useState, useTransition } from "react";
import { deleteReward } from "@/app/admin/recompensas/actions";

export default function DeleteRewardButton({
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
      const result = await deleteReward(id);
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