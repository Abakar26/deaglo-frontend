import React, { useEffect, useState, type PropsWithChildren } from "react";
import styled from "styled-components";
import { ContentIcon, IconButton, type ContentIconProps } from "..";
import { Color, Typography } from "../../styles";

interface Props {
  title?: string;
  description?: string;
  icon?: ContentIconProps;
  onDismiss?: () => void;
}

export const Modal: React.FunctionComponent<Props & PropsWithChildren> = ({
  title,
  description,
  icon,
  onDismiss,
  children,
}) => {
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => setVisible(true), []);

  const dismiss = () => {
    setVisible(false);
    setTimeout(() => onDismiss?.(), 300);
  };

  return (
    <Container visible={visible}>
      <Content visible={visible}>
        <IconContainer>
          {onDismiss && <IconButton name="x" color={Color.NEUTRAL_900} onClick={dismiss} />}
        </IconContainer>
        {(title ?? icon ?? description) && (
          <Row>
            {icon && <ContentIcon {...icon} />}
            <Column>
              {title && <Title>{title}</Title>}
              {description && <Description>{description}</Description>}
            </Column>
          </Row>
        )}
        {children}
      </Content>
    </Container>
  );
};

const Container = styled.div<{ visible: boolean }>`
  background-color: ${(props) => (props.visible ? Color.MODAL_BG : "rgba(0, 0, 0, 0)")};
  height: 100vh;
  max-height: 100vh;
  width: 100vw;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-y: auto;
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 10000000;
  transition: 0.15s ease background-color;
`;

const Content = styled.div<{ visible: boolean }>`
  width: 880px;
  height: min-content;
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 40px;
  gap: 24px;
  background-color: ${Color.NEUTRAL_00};
  border-radius: 8px;
  scale: ${(props) => (props.visible ? 1 : 0)};
  transition: 0.15s ease scale;
`;

const Row = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  gap: 12px;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
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
  position: absolute;
  top: 32px;
  right: 32px;
`;
