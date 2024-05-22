import { SuspenseBlock } from "ui/components";
import { CardGroup, Container, SectionContainer, SectionHeader } from "../shared";

export function DerivativeGuideSkeleton() {
  return (
    <Container>
      <SectionContainer>
        <SectionHeader>
          <SuspenseBlock height="24px" width="200px" />
          <SuspenseBlock height="20px" width="250px" />
        </SectionHeader>

        <CardGroup>
          <SuspenseBlock height="600px" />
          <SuspenseBlock height="600px" />
          <SuspenseBlock height="600px" />
        </CardGroup>
      </SectionContainer>

      <SectionContainer>
        <SectionHeader>
          <SuspenseBlock height="24px" width="320px" />
          <SuspenseBlock height="20px" width="460px" />
        </SectionHeader>

        <CardGroup>
          <SuspenseBlock height="765px" />
          <SuspenseBlock height="765px" />
        </CardGroup>
      </SectionContainer>
    </Container>
  );
}
