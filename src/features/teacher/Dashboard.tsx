import { useQuery } from "@tanstack/react-query";
import { fetchTeacherExams, fetchQuestions } from "./api";

export default function TeacherDashboard() {
  const { data: exams } = useQuery({
    queryKey: ["teacher-exams"],
    queryFn: fetchTeacherExams,
  });

  const { data: questions } = useQuery({
    queryKey: ["questions"],
    queryFn: fetchQuestions,
  });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Teacher Dashboard</h1>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-white border rounded">
          <h2 className="font-semibold">My Exams</h2>
          {exams?.map((e: any) => (
            <div key={e.id}>{e.title}</div>
          ))}
        </div>

        <div className="p-4 bg-white border rounded">
          <h2 className="font-semibold">Question Bank</h2>
          {questions?.map((q: any) => (
            <div key={q.id}>{q.title}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
