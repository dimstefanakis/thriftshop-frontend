import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { Container, Text, Row, Card, Col } from "@nextui-org/react";
import { getUserData } from "../src/features/Authentication/slices/authenticationSlice";
import { RootState } from "../store";

function MvpSubmissionSuccess() {
  const router = useRouter();

  return (
    <Container
      justify="center"
      alignItems="center"
      display="flex"
      direction="column"
      css={{
        paddingTop: 100,
        paddingBottom: 50,
      }}
    >
      <Text h1>Your MVP submission has been received.</Text>
      <Text h4>Within the next 7 days we will review your MVP and get back to you!</Text>
      <Card css={{ maxW: 500, mt: "$xl" }}>
        <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
          <Col>
            <Text
              size={12}
              weight="bold"
              // transform="uppercase"
              color="#ffffffAA"
            >
              Thank you for submission!
            </Text>
            <Text h4 color="white">
              Get ready to be a part of the next generation of the startup world
            </Text>
          </Col>
        </Card.Header>
        <Card.Image
          src="/illustration.png"
          height={500}
          width="100%"
          css={{ backgroundColor: "#141442" }}
          alt="Card submission background"
        />
      </Card>
    </Container>
  );
}

export default MvpSubmissionSuccess;
