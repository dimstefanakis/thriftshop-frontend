import { useMutation } from "react-query";
import axios from "axios";

function useUpdateProfile() {
  const mutation = useMutation(async (data: any) => {
    let formData = new FormData();

    for (const entry of Object.entries(data)) {
      const [key, value]: any = entry;
      if (value) {
        formData.append(key, value);
      }
    }

    let response = await axios.patch(
      `${process.env.NEXT_PUBLIC_API_URL}/v1/user/me/update/`,
      formData
    );
    return response.data;
  });

  return mutation;
}

export default useUpdateProfile;
