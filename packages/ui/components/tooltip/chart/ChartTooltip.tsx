import React, { type ReactNode, useEffect, useRef, useState } from "react";
import styled, { css, type RuleSet } from "styled-components";
import { TooltipOrientation } from "..";
import { Color, Typography } from "../../../styles";
import { ChartTooltipItem, type TooltipItemProps } from "./ChartTooltipItem";

export enum ChartTooltipColor {
  NEUTRAL_800 = Color.NEUTRAL_800,
  NEUTRAL_900 = Color.NEUTRAL_900,
}

interface Props {
  title: string;
  titleIcon?: ReactNode;
  items?: Array<TooltipItemProps>;
  footer?: Array<TooltipItemProps>;
  position?: {
    x: number;
    y: number;
  };
  orientation?: TooltipOrientation;
  visible?: boolean;
  color?: ChartTooltipColor;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export const ChartTooltip: React.FunctionComponent<Props> = ({
  title,
  titleIcon,
  items = [],
  footer = [],
  position,
  orientation = TooltipOrientation.RIGHT,
  color = ChartTooltipColor.NEUTRAL_900,
  visible = true,
  onMouseEnter,
  onMouseLeave,
}) => {
  const [dimensions, setDimensions] = useState<{ width: number; height: number }>();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      const resizeObserver = new ResizeObserver(() => {
        if (ref.current) {
          setDimensions({
            width: ref.current.clientWidth,
            height: ref.current.clientHeight,
          });
        }
      });
      resizeObserver.observe(ref.current);
      return () => {
        resizeObserver.disconnect();
      };
    }
  }, [ref]);

  return (
    <Container
      ref={ref}
      dimensions={dimensions}
      position={position}
      orientation={orientation}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      visible={visible}
    >
      <Body color={color}>
        <Content>
          <Title>
            {titleIcon}
            {title}
          </Title>

          {items.map((item, index) => (
            <ChartTooltipItem key={index} {...item} />
          ))}
        </Content>

        {footer.length > 0 && (
          <Footer>
            {footer.map((item, index) => (
              <ChartTooltipItem key={index} {...item} />
            ))}
          </Footer>
        )}
      </Body>
      <Nib orientation={orientation} color={color} />
    </Container>
  );
};

const getNibLocation = (orientation: TooltipOrientation): RuleSet => {
  switch (orientation) {
    case TooltipOrientation.TOP:
      return css`
        bottom: 5px;
        left: calc(50% - 15px);
      `;
    case TooltipOrientation.BOTTOM:
      return css`
        top: 5px;
        left: calc(50% - 15px);
      `;
    case TooltipOrientation.LEFT:
      return css`
        right: 5px;
        top: calc(50% - 15px);
      `;
    case TooltipOrientation.RIGHT:
      return css`
        left: 5px;
        top: calc(50% - 15px);
      `;
  }
};

const getContainerLocation = (
  position: { x: number; y: number },
  dimensions: { width: number; height: number },
  orientation: TooltipOrientation
): RuleSet => {
  switch (orientation) {
    case TooltipOrientation.TOP:
      return css`
        top: ${position.y - dimensions.height - 8}px;
        left: ${position.x - dimensions.width / 2}px;
      `;
    case TooltipOrientation.BOTTOM:
      return css`
        top: ${position.y + 8}px;
        left: ${position.x - dimensions.width / 2}px;
      `;
    case TooltipOrientation.LEFT:
      return css`
        top: ${position.y - dimensions.height / 2}px;
        left: ${position.x - dimensions.width - 5}px;
      `;
    case TooltipOrientation.RIGHT:
      return css`
        top: ${position.y - dimensions.height / 2}px;
        left: ${position.x + 25}px;
      `;
  }
};

const Container = styled.div<{
  orientation: TooltipOrientation;
  position?: { x: number; y: number };
  dimensions?: { width: number; height: number };
  visible: boolean;
}>`
  position: ${(props) => (props.position ? "absolute" : "relative")};
  ${({ position, dimensions, orientation }) =>
    position && dimensions && getContainerLocation(position, dimensions, orientation)}
  opacity: ${(props) => (props.visible && props.position ? 1 : 0)};
  transition:
    0.07s ease top,
    0.07s ease left,
    ${(props) => (props.visible ? "0.2s 0.1s" : 0)} ease opacity;
  padding: 8px;
`;

const Nib = styled.div<{ orientation: TooltipOrientation; color: ChartTooltipColor }>`
  position: absolute;
  ${(props) => getNibLocation(props.orientation)};
  width: 30px;
  height: 30px;
  transform: rotate(45deg);
  background-color: ${Color.BRAND_100};
  border-radius: 4px;
  transition: 0.15s ease opacity;
  background-color: ${(props) => props.color};
  z-index: 99999;
`;

const Body = styled.div<{ color: ChartTooltipColor }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 190px;
  min-height: 125px;
  height: max-content;
  border-radius: 8px;
  background-color: ${(props) => props.color};
  color: ${Color.NEUTRAL_00};
  ${Typography.BODY_3};
  z-index: 100000;
  position: relative;
`;

const Footer = styled.div`
  border-top: 1px solid ${Color.NEUTRAL_700};
  display: flex;
  flex-direction: column;
  padding: 8px;
  ${Typography.BODY_3};
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 4px 12px;
  margin-top: 4px;
  width: 100%;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
