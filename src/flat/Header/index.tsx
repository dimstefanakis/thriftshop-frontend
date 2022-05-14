import { useRouter } from "next/router";
import { Container, Image, Avatar, Text, Button } from "@nextui-org/react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import AreYouABuyer from "../AreYouABuyer";

function Header() {
  const { user, accessToken } = useSelector(
    (state: RootState) => state.authentication
  );
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
            {accessToken && user && (
              <div style={{ display: "flex", alignItems: "center" }}>
                <AreYouABuyer />
                <Text
                  css={{
                    fontSize: "$3",
                    fontWeight: "bold",
                    marginRight: "$5",
                  }}
                >
                  {user.name}
                </Text>
                <Avatar src={user.avatar || user.twitter_avatar} />
              </div>
            )}
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
