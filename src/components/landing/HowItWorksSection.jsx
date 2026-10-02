import { StepCard } from "./StepCard.jsx";

const STEPS = [
  { title: "Registra tu finca y tus animales", description: "Datos básicos de cada cabeza: arete, categoría, peso, potrero. Sin capacitación técnica." },
  { title: "MiHato cuida las fechas", description: "El sistema calcula solo cuándo vence cada vacuna y te avisa antes de que sea tarde." },
  { title: "Genera tu reporte cuando lo pidan", description: "ICA, comprador o banco: exporta el historial completo en segundos." }
];

export function HowItWorksSection() {
  return (
    <section id="como-funciona" className="scroll-mt-16 max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-24">
      <div className="reveal max-w-2xl">
        <span className="text-xs font-semibold uppercase tracking-wide text-accent">Cómo funciona</span>
        <h2 className="font-display text-3xl sm:text-4xl font-semibold text-text mt-3">De cero a trazabilidad en tres pasos</h2>
      </div>
      <div className="mt-12 grid md:grid-cols-3 gap-8 md:gap-6 relative">
        <div className="hidden md:block absolute top-6 left-[16.5%] right-[16.5%] h-px bg-border" aria-hidden="true" />
        {STEPS.map((s, i) => (
          <StepCard key={s.title} number={i + 1} {...s} delayMs={i * 80} />
        ))}
      </div>
    </section>
  );
}
