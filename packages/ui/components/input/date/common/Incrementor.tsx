import React from "react";
import styled from "styled-components";
import { IconButton } from "../../../../components";
import { Color, Typography } from "../../../../styles";

interface Props {
  value: string;
  incr: () => void;
  decr: () => void;
  incrDisabled?: boolean;
  decrDisabled?: boolean;
  wide?: boolean;
}

export const Incrementor: React.FunctionComponent<Props> = ({
  value,
  incr,
  decr,
  incrDisabled,
  decrDisabled,
  wide = false,
}) => {
  return (
    <Container wide={wide}>
      <IconButton
        name="chevron-left"
        onClick={decr}
        color={Color.NEUTRAL_900}
        disabled={decrDisabled}
        hoverable={false}
      />
      {value}
      <IconButton
        name="chevron-right"
        onClick={incr}
        color={Color.NEUTRAL_900}
        disabled={incrDisabled}
        hoverable={false}
      />
    </Container>
  );
};

const Container = styled.div<{ wide: boolean }>`
  ${(props) => props.wide && "width: 100%"};
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.wide ? "space-between" : "center")};
  ${Typography.SUBHEAD_3};
  color: ${Color.NEUTRAL_900};
  gap: 8px;
`;
