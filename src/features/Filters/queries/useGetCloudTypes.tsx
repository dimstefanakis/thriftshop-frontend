import { useQuery } from "react-query";
import axios from "axios";

function useGetCloudTypes() {
  const { status, data, error, refetch } = useQuery("getCloudTypes", () => {
    return axios(`${process.env.NEXT_PUBLIC_API_URL}/v1/cloud_types/`).then(
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

export default useGetCloudTypes;
