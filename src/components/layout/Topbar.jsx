import { Icon } from "../ui/Icon.jsx";
import { useTheme } from "../../context/ThemeContext.jsx";

export function Topbar({ title, subtitle, actions }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <header className="sticky top-0 z-30 flex items-center gap-3 h-16 px-4 sm:px-6 border-b border-border bg-surface/95 backdrop-blur no-print">
        <div className="flex items-center gap-2 lg:hidden">
          <span className="grid place-items-center size-8 rounded-full bg-primary-soft text-primary">
            <Icon name="logo" className="size-4" />
          </span>
          <span className="font-display font-semibold text-text">MiHato</span>
        </div>
        <div className="hidden lg:block flex-1 min-w-0">
          <h1 className="font-display text-xl font-semibold text-text truncate">{title}</h1>
          {subtitle ? <p className="text-sm text-text-muted truncate">{subtitle}</p> : null}
        </div>
        <div className="flex-1 lg:hidden" />
        <div className="flex items-center gap-2 shrink-0">
          {actions}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
            className="lg:hidden focus-ring grid place-items-center size-10 rounded-control text-text-muted hover:bg-surface-alt hover:text-text"
          >
            <Icon name={theme === "dark" ? "sun" : "moon"} className="size-5" />
          </button>
        </div>
      </header>
      <div className="lg:hidden px-4 sm:px-6 pt-4">
        <h1 className="font-display text-lg font-semibold text-text">{title}</h1>
        {subtitle ? <p className="text-sm text-text-muted mt-0.5">{subtitle}</p> : null}
      </div>
    </>
  );
}
