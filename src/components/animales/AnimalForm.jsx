import { useState } from "react";
import { CATEGORIAS, ESTADOS, uid } from "../../domain.js";
import { todayISO } from "../../utils.js";
import { FormField, inputClass } from "../ui/FormField.jsx";
import { AnimalFormExtraFields } from "./AnimalFormExtraFields.jsx";

const EMPTY_ANIMAL = { arete: "", nombre: "", sexo: "H", categoria: "Vaca", raza: "", fechaNacimiento: "", pesoKg: "", potrero: "", estado: "Activo", notas: "" };

export function AnimalForm({ animal, onCancel, onSave }) {
  const [form, setForm] = useState(animal || EMPTY_ANIMAL);
  const [errors, setErrors] = useState({});

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newErrors = {};
    if (!form.arete.trim()) newErrors.arete = "Ingresa el arete o ID del animal.";
    if (!form.fechaNacimiento) newErrors.fechaNacimiento = "Ingresa la fecha de nacimiento.";
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    onSave({
      id: animal?.id || uid("animal"),
      ...form,
      arete: form.arete.trim(),
      nombre: form.nombre.trim(),
      raza: form.raza.trim(),
      potrero: form.potrero.trim(),
      notas: form.notas.trim(),
      pesoKg: form.pesoKg ? Number(form.pesoKg) : 0,
      fechaRegistro: animal?.fechaRegistro || todayISO()
    });
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <FormField label="Arete / ID" htmlFor="arete" required error={errors.arete}>
          <input id="arete" className={inputClass} value={form.arete} onChange={(e) => update("arete", e.target.value)} placeholder="Ej. COR-0312" autoComplete="off" />
        </FormField>
        <FormField label="Nombre (opcional)" htmlFor="nombre">
          <input id="nombre" className={inputClass} value={form.nombre} onChange={(e) => update("nombre", e.target.value)} placeholder="Ej. Lucero" autoComplete="off" />
        </FormField>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <FormField label="Sexo" htmlFor="sexo" required>
          <select id="sexo" className={inputClass} value={form.sexo} onChange={(e) => update("sexo", e.target.value)}>
            <option value="H">Hembra</option>
            <option value="M">Macho</option>
          </select>
        </FormField>
        <FormField label="Categoría" htmlFor="categoria" required>
          <select id="categoria" className={inputClass} value={form.categoria} onChange={(e) => update("categoria", e.target.value)}>
            {CATEGORIAS.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </FormField>
      </div>

      <AnimalFormExtraFields form={form} errors={errors} onUpdate={update} estados={ESTADOS} />

      <div className="flex justify-end gap-3 pt-2">
        <button type="button" onClick={onCancel} className="focus-ring rounded-control px-4 py-2.5 text-sm font-medium text-text-muted hover:bg-surface-alt">
          Cancelar
        </button>
        <button type="submit" className="focus-ring rounded-control bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-hover">
          {animal ? "Guardar cambios" : "Agregar animal"}
        </button>
      </div>
    </form>
  );
}
