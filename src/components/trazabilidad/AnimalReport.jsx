import { EstadoBadge } from "../ui/Badge.jsx";
import { edadTexto, vaccineLabel } from "../../domain.js";
import { formatDate } from "../../utils.js";
import { FincaReportHeader } from "./FincaReportHeader.jsx";

export function AnimalReport({ finca, animal, historial }) {
  return (
    <>
      <FincaReportHeader finca={finca} />
      <div className="mt-5 flex flex-wrap items-center gap-x-8 gap-y-2 text-sm">
        <p><span className="text-text-muted">Arete:</span> <span className="font-semibold text-text">{animal.arete}</span></p>
        <p><span className="text-text-muted">Nombre:</span> <span className="font-semibold text-text">{animal.nombre || "—"}</span></p>
        <p><span className="text-text-muted">Raza:</span> <span className="font-semibold text-text">{animal.raza || "—"}</span></p>
        <p><span className="text-text-muted">Categoría:</span> <span className="font-semibold text-text">{animal.categoria}</span></p>
        <p><span className="text-text-muted">Sexo:</span> <span className="font-semibold text-text">{animal.sexo === "H" ? "Hembra" : "Macho"}</span></p>
        <p><span className="text-text-muted">Edad:</span> <span className="font-semibold text-text">{edadTexto(animal.fechaNacimiento)}</span></p>
        <p><span className="text-text-muted">Potrero:</span> <span className="font-semibold text-text">{animal.potrero || "—"}</span></p>
        <EstadoBadge estado={animal.estado} />
      </div>
      <h3 className="font-display font-semibold text-text mt-6 mb-2">Historial de vacunación</h3>
      <div className="overflow-x-auto scrollbar-thin">
        <table className="w-full text-sm min-w-[600px]">
          <thead>
            <tr className="text-left text-xs font-medium text-text-muted border-b border-border">
              <th className="py-2.5 pr-4">Vacuna</th>
              <th className="py-2.5 pr-4">Fecha</th>
              <th className="py-2.5 pr-4">Próxima dosis</th>
              <th className="py-2.5 pr-4">Lote</th>
              <th className="py-2.5">Veterinario(a)</th>
            </tr>
          </thead>
          <tbody>
            {historial.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-6 text-center text-text-muted">Sin registros de vacunación.</td>
              </tr>
            ) : (
              historial.map((v) => (
                <tr key={v.id} className="border-b border-border last:border-0">
                  <td className="py-2.5 pr-4 text-text whitespace-nowrap">{vaccineLabel(v.tipo)}</td>
                  <td className="py-2.5 pr-4 text-text-muted whitespace-nowrap">{formatDate(v.fecha)}</td>
                  <td className="py-2.5 pr-4 text-text-muted whitespace-nowrap">{v.fechaProximaDosis ? formatDate(v.fechaProximaDosis) : "—"}</td>
                  <td className="py-2.5 pr-4 text-text-muted whitespace-nowrap">{v.lote || "—"}</td>
                  <td className="py-2.5 text-text-muted whitespace-nowrap">{v.veterinario || "—"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
