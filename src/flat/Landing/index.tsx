import { Container, Col, Row, Text, Image } from "@nextui-org/react";
import { url } from "inspector";

function Landing() {
  return (
    <>
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
          <Image src="/illustration.png" />
        </Col>
      </Container>
      <Story />
      <Vision />
    </>
  );
}

function Story() {
  return (
    <Container
      alignItems="center"
      justify="center"
      css={{ height: "100vh", marginTop: "100px" }}
    >
      <Container display="flex">
        <Text
          css={{
            fontSize: "85px",
            fontWeight: "800",
            letterSpacing: "0.02em",
          }}
        >
          The story
        </Text>
      </Container>
      <Container display="flex" css={{ marginTop: "100px", width: "50%" }}>
        <p>
          About 90% of startups fail. What about projects that never kicked off,
          the project that a developer started sometime somewhere but never put
          on display? They all currently live on github graveyards. Does that
          mean they should stay on graveyards?
          <b> No.</b>
        </p>
        <p style={{ marginTop: "30px" }}>
          Most startup founders are developers and what’s the most common
          misconception tech founders have?{" "}
          <span style={{ fontStyle: "italic" }}>
            {" "}
            If you build it they will come.
          </span>{" "}
          42% of startups fail due to misreading market demand and this mindset
          is a vital cause for this rate. But what if we could save these ideas
          through small pivots? Just look at the{" "}
          <span style={{ borderBottom: "2px solid" }}> Slack story.</span>
        </p>
      </Container>
    </Container>
  );
}

function Vision() {
  return (
    <Container
      alignItems="center"
      justify="center"
      css={{ height: "100vh", marginTop: "100px" }}
    >
      <Container display="flex">
        <Text
          css={{
            fontSize: "85px",
            fontWeight: "800",
            letterSpacing: "0.02em",
          }}
        >
          The vision
        </Text>
      </Container>
      <Container display="flex" css={{ marginTop: "100px", width: "50%" }}>
        <p>
          What does that leave us with?
          <b>
            {" "}
            The rest 90% of startups with the potential to bloom through simple
            pivots by smart people.
          </b>
        </p>
        <p>
          <b>
            {" "}
            Our vision is to help tech founders not linger on MVPs that are in a
            state of coma.
          </b>
        </p>
        <p>
          <b>
            Our vision is to help business founders find low cost opportunities,
            high quality MVPs with unicorn potential.
          </b>
        </p>
      </Container>
    </Container>
  );
}

export default Landing;
