import { Link } from "react-router-dom";
import { Icon } from "../ui/Icon.jsx";
import { VaccinationBadge, EstadoBadge } from "../ui/Badge.jsx";
import { edadTexto, getEstadoVacunacion } from "../../domain.js";
import { formatNumber } from "../../utils.js";

export function AnimalRow({ animal, vacunas, onEdit, onDelete }) {
  const estadoVac = getEstadoVacunacion(animal.id, vacunas);

  return (
    <tr className="hover:bg-surface-alt">
      <td className="px-4 py-3 font-medium text-text whitespace-nowrap">
        <Link to={`/animales/${animal.id}`} className="hover:underline focus-ring rounded">
          {animal.arete}
        </Link>
      </td>
      <td className="px-4 py-3 text-text">{animal.nombre || <span className="text-text-muted">—</span>}</td>
      <td className="px-4 py-3 text-text-muted whitespace-nowrap">{animal.categoria}</td>
      <td className="px-4 py-3 text-text-muted whitespace-nowrap tabular">{edadTexto(animal.fechaNacimiento)}</td>
      <td className="px-4 py-3 text-text-muted whitespace-nowrap tabular">{animal.pesoKg ? `${formatNumber(animal.pesoKg)} kg` : "—"}</td>
      <td className="px-4 py-3 text-text-muted whitespace-nowrap">{animal.potrero || "—"}</td>
      <td className="px-4 py-3 whitespace-nowrap">
        {animal.estado === "Activo" ? <VaccinationBadge status={estadoVac.status} /> : <EstadoBadge estado={animal.estado} />}
      </td>
      <td className="px-4 py-3 text-right whitespace-nowrap">
        <div className="flex items-center justify-end gap-1">
          <button
            type="button"
            onClick={() => onEdit(animal)}
            className="focus-ring grid place-items-center size-9 rounded-control text-text-muted hover:bg-surface hover:text-primary"
            aria-label={`Editar ${animal.arete}`}
          >
            <Icon name="pencil" className="size-4.5" />
          </button>
          <button
            type="button"
            onClick={() => onDelete(animal)}
            className="focus-ring grid place-items-center size-9 rounded-control text-text-muted hover:bg-surface hover:text-danger"
            aria-label={`Eliminar ${animal.arete}`}
          >
            <Icon name="trash" className="size-4.5" />
          </button>
        </div>
      </td>
    </tr>
  );
}
