import { Container, Col, Row, Text, Image } from "@nextui-org/react";

function Landing() {
  return (
    <Container
      css={{
        height: "100vh",
        minHeight: "100vh",
        "@sm": {
          flexWrap: "nowrap",
        },
      }}
      alignItems="center"
      justify="center"
      display="flex"
    >
      <Col css={{ height: "100%" }}>
        <Container
          css={{ height: "100%" }}
          justify="center"
          alignItems="center"
          display="flex"
        >
          <Text
            h1
            size={60}
            css={{
              textGradient: "45deg, $blue500 -20%, $pink500 50%",
              maxWidth: "500px",
            }}
          >
            Buy high quality pre-revenue MVPs
          </Text>
        </Container>
      </Col>
      <Col>
        <Image
          src="/illustration.png"
        />
      </Col>
    </Container>
  );
}

export default Landing;
