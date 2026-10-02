import { useState } from "react";
import { FormField, inputClass } from "../ui/FormField.jsx";

export function FincaForm({ finca, onSave }) {
  const [form, setForm] = useState(finca);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSave(form);
  }

  return (
    <form onSubmit={handleSubmit} className="mt-5 space-y-4">
      <FormField label="Nombre de la finca" htmlFor="nombre">
        <input id="nombre" className={inputClass} value={form.nombre} onChange={(e) => update("nombre", e.target.value)} />
      </FormField>
      <FormField label="Propietario(a)" htmlFor="propietario">
        <input id="propietario" className={inputClass} value={form.propietario} onChange={(e) => update("propietario", e.target.value)} />
      </FormField>
      <div className="grid sm:grid-cols-2 gap-4">
        <FormField label="Vereda" htmlFor="vereda">
          <input id="vereda" className={inputClass} value={form.vereda} onChange={(e) => update("vereda", e.target.value)} />
        </FormField>
        <FormField label="Municipio" htmlFor="municipio">
          <input id="municipio" className={inputClass} value={form.municipio} onChange={(e) => update("municipio", e.target.value)} />
        </FormField>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <FormField label="Departamento" htmlFor="departamento">
          <input id="departamento" className={inputClass} value={form.departamento} onChange={(e) => update("departamento", e.target.value)} />
        </FormField>
        <FormField label="Código ICA" htmlFor="codigoICA">
          <input id="codigoICA" className={inputClass} value={form.codigoICA} onChange={(e) => update("codigoICA", e.target.value)} />
        </FormField>
      </div>
      <div className="flex justify-end pt-1">
        <button type="submit" className="focus-ring rounded-control bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-hover">
          Guardar cambios
        </button>
      </div>
    </form>
  );
}
