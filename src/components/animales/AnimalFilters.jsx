import { CATEGORIAS, ESTADOS } from "../../domain.js";

export function AnimalFilters({ query, onQueryChange, categoria, onCategoriaChange, estado, onEstadoChange }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
      <div className="relative flex-1">
        <label htmlFor="search-input" className="sr-only">
          Buscar animal por arete o nombre
        </label>
        <input
          id="search-input"
          type="search"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Buscar por arete o nombre…"
          className="focus-ring w-full rounded-control border border-border bg-surface pl-4 pr-4 py-2.5 text-sm text-text placeholder:text-text-muted"
        />
      </div>
      <div className="flex gap-2">
        <label className="sr-only" htmlFor="filter-categoria">
          Filtrar por categoría
        </label>
        <select
          id="filter-categoria"
          value={categoria}
          onChange={(e) => onCategoriaChange(e.target.value)}
          className="focus-ring rounded-control border border-border bg-surface px-3 py-2.5 text-sm text-text"
        >
          <option value="">Categoría</option>
          {CATEGORIAS.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <label className="sr-only" htmlFor="filter-estado">
          Filtrar por estado
        </label>
        <select
          id="filter-estado"
          value={estado}
          onChange={(e) => onEstadoChange(e.target.value)}
          className="focus-ring rounded-control border border-border bg-surface px-3 py-2.5 text-sm text-text"
        >
          <option value="">Estado</option>
          {ESTADOS.map((e) => (
            <option key={e} value={e}>{e}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
