import type { Metadata } from "next";
import { Fraunces, Manrope, Space_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import WelcomePopup from "@/components/WelcomePopup";
import { createClient } from "@/lib/supabase/server";
import { CartProvider } from "@/context/CartContext";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Prime Essence | Perfumes y decants",
  description:
    "Compra perfumes originales fraccionados en decants desde 2ml. Probá tu próxima fragancia sin comprometer el frasco completo.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  let points = 0;

  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("points")
      .eq("id", user.id)
      .maybeSingle();

    points = profile?.points ?? 0;
  }

  const sessionUser = user
    ? {
        email: user.email ?? null,
        name:
          (user.user_metadata?.full_name as string | undefined) ??
          (user.user_metadata?.name as string | undefined) ??
          null,
        points,
      }
    : null;

  return (
    <html
      lang="es"
      className={`${fraunces.variable} ${manrope.variable} ${spaceMono.variable}`}
    >
      <body className="font-body bg-bone text-ink antialiased">
        <CartProvider>
          <Navbar user={sessionUser} />
          {children}
          <Footer />
          <WhatsAppButton />
          <WelcomePopup user={sessionUser} />
        </CartProvider>
      </body>
    </html>
  );
}