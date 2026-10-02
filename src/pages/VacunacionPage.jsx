import { useState, useMemo } from "react";
import { Topbar } from "../components/layout/Topbar.jsx";
import { useAppData } from "../context/DataContext.jsx";
import { useToast } from "../context/ToastContext.jsx";
import { useVaccinationCounts } from "../hooks/useVaccinationCounts.js";
import { VaccinationStats } from "../components/vacunacion/VaccinationStats.jsx";
import { PendingVaccinationList } from "../components/vacunacion/PendingVaccinationList.jsx";
import { VaccinationHistoryTable } from "../components/vacunacion/VaccinationHistoryTable.jsx";
import { VaccineModal } from "../components/vacunacion/VaccineModal.jsx";
import { RegisterVaccineDesktopButton, RegisterVaccineFab } from "../components/vacunacion/RegisterVaccineButtons.jsx";

export function VacunacionPage() {
  const { animales, vacunas, upsertVacuna } = useAppData();
  const showToast = useToast();
  const [modal, setModal] = useState(null);

  const activos = useMemo(() => animales.filter((a) => a.estado === "Activo").sort((a, b) => a.arete.localeCompare(b.arete)), [animales]);
  const animalesById = useMemo(() => new Map(animales.map((a) => [a.id, a])), [animales]);
  const counts = useVaccinationCounts(activos, vacunas);
  const historial = useMemo(() => [...vacunas].sort((a, b) => new Date(b.fecha) - new Date(a.fecha)), [vacunas]);

  function openModal(animal) {
    setModal(animal ? { animalId: animal.id, animal } : {});
  }

  function handleSave(vacuna) {
    upsertVacuna(vacuna);
    setModal(null);
    showToast("Vacuna registrada correctamente.", "success");
  }

  return (
    <>
      <Topbar title="Vacunación" subtitle="Calendario y registro de dosis" actions={<RegisterVaccineDesktopButton onClick={() => openModal(null)} />} />
      <main id="main-content" className="flex-1 px-4 sm:px-6 py-6 pb-24 lg:pb-10 outline-none">
        <VaccinationStats {...counts} />
        <PendingVaccinationList activos={activos} vacunas={vacunas} onQuickRegister={openModal} />
        <VaccinationHistoryTable historial={historial} animalesById={animalesById} />
      </main>
      <RegisterVaccineFab onClick={() => openModal(null)} />
      {modal ? (
        <VaccineModal
          title={modal.animal ? `Registrar vacuna · ${modal.animal.nombre || modal.animal.arete}` : "Registrar vacuna"}
          animals={activos}
          fixedAnimalId={modal.animalId}
          onClose={() => setModal(null)}
          onSave={handleSave}
        />
      ) : null}
    </>
  );
}
