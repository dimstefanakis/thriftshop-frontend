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
import { fail } from "assert";
import { useEffect, useState } from "react";
import NEWJSON from "../newfilter.json";
import FEEDPOST from "../post.json";
import { useRouter } from "next/router";

interface FilterProps {
  type: keyof typeof title;
}

function Mvp() {
  return (
    <>
      <Container
        display="flex"
        css={{  marginTop: "60px",width:"fit-content" }}
        justify="center"
      >
        <Text css={{ fontWeight: "800", fontSize: 70 }}>MVPs</Text>
      </Container>
      <Row >
        <Col css={{ margin: "0",width:"25%"}}>
          <Filter type="fail" />
          <Filter type="cloud" />
          <Filter type="industry" />
        </Col>
        <Col>
          <Feed />
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
    <>
      <Container css={{ marginTop: "40px", marginLeft: "30px" }}>
        <Text css={{ fontWeight: "500", fontSize: 25 }}>{title[type]}</Text>
      </Container>
      <Container >
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
    </>
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
              css={{ maxW: "300px", marginRight: "0px" }}
            >
              <Checkbox
                checked={filters.checked}
                size="sm"
                key={i}
                onChange={(e) =>
                  setFilter((filter) => ({
                    ...filter,
                    [i]: { ...filter[i], checked: e.target.checked },
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

function Feed() {
  const router = useRouter();

  const handleClick = (id: number) => {
    router.push(`/project/${id}`);
  };

  return (
    <>
      <Container css={{ marginBottom: "50px",marginLeft:"0px" }}>
        {FEEDPOST.map((thread, i) => {
          return (
            <FeedItem
              key={thread.id}
              title={thread.title}
              oneLiner={thread.one_liner}
              image={thread.image}
              upTags={
                <Container css={{ marginLeft: "0px", padding: "2px 10px" }}>
                  <Row
                    css={{
                      flexWrap: "wrap",
                      width: "900px",
                      marginTop: "10px",
                    }}
                  >
                    {thread.small_tags.map((uptag, i) => {
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
              smallTags={
                <Container css={{ marginLeft: "0px", padding: "2px 10px" }}>
                  <Row
                    css={{
                      flexWrap: "wrap",
                      width: "900px",
                      marginTop: "10px",
                    }}
                  >
                    {" "}
                    {thread.small_tags.map((tag, i) => {
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
                    })}{" "}
                  </Row>
                </Container>
              }
            />
          );
        })}
      </Container>
    </>
  );
}

function FeedItem({ title, oneLiner, upTags, smallTags, image, id }: any) {
  return (
    <>
      <Container
        display="flex"
        css={{ marginTop: "30px", maxW: "1000px", marginLeft: "0px" }}
        key={id}
      >
        <Container css={{ fontWeight: "600", fontSize: 30, width: "100%" }}>
          {" "}
          {title}
        </Container>
        <Container css={{ marginBottom: "10px" }}>
          <Container
            css={{
              fontWeight: "500",
              fontSize: 20,
              lineHeight: "30px",
              paddingLeft: "0px",
            }}
          >
            {oneLiner}
          </Container>{" "}
        </Container>
        <Container css={{ margin: "0px 0px", padding: "0px 0px" }}>
          {upTags}
        </Container>

        <Image src={image} css={{ width: "100%", margin: "0px 0px" }} alt="" />
        <Container css={{ margin: "0px 0px", padding: "0px 0px" }}>
          {smallTags}
        </Container>
        {/* <Button
                  css={{
                    marginLeft: "240px",
                    minWidth: "0px",
                    padding: "25px 30px",
                    borderRadius: "256px",
                    backgroundColor: "#2A21E5",
                    marginTop:"20px"
                  }}
                  onClick={()=>handleClick(thread.id)}
                >
                  <Text css={{fontWeight:"700",fontSize:"20px",letterSpacing:"$wide"}}>

                  Read more
                  </Text>
                </Button> */}
      </Container>
    </>
  );
}

export default Mvp;
