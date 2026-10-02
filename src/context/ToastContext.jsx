import { createContext, useContext, useState, useCallback } from "react";
import { Icon } from "../components/ui/Icon.jsx";
import { uid } from "../domain.js";

const ToastContext = createContext(null);

const VARIANTS = {
  success: { icon: "checkCircle", classes: "text-primary" },
  danger: { icon: "alertTriangle", classes: "text-danger" },
  info: { icon: "info", classes: "text-info" }
};

function ToastItem({ toast, onDismiss }) {
  const variant = VARIANTS[toast.type] || VARIANTS.info;
  return (
    <div className="flex items-start gap-3 rounded-control bg-surface border border-border shadow-lifted px-4 py-3 text-sm text-text animate-[toast-in_0.2s_ease-out]">
      <span className={`shrink-0 ${variant.classes}`}>
        <Icon name={variant.icon} className="size-5" />
      </span>
      <p className="flex-1 leading-snug">{toast.message}</p>
      <button
        type="button"
        onClick={onDismiss}
        className="shrink-0 text-text-muted hover:text-text focus-ring rounded"
        aria-label="Cerrar notificación"
      >
        <Icon name="x" className="size-4" />
      </button>
    </div>
  );
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const dismiss = useCallback((id) => {
    setToasts((list) => list.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    (message, type = "success") => {
      const id = uid("toast");
      setToasts((list) => [...list, { id, message, type }]);
      setTimeout(() => dismiss(id), 4000);
    },
    [dismiss]
  );

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      <div
        className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 w-[calc(100%-2rem)] max-w-sm no-print"
        aria-live="polite"
        role="status"
      >
        {toasts.map((t) => (
          <ToastItem key={t.id} toast={t} onDismiss={() => dismiss(t.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast debe usarse dentro de <ToastProvider>");
  return ctx;
}
