import React from "react";
import styled from "styled-components";
import { TabBarSize } from ".";
import { Tab } from "./Tab";

export interface TabItem {
  key: string;
  label: string;
  disabled?: boolean;
  amount?: number;
  selected?: number;
}

interface Props {
  current?: string;
  onChange?: (key: string) => void;
  tabs: Array<TabItem>;
  size?: TabBarSize;
}

export const TabBar: React.FunctionComponent<Props> = ({
  current,
  onChange,
  tabs,
  size = TabBarSize.LARGE,
}) => {
  return (
    <Container>
      {tabs.map((tab, i) => {
        return (
          <Tab
            {...tab}
            key={i}
            size={size}
            active={tab.key === current}
            onClick={() => !tab.disabled && onChange && onChange(tab.key)}
          />
        );
      })}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  width: min-content;
  gap: 24px;
`;
