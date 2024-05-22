import React, { type PropsWithChildren } from "react";
import styled from "styled-components";
import { ContentColor, ContentContainer } from ".";
import { Button, ButtonType, Icon, type IconName } from "../../../components";
import { Color, Typography } from "../../../styles";
import { type ContentIconProps } from "./ContentIcon";

interface Props {
  title?: string;
  description?: string;
  color?: ContentColor;
  action?: {
    label: string;
    icon?: IconName;
    onClick: () => void;
    asButton?: boolean;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
  onDismiss?: () => void;
  icon?: ContentIconProps;
}

export const ContentBlock: React.FunctionComponent<Props & PropsWithChildren> = ({
  title,
  description,
  color = ContentColor.BRAND_100,
  action,
  secondaryAction,
  onDismiss,
  icon,
  children,
}) => {
  return (
    <ContentContainer icon={icon} color={color} onDismiss={onDismiss}>
      <Content>
        {(title ?? description ?? action) && (
          <Row>
            <Column>
              {title && <Title>{title}</Title>}
              {description && <Description>{description}</Description>}
            </Column>

            {secondaryAction ? (
              <Button
                label={secondaryAction.label}
                type={ButtonType.OUTLINE}
                onClick={secondaryAction.onClick}
                resizeMode="fit"
              />
            ) : null}
            {action &&
              (action.asButton ? (
                <Button
                  label={action.label}
                  type={
                    color === ContentColor.BRAND_100 || secondaryAction
                      ? ButtonType.FILL
                      : ButtonType.OUTLINE
                  }
                  onClick={action.onClick}
                  resizeMode="fit"
                />
              ) : (
                <Action onClick={action.onClick}>
                  {action.icon && <Icon name={action.icon} color={Color.BRAND_800} size={20} />}
                  {action.label}
                </Action>
              ))}
          </Row>
        )}
        {children}
      </Content>
    </ContentContainer>
  );
};

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  justify-content: space-between;
`;

const Action = styled.button`
  border: none;
  outline: none;
  background-color: transparent;
  ${Typography.SUBHEAD_1};
  color: ${Color.BRAND_800};
  cursor: pointer;
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 4px;
  &:focus {
    text-decoration: underline;
  }
  padding: 8px 0px;
`;

const Title = styled.span`
  color: ${Color.NEUTRAL_900};
  ${Typography.SUBHEAD_1};
`;

const Description = styled.span`
  ${Typography.BODY_3};
  color: ${Color.NEUTRAL_700};
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: start;
  width: 100%;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 24px;
`;
