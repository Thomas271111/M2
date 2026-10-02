import { useEffect, useRef } from "react";
import { Icon } from "./Icon.jsx";

export function ConfirmDialog({ title, message, confirmLabel = "Confirmar", cancelLabel = "Cancelar", danger = false, onConfirm, onCancel }) {
  const confirmRef = useRef(null);

  useEffect(() => {
    const previousActive = document.activeElement;
    document.body.style.overflow = "hidden";
    confirmRef.current?.focus();

    function onKeyDown(event) {
      if (event.key === "Escape") onCancel();
    }
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
      if (previousActive instanceof HTMLElement) previousActive.focus();
    };
  }, [onCancel]);

  const iconClasses = danger ? "bg-danger-soft text-danger" : "bg-primary-soft text-primary";
  const confirmClasses = danger ? "bg-danger hover:bg-danger/90" : "bg-primary hover:bg-primary-hover";

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/40 p-4 animate-[fade-in_0.15s_ease-out] no-print"
      onClick={(e) => e.target === e.currentTarget && onCancel()}
    >
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-title"
        aria-describedby="confirm-desc"
        className="w-full max-w-sm rounded-card bg-surface border border-border shadow-lifted p-6 animate-[scale-in_0.15s_ease-out]"
      >
        <div className="flex items-start gap-4">
          <span className={`shrink-0 grid place-items-center size-10 rounded-full ${iconClasses}`}>
            <Icon name="alertTriangle" className="size-5" />
          </span>
          <div className="flex-1">
            <h2 id="confirm-title" className="font-display text-lg font-semibold text-text">
              {title}
            </h2>
            <p id="confirm-desc" className="mt-1.5 text-sm text-text-muted leading-relaxed">
              {message}
            </p>
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <button type="button" onClick={onCancel} className="focus-ring rounded-control px-4 py-2 text-sm font-medium text-text-muted hover:bg-surface-alt">
            {cancelLabel}
          </button>
          <button
            ref={confirmRef}
            type="button"
            onClick={onConfirm}
            className={`focus-ring rounded-control px-4 py-2 text-sm font-semibold text-white ${confirmClasses}`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
