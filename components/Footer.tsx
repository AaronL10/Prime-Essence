import Link from "next/link";

const NAV_LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/productos", label: "Productos" },
  { href: "/#nosotros", label: "Sobre nosotros" },
  { href: "/#contacto", label: "Contacto" },
];

const LEGAL_LINKS = [
  { href: "/terminos", label: "Términos y condiciones" },
  { href: "/privacidad", label: "Política de privacidad" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="contacto" className="scroll-mt-24 border-t border-gold/25 bg-ink text-bone">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4 md:gap-8">
          <div>
            <div className="inline-flex rounded-2xl bg-white p-2.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.png" alt="Prime Essence" className="h-12 w-auto" />
            </div>
            <p className="mt-4 max-w-[26ch] font-body text-sm leading-relaxed text-bone/65">
              Casas de nicho y clásicos de autor, fraccionados a mano en decants desde 3ml. La misma fragancia, en tu tamaño.
            </p>
          </div>

          <div>
            <h3 className="font-body text-xs font-semibold uppercase tracking-[0.16em] text-bone/50">Navegación</h3>
            <ul className="mt-4 space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="font-body text-sm text-bone/75 transition-colors hover:text-amber-light">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-body text-xs font-semibold uppercase tracking-[0.16em] text-bone/50">Contacto</h3>
            <ul className="mt-4 space-y-3 font-body text-sm text-bone/75">
              <li>
                <a href="mailto:hola@primeessence.com" className="transition-colors hover:text-amber-light">
                  hola@primeessence.com
                </a>
              </li>
              <li>
                <a href="tel:+595210000000" className="transition-colors hover:text-amber-light">
                  +595 21 000 000
                </a>
              </li>
              <li className="text-bone/50">Asunción, Paraguay</li>
            </ul>
          </div>

          <div>
            <h3 className="font-body text-xs font-semibold uppercase tracking-[0.16em] text-bone/50">Seguinos</h3>
            <div className="mt-4 flex items-center gap-3">
              <a href="https://wa.me/595210000000" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="flex h-10 w-10 items-center justify-center rounded-full border border-bone/20 text-bone/75 transition-colors hover:border-amber hover:text-amber-light">
                <WhatsAppIcon />
              </a>
              <a href="#" aria-label="Instagram" className="flex h-10 w-10 items-center justify-center rounded-full border border-bone/20 text-bone/75 transition-colors hover:border-amber hover:text-amber-light">
                <InstagramIcon />
              </a>
              <a href="#" aria-label="TikTok" className="flex h-10 w-10 items-center justify-center rounded-full border border-bone/20 text-bone/75 transition-colors hover:border-amber hover:text-amber-light">
                <TikTokIcon />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-bone/10 pt-6 font-mono text-[11px] text-bone/55 md:flex-row md:items-center">
          <span>© {year} Prime Essence. Todos los derechos reservados.</span>
          <div className="flex items-center gap-5">
            {LEGAL_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-amber-light"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <span>Hecho para quienes coleccionan aromas, no frascos.</span>
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