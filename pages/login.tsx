import { useEffect } from "react";
import Link from "next/link";
import {
  Container,
  Button,
  Text,
  Row,
  Input,
  Loading,
} from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import {
  setAccessToken,
  setRefreshToken,
  setUser,
} from "../src/features/Authentication/slices/authenticationSlice";
import useLoginMutation from "../src/hooks/useLoginMutation";

function Login() {
  const dispatch = useDispatch();
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
    if (loginMutation.isSuccess) {
      dispatch(setAccessToken(loginMutation.data.access_token));
      dispatch(setRefreshToken(loginMutation.data.refresh_token));
      dispatch(setUser(loginMutation.data.user));
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
