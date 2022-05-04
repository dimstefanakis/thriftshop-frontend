import { useState } from "react";
import { useSelector } from "react-redux";
import {
  Container,
  Grid,
  Text,
  Input,
  Textarea,
  Row,
  Spacer,
  Button,
} from "@nextui-org/react";
import { useForm } from "react-hook-form";
import useGetFilters from "../src/hooks/useGetFilters";
import MultiTagInput from "../src/features/MultiTagInput";
import { Select, SelectMultiple } from "../src/features/Select";
import { RootState } from "../store";

function CreateMvp() {
  useGetFilters();
  const { filters } = useSelector((state: RootState) => state.filters);
  const [selectedReasons, setSelectedReasons] = useState([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedHostings, setSelectedHostings] = useState([]);
  const [selectedCloudTypes, setSelectedCloudTypes] = useState([]);
  const [selectedIndustries, setSelectedIndustries] = useState([]);
  const [selectedTechStacks, setSelectedTechStacks] = useState([]);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      oneLiner: "",
      description: "",
      validation: "",
    },
  });

  console.log("filters", filters);
  return (
    <Container
      justify="center"
      alignItems="center"
      display="flex"
      direction="column"
      css={{
        paddingTop: 100,
      }}
    >
      <form
        style={{
          margin: "0 10px",
          maxWidth: 600,
          width: "100%",
          height: "100vh",
        }}
        onSubmit={handleSubmit((data) => {
          // do something with the form data
          // loginMutation.mutate(data);
          console.log(
            data,
            selectedReasons,
            selectedPlatforms,
            selectedServices,
            selectedHostings,
            selectedCloudTypes,
            selectedIndustries,
            selectedTechStacks
          );
        })}
      >
        <Text h2 css={{ textAlign: "center" }}>
          Create MVP
        </Text>
        <Row justify="center" css={{ marginTop: "$xl" }}>
          <Input
            fullWidth
            clearable
            label="Project Name"
            placeholder="My awesome mvp"
            {...register("name")}
          />
        </Row>
        <Row justify="center" css={{ marginTop: "$sm" }}>
          <Textarea
            fullWidth
            maxRows={2}
            maxLength={100}
            label="Project one-liner"
            placeholder="My awesome project which is awesome and probably built on typescript and uses ethereum"
            helperText="Explain your project in less than 100 characters"
            {...register("oneLiner")}
          />
        </Row>
        <Row justify="center" css={{ marginTop: "$xl" }}>
          <Textarea
            fullWidth
            maxLength={5000}
            minRows={12}
            maxRows={100}
            label="Project description"
            placeholder="Buyers want to see your story and why you built this project. This is the place to tell your story."
            helperText="Go all out and describe your project in detail"
            {...register("description")}
          />
        </Row>
        <Row justify="center" css={{ marginTop: "$xl" }}>
          <Textarea
            fullWidth
            maxLength={5000}
            minRows={6}
            maxRows={20}
            label="Project validation"
            placeholder="Describe how you validated your project. What was the process and what was the result?"
            helperText="Max 1000 characters"
            {...register("validation")}
          />
        </Row>
        <Row justify="center" css={{ marginTop: "$xl" }}>
          <MultiTagInput
            label="Tech Stack"
            placeholder="React, React Native, Django"
          />
        </Row>
        {/* <Row justify="center" css={{ marginTop: "$xl" }}>
          <Select
            label="Test"
            selectedOption={selected}
            onChange={handleChange}
            options={[
              {
                value: "other2",
                label: "Other2",
              },
              {
                value: "other",
                label: "Other",
              },
            ]}
          />
        </Row> */}
        <Row justify="center" css={{ marginTop: "$xl" }}>
          <SelectMultiple
            label="Failure reasons"
            selectedOptions={selectedReasons}
            onChange={(values: any) => setSelectedReasons(values)}
            options={[
              ...filters.failureReasons?.map((reason: any) => ({
                value: reason.name,
                label: reason.name,
              })),
              {
                value: "other",
                label: "Other",
              },
            ]}
          />
        </Row>
        <Row justify="center" css={{ marginTop: "$xl" }}>
          <SelectMultiple
            label="Cloud Type"
            selectedOptions={selectedCloudTypes}
            onChange={(values: any) => setSelectedCloudTypes(values)}
            options={[
              ...filters.cloudTypes?.map((reason: any) => ({
                value: reason.name,
                label: reason.name,
              })),
              {
                value: "other",
                label: "Other",
              },
            ]}
          />
        </Row>
        <Row justify="center" css={{ marginTop: "$xl" }}>
          <SelectMultiple
            label="Industry"
            selectedOptions={selectedIndustries}
            onChange={(values: any) => setSelectedIndustries(values)}
            options={[
              ...filters.industries?.map((reason: any) => ({
                value: reason.name,
                label: reason.name,
              })),
              {
                value: "other",
                label: "Other",
              },
            ]}
          />
        </Row>
        <Row justify="center" css={{ marginTop: "$xl" }}>
          <SelectMultiple
            label="Platforms"
            selectedOptions={selectedPlatforms}
            onChange={(values: any) => setSelectedPlatforms(values)}
            options={[
              ...filters.platforms?.map((reason: any) => ({
                value: reason.name,
                label: reason.name,
              })),
              {
                value: "other",
                label: "Other",
              },
            ]}
          />
        </Row>
        <Row justify="center" css={{ marginTop: "$xl" }}>
          <SelectMultiple
            label="Services"
            selectedOptions={selectedServices}
            onChange={(values: any) => setSelectedServices(values)}
            options={[
              ...filters.services?.map((reason: any) => ({
                value: reason.name,
                label: reason.name,
              })),
              {
                value: "other",
                label: "Other",
              },
            ]}
          />
        </Row>
        <Row justify="center" css={{ marginTop: "$xl" }}>
          <SelectMultiple
            label="Hosting"
            selectedOptions={selectedHostings}
            onChange={(values: any) => setSelectedHostings(values)}
            options={[
              ...filters.hostings?.map((reason: any) => ({
                value: reason.name,
                label: reason.name,
              })),
              {
                value: "other",
                label: "Other",
              },
            ]}
          />
        </Row>
        <Row justify="center" css={{ marginTop: "$xl" }}>
          <SelectMultiple
            label="Tech Stack"
            selectedOptions={selectedTechStacks}
            onChange={(values: any) => setSelectedTechStacks(values)}
            options={[
              ...filters.techStacks?.map((reason: any) => ({
                value: reason.name,
                label: reason.name,
              })),
              {
                value: "other",
                label: "Other",
              },
            ]}
          />
        </Row>
        <Button type="submit" auto css={{marginTop: '$xl'}}>Submit</Button>
        <Spacer y={4} />
      </form>
    </Container>
  );
}

export default CreateMvp;
