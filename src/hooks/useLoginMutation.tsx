import { useMutation } from "react-query";

function useLoginMutation() {
  const mutation = useMutation((data: any) => {
    let formData = new FormData();

    formData.append("username", data.email);
    formData.append("email", data.email);
    formData.append("password", data.password);

    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login/`, {
      method: "POST",
      body: formData,
    }).then(async (res) => {
      let data = await res.json();
      return {
        status: res.status,
        ...data,
      };
    });
  });

  return mutation;
}

export default useLoginMutation;
