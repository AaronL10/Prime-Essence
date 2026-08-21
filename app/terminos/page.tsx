export default function TerminosPage() {
  return (
    <main>
      <section className="border-b border-ink/10 bg-paper">
        <div className="mx-auto max-w-3xl px-5 py-16 md:px-8 md:py-20">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-amber-ink">
            Legal
          </p>
          <h1 className="mt-3 font-display text-4xl text-ink sm:text-5xl">
            Términos y condiciones
          </h1>
          <p className="mt-4 font-body text-sm text-ink/50">
            Última actualización: 20 de agosto de 2026
          </p>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-3xl px-5 py-14 md:px-8">
          <div className="flex flex-col gap-8 font-body text-sm leading-relaxed text-ink/75">
            <Block title="1. Aceptación de los términos">
              Al acceder y utilizar el sitio de Prime Essence (&quot;el
              Sitio&quot;), aceptás estos términos y condiciones en su
              totalidad. Si no estás de acuerdo con alguna parte, te pedimos
              que no utilices el Sitio.
            </Block>

            <Block title="2. Sobre los productos">
              Prime Essence comercializa decants: fracciones de perfumes
              originales, extraídas del frasco de fábrica y envasadas en
              viales de vidrio. Los decants no son réplicas ni imitaciones —
              son el mismo producto original, en una cantidad menor. Las
              imágenes y descripciones del catálogo son ilustrativas; el
              color y la presentación del vial pueden variar levemente.
            </Block>

            <Block title="3. Precios y disponibilidad">
              Los precios se muestran en guaraníes (Gs.) e incluyen los
              impuestos aplicables. Nos reservamos el derecho de modificar
              precios y stock sin previo aviso. El stock mostrado en el Sitio
              se actualiza en tiempo real, pero puede haber pequeñas
              diferencias si dos personas compran el mismo producto de forma
              simultánea.
            </Block>

            <Block title="4. Proceso de pedido">
              Para realizar un pedido es necesario crear una cuenta e
              iniciar sesión. Una vez confirmado el pedido desde el Sitio, te
              contactaremos por WhatsApp para coordinar el pago y la
              entrega. El pedido queda sujeto a verificación y confirmación
              manual de nuestra parte antes de procesarse.
            </Block>

            <Block title="5. Pagos">
              El Sitio no procesa pagos en línea. El medio de pago se acuerda
              directamente por WhatsApp una vez generado el pedido.
            </Block>

            <Block title="6. Envíos y entregas">
              Los tiempos y costos de envío se coordinan por WhatsApp según
              tu ubicación. No nos hacemos responsables por demoras
              ocasionadas por servicios de mensajería externos.
            </Block>

            <Block title="7. Cancelaciones">
              Un pedido puede cancelarse antes de ser confirmado
              contactándonos por WhatsApp. Los pedidos cancelados no generan
              cargos ni descuentan puntos de forma definitiva.
            </Block>

            <Block title="8. Programa de puntos">
              Por cada compra confirmada, acumulás 1 punto Prime por cada
              1000 Gs. efectivamente pagados. Los puntos pueden canjearse
              como descuento en futuras compras (hasta un máximo del 50% del
              total del pedido) o por recompensas del catálogo de canje. Los
              puntos no tienen valor monetario, no son transferibles ni
              reembolsables en efectivo, y Prime Essence se reserva el
              derecho de modificar el programa, sus ratios de conversión o
              discontinuarlo en cualquier momento, respetando los puntos ya
              acumulados hasta ese momento.
            </Block>

            <Block title="9. Cuentas de usuario">
              Sos responsable de mantener la confidencialidad de tu cuenta y
              contraseña, y de toda actividad que ocurra bajo tu cuenta.
              Notificanos de inmediato ante cualquier uso no autorizado.
            </Block>

            <Block title="10. Propiedad intelectual">
              El contenido del Sitio (textos, imágenes, logo, diseño) es
              propiedad de Prime Essence o de sus respectivos licenciantes, y
              no puede reproducirse sin autorización.
            </Block>

            <Block title="11. Limitación de responsabilidad">
              Prime Essence no será responsable por daños indirectos
              derivados del uso del Sitio o de los productos, más allá de lo
              que establezca la legislación vigente aplicable.
            </Block>

            <Block title="12. Modificaciones">
              Podemos actualizar estos términos en cualquier momento. La
              versión vigente es siempre la publicada en esta página.
            </Block>

            <Block title="13. Contacto">
              Para consultas sobre estos términos, escribinos por WhatsApp
              desde el botón flotante del Sitio.
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