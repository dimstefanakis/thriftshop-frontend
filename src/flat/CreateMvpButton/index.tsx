import Link from "next/link";
import { useRouter } from "next/router";
import { Button } from "@nextui-org/react";

function CreateMvpButton() {
  const router = useRouter();

  function onClick() {
    router.push("/create_mvp");
  }

  return (
    <Link href="/create_mvp">
      <Button auto size="sm" css={{ mr: "$lg" }}>
        +
      </Button>
    </Link>
  );
}

export default CreateMvpButton;
