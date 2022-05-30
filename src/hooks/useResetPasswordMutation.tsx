import { useMutation } from "react-query";

function useResetPasswordMutation() {
  const mutation = useMutation(async (data: any) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/password/reset/confirm/`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          uid: data.uid,
          token: data.token,
          new_password1: data.password1,
          new_password2: data.password2,
        }),
      }
    );
    const content = await response.json();
    return content;
  });

  return mutation;
}

export default useResetPasswordMutation;
