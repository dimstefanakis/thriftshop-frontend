import { Container, Text } from "@nextui-org/react";

interface PointBoxProps {
  children: React.ReactNode | string;
}

function PointBox({ children }: PointBoxProps) {
  return (
    <Container css={{ backgroundColor: "$primary", color: "$white", borderRadius: '$md', py: '$xl', maxW: 260, mt: '$sm' }}>
      {children}
    </Container>
  );
}

export default PointBox;
