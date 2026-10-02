import { useEffect, useRef } from "react";
import { Icon } from "./Icon.jsx";

export function Modal({ title, onClose, wide = false, children }) {
  const panelRef = useRef(null);

  useEffect(() => {
    const previousActive = document.activeElement;
    document.body.style.overflow = "hidden";

    function onKeyDown(event) {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab") return;
      const focusables = panelRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    const firstField = panelRef.current?.querySelector("input, select, textarea, button:not([data-close])");
    firstField?.focus();

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
      if (previousActive instanceof HTMLElement) previousActive.focus();
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/40 p-4 animate-[fade-in_0.15s_ease-out] no-print overflow-y-auto"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className={`w-full ${wide ? "max-w-2xl" : "max-w-lg"} my-8 rounded-card bg-surface border border-border shadow-lifted animate-[scale-in_0.15s_ease-out]`}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h2 id="modal-title" className="font-display text-lg font-semibold text-text">
            {title}
          </h2>
          <button
            type="button"
            data-close
            onClick={onClose}
            className="focus-ring grid place-items-center size-9 rounded-control text-text-muted hover:bg-surface-alt hover:text-text"
            aria-label="Cerrar"
          >
            <Icon name="x" className="size-5" />
          </button>
        </div>
        <div className="px-6 py-5">{children}</div>
      </div>
    </div>
  );
}
