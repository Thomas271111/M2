import { createContext, useContext, useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage.js";
import { seedAnimales, seedVacunas, DEFAULT_FINCA } from "../seedData.js";

const DataContext = createContext(null);

export function DataProvider({ children }) {
  const [animales, setAnimales] = useLocalStorage("mihato:animales", []);
  const [vacunas, setVacunas] = useLocalStorage("mihato:vacunas", []);
  const [finca, setFinca] = useLocalStorage("mihato:finca", DEFAULT_FINCA);
  const [seeded, setSeeded] = useLocalStorage("mihato:seeded", false);

  useEffect(() => {
    if (seeded) return;
    const nuevosAnimales = seedAnimales();
    setAnimales(nuevosAnimales);
    setVacunas(seedVacunas(nuevosAnimales));
    setSeeded(true);
  }, [seeded, setAnimales, setVacunas, setSeeded]);

  function upsertAnimal(animal) {
    setAnimales((list) => {
      const idx = list.findIndex((a) => a.id === animal.id);
      if (idx === -1) return [...list, animal];
      return list.map((a) => (a.id === animal.id ? animal : a));
    });
  }

  function deleteAnimal(id) {
    setAnimales((list) => list.filter((a) => a.id !== id));
    setVacunas((list) => list.filter((v) => v.animalId !== id));
  }

  function upsertVacuna(vacuna) {
    setVacunas((list) => {
      const idx = list.findIndex((v) => v.id === vacuna.id);
      if (idx === -1) return [...list, vacuna];
      return list.map((v) => (v.id === vacuna.id ? vacuna : v));
    });
  }

  function deleteVacuna(id) {
    setVacunas((list) => list.filter((v) => v.id !== id));
  }

  function resetDemoData() {
    const nuevosAnimales = seedAnimales();
    setAnimales(nuevosAnimales);
    setVacunas(seedVacunas(nuevosAnimales));
    setFinca(DEFAULT_FINCA);
    setSeeded(true);
  }

  const value = { animales, vacunas, finca, setFinca, upsertAnimal, deleteAnimal, upsertVacuna, deleteVacuna, resetDemoData };
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useAppData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useAppData debe usarse dentro de <DataProvider>");
  return ctx;
}
