import { Link } from "react-router-dom";
import { Icon } from "../ui/Icon.jsx";
import { HeroMockupCard } from "./HeroMockupCard.jsx";
import { scrollToSection } from "../../scrollToSection.js";

const TRUST_ITEMS = ["Sin instalar nada", "Pensado para el campo", "Reportes listos para el ICA"];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-dot-grid">
      <div className="absolute -top-24 -right-24 size-80 rounded-full bg-primary/15 blur-3xl -z-10" aria-hidden="true" />
      <div className="absolute top-40 -left-24 size-72 rounded-full bg-accent/15 blur-3xl -z-10" aria-hidden="true" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-14 sm:pt-20 pb-20 sm:pb-28 grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
        <div className="reveal">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary-soft text-primary text-xs font-semibold px-3.5 py-1.5">
            <Icon name="mapPin" className="size-3.5" />
            Para fincas ganaderas de 50 a 300 cabezas en Colombia
          </span>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.25rem] leading-[1.1] font-semibold text-text mt-5">
            El control de tu hato, <span className="text-primary">sin cuadernos ni Excel.</span>
          </h1>
          <p className="mt-5 text-base sm:text-lg text-text-muted leading-relaxed max-w-xl">
            MiHato es la plataforma digital para que dueños de fincas ganaderas pequeñas y medianas lleven el control de su hato de verdad: cuántos
            animales tienen, cuándo vacunaron a cada uno, y qué mostrar cuando el ICA o un comprador pide trazabilidad.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link
              to="/dashboard"
              className="focus-ring inline-flex items-center justify-center gap-2 rounded-control bg-primary px-6 py-3.5 text-sm font-semibold text-white hover:bg-primary-hover shadow-soft"
            >
              Probar la plataforma
              <Icon name="arrowRight" className="size-4" />
            </Link>
            <a
              href="#problema"
              onClick={scrollToSection("problema")}
              className="focus-ring inline-flex items-center justify-center gap-2 rounded-control border border-border bg-surface px-6 py-3.5 text-sm font-semibold text-text hover:bg-surface-alt"
            >
              Ver el problema
            </a>
          </div>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
            {TRUST_ITEMS.map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm text-text-muted">
                <span className="text-primary">
                  <Icon name="check" className="size-4" />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <HeroMockupCard />
      </div>
    </section>
  );
}
