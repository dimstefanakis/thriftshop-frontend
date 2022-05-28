import { useRouter } from "next/router";
import { Button } from "@nextui-org/react";

function CreateMvpButton() {
  const router = useRouter();

  function onClick() {
    router.push("/create_mvp");
  }

  return <Button auto onClick={onClick} css={{mr: '$lg'}}>Submit MVP</Button>;
}

export default CreateMvpButton;
