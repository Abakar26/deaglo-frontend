import styled, { css } from "styled-components";
import { Color, Typography } from "../../../styles";

interface Props {
  active: boolean;
  onClick: () => void;
  disabled?: boolean;
  label?: string;
}

export const RadioButton: React.FunctionComponent<Props> = ({
  active,
  onClick,
  disabled = false,
  label,
}) => {
  return (
    <Container disabled={disabled}>
      <Radio
        onClick={onClick}
        active={active}
        disabled={disabled}
        aria-label={label ?? "Radio Button"}
      />
      {label}
    </Container>
  );
};

const Container = styled.div<{ disabled: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  ${Typography.BODY_1};
  color: ${(props) => (props.disabled ? Color.NEUTRAL_500 : Color.NEUTRAL_900)};
  transition: 0.15s ease color;
`;

const Radio = styled.button<{ active: boolean; disabled?: boolean }>`
  width: ${(props) => (props.active ? "8px" : "19px")};
  height: ${(props) => (props.active ? "8px" : "19px")};
  border-radius: 10px;
  box-sizing: content-box;
  border: ${(props) => (props.active ? "6px" : "1px")} solid;
  border-color: ${Color.BRAND_800};
  background-color: ${(props) => (props.active ? Color.NEUTRAL_00 : Color.BRAND_50)};
  transition:
    0.15s ease border-width,
    0.15s ease border-color,
    0.15s ease width,
    0.15s ease height,
    0.15s ease background-color,
    0.15s ease outline;
  ${(props) => !props.disabled && "cursor: pointer"};
  padding: 0;
  margin: 0;
  outline-offset: 2px;
  &:focus {
    outline: 2px solid ${Color.BRAND_900};
    ${(props) =>
      props.active &&
      css`
        width: 0px;
        height: 0px;
        border: 10px solid ${Color.BRAND_800};
      `};
  }
  &:hover {
    ${(props) =>
      !props.active &&
      !props.disabled &&
      css`
        background-color: ${Color.BRAND_300};
      `};

    ${(props) =>
      !props.disabled &&
      css`
        border-color: ${props.active ? Color.BRAND_900 : Color.BRAND_800};
      `};
  }
  ${(props) =>
    props.disabled &&
    css`
      background-color: ${Color.NEUTRAL_00};
      border-color: ${Color.NEUTRAL_500};
    `}
`;
