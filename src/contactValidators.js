import { todayISO } from "./utils.js";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const CONTACT_VALIDATORS = {
  nombre: (v) => (v.trim() ? "" : "Ingresa tu nombre completo."),
  correo: (v) => {
    const value = v.trim();
    if (!value) return "Ingresa tu correo electrónico.";
    if (!value.includes("@")) return "El correo debe incluir una @.";
    if (!EMAIL_RE.test(value)) return "Ingresa un correo con un formato válido, ej. nombre@correo.com.";
    return "";
  },
  finca: (v) => (v.trim() ? "" : "Ingresa el nombre de tu finca."),
  cabezas: (v) => {
    const value = v.trim();
    if (!value) return "Ingresa la cantidad de cabezas de ganado.";
    const n = Number(value);
    if (Number.isNaN(n)) return "Debe ser un número.";
    if (!Number.isInteger(n)) return "Ingresa un número entero de cabezas.";
    if (n <= 0) return "Debe ser un número mayor que cero.";
    return "";
  }
};

export function saveContacto(entry) {
  const KEY = "mihato:contactos";
  let list = [];
  try {
    list = JSON.parse(localStorage.getItem(KEY)) || [];
  } catch {
    list = [];
  }
  list.push({ ...entry, fecha: todayISO() });
  localStorage.setItem(KEY, JSON.stringify(list));
}
