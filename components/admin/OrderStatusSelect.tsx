"use client";

import { useState, useTransition } from "react";
import { updateOrderStatus, type OrderStatus } from "@/app/admin/pedidos/actions";

const STATUSES: OrderStatus[] = [
  "pendiente",
  "confirmado",
  "enviado",
  "entregado",
  "cancelado",
];

export default function OrderStatusSelect({
  orderId,
  currentStatus,
}: {
  orderId: string;
  currentStatus: string;
}) {
  const [status, setStatus] = useState(currentStatus);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleChange(newStatus: string) {
    const previous = status;
    setStatus(newStatus);
    setError(null);

    startTransition(async () => {
      const result = await updateOrderStatus(orderId, newStatus as OrderStatus);
      if ("error" in result) {
        setError(result.error);
        setStatus(previous);
      }
    });
  }

  return (
    <div className="flex flex-col items-end gap-1">
      <select
        value={status}
        onChange={(e) => handleChange(e.target.value)}
        disabled={isPending}
        className="rounded-full border border-ink/20 bg-paper px-4 py-2 font-mono text-xs uppercase tracking-wide text-ink"
      >
        {STATUSES.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
      {error && <span className="text-xs text-wine">{error}</span>}
    </div>
  );
}