import { useQuery } from "react-query";
import axios from "axios";

function useGetUser() {
  const { status, data, error, refetch } = useQuery(
    "getUser",
    () => {
      return axios(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/user/me/`
      ).then((res) => res.data);
    },
    {
      enabled: false,
      refetchOnWindowFocus: false,
    }
  );

  return {
    status,
    data,
    error,
    refetch,
  };
}

export default useGetUser;
