import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Topbar } from "../components/layout/Topbar.jsx";
import { Icon } from "../components/ui/Icon.jsx";
import { useAppData } from "../context/DataContext.jsx";
import { useToast } from "../context/ToastContext.jsx";
import { useAnimalDetailActions } from "../hooks/useAnimalDetailActions.js";
import { AnimalDetailHeader } from "../components/animales/AnimalDetailHeader.jsx";
import { AnimalVaccineHistory } from "../components/animales/AnimalVaccineHistory.jsx";
import { AnimalNotFound } from "../components/animales/AnimalNotFound.jsx";
import { AnimalModal } from "../components/animales/AnimalModal.jsx";
import { VaccineModal } from "../components/vacunacion/VaccineModal.jsx";

export function AnimalDetailPage() {
  const { id } = useParams();
  const { animales, vacunas, upsertAnimal, upsertVacuna } = useAppData();
  const showToast = useToast();
  const [editOpen, setEditOpen] = useState(false);
  const [vaccineOpen, setVaccineOpen] = useState(false);

  const animal = animales.find((a) => a.id === id);
  const { handleDeleteAnimal, handleDeleteVacuna } = useAnimalDetailActions(animal);

  const historial = animal
    ? vacunas.filter((v) => v.animalId === animal.id).sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
    : [];

  return (
    <>
      <Topbar title={animal ? animal.nombre || animal.arete : "Detalle del animal"} />
      <main id="main-content" className="flex-1 px-4 sm:px-6 py-6 pb-24 lg:pb-10 outline-none">
        <Link to="/animales" className="inline-flex items-center gap-1.5 text-sm font-medium text-text-muted hover:text-text focus-ring rounded">
          <Icon name="arrowLeft" className="size-4" /> Volver a Animales
        </Link>

        {!animal ? (
          <AnimalNotFound />
        ) : (
          <>
            <AnimalDetailHeader animal={animal} vacunas={vacunas} onEdit={() => setEditOpen(true)} onDelete={handleDeleteAnimal} />
            <AnimalVaccineHistory historial={historial} onAdd={() => setVaccineOpen(true)} onDelete={handleDeleteVacuna} />
          </>
        )}
      </main>

      {editOpen && animal ? (
        <AnimalModal
          animal={animal}
          onClose={() => setEditOpen(false)}
          onSave={(data) => {
            upsertAnimal(data);
            setEditOpen(false);
            showToast("Cambios guardados.", "success");
          }}
        />
      ) : null}

      {vaccineOpen && animal ? (
        <VaccineModal
          title={`Registrar vacuna · ${animal.nombre || animal.arete}`}
          fixedAnimalId={animal.id}
          onClose={() => setVaccineOpen(false)}
          onSave={(v) => {
            upsertVacuna(v);
            setVaccineOpen(false);
            showToast("Vacuna registrada correctamente.", "success");
          }}
        />
      ) : null}
    </>
  );
}
