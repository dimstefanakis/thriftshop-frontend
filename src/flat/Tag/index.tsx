import { Button } from "@nextui-org/react";
import { TagProps } from "./interface";

function Tag({ tag, type }: TagProps) {
  return (
    <Button
      flat
      color={
        type === "fail"
          ? "error"
          : type === "cloud"
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
        marginBottom: 0,
        marginTop: "$sm",
      }}
      auto
    >
      {tag.name}
    </Button>
  );
}

export default Tag;
