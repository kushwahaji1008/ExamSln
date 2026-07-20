import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function AppShell() {
  const location = useLocation();
  const authPaths = ["/login", "/register"];
  const hideShell = authPaths.includes(location.pathname);

  if (hideShell) {
    return (
      <div className="min-h-screen bg-slate-100">
        <main className="p-8">
          <Outlet />
        </main>
      </div>
    );
  }

  return (
    <div className="flex bg-slate-100 min-h-screen">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header />

        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
