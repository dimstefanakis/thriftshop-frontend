import { useMutation } from "react-query";

function useRegisterMutation() {
  const mutation = useMutation((data: any) => {
    let formData = new FormData();

    formData.append("username", data.email);
    formData.append("email", data.email);
    formData.append("password1", data.password);
    formData.append("password2", data.passwordConfirm);

    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/registration/`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => res);
  });

  return mutation;
}

export default useRegisterMutation;
