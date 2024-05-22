import React, { type PropsWithChildren } from "react";
import styled from "styled-components";
import { ContentIcon, type ContentIconProps } from ".";
import { IconButton } from "../../../components";
import { Color } from "../../../styles";

export enum ContentColor {
  BRAND_100 = Color.BRAND_100,
  NEUTRAL_00 = Color.NEUTRAL_00,
}

interface Props {
  onDismiss?: () => void;
  icon?: ContentIconProps;
  color?: ContentColor;
}

export const ContentContainer: React.FunctionComponent<Props & PropsWithChildren> = ({
  onDismiss,
  icon,
  color = ContentColor.BRAND_100,
  children,
}) => {
  return (
    <Container color={color}>
      {icon && <ContentIcon {...icon} />}
      {children}
      {onDismiss && (
        <Exit>
          <IconButton name="x" color={Color.NEUTRAL_900} onClick={onDismiss} />
        </Exit>
      )}
    </Container>
  );
};

const Container = styled.div<{ color: ContentColor }>`
  width: 100%;
  height: max-content;
  position: relative;
  display: flex;
  gap: 16px;
  padding: 20px;
  background-color: ${(props) => props.color};
  border-radius: 8px;
  border: 1px solid
    ${(props) => (props.color == ContentColor.NEUTRAL_00 ? Color.NEUTRAL_400 : "transparent")};
`;

const Exit = styled.div`
  position: absolute;
  top: 12px;
  right: 10px;
`;
