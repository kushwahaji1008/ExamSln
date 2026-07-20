import api from "@/services/api";

export const fetchCourses = async () => {
  const res = await api.get("/videos/courses");
  return res.data;
};

export const fetchStudentExams = async () => {
  const res = await api.get("/exams/upcoming");
  return res.data;
};

export const fetchMyAttempts = async () => {
  const res = await api.get("/attempts/my");
  return res.data;
};
