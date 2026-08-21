"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import { formatPoints } from "@/lib/points";

const NAV_LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/productos", label: "Productos" },
  { href: "/canje", label: "Canje" },
  { href: "/#nosotros", label: "Sobre nosotros" },
  { href: "/#contacto", label: "Contacto" },
];

interface NavbarProps {
  user: { email: string | null; name: string | null; points: number } | null;
}

export default function Navbar({ user }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const { cartCount } = useCart();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const displayName = user?.name || user?.email?.split("@")[0] || "";

  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-bone/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 md:px-8">
        <Link href="/" onClick={() => setOpen(false)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="Prime Essence" className="h-11 w-auto md:h-14" />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="link-underline pb-1 font-body text-[13px] font-medium uppercase tracking-[0.14em] text-ink/70 transition-colors hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/carrito"
            aria-label="Ver carrito"
            onClick={() => setOpen(false)}
            className="relative flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors hover:border-amber hover:text-amber-ink"
          >
            <BagIcon />
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber font-mono text-[10px] text-ink">
                {cartCount > 9 ? "9+" : cartCount}
              </span>
            )}
          </Link>

          {user ? (
            <div className="hidden items-center gap-3 sm:flex">
              <Link
                href="/cuenta"
                className="rounded-full border border-amber/40 bg-amber/10 px-3 py-1.5 font-mono text-[12px] text-amber-ink transition-colors hover:border-amber"
              >
                {formatPoints(user.points)} pts
              </Link>
              <span className="font-body text-[13px] text-ink/70">
                Hola, {displayName}
              </span>
              <form action="/auth/logout" method="post">
                <button
                  type="submit"
                  className="rounded-full border border-ink/20 px-4 py-2 font-body text-[13px] font-medium uppercase tracking-[0.1em] text-ink/70 transition-colors hover:border-ink hover:text-ink"
                >
                  Cerrar sesión
                </button>
              </form>
            </div>
          ) : (
            <Link
              href="/login"
              className="hidden rounded-full border border-ink px-5 py-2 font-body text-[13px] font-medium uppercase tracking-[0.1em] text-ink transition-colors hover:bg-ink hover:text-bone sm:inline-block"
            >
              Iniciar sesión
            </Link>
          )}

          <button
            type="button"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            onClick={() => setOpen((prev) => !prev)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 text-ink md:hidden"
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      <div
        className={`fixed inset-x-0 top-[65px] bottom-0 z-40 flex flex-col bg-ink px-8 pt-10 text-bone transition-opacity duration-300 md:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <nav className="flex flex-col gap-6">
          {NAV_LINKS.map((link, i) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              style={{ animationDelay: open ? `${i * 60}ms` : "0ms" }}
              className={`font-display text-2xl text-bone/90 ${
                open ? "animate-fade-up" : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
          {user && (
            <Link
              href="/cuenta"
              onClick={() => setOpen(false)}
              className="font-display text-2xl text-bone/90"
            >
              Mis puntos
            </Link>
          )}
        </nav>

        {user ? (
          <div className="mt-10 flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <span className="font-body text-sm text-bone/70">{displayName}</span>
              <span className="font-mono text-xs text-amber">
                {formatPoints(user.points)} pts
              </span>
            </div>
            <form action="/auth/logout" method="post">
              <button
                type="submit"
                className="rounded-full border border-gold px-6 py-3 font-body text-sm uppercase tracking-[0.1em] text-gold"
              >
                Cerrar sesión
              </button>
            </form>
          </div>
        ) : (
          <Link
            href="/login"
            onClick={() => setOpen(false)}
            className="mt-10 w-fit rounded-full border border-gold px-6 py-3 font-body text-sm uppercase tracking-[0.1em] text-gold"
          >
            Iniciar sesión
          </Link>
        )}
      </div>
    </header>
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
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}