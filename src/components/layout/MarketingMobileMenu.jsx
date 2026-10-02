import { Link } from "react-router-dom";
import { MarketingNavLinks } from "./MarketingNavLinks.jsx";

export function MarketingMobileMenu({ onNavigate }) {
  return (
    <div id="mobile-menu" className="md:hidden border-t border-border bg-surface px-4 sm:px-6 py-4">
      <nav aria-label="Navegación del sitio (móvil)" className="flex flex-col gap-1">
        <MarketingNavLinks onNavigate={onNavigate} vertical />
        <Link
          to="/dashboard"
          onClick={onNavigate}
          className="mt-2 focus-ring flex items-center justify-center gap-2 rounded-control bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-hover"
        >
          Probar la plataforma
        </Link>
      </nav>
    </div>
  );
}
