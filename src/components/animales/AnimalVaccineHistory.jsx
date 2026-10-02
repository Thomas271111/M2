import { Icon } from "../ui/Icon.jsx";
import { VaccineHistoryRow } from "./VaccineHistoryRow.jsx";

export function AnimalVaccineHistory({ historial, onAdd, onDelete }) {
  return (
    <div className="mt-6 rounded-card border border-border bg-surface shadow-soft">
      <div className="flex items-center justify-between px-5 py-4 border-b border-border">
        <h2 className="font-display font-semibold text-text">Historial de vacunación</h2>
        <button
          type="button"
          onClick={onAdd}
          className="focus-ring inline-flex items-center gap-2 rounded-control bg-primary px-3.5 py-2 text-sm font-semibold text-white hover:bg-primary-hover"
        >
          <Icon name="plus" className="size-4" /> Registrar
        </button>
      </div>
      <div className="divide-y divide-border">
        {historial.length === 0 ? (
          <p className="px-5 py-8 text-center text-sm text-text-muted">Aún no hay vacunas registradas para este animal.</p>
        ) : (
          historial.map((v) => <VaccineHistoryRow key={v.id} vacuna={v} onDelete={onDelete} />)
        )}
      </div>
    </div>
  );
}
