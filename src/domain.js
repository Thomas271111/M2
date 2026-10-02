import { todayISO } from "./utils.js";

export const VACCINE_TYPES = [
  { id: "aftosa", nombre: "Fiebre Aftosa", intervaloDias: 182, obligatoriaICA: true },
  { id: "brucelosis", nombre: "Brucelosis", intervaloDias: null, obligatoriaICA: true },
  { id: "carbon", nombre: "Carbón Bacteridiano", intervaloDias: 365, obligatoriaICA: false },
  { id: "ibr", nombre: "IBR-DVB-PI3 (Triple)", intervaloDias: 365, obligatoriaICA: false },
  { id: "rabia", nombre: "Rabia Bovina", intervaloDias: 365, obligatoriaICA: false }
];

export const CATEGORIAS = ["Ternero", "Ternera", "Novillo", "Novilla", "Vaca", "Toro"];
export const ESTADOS = ["Activo", "Vendido", "Muerto"];

export function uid(prefix = "id") {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

export function vaccineLabel(tipoId) {
  return VACCINE_TYPES.find((t) => t.id === tipoId)?.nombre || tipoId;
}

function daysBetween(a, b) {
  const ms = new Date(b).setHours(0, 0, 0, 0) - new Date(a).setHours(0, 0, 0, 0);
  return Math.round(ms / 86400000);
}

export function edadTexto(fechaNacimiento) {
  const meses = Math.max(0, Math.floor(daysBetween(fechaNacimiento, new Date()) / 30.44));
  if (meses < 12) return `${meses} ${meses === 1 ? "mes" : "meses"}`;
  const años = Math.floor(meses / 12);
  const restoMeses = meses % 12;
  return restoMeses === 0 ? `${años} ${años === 1 ? "año" : "años"}` : `${años}a ${restoMeses}m`;
}

export function calcularProximaDosis(tipoId, fecha) {
  const tipo = VACCINE_TYPES.find((t) => t.id === tipoId);
  if (!tipo || !tipo.intervaloDias) return null;
  const d = new Date(fecha);
  d.setDate(d.getDate() + tipo.intervaloDias);
  return d.toISOString().slice(0, 10);
}

export function getEstadoVacunacion(animalId, vacunas) {
  const registros = vacunas
    .filter((v) => v.animalId === animalId && v.tipo === "aftosa")
    .sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

  if (registros.length === 0) {
    return { status: "sin-registro", label: "Sin registro", diasRestantes: null };
  }
  const ultima = registros[0];
  if (!ultima.fechaProximaDosis) {
    return { status: "al-dia", label: "Al día", diasRestantes: null };
  }
  const dias = daysBetween(todayISO(), ultima.fechaProximaDosis);
  if (dias < 0) {
    return { status: "vencida", label: `Vencida hace ${Math.abs(dias)} días`, diasRestantes: dias, fecha: ultima.fechaProximaDosis };
  }
  if (dias <= 30) {
    return { status: "proxima", label: `Próxima en ${dias} días`, diasRestantes: dias, fecha: ultima.fechaProximaDosis };
  }
  return { status: "al-dia", label: "Al día", diasRestantes: dias, fecha: ultima.fechaProximaDosis };
}
