"use client";
import React from "react";
import { styled } from "styled-components";
import { Color } from "../styles/index";

interface LinkButtonProps {
  to: string;
  text: string;
}

const LinkButton = (props: LinkButtonProps) => {
  const { to, text } = props;
  return <NavigateButton href={to}>{text}</NavigateButton>;
};

export default LinkButton;

const NavigateButton = styled.a`
  background-color: ${Color.PURPLE_300};
  &:hover {
    background-color: ${Color.PURPLE_700};
  }
  color: white;
  font-weight: bold;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  margin-bottom: 0.75rem;
`;
