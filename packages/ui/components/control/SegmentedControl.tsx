import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Icon, Tooltip, type IconName, type TooltipProps } from "..";
import { Color, Shadow, Typography } from "../../styles";

export interface SegmentOption {
  key: string;
  label: string;
  icon?: IconName;
  disabled?: boolean;
}

export enum SegmentedControlSize {
  SMALL,
  MEDIUM,
  LARGE,
}

interface Props {
  initial?: string;
  segments: Array<SegmentOption>;
  onChange?: (value: SegmentOption) => void;
  size?: SegmentedControlSize;
  tooltip?: TooltipProps;
}

export const SegmentedControl: React.FunctionComponent<Props> = ({
  initial,
  segments,
  size = SegmentedControlSize.LARGE,
  onChange,
  tooltip,
}) => {
  const [current, setCurrent] = useState<string | undefined>(initial ?? segments[0]?.key);
  const [indicator, setIndicator] = useState<{ width: number; left: number }>();

  const refs = useRef<HTMLButtonElement[]>(Array<HTMLButtonElement>(segments.length));

  useEffect(() => {
    const index = Math.max(
      segments.findIndex((value) => value.key === initial),
      0
    );

    const button = refs.current[index];
    if (button) {
      setIndicator({
        width: button.offsetWidth - 2,
        left: button.offsetLeft,
      });
    }
  }, [refs, initial]);

  const select = (value: SegmentOption, index: number) => {
    setCurrent(value.key);
    onChange?.(value);
    const button = refs.current[index];
    if (button) {
      setIndicator({
        width: button.offsetWidth - 2,
        left: button.offsetLeft,
      });
    }
  };

  const registRef = (index: number) => {
    return (ref: HTMLButtonElement | null) => {
      if (ref) {
        refs.current[index] = ref;
      }
    };
  };

  return (
    <Container>
      {tooltip && <Tooltip {...tooltip} />}
      <Control>
        {segments.map((value, index) => {
          return (
            <OptionButton
              aria-label={`Segment ${value.icon ?? value.label}`}
              ref={registRef(index)}
              disabled={value.disabled}
              active={current === value.key}
              key={value.key}
              onClick={() => !value.disabled && select(value, index)}
              size={size}
            >
              {value.icon ? (
                <Icon
                  name={value.icon}
                  size={size === SegmentedControlSize.SMALL ? 16 : 20}
                  color={getColor(current == value.key, value.disabled)}
                />
              ) : (
                value.label
              )}
            </OptionButton>
          );
        })}
        {indicator && <Indicator {...indicator} size={size} />}
      </Control>
    </Container>
  );
};

const getColor = (active: boolean, disabled?: boolean): Color => {
  return disabled ? Color.NEUTRAL_400 : active ? Color.BRAND_800 : Color.NEUTRAL_700;
};

const getHeight = (size: SegmentedControlSize) => {
  switch (size) {
    case SegmentedControlSize.MEDIUM:
    case SegmentedControlSize.LARGE:
      return "36px";
    case SegmentedControlSize.SMALL:
      return "32px";
  }
};

const getPadding = (size: SegmentedControlSize) => {
  switch (size) {
    case SegmentedControlSize.MEDIUM:
    case SegmentedControlSize.LARGE:
      return "8px 16px";
    case SegmentedControlSize.SMALL:
      return "8px";
  }
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
`;

const Control = styled.div`
  width: min-content;
  display: flex;
  align-items: center;
  background-color: ${Color.NEUTRAL_150};
  border-radius: 4px;
  padding: 2px;
  position: relative;
`;

const OptionButton = styled.button<{
  active: boolean;
  disabled?: boolean;
  size: SegmentedControlSize;
}>`
  ${Typography.SUBHEAD_2}
  height: ${(props) => getHeight(props.size)};
  color: ${(props) => getColor(props.active, props.disabled)};
  ${(props) => !props.disabled && "cursor: pointer"};
  background-color: transparent;
  outline: none;
  border: none;
  border-width: 1px;
  transition: 0.15s ease color;
  padding: ${(props) => getPadding(props.size)};
  text-overflow: ellipsis;
  white-space: nowrap;
  z-index: 2;
`;

const Indicator = styled.div<{ width: number; left: number; size: SegmentedControlSize }>`
  height: ${(props) => getHeight(props.size)};
  width: ${(props) => props.width}px;
  position: absolute;
  border-radius: 4px;
  left: ${(props) => props.left}px;
  background-color: ${Color.NEUTRAL_00};
  border: 1px solid ${Color.NEUTRAL_300};
  transition:
    0.3s ease left,
    0.3s ease width;
  z-index: 1;
  ${Shadow.DEFAULT};
`;
