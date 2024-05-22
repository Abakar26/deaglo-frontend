import React, { useRef, useState, type PropsWithChildren } from "react";
import styled from "styled-components";
import { Icon } from "..";
import { Color, Typography } from "../../styles";

interface Props {
  title: string;
  highlight?: boolean;
}

export const HelperSection: React.FunctionComponent<Props & PropsWithChildren> = ({
  title,
  highlight = false,
  children,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  return (
    <Container open={open} highlight={highlight}>
      <Row onClick={() => setOpen((open) => !open)}>
        {title}
        <Dropdown open={open}>
          <Icon name="chevron-down" />
        </Dropdown>
      </Row>
      <Content open={open} height={ref.current?.clientHeight ?? 0}>
        <ContentSection ref={ref}>{children}</ContentSection>
      </Content>
    </Container>
  );
};

const Container = styled.div<{ open: boolean; highlight: boolean }>`
  width: calc(100% - 32px);
  padding: 0px 16px;
  background-color: ${(props) =>
    props.open ? (props.highlight ? Color.BRAND_300 : Color.NEUTRAL_100) : Color.NEUTRAL_00};
  border-top: 1px solid ${Color.NEUTRAL_150};
  ${Typography.BODY_1};
  color: ${(props) => (props.open ? Color.NEUTRAL_900 : Color.NEUTRAL_700)};
  display: flex;
  flex-direction: column;
  transition: 0.15s ease background-color;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 24px;
  padding: 12px 0;
  ${Typography.SUBHEAD_1};
  cursor: pointer;
`;

const Dropdown = styled.div<{ open: boolean }>`
  background-color: transparent;
  border: none;
  outline: none;
  transform: rotate(${(props) => (props.open ? "180deg" : 0)});
  transition: 0.15s ease transform;
  cursor: pointer;
`;

const Content = styled.div<{ open: boolean; height: number }>`
  height: ${(props) => (props.open ? `${props.height}px` : "0")};
  overflow: hidden;
  transition: 0.5s ease-in-out height;
`;

const ContentSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: max-content;
`;
