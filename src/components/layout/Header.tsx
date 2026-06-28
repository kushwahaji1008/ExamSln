import { Bell, Search, UserCircle } from "lucide-react";

export default function Header() {
  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-8">
      <div className="relative w-96">
        <Search
          className="absolute left-3 top-3 text-gray-400"
          size={18}
        />

        <input
          placeholder="Search courses, exams..."
          className="w-full rounded-lg border pl-10 pr-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex items-center gap-6">
        <Bell className="cursor-pointer" />

        <UserCircle size={34} className="text-blue-600" />
      </div>
    </header>
  );
}
