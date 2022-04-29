import { useQuery } from "react-query";
import axios from "axios";

function useGetListing() {
  const { status, data, error, refetch } = useQuery(
    "getListing",
    () => {
      return axios(`${process.env.NEXT_PUBLIC_API_URL}/v1/listing/`).then(
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
