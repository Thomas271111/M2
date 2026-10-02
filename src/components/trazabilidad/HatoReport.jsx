import { getEstadoVacunacion } from "../../domain.js";
import { FincaReportHeader } from "./FincaReportHeader.jsx";
import { HatoReportSummary } from "./HatoReportSummary.jsx";
import { HatoReportRow } from "./HatoReportRow.jsx";

export function HatoReport({ finca, activos, vacunas }) {
  const alDia = activos.filter((a) => getEstadoVacunacion(a.id, vacunas).status === "al-dia").length;
  const conAlerta = activos.filter((a) => {
    const s = getEstadoVacunacion(a.id, vacunas).status;
    return s === "vencida" || s === "proxima";
  }).length;

  return (
    <>
      <FincaReportHeader finca={finca} />
      <HatoReportSummary total={activos.length} alDia={alDia} conAlerta={conAlerta} />
      <div className="mt-6 overflow-x-auto scrollbar-thin">
        <table className="w-full text-sm min-w-[700px]">
          <thead>
            <tr className="text-left text-xs font-medium text-text-muted border-b border-border">
              <th className="py-2.5 pr-4">Arete</th>
              <th className="py-2.5 pr-4">Nombre</th>
              <th className="py-2.5 pr-4">Categoría</th>
              <th className="py-2.5 pr-4">Sexo</th>
              <th className="py-2.5 pr-4">Edad</th>
              <th className="py-2.5 pr-4">Potrero</th>
              <th className="py-2.5">Vacunación (Aftosa)</th>
            </tr>
          </thead>
          <tbody>
            {activos.map((a) => (
              <HatoReportRow key={a.id} animal={a} vacunas={vacunas} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
