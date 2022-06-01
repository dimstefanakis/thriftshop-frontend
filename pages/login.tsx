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
import {
  setAccessToken,
  setRefreshToken,
  setUser,
  getUserData,
} from "../src/features/Authentication/slices/authenticationSlice";
import useLoginMutation from "../src/hooks/useLoginMutation";
import { RootState } from "../store";

function Login() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.authentication);
  const loginMutation = useLoginMutation();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user]);

  useEffect(() => {
    if (loginMutation.isSuccess) {
      dispatch(setAccessToken(loginMutation.data.access_token));
      dispatch(setRefreshToken(loginMutation.data.refresh_token));
      dispatch(getUserData());
    }
  }, [loginMutation.status]);

  function isDisabled() {
    return !(watch("email") && watch("password"));
  }

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
      <Text h2>Login on ThriftMvp</Text>
      <form
        style={{ margin: "0 10px", maxWidth: 400, width: "100%" }}
        onSubmit={handleSubmit((data) => {
          // do something with the form data
          loginMutation.mutate(data);
        })}
      >
        <Row justify="center" css={{ marginTop: "$xl" }}>
          <Input
            fullWidth
            clearable
            required
            placeholder="Email"
            {...register("email", { required: true })}
          />
        </Row>
        <Row justify="center" css={{ marginTop: "$sm" }}>
          <Input.Password
            fullWidth
            clearable
            required
            placeholder="Password"
            {...register("password", { required: true })}
          />
        </Row>
        {loginMutation?.data?.status === 400 ||
        loginMutation?.data?.status == 401 ? (
          <Row
            justify="center"
            css={{ marginTop: "$sm", display: "flex", flexFlow: "column" }}
          >
            <Text css={{ mt: "$sm" }} color="error">
              Couldn&apos;t find an account with that email and password.
            </Text>
          </Row>
        ) : null}
        <Row justify="center" css={{ marginTop: "$xl" }}>
          <Button type="submit" disabled={isDisabled()} auto>
            {loginMutation.isLoading ? (
              <Loading color="white" size="sm" />
            ) : (
              "Login"
            )}
          </Button>
        </Row>
        <Text css={{ marginTop: "$sm", textAlign: 'center' }}>
          Forgot password?
          <Link href="/password/forgot">
            <Text
              css={{
                textDecoration: "underline",
                cursor: "pointer",
                display: "inline",
              }}
            >
              Reset it here
            </Text>
          </Link>
        </Text>
      </form>
    </Container>
  );
}

export default Login;
