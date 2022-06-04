import { useMutation } from "react-query";
import axios from "axios";

function useCreateMvpSuggestion() {
  const mutation = useMutation(async (data: any) => {
    let formData = new FormData();

    formData.append("suggestion", data.suggestion);

    let response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/v1/create_mvp_suggestion/`,
      formData
    );
    return response.data;
  });

  return mutation;
}

export default useCreateMvpSuggestion;
