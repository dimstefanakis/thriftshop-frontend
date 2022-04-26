import { Radio, Checkbox, Input, Text, Container } from "@nextui-org/react";
import { SelectMultipleProps, SelectProps } from "./interface";

export function Select({
  label,
  selectedOption,
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
      <Radio.Group size="xs" value={defaultValue?.value}>
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
      {selectedOption?.value == "other" && (
        <Input placeholder="Please specify" />
      )}
    </Container>
  );
}

export function SelectMultiple({
  label,
  selectedOptions,
  options,
  defaultValues,
}: SelectMultipleProps) {
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
      <Checkbox.Group size="xs">
        {options.map((option, i) => {
          return (
            <Checkbox key={option.value} size="xs" value={option.value} css={{
              marginTop: '$7'
            }}>
              {option.label}
            </Checkbox>
          );
        })}
      </Checkbox.Group>
      {selectedOptions?.find((option) => option.value == "other") && (
        <Input placeholder="Please specify" />
      )}
    </Container>
  );
}
