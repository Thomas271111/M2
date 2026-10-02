import { Link } from "react-router-dom";
import { Icon } from "../ui/Icon.jsx";
import { getEstadoVacunacion } from "../../domain.js";
import { AlertRow } from "./AlertRow.jsx";

export function DashboardAlerts({ activos, vacunas }) {
  const alertas = activos
    .map((a) => ({ animal: a, estado: getEstadoVacunacion(a.id, vacunas) }))
    .filter((x) => x.estado.status === "vencida" || x.estado.status === "proxima")
    .sort((a, b) => (a.estado.diasRestantes ?? 0) - (b.estado.diasRestantes ?? 0))
    .slice(0, 6);

  return (
    <section aria-labelledby="alertas-heading" className="mt-6 rounded-card bg-surface border border-border shadow-soft">
      <div className="flex items-center justify-between px-5 py-4 border-b border-border">
        <h2 id="alertas-heading" className="font-display font-semibold text-text">
          Alertas de vacunación
        </h2>
        <Link to="/vacunacion" className="text-sm font-medium text-primary hover:underline focus-ring rounded">
          Ver todas
        </Link>
      </div>
      <div className="divide-y divide-border">
        {alertas.length === 0 ? (
          <div className="px-5 py-8 text-center">
            <span className="inline-grid place-items-center size-11 rounded-full bg-success-soft text-success mb-3">
              <Icon name="checkCircle" className="size-5" />
            </span>
            <p className="text-sm text-text-muted">No hay alertas de vacunación pendientes. ¡Buen trabajo!</p>
          </div>
        ) : (
          alertas.map(({ animal, estado }) => <AlertRow key={animal.id} animal={animal} estado={estado} />)
        )}
      </div>
    </section>
  );
}
