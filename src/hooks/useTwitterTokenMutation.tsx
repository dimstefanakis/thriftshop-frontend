import { useMutation } from "react-query";

interface TwitterTokenMutationData {
  oauthVerifier: any;
  oauthToken: any;
}
function useTwitterTokenMutation() {
  const mutation = useMutation((data: TwitterTokenMutationData) => {
    let formData = new FormData();

    formData.append("oauth_token", data.oauthToken);
    formData.append("oauth_verifier", data.oauthVerifier);
    return fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/v1/get_twitter_access_tokens/`,
      {
        method: "POST",
        body: formData,
      }
    )
      .then((res) => res.json())
      .then((res) => res);
  });
  return mutation;
}

export default useTwitterTokenMutation;
