import { Icon } from "../ui/Icon.jsx";

export function TrazabilidadToolbar({ scope, onScopeChange, activos, onExport }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3 no-print">
      <label className="sr-only" htmlFor="report-scope">
        Alcance del reporte
      </label>
      <select
        id="report-scope"
        value={scope}
        onChange={(e) => onScopeChange(e.target.value)}
        className="focus-ring flex-1 sm:flex-none sm:min-w-[260px] rounded-control border border-border bg-surface px-3.5 py-2.5 text-sm text-text"
      >
        <option value="hato">Todo el hato (activos)</option>
        {activos.map((a) => (
          <option key={a.id} value={a.id}>
            {a.arete}
            {a.nombre ? ` · ${a.nombre}` : ""}
          </option>
        ))}
      </select>
      <div className="flex gap-2 sm:ml-auto">
        <button type="button" onClick={onExport} className="focus-ring inline-flex items-center gap-2 rounded-control border border-border px-3.5 py-2.5 text-sm font-medium text-text hover:bg-surface-alt">
          <Icon name="download" className="size-4.5" /> Exportar CSV
        </button>
        <button type="button" onClick={() => window.print()} className="focus-ring inline-flex items-center gap-2 rounded-control bg-primary px-3.5 py-2.5 text-sm font-semibold text-white hover:bg-primary-hover">
          <Icon name="printer" className="size-4.5" /> Imprimir
        </button>
      </div>
    </div>
  );
}
