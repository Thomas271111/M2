import { NavLink } from "react-router-dom";
import { Icon } from "../ui/Icon.jsx";
import { NAV_ITEMS } from "../../navItems.js";
import { useAlertCount } from "../../hooks/useAlertCount.js";

const linkClass = ({ isActive }) =>
  `relative flex flex-1 flex-col items-center justify-center gap-1 py-2 text-[11px] font-medium focus-ring rounded-control ${
    isActive ? "text-primary" : "text-text-muted"
  }`;

export function BottomNav() {
  const badge = useAlertCount();

  return (
    <nav
      aria-label="Navegación principal"
      className="lg:hidden fixed bottom-0 inset-x-0 z-30 flex items-stretch border-t border-border bg-surface pb-[env(safe-area-inset-bottom)] no-print"
    >
      {NAV_ITEMS.map((item) => (
        <NavLink key={item.to} to={item.to} className={linkClass}>
          <span className="relative">
            <Icon name={item.icon} className="size-5" />
            {item.badge && badge > 0 ? (
              <span className="absolute -top-1 -right-1.5 size-2.5 rounded-full bg-danger ring-2 ring-surface" />
            ) : null}
          </span>
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}
