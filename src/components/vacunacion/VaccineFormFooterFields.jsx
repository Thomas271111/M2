import { FormField, inputClass } from "../ui/FormField.jsx";

export function VaccineFormFooterFields({ form, onUpdate, onCancel }) {
  return (
    <>
      <div className="grid sm:grid-cols-2 gap-4">
        <FormField label="Lote" htmlFor="lote">
          <input id="lote" className={inputClass} value={form.lote} onChange={(e) => onUpdate("lote", e.target.value)} placeholder="Ej. AF-2240" autoComplete="off" />
        </FormField>
        <FormField label="Veterinario(a)" htmlFor="veterinario">
          <input
            id="veterinario"
            className={inputClass}
            value={form.veterinario}
            onChange={(e) => onUpdate("veterinario", e.target.value)}
            placeholder="Ej. Dra. Camila Restrepo"
            autoComplete="off"
          />
        </FormField>
      </div>

      <FormField label="Notas" htmlFor="notas">
        <textarea id="notas" rows="2" className={`${inputClass} resize-none`} value={form.notas} onChange={(e) => onUpdate("notas", e.target.value)} />
      </FormField>

      <div className="flex justify-end gap-3 pt-2">
        <button type="button" onClick={onCancel} className="focus-ring rounded-control px-4 py-2.5 text-sm font-medium text-text-muted hover:bg-surface-alt">
          Cancelar
        </button>
        <button type="submit" className="focus-ring rounded-control bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-hover">
          Registrar vacuna
        </button>
      </div>
    </>
  );
}
