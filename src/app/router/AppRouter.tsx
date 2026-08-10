import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AppShell from "@/components/layout/AppShell";
import Login from "@/features/auth/Login";
import Register from "@/features/auth/Register";
import LandingPage from "@/features/landing/LandingPage";

import RoleRoute from "./RoleRoute";
import { useAuth } from '@/app/providers/AuthProvider';

import ForgotPassword from '@/features/auth/ForgotPassword';
import ResetPassword from '@/features/auth/ResetPassword';

import About from '@/features/landing/About';
import Contact from '@/features/landing/Contact';
import Pricing from '@/features/landing/Pricing';
import FAQ from '@/features/landing/Faq';
import Terms from '@/features/landing/Terms';
import Privacy from '@/features/landing/Privacy';

import StudentDashboard from "@/features/student/Dashboard";
import TeacherDashboard from "@/features/teacher/Dashboard";
import AdminDashboard from "@/features/admin/Dashboard";

import Profile from '@/features/auth/Profile';

import ExamsList from '@/features/student/ExamsList';
import ExamDetails from '@/features/student/ExamDetails';
import MyAttempts from '@/features/student/MyAttempts';
import AttemptRunner from '@/features/student/AttemptRunner';

// --- NEW STUDENT COURSE IMPORTS ---
import StudentCourses from "@/features/student/pages/StudentCourses";
import StudentCourseDetails from "@/features/student/pages/CourseDetails"; // Adjust if path differs
import StudentExams from "@/features/student/pages/StudentExams";

import CreateExam from '@/features/teacher/courses/CreateExam';
import EditExam from '@/features/teacher/EditExam';
import MyExams from '@/features/teacher/courses/MyExams';
import TeacherExamDetails from '@/features/teacher/TeacherExamDetails';

// --- NEW TEACHER COURSE IMPORTS ---
import TeacherMyCourses from '@/features/teacher/courses/MyCourses';
import CreateCourse from '@/features/teacher/courses/CreateCourse';
import EditCourse from '@/features/teacher/courses/EditCourse';
import CourseBuilder from '@/features/teacher/courses/CourseBuilder';
import EnrolledStudents from '@/features/teacher/courses/EnrolledStudents';

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
import VerifyEmail from "@/features/auth/VerifyEmail";
import Unauthorized from "@/features/errors/Unauthorized";
import Maintenance from "@/features/errors/Maintenance";
import Billing from "@/features/profile/pages/Billing";
import Notifications from "@/features/notifications/Notifications";
import Support from "@/features/support/Support";
import Messages from "@/features/notifications/Messages";

function Dashboard() {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;

  if (user.role === 0 || user.role === "Student") return <Navigate to="/student" replace />;
  if (user.role === 1 || user.role === "Teacher") return <Navigate to="/teacher" replace />;
  if (user.role === 2 || user.role === "Admin") return <Navigate to="/admin" replace />;
  if (user.role === 3 || user.role === "SuperAdmin") return <Navigate to="/admin" replace />;

  return <h1 className="text-2xl font-bold">Dashboard Home</h1>;
}

