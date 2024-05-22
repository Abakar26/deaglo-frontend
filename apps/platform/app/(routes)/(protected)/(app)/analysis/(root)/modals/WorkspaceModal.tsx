import { type Workspace, type WorkspaceAnalysis } from "@/app/interface";
import React from "react";
import styled from "styled-components";
import { AnalysisCard, Button, CurrencyLabel, InsertArea, Modal, type Flag } from "ui/components";
import { Color, Typography } from "ui/styles";

interface Props {
  workspace: Workspace;
  onAdd: () => void;
  onSave: () => void;
  onRemove: (analysis: WorkspaceAnalysis) => void;
}

export const WorkspaceModal: React.FunctionComponent<Props> = ({
  workspace,
  onSave,
  onAdd,
  onRemove,
}) => {
  return (
    <Modal onDismiss={onSave}>
      <Row>
        <Title>{workspace.name}</Title>
        {workspace.baseCurrency && (
          <CurrencyLabel
            baseCurrency={workspace.baseCurrency?.code}
            baseFlag={workspace.baseCurrency?.countryName as Flag}
          />
        )}
      </Row>
      {workspace?.analysis?.length ? (
        <Grid>
          {workspace?.analysis?.map((analysis: WorkspaceAnalysis) => (
            <AnalysisCard
              name={analysis.name}
              baseCurrency={analysis.baseCurrency?.code}
              foreignCurrency={analysis.foreignCurrency?.code}
              key={analysis.analysisId}
              onView={() => null}
              onCreate={() => null}
              simulations={[]}
              onRemove={() => onRemove(analysis)}
            />
          ))}
          <InsertArea icon="plus" label="Add Analyses" onClick={onAdd} />
        </Grid>
      ) : (
        <Content>
          Start by adding Analyses to your workspace
          <InsertArea icon="plus" label="Add Analyses" onClick={onAdd} />
        </Content>
      )}
      <Row reverse>
        <Button onClick={onSave} label="Done" resizeMode="fit" />
      </Row>
    </Modal>
  );
};

const Row = styled.div<{ reverse?: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-direction: ${(props) => (props.reverse ? "row-reverse" : "row")};
`;

const Title = styled.span`
  ${Typography.HEADER_2};
  color: ${Color.NEUTRAL_900};
`;

const Grid = styled.div`
  padding: 20px;
  border-radius: 8px;
  background-color: ${Color.NEUTRAL_150};
  max-height: calc(100vh - 200px);
  overflow-y: auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: 286px;
  grid-column-gap: 24px;
  grid-row-gap: 24px;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 12px;
  ${Typography.BODY_3};
  color: ${Color.NEUTRAL_700};
  height: 124px;
  margin: 26px;
`;
