import { useMemo } from "react";
import { getEstadoVacunacion } from "../domain.js";

export function useVaccinationCounts(activos, vacunas) {
  return useMemo(
    () =>
      activos.reduce(
        (acc, a) => {
          const status = getEstadoVacunacion(a.id, vacunas).status;
          if (status === "vencida") acc.vencidas++;
          else if (status === "proxima") acc.proximas++;
          else if (status === "al-dia") acc.alDia++;
          return acc;
        },
        { vencidas: 0, proximas: 0, alDia: 0 }
      ),
    [activos, vacunas]
  );
}
