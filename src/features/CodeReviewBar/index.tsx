import { useState } from "react";
import { useSelector } from "react-redux";
import { Popover, Button, Progress, Container, Text } from "@nextui-org/react";
import { RootState } from "../../../store";

interface CodeReviewBarProps {
  score: number;
}

function CodeReviewBar({ score }: CodeReviewBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useSelector((state: RootState) => state.authentication);

  function handleClick() {
    setIsOpen(!isOpen);
  }

  return (
    <Container
      css={{
        padding: 0,
        marginTop: "$5",
        display: "flex",
        flexFlow: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
      }}
    >
      {user?.subscription?.status == "active" && (
        <Popover
          placement="top-left"
          isOpen={isOpen}
          onClose={() => {
            setIsOpen(false);
          }}
        >
          <Popover.Trigger>
            <Button css={{ height: 0, opacity: 0 }}>Open code review</Button>
          </Popover.Trigger>
          <Popover.Content>
            <Container
              css={{
                display: "flex",
                py: "$lg",
                flexFlow: "column",
                alignItems: "flex-start",
              }}
            >
              <Text h3 css={{ ml: 0 }}>
                <Text
                  h3
                  color="$primary"
                  css={{
                    display: "inline",
                  }}
                >
                  {score}
                </Text>{" "}
                Code Score
              </Text>
              <Text b css={{ mt: "$md", ml: 0 }}>
                How do we calculate Code Score?
              </Text>
              <Text css={{ ml: 0 }}>
                We do a thourough code review by taking into account the
                following qualities
              </Text>
              <ul>
                <li>
                  <Text b>
                    Extensibility.{" "}
                    <Text css={{ display: "inline" }}>
                      Project uses up-to-date technologies and has clarity of
                      purpose
                    </Text>
                  </Text>
                </li>
                <li>
                  <Text b>
                    Scalability.{" "}
                    <Text css={{ display: "inline" }}>
                      Project uses a modern architecture and is well-tested
                    </Text>
                  </Text>
                </li>
                <li>
                  <Text b>
                    Readability.{" "}
                    <Text css={{ display: "inline" }}>
                      Project is easy to understand and is well documented
                    </Text>
                  </Text>
                </li>
              </ul>
            </Container>
          </Popover.Content>
        </Popover>
      )}
      <Text
        onClick={handleClick}
        h4
        css={{
          marginBottom: "$md",
          marginLeft: 0,
          cursor: "pointer",
          width: "max-content",
        }}
      >
        Code review
      </Text>

      {user?.subscription?.status == "active" ? (
        <Progress
          value={score}
          onClick={handleClick}
          css={{
            marginBottom: "$md",
            transition: "ease 0.2s",
            "&:hover": {
              transform: "scaleY(1.4)",
              cursor: "pointer",
            },
          }}
        />
      ) : (
        <Button flat css={{ pointerEvents: "none" }}>
          This feature is only availble to premium users
        </Button>
      )}
    </Container>
  );
}

export default CodeReviewBar;
