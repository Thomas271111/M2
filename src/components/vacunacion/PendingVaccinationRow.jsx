import { Link } from "react-router-dom";
import { Icon } from "../ui/Icon.jsx";
import { VaccinationBadge } from "../ui/Badge.jsx";

export function PendingVaccinationRow({ animal, estado, onQuickRegister }) {
  return (
    <div className="flex items-center gap-3 px-5 py-3.5">
      <Link to={`/animales/${animal.id}`} className="flex-1 min-w-0 flex items-center gap-3 hover:opacity-80 focus-ring rounded">
        <span className="shrink-0 grid place-items-center size-9 rounded-full bg-primary-soft text-primary">
          <Icon name="tag" className="size-4.5" />
        </span>
        <span className="min-w-0">
          <span className="block text-sm font-medium text-text truncate">
            {animal.nombre || animal.arete}
            {animal.nombre ? <span className="text-text-muted font-normal"> · {animal.arete}</span> : null}
          </span>
          <span className="block text-xs text-text-muted">
            {animal.categoria} · {animal.potrero || "Sin potrero"}
          </span>
        </span>
      </Link>
      <VaccinationBadge status={estado.status} />
      <button
        type="button"
        onClick={() => onQuickRegister(animal)}
        className="focus-ring shrink-0 rounded-control border border-border px-3 py-2 text-xs font-semibold text-text hover:bg-surface-alt"
      >
        Registrar
      </button>
    </div>
  );
}
