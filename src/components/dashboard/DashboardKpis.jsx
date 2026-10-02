import { KpiCard } from "../ui/KpiCard.jsx";
import { getEstadoVacunacion } from "../../domain.js";
import { formatNumber } from "../../utils.js";

export function DashboardKpis({ activos, vacunas }) {
  const alertas = activos.filter((a) => ["vencida", "proxima"].includes(getEstadoVacunacion(a.id, vacunas).status));
  const crias = activos.filter((a) => (Date.now() - new Date(a.fechaNacimiento).getTime()) / 86400000 < 182);
  const conPeso = activos.filter((a) => a.pesoKg > 0);
  const promedio = conPeso.length ? Math.round(conPeso.reduce((sum, a) => sum + a.pesoKg, 0) / conPeso.length) : 0;

  return (
    <section aria-label="Indicadores clave" className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      <KpiCard label="Cabezas activas" value={formatNumber(activos.length)} />
      <KpiCard label="Alertas de vacunación" value={formatNumber(alertas.length)} valueClassName="text-danger" />
      <KpiCard label="Crías < 6 meses" value={formatNumber(crias.length)} />
      <KpiCard label="Peso promedio" value={`${formatNumber(promedio)} kg`} />
    </section>
  );
}
