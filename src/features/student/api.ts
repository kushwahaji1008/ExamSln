import api from "@/services/api";

export const fetchStudentExams = async () => {
  const res = await api.get("/exams");
  return res.data;
};

export const fetchMyAttempts = async () => {
  const res = await api.get("/attempts/my");
  return res.data;
};
