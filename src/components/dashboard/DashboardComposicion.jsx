import { CATEGORIAS } from "../../domain.js";

export function DashboardComposicion({ activos }) {
  const counts = CATEGORIAS.map((cat) => ({ cat, n: activos.filter((a) => a.categoria === cat).length })).filter((c) => c.n > 0);
  const max = Math.max(1, ...counts.map((c) => c.n));

  return (
    <section aria-labelledby="composicion-heading" className="lg:col-span-2 rounded-card bg-surface border border-border shadow-soft p-5">
      <h2 id="composicion-heading" className="font-display font-semibold text-text">
        Composición del hato
      </h2>
      <div className="mt-4">
        {counts.length === 0 ? (
          <p className="text-sm text-text-muted">Sin animales registrados.</p>
        ) : (
          counts.map((c) => (
            <div key={c.cat} className="flex items-center gap-3 py-1.5">
              <span className="w-16 shrink-0 text-xs text-text-muted">{c.cat}</span>
              <span className="flex-1 h-3 rounded-full bg-surface-alt overflow-hidden">
                <span className="block h-full rounded-full bg-primary" style={{ width: `${Math.max(6, (c.n / max) * 100)}%` }} />
              </span>
              <span className="w-6 shrink-0 text-xs font-semibold text-text tabular text-right">{c.n}</span>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
