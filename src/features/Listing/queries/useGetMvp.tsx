import { useQuery } from "react-query";
import axios from "axios";

function useGetMvp(id: string) {
  const { status, data, error, refetch } = useQuery(
    ["getMvp", id],
    () => {
      return axios(`${process.env.NEXT_PUBLIC_API_URL}/v1/listing/${id}/`).then(
        (res) => res.data
      );
    },
    {
      enabled: !!id,
    }
  );

  return {
    status,
    data,
    error,
    refetch,
  };
}

export default useGetMvp;
