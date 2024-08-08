
import { useQuery, useQueryClient } from "@tanstack/react-query";
import instance from "../apis";

const useUserQuery = ({ action, id }: { action?: string; id?: string }) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: [action == action ? `${action}` : "", id ? id : ""],
    queryFn: async () => {
      const res = await instance.get(`/${action}`);

      return res.data;
    },
  });

  return { data, isLoading, isError, error };
};
export default useUserQuery;