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

interface FilterProps{
  [tit:string]:string
}

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
      <Filter tit="fail" />
      <Filter tit="cloud" />
      <Filter tit="industry" />

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
          );
        }
      })}
    </>
  );
}

export default Mvp;
