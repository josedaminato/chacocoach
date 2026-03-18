import type { Metadata } from "next";
import { trainerConfig } from "@/lib/getConfig";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description: `Política de privacidad de ${trainerConfig.name}.`,
};

export default function PoliticaPrivacidadPage() {
  return (
    <>
      <section className="pt-32 pb-16 bg-[var(--secondary)] text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl md:text-5xl mb-4">
            Política de privacidad
          </h1>
          <p className="text-white/80">
            Última actualización: {new Date().toLocaleDateString("es-AR")}
          </p>
        </div>
      </section>
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-lg max-w-none">
          <h2>1. Responsable del tratamiento</h2>
          <p>
            El responsable del tratamiento de los datos personales es{" "}
            <strong>{trainerConfig.name}</strong>, con email de contacto:{" "}
            <a href={`mailto:${trainerConfig.email}`}>{trainerConfig.email}</a>.
          </p>

          <h2>2. Datos que se recopilan</h2>
          <p>
            A través del formulario de contacto recopilamos: nombre, email,
            teléfono (opcional), objetivo fitness (opcional) y el mensaje que nos
            enviás. Estos datos son proporcionados voluntariamente por vos.
          </p>

          <h2>3. Finalidad del tratamiento</h2>
          <p>
            Los datos se utilizan exclusivamente para: responder a tu consulta,
            enviarte información sobre los servicios de entrenamiento que
            ofrezco, y gestionar la comunicación relacionada con tu interés en
            mis servicios.
          </p>

          <h2>4. Derechos del usuario</h2>
          <p>
            Tenés derecho a: acceder a tus datos, rectificarlos si son
            incorrectos, solicitar su supresión, limitar el tratamiento,
            oponerte al tratamiento y a la portabilidad de los datos. Para
            ejercer estos derechos, contactame a {trainerConfig.email}.
          </p>

          <h2>5. Cookies</h2>
          <p>
            Este sitio no utiliza cookies de terceros salvo las estrictamente
            necesarias para su funcionamiento. Si se configura Google
            Analytics (NEXT_PUBLIC_GA_ID), se utilizarán cookies de analytics
            para medir el tráfico. Podés configurar tu navegador para rechazar
            cookies.
          </p>

          <h2>6. Contacto para ejercer derechos</h2>
          <p>
            Para cualquier consulta sobre esta política o para ejercer tus
            derechos, contactame a {trainerConfig.email}. Esta política aplica
            a usuarios en {trainerConfig.country}.
          </p>
        </div>
      </section>
    </>
  );
}
