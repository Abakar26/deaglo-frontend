import React, { type PropsWithChildren } from "react";
import styled, { css } from "styled-components";
import { Color, Typography } from "../../../styles";
import { useChildVerifier } from "../../hooks";

export enum SegmentedContentColor {
  BRAND_100 = Color.BRAND_100,
  NEUTRAL_100 = Color.NEUTRAL_100,
  NEUTRAL_300 = Color.NEUTRAL_300,
}

export enum SegmentedContentSize {
  SMALL,
  MEDIUM,
  LARGE,
}

interface Props {
  title?: string;
  color?: SegmentedContentColor;
  separated?: boolean;
  size?: SegmentedContentSize;
  equalized?: boolean;
}

export const SegmentedContentBlock: React.FunctionComponent<Props & PropsWithChildren> = ({
  title,
  color = SegmentedContentColor.NEUTRAL_100,
  children,
  separated = false,
  size = SegmentedContentSize.SMALL,
  equalized = true,
}) => {
  const getVerifiedChildren = (children: React.ReactNode): Array<React.ReactNode> => {
    if ((children as Array<React.ReactNode>).length) {
      return (children as Array<React.ReactNode>)
        .filter((child) => !!child)
        .map((child) =>
          React.cloneElement(
            child as React.ReactElement<any, string | React.JSXElementConstructor<any>>,
            { size }
          )
        );
    }
    return [children];
  };

  const verifiedChildren = getVerifiedChildren(children);

  return (
    <Container color={color} separated={separated} size={size}>
      {title && <Title separated={separated}>{title}</Title>}
      <Segments
        color={color}
        separated={separated}
        childCount={verifiedChildren.length}
        equalized={equalized}
        size={size}
      >
        {verifiedChildren}
      </Segments>
    </Container>
  );
};

const Container = styled.div<{
  color: SegmentedContentColor;
  separated: boolean;
  size: SegmentedContentSize;
}>`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => (props.separated ? "transparent" : props.color)};
  border-radius: 4px;
  gap: 4px;
`;

const separated = css`
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: 4px;
`;

const joined = css`
  display: flex;
  justify-content: space-between;
`;

const Segments = styled.div<{
  color: SegmentedContentColor;
  separated: boolean;
  childCount: number;
  equalized: boolean;
  size: SegmentedContentSize;
}>`
  width: 100%;
  border-radius: 4px;
  ${(props) => (props.separated ? separated : joined)};
  background-color: ${Color.NEUTRAL_00};
  overflow: hidden;
  background-color: ${(props) => (!props.separated ? props.color : "transparent")};
  > * {
    background-color: ${(props) => props.color};
    ${(props) => !props.separated && "width: max-content"};
  }
  display: grid;
  grid-template-columns: ${(props) =>
    `repeat(${props.childCount}, minmax(${props.equalized ? 0 : "max-content"}, 1fr))`};
`;

const Title = styled.span<{ separated: boolean }>`
  ${Typography.SUBHEAD_2};
  color: ${Color.NEUTRAL_700};
  margin: 0 ${(props) => (props.separated ? "2px" : "8px")};
  margin-top: 4px;
`;
