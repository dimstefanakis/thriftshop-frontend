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

interface FilterProps {
  type?: keyof typeof title;
  name: string;
  values: any[];
}

function ListingPage() {
  const { isDone } = useGetFilters();
  const { filters } = useSelector((state: RootState) => state.filters);

  const loadingAnimationVariants = {
    hidden: { opacity: 0, y: -10 },
    show: { opacity: 1, y: 0 },
  };
  const isSmall = useMediaQuery("(max-width: 800px)");

  return isSmall ? (
    <Container
      display="flex"
      css={{ marginTop: "100px", width: "fit-content" }}
      justify="center"
    >
      <Text h3>This page is not yet optimized for small devices :(</Text>
      <Text h3 css={{ mt: "$sm" }}>
        We will be with you soon enough promise! Meanwhile please check on your
        desktop!
      </Text>
    </Container>
  ) : (
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
          <motion.div
            variants={loadingAnimationVariants}
            initial="hidden"
            animate={isDone ? "show" : "hidden"}
          >
            <Filter name="Failure Reason" values={filters.failureReasons} />
            <Filter name="Cloud Type" values={filters.cloudTypes} />
            <Filter name="Industry" values={filters.industries} />
            <Filter name="Platform" values={filters.platforms} />
            <Filter name="Service" values={filters.services} />
            <Filter name="Hosting" values={filters.hostings} />
            <Filter name="Tech Stack" values={filters.techStacks} />
          </motion.div>
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

  const loadingAnimationVariants = {
    hidden: { opacity: 0, y: -10 },
    show: { opacity: 1, y: 0 },
  };

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
              <ListingItem
                mvp={item}
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
        </motion.div>
      </Container>
    </>
  );
}

function ListingItem({ mvp, onClick }: any) {
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
          <Container css={{ marginBottom: "10px", paddingLeft: "0px" }}>
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
              return <Tag tag={tag} type="fail" key={i} />;
            })}
          </Container>
          <Container css={{ margin: "0px 0px", padding: "0px 0px" }}>
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
