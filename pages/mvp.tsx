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
import {useRouter} from "next/router"

interface FilterProps {
  [tit: string]: string;
}

function Mvp() {
  return (
    <>
      <Container
        display="flex"
        css={{ width: "100%", marginTop: "60px" }}
        justify="center"
      >
        <Text css={{ fontWeight: "800", fontSize: 70 }}>MVPs</Text>
      </Container>
      <Row>
        <Col css={{ margin: "0", width: "30%" }}>
          <Filter tit="fail" />
          <Filter tit="cloud" />
          <Filter tit="industry" />
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
function Filter({ tit }: FilterProps) {
  return (
    <>
      <Container css={{ marginTop: "40px", marginLeft: "30px" }}>
        <Text css={{ fontWeight: "500", fontSize: 25 }}>{title[tit]}</Text>
      </Container>
      <Container
        display="flex"
        css={{
          marginTop: "5px",
          marginLeft: "60px",
          flexDirection: "column",
          width: "fit-content",
        }}
      >
        <JSONMAP type={tit} />
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
 
  const handleClick=(id:number)=>{
    router.push(`/project/${id}`)
  }

  
  return (
    <>
      <Container css={{marginBottom:"50px"}}>
        {FEEDPOST.map((thread, i) => {
          return (
            <>
              <Container display="flex" css={{ marginTop: "30px" }}>
                <Container
                  css={{ fontWeight: "600", fontSize: 30, marginLeft: "220px" }}
                >
                  {" "}
                  {thread.title}
                </Container>
                <Container css={{ marginLeft: "195px", marginBottom: "10px" }}>
                  <Container
                    css={{
                      fontWeight: "500",
                      fontSize: 20,
                      lineHeight: "30px",
                    }}
                  >
                    {thread.one_liner}
                  </Container>{" "}
                </Container>
                <Container css={{ marginLeft: "210px" }}>
                  <Row
                    css={{
                      flexWrap: "wrap",
                      width: "900px",
                      marginTop: "10px",
                    }}
                  >
                    {thread.small_tags.map((bigtag, b) => {
                      if (
                        bigtag.type === "fail" ||
                        bigtag.type === "cloud" ||
                        bigtag.type === "industry"
                      ) {
                        return (
                          <>
                            <Container
                              display="flex"
                              css={{
                                marginTop: "20px",
                                width: "fit-content",
                                padding: "0px 10px",
                                margin: "10px 0px",
                              }}
                            >
                              <Container
                                display="flex"
                                css={{
                                  backgroundColor: bigtag.color,
                                  width: "fit-content",
                                  padding: "5px 10px",
                                  borderRadius: "35px",
                                }}
                              >
                                <Text
                                  css={{ fontSize: "16px", fontWeight: "700" }}
                                >
                                  {bigtag.name}
                                </Text>
                              </Container>
                            </Container>
                          </>
                        );
                      }
                    })}
                  </Row>
                </Container>

                <Image src={thread.image} css={{ width: "900px" }} alt="" />
                <Container css={{ marginLeft: "210px" }}>
                  <Row
                    css={{
                      flexWrap: "wrap",
                      width: "900px",
                      marginTop: "10px",
                    }}
                  >
                    {thread.small_tags.map((tag, a) => {
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
                                marginTop: "20px",
                                width: "fit-content",
                                padding: "0px 10px",
                                margin: "10px 0px",
                              }}
                            >
                              <Container
                                display="flex"
                                css={{
                                  backgroundColor: " #2A21E5",
                                  width: "fit-content",
                                  padding: "5px 10px",
                                  borderRadius: "35px",
                                }}
                              >
                                <Text
                                  css={{ fontSize: "16px", fontWeight: "700" }}
                                >
                                  {tag.name}
                                </Text>
                              </Container>
                            </Container>
                          </>
                        );
                      }
                    })}
                  </Row>
                </Container>
                <Button
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
                </Button>
              </Container>
            </>
          );
        })}
      </Container>
    </>
  );
}

export default Mvp;
