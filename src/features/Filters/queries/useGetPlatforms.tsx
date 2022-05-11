import { useQuery } from "react-query";
import axios from "axios";

function useGetPlatforms() {
  const { status, data, error, refetch } = useQuery("getPlatforms", () => {
    return axios(`${process.env.NEXT_PUBLIC_API_URL}/v1/platforms/`).then(
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

export default useGetPlatforms;
