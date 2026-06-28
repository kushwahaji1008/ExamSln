import {
  BookOpen,
  FileText,
  GraduationCap,
  Clock,
  Trophy,
  Calendar,
} from "lucide-react";

const stats = [
  {
    title: "Enrolled Courses",
    value: "12",
    icon: BookOpen,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Upcoming Exams",
    value: "3",
    icon: FileText,
    color: "bg-red-100 text-red-600",
  },
  {
    title: "Completed Courses",
    value: "8",
    icon: GraduationCap,
    color: "bg-green-100 text-green-600",
  },
  {
    title: "Study Hours",
    value: "142",
    icon: Clock,
    color: "bg-yellow-100 text-yellow-600",
  },
];

const courses = [
  {
    name: "Operating System",
    progress: 72,
  },
  {
    name: "Computer Networks",
    progress: 51,
  },
  {
    name: "Database Management",
    progress: 90,
  },
];

const exams = [
  {
    title: "Operating System Mock Test",
    date: "Tomorrow",
  },
  {
    title: "DBMS Mid Semester",
    date: "25 July",
  },
];

export default function StudentDashboard() {
  return (
    <div className="space-y-8">

      {/* Welcome */}

      <div className="rounded-3xl bg-blue-600 text-white p-8">

        <h1 className="text-4xl font-bold">
          Welcome Back 👋
        </h1>

        <p className="mt-2 opacity-90">
          Continue your learning journey.
        </p>

      </div>

      {/* Stats */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        {stats.map((item) => (
          <div
            key={item.title}
            className="bg-white rounded-2xl shadow p-6 flex justify-between"
          >
            <div>
              <p className="text-gray-500">
                {item.title}
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {item.value}
              </h2>
            </div>

            <div
              className={`h-14 w-14 rounded-xl flex items-center justify-center ${item.color}`}
            >
              <item.icon size={28} />
            </div>
          </div>
        ))}

      </div>

      {/* Main Grid */}

      <div className="grid xl:grid-cols-3 gap-6">

        {/* Courses */}

        <div className="xl:col-span-2 bg-white rounded-2xl shadow p-6">

          <h2 className="text-xl font-bold mb-6">
            Continue Learning
          </h2>

          {courses.map((course) => (

            <div
              key={course.name}
              className="mb-6"
            >

              <div className="flex justify-between">

                <span>{course.name}</span>

                <span>{course.progress}%</span>

              </div>

              <div className="mt-2 h-3 rounded-full bg-gray-200">

                <div
                  className="h-3 rounded-full bg-blue-600"
                  style={{
                    width: `${course.progress}%`,
                  }}
                />

              </div>

            </div>

          ))}

        </div>

        {/* Upcoming Exams */}

        <div className="bg-white rounded-2xl shadow p-6">

          <h2 className="text-xl font-bold mb-6">
            Upcoming Exams
          </h2>

          {exams.map((exam) => (

            <div
              key={exam.title}
              className="border-b py-4"
            >

              <div className="font-semibold">
                {exam.title}
              </div>

              <div className="flex items-center mt-2 text-gray-500">

                <Calendar
                  size={16}
                  className="mr-2"
                />

                {exam.date}

              </div>

            </div>

          ))}

        </div>

      </div>

      {/* Bottom */}

      <div className="grid md:grid-cols-2 gap-6">

        <div className="bg-white rounded-2xl shadow p-6">

          <h2 className="text-xl font-bold mb-4">
            Recent Achievement
          </h2>

          <div className="flex items-center gap-4">

            <div className="h-14 w-14 rounded-full bg-yellow-100 flex items-center justify-center">

              <Trophy className="text-yellow-600"/>

            </div>

            <div>

              <h3 className="font-semibold">
                Excellent Progress
              </h3>

              <p className="text-gray-500">
                You scored above 90% in DBMS.
              </p>

            </div>

          </div>

        </div>

        <div className="bg-white rounded-2xl shadow p-6">

          <h2 className="text-xl font-bold mb-4">
            Today's Goal
          </h2>

          <p className="text-gray-600">
            Finish Computer Networks Module 5 and
            attempt one mock test.
          </p>

        </div>

      </div>

    </div>
  );
}
