import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Container,
  Row,
  Button,
  Text,
  Input,
  Loading,
} from "@nextui-org/react";
import { useForm } from "react-hook-form";
import useResetPasswordMutation from "../../../../src/hooks/useResetPasswordMutation";

function PasswordReset() {
  const router = useRouter();
  const [otherErrors, setOtherErrors] = useState([]);
  const { uid, token } = router.query;
  const resetPasswordMutation = useResetPasswordMutation();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      password1: "",
      password2: "",
    },
  });

  function checkForErrors(data: any) {
    let newErrors = [] as any;
    if (data.new_password2) {
      newErrors = [...newErrors, ...data.new_password2];
    }
    if (data.new_password1) {
      newErrors = [...newErrors, ...data.new_password1];
    }
    if (data.non_field_errors) {
      newErrors = [...newErrors, ...data.non_field_errors];
    }
    if (data.token) {
      newErrors = [...newErrors, "Your session has expired."];
    }
    setOtherErrors(newErrors);
  }

  const validateConfirmPassword = (value: string) => {
    let error;
    if (watch("password1") && value) {
      if (watch("password1") !== value) {
        error = "Password not matched";
      }
    }
    return error;
  };

  console.log("errors", errors);
  const validatePassword = (values: string) => {
    let error;
    const passwordRegex = /(?=.*[0-9])/;
    if (!values) {
      error = "*Required";
    } else if (values.length < 8) {
      error = "*Password must be 8 characters long.";
    } else if (!passwordRegex.test(values)) {
      error = "*Invalid password. Must contain one number.";
    }
    return error;
  };

  useEffect(() => {
    if (resetPasswordMutation.data) {
      checkForErrors(resetPasswordMutation.data);
    }
  }, [resetPasswordMutation.data]);

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
      <Text h2>Reset Password</Text>
      <form
        style={{ margin: "0 10px", maxWidth: 400, width: "100%" }}
        onSubmit={handleSubmit((data) => {
          // do something with the form data
          console.log("in")
          resetPasswordMutation.mutate({ uid: uid, token: token, ...data });
        })}
      >
        <Row
          justify="center"
          css={{ marginTop: "$xl", display: "flex", flexFlow: "column" }}
        >
          <Input.Password
            fullWidth
            clearable
            placeholder="Password"
            {...register("password1", { validate: validatePassword })}
          />
          {errors.password1?.message && (
            <Text css={{ mt: "$sm" }}>{errors.password1?.message}</Text>
          )}
        </Row>
        <Row
          justify="center"
          css={{ marginTop: "$sm", display: "flex", flexFlow: "column" }}
        >
          <Input.Password
            fullWidth
            clearable
            placeholder="Password again"
            {...register("password2", { validate: validateConfirmPassword })}
          />
          {errors.password2?.message && (
            <Text css={{ mt: "$sm" }}>{errors.password2?.message}</Text>
          )}
        </Row>
        {resetPasswordMutation.isSuccess && (
          <Row justify="center" css={{ marginTop: "$md" }}>
            <Text>Password successfully reset!</Text>
          </Row>
        )}
        <Row justify="center" css={{ marginTop: "$xl" }}>
          <Button
            type="submit"
            auto
            disabled={
              !!(errors.password1?.message || errors.password2?.message)
            }
          >
            {resetPasswordMutation.isLoading ? (
              <Loading color="white" size="sm" />
            ) : (
              "Reset Password"
            )}
          </Button>
        </Row>
      </form>
    </Container>
  );
}

export default PasswordReset;
