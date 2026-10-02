import { Link } from "react-router-dom";
import { Icon } from "../ui/Icon.jsx";
import { ProductSectionLink } from "./ProductSectionLink.jsx";

const linkCls = "text-sm text-text-muted hover:text-text focus-ring rounded";

export function MarketingFooter() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-2">
          <Link to="/" className="flex items-center gap-2.5 focus-ring rounded-control w-fit">
            <span className="grid place-items-center size-9 rounded-full bg-primary-soft text-primary">
              <Icon name="logo" className="size-5" />
            </span>
            <span className="font-display font-semibold text-lg text-text">MiHato</span>
          </Link>
          <p className="mt-3 text-sm text-text-muted max-w-sm leading-relaxed">
            Control digital para el hato ganadero colombiano: animales, vacunación y trazabilidad en un solo lugar.
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">Producto</p>
          <ul className="mt-3 space-y-2.5">
            <li><ProductSectionLink id="problema" className={linkCls}>El problema</ProductSectionLink></li>
            <li><ProductSectionLink id="solucion" className={linkCls}>La solución</ProductSectionLink></li>
            <li><ProductSectionLink id="como-funciona" className={linkCls}>Cómo funciona</ProductSectionLink></li>
            <li><ProductSectionLink id="faq" className={linkCls}>Preguntas frecuentes</ProductSectionLink></li>
            <li><Link to="/contacto" className={linkCls}>Contacto</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">Plataforma</p>
          <ul className="mt-3 space-y-2.5">
            <li><Link to="/dashboard" className={linkCls}>Dashboard</Link></li>
            <li><Link to="/animales" className={linkCls}>Animales</Link></li>
            <li><Link to="/vacunacion" className={linkCls}>Vacunación</Link></li>
            <li><Link to="/trazabilidad" className={linkCls}>Trazabilidad</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row gap-2 justify-between items-center text-xs text-text-muted">
          <p>© 2026 MiHato. Proyecto académico de Diseño y Arquitectura Web.</p>
          <p>Prototipo con datos de demostración.</p>
        </div>
      </div>
    </footer>
  );
}
