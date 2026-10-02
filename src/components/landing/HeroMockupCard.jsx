import { Icon } from "../ui/Icon.jsx";

export function HeroMockupCard() {
  return (
    <div className="reveal [transition-delay:120ms] relative mx-auto lg:mx-0 max-w-md w-full">
      <div className="relative rounded-card border border-border bg-surface shadow-lifted p-5 sm:p-6">
        <div className="flex items-center gap-1.5 pb-4 border-b border-border">
          <span className="size-2.5 rounded-full bg-danger/50" />
          <span className="size-2.5 rounded-full bg-warning/50" />
          <span className="size-2.5 rounded-full bg-success/50" />
          <span className="ml-2 text-xs font-medium text-text-muted">MiHato · Dashboard</span>
        </div>
        <div className="grid grid-cols-2 gap-3 mt-4">
          <div className="rounded-control bg-surface-alt p-3.5">
            <p className="text-[11px] text-text-muted">Cabezas activas</p>
            <p className="font-display text-2xl font-semibold text-text mt-1 tabular">184</p>
          </div>
          <div className="rounded-control bg-danger-soft p-3.5">
            <p className="text-[11px] text-danger">Alertas</p>
            <p className="font-display text-2xl font-semibold text-danger mt-1 tabular">6</p>
          </div>
        </div>
        <div className="mt-3 space-y-2">
          <div className="flex items-center gap-2.5 rounded-control bg-surface-alt px-3 py-2.5">
            <span className="shrink-0 size-7 rounded-full bg-danger-soft text-danger grid place-items-center">
              <Icon name="alertTriangle" className="size-3.5" />
            </span>
            <span className="flex-1 text-xs text-text">COR-0281 · Vencida hace 4 días</span>
          </div>
          <div className="flex items-center gap-2.5 rounded-control bg-surface-alt px-3 py-2.5">
            <span className="shrink-0 size-7 rounded-full bg-success-soft text-success grid place-items-center">
              <Icon name="checkCircle" className="size-3.5" />
            </span>
            <span className="flex-1 text-xs text-text">COR-0245 · Al día</span>
          </div>
        </div>
      </div>
      <div className="hidden sm:flex absolute -bottom-6 -left-8 items-center gap-2.5 rounded-card bg-surface border border-border shadow-lifted px-4 py-3">
        <span className="shrink-0 size-9 rounded-full bg-primary-soft text-primary grid place-items-center">
          <Icon name="clipboard" className="size-4.5" />
        </span>
        <div className="leading-tight">
          <p className="text-xs font-semibold text-text">Reporte para el ICA</p>
          <p className="text-[11px] text-text-muted">Listo en un clic</p>
        </div>
      </div>
    </div>
  );
}
