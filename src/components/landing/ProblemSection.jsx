import { ProblemCard } from "./ProblemCard.jsx";

const PROBLEMS = [
  {
    icon: "tally",
    tone: "danger",
    title: "Se cuenta a mano",
    description: "Contar 200 cabezas a ojo, con rayitas en un cuaderno, significa animales contados dos veces… o ninguna."
  },
  {
    icon: "calendar",
    tone: "warning",
    title: "Se pasan las fechas de vacunación",
    description: "Sin un calendario claro, la Fiebre Aftosa o la Brucelosis se aplican tarde, o simplemente se olvidan."
  },
  {
    icon: "xCircle",
    tone: "danger",
    title: "No hay trazabilidad cuando la piden",
    description: "Cuando el ICA visita la finca o un comprador pide el historial, no hay cómo mostrar de un vistazo que todo está en regla."
  }
];

export function ProblemSection() {
  return (
    <section id="problema" className="scroll-mt-16 max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-24">
      <div className="reveal max-w-2xl">
        <span className="text-xs font-semibold uppercase tracking-wide text-danger">El problema</span>
        <h2 className="font-display text-3xl sm:text-4xl font-semibold text-text mt-3">Así se maneja hoy la mayoría de los hatos</h2>
        <p className="mt-4 text-base text-text-muted leading-relaxed">
          Cuadernos que se mojan en el potrero, hojas de Excel que nadie actualiza, fechas de vacunación que solo el mayordomo recuerda. El
          resultado: errores de conteo, vacunas aplicadas tarde y cero trazabilidad el día que alguien la pide.
        </p>
      </div>
      <div className="mt-10 grid md:grid-cols-3 gap-5">
        {PROBLEMS.map((p, i) => (
          <ProblemCard key={p.title} {...p} delayMs={i * 80} />
        ))}
      </div>
    </section>
  );
}