export default function AppRouter() {''
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Landing */}
        <Route path="/" element={<LandingPage />} />

        {/* Authentication */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        
        <Route path="/maintenance" element={<Maintenance />} />

        {/* Protected Application */}
        <Route element={<AppShell />}>

          <Route path="/dashboard" element={<Dashboard />} />

          {/* Shared Routes */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/billing" element={<Billing />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/support" element={<Support />} />

          {/* ================= STUDENT ROUTES ================= */}
          <Route path="/student" element={<RoleRoute allowedRoles={["Student"]}><StudentDashboard /></RoleRoute>} />
          <Route path="/student/dashboard" element={<RoleRoute allowedRoles={["Student"]}><StudentDashboard /></RoleRoute>} />
          
          <Route path="/student/attempts" element={<RoleRoute allowedRoles={["Student"]}><MyAttempts /></RoleRoute>} />
          <Route path="/attempts/:attemptId" element={<RoleRoute allowedRoles={["Student", "Teacher", "Admin"]}><AttemptRunner /></RoleRoute>} />

          {/* New Student Course & Exam Routes */}
          <Route path="/student/courses" element={<RoleRoute allowedRoles={["Student"]}><StudentCourses /></RoleRoute>} />
          <Route path="/student/courses/:id" element={<RoleRoute allowedRoles={["Student"]}><StudentCourseDetails /></RoleRoute>} />
          <Route path="/student/exams" element={<RoleRoute allowedRoles={["Student"]}><StudentExams /></RoleRoute>} />
          <Route path="/student/exams/:id" element={<RoleRoute allowedRoles={["Student"]}><ExamDetails /></RoleRoute>} />


          {/* ================= TEACHER ROUTES ================= */}
          <Route path="/teacher" element={<RoleRoute allowedRoles={["Teacher"]}><TeacherDashboard /></RoleRoute>} />

          {/* New Teacher Course Routes */}
          <Route path="/teacher/courses" element={<RoleRoute allowedRoles={["Teacher"]}><TeacherMyCourses /></RoleRoute>} />
          <Route path="/teacher/courses/create" element={<RoleRoute allowedRoles={["Teacher"]}><CreateCourse /></RoleRoute>} />
          <Route path="/teacher/courses/:id/edit" element={<RoleRoute allowedRoles={["Teacher"]}><EditCourse /></RoleRoute>} />
          <Route path="/teacher/courses/:id/builder" element={<RoleRoute allowedRoles={["Teacher"]}><CourseBuilder /></RoleRoute>} />
          <Route path="/teacher/courses/:id/students" element={<RoleRoute allowedRoles={["Teacher"]}><EnrolledStudents /></RoleRoute>} />

          {/* Teacher Exam & Question Routes */}
          <Route path="/teacher/exams" element={<RoleRoute allowedRoles={["Teacher"]}><MyExams /></RoleRoute>} />
          <Route path="/teacher/exams/create" element={<RoleRoute allowedRoles={["Teacher"]}><CreateExam /></RoleRoute>} />
          <Route path="/teacher/exams/:examId" element={<RoleRoute allowedRoles={["Teacher"]}><TeacherExamDetails /></RoleRoute>} />
          <Route path="/teacher/exams/:examId/edit" element={<RoleRoute allowedRoles={["Teacher"]}><EditExam /></RoleRoute>} />
          <Route path="/teacher/questions" element={<RoleRoute allowedRoles={["Teacher"]}><QuestionsList /></RoleRoute>} />
          <Route path="/teacher/questions/create" element={<RoleRoute allowedRoles={["Teacher"]}><CreateQuestion /></RoleRoute>} />
          <Route path="/teacher/questions/:questionId/edit" element={<RoleRoute allowedRoles={["Teacher"]}><EditQuestion /></RoleRoute>} />


          {/* ================= ADMIN ROUTES ================= */}
          <Route path="/admin" element={<RoleRoute allowedRoles={["Admin"]}><AdminDashboard /></RoleRoute>} />
          <Route path="/admin/users" element={<RoleRoute allowedRoles={["Admin"]}><UsersList /></RoleRoute>} />
          <Route path="/admin/users/:userId" element={<RoleRoute allowedRoles={["Admin"]}><EditUser /></RoleRoute>} />


          {/* ================= SHARED PROTECTED ROUTES ================= */}
          <Route path="/exams/upcoming" element={<RoleRoute allowedRoles={["Student", "Teacher", "Admin"]}><UpcomingExams /></RoleRoute>} />
          <Route path="/exams/active" element={<RoleRoute allowedRoles={["Student", "Teacher", "Admin"]}><ActiveExams /></RoleRoute>} />
          <Route path="/notifications/list" element={<RoleRoute allowedRoles={["Student", "Teacher", "Admin"]}><MyNotifications /></RoleRoute>} />
          <Route path="/courses" element={<RoleRoute allowedRoles={["Student", "Teacher", "Admin"]}><CoursesList /></RoleRoute>} />
          <Route path="/courses/:courseId" element={<RoleRoute allowedRoles={["Student", "Teacher", "Admin"]}><CourseDetails /></RoleRoute>} />


          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="*" element={<h1 className="text-2xl font-bold flex justify-center items-center h-full">404 - Page Not Found</h1>} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}