import { Outlet, useNavigate } from "react-router-dom";

export default function AppLayout() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* SIDEBAR */}
      <aside className="w-64 bg-card border-r p-4">
        <h1 className="text-xl font-bold mb-6">Exam Platform</h1>

        <div className="space-y-2">
          <button onClick={() => navigate("/dashboard")} className="block w-full text-left p-2 hover:bg-gray-100 rounded">
            Dashboard
          </button>

          {user?.role === "Student" && (
            <button onClick={() => navigate("/student")} className="block w-full text-left p-2 hover:bg-gray-100 rounded">
              My Exams
            </button>
          )}

          {user?.role === "Teacher" && (
            <>
              <button onClick={() => navigate("/teacher")} className="block w-full text-left p-2 hover:bg-gray-100 rounded">
                Create Exam
              </button>
              <button className="block w-full text-left p-2 hover:bg-gray-100 rounded">
                Question Bank
              </button>
            </>
          )}

          {user?.role === "Admin" && (
            <button onClick={() => navigate("/admin")} className="block w-full text-left p-2 hover:bg-gray-100 rounded">
              Admin Panel
            </button>
          )}
        </div>
      </aside>

      {/* MAIN AREA */}
      <div className="flex-1 flex flex-col">
        {/* TOP BAR */}
        <header className="bg-card border-b p-4 flex justify-between">
          <div className="font-semibold">Welcome, {user?.fullName}</div>
          <button onClick={logout} className="text-red-500">
            Logout
          </button>
        </header>

        {/* PAGE CONTENT */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
