"use client";

import { type Action } from "../_mocks";

import { useState } from "react";
import styled from "styled-components";
import { SideModal, SmallButton } from "ui/components";
import { Color, Typography } from "ui/styles";
import { SectionContainer } from "../shared";
import { ActionRequiredItem } from "./ActionRequiredItem";

type ActionsRequiredContent = {
  actions: Action[];
};

export function ActionsRequiredContent({ actions }: ActionsRequiredContent) {
  const [viewAll, setViewAll] = useState(false);

  const action = actions[0];
  if (action === undefined) return null;

  return (
    <>
      <SectionContainer marginBottom="32px">
        <ActionRequiredItem action={action} />

        {actions.length > 1 ? (
          <AllActions>
            <ActionsCount>{actions.length} Actions required</ActionsCount>
            <SmallButton label="View  All" onClick={() => setViewAll(true)} />
          </AllActions>
        ) : null}
      </SectionContainer>

      {viewAll ? (
        <SideModal title="All Actions required" onDismiss={() => setViewAll(false)}>
          <ActionsContainer>
            {actions.map((action) => (
              <ActionRequiredItem key={action.id} action={action} />
            ))}
          </ActionsContainer>
        </SideModal>
      ) : null}
    </>
  );
}

const AllActions = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
`;

const ActionsCount = styled.span`
  ${Typography.BODY_3}
  color: ${Color.NEUTRAL_700};
`;

const ActionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 24px;
`;
