import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { Container, Text, Row, Card, Col } from "@nextui-org/react";
import { getUserData } from "../src/features/Authentication/slices/authenticationSlice";
import { RootState } from "../store";


function Checkout() {
  const router = useRouter();
  const { payment_intent, payment_intent_client_secret, redirect_status } =
    router.query;

  let title = "";
  let description = "";

  if (redirect_status === "succeeded") {
    title = "Payment Successful";
  }
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
      {redirect_status === "succeeded" && (
        <>
          <Text h1>
            You are now a{" "}
            <Text color="#2A21E5" span>
              Premium
            </Text>{" "}
            Buyer!
          </Text>
          <Text h4>You will soon get an email with your premium content.</Text>
        </>
      )}
      {redirect_status === "processing" && (
        <>
          <Text h2>
            Payment processing. We&apos;ll update you when payment is received.
          </Text>
          <Text h4>You will soon become a Premium Buyer!</Text>
        </>
      )}
      {redirect_status === "requires_payment_method" && (
        <Text h2>Payment failed. Please try another payment method.</Text>
      )}
      <Card css={{ maxW: 500, mt: "$xl" }}>
        <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
          <Col>
            <Text
              size={12}
              weight="bold"
              // transform="uppercase"
              color="#ffffffAA"
            >
              {redirect_status === "requires_payment_method"
                ? "ThriftMVP Premium"
                : "Thank you for your order!"}
            </Text>
            <Text h4 color="white">
              Get ready to be part of the next generation of startup buyers.
            </Text>
          </Col>
        </Card.Header>
        <Card.Image
          src="/illustration.png"
          height={500}
          width="100%"
          css={{ backgroundColor: "#141442" }}
          alt="Card subscription background"
        />
      </Card>
    </Container>
  );
}

export default Checkout;
