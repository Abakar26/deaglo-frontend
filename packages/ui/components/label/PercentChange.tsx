import React from "react";
import styled from "styled-components";
import { Icon } from "../../components";
import { Color, Typography } from "../../styles";

interface Props {
  change: number;
  direction?: "positive" | "negative";
}

export const PercentChange: React.FunctionComponent<Props> = ({
  change,
  direction = "positive",
}) => {
  return (
    <Container direction={direction}>
      {change.toFixed(2)}%
      <Icon
        name={direction == "negative" ? "tick-down" : "tick-up"}
        color={direction == "negative" ? Color.DANGER_400 : Color.SUCCESS_400}
        size={9}
        defaultSize={9}
      />
    </Container>
  );
};

const Container = styled.div<{ direction: "positive" | "negative" }>`
  display: flex;
  align-items: center;
  ${Typography.BODY_2};
  color: ${(props) => (props.direction == "negative" ? Color.DANGER_400 : Color.SUCCESS_400)};
  gap: 2px;
`;
