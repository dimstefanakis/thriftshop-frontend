import { useQuery } from "react-query";
import axios from "axios";

function useGetSubscriptionPlans() {
  const { status, data, error, refetch } = useQuery("getSubscriptionPlans", () => {
    return axios(`${process.env.NEXT_PUBLIC_API_URL}/v1/membership_plans/`).then(
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

export default useGetSubscriptionPlans;
