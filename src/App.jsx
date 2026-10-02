import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute.jsx";
import { AppShell } from "./components/layout/AppShell.jsx";
import { LandingPage } from "./pages/LandingPage.jsx";
import { ContactoPage } from "./pages/ContactoPage.jsx";
import { LoginPage } from "./pages/LoginPage.jsx";
import { DashboardPage } from "./pages/DashboardPage.jsx";
import { AnimalesPage } from "./pages/AnimalesPage.jsx";
import { AnimalDetailPage } from "./pages/AnimalDetailPage.jsx";
import { VacunacionPage } from "./pages/VacunacionPage.jsx";
import { TrazabilidadPage } from "./pages/TrazabilidadPage.jsx";
import { ConfiguracionPage } from "./pages/ConfiguracionPage.jsx";
import { NotFoundPage } from "./pages/NotFoundPage.jsx";

export function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/contacto" element={<ContactoPage />} />
      <Route path="/login" element={<LoginPage />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<AppShell />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/animales" element={<AnimalesPage />} />
          <Route path="/animales/:id" element={<AnimalDetailPage />} />
          <Route path="/vacunacion" element={<VacunacionPage />} />
          <Route path="/trazabilidad" element={<TrazabilidadPage />} />
          <Route path="/configuracion" element={<ConfiguracionPage />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
