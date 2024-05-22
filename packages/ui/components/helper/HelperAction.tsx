import React from "react";
import styled from "styled-components";
import { Button, ButtonSize } from "..";
import { Color, Typography } from "../../styles";

interface Props {
  title?: string;
  highlight?: boolean;
  action: {
    label: string;
    onClick: () => void;
  };
}

export const HelperAction: React.FunctionComponent<Props> = ({
  title,
  highlight = false,
  action: { label, onClick },
}) => {
  return (
    <Container highlight={highlight}>
      {title}
      <ButtonContainer>
        <Button label={label} onClick={onClick} size={ButtonSize.SMALL} />
      </ButtonContainer>
    </Container>
  );
};

const Container = styled.div<{ highlight: boolean }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 16px 0;
  background-color: ${(props) => (props.highlight ? Color.BRAND_400 : Color.NEUTRAL_300)};
  ${Typography.SUBHEAD_2};
  color: ${Color.NEUTRAL_900};
  text-align: center;
  border-radius: 4px;
  margin: 12px 0;
  transition: 0.15s ease background-color;
`;

const ButtonContainer = styled.div`
  padding: 0 32px;
  width: calc(100% - 64px);
`;
