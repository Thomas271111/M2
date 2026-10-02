import { Modal } from "../ui/Modal.jsx";
import { AnimalForm } from "./AnimalForm.jsx";

export function AnimalModal({ animal, onClose, onSave }) {
  return (
    <Modal title={animal ? "Editar animal" : "Agregar animal"} onClose={onClose}>
      <AnimalForm animal={animal} onCancel={onClose} onSave={onSave} />
    </Modal>
  );
}
