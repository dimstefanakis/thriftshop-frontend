import { Text, Image, Container } from "@nextui-org/react";
import ArrowDown from "../../Icons/ArrowDown";

function EntrepreneurshipThroughMVP() {
  return (
    <Container
      css={{
        display: "flex",
        flexFlow: "column",
        alignItems: "center",
        mb: "100px",
      }}
    >
      <Text
        h1
        css={{
          mb: 0,
          textAlign: "center",
          fontSize: 40,
          "@xs": {
            fontSize: 60,
          },
        }}
      >
        Entrepreneurship through{" "}
        <Text
          h1
          css={{
            display: "inline",
            color: "$primary",
            fontSize: 40,
            "@xs": {
              fontSize: 60,
            },
          }}
        >
          ThriftMVP
        </Text>
      </Text>
      <Text h4 css={{ mt: "50px", mb: 0 }}>
        Think of idea
      </Text>
      <ArrowDown />
      <Text h4 css={{ mb: 0, textAlign: 'center' }} color="$primary">
        Buy an MVP. Save dev time and costs
      </Text>
      <ArrowDown />
      <Image
        src="/mvp.png"
        css={{ width: "600px", my: "$xl", maxW: "100%", objectFit: "contain" }}
        alt=""
      />
      <Container
        css={{ padding: 0, display: "flex", flexFlow: "row", maxW: 600 }}
      >
        <Container css={{ display: "flex", flexFlow: "column", px: "$md" }}>
          <Text h3>Option A</Text>
          <Text h4>
            Succeed to generate revenue and either continue to grow or exit on a
            platform like @microacquire
          </Text>
        </Container>
        <div style={{ width: 4, backgroundColor: "white" }}></div>
        <Container
          css={{
            px: "$md",
            display: "flex",
            flexFlow: "column",
            alignItems: "center",
          }}
        >
          <Text h3 color="$primary">
            Option B
          </Text>
          <Text h4 color="$primary">
            Fail to generate revenue and either decide to drop the project or
            sell it on @thriftmvp
          </Text>
        </Container>
      </Container>
    </Container>
  );
}

export default EntrepreneurshipThroughMVP;
