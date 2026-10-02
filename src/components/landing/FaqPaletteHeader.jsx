import { Icon } from "../ui/Icon.jsx";

export function FaqPaletteHeader({ inputRef, query, onQueryChange }) {
  return (
    <div className="flex items-center gap-3 px-4 py-3.5 border-b border-border">
      <span className="text-text-muted shrink-0">
        <Icon name="search" className="size-4.5" />
      </span>
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        placeholder="Busca en las preguntas frecuentes…"
        className="flex-1 bg-transparent text-sm text-text placeholder:text-text-muted outline-none"
        autoComplete="off"
      />
      <kbd className="font-sans shrink-0">Esc</kbd>
    </div>
  );
}
