import { useState, useEffect, KeyboardEvent } from "react";
import { Container, Button, Input, FormElement } from "@nextui-org/react";
import { MultiTagInputProps } from "./interface";

function MultiTagInput({ placeholder, label }: MultiTagInputProps) {
  const [value, setValue] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);

  function addNewItem(tag: string) {
    if (tag) {
      setTags([...tags, tag]);
    }
  }

  function onKeyDown(e: KeyboardEvent<HTMLElement>) {
    if (e.key === "Enter") {
      addNewItem(value);
    }
  }

  function onAddClick() {
    addNewItem(value);
  }

  function onChange(e: React.ChangeEvent<FormElement>) {
    setValue(e.target.value);
  }

  useEffect(() => {
    setValue("");
  }, [tags]);

  return (
    <Container css={{ padding: 0 }}>
      <Container
        css={{ padding: 0 }}
        display="flex"
        direction="row"
        alignItems="flex-end"
      >
        <Input
          css={{ flex: 1, marginRight: "$sm" }}
          placeholder={placeholder}
          label={label}
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
        />
        <Button auto onClick={onAddClick}>
          +
        </Button>
      </Container>
      <Container
        css={{ padding: 0 }}
        display="flex"
        direction="row"
        wrap="wrap"
      >
        {tags.map((tag: any, i: number) => {
          return (
            <Button
              key={i}
              auto
              rounded
              flat
              size="xs"
              disabled
              css={{ mt: "$sm", mr: 3, cursor: "default" }}
            >
              {tag}
            </Button>
          );
        })}
      </Container>
    </Container>
  );
}

export default MultiTagInput;
