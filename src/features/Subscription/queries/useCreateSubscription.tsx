import { useMutation } from "react-query";
import axios from "axios";

function useCreateSubscription() {
  const mutation = useMutation(async (data: any) => {
    let formData = new FormData();

    formData.append("membership_plan_id", data.membershipPlanId);

    let response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/v1/create_subscription/`,
      formData
    );
    return response.data;
  });

  return mutation;
}

export default useCreateSubscription;
