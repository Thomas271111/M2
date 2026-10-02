import { SolutionCard } from "./SolutionCard.jsx";

const FEATURES = [
  { icon: "tag", title: "Control de animales", description: "Registra cada cabeza con arete, categoría, peso y potrero. Busca y filtra tu hato completo en segundos." },
  { icon: "syringe", title: "Alertas de vacunación", description: "Aftosa y Brucelosis se controlan solas: sabes qué animal está vencido, próximo o al día, sin revisar cuadernos." },
  { icon: "clipboard", title: "Trazabilidad al instante", description: "Genera el reporte que pide el ICA o un comprador, expórtalo en CSV o imprímelo, en un par de clics." },
  { icon: "device", title: "Funciona en cualquier dispositivo", description: "Desde el celular en el potrero o el computador de la oficina, MiHato se ve y funciona igual de bien." }
];

export function SolutionSection() {
  return (
    <section id="solucion" className="scroll-mt-16 bg-surface border-y border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-24">
        <div className="reveal max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-wide text-primary">La solución</span>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-text mt-3">MiHato reemplaza el cuaderno por control real</h2>
          <p className="mt-4 text-base text-text-muted leading-relaxed">
            Todo lo que hoy anotas a mano —tus animales, sus vacunas, su historial— vive en un solo lugar, siempre actualizado y listo para
            mostrar.
          </p>
        </div>
        <div className="mt-10 grid sm:grid-cols-2 gap-5">
          {FEATURES.map((f, i) => (
            <SolutionCard key={f.title} {...f} delayMs={i * 80} />
          ))}
        </div>
      </div>
    </section>
  );
}
