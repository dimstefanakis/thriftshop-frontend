import { useQuery } from "react-query";
import axios from "axios";

function useGetListing(url:string) {
  const { status, data, error, refetch } = useQuery(
    ["getListing",url],
    () => {
      return axios(url).then(
        (res) => res.data
      );
    },
  );

  return {
    status,
    data,
    error,
    refetch,
  };
}

export default useGetListing;
