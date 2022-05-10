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
import { useDispatch, useSelector } from "react-redux";
import Tag from "../../src/flat/Tag";
import useGetListing from "../../src/features/Listing/queries/useGetListing";
import { TagInterface } from "../../src/flat/Tag/interface";
import useGetTechStacks from "../../src/features/Filters/queries/useGetTechStacks";
import useGetCloudTypes from "../../src/features/Filters/queries/useGetCloudTypes";
import useGetIndustries from "../../src/features/Filters/queries/useGetIndustries";
import useGetFailureReasons from "../../src/features/Filters/queries/useGetFailureReasons";
import useGetHostings from "../../src/features/Filters/queries/useGetHostings";
import useGetPlatforms from "../../src/features/Filters/queries/useGetPlatforms";
import useGetServices from "../../src/features/Filters/queries/useGetServices";
import {
  setFilters,
  setCheckedFilters,
} from "../../src/features/Filters/filterSlice";
import useGetFilters from "../../src/hooks/useGetFilters";
import { RootState } from "../../store";
import NEWJSON from "../../newfilter.json";
import FEEDPOST from "../../post.json";
import { useRouter } from "next/router";

interface FilterProps {
  type?: keyof typeof title;
  name: string;
  values: any[];
}

function ListingPage() {
  useGetFilters();
  const { filters } = useSelector((state: RootState) => state.filters);

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
        <Col css={{ marginLeft: "$xl", width: "25%" }}>
          <Filter name="Failure Reason" values={filters.failureReasons} />
          <Filter name="Cloud Type" values={filters.cloudTypes} />
          <Filter name="Industry" values={filters.industries} />
          <Filter name="Platform" values={filters.platforms} />
          <Filter name="Service" values={filters.services} />
          <Filter name="Hosting" values={filters.hostings} />
          <Filter name="Tech Stack" values={filters.techStacks} />
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

function Filter({ type, name, values }: FilterProps) {
  return (
    <Container css={{ padding: "0 20px" }}>
      <Container css={{ marginTop: "40px" }}>
        <Text css={{ marginLeft: 0 }} h3>
          {name}
        </Text>
      </Container>
      <Container css={{ padding: 0 }}>
        <Container
          display="flex"
          css={{
            marginTop: "5px",
            marginLeft: "0px",
            flexDirection: "column",
            width: "fit-content",
          }}
        >
          <FilterValues values={values} />
        </Container>
      </Container>
    </Container>
  );
}

function FilterValues({ values }: { values: any[] }) {
  const dispatch = useDispatch();
  const { checkedFilters } = useSelector((state: RootState) => state.filters);

  function onChange(checked: boolean, filter: any) {
    if (checked) {
      dispatch(setCheckedFilters([...checkedFilters, filter]));
    } else {
      let newCheckedFilters = [...checkedFilters];
      let filterIndex = newCheckedFilters.findIndex(
        (f) => f.name === filter.name && f.id === filter.id
      );
      newCheckedFilters.splice(filterIndex, 1);
      dispatch(setCheckedFilters(newCheckedFilters));
    }
  }

  return (
    <>
      {values?.map((value, i) => {
        return (
          <Container
            key={value.id}
            display="flex"
            css={{
              maxW: "300px",
              marginRight: "0px",
              padding: 0,
              color: "$gray800",
            }}
          >
            <Checkbox
              checked={
                !!checkedFilters.find(
                  (filter) =>
                    filter.id === value.id && filter.name === value.name
                )
              }
              size="sm"
              css={{}}
              onChange={(checked) => onChange(checked, value)}
            >
              {value.name}
            </Checkbox>
          </Container>
        );
      })}
    </>
  );
}

function Listing() {
  const router = useRouter();
  const { status, data, error, refetch } = useGetListing();

  const handleClick = (id: number) => {
    router.push(`/listing/${id}`);
  };

  return (
    <>
      <Container css={{ marginBottom: "50px", marginLeft: "0px" }}>
        {data?.map((item: any, i: number) => {
          return (
            <ListingItem
              key={item.id}
              name={item.name}
              oneLiner={item.one_liner}
              image={item.preview_image}
              hosting={item.hosting}
              platforms={item.platforms}
              services={item.services}
              industries={item.industries}
              techStack={item.tech_stack}
              cloudTypes={item.cloud_types}
              failureReasons={item.failure_reasons}
              tags={item.small_tags}
              id={item.id}
              onClick={handleClick}
            />
          );
        })}
      </Container>
    </>
  );
}

function ListingItem({
  name,
  oneLiner,
  cloudTypes,
  failureReasons,
  hosting,
  platforms,
  services,
  industries,
  techStack,
  image,
  id,
  onClick,
}: any) {
  return (
    <>
      <Container display="flex" justify="center" css={{ maxW: "100%" }}>
        <Container display="flex" css={{ marginTop: "$xl", maxW: "800px" }}>
          <Container
            css={{
              fontWeight: "600",
              fontSize: 30,
              width: "100%",
              paddingLeft: "0px",
            }}
          >
            <Text
              h1
              css={{
                cursor: 'pointer',
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
              onClick={() => onClick(id)}
            >
              {name}
            </Text>
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
            {[...failureReasons].map((tag: TagInterface, i: number) => {
              return <Tag tag={tag} type="fail" key={i} />;
            })}
            {[...cloudTypes].map((tag: TagInterface, i: number) => {
              return <Tag tag={tag} type="fail" key={i} />;
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
        </Container>
      </Container>
    </>
  );
}

export default ListingPage;
