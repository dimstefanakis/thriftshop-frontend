import { Container, Image } from "@nextui-org/react";

function Header() {
  return (
    <Container
      display="flex"
      justify="center"
      alignItems="center"
      css={{
        padding: 0,
        width: "100%",
        height: 80,
        position: "absolute",
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
          src="/thlogo.png"
          css={{
            height: 40,
            width: 40,
            "@sm": {
              height: 50,
              width: 50,
            },
          }}
        />
        <div style={{ flex: 1 }}></div>
      </Container>
    </Container>
  );
}

export default Header;
