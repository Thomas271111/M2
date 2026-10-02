import { useEffect } from "react";

/**
 * Anima con un fade+slide los elementos con clase "reveal" dentro de `containerRef`
 * cuando entran en el viewport. Limpieza: se desconecta el IntersectionObserver y se
 * cancela el timeout de respaldo al desmontar, para no seguir observando nodos que
 * ya no existen en el DOM.
 */
export function useScrollReveal(containerRef) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    const targets = container.querySelectorAll(".reveal");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion || !("IntersectionObserver" in window)) {
      targets.forEach((el) => el.classList.add("is-visible"));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    targets.forEach((el) => observer.observe(el));

    const fallback = setTimeout(() => targets.forEach((el) => el.classList.add("is-visible")), 1500);

    return () => {
      observer.disconnect();
      clearTimeout(fallback);
    };
  }, [containerRef]);
}
