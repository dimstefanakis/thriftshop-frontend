import { useQuery } from "react-query";
import axios from "axios";

function useGetTechStacks() {
  const { status, data, error, refetch } = useQuery("getTechStacks", () => {
    return axios(`${process.env.NEXT_PUBLIC_API_URL}/v1/tech_stacks/`).then(
      (res) => res.data
    );
  });

  return {
    status,
    data,
    error,
    refetch,
  };
}

export default useGetTechStacks;
