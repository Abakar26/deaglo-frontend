import React, { useEffect, useState, type PropsWithChildren } from "react";
import styled, { css } from "styled-components";
import { IconButton, SmallButton } from "..";
import { Color, Typography } from "../../styles";

export enum ModalPosition {
  LEFT,
  RIGHT,
}

interface Props {
  title?: string;
  description?: string;
  onDismiss?: () => void;
  position?: ModalPosition;
  width?: number;
  action?: { label: string; onClick: () => void };
}

export const SideModal: React.FunctionComponent<Props & PropsWithChildren> = ({
  title,
  description,
  onDismiss,
  position = ModalPosition.RIGHT,
  width,
  children,
  action,
}) => {
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => setVisible(true), []);

  const dismiss = () => {
    setVisible(false);
    setTimeout(() => onDismiss?.(), 300);
  };

  return (
    <Container visible={visible}>
      <Content visible={visible} position={position} width={width}>
        <Header>
          <Column>
            {title && <Title>{title}</Title>}
            {description && <Description>{description}</Description>}
          </Column>
          {action ? <SmallButton label={action.label} onClick={action.onClick} /> : null}
          {onDismiss ? (
            <IconContainer>
              <IconButton name="x" color={Color.NEUTRAL_900} onClick={dismiss} />
            </IconContainer>
          ) : null}
        </Header>

        {children}
      </Content>
    </Container>
  );
};

const Container = styled.div<{ visible: boolean }>`
  background-color: ${(props) => (props.visible ? Color.MODAL_BG : "rgba(0, 0, 0, 0)")};
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 10000000;
  transition: 0.15s ease background-color;
`;

const Content = styled.div<{ visible: boolean; position: ModalPosition; width?: number }>`
  height: 100%;
  width: ${(props) => props.width ?? 605}px;
  display: flex;
  flex-direction: column;
  position: absolute;
  overflow-y: auto;
  top: 0px;
  ${(props) =>
    props.position === ModalPosition.RIGHT &&
    css`
      right: ${props.visible ? 0 : -((props.width ?? 605) + 100)}px;
    `};
  ${(props) =>
    props.position === ModalPosition.LEFT &&
    css`
      left: ${props.visible ? 0 : -((props.width ?? 605) + 100)}px;
    `};
  background-color: ${Color.NEUTRAL_00};
  padding: 40px;
  transition:
    0.3s ease right,
    0.3s ease left;
`;

const Header = styled.header`
  display: flex;
  gap: 24px;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-right: auto;
`;

const Title = styled.span`
  color: ${Color.NEUTRAL_900};
  ${Typography.HEADER_2};
`;

const Description = styled.span`
  color: ${Color.NEUTRAL_700};
  ${Typography.BODY_3};
`;

const IconContainer = styled.div`
  align-items: center;
  display: flex;
  height: 24px;
  justify-content: center;
  width: 24px;
`;
