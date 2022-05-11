import { useQuery } from "react-query";
import axios from "axios";

function useGetHostings() {
  const { status, data, error, refetch } = useQuery("getHostings", () => {
    return axios(`${process.env.NEXT_PUBLIC_API_URL}/v1/hostings/`).then(
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

export default useGetHostings;
