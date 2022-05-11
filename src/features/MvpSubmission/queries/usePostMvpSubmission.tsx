import axios from "axios";
import { useMutation } from "react-query";

function usePostMvpSubmission() {
  const mutation = useMutation(async (data: any) => {
    let formData = new FormData();

    formData.append("name", data.name);
    formData.append("one_liner", data.oneLiner);
    formData.append("description", data.description);
    formData.append("validation", data.validation);

    let response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/v1/submit_mvp/`,
      formData
    );
    return response.data;
  });

  return mutation;
}

export default usePostMvpSubmission;
