import { useState } from "react";
import { Topbar } from "../components/layout/Topbar.jsx";
import { useAppData } from "../context/DataContext.jsx";
import { useConfirm } from "../context/ConfirmContext.jsx";
import { useToast } from "../context/ToastContext.jsx";
import { useFilteredAnimales } from "../hooks/useFilteredAnimales.js";
import { AnimalFilters } from "../components/animales/AnimalFilters.jsx";
import { AnimalTable } from "../components/animales/AnimalTable.jsx";
import { AnimalModal } from "../components/animales/AnimalModal.jsx";
import { AddAnimalDesktopButton, AddAnimalFab } from "../components/animales/AddAnimalButtons.jsx";
import { formatNumber } from "../utils.js";

export function AnimalesPage() {
  const { animales, vacunas, upsertAnimal, deleteAnimal } = useAppData();
  const confirm = useConfirm();
  const showToast = useToast();

  const [query, setQuery] = useState("");
  const [categoria, setCategoria] = useState("");
  const [estado, setEstado] = useState("Activo");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingAnimal, setEditingAnimal] = useState(null);

  const filtered = useFilteredAnimales(animales, { query, categoria, estado });

  function openEdit(animal) {
    setEditingAnimal(animal);
    setModalOpen(true);
  }

  async function handleDelete(animal) {
    const ok = await confirm({
      title: "Eliminar animal",
      message: `Esta acción eliminará a "${animal.nombre || animal.arete}" y todo su historial de vacunación. No se puede deshacer.`,
      confirmLabel: "Eliminar",
      danger: true
    });
    if (!ok) return;
    deleteAnimal(animal.id);
    showToast("Animal eliminado del hato.", "info");
  }

  function handleSave(data) {
    upsertAnimal(data);
    setModalOpen(false);
    showToast(editingAnimal ? "Cambios guardados." : "Animal agregado al hato.", "success");
  }

  return (
    <>
      <Topbar title="Animales" subtitle="Listado y gestión del hato" actions={<AddAnimalDesktopButton onClick={() => openEdit(null)} />} />
      <main id="main-content" className="flex-1 px-4 sm:px-6 py-6 pb-24 lg:pb-10 outline-none">
        <AnimalFilters query={query} onQueryChange={setQuery} categoria={categoria} onCategoriaChange={setCategoria} estado={estado} onEstadoChange={setEstado} />
        <p className="mt-3 text-sm text-text-muted" role="status" aria-live="polite">
          {formatNumber(filtered.length)} de {formatNumber(animales.length)} animales
        </p>
        <AnimalTable animales={filtered} vacunas={vacunas} onEdit={openEdit} onDelete={handleDelete} />
      </main>
      <AddAnimalFab onClick={() => openEdit(null)} />
      {modalOpen ? <AnimalModal animal={editingAnimal} onClose={() => setModalOpen(false)} onSave={handleSave} /> : null}
    </>
  );
}
