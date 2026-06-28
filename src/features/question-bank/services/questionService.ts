import api from "@/services/api";

export const getQuestions = () =>
  api.get("/questions");

export const createQuestion = (data: unknown) =>
  api.post("/questions", data);

export const updateQuestion = (
  id: string,
  data: unknown
) => api.put(`/questions/${id}`, data);

export const deleteQuestion = (
  id: string
) => api.delete(`/questions/${id}`);
