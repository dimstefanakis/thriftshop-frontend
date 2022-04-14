import axios from "axios";
import { useMutation } from "react-query";

function useUpdateUserMutation() {
  const mutation = useMutation(async (data: any) => {
    let formData = new FormData();

    formData.append("first_name", data.firstName ?? '');
    formData.append("last_name", data.lastName ?? '');
    let response = await axios.patch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/user/`,
      formData
    );
    return response.data;
  });

  return mutation;
}

export default useUpdateUserMutation;
