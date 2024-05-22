import React from "react";
import styled, { keyframes } from "styled-components";
import { CurrencyLabel, Icon, type Flag, type Selectable } from "../..";
import { Color, Typography } from "../../../styles";
import { Menu, type MenuProps } from "../../button/Menu";
import { Card } from "../common/Card";
import { AnalysisEntry } from "./AnalysisEntry";

interface AnalysisCurrency {
  code: string;
  countryName: Flag;
}
interface WorkspaceAnalysis {
  analysisId?: string;
  dateAdded?: Date;
  name: string;
  category?: string;
  baseCurrency: AnalysisCurrency;
  foreignCurrency: AnalysisCurrency;
}
interface Props {
  title: string;
  menu?: MenuProps<Selectable>;
  currency?: {
    flag: Flag;
    symbol: string;
  };
  workspaceId: string;
  analyses: WorkspaceAnalysis[];
  onRemove: (key: string, workspaceId: string) => void;
  onAdd: () => void;
  onView: () => void;
  limit?: number;
  emptyMessage?: string;
}

export const WorkspaceCard: React.FunctionComponent<Props> = ({
  title,
  menu,
  currency,
  analyses,
  workspaceId,
  onRemove,
  onAdd,
  onView,
  limit = 3,
  emptyMessage = "No simulations in analysis",
}) => {
  return (
    <Card hoverable>
      <Row>
        {title}
        <RowSection>
          {currency && <CurrencyLabel baseCurrency={currency.symbol} baseFlag={currency.flag} />}
          {menu && <Menu {...menu} />}
        </RowSection>
      </Row>
      <AnalysesSection>
        <Analyses>
          {analyses?.length ? (
            analyses.map((analysis, index) => (
              <AnalysisEntry
                title={analysis.name}
                baseCurrency={analysis.baseCurrency.code}
                quoteCurrency={analysis.foreignCurrency.code}
                onRemove={() => onRemove(analysis?.analysisId ?? "", workspaceId)}
                key={index}
              />
            ))
          ) : (
            <Empty>{emptyMessage}</Empty>
          )}
        </Analyses>
        <ActionButton onClick={!analyses?.length ? onAdd : onView}>
          {!analyses?.length && <Icon name="plus" color={Color.BRAND_800} size={20} />}
          {analyses?.length > limit
            ? `View ${analyses?.length - limit} more`
            : analyses?.length > 0
              ? "View Workspace"
              : "Add analyses"}
        </ActionButton>
      </AnalysesSection>
    </Card>
  );
};

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${Color.NEUTRAL_900};
  ${Typography.SUBHEAD_3};
`;

const RowSection = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const AnalysesSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 242px;
  background-color: ${Color.NEUTRAL_100};
  border-radius: 4px;
  padding: 12px;
`;

const appear = keyframes`
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
`;

const Empty = styled.span`
  ${Typography.BODY_2};
  color: ${Color.NEUTRAL_700};
  opacity: 1;
  animation: ${appear} 1s ease;
`;

const Analyses = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ActionButton = styled.button`
  background-color: transparent;
  border: none;
  outline: none;
  color: ${Color.BRAND_800};
  ${Typography.SUBHEAD_2};
  display: flex;
  gap: 4px;
  padding: 0 4px;
  cursor: pointer;
  &:focus {
    text-decoration: underline;
  }
  width: min-content;
  white-space: nowrap;
`;
