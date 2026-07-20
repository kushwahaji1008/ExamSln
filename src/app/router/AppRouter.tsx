import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AppShell from "@/components/layout/AppShell";
import Login from "@/features/auth/Login";
import Register from "@/features/auth/Register";
import LandingPage from "@/features/landing/LandingPage";

import RoleRoute from "./RoleRoute";
import { useAuth } from '@/app/providers/AuthProvider';

import StudentDashboard from "@/features/student/Dashboard";
import TeacherDashboard from "@/features/teacher/Dashboard";
import AdminDashboard from "@/features/admin/Dashboard";

import Profile from '@/features/auth/Profile';

import ExamsList from '@/features/student/ExamsList';
import ExamDetails from '@/features/student/ExamDetails';
import MyAttempts from '@/features/student/MyAttempts';
import AttemptRunner from '@/features/student/AttemptRunner';

import CreateExam from '@/features/teacher/CreateExam';
import EditExam from '@/features/teacher/EditExam';
import MyExams from '@/features/teacher/MyExams';
import TeacherExamDetails from '@/features/teacher/TeacherExamDetails';
import QuestionsList from '@/features/teacher/questions/QuestionsList';
import CreateQuestion from '@/features/teacher/questions/CreateQuestion';
import EditQuestion from '@/features/teacher/questions/EditQuestion';

import UsersList from '@/features/admin/UsersList';
import EditUser from '@/features/admin/EditUser';

import UpcomingExams from '@/features/exams/Upcoming';
import ActiveExams from '@/features/exams/Active';

import MyNotifications from '@/features/notifications/MyNotifications';

import CoursesList from '@/features/courses/CoursesList';
import CourseDetails from '@/features/courses/CourseDetails';

import Health from '@/features/health/Health';

function Dashboard() {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;

  if (user.role === 0 || user.role === "Student") return <Navigate to="/student" replace />;
  if (user.role === 1 || user.role === "Teacher") return <Navigate to="/teacher" replace />;
  if (user.role === 2 || user.role === "Admin") return <Navigate to="/admin" replace />;
  if (user.role === 3 || user.role === "SuperAdmin") return <Navigate to="/admin" replace />;

  return <h1 className="text-2xl font-bold">Dashboard Home</h1>;
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Landing */}
        <Route path="/" element={<LandingPage />} />

        {/* Authentication */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Application */}
        <Route element={<AppShell />}>

          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/profile" element={<Profile />} />

          <Route
            path="/student"
            element={
              <RoleRoute allowedRoles={["Student"]}>
                <StudentDashboard />
              </RoleRoute>
            }
          />

          <Route path="/student/exams" element={<RoleRoute allowedRoles={["Student"]}><ExamsList /></RoleRoute>} />
          <Route path="/student/exams/:examId" element={<RoleRoute allowedRoles={["Student"]}><ExamDetails /></RoleRoute>} />
          <Route path="/student/attempts" element={<RoleRoute allowedRoles={["Student"]}><MyAttempts /></RoleRoute>} />
          <Route path="/attempts/:attemptId" element={<RoleRoute allowedRoles={["Student","Teacher","Admin"]}><AttemptRunner /></RoleRoute>} />

          <Route
            path="/teacher"
            element={
              <RoleRoute allowedRoles={["Teacher"]}>
                <TeacherDashboard />
              </RoleRoute>
            }
          />

          <Route path="/teacher/exams" element={<RoleRoute allowedRoles={["Teacher"]}><MyExams /></RoleRoute>} />
          <Route path="/teacher/exams/create" element={<RoleRoute allowedRoles={["Teacher"]}><CreateExam /></RoleRoute>} />
          <Route path="/teacher/exams/:examId" element={<RoleRoute allowedRoles={["Teacher"]}><TeacherExamDetails /></RoleRoute>} />
          <Route path="/teacher/exams/:examId/edit" element={<RoleRoute allowedRoles={["Teacher"]}><EditExam /></RoleRoute>} />
          <Route path="/teacher/questions" element={<RoleRoute allowedRoles={["Teacher"]}><QuestionsList /></RoleRoute>} />
          <Route path="/teacher/questions/create" element={<RoleRoute allowedRoles={["Teacher"]}><CreateQuestion /></RoleRoute>} />
          <Route path="/teacher/questions/:questionId/edit" element={<RoleRoute allowedRoles={["Teacher"]}><EditQuestion /></RoleRoute>} />

          <Route
            path="/admin"
            element={
              <RoleRoute allowedRoles={["Admin"]}>
                <AdminDashboard />
              </RoleRoute>
            }
          />

          <Route path="/admin/users" element={<RoleRoute allowedRoles={["Admin"]}><UsersList /></RoleRoute>} />
          <Route path="/admin/users/:userId" element={<RoleRoute allowedRoles={["Admin"]}><EditUser /></RoleRoute>} />

          <Route path="/exams/upcoming" element={<RoleRoute allowedRoles={["Student","Teacher","Admin"]}><UpcomingExams /></RoleRoute>} />
          <Route path="/exams/active" element={<RoleRoute allowedRoles={["Student","Teacher","Admin"]}><ActiveExams /></RoleRoute>} />

          <Route path="/notifications" element={<RoleRoute allowedRoles={["Student","Teacher","Admin"]}><MyNotifications /></RoleRoute>} />

          <Route path="/courses" element={<RoleRoute allowedRoles={["Student","Teacher","Admin"]}><CoursesList /></RoleRoute>} />
          <Route path="/courses/:courseId" element={<RoleRoute allowedRoles={["Student","Teacher","Admin"]}><CourseDetails /></RoleRoute>} />

          <Route path="/health" element={<Health />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}
