import { Container, Link } from "@nextui-org/react";
import {
  AiOutlineTwitter,
  AiFillMail,
  AiFillSlackCircle,
} from "react-icons/ai";
import { FaDiscord } from "react-icons/fa";

function Footer() {
  return (
    <Container
      css={{
        width: "100%",
        height: 200,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Link
        href="https://twitter.com/thriftmvp/"
        target="_blank"
        css={{ mx: "$sm" }}
      >
        <AiOutlineTwitter size={30} />
      </Link>
      <Link
        href="mailto:beta@thriftmvp.com"
        target="_blank"
        css={{ mx: "$sm" }}
      >
        <AiFillMail size={30} />
      </Link>
      <Link
        href="mailto:beta@thriftmvp.com"
        target="_blank"
        css={{ mx: "$sm" }}
      >
        <AiFillSlackCircle size={30} />
      </Link>
      <Link
        href="mailto:beta@thriftmvp.com"
        target="_blank"
        css={{ mx: "$sm" }}
      >
        <FaDiscord size={30} />
      </Link>
    </Container>
  );
}

export default Footer;
