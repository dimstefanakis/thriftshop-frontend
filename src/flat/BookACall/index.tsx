import { Button } from "@nextui-org/react";

function BookACall() {
  function onClick() {
    window.open("https://calendly.com/dimitrisstefanakis1/30min", "_blank");
  }

  return (
    <Button color="gradient" auto css={{ mr: "$xs" }} onClick={onClick}>
      Book a Call
    </Button>
  );
}

export default BookACall;
