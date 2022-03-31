import { Container, Col, Row, Text, Image, Link } from "@nextui-org/react";
import { ParagraphProps } from "./interface";
import useMediaQuery from "../../hooks/useMediaQuery";

function Landing() {
  const isMobile = useMediaQuery("(max-width: 480px)");
  const isTablet = useMediaQuery("(max-width: 960px)");

  return (
    <>
      <div style={{ position: "relative", minHeight: "100vh" }}>
        <Container
          fluid
          css={{
            padding: 0,
            height: !isTablet ? "100vh" : "auto",
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
              zIndex: 10,
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
                Buy early-revenue high quality{" "}
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
          <Col css={{ width: "60%" }} />
        </Container>
        <Image
          width="100vw"
          height="100vh"
          src={isMobile ? "/bg2.png" : isTablet ? "bg3.png" : "/bg.png"}
          objectFit="cover"
          containerCss={{ position: "absolute", top: 0, left: 0 }}
        />
      </div>

      <Story />
      <Vision />
    </>
  );
}

function Story() {
  return (
    <Container
      css={{
        marginTop: "100px",
        display: "flex",
        flexFlow: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div>
        <SectionTitle>The story</SectionTitle>
      </div>
      <div style={{ marginTop: "50px", maxWidth: "800px" }}>
        <ParagraphContainer>
          About 90% of startups fail. What about projects that never kicked off,
          the project that a developer started sometime somewhere but never put
          on display? They all currently live on github graveyards. Does that
          mean they should stay on graveyards?
          <Text b> No.</Text>
        </ParagraphContainer>
        <ParagraphContainer>
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
        </ParagraphContainer>
      </div>
    </Container>
  );
}

function Vision() {
  return (
    <Container
      alignItems="center"
      justify="center"
      css={{ marginTop: "200px", display: 'flex', paddingBottom: "100px" }}
    >
      <Container display="flex">
        <SectionTitle>The vision</SectionTitle>
      </Container>
      <Container css={{ marginTop: "50px", maxWidth: "800px", padding: 0 }}>
        <ParagraphContainer>
          What does that leave us with?{" "}
          <Text i>
            The rest 90% of startups with the potential to bloom through simple
            pivots by smart people.
          </Text>
        </ParagraphContainer>
        <ParagraphContainer>
          Our vision is to help tech founders not linger on MVPs that are in a
          state of coma.
        </ParagraphContainer>
        <ParagraphContainer>
          Our vision is to help business founders find low cost opportunities,
          high quality MVPs with unicorn potential.
        </ParagraphContainer>
      </Container>
    </Container>
  );
}

function ParagraphContainer({ children }: ParagraphProps) {
  return (
    <Text
      size="1.4em"
      css={{ letterSpacing: "$tighter", lineHeight: "$sm", marginTop: "20px" }}
    >
      {children}
    </Text>
  );
}

function SectionTitle({ children }: { children: string }) {
  return (
    <Text
      h1
      css={{
        fontSize: 40,
        "@xs": {
          fontSize: 60,
        },
        "@md": {
          fontSize: 70,
        },

        fontWeight: "bold",
      }}
    >
      {children}
    </Text>
  );
}

export default Landing;
