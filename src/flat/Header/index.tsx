import { useRouter } from "next/router";
import Link from "next/link";
import {
  Container,
  Image,
  Avatar,
  Text,
  Button,
  Popover,
} from "@nextui-org/react";
import { useSelector, useDispatch } from "react-redux";
import AreYouABuyer from "../AreYouABuyer";
import CreateMvpButton from "../CreateMvpButton";
import BookACall from "../BookACall";
import { logout } from "../../features/Authentication/slices/authenticationSlice";
import { RootState } from "../../../store";

function Header() {
  const dispatch = useDispatch();
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

  function onLogoutClick() {
    dispatch(logout());
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
            {accessToken && user ? (
              <div style={{ display: "flex", alignItems: "center" }}>
                <Link href="/find_me_an_mvp">
                  <Button size="sm" auto css={{ mr: "$xs" }}>
                    Find Me An MVP
                  </Button>
                </Link>
                <AreYouABuyer />
                <CreateMvpButton />
                <Text
                  css={{
                    fontSize: "$3",
                    fontWeight: "bold",
                    marginRight: "$xs",
                  }}
                >
                  {user.name}
                </Text>
                <Popover triggerType="menu">
                  <Popover.Trigger>
                    <Avatar
                      css={{ cursor: "pointer" }}
                      src={user.avatar || user.twitter_avatar}
                    />
                  </Popover.Trigger>
                  <Popover.Content>
                    <Button.Group vertical>
                      <Button color="error" onClick={onLogoutClick}>
                        Logout
                      </Button>
                    </Button.Group>
                  </Popover.Content>
                </Popover>
              </div>
            ) : (
              <div style={{display: 'flex'}}>
                <BookACall />
                <Button shadow auto onClick={onSignupClick}>
                  Sign up
                </Button>
              </div>
            )}
          </div>
        </Container>
      </Container>
    </div>
  );
}

export default Header;
