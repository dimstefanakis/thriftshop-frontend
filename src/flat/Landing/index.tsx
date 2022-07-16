import { useRouter } from "next/router";
import {
  Container,
  Col,
  Row,
  Button,
  Text,
  Image,
  Link,
} from "@nextui-org/react";
import Header from "../Header";
import SubscribeToNewsletter from "../../features/SubscribeToNewsletter";
import TraditionalEntrepreneurship from "./TraditionalEntrepreneurship";
import EntrepreneurshipThroughMVP from "./EntrepreneurshipThroughMVP";
import ComparisonTable from "../ComparisonTable";
import Footer from "../Footer";
import PointBox from "../PointBox";
import useMediaQuery from "../../hooks/useMediaQuery";
import { ParagraphProps } from "./interface";

function Landing() {
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width: 480px)");
  const isTablet = useMediaQuery("(max-width: 960px)");

  function onListingClick() {
    router.push("/listing");
  }

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
                display: "flex",
                flexFlow: "column",
                paddingTop: 120,
                paddingLeft: "$9",
                paddingRight: "$9",
                "@sm": {
                  paddingLeft: "$20",
                  paddingRight: "$20",
                  paddingTop: 200,
                },
              }}
            >
              <Text
                h1
                css={{
                  // textGradient: "45deg, $blue500 -20%, $pink500 50%",
                  maxWidth: "400px",
                  margin: 0,
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
              <Button
                auto
                onClick={onListingClick}
                css={{
                  mt: "$xl",
                  maxW: 200,
                }}
              >
                View Listing
              </Button>
              {/* {!isMobile && !isTablet && <SubscribeToNewsletter />} */}
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
      <TraditionalEntrepreneurship />
      <EntrepreneurshipThroughMVP />
      <Container
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <SectionTitle>How we compare</SectionTitle>
        <ComparisonTable />
      </Container>
      {/* {isMobile || isTablet ? (
        <Container
          css={{
            display: "flex",
            justifyContent: "center",
            mb: 100,
            width: "100%",
          }}
        >
          <SubscribeToNewsletter />
        </Container>
      ) : null} */}
      <Footer />
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
      <div style={{ marginTop: "30px", maxWidth: "800px" }}>
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
            href="https://bamf.com/slack-story-how-pivoting-led-to-a-27-billion-acquisition/"
            target="_blank"
            css={{ textDecoration: "underline", fontWeight: "400" }}
          >
            Slack story.
          </Link>
        </ParagraphContainer>
      </div>
    </Container>
  );
}

function Vision() {
  const isMobile = useMediaQuery("(max-width: 480px)");
  const isTablet = useMediaQuery("(max-width: 960px)");

  return (
    <Container
      alignItems="center"
      justify="center"
      css={{
        marginTop: isTablet ? "50px" : "100px",
        display: "flex",
        paddingBottom: "100px",
      }}
    >
      <Container display="flex">
        <SectionTitle>Our mission</SectionTitle>
      </Container>
      <Container css={{ marginTop: "30px", maxWidth: "800px", padding: 0 }}>
        <Container css={{ padding: 0, display: "flex", flexFlow: "row wrap" }}>
          <PointBox>
            <Text b css={{ fontSize: "$md" }}>
              Encourage entrepreneurship through adoption and reduce the amount
              of startup clutter out there.
            </Text>
          </PointBox>
          <PointBox>
            <Text b css={{ fontSize: "$md" }}>
              Reward founders despite their outcomes. people pursuing
              entrepreneurship should be able to make a living without having to
              necessarily &quot;succeed&quot;.
            </Text>
          </PointBox>
          <PointBox>
            <Text b css={{ fontSize: "$md" }}>
              Make the startup space an overall healthier place to jump into and
              reduce the risk just a <Text i>tad</Text> bit.{" "}
            </Text>
          </PointBox>
        </Container>
        {/* <ParagraphContainer>
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
        </ParagraphContainer> */}
        {/* <ParagraphContainer>
          <Text b>TLDR</Text> We want to help founders roll more dice.
        </ParagraphContainer> */}
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
