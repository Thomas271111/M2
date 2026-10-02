import { Modal } from "../ui/Modal.jsx";
import { VaccineForm } from "./VaccineForm.jsx";

export function VaccineModal({ title, animals = [], fixedAnimalId, onClose, onSave }) {
  return (
    <Modal title={title} onClose={onClose}>
      <VaccineForm animals={animals} fixedAnimalId={fixedAnimalId} onCancel={onClose} onSave={onSave} />
    </Modal>
  );
}
