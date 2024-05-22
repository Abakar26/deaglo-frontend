"use client";
import { formatAccounting } from "@/utilities";
import { unparse } from "papaparse";
import React, { useRef, useState } from "react";
import { styled } from "styled-components";
import {
  Button,
  ButtonType,
  DataTable,
  DateInput,
  Draggable,
  NumberInput,
  SideModal,
} from "ui/components";
import { Color, Typography } from "ui/styles";
import { convertHarvestStringToList } from "../utils/convertStrings";

interface Props {
  harvestData: { data: string };
  setShowWaterfall: (value: boolean) => void;
}

const WaterfallModel: React.FunctionComponent<Props> = ({ harvestData, setShowWaterfall }) => {
  const [downloadLink, setDownloadLink] = useState<string>();
  const ref = useRef<HTMLAnchorElement>(null);
  const data = convertHarvestStringToList(harvestData.data) ?? [];

  const onDownload = () => {
    const csv = unparse<[string, string]>({ data, fields: ["date", "amount"] });
    const file = new Blob([csv], { type: "text/csv" });
    const windowURL = window.URL || window.webkitURL;
    setDownloadLink(windowURL.createObjectURL(file));
    setTimeout(() => ref.current?.click(), 100);
  };

  const convertTimestampToDate = (ts?: string) => {
    const dateInput = ts ? new Date(ts) : new Date();
    return new Date(dateInput.setUTCHours(12, 0, 0, 0));
  };

  return (
    <SideModal width={700} title="View waterfall" onDismiss={() => setShowWaterfall(false)}>
      <TableContainer>
        <Section>
          <Title>Preview of your data</Title>
          <Description>
            Entries below were used to run this Hedge IRR simulation. You can download this as CSV
            by clicking the 'Download' button below.
          </Description>
        </Section>
        <Border>
          <DataTable>
            <tbody>
              {[...convertHarvestStringToList(harvestData.data)].map((row, index) => (
                <Draggable key={index}>
                  <DateInput
                    width={480}
                    disabled={true}
                    date={convertTimestampToDate(row[0])}
                    onChange={() => null}
                  />
                  <NumberInput
                    label="Amount"
                    disabled={true}
                    value={+(row[1] ?? 0)}
                    onChange={() => null}
                    formatter={(val) => formatAccounting(val, 0)}
                  />
                </Draggable>
              ))}
            </tbody>
          </DataTable>
        </Border>
      </TableContainer>
      <Row>
        <Button
          label="Cancel"
          onClick={() => setShowWaterfall(false)}
          type={ButtonType.OUTLINE}
          resizeMode="fit"
        />
        <Button label={"Download CSV"} onClick={onDownload} resizeMode="fit" disabled={false} />
        <Download download={"harvest-data.csv"} href={downloadLink} ref={ref} />
      </Row>
    </SideModal>
  );
};

export default WaterfallModel;

const Title = styled.span`
  ${Typography.SUBHEAD_2};
  color: ${Color.NEUTRAL_900};
`;

const Description = styled.span`
  ${Typography.BODY_3};
  color: ${Color.NEUTRAL_700};
`;

const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 20px;
  border: 1px solid ${Color.NEUTRAL_400};
  border-radius: 8px;
  margin-top: 24px;
  margin-bottom: 16px;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Border = styled.div`
  border: 1px solid ${Color.NEUTRAL_300};
`;

const Row = styled.div`
  display: flex;
  justify-content: end;
  gap: 16px;
  margin: 32px 0;
`;

const Download = styled.a`
  display: none;
`;
