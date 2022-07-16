import { Text, Image, Container } from "@nextui-org/react";
import ArrowDown from "../../Icons/ArrowDown";

function TraditionalEntrepreneurship() {
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
        Traditional Entrepreneurship
      </Text>
      <Text h4 css={{ mt: "50px", mb: 0 }}>
        Think of idea
      </Text>
      <ArrowDown />
      <Text h4 css={{ mb: 0 }}>
        Validate the idea
      </Text>
      <ArrowDown />
      <Text h4 css={{ mb: 0 }}>
        Spend time and money to build an MVP
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
          <Text h3>Option B</Text>
          <Text h4>
            Fail to generate revenue and decide to drop the project
          </Text>
        </Container>
      </Container>
    </Container>
  );
}

export default TraditionalEntrepreneurship;
