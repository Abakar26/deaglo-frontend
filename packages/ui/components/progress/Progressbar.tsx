import React from "react";
import styled from "styled-components";
import { Color, Typography } from "../../styles";

export interface ProgressbarProps {
  progress: number;
  label?: string;
}

export const Progressbar: React.FunctionComponent<ProgressbarProps> = ({ label, progress }) => {
  const clamp = (value: number): number => Math.min(Math.max(0, value), 1);

  return (
    <Container>
      <Bar>
        <Progress progress={clamp(progress)} />
      </Bar>
      <Row>
        {label}
        <Value>{(clamp(progress) * 100).toFixed(0)}%</Value>
      </Row>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Bar = styled.div`
  width: 100%;
  height: 8px;
  background-color: ${Color.BRAND_100};
  border-radius: 5px;
`;

const Progress = styled.div<{ progress: number }>`
  height: 8px;
  min-width: 8px;
  width: ${(props) => props.progress * 100}%;
  background-color: ${Color.BRAND_800};
  border-radius: 5px;
  transition: 0.5s ease width;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${Color.NEUTRAL_700};
  ${Typography.BODY_3};
`;

const Value = styled.div`
  color: ${Color.NEUTRAL_900};
  ${Typography.BODY_2};
`;
