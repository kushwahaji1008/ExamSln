import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppShell from "@/components/layout/AppShell";
import Login from "@/features/auth/Login";
import Register from "@/features/auth/Register";

import AppLayout from "@/layouts/AppLayout/AppLayout";
import RoleRoute from "./RoleRoute";

import StudentDashboard from "@/features/student/Dashboard";
import TeacherDashboard from "@/features/teacher/Dashboard";
import AdminDashboard from "@/features/admin/Dashboard";

function Dashboard() {
  return <h1 className="text-2xl font-bold">Dashboard Home</h1>;
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Authentication */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Application */}
        <Route element={<AppShell />}>

          <Route path="/dashboard" element={<Dashboard />} />

          <Route
            path="/student"
            element={
              <RoleRoute allowedRoles={["Student"]}>
                <StudentDashboard />
              </RoleRoute>
            }
          />

          <Route
            path="/teacher"
            element={
              <RoleRoute allowedRoles={["Teacher"]}>
                <TeacherDashboard />
              </RoleRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <RoleRoute allowedRoles={["Admin"]}>
                <AdminDashboard />
              </RoleRoute>
            }
          />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}
