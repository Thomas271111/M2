import { Topbar } from "../components/layout/Topbar.jsx";
import { useAppData } from "../context/DataContext.jsx";
import { DashboardKpis } from "../components/dashboard/DashboardKpis.jsx";
import { DashboardAlerts } from "../components/dashboard/DashboardAlerts.jsx";
import { DashboardComposicion } from "../components/dashboard/DashboardComposicion.jsx";
import { DashboardActividad } from "../components/dashboard/DashboardActividad.jsx";

export function DashboardPage() {
  const { animales, vacunas } = useAppData();
  const activos = animales.filter((a) => a.estado === "Activo");

  return (
    <>
      <Topbar title="Dashboard" subtitle="Resumen general de tu hato" />
      <main id="main-content" className="flex-1 px-4 sm:px-6 py-6 pb-24 lg:pb-10 outline-none">
        <DashboardKpis activos={activos} vacunas={vacunas} />
        <DashboardAlerts activos={activos} vacunas={vacunas} />
        <div className="mt-6 grid lg:grid-cols-5 gap-4 sm:gap-6">
          <DashboardComposicion activos={activos} />
          <DashboardActividad animales={animales} vacunas={vacunas} />
        </div>
      </main>
    </>
  );
}
