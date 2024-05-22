import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Icon, type IconName } from "..";
import { Color, Typography } from "../../styles";

interface Props {
  label?: string;
  icon?: IconName;
  onClick: () => void;
}

export const HelperButton: React.FunctionComponent<Props> = ({
  label = "Need help?",
  icon = "lightbulb",
  onClick,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [labelWidth, setLabelWidth] = useState<number>(0);
  useEffect(() => {
    setLabelWidth(ref.current?.offsetWidth ?? 0);
  }, [ref]);

  return (
    <Container labelWidth={labelWidth} onClick={onClick}>
      <Icon name={icon} color={Color.NEUTRAL_00} size={20} />
      <Label ref={ref}>{label}</Label>
    </Container>
  );
};

const Container = styled.button<{ labelWidth: number }>`
  display: flex;
  align-items: center;
  gap: 12px;
  justify-content: start;
  overflow: hidden;
  height: 44px;
  width: 44px;
  padding: 0 12px;
  &:hover {
    width: ${(props) => `${props.labelWidth + 56}px`};
  }
  background-color: ${Color.BRAND_900};
  border-radius: 4px 0 0 4px;
  border: none;
  outline: none;
  cursor: pointer;
  transition: 0.15s ease width;
`;

const Label = styled.div`
  width: max-content;
  white-space: nowrap;
  color: ${Color.NEUTRAL_00};
  ${Typography.BODY_2};
`;
