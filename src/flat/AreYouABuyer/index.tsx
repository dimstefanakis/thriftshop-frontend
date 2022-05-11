import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Button, Text, Modal, Loading } from "@nextui-org/react";
import useCreateSubscription from "../../features/Subscription/queries/useCreateSubscription";
import { RootState } from "../../../store";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

function AreYouABuyer() {
  const { user } = useSelector((state: RootState) => state.authentication);
  const subscriptionMutation = useCreateSubscription();
  const stripeRef = useRef<any>();
  const elementsRef = useRef<any>();
  const [visible, setVisible] = useState(false);
  const [isPaymentFormReady, setPaymentFormReady] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);

  const handler = () => {
    subscriptionMutation.mutate({ membershipPlanId: 1 });
    setVisible(true);
  };

  const closeHandler = () => {
    setVisible(false);
    setPaymentFormReady(false);
  };

  function onPaymentFormReady() {
    setPaymentFormReady(true);
  }

  const handleSubmit = async () => {
    const stripe = stripeRef.current;
    const elements = elementsRef.current;
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
    setPaymentLoading(true);
    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: "http://localhost:3000/checkout",
      },
    });

    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      console.log(result.error.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
    setPaymentLoading(false);
  };

  return (
    <>
      <Button
        onClick={handler}
        auto
        css={{
          marginRight: "$xl",
        }}
      >
        {user && user.subscription?.status == "active"
          ? "Your Subscription"
          : "Buyer? Get Premium"}
      </Button>

      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Become a{" "}
            <Text b size={18}>
              Premium
            </Text>{" "}
            Buyer
          </Text>
        </Modal.Header>
        {!subscriptionMutation.data?.clientSecret && (
          <Modal.Body
            css={{
              minHeight: 100,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Loading />
          </Modal.Body>
        )}
        {subscriptionMutation.data?.clientSecret && (
          <Elements
            stripe={stripePromise}
            options={{
              clientSecret: subscriptionMutation.data?.clientSecret,
              appearance: {
                theme: "night",
              },
            }}
          >
            <CheckoutForm
              onClose={closeHandler}
              onReady={onPaymentFormReady}
              stripeRef={stripeRef}
              elementsRef={elementsRef}
            />
          </Elements>
        )}
        <Modal.Footer justify="center">
          <Button auto onClick={handleSubmit} disabled={!isPaymentFormReady}>
            {paymentLoading ? (
              <Loading color="white" size="sm" />
            ) : (
              "Start Your Premium Subscription"
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

function CheckoutForm({
  onClose,
  onReady,
  stripeRef,
  elementsRef,
}: {
  onReady: any;
  onClose: any;
  stripeRef: any;
  elementsRef: any;
}) {
  const [loading, setLoading] = useState(true);
  const stripe = useStripe();
  const elements = useElements();
  stripeRef.current = stripe;
  elementsRef.current = elements;

  function handleReady() {
    onReady();
    setLoading(false);
  }

  return (
    <>
      <Modal.Body
        css={{ minHeight: 100, justifyContent: "center", alignItems: "center" }}
      >
        {!stripe || !elements || (loading && <Loading />)}
        <PaymentElement onReady={handleReady} />
        {/* <PaymentElement /> */}
      </Modal.Body>
    </>
  );
}
export default AreYouABuyer;
