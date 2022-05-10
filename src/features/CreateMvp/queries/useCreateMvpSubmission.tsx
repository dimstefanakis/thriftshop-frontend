import { useMutation } from "react-query";
import axios from "axios";

function useCreateMvpSubmission() {
  const mutation = useMutation(async (data: any) => {
    let formData = new FormData();

    formData.append("name", data.name);
    formData.append("one_liner", data.oneLiner);
    formData.append("description", data.description);
    formData.append("validation", data.validation);
    formData.append("cloud_type", data.cloudType);
    formData.append("platforms", data.platforms);
    formData.append("hostings", data.hostings);
    formData.append("services", data.services);
    formData.append("tech_stack", data.techStack);
    formData.append("industries", data.industries);
    formData.append("failure_reasons", data.failureReasons);

    let response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/v1/submit_mvp/`,
      formData
    );
    return response.data;
  });

  return mutation;
}

export default useCreateMvpSubmission;
