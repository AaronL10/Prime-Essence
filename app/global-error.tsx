"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="es">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1.25rem",
          fontFamily: "system-ui, sans-serif",
          backgroundColor: "#FBF8F2",
          color: "#16130F",
          textAlign: "center",
          padding: "2rem",
        }}
      >
        <p
          style={{
            fontSize: "0.75rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#B8853A",
            margin: 0,
          }}
        >
          Error
        </p>
        <h1 style={{ fontSize: "1.75rem", fontWeight: 600, margin: 0 }}>
          Algo salió mal
        </h1>
        <p style={{ maxWidth: "38ch", fontSize: "0.9rem", opacity: 0.7, margin: 0 }}>
          Ocurrió un error inesperado al cargar el sitio. Probá recargar la
          página.
        </p>
        <button
          type="button"
          onClick={() => reset()}
          style={{
            borderRadius: "9999px",
            backgroundColor: "#16130F",
            color: "#FBF8F2",
            padding: "0.75rem 1.5rem",
            fontSize: "0.8rem",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            border: "none",
            cursor: "pointer",
          }}
        >
          Reintentar
        </button>
      </body>
    </html>
  );
}