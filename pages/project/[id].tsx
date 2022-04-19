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
  let data = FEEDPOST.find((e) => {
    return e.id == parseInt(id as string) ;
  });
  console.log(data);

  return (
    <>
      <Row>
        <Container display="flex" css={{ width: "40%" }}>
          
        </Container>
        <Project
          id={data?.id}
          title={data?.title}
          image={data?.image}
          oneLiner={data?.one_liner}
          upTags={
            <Container css={{ marginLeft: "0px", padding: "2px 0px" }}>
              <Row
                css={{
                  flexWrap: "wrap",
                  width: "900px",
                  marginTop: "10px",
                }}
              >
                {data?.small_tags.map((uptag, i) => {
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
                            marginLeft: "0px",
                          }}
                        >
                          <Button
                            disabled
                            flat
                            color={uptag.color as any}
                            css={{
                              width: "fit-content",
                              padding: "5px 20px",
                              borderRadius: "$pill",
                              cursor: "default",
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
          description={data?.description}
          validation={data?.validation}
          smallTags={
            <Container css={{ marginLeft: "0px", padding: "2px 0px" }}>
              <Row
                css={{
                  flexWrap: "wrap",
                  width: "900px",
                  marginTop: "10px",
                }}
              >
                {data?.small_tags.map((tag, i) => {
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
                            margin: "0px 5px",
                            marginLeft: "0px",
                            marginBottom: "20px",
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
                              cursor: "default",
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
      </Row>
    </>
  );
}

function Project({
  id,
  title,
  oneLiner,
  upTags,
  image,
  description,
  validation,
  smallTags,
}: any) {
  return (
    <>
      <Container
        key={id}
        display="flex"
        css={{ marginTop: "30px", marginLeft: "0px", width: "100%" }}
      >
        <Container display="flex" css={{ marginTop: "30px" }}>
          <Container
            css={{
              fontWeight: "600",
              fontSize: 30,
              marginLeft: "0px",
              paddingLeft: "0px",
            }}
          >
            {" "}
            {title}
          </Container>
        </Container>
        <Container css={{ marginLeft: "0px", marginBottom: "10px" }}>
          <Container
            css={{
              fontWeight: "500",
              fontSize: 20,
              lineHeight: "30px",
              padding: "0px 0px",
            }}
          >
            {oneLiner}
          </Container>{" "}
          {upTags}
          <Image src={image} css={{ width: "60%" }} alt="" />
          {smallTags}
          <Container
            css={{ width: "58%", marginLeft: "0px", paddingLeft: "0px" }}
          >
            <Text css={{ fontSize: "30px", fontWeight: 600 }}>Description</Text>
            <Container css={{ padding: "0px 0px" }}>
              <Text css={{ fontSize: "20px" }}>{description}</Text>
            </Container>
          </Container>
          <Container
            css={{
              width: "58%",
              marginLeft: "0px",
              marginTop: "20px",
              paddingLeft: "0px",
            }}
          >
            <Text css={{ fontSize: "30px", fontWeight: 600 }}>Validation</Text>
            <Container css={{ paddingLeft: "0px" }}>
              <Text css={{ fontSize: "20px" }}>{validation}</Text>
            </Container>
          </Container>
        </Container>
        <Container
          css={{
            marginRight: "0px",
            marginBottom: "50px",
            marginTop: "50px",
          }}
        >
          <Row css={{ width: "50%" }} justify="center">
            <Button
              size="xl"
              
              css={{ marginRight: "15px" }}
            >
              {" "}
              Contact seller
            </Button>
            <Button size="xl">Get for 5000$</Button>
          </Row>
        </Container>
      </Container>
    </>
  );
}

export default Profile;
