import {
  LayoutDashboard,
  BookOpen,
  FileText,
  Video,
  BarChart3,
  FolderOpen,
  Settings,
  LogOut,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const menus = [
  { title: "Dashboard", icon: LayoutDashboard, path: "/student" },
  { title: "My Courses", icon: BookOpen, path: "/student/courses" },
  { title: "Exams", icon: FileText, path: "/student/exams" },
  { title: "Live Classes", icon: Video, path: "/student/live" },
  { title: "Results", icon: BarChart3, path: "/student/results" },
  { title: "Resources", icon: FolderOpen, path: "/student/resources" },
  { title: "Settings", icon: Settings, path: "/student/settings" },
];

export default function Sidebar() {
  return (
    <aside className="w-72 bg-white border-r border-gray-200 min-h-screen">
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

        <button className="mt-8 flex w-full items-center gap-3 rounded-xl p-3 text-red-600 hover:bg-red-50">
          <LogOut size={20} />
          Logout
        </button>
      </nav>
    </aside>
  );
}
