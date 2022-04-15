import { useRouter } from "next/router";
import { Container, Image, Button } from "@nextui-org/react";

function Header() {
  const router = useRouter();

  function onHomeClick() {
    router.push("/");
  }

  function onSignupClick() {
    router.push("/register");
  }

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Container
        display="flex"
        justify="center"
        alignItems="center"
        css={{
          padding: 0,
          width: "100%",
          height: 80,
          position: "absolute",
          zIndex: 100,
        }}
      >
        <Container
          display="flex"
          justify="center"
          alignItems="center"
          css={{
            top: 0,
            left: 0,
            paddingLeft: "$9",
            paddingRight: "$9",
            "@sm": {
              paddingLeft: "$20",
              paddingRight: "$20",
            },
          }}
        >
          <Image
            onClick={onHomeClick}
            src="/thlogo.png"
            css={{
              cursor: "pointer",
              height: 40,
              width: 40,
              "@sm": {
                height: 50,
                width: 50,
              },
            }}
          />
          <div style={{ flex: 1 }}></div>
          <div>
            {/* <Button shadow auto onClick={onSignupClick}>
              Sign up
            </Button> */}
          </div>
        </Container>
      </Container>
    </div>
  );
}

export default Header;
