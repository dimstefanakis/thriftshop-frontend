import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import {
  Button,
  Text,
  Modal,
  Collapse,
  Container,
  Loading,
  Popover,
  Grid,
  Row,
} from "@nextui-org/react";
import useCreateSubscription from "../../features/Subscription/queries/useCreateSubscription";
import useCancelSubscription from "../../features/Subscription/queries/useCancelSubscription";
import useGetSubscriptionPlans from "../../features/Subscription/queries/useGetSubscriptionPlans";
import { getUserData } from "../../features/Authentication/slices/authenticationSlice";
import { RootState } from "../../../store";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

interface AreYouABuyerProps {
  buttonText?: string;
}
function AreYouABuyer({ buttonText }: AreYouABuyerProps) {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.authentication);
  const { status, data, error, refetch } = useGetSubscriptionPlans();
  const subscriptionMutation = useCreateSubscription();
  const cancelSubscriptionMutation = useCancelSubscription();
  const stripeRef = useRef<any>();
  const elementsRef = useRef<any>();
  const [visible, setVisible] = useState(false);
  const [isPaymentFormReady, setPaymentFormReady] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [areYouSureOpen, setAreYouSureOpen] = useState(false);

  const isAlreadySubscribed = user && user.subscription?.status == "active";
  const handler = () => {
    // subscriptionMutation.mutate({ membershipPlanId: 1 });
    setVisible(true);
  };

  const closeHandler = () => {
    setVisible(false);
    setSelectedPlan(null);
    setPaymentFormReady(false);
  };

  function onPaymentFormReady() {
    setPaymentFormReady(true);
  }

  function getPlanWording() {
    if (selectedPlan.interval == "one_month") {
      return `Get Premium for $${selectedPlan.credit} / month`;
    } else if (selectedPlan.interval == "six_months") {
      return `Get Premium for $${selectedPlan.credit} / 6 months`;
    } else if (selectedPlan.interval == "one_year") {
      return `Get Premium for $${selectedPlan.credit} / year`;
    }
  }

  async function handleCancelSubscription() {
    setAreYouSureOpen(false);
    cancelSubscriptionMutation.mutate();
  }

  async function handleSubmit() {
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
        return_url: `${window.location.origin}/checkout`,
      },
    });

    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
    setPaymentLoading(false);
  }

  useEffect(() => {
    if (selectedPlan) {
      subscriptionMutation.mutate({ membershipPlanId: selectedPlan.id });
    }
  }, [selectedPlan]);

  useEffect(() => {
    if (cancelSubscriptionMutation.status == "success") {
      dispatch(getUserData());
    }
  }, [cancelSubscriptionMutation.status]);

  return (
    <>
      <Button
        onClick={handler}
        auto
        size="sm"
        css={{
          marginRight: "$xs",
        }}
      >
        {isAlreadySubscribed
          ? "Your Subscription"
          : buttonText || "Buyer? Get Premium"}
      </Button>

      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
        width="500px"
        css={{
          minHeight: "100vh",
        }}
      >
        <Modal.Header>
          <Text id="modal-title" size={28}>
            Become a{" "}
            <Text b color="#2A21E5" size={28}>
              Premium
            </Text>{" "}
            Buyer
          </Text>
        </Modal.Header>
        {!subscriptionMutation.data?.clientSecret && (
          <Modal.Body
            css={{
              padding: 0,
              flex: 0,
            }}
          >
            {cancelSubscriptionMutation.status == "success" && (
              <CanceledSubscriptionMessage />
            )}
            <Benefits isAlreadySubscribed={isAlreadySubscribed} />
            <SubscriptionPlans
              selectedPlan={selectedPlan}
              setSelectedPlan={setSelectedPlan}
              plans={data}
            />
            {subscriptionMutation.status == "loading" && (
              <Container
                css={{
                  padding: 0,
                  minHeight: 100,
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex",
                }}
              >
                <Loading />
              </Container>
            )}
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
            {cancelSubscriptionMutation.status == "success" && (
              <CanceledSubscriptionMessage />
            )}
            <Benefits isAlreadySubscribed={isAlreadySubscribed} />
            <SubscriptionPlans
              selectedPlan={selectedPlan}
              setSelectedPlan={setSelectedPlan}
              plans={data}
            />
            {selectedPlan && (
              <CheckoutForm
                onClose={closeHandler}
                onReady={onPaymentFormReady}
                stripeRef={stripeRef}
                elementsRef={elementsRef}
              />
            )}
            {/* <Collapse
              title=""
              divider={false}
              showArrow={false}
              expanded={!!selectedPlan}
            >
              <CheckoutForm
                onClose={closeHandler}
                onReady={onPaymentFormReady}
                stripeRef={stripeRef}
                elementsRef={elementsRef}
              />
            </Collapse> */}
          </Elements>
        )}
        <Modal.Footer justify="center">
          {isAlreadySubscribed ? (
            <Popover isOpen={areYouSureOpen}>
              <Popover.Trigger>
                <Button
                  css={{ my: "$xl" }}
                  color="error"
                  onClick={() => setAreYouSureOpen(true)}
                >
                  {cancelSubscriptionMutation.status == "loading" ? (
                    <Loading />
                  ) : (
                    "Cancel Your Subscription"
                  )}
                </Button>
              </Popover.Trigger>
              <Popover.Content>
                <Grid.Container
                  css={{
                    borderRadius: "14px",
                    padding: "0.75rem",
                    maxWidth: "330px",
                  }}
                >
                  <Row justify="center" align="center">
                    <Text b>Confirm</Text>
                  </Row>
                  <Row>
                    <Text>
                      Are you sure you want to cancel your subscription?
                    </Text>
                  </Row>
                  <Grid.Container justify="space-between" alignContent="center">
                    <Grid>
                      <Button
                        size="sm"
                        light
                        onClick={() => setAreYouSureOpen(false)}
                      >
                        No, take me back
                      </Button>
                    </Grid>
                    <Grid>
                      <Button
                        size="sm"
                        shadow
                        color="error"
                        onClick={handleCancelSubscription}
                      >
                        Yes, I am sure
                      </Button>
                    </Grid>
                  </Grid.Container>
                </Grid.Container>
              </Popover.Content>
            </Popover>
          ) : (
            <Button
              auto
              css={{ my: "$xl" }}
              color="primary"
              onClick={handleSubmit}
              disabled={!isPaymentFormReady || !selectedPlan}
            >
              {paymentLoading ? (
                <Loading color="white" size="sm" />
              ) : selectedPlan ? (
                getPlanWording()
              ) : (
                "Start Your Premium Subscription"
              )}
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}

function Benefits({ isAlreadySubscribed }: { isAlreadySubscribed: boolean }) {
  return (
    <Container
      css={{ padding: 0, my: "$md", textAlign: "left", display: "flex" }}
    >
      <Text b css={{ margin: 0, mx: "$lg", fontSize: "$sm" }}>
        {isAlreadySubscribed ? "Your Benefits" : "Get Access To"}
      </Text>
      <Container css={{ px: "$sm" }}>
        <ul style={{ listStyleType: "disc" }}>
          <li style={{ marginBottom: 0 }}>
            <Text>
              <Text b i>
                Find me an MVP.
              </Text>{" "}
              Request an MVP and we will help you find one that isn&apos;t on
              our listing
            </Text>
          </li>
          <li style={{ marginBottom: 0 }}>
            <Text>MVP code review</Text>
          </li>
          <li style={{ marginBottom: 0 }}>
            <Text>Hot MVPs / Feature previews</Text>
          </li>
          <li style={{ marginBottom: 0 }}>
            <Text>Premium discord and slack channels</Text>
          </li>
        </ul>
      </Container>
    </Container>
  );
}

function CanceledSubscriptionMessage() {
  return (
    <Container>
      <Container
        css={{
          my: "$md",
          py: "$xs",
          px: "$md",
          borderRadius: "$md",
          backgroundColor: "$error",
        }}
      >
        <Text>You have successfully cancelled your subscription</Text>
      </Container>
    </Container>
  );
}

function SubscriptionPlans({
  selectedPlan,
  setSelectedPlan,
  plans,
}: {
  selectedPlan: any;
  setSelectedPlan: any;
  plans: any;
}) {
  const { user } = useSelector((state: RootState) => state.authentication);

  function onSelect(plan: any) {
    setSelectedPlan(plan);
  }

  return (
    <Container css={{ display: "flex", flexFlow: "column" }}>
      {user && user.subscription?.status == "active" ? (
        <SubscriptionPlan
          onSelect={() => {}}
          isSelected
          plan={plans.find(
            (plan: any) => plan.id == user.subscription.membership_plan
          )}
        />
      ) : (
        plans.map((plan: any) => {
          const isSelectedPlan = selectedPlan?.id == plan.id;
          return (
            <SubscriptionPlan
              key={plan.id}
              plan={plan}
              isSelected={isSelectedPlan}
              onSelect={onSelect}
            />
          );
        })
      )}
    </Container>
  );
}

function SubscriptionPlan({
  plan,
  isSelected,
  onSelect,
}: {
  plan: any;
  isSelected: boolean;
  onSelect: any;
}) {
  function getPlanDetails(plan: any) {
    if (plan.interval == "one_month") {
      return {
        planTitle: "Premium Monthly",
        planDescription: "Get premium access every month",
        planPer: "per month",
      };
    } else if (plan.interval == "six_months") {
      return {
        planTitle: "Premium Bi-Annually",
        planDescription: "Get premium access every six months",
        planPer: "per 6 months",
      };
    } else if (plan.interval == "one_year") {
      return {
        planTitle: "Premium Yearly",
        planDescription: "Get premium access every year",
        planPer: "per year",
      };
    }
  }
  let planDetails = getPlanDetails(plan);
  return (
    <Container
      key={plan.id}
      onClick={() => onSelect(plan)}
      css={{
        padding: 0,
        cursor: "pointer",
        my: "$md",
        display: "flex",
        flexFlow: "column",
        borderWidth: "$medium",
        borderRadius: "$md",
        borderColor: isSelected ? "$primary" : "$gray800",
        borderStyle: "solid",
        backgroundColor: isSelected ? "$primary" : "transparent",
      }}
    >
      <Container
        css={{
          py: "$md",
          px: "$lg",
          display: "flex",
          flexFlow: "row",
          minHeight: 100,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Container
          css={{
            padding: 0,
            display: "flex",
            flexFlow: "column",
            alignItems: "baseline",
          }}
        >
          <Text
            css={{
              fontWeight: "bold",
              fontSize: "$sm",
              lineHeight: "$md",
              margin: 0,
            }}
          >
            {planDetails?.planTitle}
          </Text>
          <Text
            css={{
              margin: 0,
              lineHeight: "$xs",
              color: isSelected ? "$gray200" : "$gray400",
            }}
          >
            {planDetails?.planDescription}
          </Text>
        </Container>
        <Container
          css={{
            padding: 0,
            width: 100,
            display: "flex",
            flexFlow: "column",
            textAlign: "end",
          }}
        >
          <Text
            css={{
              fontSize: "$md",
              fontWeight: "bold",
              margin: 0,
              lineHeight: "$xs",
            }}
          >
            ${plan.credit}
          </Text>
          <Text
            css={{
              margin: 0,
              lineHeight: "$xs",
              fontSize: "$xs",
              color: isSelected ? "$gray200" : "$gray400",
            }}
          >
            {planDetails?.planPer}
          </Text>
        </Container>
      </Container>
    </Container>
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
        css={{
          minHeight: 100,
          padding: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {!stripe || !elements || (loading && <Loading />)}
        <PaymentElement onReady={handleReady} />
      </Modal.Body>
    </>
  );
}
export default AreYouABuyer;
