import { Link } from "react-router-dom";
import { Icon } from "../ui/Icon.jsx";

export function AnimalNotFound() {
  return (
    <div className="mt-10 rounded-card border border-border bg-surface shadow-soft p-10 text-center">
      <span className="inline-grid place-items-center size-12 rounded-full bg-warning-soft text-warning mb-3">
        <Icon name="alertTriangle" className="size-5" />
      </span>
      <p className="font-display text-lg font-semibold text-text">Animal no encontrado</p>
      <p className="text-sm text-text-muted mt-1">Puede que haya sido eliminado o el enlace sea incorrecto.</p>
      <Link to="/animales" className="focus-ring inline-flex items-center gap-2 mt-5 rounded-control bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-hover">
        <Icon name="arrowLeft" className="size-4" /> Volver al listado
      </Link>
    </div>
  );
}
