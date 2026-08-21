export default function PrivacidadPage() {
  return (
    <main>
      <section className="border-b border-ink/10 bg-paper">
        <div className="mx-auto max-w-3xl px-5 py-16 md:px-8 md:py-20">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-amber-ink">
            Legal
          </p>
          <h1 className="mt-3 font-display text-4xl text-ink sm:text-5xl">
            Política de privacidad
          </h1>
          <p className="mt-4 font-body text-sm text-ink/50">
            Última actualización: 20 de agosto de 2026
          </p>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-3xl px-5 py-14 md:px-8">
          <div className="flex flex-col gap-8 font-body text-sm leading-relaxed text-ink/75">
            <Block title="1. Qué datos recopilamos">
              Cuando creás una cuenta, recopilamos tu email y, si iniciás
              sesión con Google, tu nombre asociado a esa cuenta. Cuando
              hacés un pedido, recopilamos tu nombre completo, teléfono,
              dirección y ciudad de entrega. También guardamos un historial
              de tus pedidos, puntos y canjes.
            </Block>

            <Block title="2. Cómo usamos tus datos">
              Usamos esta información para procesar tus pedidos, contactarte
              por WhatsApp para coordinar pago y entrega, gestionar tu saldo
              de puntos, y mejorar el funcionamiento del Sitio. No usamos tus
              datos para enviarte publicidad sin tu consentimiento.
            </Block>

            <Block title="3. Con quién compartimos tus datos">
              Tus datos se almacenan en Supabase, nuestro proveedor de base
              de datos e infraestructura. Si iniciás sesión con Google,
              Google procesa los datos necesarios para la autenticación
              según su propia política de privacidad. Tus datos de contacto
              y dirección se comparten con nosotros mismos vía WhatsApp para
              coordinar la entrega — no se venden ni comparten con terceros
              con fines comerciales.
            </Block>

            <Block title="4. Cookies y almacenamiento local">
              El Sitio utiliza cookies técnicas de sesión (a través de
              Supabase Auth) necesarias para mantenerte logueado. El
              contenido de tu carrito de compras se guarda localmente en tu
              navegador (localStorage) y no se envía a nuestros servidores
              hasta que confirmás un pedido.
            </Block>

            <Block title="5. Seguridad">
              Aplicamos controles de acceso a nivel de base de datos (Row
              Level Security) para que cada usuario solo pueda ver y
              modificar su propia información, salvo el personal
              administrativo autorizado que gestiona pedidos y stock. La
              comunicación con el Sitio viaja cifrada (HTTPS).
            </Block>

            <Block title="6. Tus derechos">
              Podés solicitar acceso, corrección o eliminación de tus datos
              personales escribiéndonos por WhatsApp desde el botón flotante
              del Sitio. Responderemos tu solicitud a la brevedad posible.
            </Block>

            <Block title="7. Menores de edad">
              El Sitio no está dirigido a menores de edad. Si creés que un
              menor nos proporcionó datos personales sin supervisión de un
              adulto, contactanos para eliminarlos.
            </Block>

            <Block title="8. Cambios a esta política">
              Podemos actualizar esta política en cualquier momento. La
              versión vigente es siempre la publicada en esta página.
            </Block>

            <Block title="9. Contacto">
              Para consultas sobre privacidad y tus datos, escribinos por
              WhatsApp desde el botón flotante del Sitio.
            </Block>
          </div>
        </div>
      </section>
    </main>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-display text-lg text-ink">{title}</h2>
      <p className="mt-2">{children}</p>
    </div>
  );
}