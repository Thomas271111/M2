import { Link } from "react-router-dom";
import { scrollToSection } from "../../scrollToSection.js";

export const NAV_LINKS = [
  { id: "problema", label: "El problema" },
  { id: "solucion", label: "La solución" },
  { id: "como-funciona", label: "Cómo funciona" },
  { id: "para-quien", label: "¿Es para ti?" },
  { id: "faq", label: "FAQ" }
];

export function MarketingNavLinks({ onNavigate, vertical = false }) {
  const linkClass = vertical
    ? "rounded-control px-3.5 py-2.5 text-sm font-medium text-text hover:bg-surface-alt focus-ring"
    : "rounded-control px-3.5 py-2 text-sm font-medium text-text-muted hover:text-text hover:bg-surface-alt focus-ring";

  function handleClick(id) {
    return (e) => {
      scrollToSection(id)(e);
      onNavigate?.();
    };
  }

  return (
    <>
      {NAV_LINKS.map((l) => (
        <a key={l.id} href={`#${l.id}`} onClick={handleClick(l.id)} className={linkClass}>
          {l.label}
        </a>
      ))}
      <Link to="/contacto" onClick={onNavigate} className={linkClass}>
        Contacto
      </Link>
    </>
  );
}
