import { useEffect } from "react";

/**
 * Ejecuta `handler` cuando el usuario presiona `key` junto con Ctrl (o Cmd en Mac).
 * Se usa, por ejemplo, para abrir el buscador de preguntas frecuentes con Ctrl/Cmd+K.
 *
 * El array de dependencias es [key, handler]: si cualquiera de los dos cambia entre
 * renders, el efecto se vuelve a ejecutar — primero corre la función de limpieza que
 * retorna (quita el listener anterior) y luego adjunta uno nuevo. Así nunca quedan
 * listeners duplicados escuchando al mismo tiempo. La misma limpieza corre al
 * desmontar el componente que usa el hook, para no dejar el listener "vivo" en el
 * documento después de que la pantalla ya no existe.
 */
export function useKeyboardShortcut(key, handler) {
  useEffect(() => {
    function onKeyDown(event) {
      const isCtrlOrCmd = event.ctrlKey || event.metaKey;
      if (isCtrlOrCmd && event.key.toLowerCase() === key.toLowerCase()) {
        event.preventDefault();
        handler(event);
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [key, handler]);
}
