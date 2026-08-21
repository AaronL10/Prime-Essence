"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent, type ReactNode } from "react";
import { createClient } from "@/lib/supabase/client";

export default function RegistroPage() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const router = useRouter();
  const supabase = createClient();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: nombre },
        emailRedirectTo: `${window.location.origin}/auth/confirm`,
      },
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    if (data.session) {
      router.push("/");
      router.refresh();
      return;
    }

    setSent(true);
  }

  async function handleGoogle() {
    setError(null);
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
  }

  if (sent) {
    return (
      <main className="mx-auto flex min-h-[70vh] max-w-md flex-col items-center justify-center px-5 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-amber-ink">
          Casi listo
        </p>
        <h1 className="mt-3 font-display text-3xl text-ink">Revisá tu correo</h1>
        <p className="mt-3 font-body text-sm leading-relaxed text-ink/60">
          Te enviamos un link a <strong>{email}</strong> para confirmar tu cuenta.
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-5 py-16">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-amber-ink">
        Crear cuenta
      </p>
      <h1 className="mt-3 font-display text-3xl text-ink">Sumate a Prime Essence</h1>
      <p className="mt-2 font-body text-sm text-ink/60">
        Guardá tus decants favoritos y sumá puntos en cada compra.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
        <Field label="Nombre">
          <input
            required
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="input"
            type="text"
            autoComplete="name"
          />
        </Field>
        <Field label="Email">
          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
            type="email"
            autoComplete="email"
          />
        </Field>
        <Field label="Contraseña">
          <input
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
            type="password"
            autoComplete="new-password"
          />
        </Field>

        {error && <p className="font-body text-sm text-wine">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="mt-2 w-full rounded-full bg-ink py-3.5 font-body text-sm font-medium uppercase tracking-[0.1em] text-bone transition-colors hover:bg-amber hover:text-ink disabled:opacity-50"
        >
          {loading ? "Creando cuenta..." : "Crear cuenta"}
        </button>
      </form>

      <Divider />

      <button
        type="button"
        onClick={handleGoogle}
        className="flex w-full items-center justify-center gap-3 rounded-full border border-ink/20 py-3.5 font-body text-sm font-medium text-ink transition-colors hover:border-ink"
      >
        <GoogleIcon />
        Continuar con Google
      </button>

      <p className="mt-8 text-center font-body text-sm text-ink/60">
        ¿Ya tenés cuenta?{" "}
        <Link href="/login" className="text-ink underline underline-offset-4 hover:text-amber-ink">
          Iniciá sesión
        </Link>
      </p>
    </main>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="font-body text-xs font-medium uppercase tracking-wide text-ink/50">
        {label}
      </span>
      {children}
    </label>
  );
}

function Divider() {
  return (
    <div className="my-6 flex items-center gap-4">
      <span className="h-px flex-1 bg-ink/10" />
      <span className="font-mono text-[11px] uppercase tracking-widest text-ink/40">o</span>
      <span className="h-px flex-1 bg-ink/10" />
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24">
      <path
        fill="#EA4335"
        d="M12 10.2v3.9h5.5c-.24 1.35-1.7 3.96-5.5 3.96-3.3 0-6-2.73-6-6.1s2.7-6.1 6-6.1c1.88 0 3.14.8 3.86 1.49l2.63-2.53C16.9 3.03 14.68 2 12 2 6.98 2 2.9 6.03 2.9 11s4.08 9 9.1 9c5.25 0 8.74-3.69 8.74-8.89 0-.6-.07-1.06-.15-1.51H12Z"
      />
    </svg>
  );
}