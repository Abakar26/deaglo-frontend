import React from "react";
import { type Leg } from "..";
import {
  Segment,
  SegmentedContentBlock,
  SegmentedContentSize,
  SuspenseBlock,
} from "../../../components";

interface Props {
  separated?: boolean;
  parameters: Leg;
}

export const StrategyLeg: React.FunctionComponent<Props> = ({
  separated,
  parameters: {
    option,
    title,
    action,
    strike,
    leverage,
    legAmount,
    premium,
    premiumCurrency,
    barrierLevel,
  },
}) => {
  const withTitle = !!(option && action) || !!title;

  return (
    <SegmentedContentBlock
      separated={separated}
      title={
        withTitle ? title ?? `${typeof option === "string" ? option : ""} (${action})` : undefined
      }
      size={SegmentedContentSize.MEDIUM}
    >
      {!title?.includes("Forward") && (
        <Segment label={`Premium (${action === "Bought" ? "Paid" : "Received"})`}>
          {premium !== undefined ? (
            Intl.NumberFormat("en-US", { minimumFractionDigits: 0 }).format(premium) +
            (" " + (premiumCurrency ?? ""))
          ) : (
            <SuspenseBlock width={"84px"} height={"20px"} />
          )}
        </Segment>
      )}
      {legAmount !== undefined && <Segment label={"Leg Amount"}>{legAmount}</Segment>}
      {leverage !== undefined && (
        <Segment label={"Leverage"}>
          {Intl.NumberFormat("en-US", { minimumFractionDigits: 2 }).format(leverage)}
        </Segment>
      )}
      {!title?.includes("Forward") && strike !== undefined && (
        <Segment label={"Strike (ITMS/OTMS%)"}>
          {Intl.NumberFormat("en-US", { minimumFractionDigits: 2 }).format(strike)}%
        </Segment>
      )}
      {barrierLevel && (
        <Segment label={"Barrier Level"}>
          {Intl.NumberFormat("en-US", { minimumFractionDigits: 2 }).format(barrierLevel)}
        </Segment>
      )}
      {/* {option && title && (
        <Segment label={"Call/Put"}>{typeof option === "string" ? option : ""}</Segment>
      )}
      {action && !title && <Segment label={"Bought/Sold"}>{action}</Segment>} */}
    </SegmentedContentBlock>
  );
};
