import { FormField, inputClass } from "../ui/FormField.jsx";

export function ContactFormFields({ form, errors, onChange, onBlur }) {
  return (
    <>
      <FormField label="Nombre completo" htmlFor="nombre" required error={errors.nombre}>
        <input
          id="nombre"
          value={form.nombre}
          onChange={(e) => onChange("nombre", e.target.value)}
          onBlur={() => onBlur("nombre")}
          className={inputClass}
          placeholder="Ej. Jorge Tarazona"
          autoComplete="name"
        />
      </FormField>
      <FormField label="Correo electrónico" htmlFor="correo" required error={errors.correo}>
        <input
          id="correo"
          type="email"
          value={form.correo}
          onChange={(e) => onChange("correo", e.target.value)}
          onBlur={() => onBlur("correo")}
          className={inputClass}
          placeholder="tucorreo@ejemplo.com"
          autoComplete="email"
        />
      </FormField>
      <FormField label="Nombre de la finca" htmlFor="finca" required error={errors.finca}>
        <input
          id="finca"
          value={form.finca}
          onChange={(e) => onChange("finca", e.target.value)}
          onBlur={() => onBlur("finca")}
          className={inputClass}
          placeholder="Ej. Finca La Esperanza"
          autoComplete="off"
        />
      </FormField>
      <FormField label="Cantidad de cabezas de ganado" htmlFor="cabezas" required error={errors.cabezas}>
        <input
          id="cabezas"
          type="number"
          min="1"
          step="1"
          inputMode="numeric"
          value={form.cabezas}
          onChange={(e) => onChange("cabezas", e.target.value)}
          onBlur={() => onBlur("cabezas")}
          className={inputClass}
          placeholder="Ej. 120"
        />
      </FormField>
    </>
  );
}
