"use client";

import { buildGeneralInquiryMessage, buildWhatsAppLink } from "@/lib/whatsapp";

export default function WhatsAppButton() {
  const href = buildWhatsAppLink(buildGeneralInquiryMessage());

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Consultar por WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-ink/20 transition-transform hover:scale-105"
    >
      <WhatsAppIcon />
    </a>
  );
}

function WhatsAppIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M12.04 2c-5.46 0-9.9 4.44-9.9 9.9 0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.9-4.44 9.9-9.9S17.5 2 12.04 2Zm5.8 14.15c-.24.68-1.4 1.3-1.93 1.38-.5.08-1.12.11-1.8-.11a16.5 16.5 0 0 1-1.62-.6c-2.85-1.23-4.7-4.1-4.85-4.3-.14-.19-1.16-1.54-1.16-2.94s.73-2.09 1-2.38c.26-.28.57-.35.76-.35h.55c.18 0 .42-.02.64.5.24.57.8 1.97.87 2.11.07.14.11.31.02.5-.09.19-.14.3-.28.46-.14.16-.29.36-.42.48-.14.14-.28.29-.12.57.16.28.72 1.19 1.55 1.93 1.06.95 1.96 1.24 2.24 1.38.28.14.44.12.61-.07.16-.19.68-.79.87-1.06.18-.28.36-.23.6-.14.24.09 1.55.73 1.81.86.27.14.44.2.51.32.07.11.07.65-.16 1.33Z" />
    </svg>
  );
}