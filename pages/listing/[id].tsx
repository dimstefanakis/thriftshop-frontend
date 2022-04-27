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
import Tag from "../../src/flat/Tag";
import { TagInterface } from "../../src/flat/Tag/interface";
import FEEDPOST from "../../post.json";

function Profile() {
  const router = useRouter();
  const { id } = router.query;
  let data = FEEDPOST.find((e) => {
    return e.id == parseInt(id as string);
  });
  console.log(data);

  return (
    <>
      <Container justify="center" display="flex">
        <Project
          id={data?.id}
          title={data?.title}
          image={data?.image}
          oneLiner={data?.one_liner}
          description={data?.description}
          validation={data?.validation}
          tags={data?.small_tags}
        />
      </Container>
    </>
  );
}

function Project({
  id,
  title,
  oneLiner,
  upTags,
  tags,
  image,
  description,
  validation,
  smallTags,
}: any) {
  return (
    <>
      <Container display="flex" justify="center">
        <Container
          key={id}
          css={{
            marginTop: "100px",
            maxW: "800px",
          }}
        >
          <Container css={{ marginTop: "30px" }}>
            <Container
              css={{
                fontWeight: "600",
                fontSize: 30,
                marginLeft: "0px",
                paddingLeft: "0px",
              }}
            >
              <Text h1>{title}</Text>
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
              <Text h3>{oneLiner}</Text>
            </Container>
            <Container display="flex" css={{ padding: 0 }}>
              {tags
                ?.filter(
                  (tag: TagInterface) =>
                    tag.type === "fail" ||
                    tag.type === "cloud" ||
                    tag.type === "industry"
                )
                .map((tag: TagInterface, i: number) => {
                  return <Tag tag={tag} key={i} />;
                })}
            </Container>
            <Image
              src={image}
              css={{ maxW: "100%", width: "100%", objectFit: "contain" }}
              alt=""
            />
            <Container display="flex" css={{ padding: 0 }}>
              {tags
                ?.filter(
                  (tag: TagInterface) =>
                    tag.type !== "fail" &&
                    tag.type !== "cloud" &&
                    tag.type !== "industry"
                )
                .map((tag: TagInterface, i: number) => {
                  return <Tag tag={tag} key={i} />;
                })}
            </Container>
            <Container
              css={{ width: "100%", marginLeft: "0px", paddingLeft: "0px" }}
            >
              <Text h2>Description</Text>
              <Container css={{ padding: "0px 0px" }}>
                <Text
                  css={{
                    lineHeight: "$sm",
                  }}
                >
                  {description}
                </Text>
              </Container>
            </Container>
            <Container
              css={{
                width: "100%",
                marginLeft: "0px",
                marginTop: "20px",
                paddingLeft: "0px",
              }}
            >
              <Text h2>Validation</Text>
              <Container css={{ paddingLeft: "0px" }}>
                <Text
                  css={{
                    lineHeight: "$sm",
                  }}
                >
                  {validation}
                </Text>
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
            <Row css={{ width: "100%" }} justify="center">
              <Button size="xl" css={{ marginRight: "20px" }}>
                Contact seller
              </Button>
              <Button size="xl">Get for 5000$</Button>
            </Row>
          </Container>
        </Container>
      </Container>
    </>
  );
}

export default Profile;
