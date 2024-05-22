import React, { useCallback, useEffect, useState, type ReactNode } from "react";
import styled, { css, type RuleSet } from "styled-components";
import { SnackbarLevel } from ".";
import { Color, Typography } from "../../styles";
import { Icon, type IconName } from "../icon";

export enum SnackPosition {
  LEFT,
  CENTER,
  RIGHT,
}
interface Props {
  level?: SnackbarLevel;
  icon?: IconName;
  action?: {
    label: string;
    onClick: () => void;
  };
  message: ReactNode;
  description?: string;
  onDismiss?: () => void;
  cancellable?: boolean;
  duration?: number;
  position?: SnackPosition;
}

export const Snackbar: React.FunctionComponent<Props> = ({
  level = SnackbarLevel.INFO,
  icon = "circle-check",
  action,
  message,
  description,
  onDismiss,
  cancellable,
  duration,
  position = SnackPosition.CENTER,
}) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [timerId, setTimerId] = useState<NodeJS.Timeout>();

  const close = useCallback(() => {
    setVisible(false);
    onDismiss && setTimeout(onDismiss, 300);
  }, [onDismiss]);

  useEffect(() => {
    setVisible(true);
    if (duration) {
      timerId && clearTimeout(timerId);
      const _timerId = setTimeout(close, duration * 1000);
      setTimerId(_timerId);
      return () => clearTimeout(_timerId);
    }
  }, [close, duration, message, description, icon]);

  return (
    <Container
      level={level}
      visible={visible}
      position={position}
      wide={!!action || (!!onDismiss && cancellable)}
    >
      <MessageSection>
        <Icon name={icon} size={24} color={getColor(level)} />
        {message}
        {description && <Description>{description}</Description>}
      </MessageSection>
      <ActionSection>
        {action && <SnackButton onClick={action.onClick}>{action.label}</SnackButton>}
        {onDismiss && cancellable && (
          <ExitButton onClick={close}>
            <Icon name="x" size={20} color={Color.NEUTRAL_00} />
          </ExitButton>
        )}
      </ActionSection>
    </Container>
  );
};

const getColor = (level: SnackbarLevel): Color => {
  switch (level) {
    case SnackbarLevel.INFO:
      return Color.BRAND_400;
    case SnackbarLevel.ERROR:
      return Color.DANGER_400;
    case SnackbarLevel.SUCCESS:
      return Color.SUCCESS_400;
  }
};

const getHorizontalPosition = (position: SnackPosition, width: number): RuleSet => {
  switch (position) {
    case SnackPosition.LEFT:
      return css`
        left: 144px;
      `;
    case SnackPosition.RIGHT:
      return css`
        right: 144px;
      `;
    case SnackPosition.CENTER:
      return css`
        left: calc(50% - ${width / 2}px);
      `;
  }
};

const Container = styled.div<{
  level: SnackbarLevel;
  visible: boolean;
  wide?: boolean;
  position: SnackPosition;
}>`
  position: fixed;
  ${(props) => getHorizontalPosition(props.position, props.wide ? 630 : 335)};
  bottom: ${(props) => (props.visible ? "50px" : "-80px")};
  transition: 0.15s ease bottom;
  width: ${(props) => (props.wide ? "630px" : "335px")};
  height: 48px;
  color: ${Color.NEUTRAL_00};
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid ${(props) => getColor(props.level)};
  border-left: 4px solid ${(props) => getColor(props.level)};
  background-color: ${Color.NEUTRAL_800};
  z-index: 10000;
`;

const SnackButton = styled.button`
  ${Typography.LABEL_2};
  color: ${Color.BRAND_400};
  cursor: pointer;
  border: none;
  outline: none;
  background-color: transparent;
  &:hover {
    text-decoration: underline;
  }
  white-space: nowrap;
`;

const ExitButton = styled.button`
  background-color: transparent;
  outline: none;
  border: none;
  cursor: pointer;
`;

const MessageSection = styled.div`
  display: flex;
  ${Typography.SUBHEAD_3};
  gap: 10px;
  margin: 0 10px;
  white-space: nowrap;
`;

const ActionSection = styled.div`
  display: flex;
  gap: 15px;
  margin: 0 10px;
`;

const Description = styled.span`
  color: ${Color.NEUTRAL_500};
  margin-left: -4px;
`;
