import React, { type PropsWithChildren } from "react";
import styled, { css } from "styled-components";
import { FAButton, IconButton } from "..";
import { Color, Typography } from "../../styles";
import { useChildVerifier } from "../hooks";

interface Props {
  title?: string;
  onClose?: () => void;
  onChat?: () => void;
}

export const HelperBlock: React.FunctionComponent<Props & PropsWithChildren> = ({
  title,
  onClose,
  onChat,
  children,
}) => {
  const verifiedChildren = useChildVerifier(children, "HelperSection");

  return (
    <Overlay>
      <Container>
        <Row>
          {title}
          {onClose && <IconButton name="x" color={Color.NEUTRAL_900} onClick={onClose} />}
        </Row>
        <SectionContainer>{verifiedChildren}</SectionContainer>
      </Container>
      {onChat && (
        <FAButton
          icon="message"
          onClick={onChat}
          position={css`
            bottom: 24px;
            right: 24px;
          `}
        />
      )}
    </Overlay>
  );
};

const Overlay = styled.div`
  position: relative;
  width: 282px;
`;

const Container = styled.div`
  height: 100vh;
  max-height: 100vh;
  width: 282px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow-y: auto;
  overflow-x: hidden;
  background-color: ${Color.NEUTRAL_00};
`;

const SectionContainer = styled.div`
  height: max-content;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${Color.NEUTRAL_700};
  ${Typography.BODY_2};
  padding: 8px;
  padding-left: 16px;
`;
