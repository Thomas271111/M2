import { Link } from "react-router-dom";
import { Icon } from "../ui/Icon.jsx";

export function AlertRow({ animal, estado }) {
  const vencida = estado.status === "vencida";
  return (
    <Link to={`/animales/${animal.id}`} className="flex items-center gap-3 px-5 py-3.5 hover:bg-surface-alt focus-ring">
      <span className={`shrink-0 grid place-items-center size-9 rounded-full ${vencida ? "bg-danger-soft text-danger" : "bg-warning-soft text-warning"}`}>
        <Icon name="alertTriangle" className="size-4.5" />
      </span>
      <span className="flex-1 min-w-0">
        <span className="block text-sm font-medium text-text truncate">
          {animal.nombre || animal.arete}
          {animal.nombre ? <span className="text-text-muted font-normal"> · {animal.arete}</span> : null}
        </span>
        <span className={`block text-xs ${vencida ? "text-danger" : "text-warning"}`}>{estado.label} · Fiebre Aftosa</span>
      </span>
      <span className="shrink-0 text-text-muted">
        <Icon name="chevronRight" className="size-4" />
      </span>
    </Link>
  );
}
