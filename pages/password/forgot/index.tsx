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
import useForgotPasswordMutation from "../../../src/hooks/useForgotPasswordMutation";

function ForgotPassword() {
  const router = useRouter();
  const [otherErrors, setOtherErrors] = useState([]);
  const resetPasswordMutation = useForgotPasswordMutation();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
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

  function validateEmail(value: string) {
    let error;
    if (!value) {
      error = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
      error = "Invalid email address";
    }
    return error;
  }

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
          resetPasswordMutation.mutate(data);
        })}
      >
        <Row
          justify="center"
          css={{ marginTop: "$xl", display: "flex", flexFlow: "column" }}
        >
          <Input
            fullWidth
            clearable
            placeholder="Email"
            {...register("email", { validate: validateEmail })}
          />
          <Text css={{ mt: "$sm" }}>{errors.email?.message}</Text>
        </Row>
        {resetPasswordMutation.isSuccess && (
          <Row justify="center" css={{ marginTop: "$md" }}>
            <Text>
              We&apos;ve sent you an email with instructions on how to reset
              your password.
            </Text>
          </Row>
        )}
        <Row justify="center" css={{ marginTop: "$xl" }}>
          <Button type="submit" auto disabled={!!errors.email?.message}>
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

export default ForgotPassword;
