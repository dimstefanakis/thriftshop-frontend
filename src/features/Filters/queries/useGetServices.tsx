import { useQuery } from "react-query";
import axios from "axios";

function useGetServices() {
  const { status, data, error, refetch } = useQuery("getServices", () => {
    return axios(`${process.env.NEXT_PUBLIC_API_URL}/v1/services/`).then(
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

export default useGetServices;
