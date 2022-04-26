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
import MultiTagInput from "../src/features/MultiTagInput";
import { Select, SelectMultiple } from "../src/features/Select";

function CreateMvp() {
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
          maxWidth: 400,
          width: "100%",
          height: "100vh",
        }}
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
          />
        </Row>
        <Row justify="center" css={{ marginTop: "$xl" }}>
          <MultiTagInput label="Tech Stack" placeholder="test" />
        </Row>
        <Row justify="center" css={{ marginTop: "$xl" }}>
          <Select
            label="Test"
            options={[
              {
                value: "other",
                label: "Other",
              },
              {
                value: "other2",
                label: "Other2",
              },
            ]}
          />
        </Row>
        <Row justify="center" css={{ marginTop: "$xl" }}>
          <SelectMultiple
            label="Test"
            options={[
              {
                value: "other",
                label: "Other",
              },
              {
                value: "other2",
                label: "Other2",
              },
            ]}
          />
        </Row>
        <Spacer y={4} />
      </form>
    </Container>
  );
}

export default CreateMvp;
