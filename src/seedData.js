import { uid, calcularProximaDosis } from "./domain.js";

function isoDaysAgo(n) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString().slice(0, 10);
}

export const DEFAULT_FINCA = {
  nombre: "Finca La Esperanza",
  propietario: "Jorge Tarazona",
  vereda: "Vereda El Progreso",
  municipio: "Montería",
  departamento: "Córdoba",
  codigoICA: "COR-04521",
  unidadPeso: "kg"
};

export function seedAnimales() {
  return [
    { arete: "COR-0231", nombre: "Lucero", sexo: "M", raza: "Brahman", categoria: "Toro", estado: "Activo", potrero: "Potrero La Loma", pesoKg: 620, fechaNacimiento: isoDaysAgo(1460), notas: "Reproductor principal." },
    { arete: "COR-0245", nombre: "Canela", sexo: "H", raza: "Cebú", categoria: "Vaca", estado: "Activo", potrero: "Potrero 1", pesoKg: 480, fechaNacimiento: isoDaysAgo(1825), notas: "" },
    { arete: "COR-0246", nombre: "Estrella", sexo: "H", raza: "Gyr", categoria: "Vaca", estado: "Activo", potrero: "Potrero 1", pesoKg: 455, fechaNacimiento: isoDaysAgo(2100), notas: "Buena producción de leche." },
    { arete: "COR-0250", nombre: "", sexo: "H", raza: "Romosinuano", categoria: "Novilla", estado: "Activo", potrero: "Potrero 2", pesoKg: 310, fechaNacimiento: isoDaysAgo(760), notas: "" },
    { arete: "COR-0251", nombre: "", sexo: "M", raza: "Romosinuano", categoria: "Novillo", estado: "Activo", potrero: "Potrero 2", pesoKg: 340, fechaNacimiento: isoDaysAgo(790), notas: "" },
    { arete: "COR-0260", nombre: "Paloma", sexo: "H", raza: "Cebú", categoria: "Vaca", estado: "Activo", potrero: "Potrero Bajo", pesoKg: 470, fechaNacimiento: isoDaysAgo(1900), notas: "" },
    { arete: "COR-0261", nombre: "", sexo: "H", raza: "Cebú", categoria: "Ternera", estado: "Activo", potrero: "Potrero Bajo", pesoKg: 95, fechaNacimiento: isoDaysAgo(120), notas: "Cría de Paloma." },
    { arete: "COR-0270", nombre: "Trueno", sexo: "M", raza: "Angus", categoria: "Toro", estado: "Activo", potrero: "Potrero La Loma", pesoKg: 705, fechaNacimiento: isoDaysAgo(1600), notas: "" },
    { arete: "COR-0281", nombre: "Morena", sexo: "H", raza: "Pardo Suizo", categoria: "Vaca", estado: "Activo", potrero: "Potrero 1", pesoKg: 500, fechaNacimiento: isoDaysAgo(2400), notas: "" },
    { arete: "COR-0282", nombre: "", sexo: "H", raza: "Pardo Suizo", categoria: "Novilla", estado: "Activo", potrero: "Potrero 1", pesoKg: 290, fechaNacimiento: isoDaysAgo(560), notas: "" },
    { arete: "COR-0290", nombre: "Capitán", sexo: "M", raza: "Simmental", categoria: "Novillo", estado: "Activo", potrero: "Potrero 2", pesoKg: 380, fechaNacimiento: isoDaysAgo(900), notas: "En engorde." },
    { arete: "COR-0291", nombre: "", sexo: "M", raza: "Simmental", categoria: "Novillo", estado: "Activo", potrero: "Potrero 2", pesoKg: 365, fechaNacimiento: isoDaysAgo(870), notas: "En engorde." },
    { arete: "COR-0300", nombre: "Reina", sexo: "H", raza: "Holstein", categoria: "Vaca", estado: "Activo", potrero: "Potrero Bajo", pesoKg: 520, fechaNacimiento: isoDaysAgo(2000), notas: "" },
    { arete: "COR-0301", nombre: "", sexo: "H", raza: "Holstein", categoria: "Ternera", estado: "Activo", potrero: "Potrero Bajo", pesoKg: 78, fechaNacimiento: isoDaysAgo(60), notas: "Cría de Reina." },
    { arete: "COR-0188", nombre: "Sultán", sexo: "M", raza: "Brahman", categoria: "Toro", estado: "Vendido", potrero: "—", pesoKg: 680, fechaNacimiento: isoDaysAgo(2600), notas: "Vendido en feria de marzo." },
    { arete: "COR-0310", nombre: "", sexo: "H", raza: "Cebú", categoria: "Novilla", estado: "Activo", potrero: "Corral de manejo", pesoKg: 300, fechaNacimiento: isoDaysAgo(620), notas: "En observación por cojera leve." },
    { arete: "COR-0311", nombre: "Golondrina", sexo: "H", raza: "Romosinuano", categoria: "Vaca", estado: "Activo", potrero: "Potrero 1", pesoKg: 490, fechaNacimiento: isoDaysAgo(2200), notas: "" },
    { arete: "COR-0071", nombre: "Viejo Toro", sexo: "M", raza: "Cebú", categoria: "Toro", estado: "Muerto", potrero: "—", pesoKg: 0, fechaNacimiento: isoDaysAgo(4200), notas: "Falleció por causas naturales, oct 2025." }
  ].map((a) => ({ id: uid("animal"), fechaRegistro: isoDaysAgo(30), ...a }));
}

export function seedVacunas(animales) {
  const vet = "Dra. Camila Restrepo";
  const activos = animales.filter((a) => a.estado === "Activo");
  const vacunas = [];

  activos.forEach((a, i) => {
    const patron = i % 4;
    if (patron === 0) {
      const fecha = isoDaysAgo(200);
      vacunas.push({ id: uid("vac"), animalId: a.id, tipo: "aftosa", fecha, fechaProximaDosis: calcularProximaDosis("aftosa", fecha), lote: "AF-2201", veterinario: vet, notas: "", fechaRegistro: fecha });
    } else if (patron === 1) {
      const fecha = isoDaysAgo(160);
      vacunas.push({ id: uid("vac"), animalId: a.id, tipo: "aftosa", fecha, fechaProximaDosis: calcularProximaDosis("aftosa", fecha), lote: "AF-2214", veterinario: vet, notas: "", fechaRegistro: fecha });
    } else if (patron === 2) {
      const fecha = isoDaysAgo(20);
      vacunas.push({ id: uid("vac"), animalId: a.id, tipo: "aftosa", fecha, fechaProximaDosis: calcularProximaDosis("aftosa", fecha), lote: "AF-2240", veterinario: vet, notas: "", fechaRegistro: fecha });
    }
    if (a.categoria === "Vaca" || a.categoria === "Novilla") {
      const fecha = isoDaysAgo(500);
      vacunas.push({ id: uid("vac"), animalId: a.id, tipo: "brucelosis", fecha, fechaProximaDosis: null, lote: "BR-1187", veterinario: vet, notas: "Dosis única.", fechaRegistro: fecha });
    }
  });

  return vacunas;
}
