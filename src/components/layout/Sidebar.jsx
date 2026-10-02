import { NavLink, Link } from "react-router-dom";
import { Icon } from "../ui/Icon.jsx";
import { NAV_ITEMS } from "../../navItems.js";
import { useAlertCount } from "../../hooks/useAlertCount.js";
import { useTheme } from "../../context/ThemeContext.jsx";
import { useAuth } from "../../context/AuthContext.jsx";

const linkClass = ({ isActive }) =>
  `group flex items-center gap-3 rounded-control px-3 py-2.5 text-sm font-medium transition-colors focus-ring ${
    isActive ? "bg-primary-soft text-primary" : "text-text-muted hover:bg-surface-alt hover:text-text"
  }`;

export function Sidebar() {
  const badge = useAlertCount();
  const { theme, toggleTheme } = useTheme();
  const { logout } = useAuth();

  return (
    <aside className="hidden lg:flex lg:flex-col lg:fixed lg:inset-y-0 lg:w-64 border-r border-border bg-surface no-print">
      <Link to="/" className="flex items-center gap-2.5 px-5 h-16 border-b border-border focus-ring">
        <span className="grid place-items-center size-9 rounded-full bg-primary-soft text-primary">
          <Icon name="logo" className="size-5" />
        </span>
        <div className="leading-tight">
          <p className="font-display font-semibold text-text">MiHato</p>
          <p className="text-[11px] text-text-muted">Control de hato</p>
        </div>
      </Link>

      <nav className="flex-1 px-3 py-4 space-y-1" aria-label="Navegación principal">
        {NAV_ITEMS.map((item) => (
          <NavLink key={item.to} to={item.to} className={linkClass}>
            <span className="shrink-0">
              <Icon name={item.icon} className="size-5" />
            </span>
            <span className="flex-1">{item.label}</span>
            {item.badge && badge > 0 ? (
              <span className="grid place-items-center min-w-5 h-5 rounded-full bg-danger text-white text-[11px] font-semibold px-1">
                {badge}
              </span>
            ) : null}
          </NavLink>
        ))}
      </nav>

      <div className="p-3 border-t border-border space-y-1">
        <button
          type="button"
          onClick={toggleTheme}
          aria-pressed={theme === "dark"}
          className="focus-ring w-full flex items-center gap-3 rounded-control px-3 py-2.5 text-sm font-medium text-text-muted hover:bg-surface-alt hover:text-text"
        >
          <Icon name={theme === "dark" ? "sun" : "moon"} className="size-5" />
          <span>Modo oscuro</span>
        </button>
        <button
          type="button"
          onClick={logout}
          className="focus-ring w-full flex items-center gap-3 rounded-control px-3 py-2.5 text-sm font-medium text-text-muted hover:bg-surface-alt hover:text-text"
        >
          <Icon name="arrowLeft" className="size-5" />
          <span>Cerrar sesión</span>
        </button>
      </div>
    </aside>
  );
}
