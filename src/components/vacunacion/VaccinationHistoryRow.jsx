import { Link } from "react-router-dom";
import { vaccineLabel } from "../../domain.js";
import { formatDate } from "../../utils.js";

export function VaccinationHistoryRow({ vacuna, animal }) {
  return (
    <tr className="hover:bg-surface-alt">
      <td className="px-5 py-3 font-medium text-text whitespace-nowrap">
        {animal ? (
          <Link to={`/animales/${animal.id}`} className="hover:underline focus-ring rounded">
            {animal.nombre || animal.arete}
          </Link>
        ) : (
          <span className="text-text-muted">Animal eliminado</span>
        )}
      </td>
      <td className="px-5 py-3 text-text-muted whitespace-nowrap">{vaccineLabel(vacuna.tipo)}</td>
      <td className="px-5 py-3 text-text-muted whitespace-nowrap tabular">{formatDate(vacuna.fecha)}</td>
      <td className="px-5 py-3 text-text-muted whitespace-nowrap tabular">{vacuna.fechaProximaDosis ? formatDate(vacuna.fechaProximaDosis) : "—"}</td>
      <td className="px-5 py-3 text-text-muted whitespace-nowrap">{vacuna.veterinario || "—"}</td>
    </tr>
  );
}
