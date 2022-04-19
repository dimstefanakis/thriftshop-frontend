import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Container,
  Button,
  Text,
  Row,
  Input,
  Loading,
} from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import useGetTwitterTokens from "../src/hooks/useGetTwitterTokens";
import useRegisterMutation from "../src/hooks/useRegisterMutation";
import useUpdateUserMutation from "../src/hooks/useUpdateUserMutation";
import {
  setAccessToken,
  setRefreshToken,
  setUser,
  getUserData,
} from "../src/features/Authentication/slices/authenticationSlice";
import { RootState } from "../store";

function Register() {
  const router = useRouter();
  const { user, accessToken } = useSelector(
    (state: RootState) => state.authentication
  );
  const dispatch = useDispatch();
  const registerMutation = useRegisterMutation();
  const updateUserMutation = useUpdateUserMutation();
  const { status, data, error, refetch } = useGetTwitterTokens();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
  });

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user]);

  function onTwitterClick() {
    refetch();
  }

  useEffect(() => {
    if (status === "success") {
      let twitterUrl = `https://api.twitter.com/oauth/authenticate?oauth_token=${data.oauth_token}&oauth_token_secret=${data.oauth_token_secret}`;
      window.location.replace(twitterUrl);
    }
  }, [status, data]);

  useEffect(() => {
    if (registerMutation.isSuccess) {
      // populate store with user data
      dispatch(setAccessToken(registerMutation.data.access_token));
      dispatch(setRefreshToken(registerMutation.data.refresh_token));
      dispatch(getUserData());

      let name = watch("name");
      let firstName = name.split(" ")[0];
      let lastName = name.split(" ")[1];
      updateUserMutation.mutate({
        firstName,
        lastName,
      });
    }
  }, [registerMutation.status]);

  return (
    <Container
      justify="center"
      alignItems="center"
      display="flex"
      direction="column"
      css={{
        paddingTop: 100,
      }}
    >
      <Text h2>Sign up on ThriftMvp</Text>
      <form
        style={{ margin: "0 10px", maxWidth: 400, width: "100%" }}
        onSubmit={handleSubmit((data) => {
          // do something with the form data
          registerMutation.mutate(data);
        })}
      >
        <Row justify="center" css={{ marginTop: "$xl" }}>
          <Input fullWidth clearable placeholder="Name" {...register("name")} />
        </Row>
        <Row justify="center" css={{ marginTop: "$sm" }}>
          <Input
            fullWidth
            clearable
            type="email"
            placeholder="Email"
            {...register("email")}
          />
        </Row>
        <Row justify="center" css={{ marginTop: "$sm" }}>
          <Input.Password
            fullWidth
            clearable
            placeholder="Password"
            {...register("password")}
          />
        </Row>
        <Row justify="center" css={{ marginTop: "$sm" }}>
          <Input.Password
            fullWidth
            clearable
            placeholder="Password again"
            {...register("passwordConfirm")}
          />
        </Row>
        <Row justify="center" css={{ marginTop: "$xl" }}>
          <Button type="submit" auto>
            {registerMutation.isLoading ? (
              <Loading color="white" size="sm" />
            ) : (
              "Sign up"
            )}
          </Button>
        </Row>
      </form>
      <Text
        h5
        css={{
          marginTop: "$xl",
        }}
      >
        or
      </Text>
      <Button
        onClick={onTwitterClick}
        css={{
          marginTop: "$xl",
        }}
      >
        {status == "loading" ? (
          <Loading color="white" size="sm" />
        ) : (
          "Sign up with Twitter"
        )}
      </Button>
      <Text css={{ marginTop: "$sm" }}>
        Already a user?{" "}
        <Link href="/login">
          <Text
            css={{
              textDecoration: "underline",
              cursor: "pointer",
              display: "inline",
            }}
          >
            Login
          </Text>
        </Link>
      </Text>
    </Container>
  );
}

export default Register;
