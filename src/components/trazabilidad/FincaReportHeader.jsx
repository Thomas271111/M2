import { formatDate, todayISO } from "../../utils.js";

export function FincaReportHeader({ finca }) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4 pb-5 border-b border-border">
      <div>
        <p className="text-xs font-medium text-text-muted uppercase tracking-wide">Reporte de trazabilidad</p>
        <h2 className="font-display text-xl font-semibold text-text mt-1">{finca.nombre}</h2>
        <p className="text-sm text-text-muted mt-0.5">
          {finca.vereda}, {finca.municipio}, {finca.departamento}
        </p>
      </div>
      <div className="text-sm text-right">
        <p className="text-text-muted">Código ICA</p>
        <p className="font-semibold text-text">{finca.codigoICA || "—"}</p>
        <p className="text-text-muted mt-2">Generado el {formatDate(todayISO())}</p>
      </div>
    </div>
  );
}
