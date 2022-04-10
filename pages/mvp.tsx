import {
  Container,
  Col,
  Row,
  Text,
  Image,
  Link,
  Checkbox,
} from "@nextui-org/react";
import { fail } from "assert";
import { useEffect, useState } from "react";
import NEWJSON from "../newfilter.json";

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
      <Filter />
      <Cloud />
      <Industry />
    </>
  );
}

function Filter() {

  return (
    <>
      <Container css={{ marginTop: "40px", marginLeft: "30px" }}>
        <Text css={{ fontWeight: "500", fontSize: 25 }}>Failure Reasons</Text>
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
        <JSONMAP type="fail"/>
      </Container>
    </>
  );
}

function Cloud() {

  return (
    <>
      <Container css={{ marginTop: "40px", marginLeft: "30px" }}>
        <Text css={{ fontWeight: "500", fontSize: 25 }}>Cloud Type</Text>
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
        <JSONMAP type="cloud" />
      </Container>
    </>
  );
}

function Industry() {
  return (
    <>
      <Container css={{ marginTop: "40px", marginLeft: "30px" }}>
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
        <JSONMAP type="industry" />
      </Container>
    </>
  );
}

function JSONMAP({type}:any) {
  const [filter, setFilter] = useState(NEWJSON);
  console.log(filter);
  return (
    <>
      {filter.map((filters, i) => {
        if (type==filters.type){

          return (
            <Checkbox checked={filters.checked} size="sm" key={i}>
            {filters.name}
          </Checkbox>
        );
      }
      })}
    </>
  );
}

export default Mvp;
