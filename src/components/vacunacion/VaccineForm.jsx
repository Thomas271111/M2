import { useState } from "react";
import { VACCINE_TYPES, uid, calcularProximaDosis } from "../../domain.js";
import { todayISO } from "../../utils.js";
import { FormField, inputClass } from "../ui/FormField.jsx";
import { VaccineFormFooterFields } from "./VaccineFormFooterFields.jsx";

export function VaccineForm({ animals, fixedAnimalId, onCancel, onSave }) {
  const [form, setForm] = useState({ animalId: fixedAnimalId || "", tipo: "aftosa", fecha: todayISO(), lote: "", veterinario: "", notas: "" });
  const [errors, setErrors] = useState({});

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newErrors = {};
    if (!fixedAnimalId && !form.animalId) newErrors.animalId = "Selecciona un animal.";
    if (!form.fecha) newErrors.fecha = "Ingresa la fecha de aplicación.";
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    onSave({
      id: uid("vac"),
      animalId: fixedAnimalId || form.animalId,
      tipo: form.tipo,
      fecha: form.fecha,
      fechaProximaDosis: calcularProximaDosis(form.tipo, form.fecha),
      lote: form.lote.trim(),
      veterinario: form.veterinario.trim(),
      notas: form.notas.trim(),
      fechaRegistro: todayISO()
    });
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      {!fixedAnimalId ? (
        <FormField label="Animal" htmlFor="animalId" required error={errors.animalId}>
          <select id="animalId" className={inputClass} value={form.animalId} onChange={(e) => update("animalId", e.target.value)}>
            <option value="">Selecciona un animal…</option>
            {animals.map((a) => (
              <option key={a.id} value={a.id}>
                {a.arete}
                {a.nombre ? ` · ${a.nombre}` : ""}
              </option>
            ))}
          </select>
        </FormField>
      ) : null}

      <div className="grid sm:grid-cols-2 gap-4">
        <FormField label="Tipo de vacuna" htmlFor="tipo" required>
          <select id="tipo" className={inputClass} value={form.tipo} onChange={(e) => update("tipo", e.target.value)}>
            {VACCINE_TYPES.map((t) => (
              <option key={t.id} value={t.id}>
                {t.nombre}
                {t.obligatoriaICA ? " (ICA)" : ""}
              </option>
            ))}
          </select>
        </FormField>
        <FormField label="Fecha de aplicación" htmlFor="fecha" required error={errors.fecha}>
          <input id="fecha" type="date" max={todayISO()} className={inputClass} value={form.fecha} onChange={(e) => update("fecha", e.target.value)} />
        </FormField>
      </div>

      <VaccineFormFooterFields form={form} onUpdate={update} onCancel={onCancel} />
    </form>
  );
}
