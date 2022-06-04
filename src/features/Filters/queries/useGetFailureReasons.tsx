import { useQuery } from "react-query";
import axios from "axios";

function useGetFailureReasons() {
  const { status, data, error, refetch } = useQuery("getFailureReasons", () => {
    return axios(`${process.env.NEXT_PUBLIC_API_URL}/v1/failure_reasons/`).then(
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

export default useGetFailureReasons;
