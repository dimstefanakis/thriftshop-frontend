import { useState } from "react";
import { Input, Button, Container, Text, Loading } from "@nextui-org/react";
import MailchimpSubscribe from "react-mailchimp-subscribe";
import { SubscribeFormProps } from "./interface";

const url =
  "https://gmail.us14.list-manage.com/subscribe/post?u=7c8673cc550b9f24941ac5fe4&amp;id=c22e5d8fee";

function SubscribeToNewsletter() {
  return (
    <MailchimpSubscribe
      url={url}
      render={({ subscribe, status, message }) => (
        <SubscribeForm
          status={status}
          message={message}
          onValidated={(formData: any) => subscribe(formData)}
        />
      )}
    />
  );
}
function SubscribeForm({ status, message, onValidated }: SubscribeFormProps) {
  const [email, setEmail] = useState("");

  const submit = () =>
    email &&
    email &&
    email.indexOf("@") > -1 &&
    onValidated({
      EMAIL: email,
    });

  return (
    <Container
      css={{
        padding: 0,
        marginTop: "$5",
        "@sm": {
          marginTop: "$15",
        },
      }}
    >
      <Text h4 css={{ marginBottom: "$md" }}>
        Subscribe to our newsletter
      </Text>
      <Input
        onChange={(e) => setEmail(e.target.value)}
        contentRightStyling={false}
        placeholder="Your email"
        contentRight={
          <Button
            flat
            color="primary"
            auto
            onClick={submit}
            type="submit"
            disabled={status === "success"}
          >
            {status == "sending" ? (
              <Loading type="spinner" color="white" size="sm" />
            ) : status == "success" ? (
              "Subscribed!"
            ) : (
              "Join"
            )}
          </Button>
        }
      ></Input>
    </Container>
  );
}

export default SubscribeToNewsletter;
