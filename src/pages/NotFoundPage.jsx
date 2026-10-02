import { Link } from "react-router-dom";
import { Icon } from "../components/ui/Icon.jsx";

export function NotFoundPage() {
  return (
    <div className="min-h-dvh flex items-center justify-center bg-bg px-4 text-center">
      <div>
        <span className="inline-grid place-items-center size-14 rounded-full bg-warning-soft text-warning mb-4">
          <Icon name="alertTriangle" className="size-6" />
        </span>
        <h1 className="font-display text-2xl font-semibold text-text">Página no encontrada</h1>
        <p className="text-sm text-text-muted mt-2">La ruta que buscas no existe o fue movida.</p>
        <Link to="/" className="focus-ring inline-flex items-center gap-2 mt-6 rounded-control bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-hover">
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
