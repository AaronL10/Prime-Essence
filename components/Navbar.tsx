"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import { formatPoints } from "@/lib/points";

const NAV_LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/productos", label: "Productos" },
  { href: "/canje", label: "Canje" },
  { href: "#nosotros", label: "Sobre nosotros" },  // ← sin el / inicial
  { href: "#contacto", label: "Contacto" },        // ← sin el / inicial
];

interface NavbarProps {
  user: { email: string | null; name: string | null; points: number } | null;
}

export default function Navbar({ user }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { cartCount } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const displayName = user?.name || user?.email?.split("@")[0] || "";

  return (
    <>
      <header
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-neutral-200 bg-white/95 backdrop-blur-md shadow-sm"
            : "bg-white"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-8">
          {/* Logo */}
          <Link href="/" onClick={() => setOpen(false)} className="flex-shrink-0">
            <img
              src="/favic.png"
              alt="Prime Essence"
              className="h-9 w-auto md:h-10"
            />
          </Link>

{/* Desktop nav */}
<nav className="hidden items-center gap-8 md:flex">
  {NAV_LINKS.map((link) => {
    const isAnchor = link.href.startsWith("#");
    const className = "nav-link font-body text-[13px] font-medium uppercase tracking-[0.12em] text-neutral-500 transition-colors hover:text-black";
    
    return isAnchor ? (
      <a key={link.label} href={link.href} className={className}>
        {link.label}
      </a>
    ) : (
      <Link key={link.label} href={link.href} className={className}>
        {link.label}
      </Link>
    );
  })}
</nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Carrito */}
            <Link
              href="/carrito"
              aria-label="Ver carrito"
              onClick={() => setOpen(false)}
              className="relative flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 text-black transition-all hover:border-black hover:bg-black hover:text-white"
            >
              <BagIcon />
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-black font-mono text-[10px] font-medium text-white">
                  {cartCount > 9 ? "9+" : cartCount}
                </span>
              )}
            </Link>

            {/* Usuario desktop - AHORA VISIBLE EN MD+ */}
            {user ? (
              <div className="hidden items-center gap-3 md:flex">
                <Link
                  href="/cuenta"
                  className="rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1.5 font-mono text-[11px] font-medium text-neutral-700 transition-all hover:border-black hover:bg-black hover:text-white"
                >
                  {formatPoints(user.points)} pts
                </Link>
                <span className="max-w-[100px] truncate font-body text-[13px] text-neutral-500">
                  {displayName}
                </span>
                <form action="/auth/logout" method="post">
                  <button
                    type="submit"
                    className="rounded-full border border-neutral-200 px-4 py-2 font-body text-[12px] font-semibold uppercase tracking-[0.1em] text-black transition-all hover:bg-black hover:text-white"
                  >
                    Salir
                  </button>
                </form>
              </div>
            ) : (
              <Link
                href="/login"
                className="hidden rounded-full border border-neutral-200 px-5 py-2 font-body text-[12px] font-semibold uppercase tracking-[0.1em] text-black transition-all hover:bg-black hover:text-white md:inline-block"
              >
                Ingresar
              </Link>
            )}

            {/* Mobile menu button */}
            <button
              type="button"
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={open}
              onClick={() => setOpen((prev) => !prev)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 text-black transition-all hover:border-black hover:bg-black hover:text-white md:hidden"
            >
              {open ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-[60] md:hidden ${
          open ? "pointer-events-auto visible" : "pointer-events-none invisible"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
          style={{ opacity: open ? 1 : 0 }}
          onClick={() => setOpen(false)}
        />

        <div
          className="absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl transition-transform duration-300 ease-out"
          style={{
            transform: open ? "translateX(0)" : "translateX(100%)",
          }}
        >
          <div className="flex h-16 items-center justify-between border-b border-neutral-200 px-6">
            <span className="font-display text-lg text-black">Menú</span>
            <button
              onClick={() => setOpen(false)}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-200 text-black transition-all hover:border-black hover:bg-black hover:text-white"
            >
              <CloseIcon />
            </button>
          </div>

<nav className="flex flex-col p-6">
  {NAV_LINKS.map((link) => {
    // Si el link empieza con #, usamos <a>, si no, usamos <Link>
    if (link.href.startsWith("#")) {
      return (
        <a
          key={link.label}
          href={link.href}
          onClick={() => setOpen(false)}
          className="nav-link border-b border-neutral-100 py-4 font-display text-xl text-black"
        >
          {link.label}
        </a>
      );
    }
    
    return (
      <Link
        key={link.label}
        href={link.href}
        onClick={() => setOpen(false)}
        className="nav-link border-b border-neutral-100 py-4 font-display text-xl text-black"
      >
        {link.label}
      </Link>
    );
  })}

            {user && (
              <Link
                href="/cuenta"
                onClick={() => setOpen(false)}
                className="border-b border-neutral-100 py-4 font-display text-xl text-black"
              >
                Mi cuenta
              </Link>
            )}
          </nav>

          <div className="absolute bottom-0 left-0 right-0 border-t border-neutral-200 bg-white p-6">
            {user ? (
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-body text-sm text-neutral-500">{displayName}</p>
                  <p className="font-mono text-xs text-neutral-400">
                    {formatPoints(user.points)} pts
                  </p>
                </div>
                <form action="/auth/logout" method="post">
                  <button
                    type="submit"
                    className="rounded-full border border-neutral-200 px-5 py-2 font-body text-xs font-semibold uppercase tracking-[0.1em] text-black transition-all hover:bg-black hover:text-white"
                  >
                    Salir
                  </button>
                </form>
              </div>
            ) : (
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="block w-full rounded-full bg-black py-3 text-center font-body text-sm font-semibold uppercase tracking-[0.1em] text-white"
              >
                Iniciar sesión
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="h-16" />
    </>
  );
}

function BagIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M6 8h12l-1 12H7L6 8Z" strokeLinejoin="round" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" strokeLinecap="round" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}    