import api from "@/services/api";

export const fetchQuestions = async () => {
  const res = await api.get("/questions");
  return res.data;
};

export const fetchTeacherExams = async () => {
  const res = await api.get("/exams/teacher");
  return res.data;
};
