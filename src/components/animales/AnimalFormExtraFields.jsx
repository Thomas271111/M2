import { todayISO } from "../../utils.js";
import { FormField, inputClass } from "../ui/FormField.jsx";

export function AnimalFormExtraFields({ form, errors, onUpdate, estados }) {
  return (
    <>
      <div className="grid sm:grid-cols-2 gap-4">
        <FormField label="Raza" htmlFor="raza">
          <input id="raza" className={inputClass} value={form.raza} onChange={(e) => onUpdate("raza", e.target.value)} placeholder="Ej. Cebú, Brahman…" autoComplete="off" />
        </FormField>
        <FormField label="Fecha de nacimiento" htmlFor="fechaNacimiento" required error={errors.fechaNacimiento}>
          <input
            id="fechaNacimiento"
            type="date"
            max={todayISO()}
            className={inputClass}
            value={form.fechaNacimiento}
            onChange={(e) => onUpdate("fechaNacimiento", e.target.value)}
          />
        </FormField>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <FormField label="Peso actual (kg)" htmlFor="pesoKg">
          <input
            id="pesoKg"
            type="number"
            min="0"
            step="1"
            inputMode="numeric"
            className={inputClass}
            value={form.pesoKg}
            onChange={(e) => onUpdate("pesoKg", e.target.value)}
            placeholder="Ej. 380"
          />
        </FormField>
        <FormField label="Potrero" htmlFor="potrero">
          <input id="potrero" className={inputClass} value={form.potrero} onChange={(e) => onUpdate("potrero", e.target.value)} placeholder="Ej. Potrero 1" autoComplete="off" />
        </FormField>
      </div>

      <FormField label="Estado" htmlFor="estado" required>
        <select id="estado" className={inputClass} value={form.estado} onChange={(e) => onUpdate("estado", e.target.value)}>
          {estados.map((estado) => (
            <option key={estado} value={estado}>{estado}</option>
          ))}
        </select>
      </FormField>

      <FormField label="Notas" htmlFor="notas">
        <textarea id="notas" rows="2" className={`${inputClass} resize-none`} value={form.notas} onChange={(e) => onUpdate("notas", e.target.value)} />
      </FormField>
    </>
  );
}
