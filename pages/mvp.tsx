import {
  Container,
  Col,
  Row,
  Text,
  Image,
  Link,
  Checkbox,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import JSONFILTERS from "../src/filter.json";

function Mvp() {
  return (
    <>
      <Container
        display="flex"
        css={{ width: "100%", marginTop: "90px" }}
        justify="center"
      >
        <Text css={{ fontWeight: "800", fontSize: 70 }}>MVPs</Text>
      </Container>
      <Filt />
    </>
  );
}

function Filt() {
  const [filter, setFilter] = useState(JSONFILTERS);

  useEffect(() => {
    console.log(JSON.parse(JSON.stringify(filter)));
    
  }, [filter]);

  return (
    <>
      <Container css={{ marginTop: "40px", marginLeft: "30px" }}>
        <Text css={{ fontWeight: "500", fontSize: 25 }}>Failure reasons</Text>
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
        {JSONFILTERS.failures.map((failure, i) => {
          return (
            <Checkbox
              checked={false}
              size="sm"
              key={i}
              onChange={() => setFilter(!failure.checked)}
            >
              <Text css={{ fontSize: 20, color: "#9B9B9B" }}>
                {failure.name}
              </Text>
            </Checkbox>
          );
        })}
      </Container>
      <Container css={{ marginTop: "20px", marginLeft: "30px" }}>
        <Text css={{ fontWeight: "500", fontSize: 25 }}>Cloud type</Text>
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
        {JSONFILTERS.cloud_type.map((cloud, i) => {
          return (
            <Checkbox
              checked={false}
              size="sm"
              key={i}
              onChange={() => setFilter(!cloud.checked)}
            >
              <Text css={{ fontSize: 20, color: "#9B9B9B" }}>{cloud.name}</Text>
            </Checkbox>
          );
        })}
      </Container>
      <Container css={{ marginTop: "20px", marginLeft: "30px" }}>
        <Text css={{ fontWeight: "500", fontSize: 25 }}>Industry</Text>
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
        {JSONFILTERS.industry.map((industry, i) => {
          return (
            <Checkbox
              checked={false}
              size="sm"
              key={i}
              onChange={() => setFilter(!industry.checked)}
            >
              <Text css={{ fontSize: 20, color: "#9B9B9B" }}>
                {industry.name}
              </Text>
            </Checkbox>
          );
        })}
      </Container>
    </>
  );
}

export default Mvp;
