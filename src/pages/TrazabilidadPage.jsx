import { useState, useMemo } from "react";
import { Topbar } from "../components/layout/Topbar.jsx";
import { useAppData } from "../context/DataContext.jsx";
import { useToast } from "../context/ToastContext.jsx";
import { HatoReport } from "../components/trazabilidad/HatoReport.jsx";
import { AnimalReport } from "../components/trazabilidad/AnimalReport.jsx";
import { TrazabilidadToolbar } from "../components/trazabilidad/TrazabilidadToolbar.jsx";
import { exportTrazabilidadCsv } from "../csvExport.js";

export function TrazabilidadPage() {
  const { animales, vacunas, finca } = useAppData();
  const showToast = useToast();
  const [scope, setScope] = useState("hato");

  const activos = useMemo(() => animales.filter((a) => a.estado === "Activo").sort((a, b) => a.arete.localeCompare(b.arete)), [animales]);
  const selectedAnimal = scope === "hato" ? null : activos.find((a) => a.id === scope);
  const historial = useMemo(
    () => (selectedAnimal ? vacunas.filter((v) => v.animalId === selectedAnimal.id).sort((a, b) => new Date(b.fecha) - new Date(a.fecha)) : []),
    [selectedAnimal, vacunas]
  );

  function handleExport() {
    exportTrazabilidadCsv({ scope, activos, vacunas, animal: selectedAnimal });
    showToast("Reporte CSV descargado.", "success");
  }

  return (
    <>
      <Topbar title="Trazabilidad" subtitle="Reportes para el ICA o compradores" />
      <main id="main-content" className="flex-1 px-4 sm:px-6 py-6 pb-24 lg:pb-10 outline-none">
        <TrazabilidadToolbar scope={scope} onScopeChange={setScope} activos={activos} onExport={handleExport} />
        <div className="mt-5 rounded-card border border-border bg-surface shadow-soft p-6 sm:p-8">
          {selectedAnimal ? (
            <AnimalReport finca={finca} animal={selectedAnimal} historial={historial} />
          ) : (
            <HatoReport finca={finca} activos={activos} vacunas={vacunas} />
          )}
        </div>
      </main>
    </>
  );
}
