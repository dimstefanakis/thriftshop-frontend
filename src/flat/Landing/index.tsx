import { Container, Col, Row, Text, Image, Link } from "@nextui-org/react";
import { url } from "inspector";

function Landing() {
  return (
    <>
      <Container
        fluid
        css={{
          minHeight: "100vh",
          "@sm": {
            flexWrap: "nowrap",
          },
        }}
        alignItems="center"
        justify="center"
        display="flex"
      >
        <Col
          css={{
            height: "100%",
            width: '100%',
            "@xs": {
              width: "30%",
            },
          }}
        >
          <Container
            css={{ height: "100%" }}
            justify="center"
            alignItems="center"
            display="flex"
          >
            <Text
              h1
              css={{
                // textGradient: "45deg, $blue500 -20%, $pink500 50%",
                maxWidth: "500px",
                minWidth: "400px",
                lineHeight: 1,
                fontSize: 40,
                "@xs": {
                  fontSize: 90,
                },
              }}
            >
              Buy high quality pre-revenue{" "}
              <Text
                color="#2A21E5"
                h1
                css={{
                  lineHeight: 1,
                  fontSize: 40,
                  "@xs": {
                    fontSize: 90,
                  },
                }}
              >
                MVPs
              </Text>
            </Text>
          </Container>
        </Col>
        <Col css={{ minHeight: "100vh", width: "100%" }}>
          <Image
            height="100vh"
            width="100%"
            objectFit="cover"
            src="/illustration.png"
          />
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
      css={{ marginTop: "100px" }}
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
      <Container
        display="flex"
        style={{ marginTop: "50px", maxWidth: "800px" }}
      >
        <Text>
          About 90% of startups fail. What about projects that never kicked off,
          the project that a developer started sometime somewhere but never put
          on display? They all currently live on github graveyards. Does that
          mean they should stay on graveyards?
          <Text b> No.</Text>
        </Text>
        <Text css={{ marginTop: "30px" }}>
          Most startup founders are developers and what’s the most common
          misconception tech founders have?{" "}
          <Text i> If you build it they will come.</Text> 42% of startups fail
          due to misreading market demand and this mindset is a vital cause for
          this rate. But what if we could save these ideas through small pivots?
          Just look at the{" "}
          <Link
            underline="true"
            color="text"
            css={{ textDecoration: "underline", fontWeight: "400" }}
          >
            {" "}
            Slack story.
          </Link>
        </Text>
      </Container>
    </Container>
  );
}

function Vision() {
  return (
    <Container
      alignItems="center"
      justify="center"
      css={{ marginTop: "200px", paddingBottom: "100px" }}
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
      <Container display="flex" css={{ marginTop: "50px", maxWidth: "820px" }}>
        <Text>
          What does that leave us with?
          <Text b>
            {" "}
            The rest 90% of startups with the potential to bloom through simple
            pivots by smart people.
          </Text>
        </Text>
        <Text>
          <Text b>
            {" "}
            Our vision is to help tech founders not linger on MVPs that are in a
            state of coma.
          </Text>
        </Text>
        <Text>
          <Text b>
            Our vision is to help business founders find low cost opportunities,
            high quality MVPs with unicorn potential.
          </Text>
        </Text>
      </Container>
    </Container>
  );
}

export default Landing;
