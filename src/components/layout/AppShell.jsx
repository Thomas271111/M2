import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar.jsx";
import { BottomNav } from "./BottomNav.jsx";

export function AppShell() {
  return (
    <div>
      <Sidebar />
      <div className="lg:pl-64 flex flex-col min-h-dvh">
        <Outlet />
      </div>
      <BottomNav />
    </div>
  );
}
