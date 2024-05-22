import React from "react";
import styled from "styled-components";
import { Color } from "../../styles";

interface Props {
  src: string;
  alt?: string;
  highlight?: boolean;
}

export const HelperImage: React.FunctionComponent<Props> = ({
  src,
  alt = "",
  highlight = false,
}) => {
  return (
    <Container highlight={highlight}>
      <Image src={src} alt={alt} />
    </Container>
  );
};

const Container = styled.div<{ highlight: boolean }>`
  width: calc(100% - 16px);
  height: min-content;
  margin: 12px 0;
  border-radius: 4px;
  padding: 8px;
  background-color: ${(props) => (props.highlight ? Color.BRAND_400 : Color.NEUTRAL_300)};
  transition: 0.15s ease background-color;
`;

const Image = styled.img`
  width: 100%;
  object-fit: cover;
`;
