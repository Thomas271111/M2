import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Icon } from "../ui/Icon.jsx";
import { useTheme } from "../../context/ThemeContext.jsx";
import { MarketingNavLinks } from "./MarketingNavLinks.jsx";
import { MarketingMobileMenu } from "./MarketingMobileMenu.jsx";

export function MarketingHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    if (!menuOpen) return undefined;
    function onKeyDown(e) {
      if (e.key === "Escape") setMenuOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-surface/90 backdrop-blur">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center gap-4">
        <Link to="/" className="flex items-center gap-2.5 focus-ring rounded-control shrink-0">
          <span className="grid place-items-center size-9 rounded-full bg-primary-soft text-primary">
            <Icon name="logo" className="size-5" />
          </span>
          <span className="font-display font-semibold text-lg text-text">MiHato</span>
        </Link>

        <nav aria-label="Navegación del sitio" className="hidden md:flex items-center gap-1 mx-auto">
          <MarketingNavLinks />
        </nav>

        <div className="flex items-center gap-2 ml-auto md:ml-0">
          <button
            type="button"
            onClick={toggleTheme}
            aria-pressed={theme === "dark"}
            aria-label={theme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
            className="focus-ring grid place-items-center size-10 rounded-control text-text-muted hover:bg-surface-alt hover:text-text"
          >
            <Icon name={theme === "dark" ? "sun" : "moon"} className="size-5" />
          </button>
          <Link
            to="/dashboard"
            className="hidden sm:inline-flex focus-ring items-center gap-2 rounded-control bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-hover"
          >
            Probar la plataforma
          </Link>
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label="Abrir menú de navegación"
            className="md:hidden focus-ring grid place-items-center size-10 rounded-control text-text-muted hover:bg-surface-alt hover:text-text"
          >
            <Icon name={menuOpen ? "x" : "menu"} className="size-5" />
          </button>
        </div>
      </div>

      {menuOpen ? <MarketingMobileMenu onNavigate={() => setMenuOpen(false)} /> : null}
    </header>
  );
}
