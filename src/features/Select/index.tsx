import {
  Radio,
  Checkbox,
  Input,
  Text,
  Container,
  FormElement,
} from "@nextui-org/react";
import { SelectMultipleProps, SelectProps } from "./interface";

export function Select({
  label,
  selectedOption,
  onChange,
  options,
  defaultValue,
}: SelectProps) {
  return (
    <Container css={{ padding: 0 }}>
      <Text
        as="label"
        css={{
          width: "100%",
          display: "block",
          padding: "0 0 0 $2",
          marginBottom: "$3",
        }}
      >
        {label}
      </Text>
      <Radio.Group
        onChange={(e) => {
          onChange(options.find((o) => o.value === e));
        }}
        size="xs"
        value={selectedOption ? selectedOption?.value : defaultValue?.value}
      >
        {options.map((option, i) => {
          return (
            <Radio
              key={option.value}
              size="xs"
              value={option.value}
              css={{
                marginTop: "$7",
              }}
            >
              {option.label}
            </Radio>
          );
        })}
      </Radio.Group>
      {selectedOption?.label == "Other" && (
        <Input css={{ marginTop: "$md" }} placeholder="Please specify" />
      )}
    </Container>
  );
}

export function SelectMultiple({
  label,
  selectedOptions,
  onChange,
  options,
  defaultValues,
}: SelectMultipleProps) {
  function handleOtherChange(e: React.ChangeEvent<FormElement>) {
    onChange(
      selectedOptions.map((option) => {
        if (option.label == "Other") {
          return { label: "Other", value: e.target.value };
        } else {
          return option;
        }
      })
    );
  }

  return (
    <Container css={{ padding: 0 }}>
      <Text
        as="label"
        css={{
          width: "100%",
          display: "block",
          padding: "0 0 0 $2",
          marginBottom: "$3",
        }}
      >
        {label}
      </Text>
      <Checkbox.Group
        orientation="horizontal"
        css={{
          'div[role="presentation"]': {
            flexWrap: "wrap",
          },
        }}
        size="xs"
        value={selectedOptions?.map((o) => o.value)}
        onChange={(values) => {
          onChange(
            values.map((v) => {
              let label = options.find((o) => o.value === v)?.label;
              if (label) {
                return {
                  value: v,
                  label: label,
                };
              } else {
                return {
                  value: v,
                  label: v,
                };
              }
            })
          );
        }}
      >
        {options.map((option, i) => {
          return (
            <Checkbox
              key={option.value}
              size="xs"
              value={option.value}
              css={{
                marginTop: "$7",
              }}
            >
              {option.label}
            </Checkbox>
          );
        })}
      </Checkbox.Group>
      {selectedOptions?.find((option) => option.label == "Other") && (
        <Input
          width="100%"
          css={{ marginTop: "$md" }}
          onChange={handleOtherChange}
          value={
            selectedOptions?.find((option) => option.label == "Other")?.value
          }
          placeholder="Please specify, use commas for many items eg. value1, value2"
        />
      )}
    </Container>
  );
}
