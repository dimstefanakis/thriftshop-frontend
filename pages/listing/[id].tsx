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
import useGetMvp from "../../src/features/Listing/queries/useGetMvp";
import { TagInterface } from "../../src/flat/Tag/interface";
import FEEDPOST from "../../post.json";

function MvpPage() {
  const router = useRouter();
  const { id } = router.query;
  const { status, data, error, refetch } = useGetMvp(id as string);
  console.log(data);

  return (
    <>
      <Container justify="center" display="flex">
        {data && (
          <Mvp
            id={data.id}
            name={data.name}
            description={data.description}
            validation={data.validation}
            oneLiner={data.one_liner}
            image={data.preview_image}
            hosting={data.hosting}
            platforms={data.platforms}
            services={data.services}
            industries={data.industries}
            techStack={data.tech_stack}
            cloudTypes={data.cloud_types}
            failureReasons={data.failure_reasons}
            credit={data.credit}
          />
        )}
      </Container>
    </>
  );
}

function Mvp({
  name,
  description,
  validation,
  oneLiner,
  cloudTypes,
  failureReasons,
  hosting,
  platforms,
  services,
  industries,
  techStack,
  image,
  credit,
  id,
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
              <Text h1>{name}</Text>
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
              {[...failureReasons].map((tag: TagInterface, i: number) => {
                return <Tag tag={tag} type="fail" key={i} />;
              })}
              {[...cloudTypes].map((tag: TagInterface, i: number) => {
                return <Tag tag={tag} type="fail" key={i} />;
              })}
            </Container>
            <Image
              src={image}
              css={{ maxW: "100%", width: "100%", objectFit: "contain" }}
              alt=""
            />
            <Container display="flex" css={{ padding: 0 }}>
              {[
                ...industries,
                ...platforms,
                ...services,
                ...techStack,
                ...hosting,
              ].map((tag: TagInterface, i: number) => {
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
              <Button size="xl">Get for ${credit}</Button>
            </Row>
          </Container>
        </Container>
      </Container>
    </>
  );
}

export default MvpPage;
