import { Container, Col, Row, Text, Image, Link } from "@nextui-org/react";
import { url } from "inspector";

function Landing() {
  return (
    <>
      <div style={{position: 'relative'}}>
        <Container
          fluid
          css={{
            padding: 0,
            height: "100vh",
            flexFlow: "column",
            "@sm": {
              flexWrap: "nowrap",
              flexFlow: "row",
            },
            "@md": {},
          }}
          alignItems="center"
          justify="center"
          display="flex"
        >
          <Col
            css={{
              height: "100%",
              width: "100%",
              "@md": {
                minWidth: 400,
                width: "40%",
              },
            }}
          >
            <Container
              css={{
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
              }}
            >
              <Text
                h1
                css={{
                  // textGradient: "45deg, $blue500 -20%, $pink500 50%",
                  maxWidth: "600px",
                  lineHeight: 1,
                  fontSize: 40,
                  "@xs": {
                    fontSize: 50,
                  },
                  "@md": {
                    fontSize: 70,
                  },
                }}
              >
                Buy pre-revenue high quality{" "}
                <Text
                  color="#2A21E5"
                  span
                  css={{
                    lineHeight: 1,
                    fontSize: 40,
                    "@xs": {
                      fontSize: 50,
                    },
                    "@md": {
                      fontSize: 70,
                    },
                  }}
                >
                  MVPs
                </Text>
              </Text>
            </Container>
          </Col>
          <Col css={{width: '60%'}}/>
        </Container>
        <Image
        width="100vw"
        height="100vh"
        src="/bg.png"
        containerCss={{position: "absolute", top: 0, left: 0}}
      />
      </div>

      <Story />
      <Vision />
    </>
  );
}

function Story() {
  return (
    <div
      style={{
        marginTop: "100px",
        display: "flex",
        flexFlow: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div>
        <Text
          css={{
            fontSize: "85px",
            fontWeight: "800",
          }}
        >
          The story
        </Text>
      </div>
      <div style={{ marginTop: "50px", maxWidth: "800px" }}>
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
      </div>
    </div>
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
