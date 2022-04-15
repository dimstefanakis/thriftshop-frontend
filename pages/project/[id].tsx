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

function Profile() {
  const router = useRouter();
  const { id } = router.query;
  let a = FEEDPOST.find((e) => {
    return e.id == id;
  });
  console.log(a);

  return (
    <Project
      id={a?.id}
      title={a?.title}
      image={a?.image}
      one_liner={a?.one_liner}
      up_tags={
        <Container css={{ marginLeft: "0px", padding: "2px 10px" }}>
          <Row
            css={{
              flexWrap: "wrap",
              width: "900px",
              marginTop: "10px",
            }}
          >
            {a?.small_tags.map((uptag, i) => {
              if (
                uptag.type === "fail" ||
                uptag.type === "cloud" ||
                uptag.type === "industry"
              ) {
                return (
                  <>
                    <Container
                      display="flex"
                      css={{
                        width: "fit-content",
                        padding: "0px 0px",
                        margin: "10px 5px",
                        marginLeft: "20px",
                      }}
                    >
                      <Button
                      disabled
                        flat
                        color={uptag.color}
                        css={{
                          width: "fit-content",
                          padding: "5px 20px",
                          borderRadius: "$pill",
                        }}
                        auto
                      >
                        {uptag.name}
                      </Button>
                    </Container>
                  </>
                );
              }
            })}
          </Row>
        </Container>
      }
      description={a?.description}
      validation={a?.validation}
      small_tags={
        <Container css={{ marginLeft: "0px", padding: "2px 10px" }}>
          <Row
            css={{
              flexWrap: "wrap",
              width: "900px",
              marginTop: "10px",
            }}
          >
            {a?.small_tags.map((tag, i) => {
              if (
                tag.type !== "fail" &&
                tag.type !== "cloud" &&
                tag.type !== "industry"
              ) {
                return (
                  <>
                    <Container
                    display="flex"
                      css={{
                        width: "fit-content",
                        padding: "0px 0px",
                        margin: "5px 5px",
                        marginLeft: "20px",
                        marginBottom:"20px"
                      }}
                    >
                      <Button
                      disabled
                        flat
                        color="success"
                        css={{
                          width: "fit-content",
                          padding: "5px 20px",
                          borderRadius: "35px",
                        }}
                        auto
                      >
                        {tag.name}
                      </Button>
                    </Container>
                  </>
                );
              }
            })}
          </Row>
        </Container>
      }
    />
  );
}

function Project({
  id,
  title,
  one_liner,
  up_tags,
  image,
  description,
  validation,
  small_tags,
}: any) {
  return (
    <>
      <Container
        key={id}
        justify="center"
        display="flex"
        css={{ marginTop: "30px", marginLeft: "250px" }}
      >
        <Container display="flex" css={{ marginTop: "30px" }}>
          <Container
            css={{ fontWeight: "600", fontSize: 30, marginLeft: "200px" }}
          >
            {" "}
            {title}
          </Container>
        </Container>
        <Container css={{ marginLeft: "195px", marginBottom: "10px" }}>
          <Container
            css={{
              fontWeight: "500",
              fontSize: 20,
              lineHeight: "30px",
              padding: "0px 30px",
            }}
          >
            {one_liner}
          </Container>{" "}
          {up_tags}
          <Image src={image} css={{ width: "58%" }} alt="" />
          {small_tags}
          <Container css={{ width: "58%", marginLeft: "0px" }}>
            <Text css={{ fontSize: "30px", fontWeight: 600 }}>Description</Text>
            <Container css={{ padding: "0px 0px" }}>
              <Text css={{ fontSize: "20px" }}>{description}</Text>
            </Container>
          </Container>
          <Container
            css={{ width: "58%", marginLeft: "0px", marginTop: "20px" }}
          >
            <Text css={{ fontSize: "30px", fontWeight: 600 }}>Validation</Text>
            <Container css={{ paddingLeft: "0px" }}>
              <Text css={{ fontSize: "20px" }}>{validation}</Text>
            </Container>
          </Container>
        </Container>
        <Container
          css={{
            marginRight: "800px",
            marginBottom: "50px",
            marginTop: "50px",
          }}
        >
          <Row justify="center">
            <Button
              css={{
                marginLeft: "240px",
                minWidth: "0px",
                padding: "25px 50px",
                borderRadius: "px",
                backgroundColor: "#2A21E5",
                marginTop: "20px",
              }}
            >
              {" "}
              <Text
                css={{
                  fontWeight: "700",
                  fontSize: "20px",
                  letterSpacing: "$wide",
                }}
              >
                Contact seller
              </Text>
            </Button>
            <Button
              css={{
                marginLeft: "240px",
                minWidth: "0px",
                padding: "25px 50px",
                borderRadius: "px",
                backgroundColor: "#2A21E5",
                marginTop: "20px",
              }}
            >
              <Text
                css={{
                  fontWeight: "700",
                  fontSize: "20px",
                  letterSpacing: "$wide",
                }}
              >
                Get for 5000$
              </Text>
            </Button>
          </Row>
        </Container>
      </Container>
    </>
  );
}

export default Profile;
