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
            placeholder="Email"
            {...register("email")}
          />
        </Row>
        <Row justify="center" css={{ marginTop: "$xl" }}>
          <Input.Password
            fullWidth
            clearable
            placeholder="Password"
            {...register("password")}
          />
        </Row>
        <Row justify="center" css={{ marginTop: "$xl" }}>
          <Button type="submit" auto>
            {loginMutation.isLoading ? (
              <Loading color="white" size="sm" />
            ) : (
              "Login"
            )}
          </Button>
        </Row>
      </form>
    </Container>
  );
}

export default Login;
