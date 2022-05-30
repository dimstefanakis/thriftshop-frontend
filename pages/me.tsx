import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { Avatar, Text, Container } from "@nextui-org/react";
import { RootState } from "../store";

function Me() {
  const router = useRouter();
  const { user, accessToken } = useSelector(
    (state: RootState) => state.authentication
  );

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      router.push("/");
    }
  }, []);

  return (
    user && (
      <Container
        css={{
          display: "flex",
          flexFlow: "column",
          alignItems: "center",
          marginTop: 130,
        }}
      >
        <Avatar
          src={user.avatar || user.twitter_avatar}
          css={{ height: 100, width: 100 }}
        />
        <Text
          h1
          css={{
            marginTop: "$md",
          }}
        >
          {user.name}
        </Text>
        <Text h3 css={{
          marginTop: '$sm'
        }}>
          {user.description}
        </Text>
      </Container>
    )
  );
}

export default Me;
