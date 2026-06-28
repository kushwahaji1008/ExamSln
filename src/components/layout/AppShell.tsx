import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function AppShell() {
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
