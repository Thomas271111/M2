import { useTheme } from "../../context/ThemeContext.jsx";

export function ThemeSwitch() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="mt-4 flex items-center justify-between gap-4">
      <div>
        <p className="text-sm font-medium text-text">Modo oscuro</p>
        <p className="text-sm text-text-muted">Cambia la apariencia de toda la aplicación.</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={isDark}
        aria-label="Activar modo oscuro"
        onClick={toggleTheme}
        className={`focus-ring relative inline-flex h-7 w-12 shrink-0 items-center rounded-full border border-border transition-colors ${isDark ? "bg-primary" : "bg-surface-alt"}`}
      >
        <span className={`inline-block size-5 rounded-full bg-white shadow-soft transition-transform ${isDark ? "translate-x-6" : "translate-x-1"}`} />
      </button>
    </div>
  );
}
