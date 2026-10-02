import { Link } from "react-router-dom";
import { Icon } from "../ui/Icon.jsx";

export function FinalCtaSection() {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
      <div className="reveal relative overflow-hidden rounded-card bg-primary px-6 sm:px-12 py-14 sm:py-16 text-center">
        <div className="absolute -top-16 -left-16 size-64 rounded-full bg-white/10 blur-3xl" aria-hidden="true" />
        <div className="absolute -bottom-20 -right-10 size-72 rounded-full bg-white/10 blur-3xl" aria-hidden="true" />
        <h2 className="relative font-display text-3xl sm:text-4xl font-semibold text-white max-w-xl mx-auto">
          Deja el cuaderno. Controla tu hato desde hoy.
        </h2>
        <p className="relative mt-3 text-white/85 max-w-md mx-auto">Es gratis probarlo: sin tarjeta ni instalaciones.</p>
        <div className="relative mt-7 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/dashboard"
            className="focus-ring inline-flex items-center justify-center gap-2 rounded-control bg-white px-6 py-3.5 text-sm font-semibold text-primary hover:bg-white/90"
          >
            Probar la plataforma
            <Icon name="arrowRight" className="size-4" />
          </Link>
          <Link
            to="/contacto"
            className="focus-ring inline-flex items-center justify-center gap-2 rounded-control border border-white/40 px-6 py-3.5 text-sm font-semibold text-white hover:bg-white/10"
          >
            Hablar con nosotros
          </Link>
        </div>
      </div>
    </section>
  );
}
