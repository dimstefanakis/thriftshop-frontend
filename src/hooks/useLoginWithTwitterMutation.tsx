import { useMutation } from "react-query";

function useLoginWithTwitterMutation() {
  const mutation = useMutation((data: any) => {
    let formData = new FormData();

    formData.append("access_token", data.accessToken);
    formData.append("token_secret", data.tokenSecret);

    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/twitter/`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => res);
  });

  return mutation;
}

export default useLoginWithTwitterMutation;
