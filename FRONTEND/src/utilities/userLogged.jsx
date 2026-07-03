import { useQuery } from "@tanstack/react-query";
import api from "./Api.js";

const getCurrentUser = async () => {
  const res = await api.post("/api/current-user",{}, {
    withCredentials: true,
  });
  return res.data;
};

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
    retry: false, // Don't retry if 401
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};
