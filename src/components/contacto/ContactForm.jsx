import { useState } from "react";
import { Icon } from "../ui/Icon.jsx";
import { CONTACT_VALIDATORS, saveContacto } from "../../contactValidators.js";
import { ContactFormFields } from "./ContactFormFields.jsx";

const EMPTY_FORM = { nombre: "", correo: "", finca: "", cabezas: "" };

export function ContactForm({ onSuccess }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: CONTACT_VALIDATORS[field](value) }));
  }

  function handleBlur(field) {
    setErrors((e) => ({ ...e, [field]: CONTACT_VALIDATORS[field](form[field]) }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newErrors = Object.fromEntries(Object.keys(CONTACT_VALIDATORS).map((f) => [f, CONTACT_VALIDATORS[f](form[f])]));
    setErrors(newErrors);
    if (Object.values(newErrors).some(Boolean)) return;

    saveContacto({ nombre: form.nombre.trim(), correo: form.correo.trim(), finca: form.finca.trim(), cabezas: Number(form.cabezas) });
    onSuccess(form.nombre.trim());
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <ContactFormFields form={form} errors={errors} onChange={update} onBlur={handleBlur} />
      <button
        type="submit"
        className="focus-ring w-full inline-flex items-center justify-center gap-2 rounded-control bg-primary px-5 py-3 text-sm font-semibold text-white hover:bg-primary-hover"
      >
        Enviar datos
        <Icon name="arrowRight" className="size-4" />
      </button>
      <p className="text-xs text-text-muted text-center">Prototipo académico: tus datos se guardan solo en este navegador.</p>
    </form>
  );
}
