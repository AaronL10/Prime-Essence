import Link from "next/link";

const NAV_LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/productos", label: "Productos" },
  { href: "/canje", label: "Canje" },
];

const LEGAL_LINKS = [
  { href: "/terminos", label: "Términos" },
  { href: "/privacidad", label: "Privacidad" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-neutral-200 bg-black text-white">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 md:grid-cols-4 md:gap-8">
          {/* Logo + descripción */}
          <div>
            <img src="/favic.png" alt="Prime Essence" className="h-10 w-auto" />
            <p className="mt-4 max-w-[26ch] font-body text-sm leading-relaxed text-neutral-400">
              Casas de nicho y clásicos de autor, fraccionados a mano en decants desde 3ml.
            </p>
          </div>

          {/* Navegación */}
          <div>
            <h3 className="font-body text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500">
              Navegación
            </h3>
            <ul className="mt-4 space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="font-body text-sm text-neutral-300 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="font-body text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500">
              Contacto
            </h3>
            <ul className="mt-4 space-y-3 font-body text-sm text-neutral-300">
              <li>
                <a href="mailto:hola@primeessence.com" className="transition-colors hover:text-white">
                  hola@primeessence.com
                </a>
              </li>
              <li>
                <a href="tel:+595210000000" className="transition-colors hover:text-white">
                  +595 21 000 000
                </a>
              </li>
              <li className="text-neutral-500">Asunción, Paraguay</li>
            </ul>
          </div>

          {/* Redes */}
          <div>
            <h3 className="font-body text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500">
              Seguinos
            </h3>
            <div className="mt-4 flex items-center gap-3">
              <a
                href="https://wa.me/595210000000"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-700 text-neutral-300 transition-all hover:border-white hover:text-white"
              >
                <WhatsAppIcon />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-700 text-neutral-300 transition-all hover:border-white hover:text-white"
              >
                <InstagramIcon />
              </a>
              <a
                href="#"
                aria-label="TikTok"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-700 text-neutral-300 transition-all hover:border-white hover:text-white"
              >
                <TikTokIcon />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-neutral-800 pt-6 font-mono text-[11px] text-neutral-500 md:flex-row md:items-center">
          <span>© {year} Prime Essence</span>
          <div className="flex items-center gap-5">
            {LEGAL_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="transition-colors hover:text-white">
                {link.label}
              </Link>
            ))}
          </div>
          <span className="text-neutral-600">Hecho para quienes coleccionan aromas.</span>
        </div>
      </div>
    </footer>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M4 20l1.3-4A8 8 0 1 1 9 19l-5 1Z" strokeLinejoin="round" />
      <path d="M8.5 9.5c0 3.5 3 6.5 6.5 6.5.6 0 1-.5.8-1l-.7-1.6c-.2-.4-.7-.6-1.1-.4l-1 .5a5 5 0 0 1-3-3l.5-1c.2-.4 0-.9-.4-1.1L8.5 8c-.5-.2-1 .2-1 .8v.7Z" strokeLinejoin="round" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M14 3v10.5a3.5 3.5 0 1 1-3.5-3.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 3c0 2.8 2 5 5 5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}