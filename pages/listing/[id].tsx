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
import CodeReviewBar from "../../src/features/CodeReviewBar";
import Tag from "../../src/flat/Tag";
import useGetMvp from "../../src/features/Listing/queries/useGetMvp";
import { TagInterface } from "../../src/flat/Tag/interface";

function MvpPage() {
  const router = useRouter();
  const { id } = router.query;
  const { status, data, error, refetch } = useGetMvp(id as string);

  return (
    <>
      <Container justify="center" display="flex">
        {data && <Mvp mvp={data} />}
      </Container>
    </>
  );
}

function Mvp({ mvp }: any) {
  function onContactClick() {
    if (window) {
      window.open(
        `mailto:${mvp.user_profile.email}?subject=ThriftMVP listing for ${mvp.name}&body=Hey ${mvp.user_profile.name}, I saw your listing on ThriftMVP for ${mvp.name} and I would like to know more!`,
        "_blank"
      );
    }
  }
  return (
    <>
      <Container display="flex" justify="center">
        <Container
          key={mvp.id}
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
              <Text h1>{mvp.name}</Text>
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
              <Text h3>{mvp.one_liner}</Text>
            </Container>
            <CodeReviewBar score={mvp.code_score} />
            <Container display="flex" css={{ padding: 0 }}>
              {[...mvp.failure_reasons].map((tag: TagInterface, i: number) => {
                return <Tag tag={tag} type="fail" key={i} />;
              })}
              {[...mvp.cloud_types].map((tag: TagInterface, i: number) => {
                return <Tag tag={tag} type="cloud" key={i} />;
              })}
            </Container>
            <Container css={{ padding: 0, mt: "$sm" }}>
              <Image
                src={mvp.preview_image}
                css={{ maxW: "100%", width: "100%", objectFit: "contain" }}
                alt=""
              />
            </Container>
            <Container display="flex" css={{ padding: 0 }}>
              {[
                ...mvp.industries,
                ...mvp.platforms,
                ...mvp.services,
                ...mvp.tech_stack,
                ...mvp.hosting,
              ].map((tag: TagInterface, i: number) => {
                return <Tag tag={tag} key={i} />;
              })}
            </Container>
            <Container
              css={{ width: "100%", marginTop: "$xl", paddingLeft: "0px" }}
            >
              <Text h2>Description</Text>
              <Container css={{ padding: "0px 0px" }}>
                <Text
                  css={{
                    lineHeight: "$sm",
                  }}
                >
                  {mvp.description}
                </Text>
              </Container>
            </Container>
            <Container
              css={{
                width: "100%",
                marginTop: "$xl",
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
                  {mvp.validation}
                </Text>
              </Container>
            </Container>
            {mvp.website_url && (
              <Container
                css={{
                  width: "100%",
                  marginTop: "$xl",
                  paddingLeft: "0px",
                }}
              >
                <Text h2>Website</Text>
                <Container css={{ paddingLeft: "0px" }}>
                  <Link
                    href={mvp.website_url}
                    target="_blank"
                    css={{ mx: "$sm", margin: 0 }}
                  >
                    {mvp.website_url}
                  </Link>
                </Container>
              </Container>
            )}
            <Container
              css={{
                width: "100%",
                marginTop: "$xl",
                paddingLeft: "0px",
              }}
            >
              <Text h2>
                Asking Price:{" "}
                <Text h2 color="primary" css={{ display: "inline" }}>
                  ${mvp.credit}
                </Text>
              </Text>
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
              <Link
                target="_blank"
                href={`mailto:${mvp.user_profile.email}?subject=ThriftMVP listing for ${mvp.name}&body=Hey ${mvp.user_profile.name}, I saw your listing on ThriftMVP for ${mvp.name} and I would like to know more!`}
              >
                <Button
                  // onClick={onContactClick}
                  size="xl"
                  css={{ marginRight: "20px" }}
                >
                  Contact seller
                </Button>
              </Link>
              {/* <Button size="xl">Get for ${credit}</Button> */}
            </Row>
          </Container>
        </Container>
      </Container>
    </>
  );
}

export default MvpPage;
