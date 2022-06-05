import Head from "next/head";
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
  Loading,
} from "@nextui-org/react";
import { useState, useEffect } from "react";
import { Pagination } from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { motion, Transition } from "framer-motion";
import Tag from "../../src/flat/Tag";
import CodeReviewBar from "../../src/features/CodeReviewBar";
import useMediaQuery from "../../src/hooks/useMediaQuery";
import useGetListing from "../../src/features/Listing/queries/useGetListing";
import { TagInterface } from "../../src/flat/Tag/interface";
import {
  setFilters,
  setCheckedFilters,
} from "../../src/features/Filters/filterSlice";
import useGetFilters from "../../src/hooks/useGetFilters";
import { RootState } from "../../store";
import { useRouter } from "next/router";
import axios from "axios";

interface FilterProps {
  name: string;
  values: any[];
  value: string;
}

function ListingPage() {
  const { isDone } = useGetFilters();
  const { filters } = useSelector((state: RootState) => state.filters);

  const loadingAnimationVariants = {
    hidden: { opacity: 0, y: -10 },
    show: { opacity: 1, y: 0 },
  };
  const isSmall = useMediaQuery("(max-width: 800px)");

  return (
    <>
      <Head>
        <title>ThriftMVP - Buy early revenue high quality MVPs</title>
        <meta
          name="description"
          content="About 90% of startups fail. What about projects that never kicked off, the project that a developer started sometime somewhere but never put on display? They all currently live on github graveyards. Does that mean they should stay on graveyards? No."
        />
        <meta property="og:url" content="https://www.thriftmvp.com/" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="ThriftMVP - Buy early revenue high quality MVPs"
        />
        <meta
          property="og:description"
          content="About 90% of startups fail. What about projects that never kicked off, the project that a developer started sometime somewhere but never put on display? They all currently live on github graveyards. Does that mean they should stay on graveyards? No."
        />
        <meta
          property="og:image"
          content="https://www.thriftmvp.com/og_img.png"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="thriftmvp.com" />
        <meta property="twitter:url" content="https://www.thriftmvp.com/" />
        <meta
          name="twitter:title"
          content="ThriftMVP - Buy early revenue high quality MVPs"
        />
        <meta
          name="twitter:description"
          content="About 90% of startups fail. What about projects that never kicked off, the project that a developer started sometime somewhere but never put on display? They all currently live on github graveyards. Does that mean they should stay on graveyards? No."
        />
        <meta
          name="twitter:image"
          content="https://www.thriftmvp.com/og_img.png"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container
        display="flex"
        css={{ marginTop: "60px", width: "fit-content" }}
        justify="center"
      >
        <Text css={{ fontWeight: "800", fontSize: 70 }}>MVPs</Text>
      </Container>
      <Container
        css={{
          width: "100%",
          padding: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Row
          css={{
            display: "flex",
            maxW: 1200,
            justifyContent: "center",
          }}
        >
          {!isSmall && (
            <Col css={{ width: "300px" }}>
              <motion.div
                variants={loadingAnimationVariants}
                initial="hidden"
                animate={isDone ? "show" : "hidden"}
              >
                <Filter
                  name="Stop Reason"
                  value="failure_reasons"
                  values={filters.failureReasons}
                />
                <Filter
                  name="Service Type"
                  value="cloud_types"
                  values={filters.cloudTypes}
                />
                <Filter
                  name="Industry"
                  value="industries"
                  values={filters.industries}
                />
                <Filter
                  name="Platform"
                  value="platforms"
                  values={filters.platforms}
                />
                <Filter
                  name="Service"
                  value="services"
                  values={filters.services}
                />
                <Filter
                  name="Hosting"
                  value="hosting"
                  values={filters.hostings}
                />
                <Filter
                  name="Tech Stack"
                  value="teck_stack"
                  values={filters.techStacks}
                />
              </motion.div>
            </Col>
          )}

          <Col css={{ flex: 1 }}>
            <Listing />
          </Col>
        </Row>
      </Container>

      {/* <Cloud />
      <Industry /> */}
    </>
  );
}

function Filter({ name, values, value }: FilterProps) {
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
          <FilterValues values={values} value={value} />
        </Container>
      </Container>
    </Container>
  );
}

function FilterValues({ values, value }: { values: any[]; value: string }) {
  const dispatch = useDispatch();
  const { checkedFilters } = useSelector((state: RootState) => state.filters);

  function onChange(checked: boolean, filter: any) {
    if (checked) {
      let newFilter = { ...filter };
      newFilter.value = value;
      dispatch(
        setCheckedFilters([...checkedFilters, { ...filter, value: value }])
      );
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
  const { checkedFilters } = useSelector((state: RootState) => state.filters);
  const [pageIndex, setPageIndex] = useState(1);
  const [pageUrl, setPageUrl] = useState(
    `${process.env.NEXT_PUBLIC_API_URL}/v1/listing/`
  );
  const { status, data, error, refetch } = useGetListing(pageUrl);

  const loadingAnimationVariants = {
    hidden: { opacity: 0, y: -10 },
    show: { opacity: 1, y: 0 },
  };

  const handlePageChange = (index: number) => {
    setPageIndex(index);
  };

  function filterBuilder(value: string) {
    return checkedFilters
      .filter((e) => e.value === value && e.name)
      .map((e) => e.name)
      .join(",");
  }

  useEffect(() => {
    let filterValues = [
      "cloud_types",
      "failure_reasons",
      "platforms",
      "industries",
      "tech_stack",
      "services",
      "hosting",
    ];

    let searchParams = filterValues.map((value) => {
      let param = filterBuilder(value);
      return `&${value}=${param}`;
    });

    setPageUrl(
      `${
        process.env.NEXT_PUBLIC_API_URL
      }/v1/listing/?page=${pageIndex}${searchParams.join("")}`
    );
  }, [pageIndex, checkedFilters]);

  useEffect(() => {
    if (window) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [pageIndex]);

  const handleClick = (id: number) => {
    router.push(`/listing/${id}`);
  };

  return (
    <>
      <Container css={{ marginBottom: "50px", marginLeft: "0px" }}>
        {!data && status === "loading" && (
          <Container
            css={{
              padding: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: 400,
            }}
          >
            <Loading size="xl" />
          </Container>
        )}
        <motion.div
          variants={loadingAnimationVariants}
          initial="hidden"
          animate={status != "loading" ? "show" : "hidden"}
        >
          {data?.results.map((item: any, i: number) => {
            return (
              <ListingItem mvp={item} key={item.id} onClick={handleClick} />
            );
          })}
          <Container css={{ mt: "$xl" }}>
            <Pagination total={data?.total_pages} onChange={handlePageChange} />
          </Container>
        </motion.div>
      </Container>
    </>
  );
}

function ListingItem({ mvp, onClick }: any) {
  return (
    <>
      <Container display="flex" justify="center" css={{ maxW: "100%" }}>
        <Container display="flex" css={{ marginTop: "$xl", padding: 0 }}>
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
                cursor: "pointer",
                width: "max-content",
                ml: 0,
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
              onClick={() => onClick(mvp.id)}
            >
              {mvp.name}
            </Text>
          </Container>
          <Container css={{ paddingLeft: "0px" }}>
            <Container
              css={{
                fontWeight: "500",
                fontSize: 20,
                lineHeight: "30px",
                paddingLeft: "0px",
              }}
            >
              <Text h4>{mvp.one_liner}</Text>
            </Container>
          </Container>
          <CodeReviewBar score={mvp.code_score} />
          <Container
            display="flex"
            css={{ margin: "0px 0px", padding: "0px 0px" }}
          >
            {[...mvp.failure_reasons].map((tag: TagInterface, i: number) => {
              return <Tag tag={tag} type="fail" key={i} />;
            })}
            {[...mvp.cloud_types].map((tag: TagInterface, i: number) => {
              return <Tag tag={tag} type="cloud" key={i} />;
            })}
          </Container>
          <Container
            css={{
              margin: "0px 0px",
              padding: "0px 0px",
              mt: "$sm",
              cursor: "pointer",
            }}
            onClick={() => onClick(mvp.id)}
          >
            <Image
              src={mvp.preview_image}
              css={{ width: "100%", maxW: "100%", objectFit: "contain" }}
              alt=""
            />
          </Container>
          <Container
            display="flex"
            css={{ margin: "0px 0px", padding: "0px 0px" }}
          >
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
        </Container>
      </Container>
    </>
  );
}

export default ListingPage;
