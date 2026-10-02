import { useState, useEffect, useRef, useImperativeHandle, forwardRef } from "react";
import { useKeyboardShortcut } from "../../hooks/useKeyboardShortcut.js";
import { normalizeText } from "../../utils.js";
import { FaqPaletteHeader } from "./FaqPaletteHeader.jsx";
import { FaqPaletteResults } from "./FaqPaletteResults.jsx";

export const FaqCommandPalette = forwardRef(function FaqCommandPalette({ faqItems, onSelect }, ref) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef(null);

  function openPalette() {
    setOpen(true);
    setQuery("");
    setActiveIndex(0);
  }

  useImperativeHandle(ref, () => ({ open: openPalette }));
  useKeyboardShortcut("k", openPalette);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const results = query.trim()
    ? faqItems.filter((item) => normalizeText(`${item.question} ${item.answer}`).includes(normalizeText(query)))
    : faqItems;

  function handleSelect(item) {
    setOpen(false);
    onSelect(item);
  }

  function handleQueryChange(value) {
    setQuery(value);
    setActiveIndex(0);
  }

  function handleKeyDown(e) {
    if (e.key === "Escape") setOpen(false);
    else if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (results[activeIndex]) handleSelect(results[activeIndex]);
    }
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-start justify-center bg-black/40 p-4 pt-[10vh] animate-[fade-in_0.15s_ease-out]"
      onClick={(e) => e.target === e.currentTarget && setOpen(false)}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Buscar en preguntas frecuentes"
        className="w-full max-w-lg rounded-card bg-surface border border-border shadow-lifted overflow-hidden animate-[scale-in_0.15s_ease-out]"
        onKeyDown={handleKeyDown}
      >
        <FaqPaletteHeader inputRef={inputRef} query={query} onQueryChange={handleQueryChange} />
        <FaqPaletteResults results={results} activeIndex={activeIndex} onSelect={handleSelect} />
      </div>
    </div>
  );
});
