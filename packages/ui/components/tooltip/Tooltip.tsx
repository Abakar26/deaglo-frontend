import React, { useState, type ReactNode } from "react";
import styled, { css, type RuleSet } from "styled-components";
import { TooltipOrientation } from ".";
import { Color, Typography } from "../../styles";
import { Icon, type IconName } from "../icon";

export interface TooltipProps {
  label: string;
  body?: string | ReactNode;
  icon?: IconName;
  orientation?: TooltipOrientation;
}

export const Tooltip: React.FunctionComponent<TooltipProps> = ({
  label,
  body,
  icon,
  orientation = TooltipOrientation.TOP,
}) => {
  const [bodyVisible, setBodyVisible] = useState<boolean>(false);

  return (
    <Container>
      <Content
        onMouseEnter={() => setBodyVisible(true)}
        onMouseLeave={() => setBodyVisible(false)}
        neutral={!icon}
        withContent={!!body}
      >
        {icon && (
          <IconContainer>
            <Icon name={icon} size={16} color={Color.NEUTRAL_900} />
          </IconContainer>
        )}
        {label}
      </Content>
      {body && (
        <TipContainer visible={bodyVisible}>
          <Body visible={bodyVisible} orientation={orientation}>
            {body}
          </Body>
          <Nib visible={bodyVisible} orientation={orientation} />
        </TipContainer>
      )}
    </Container>
  );
};

const getBodyLocation = (orientation: TooltipOrientation): RuleSet => {
  switch (orientation) {
    case TooltipOrientation.TOP:
      return css`
        bottom: calc(100% + 10px);
        left: calc(50% - 110px);
      `;
    case TooltipOrientation.BOTTOM:
      return css`
        top: calc(100% + 10px);
        left: calc(50% - 110px);
      `;
    case TooltipOrientation.LEFT:
      return css`
        right: calc(100% + 10px);
      `;
    case TooltipOrientation.RIGHT:
      return css`
        left: calc(100% + 10px);
      `;
  }
};

const getNibLocation = (orientation: TooltipOrientation): RuleSet => {
  switch (orientation) {
    case TooltipOrientation.TOP:
      return css`
        bottom: calc(100% + 10px);
        left: calc(50% - 15px);
      `;
    case TooltipOrientation.BOTTOM:
      return css`
        top: calc(100% + 10px);
        left: calc(50% - 15px);
      `;
    case TooltipOrientation.LEFT:
      return css`
        right: calc(100% + 10px);
      `;
    case TooltipOrientation.RIGHT:
      return css`
        left: calc(100% + 10px);
      `;
  }
};

const Container = styled.div`
  position: relative;
  width: min-content;
  height: min-content;
  ${Typography.LABEL_4};
`;

const Content = styled.div<{ neutral: boolean; withContent: boolean }>`
  width: min-content;
  text-overflow: hidden;
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 2px 4px;
  ${(props) =>
    props.withContent &&
    css`
      cursor: pointer;
    `}
  color: ${Color.NEUTRAL_900};
  background-color: ${(props) => (props.neutral ? Color.NEUTRAL_150 : Color.BRAND_100)};
  border-radius: 2px;
  &:hover {
    ${(props) =>
      props.withContent &&
      css`
        background-color: ${Color.BRAND_300};
      `}
  }
  transition: 0.15s ease background-color;
`;

const Body = styled.div<{ visible: boolean; orientation: TooltipOrientation }>`
  position: absolute;
  ${(props) => getBodyLocation(props.orientation)};
  width: min-content;
  width: 200px;
  height: auto;
  white-space: break-spaces;
  background-color: ${Color.NEUTRAL_900};
  color: ${Color.NEUTRAL_00};
  padding: 10px;
  border-radius: 8px;
  z-index: ${(props) => (props.visible ? 100000 : -10)};
  transition: 0.15s ease opacity;
`;

const Nib = styled.div<{ visible: boolean; orientation: TooltipOrientation }>`
  position: absolute;
  ${(props) => getNibLocation(props.orientation)};
  width: 30px;
  height: 30px;
  transform: rotate(45deg);
  z-index: ${(props) => (props.visible ? 99999 : -10)};
  background-color: ${Color.NEUTRAL_900};
  border-radius: 4px;
`;

const IconContainer = styled.div`
  padding: 0 2px;
  padding-bottom: 1px;
`;

const TipContainer = styled.div<{ visible: boolean }>`
  pointer-events: ${(props) => (props.visible ? undefined : "none")};
  opacity: ${(props) => (props.visible ? 1 : 0)};
  transition: 0.15s ease opacity;
`;
