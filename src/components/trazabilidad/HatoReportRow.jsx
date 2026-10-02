import { VaccinationBadge } from "../ui/Badge.jsx";
import { getEstadoVacunacion, edadTexto } from "../../domain.js";

export function HatoReportRow({ animal, vacunas }) {
  return (
    <tr className="border-b border-border last:border-0">
      <td className="py-2.5 pr-4 font-medium text-text whitespace-nowrap">{animal.arete}</td>
      <td className="py-2.5 pr-4 text-text-muted whitespace-nowrap">{animal.nombre || "—"}</td>
      <td className="py-2.5 pr-4 text-text-muted whitespace-nowrap">{animal.categoria}</td>
      <td className="py-2.5 pr-4 text-text-muted whitespace-nowrap">{animal.sexo === "H" ? "Hembra" : "Macho"}</td>
      <td className="py-2.5 pr-4 text-text-muted whitespace-nowrap">{edadTexto(animal.fechaNacimiento)}</td>
      <td className="py-2.5 pr-4 text-text-muted whitespace-nowrap">{animal.potrero || "—"}</td>
      <td className="py-2.5 whitespace-nowrap">
        <VaccinationBadge status={getEstadoVacunacion(animal.id, vacunas).status} />
      </td>
    </tr>
  );
}
