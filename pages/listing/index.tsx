import { useEffect, useState } from "react";
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
import Tag from "../../src/flat/Tag";
import { TagInterface } from "../../src/flat/Tag/interface";
import NEWJSON from "../../newfilter.json";
import FEEDPOST from "../../post.json";
import { useRouter } from "next/router";

interface FilterProps {
  type: keyof typeof title;
}

function ListingPage() {
  return (
    <>
      <Container
        display="flex"
        css={{ marginTop: "60px", width: "fit-content" }}
        justify="center"
      >
        <Text css={{ fontWeight: "800", fontSize: 70 }}>MVPs</Text>
      </Container>
      <Row>
        <Col css={{ marginLeft: '$xl', width: "25%" }}>
          <Filter type="fail" />
          <Filter type="cloud" />
          <Filter type="industry" />
        </Col>
        <Col>
          <Listing />
        </Col>
      </Row>

      {/* <Cloud />
      <Industry /> */}
    </>
  );
}
let title = {
  fail: "Failure reasons",
  cloud: "Cloud type",
  industry: "Industry",
};

function Filter({ type }: FilterProps) {
  return (
    <Container css={{padding: '0 20px'}}>
      <Container css={{ marginTop: "40px" }}>
        <Text css={{ marginLeft: 0 }} h3>{title[type]}</Text>
      </Container>
      <Container css={{padding: 0}}>
        <Container
          display="flex"
          css={{
            marginTop: "5px",
            marginLeft: "0px",
            flexDirection: "column",
            width: "fit-content",
          }}
        >
          <JSONMAP type={type} />
        </Container>
      </Container>
    </Container>
  );
}

function JSONMAP({ type }: any) {
  const [filter, setFilter] = useState(NEWJSON);
  useEffect(() => {
    console.log(filter);
  }, [filter]);
  return (
    <>
      {NEWJSON.map((filters, i) => {
        if (type == filters.type) {
          return (
            <Container
              display="flex"
              css={{
                maxW: "300px",
                marginRight: "0px",
                padding: 0,
                color: "$gray800",
              }}
            >
              <Checkbox
                checked={filters.checked}
                size="sm"
                key={i}
                css={{}}
                onChange={(checked) =>
                  setFilter((filter) => ({
                    ...filter,
                    [i]: { ...filter[i], checked: checked },
                  }))
                }
              >
                {filters.name}
              </Checkbox>
            </Container>
          );
        }
      })}
    </>
  );
}

function Listing() {
  const router = useRouter();

  const handleClick = (id: number) => {
    router.push(`/project/${id}`);
  };

  return (
    <>
      <Container css={{ marginBottom: "50px", marginLeft: "0px" }}>
        {FEEDPOST.map((thread, i) => {
          return (
            <ListingItem
              key={thread.id}
              title={thread.title}
              oneLiner={thread.one_liner}
              image={thread.image}
              tags={thread.small_tags}
            />
          );
        })}
      </Container>
    </>
  );
}

function ListingItem({ title, oneLiner, tags, image, id }: any) {
  return (
    <>
      <Container display="flex" justify="center" css={{ maxW: "100%" }}>
        <Container
          display="flex"
          css={{ marginTop: "$xl", maxW: "800px" }}
          key={id}
        >
          <Container
            css={{
              fontWeight: "600",
              fontSize: 30,
              width: "100%",
              paddingLeft: "0px",
            }}
          >
            <Text h1>{title}</Text>
          </Container>
          <Container css={{ marginBottom: "10px", paddingLeft: "0px" }}>
            <Container
              css={{
                fontWeight: "500",
                fontSize: 20,
                lineHeight: "30px",
                paddingLeft: "0px",
              }}
            >
              <Text h4>{oneLiner}</Text>
            </Container>
          </Container>
          <Container
            display="flex"
            css={{ margin: "0px 0px", padding: "0px 0px" }}
          >
            {tags
              .filter(
                (tag: TagInterface) =>
                  tag.type === "fail" ||
                  tag.type === "cloud" ||
                  tag.type === "industry"
              )
              .map((tag: TagInterface, i: number) => {
                return <Tag tag={tag} key={i} />;
              })}
          </Container>
          <Container css={{ margin: "0px 0px", padding: "0px 0px" }}>
            <Image
              src={image}
              css={{ width: "100%", maxW: "100%", objectFit: "contain" }}
              alt=""
            />
          </Container>
          <Container
            display="flex"
            css={{ margin: "0px 0px", padding: "0px 0px" }}
          >
            {tags
              .filter(
                (tag: TagInterface) =>
                  tag.type !== "fail" &&
                  tag.type !== "cloud" &&
                  tag.type !== "industry"
              )
              .map((tag: TagInterface, i: number) => {
                return <Tag tag={tag} key={i} />;
              })}
          </Container>
        </Container>
      </Container>
    </>
  );
}

export default ListingPage;
