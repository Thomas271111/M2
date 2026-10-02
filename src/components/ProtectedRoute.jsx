import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

/**
 * Ruta de layout: si no hay usuario autenticado, redirige a /login guardando la
 * ubicación que se intentaba visitar (para poder volver ahí después de iniciar
 * sesión). Si hay usuario, renderiza las rutas hijas a través de <Outlet />.
 */
export function ProtectedRoute() {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}
