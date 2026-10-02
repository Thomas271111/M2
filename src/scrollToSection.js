/**
 * Con HashRouter, el navegador usa la URL hash (#/ruta) para enrutar, así que un
 * <a href="#seccion"> normal terminaría interpretado como una navegación de ruta en
 * vez de un desplazamiento dentro de la misma página. Por eso interceptamos el clic
 * y hacemos el scroll manualmente, dejando el href solo como respaldo semántico.
 */
export function scrollToSection(id) {
  return (event) => {
    event.preventDefault();
    document.getElementById(id)?.scrollIntoView({ block: "start" });
  };
}
