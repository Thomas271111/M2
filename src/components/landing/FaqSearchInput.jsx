import { Icon } from "../ui/Icon.jsx";

export function FaqSearchInput({ query, onQueryChange, onOpenPalette, hasResults }) {
  return (
    <div className="mt-8">
      <div className="relative">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-text-muted">
          <Icon name="search" className="size-4.5" />
        </span>
        <input
          type="search"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Busca una pregunta… por ejemplo, “vacunación”"
          className="focus-ring w-full rounded-control border border-border bg-surface pl-11 pr-24 py-3.5 text-sm text-text placeholder:text-text-muted shadow-soft"
          autoComplete="off"
        />
        <button
          type="button"
          onClick={onOpenPalette}
          className="hidden sm:flex absolute right-2.5 top-1/2 -translate-y-1/2 items-center gap-1 rounded-control border border-border bg-surface-alt px-2 py-1 text-[11px] font-medium text-text-muted hover:text-text hover:bg-border/40 focus-ring"
          aria-label="Abrir buscador de preguntas frecuentes (Ctrl K)"
        >
          <kbd className="font-sans">Ctrl</kbd>
          <kbd className="font-sans">K</kbd>
        </button>
      </div>
      {!hasResults ? <p className="mt-4 text-center text-sm text-text-muted">No encontramos preguntas con esa búsqueda.</p> : null}
    </div>
  );
}
