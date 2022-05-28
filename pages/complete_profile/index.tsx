import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Container,
  Button,
  Text,
  Row,
  Input,
  Spacer,
  Checkbox,
  Loading,
} from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import useUpdateProfile from "../../src/features/Authentication/queries/useUpdateProfile";
import { RootState } from "../../store";

function CompleteProfile() {
  const router = useRouter();
  const [interests, setInterests] = useState<string[]>([]);
  const updateProfile = useUpdateProfile();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      suggestion: "",
    },
  });

  useEffect(() => {
    if (updateProfile.isSuccess) {
      router.push("/listing");
    }
  }, [updateProfile.status]);

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
      <Text h2>What are you interested in?</Text>
      {/* 
      <Text
        css={{
          maxW: 500,
          lineHeight: "$sm",
        }}
      >
        You don&apos;t have to build products from scratch. Someone has probably
        already tried before. Describe what you want to build and we will help
        you find an already existing MVP for sale!
      </Text> */}

      <form
        style={{ margin: "0 10px", maxWidth: 400, width: "100%" }}
        onSubmit={handleSubmit((data) => {
          // do something with the form data
          updateProfile.mutate({
            is_buyer: interests.includes("buying"),
            is_seller: interests.includes("selling"),
          });
        })}
      >
        <Row justify="center" css={{ marginTop: "$xl", marginBottom: 100 }}>
          <Checkbox.Group row onChange={setInterests}>
            <Checkbox value="buying" color="primary">
              Buying
            </Checkbox>
            <Spacer />
            <Checkbox value="selling" color="primary">
              Selling
            </Checkbox>
          </Checkbox.Group>
        </Row>
        <Row justify="center" css={{ marginTop: "$xl" }}>
          <Button type="submit" disabled={interests.length == 0} auto>
            {updateProfile.isLoading ? (
              <Loading color="white" size="sm" />
            ) : (
              "Let me see the listing!"
            )}
          </Button>
        </Row>
      </form>
    </Container>
  );
}

export default CompleteProfile;
