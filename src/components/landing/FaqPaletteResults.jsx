export function FaqPaletteResults({ results, activeIndex, onSelect }) {
  if (results.length === 0) {
    return <p className="px-4 py-6 text-center text-sm text-text-muted">Sin resultados. Prueba con otra palabra.</p>;
  }

  return (
    <div className="max-h-80 overflow-y-auto scrollbar-thin p-2">
      {results.map((item, i) => (
        <button
          key={item.id}
          type="button"
          onClick={() => onSelect(item)}
          className={`w-full text-left px-4 py-3 rounded-control flex items-center justify-between gap-3 ${
            i === activeIndex ? "bg-primary-soft text-primary" : "text-text hover:bg-surface-alt"
          }`}
        >
          <span className="text-sm font-medium">{item.question}</span>
        </button>
      ))}
    </div>
  );
}
