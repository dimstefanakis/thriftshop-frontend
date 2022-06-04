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
    formData.append("preview_image", data.previewImage);
    formData.append("peak_user_count", data.peakUsers || 0);
    formData.append("current_user_count", data.currentUsers || 0);
    formData.append("peak_mrr", data.peakMrr || 0);
    formData.append("current_mrr", data.currentMrr || 0);
    formData.append("website_url", data.websiteUrl);
    formData.append("github_url", data.githubUrl);
    formData.append("asking_price", data.askingPrice );

    let response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/v1/submit_mvp/`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  });

  return mutation;
}

export default useCreateMvpSubmission;
