import { useMemo } from "react";

export function useFilteredAnimales(animales, { query, categoria, estado }) {
  return useMemo(() => {
    const q = query.trim().toLowerCase();
    return animales
      .filter((a) => (categoria ? a.categoria === categoria : true))
      .filter((a) => (estado ? a.estado === estado : true))
      .filter((a) => (q ? `${a.arete} ${a.nombre}`.toLowerCase().includes(q) : true))
      .sort((a, b) => a.arete.localeCompare(b.arete));
  }, [animales, query, categoria, estado]);
}
