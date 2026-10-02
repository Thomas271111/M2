import { Topbar } from "../components/layout/Topbar.jsx";
import { useAppData } from "../context/DataContext.jsx";
import { useToast } from "../context/ToastContext.jsx";
import { FincaForm } from "../components/configuracion/FincaForm.jsx";
import { ThemeSwitch } from "../components/configuracion/ThemeSwitch.jsx";
import { DangerZone } from "../components/configuracion/DangerZone.jsx";

export function ConfiguracionPage() {
  const { finca, setFinca } = useAppData();
  const showToast = useToast();

  function handleSave(data) {
    setFinca({ ...data, unidadPeso: "kg" });
    showToast("Datos de la finca actualizados.", "success");
  }

  return (
    <>
      <Topbar title="Configuración" subtitle="Datos de la finca y preferencias" />
      <main id="main-content" className="flex-1 px-4 sm:px-6 py-6 pb-24 lg:pb-10 outline-none max-w-2xl">
        <section aria-labelledby="finca-heading" className="rounded-card bg-surface border border-border shadow-soft p-5 sm:p-6">
          <h2 id="finca-heading" className="font-display font-semibold text-text">
            Datos de la finca
          </h2>
          <p className="text-sm text-text-muted mt-0.5">Esta información aparece en los reportes de trazabilidad.</p>
          <FincaForm finca={finca} onSave={handleSave} />
        </section>

        <section aria-labelledby="pref-heading" className="mt-6 rounded-card bg-surface border border-border shadow-soft p-5 sm:p-6">
          <h2 id="pref-heading" className="font-display font-semibold text-text">
            Preferencias
          </h2>
          <ThemeSwitch />
        </section>

        <DangerZone />
      </main>
    </>
  );
}
