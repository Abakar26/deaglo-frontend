import React from "react";
import styled from "styled-components";
import { Color, Typography } from "../../styles";
import { Icon } from "../icon";

interface Props {
  current: string;
  onSelect: (key: string) => void;
  steps: Array<{
    key: string;
    label: string;
    complete: boolean;
  }>;
}

export const Stepper: React.FunctionComponent<Props> = ({ steps, current, onSelect }) => {
  return (
    <Container>
      {steps.map(({ key, label, complete }, index) => {
        const selected = key === current;
        const canSelect = complete || selected || !!steps[index - 1]?.complete;
        return (
          <>
            {index !== 0 && <Separator />}
            <Step
              key={key}
              onClick={() => canSelect && onSelect(key)}
              current={selected}
              canSelect={canSelect}
            >
              <Counter complete={complete} selected={selected}>
                {complete ? <Icon name="check" size={12} color={Color.NEUTRAL_00} /> : index + 1}
              </Counter>
              {label}
            </Step>
          </>
        );
      })}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Step = styled.button<{ current: boolean; canSelect: boolean }>`
  height: 36px;
  border-radius: 20px;
  border: none;
  outline: none;
  background-color: transparent;
  display: flex;
  align-items: center;
  padding: 0 8px;
  gap: 5px;
  ${Typography.BODY_2};
  color: ${(props) => (props.current ? Color.NEUTRAL_900 : Color.NEUTRAL_700)};
  &:hover {
    ${(props) => props.canSelect && `background-color: ${Color.NEUTRAL_150}; cursor: pointer;`}
  }
  transition:
    0.3s ease background-color,
    0.3s ease color;
`;

const Counter = styled.div<{ complete: boolean; selected: boolean }>`
  width: 18px;
  height: 18px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  ${Typography.BODY_2};
  color: ${(props) => (props.selected ? Color.NEUTRAL_900 : Color.NEUTRAL_700)};
  background-color: ${(props) => (props.complete ? Color.SUCCESS_700 : "transparent")};
  border: 1.5px solid
    ${(props) =>
      props.complete ? Color.SUCCESS_700 : props.selected ? Color.NEUTRAL_900 : Color.NEUTRAL_400};
  ${(props) => props.complete && `padding-bottom: 2px;`};
  transition: 0.15s ease border-color;
`;

const Separator = styled.div`
  height: 1px;
  width: 20px;
  background-color: ${Color.NEUTRAL_400};
`;
