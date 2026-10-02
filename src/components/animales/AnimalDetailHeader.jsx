import { Icon } from "../ui/Icon.jsx";
import { VaccinationBadge, EstadoBadge } from "../ui/Badge.jsx";
import { edadTexto, getEstadoVacunacion } from "../../domain.js";
import { formatDate, formatNumber } from "../../utils.js";
import { InfoRow } from "./InfoRow.jsx";

export function AnimalDetailHeader({ animal, vacunas, onEdit, onDelete }) {
  const estadoVac = getEstadoVacunacion(animal.id, vacunas);

  return (
    <div className="mt-4 rounded-card border border-border bg-surface shadow-soft p-5 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <span className="grid place-items-center size-14 rounded-full bg-primary-soft text-primary shrink-0">
            <Icon name="tag" className="size-6" />
          </span>
          <div>
            <h2 className="font-display text-xl sm:text-2xl font-semibold text-text">{animal.nombre || animal.arete}</h2>
            <p className="text-sm text-text-muted">
              {animal.arete} · {animal.raza || "Raza no registrada"}
            </p>
            <div className="flex flex-wrap gap-2 mt-2">
              <EstadoBadge estado={animal.estado} />
              {animal.estado === "Activo" ? <VaccinationBadge status={estadoVac.status} /> : null}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onEdit}
            className="focus-ring inline-flex items-center gap-2 rounded-control border border-border px-3.5 py-2.5 text-sm font-medium text-text hover:bg-surface-alt"
          >
            <Icon name="pencil" className="size-4" /> Editar
          </button>
          <button
            type="button"
            onClick={onDelete}
            className="focus-ring grid place-items-center size-10 rounded-control border border-border text-danger hover:bg-danger-soft"
            aria-label="Eliminar animal"
          >
            <Icon name="trash" className="size-4.5" />
          </button>
        </div>
      </div>

      <div className="mt-5 grid sm:grid-cols-2 gap-x-8">
        <div>
          <InfoRow label="Sexo" value={animal.sexo === "H" ? "Hembra" : "Macho"} />
          <InfoRow label="Categoría" value={animal.categoria} />
          <InfoRow label="Edad" value={edadTexto(animal.fechaNacimiento)} />
        </div>
        <div>
          <InfoRow label="Fecha de nacimiento" value={formatDate(animal.fechaNacimiento)} />
          <InfoRow label="Peso actual" value={animal.pesoKg ? `${formatNumber(animal.pesoKg)} kg` : "—"} />
          <InfoRow label="Potrero" value={animal.potrero || "—"} />
        </div>
      </div>
      {animal.notas ? <p className="mt-4 text-sm text-text-muted bg-surface-alt rounded-control px-4 py-3">{animal.notas}</p> : null}
    </div>
  );
}
