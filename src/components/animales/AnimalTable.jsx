import { Icon } from "../ui/Icon.jsx";
import { AnimalRow } from "./AnimalRow.jsx";

export function AnimalTable({ animales, vacunas, onEdit, onDelete }) {
  if (animales.length === 0) {
    return (
      <div className="mt-2 rounded-card border border-border bg-surface shadow-soft px-6 py-14 text-center">
        <span className="inline-grid place-items-center size-12 rounded-full bg-surface-alt text-text-muted mb-3">
          <Icon name="tag" className="size-5" />
        </span>
        <p className="text-sm font-medium text-text">No se encontraron animales</p>
        <p className="text-sm text-text-muted mt-1">Ajusta la búsqueda o los filtros, o agrega un nuevo animal al hato.</p>
      </div>
    );
  }

  return (
    <div className="mt-2 rounded-card border border-border bg-surface shadow-soft overflow-x-auto scrollbar-thin">
      <table className="w-full text-sm min-w-[880px]">
        <thead>
          <tr className="border-b border-border text-left text-xs font-medium text-text-muted">
            <th scope="col" className="px-4 py-3">Arete</th>
            <th scope="col" className="px-4 py-3">Nombre</th>
            <th scope="col" className="px-4 py-3">Categoría</th>
            <th scope="col" className="px-4 py-3">Edad</th>
            <th scope="col" className="px-4 py-3">Peso</th>
            <th scope="col" className="px-4 py-3">Potrero</th>
            <th scope="col" className="px-4 py-3">Vacunación</th>
            <th scope="col" className="px-4 py-3">
              <span className="sr-only">Acciones</span>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {animales.map((a) => (
            <AnimalRow key={a.id} animal={a} vacunas={vacunas} onEdit={onEdit} onDelete={onDelete} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
