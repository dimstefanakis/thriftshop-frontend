import { Input, Button, Container, Text } from "@nextui-org/react";

function SubscribeToNewsletter() {
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
        contentRightStyling={false}
        placeholder="Your email"
        contentRight={
          <Button flat color="primary" auto>
            Join
          </Button>
        }
      ></Input>
    </Container>
  );
}

export default SubscribeToNewsletter;
