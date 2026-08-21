// Número del negocio en formato internacional, sin "+" y sin espacios.
// Convertido desde 0971 546446 (formato local PY) → 595 971 546446
const WHATSAPP_NUMBER = "595971546446";

function formatPrice(price: number): string {
  return `$${price.toLocaleString("es-AR")}`;
}

export function buildWhatsAppLink(message: string): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
}

export function buildGeneralInquiryMessage(): string {
  return "Hola! Quería hacerte una consulta sobre Prime Essence.";
}

interface OrderWhatsAppItem {
  quantity: number;
  brand: string;
  name: string;
  sizeMl?: number | null;
  subtotal: number;
}

interface OrderWhatsAppDetails {
  id: string;
  fullName: string;
  phone: string;
  address: string;
  city: string;
  notes?: string | null;
  total: number;
  pointsUsed: number;
  discountAmount: number;
  totalPaid: number;
  items: OrderWhatsAppItem[];
}

export function buildOrderWhatsAppMessage(order: OrderWhatsAppDetails): string {
  const lines = [
    `Hola! Quiero confirmar mi pedido #${order.id.slice(0, 8)}`,
    "",
    "Productos:",
    ...order.items.map((item) => {
      const sizeLabel = item.sizeMl ? ` (${item.sizeMl}ml)` : "";
      return `- ${item.quantity}x ${item.brand} ${item.name}${sizeLabel} — ${formatPrice(
        item.subtotal
      )}`;
    }),
    "",
    `Subtotal: ${formatPrice(order.total)}`,
  ];

  if (order.pointsUsed > 0) {
    lines.push(
      `Descuento (${order.pointsUsed} pts): -${formatPrice(order.discountAmount)}`,
      `Total a pagar: ${formatPrice(order.totalPaid)}`
    );
  } else {
    lines.push(`Total: ${formatPrice(order.total)}`);
  }

  lines.push(
    "",
    "Datos de envío:",
    order.fullName,
    order.phone,
    `${order.address}, ${order.city}`
  );

  if (order.notes) {
    lines.push(`Notas: ${order.notes}`);
  }

  return lines.join("\n");
}