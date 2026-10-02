import { vaccineLabel, edadTexto, getEstadoVacunacion } from "./domain.js";
import { todayISO } from "./utils.js";

function csvEscape(value) {
  const str = String(value ?? "");
  return /[",\n]/.test(str) ? `"${str.replace(/"/g, '""')}"` : str;
}

function buildHatoRows(activos, vacunas) {
  return activos.map((a) => [
    a.arete,
    a.nombre,
    a.categoria,
    a.sexo === "H" ? "Hembra" : "Macho",
    edadTexto(a.fechaNacimiento),
    a.potrero,
    getEstadoVacunacion(a.id, vacunas).label
  ]);
}

function buildAnimalRows(animal, vacunas) {
  return vacunas
    .filter((v) => v.animalId === animal.id)
    .map((v) => [vaccineLabel(v.tipo), v.fecha, v.fechaProximaDosis || "", v.lote, v.veterinario]);
}

export function exportTrazabilidadCsv({ scope, activos, vacunas, animal }) {
  const isHato = scope === "hato";
  const header = isHato
    ? ["Arete", "Nombre", "Categoria", "Sexo", "Edad", "Potrero", "Estado vacunacion Aftosa"]
    : ["Vacuna", "Fecha", "Proxima dosis", "Lote", "Veterinario"];
  const rows = isHato ? buildHatoRows(activos, vacunas) : buildAnimalRows(animal, vacunas);

  const csv = [header, ...rows].map((row) => row.map(csvEscape).join(",")).join("\n");
  const BOM = String.fromCharCode(0xfeff);
  const blob = new Blob([BOM + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `mihato-trazabilidad-${isHato ? "hato" : animal.arete}-${todayISO()}.csv`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
