import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Container,
  Button,
  Text,
  Row,
  Input,
  Textarea,
  Loading,
} from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import AreYouABuyer from "../src/flat/AreYouABuyer";
import useCreateMvpSuggestion from "../src/features/SuggestMvp/queries/useCreateMvpSuggestion";
import { RootState } from "../store";

function FindMeAnMvp() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.authentication);
  const createMvpSuggestion = useCreateMvpSuggestion();
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
      <Text h2>Find me an MVP</Text>
      {user?.subscription?.status == "active" ? (
        <>
          <Text
            css={{
              maxW: 500,
              lineHeight: "$sm",
            }}
          >
            You don&apos;t have to build products from scratch. Someone has
            probably already tried before. Describe what you want to build and
            we will help you find an already existing MVP for sale!
          </Text>

          <form
            style={{ margin: "0 10px", maxWidth: 400, width: "100%" }}
            onSubmit={handleSubmit((data) => {
              // do something with the form data
              createMvpSuggestion.mutate(data);
            })}
          >
            <Row justify="center" css={{ marginTop: "$xl" }}>
              <Textarea
                fullWidth
                minRows={6}
                maxRows={100}
                label="MVP Request"
                placeholder="What are you looking for? You can be as specific as you want"
                // helperText="Explain your project in less than 100 characters"
                required
                {...register("suggestion")}
              />
            </Row>
            {createMvpSuggestion.isSuccess && (
              <Row justify="center" css={{ marginTop: "$md" }}>
                <Text css={{ maxW: 500 }}>
                  Your request has been submitted. We will get in touch with you
                  soon via email for updates!
                </Text>
              </Row>
            )}

            <Row justify="center" css={{ marginTop: "$xl" }}>
              <Button type="submit" auto>
                {createMvpSuggestion.isLoading ? (
                  <Loading color="white" size="sm" />
                ) : (
                  "Submit Request"
                )}
              </Button>
            </Row>
          </form>
        </>
      ) : (
        <Container css={{ margin: "0 10px", maxWidth: 500, width: "100%", justifyContent: 'center' }}>
          <Container css={{ backgroundColor: "$error", py: 10, borderRadius: "$md", marginTop: '$xl' }}>
            <Text css={{margin: 0}}>This feature is only available on premium subscription</Text>
          </Container>
          <Container css={{ marginTop: "$xl", w: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <AreYouABuyer buttonText="Get Premium" />
          </Container>
        </Container>
      )}
    </Container>
  );
}

export default FindMeAnMvp;
