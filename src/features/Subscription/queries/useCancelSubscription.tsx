import { useMutation } from "react-query";
import axios from "axios";

function useCancelSubscription() {
  const mutation = useMutation(async () => {
    let response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/v1/cancel_subscription/`
    );
    return response.data;
  });

  return mutation;
}

export default useCancelSubscription;
