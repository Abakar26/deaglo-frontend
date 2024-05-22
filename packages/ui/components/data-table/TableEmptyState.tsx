import styled from "styled-components";
import { Color, Typography } from "../../styles";

type TableEmptyStateProps = {
  title: string;
  subtitle: string;
};

export function TableEmptyState({ title, subtitle }: TableEmptyStateProps) {
  return (
    <Container>
      <Rows>
        <Row />
        <Row />
      </Rows>
      <Description>
        <Title>{title}</Title>
        <Subtitle>{subtitle}</Subtitle>
      </Description>
      <Rows>
        <Row />
        <Row />
      </Rows>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Rows = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Row = styled.div`
  height: 48px;
  background-color: ${Color.NEUTRAL_100};
`;

const Description = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Title = styled.b`
  ${Typography.SUBHEAD_3}
  text-align: center;
`;

const Subtitle = styled.span`
  ${Typography.BODY_2}
  color: ${Color.NEUTRAL_700};
  text-align: center;
`;
