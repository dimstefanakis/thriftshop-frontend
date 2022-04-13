import {
  Container,
  Col,
  Row,
  Text,
  Image,
  Link,
  Checkbox,
  Card,
  Button,
} from "@nextui-org/react";
import { useRouter } from "next/router";
import FEEDPOST from "../../post.json";


function Profile(){
  const router=useRouter()
  const {id}=router.query
  return(
    <Project title={FEEDPOST} />
  )
}

function Project({
  id,
  title,
  one_liner,
  image,
  description,
  validation,
  small_tags,
}: any) {
  return (
    <>
      <Container display="flex" css={{ marginTop: "30px" }}>
        <Container
          css={{ fontWeight: "600", fontSize: 30, marginLeft: "220px" }}
        >
          {" "}
          {title}hi
        </Container>
      </Container>
      <Container css={{ marginLeft: "195px", marginBottom: "10px" }}>
        <Container
          css={{
            fontWeight: "500",
            fontSize: 20,
            lineHeight: "30px",
          }}
        >
          {one_liner}hi
        </Container>{" "}
        <Container css={{ marginLeft: "210px" }}>
          <Row
            css={{
              flexWrap: "wrap",
              width: "900px",
              marginTop: "10px",
            }}
          >
            <Text css={{ fontSize: "16px", fontWeight: "700" }}>
              {small_tags}
            </Text>
          </Row>
        </Container>
        <Container>
          <Text css={{ fontSize: "30px", fontWeight: 600 }}>Description</Text>
          <Container>
            <Text>{description}</Text>
          </Container>
        </Container>
        <Container>
          <Text css={{ fontSize: "30px", fontWeight: 600 }}>Validation</Text>
          <Container>
            <Text>{validation}</Text>
          </Container>
        </Container>
      </Container>
    </>
  );
}

export default Profile;
