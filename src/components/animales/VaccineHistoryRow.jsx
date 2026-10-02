import { Icon } from "../ui/Icon.jsx";
import { vaccineLabel } from "../../domain.js";
import { formatDate } from "../../utils.js";

export function VaccineHistoryRow({ vacuna, onDelete }) {
  return (
    <div className="flex items-start gap-3 px-5 py-3.5">
      <span className="shrink-0 grid place-items-center size-9 rounded-full bg-primary-soft text-primary mt-0.5">
        <Icon name="syringe" className="size-4.5" />
      </span>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-text">{vaccineLabel(vacuna.tipo)}</p>
        <p className="text-xs text-text-muted mt-0.5">
          Aplicada el {formatDate(vacuna.fecha)}
          {vacuna.veterinario ? ` · ${vacuna.veterinario}` : ""}
          {vacuna.lote ? ` · Lote ${vacuna.lote}` : ""}
        </p>
        {vacuna.fechaProximaDosis ? <p className="text-xs text-text-muted mt-0.5">Próxima dosis: {formatDate(vacuna.fechaProximaDosis)}</p> : null}
        {vacuna.notas ? <p className="text-xs text-text-muted mt-1">{vacuna.notas}</p> : null}
      </div>
      <button
        type="button"
        onClick={() => onDelete(vacuna.id)}
        className="focus-ring shrink-0 grid place-items-center size-8 rounded-control text-text-muted hover:bg-surface-alt hover:text-danger"
        aria-label="Eliminar registro de vacuna"
      >
        <Icon name="trash" className="size-4" />
      </button>
    </div>
  );
}
