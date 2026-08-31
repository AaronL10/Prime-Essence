"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface WelcomePopupProps {
  user: { email: string | null; name: string | null; points: number } | null;
}

const POPUP_KEY = "prime-essence-welcome-closed";

function shouldShowPopup(): boolean {
  if (typeof window === "undefined") return false;

  const closedAt = localStorage.getItem(POPUP_KEY);
  if (!closedAt) return true;

  const closedDate = new Date(closedAt);
  const now = new Date();
  const diffDays = (now.getTime() - closedDate.getTime()) / (1000 * 60 * 60 * 24);

  return diffDays >= 7;
}

export default function WelcomePopup({ user }: WelcomePopupProps) {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    if (user) return; // No mostrar si está logueado

    const timer = setTimeout(() => {
      if (shouldShowPopup()) {
        setVisible(true);
      }
    }, 5000); // ← de 7000 a 5000

    return () => clearTimeout(timer);
  }, [user]);

  function handleClose() {
    setVisible(false);
    localStorage.setItem(POPUP_KEY, new Date().toISOString());
  }

  if (!mounted || !visible || user) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/40 backdrop-blur-sm px-5">
      <div className="relative w-full max-w-md rounded-card border border-amber/30 bg-paper p-8 shadow-2xl">
        <button
          type="button"
          onClick={handleClose}
          aria-label="Cerrar"
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-ink/40 transition-colors hover:bg-ink/5 hover:text-ink"
        >
          <CloseIcon />
        </button>

        <p className="font-mono text-xs uppercase tracking-[0.2em] text-amber-ink">
          Club de Decants
        </p>
        <h2 className="mt-3 font-display text-2xl text-ink sm:text-3xl">
          Sumate al Club de Decants
        </h2>
        <p className="mt-3 font-body text-sm leading-relaxed text-ink/65">
          Creá tu cuenta gratis, acumulá puntos con cada compra y desbloqueá
          descuentos, decants y premios exclusivos.
        </p>

        <ul className="mt-5 space-y-2 font-body text-sm text-ink/70">
          <li className="flex items-start gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-amber" />
            <span>50 puntos por crear tu cuenta.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-amber" />
            <span>50 puntos extra al completar tu primer pedido.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-amber" />
            <span>Puntos por cada compra.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-amber" />
            <span>Recompensas exclusivas para clientes frecuentes.</span>
          </li>
        </ul>

        <div className="mt-8 flex flex-col gap-3">
          <Link
            href="/registro"
            onClick={handleClose}
            className="block w-full rounded-full bg-ink py-3 text-center font-body text-sm font-medium uppercase tracking-[0.1em] text-bone transition-colors hover:bg-amber hover:text-ink"
          >
            Crear mi cuenta
          </Link>
          <Link
            href="/login"
            onClick={handleClose}
            className="block w-full rounded-full border border-ink/20 py-3 text-center font-body text-sm font-medium text-ink transition-colors hover:border-ink"
          >
            Ya tengo cuenta
          </Link>
        </div>
      </div>
    </div>
  );
}

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}