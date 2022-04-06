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
        {<JSONMAP />?}  
      </Container>
    </>
  );
}

function JSONMAP() {
  const [filter, setFilter] = useState(NEWJSON);
  console.log(filter);

  return (
    <>
      {filter.map((filters, i) => {
        return (
          <Checkbox
            checked={filters.checked}
            size="sm"
            key={i}
            type={filters.type}
          >
            {filters.name}
          </Checkbox>
        );
      })}
    </>
  );
}

export default Mvp;
