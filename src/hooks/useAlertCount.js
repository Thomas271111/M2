import { useAppData } from "../context/DataContext.jsx";
import { getEstadoVacunacion } from "../domain.js";

/** Cuenta los animales activos con vacunación vencida o próxima a vencer. */
export function useAlertCount() {
  const { animales, vacunas } = useAppData();
  return animales.filter((a) => {
    if (a.estado !== "Activo") return false;
    const status = getEstadoVacunacion(a.id, vacunas).status;
    return status === "vencida" || status === "proxima";
  }).length;
}
