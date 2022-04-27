import { Button } from "@nextui-org/react";
import { TagProps } from "./interface";

function Tag({ tag }: TagProps) {
  return (
    <Button
      flat
      color={
        tag.type === "fail"
          ? "error"
          : tag.type === "cloud"
          ? "primary"
          : "primary"
      }
      rounded
      css={{
        pointerEvents: "none",
        width: "fit-content",
        padding: "0px 20px",
        cursor: "default",
        marginRight: "$sm",
        marginBottom: "$sm",
        marginTop: "$sm",
      }}
      auto
    >
      {tag.name}
    </Button>
  );
}

export default Tag;
