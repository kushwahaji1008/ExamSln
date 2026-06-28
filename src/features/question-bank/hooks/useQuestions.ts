import { useQuery } from "@tanstack/react-query";
import { getQuestions } from "../services/questionService";

export function useQuestions() {
  return useQuery({
    queryKey: ["questions"],
    queryFn: async () => {
      const res = await getQuestions();
      return res.data;
    },
  });
}
