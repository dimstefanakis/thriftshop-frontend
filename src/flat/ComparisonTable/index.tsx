import { Container, Table, Text } from "@nextui-org/react";

const companies = [
  "ThriftMVP",
  "MicroAcquire",
  "Tiny Acquisitions",
  "SideInvest",
  "SideProjectors",
];

const data = {
  thriftmvp: {
    name: "ThriftMVP",
    pricing:
      "Free for both buyers and sellers. Optional subscription for buyers starting at $30/m",
    listing: "Pre revenue tech startups",
    contactSellers: "Free",
    submitYourStartup: "Free",
    communities: "Discord / Slack + Premium channels",
    codeReviews: "Premium",
    findMeAnMvp: "Premium",
  },
  microacquire: {
    name: "MicroAcquire",
    pricing: "Premium subscription for buyers starting at $290/y",
    listing: "Flexible",
    contactSellers: "Premium",
    submitYourStartup: "Free",
    communities: "Premium Facebook",
    codeReviews: "No",
    findMeAnMvp: "Not a dedicated feature",
  },
  tinyacquisitions: {
    name: "Tiny Acquisitions",
    pricing: "Premium subscription for buyers starting at $149 bi-annually",
    listing: "Flexible",
    contactSellers: "Premium",
    submitYourStartup: "Free",
    communities: "Premium Community",
    codeReviews: "No",
    findMeAnMvp: "No",
  },
  sideinvest: {
    name: "SideInvest",
    pricing: "Premium subscription for buyers starting at $49/y",
    listing: "Flexible",
    contactSellers: "Premium",
    submitYourStartup: "Free",
    communities: "No",
    codeReviews: "No",
    findMeAnMvp: "No",
  },
  sideprojectors: {
    name: "SideProjectors",
    pricing: "Premium subscription for buyers starting at $3/m",
    listing: "Flexible",
    contactSellers: "Premium",
    submitYourStartup: "Free",
    communities: "In-house",
    codeReviews: "No",
    findMeAnMvp: "No",
  },
};

function ComparisonTable() {
  return (
    <Container css={{ marginTop: "30px" }}>
      <Table
        lined
        compact
        aria-label="Example static compact collection table"
        css={{
          height: "auto",
          minWidth: "100%",
        }}
      >
        <Table.Header>
          <Table.Column>{""}</Table.Column>
          {
            Object.keys(data).map((key) => (
              <Table.Column key={data[key as keyof typeof data].name}>
                {data[key as keyof typeof data].name}
              </Table.Column>
            )) as any
          }
        </Table.Header>
        <Table.Body>
          <Table.Row key="1" css={{ minHeight: 100 }}>
            <Table.Cell>
              <Text b size={20}>
                Pricing
              </Text>
            </Table.Cell>
            {
              Object.keys(data).map((key) => (
                <Table.Cell
                  css={{
                    maxW: 100,
                    paddingTop: "10px !important",
                    paddingBottom: "10px !important",
                    whiteSpace: "normal",
                  }}
                  key={data[key as keyof typeof data].pricing}
                >
                  {data[key as keyof typeof data].pricing}
                </Table.Cell>
              )) as any
            }
          </Table.Row>
          <Table.Row key="2">
            <Table.Cell>
              <Text b size={20}>
                Listing
              </Text>
            </Table.Cell>
            {
              Object.keys(data).map((key) => (
                <Table.Cell
                  css={{
                    maxW: 100,
                    paddingTop: "10px !important",
                    paddingBottom: "10px !important",
                    whiteSpace: "normal",
                  }}
                  key={data[key as keyof typeof data].listing}
                >
                  {data[key as keyof typeof data].listing}
                </Table.Cell>
              )) as any
            }
          </Table.Row>
          <Table.Row key="3">
            <Table.Cell>
              <Text b size={20}>
                Contact Sellers
              </Text>
            </Table.Cell>
            {
              Object.keys(data).map((key) => (
                <Table.Cell
                  css={{
                    maxW: 100,
                    paddingTop: "10px !important",
                    paddingBottom: "10px !important",
                    whiteSpace: "normal",
                  }}
                  key={data[key as keyof typeof data].contactSellers}
                >
                  {data[key as keyof typeof data].contactSellers}
                </Table.Cell>
              )) as any
            }
          </Table.Row>
          <Table.Row key="4">
            <Table.Cell>
              <Text b size={20}>
                Submit Your Startup
              </Text>
            </Table.Cell>
            {
              Object.keys(data).map((key) => (
                <Table.Cell
                  css={{
                    maxW: 100,
                    paddingTop: "10px !important",
                    paddingBottom: "10px !important",
                    whiteSpace: "normal",
                  }}
                  key={data[key as keyof typeof data].submitYourStartup}
                >
                  {data[key as keyof typeof data].submitYourStartup}
                </Table.Cell>
              )) as any
            }
          </Table.Row>
          <Table.Row key="5">
            <Table.Cell>
              <Text b size={20}>
                Communities
              </Text>
            </Table.Cell>
            {
              Object.keys(data).map((key) => (
                <Table.Cell
                  css={{
                    maxW: 100,
                    paddingTop: "10px !important",
                    paddingBottom: "10px !important",
                    whiteSpace: "normal",
                  }}
                  key={data[key as keyof typeof data].communities}
                >
                  {data[key as keyof typeof data].communities}
                </Table.Cell>
              )) as any
            }
          </Table.Row>
          <Table.Row key="6">
            <Table.Cell>
              <Text b size={20}>
                Code Reviews
              </Text>
            </Table.Cell>
            {
              Object.keys(data).map((key) => (
                <Table.Cell
                  css={{
                    maxW: 100,
                    paddingTop: "10px !important",
                    paddingBottom: "10px !important",
                    whiteSpace: "normal",
                  }}
                  key={data[key as keyof typeof data].codeReviews}
                >
                  {data[key as keyof typeof data].codeReviews}
                </Table.Cell>
              )) as any
            }
          </Table.Row>
          <Table.Row key="7">
            <Table.Cell>
              <Text b size={20}>
                Find Me an MVP
              </Text>
            </Table.Cell>
            {
              Object.keys(data).map((key) => (
                <Table.Cell
                  css={{
                    maxW: 100,
                    paddingTop: "10px !important",
                    paddingBottom: "10px !important",
                    whiteSpace: "normal",
                  }}
                  key={data[key as keyof typeof data].findMeAnMvp}
                >
                  {data[key as keyof typeof data].findMeAnMvp}
                </Table.Cell>
              )) as any
            }
          </Table.Row>
        </Table.Body>
      </Table>
    </Container>
  );
}

export default ComparisonTable;
