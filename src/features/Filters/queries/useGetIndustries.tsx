import { useQuery } from "react-query";
import axios from "axios";

function useGetIndustries() {
  const { status, data, error, refetch } = useQuery("getIndustries", () => {
    return axios(`${process.env.NEXT_PUBLIC_API_URL}/v1/industries/`).then(
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

export default useGetIndustries;
