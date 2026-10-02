import { createContext, useContext, useState, useCallback, useRef } from "react";
import { ConfirmDialog } from "../components/ui/ConfirmDialog.jsx";

const ConfirmContext = createContext(null);

export function ConfirmProvider({ children }) {
  const [dialog, setDialog] = useState(null);
  const resolver = useRef(null);

  const confirm = useCallback((options) => {
    setDialog(options);
    return new Promise((resolve) => {
      resolver.current = resolve;
    });
  }, []);

  function resolve(result) {
    setDialog(null);
    resolver.current?.(result);
    resolver.current = null;
  }

  return (
    <ConfirmContext.Provider value={confirm}>
      {children}
      {dialog && <ConfirmDialog {...dialog} onConfirm={() => resolve(true)} onCancel={() => resolve(false)} />}
    </ConfirmContext.Provider>
  );
}

export function useConfirm() {
  const ctx = useContext(ConfirmContext);
  if (!ctx) throw new Error("useConfirm debe usarse dentro de <ConfirmProvider>");
  return ctx;
}
