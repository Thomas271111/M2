import { Icon } from "../ui/Icon.jsx";

export function ForWhoReportCard() {
  return (
    <div className="reveal" style={{ transitionDelay: "120ms" }}>
      <div className="rounded-card bg-bg border border-border shadow-lifted p-6 sm:p-7">
        <div className="flex items-start justify-between gap-4 pb-5 border-b border-border">
          <div>
            <p className="text-[11px] font-medium text-text-muted uppercase tracking-wide">Reporte de trazabilidad</p>
            <p className="font-display text-lg font-semibold text-text mt-1">Finca La Esperanza</p>
            <p className="text-sm text-text-muted">Vereda El Progreso, Montería, Córdoba</p>
          </div>
          <span className="shrink-0 grid place-items-center size-10 rounded-full bg-primary-soft text-primary">
            <Icon name="clipboard" className="size-5" />
          </span>
        </div>
        <div className="mt-5 grid grid-cols-3 gap-3 text-center">
          <div className="rounded-control bg-surface-alt py-3">
            <p className="font-display text-xl font-semibold text-text tabular">184</p>
            <p className="text-[11px] text-text-muted mt-0.5">Activos</p>
          </div>
          <div className="rounded-control bg-success-soft py-3">
            <p className="font-display text-xl font-semibold text-success tabular">142</p>
            <p className="text-[11px] text-success mt-0.5">Al día</p>
          </div>
          <div className="rounded-control bg-danger-soft py-3">
            <p className="font-display text-xl font-semibold text-danger tabular">6</p>
            <p className="text-[11px] text-danger mt-0.5">Alertas</p>
          </div>
        </div>
        <p className="mt-5 text-xs text-text-muted text-center">Código ICA · COR-04521 — generado en un clic, sin buscar en cuadernos viejos.</p>
      </div>
    </div>
  );
}
