import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { normalizeText } from "../../utils.js";
import { FAQ_DATA } from "../../faqData.js";
import { FaqAccordionItem } from "./FaqAccordionItem.jsx";
import { FaqSearchInput } from "./FaqSearchInput.jsx";
import { FaqCommandPalette } from "./FaqCommandPalette.jsx";

export function FaqSection() {
  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState(null);
  const [pendingFocusId, setPendingFocusId] = useState(null);
  const paletteRef = useRef(null);
  const itemRefs = useRef({});

  const filtered = query.trim()
    ? FAQ_DATA.filter((item) => normalizeText(`${item.question} ${item.answer}`).includes(normalizeText(query)))
    : FAQ_DATA;

  useEffect(() => {
    if (!pendingFocusId) return;
    const el = itemRefs.current[pendingFocusId];
    if (el) {
      el.scrollIntoView({ block: "center" });
      el.querySelector("summary")?.focus();
    }
    setPendingFocusId(null);
  }, [pendingFocusId, filtered]);

  function handlePaletteSelect(item) {
    setQuery("");
    setOpenId(item.id);
    setPendingFocusId(item.id);
  }

  return (
    <section id="faq" className="scroll-mt-16 max-w-4xl mx-auto px-4 sm:px-6 py-20 sm:py-24">
      <div className="reveal text-center">
        <span className="text-xs font-semibold uppercase tracking-wide text-accent">Preguntas frecuentes</span>
        <h2 className="font-display text-3xl sm:text-4xl font-semibold text-text mt-3">Lo que más nos preguntan</h2>
        <p className="mt-4 text-base text-text-muted leading-relaxed max-w-xl mx-auto">
          Si tienes dudas antes de probar MiHato, seguro alguna de estas respuestas te ayuda.
        </p>
      </div>

      <FaqSearchInput query={query} onQueryChange={setQuery} onOpenPalette={() => paletteRef.current?.open()} hasResults={filtered.length > 0} />

      <div className="mt-6 space-y-3">
        {filtered.map((item) => (
          <FaqAccordionItem
            key={item.id}
            ref={(el) => (itemRefs.current[item.id] = el)}
            item={item}
            open={openId === item.id}
            onToggle={(isOpen) => setOpenId(isOpen ? item.id : null)}
          />
        ))}
      </div>

      <div className="reveal mt-10 text-center">
        <p className="text-sm text-text-muted">¿No encontraste lo que buscabas?</p>
        <Link
          to="/contacto"
          className="focus-ring mt-3 inline-flex items-center gap-2 rounded-control border border-border bg-surface px-5 py-2.5 text-sm font-semibold text-text hover:bg-surface-alt"
        >
          Contáctanos
        </Link>
      </div>

      <FaqCommandPalette ref={paletteRef} faqItems={FAQ_DATA} onSelect={handlePaletteSelect} />
    </section>
  );
}
