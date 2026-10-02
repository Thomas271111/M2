import { formatNumber } from "../../utils.js";

export function HatoReportSummary({ total, alDia, conAlerta }) {
  return (
    <div className="mt-5 grid sm:grid-cols-3 gap-3 text-sm">
      <div className="rounded-control bg-surface-alt px-4 py-3">
        <p className="text-text-muted">Total activos</p>
        <p className="font-semibold text-text tabular mt-0.5">{formatNumber(total)}</p>
      </div>
      <div className="rounded-control bg-surface-alt px-4 py-3">
        <p className="text-text-muted">Al día en Aftosa</p>
        <p className="font-semibold text-success tabular mt-0.5">{formatNumber(alDia)}</p>
      </div>
      <div className="rounded-control bg-surface-alt px-4 py-3">
        <p className="text-text-muted">Con alerta</p>
        <p className="font-semibold text-danger tabular mt-0.5">{formatNumber(conAlerta)}</p>
      </div>
    </div>
  );
}
