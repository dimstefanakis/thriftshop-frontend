import { useMutation } from "react-query";

function useForgotPasswordMutation() {
  const mutation = useMutation(async (data: any) => {
    const formData = new FormData();
    formData.append("email", data.email);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/password/reset/`,
      {
        method: "POST",
        body: formData,
      }
    );
    const content = await response.json();
    return content;
  });

  return mutation;
}

export default useForgotPasswordMutation;
