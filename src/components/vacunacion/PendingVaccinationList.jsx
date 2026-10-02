import { Icon } from "../ui/Icon.jsx";
import { getEstadoVacunacion } from "../../domain.js";
import { PendingVaccinationRow } from "./PendingVaccinationRow.jsx";

export function PendingVaccinationList({ activos, vacunas, onQuickRegister }) {
  const pendientes = activos
    .map((a) => ({ animal: a, estado: getEstadoVacunacion(a.id, vacunas) }))
    .filter((x) => x.estado.status !== "al-dia")
    .sort((a, b) => (a.estado.diasRestantes ?? -9999) - (b.estado.diasRestantes ?? -9999));

  return (
    <section aria-labelledby="pendientes-heading" className="mt-6 rounded-card bg-surface border border-border shadow-soft">
      <div className="px-5 py-4 border-b border-border">
        <h2 id="pendientes-heading" className="font-display font-semibold text-text">
          Pendientes de Fiebre Aftosa
        </h2>
        <p className="text-sm text-text-muted mt-0.5">Vacuna semestral de control obligatorio ICA</p>
      </div>
      <div className="divide-y divide-border">
        {pendientes.length === 0 ? (
          <div className="px-5 py-8 text-center">
            <span className="inline-grid place-items-center size-11 rounded-full bg-success-soft text-success mb-3">
              <Icon name="checkCircle" className="size-5" />
            </span>
            <p className="text-sm text-text-muted">Todo el hato está al día con la Fiebre Aftosa.</p>
          </div>
        ) : (
          pendientes.map(({ animal, estado }) => (
            <PendingVaccinationRow key={animal.id} animal={animal} estado={estado} onQuickRegister={onQuickRegister} />
          ))
        )}
      </div>
    </section>
  );
}
