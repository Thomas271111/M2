import { Link } from "react-router-dom";
import { Icon } from "../ui/Icon.jsx";
import { ForWhoReportCard } from "./ForWhoReportCard.jsx";

const CHECKLIST = [
  "Tienes entre 50 y 300 cabezas de ganado",
  "Hoy llevas el control en cuaderno, Excel o de memoria",
  "Te ha tocado buscar información de vacunación bajo presión, con el ICA o un comprador esperando",
  "Quieres algo simple, sin curva de aprendizaje ni instalaciones complicadas"
];

export function ForWhoSection() {
  return (
    <section id="para-quien" className="scroll-mt-16 bg-surface border-y border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-24 grid lg:grid-cols-2 gap-12 items-center">
        <div className="reveal">
          <span className="text-xs font-semibold uppercase tracking-wide text-primary">¿Es para tu finca?</span>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-text mt-3">Pensado para el ganadero, no para un departamento de sistemas</h2>
          <ul className="mt-6 space-y-3.5">
            {CHECKLIST.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="shrink-0 mt-0.5 grid place-items-center size-6 rounded-full bg-primary-soft text-primary">
                  <Icon name="check" className="size-3.5" />
                </span>
                <span className="text-sm sm:text-base text-text-muted">{item}</span>
              </li>
            ))}
          </ul>
          <Link
            to="/dashboard"
            className="focus-ring mt-8 inline-flex items-center gap-2 rounded-control bg-primary px-6 py-3.5 text-sm font-semibold text-white hover:bg-primary-hover shadow-soft"
          >
            Probar la plataforma
            <Icon name="arrowRight" className="size-4" />
          </Link>
        </div>
        <ForWhoReportCard />
      </div>
    </section>
  );
}
