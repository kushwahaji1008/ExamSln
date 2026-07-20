import {
  LayoutDashboard,
  BookOpen,
  FileText,
  Video,
  BarChart3,
  FolderOpen,
  Settings,
  LogOut,
  User,
  Bell,
  Users,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from '@/app/providers/AuthProvider';

const studentMenus = [
  { title: "Exams", icon: FileText, path: "/student/exams" },
  { title: "My Attempts", icon: BarChart3, path: "/student/attempts" },
];

const teacherMenus = [
  { title: "My Exams", icon: FileText, path: "/teacher/exams" },
  { title: "Create Exam", icon: FolderOpen, path: "/teacher/exams/create" },
  { title: "Questions", icon: Users, path: "/teacher/questions" },
  { title: "Create Question", icon: BookOpen, path: "/teacher/questions/create" },
];

const adminMenus = [
  { title: "Users", icon: Users, path: "/admin/users" },
];

const sharedMenus = [
  { title: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { title: "Profile", icon: User, path: "/profile" },
  { title: "Courses", icon: BookOpen, path: "/courses" },
  { title: "Upcoming Exams", icon: FileText, path: "/exams/upcoming" },
  { title: "Active Exams", icon: FolderOpen, path: "/exams/active" },
  { title: "Notifications", icon: Bell, path: "/notifications" },
];

function getMenus(roleName: string) {
  if (roleName === "Student") return [...studentMenus, ...sharedMenus];
  if (roleName === "Teacher") return [...teacherMenus, ...sharedMenus];
  if (roleName === "Admin" || roleName === "SuperAdmin") return [...adminMenus, ...sharedMenus];
  return sharedMenus;
}

export default function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const roleName = typeof user?.role === 'number'
    ? {0: 'Student', 1: 'Teacher', 2: 'Admin', 3: 'SuperAdmin'}[user.role]
    : typeof user?.role === 'string'
      ? user.role.charAt(0).toUpperCase() + user.role.slice(1).toLowerCase()
      : '';

  const menus = getMenus(roleName);

  return (
    <aside className="sticky top-0 w-72 h-screen bg-white border-r border-gray-200">
      <div className="h-16 flex items-center justify-center border-b">
        <h1 className="text-2xl font-bold text-blue-600">
          ExamPlatform
        </h1>
      </div>

      <nav className="p-4 space-y-2">
        {menus.map((item) => (
          <NavLink
            key={item.title}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-xl transition ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-blue-50"
              }`
            }
          >
            <item.icon size={20} />
            <span>{item.title}</span>
          </NavLink>
        ))}

        <button
          className="mt-8 flex w-full items-center gap-3 rounded-xl p-3 text-red-600 hover:bg-red-50"
          onClick={() => { logout(); navigate('/login'); }}
        >
          <LogOut size={20} />
          Logout
        </button>
      </nav>
    </aside>
  );
}
