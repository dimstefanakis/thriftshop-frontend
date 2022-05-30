import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import {
  Container,
  Grid,
  Text,
  Input,
  Textarea,
  Row,
  Spacer,
  Button,
  Loading,
  FormElement,
} from "@nextui-org/react";
import { useForm } from "react-hook-form";
import useGetFilters from "../src/hooks/useGetFilters";
import useCreateMvpSubmission from "../src/features/CreateMvp/queries/useCreateMvpSubmission";
import MultiTagInput from "../src/features/MultiTagInput";
import { Select, SelectMultiple } from "../src/features/Select";
import { Option } from "../src/features/Select/interface";
import { RootState } from "../store";

function CreateMvp() {
  useGetFilters();
  const router = useRouter();
  const mvpMutation = useCreateMvpSubmission();
  const { filters } = useSelector((state: RootState) => state.filters);
  const { accessToken, user } = useSelector(
    (state: RootState) => state.authentication
  );
  const [selectedReasons, setSelectedReasons] = useState<Option[]>([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState<Option[]>([]);
  const [selectedServices, setSelectedServices] = useState<Option[]>([]);
  const [selectedHostings, setSelectedHostings] = useState<Option[]>([]);
  const [selectedCloudTypes, setSelectedCloudTypes] = useState<Option[]>([]);
  const [selectedIndustries, setSelectedIndustries] = useState<Option[]>([]);
  const [selectedTechStacks, setSelectedTechStacks] = useState<Option[]>([]);
  const previewImageRef = useRef<FormElement | null>(null);
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
      peakMrr: "",
      currentMrr: "",
      peakUsers: "",
      currentUsers: "",
      previewImage: null,
    },
  });

  const { ref, ...rest } = register("previewImage");

  // BIGGER THAN A BUCKET
  function isDisabled() {
    return (
      !selectedReasons.every((item) => item.value !== "") ||
      !selectedPlatforms.every((item) => item.value !== "") ||
      !selectedServices.every((item) => item.value !== "") ||
      !selectedHostings.every((item) => item.value !== "") ||
      !selectedCloudTypes.every((item) => item.value !== "") ||
      !selectedIndustries.every((item) => item.value !== "") ||
      !selectedTechStacks.every((item) => item.value !== "") ||
      !selectedReasons.length ||
      !selectedPlatforms.length ||
      !selectedServices.length ||
      !selectedHostings.length ||
      !selectedCloudTypes.length ||
      !selectedIndustries.length ||
      !selectedTechStacks.length ||
      !watch("name") ||
      !watch("oneLiner") ||
      !watch("description") ||
      !watch("validation") ||
      !watch("previewImage") ||
      !watch("peakUsers") ||
      !watch("currentUsers")
    );
  }

  let previewImage = watch("previewImage") as any;

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user]);

  useEffect(() => {
    if (mvpMutation.isSuccess) {
      router.push("/mvp_submission_success");
    }
  }, [mvpMutation.status]);

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
        }}
        onSubmit={handleSubmit((data) => {
          // do something with the form data
          // loginMutation.mutate(data);
          mvpMutation.mutate({
            name: data.name,
            oneLiner: data.oneLiner,
            description: data.description,
            validation: data.validation,
            previewImage: data.previewImage![0],
            peakUsers: data.peakUsers,
            currentUsers: data.currentUsers,
            peakMrr: data.peakMrr,
            currentMrr: data.currentMrr,
            platforms: selectedPlatforms.map((o) => o.value).join(","),
            services: selectedServices.map((o) => o.value).join(","),
            hostings: selectedHostings.map((o) => o.value).join(","),
            cloudType: selectedCloudTypes.map((o) => o.value).join(","),
            industries: selectedIndustries.map((o) => o.value).join(","),
            techStack: selectedTechStacks.map((o) => o.value).join(","),
            failureReasons: selectedReasons.map((o) => o.value).join(","),
          });
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
            required
            {...register("name")}
          />
        </Row>
        <Row justify="center" css={{ marginTop: "$sm" }}>
          <Textarea
            fullWidth
            maxRows={2}
            maxLength={100}
            label="Project one-liner"
            placeholder="This helps us market your MVP on potential buyers. Add something quick and impactful to catch their attention."
            helperText="Explain your project in less than 100 characters"
            required
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
            required
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
            required
            {...register("validation")}
          />
        </Row>
        <Row justify="center" css={{ marginTop: "$xl" }}>
          <Input
            fullWidth
            clearable
            type="number"
            label="What was your peak user count?"
            placeholder="e.g. 100"
            required
            {...register("peakUsers")}
          />
        </Row>
        <Row justify="center" css={{ marginTop: "$sm" }}>
          <Input
            fullWidth
            clearable
            type="number"
            label="What is your current user count?"
            placeholder="e.g. 100"
            required
            {...register("currentUsers")}
          />
        </Row>
        <Row justify="center" css={{ marginTop: "$xl", flexFlow: "column" }}>
          <Input
            fullWidth
            hidden
            type="file"
            label="Project validation"
            required
            css={{ height: 18 }}
            ref={(e) => {
              ref(e);
              previewImageRef.current = e;
            }}
            {...rest}
          />
          <Button
            css={{ mt: "$xs" }}
            onClick={() => {
              previewImageRef.current?.click();
            }}
          >
            {previewImage ? "Change" : "Add"} Preview Image
          </Button>
          {previewImage && (
            <Text css={{ mt: "$xs" }}>{previewImage![0].name}</Text>
          )}
        </Row>
        {/* <Row justify="center" css={{ marginTop: "$xl" }}>
          <MultiTagInput
            label="Tech Stack"
            placeholder="React, React Native, Django"
          />
        </Row> */}
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
                value:
                  selectedReasons?.find((option) => option.label == "Other")
                    ?.value || "",
                label: "Other",
              },
            ]}
          />
        </Row>
        <Row justify="center" css={{ marginTop: "$xl" }}>
          <SelectMultiple
            label="Service Type"
            selectedOptions={selectedCloudTypes}
            onChange={(values: any) => setSelectedCloudTypes(values)}
            options={[
              ...filters.cloudTypes?.map((reason: any) => ({
                value: reason.name,
                label: reason.name,
              })),
              {
                value:
                  selectedCloudTypes?.find((option) => option.label == "Other")
                    ?.value || "",
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
                value:
                  selectedIndustries?.find((option) => option.label == "Other")
                    ?.value || "",
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
                value:
                  selectedPlatforms?.find((option) => option.label == "Other")
                    ?.value || "",
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
                value:
                  selectedTechStacks?.find((option) => option.label == "Other")
                    ?.value || "",
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
                value:
                  selectedServices?.find((option) => option.label == "Other")
                    ?.value || "",
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
                value:
                  selectedHostings?.find((option) => option.label == "Other")
                    ?.value || "",
                label: "Other",
              },
            ]}
          />
        </Row>
        <Text h3 css={{ padding: 0, mt: "$xl", marginLeft: 0 }}>
          For early revenue MVPs (answers optional)
        </Text>
        <Row justify="center" css={{ marginTop: "$xl" }}>
          <Input
            fullWidth
            clearable
            type="number"
            label="What was your peak MRR"
            placeholder="Specify in USD($)"
            {...register("peakMrr")}
          />
        </Row>
        <Row justify="center" css={{ marginTop: "$sm" }}>
          <Input
            fullWidth
            clearable
            type="number"
            label="What is your current MRR"
            placeholder="Specify in USD($)"
            {...register("currentMrr")}
          />
        </Row>

        <Button
          disabled={isDisabled()}
          type="submit"
          auto
          css={{ marginTop: "$xl" }}
        >
          {mvpMutation.isLoading ? (
            <Loading color="white" size="sm" />
          ) : (
            "Submit MVP"
          )}
        </Button>
        <Spacer y={4} />
      </form>
    </Container>
  );
}

export default CreateMvp;
