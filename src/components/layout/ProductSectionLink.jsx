import { Link, useLocation } from "react-router-dom";
import { scrollToSection } from "../../scrollToSection.js";

/**
 * Enlace a una sección de la landing (#problema, #solucion, …). Si ya estamos en la
 * landing, hace scroll suave a la sección; si estamos en otra página (ej. Contacto),
 * navega primero a la landing.
 */
export function ProductSectionLink({ id, className, children }) {
  const location = useLocation();

  if (location.pathname === "/") {
    return (
      <a href={`#${id}`} onClick={scrollToSection(id)} className={className}>
        {children}
      </a>
    );
  }

  return (
    <Link to="/" className={className}>
      {children}
    </Link>
  );
}
