"use client";

import React, { useRef, useState } from "react";
import styled from "styled-components";
import { Icon, IconButton } from "ui/components";
import { Color, Typography } from "ui/styles";
import { unparse } from "papaparse";

interface Props {
  fileName: string;
  data: Array<[string, number]>;
}

export const HarvestDownload: React.FunctionComponent<Props> = ({ fileName, data }) => {
  const [downloadLink, setDownloadLink] = useState<string>();
  const ref = useRef<HTMLAnchorElement>(null);

  const onDownload = () => {
    const csv = unparse<[string, number]>({ data, fields: ["date", "amount"] });
    const file = new Blob([csv], { type: "text/csv" });
    const windowURL = window.URL || window.webkitURL;
    setDownloadLink(windowURL.createObjectURL(file));
    setTimeout(() => ref.current?.click(), 100);
  };

  return (
    <Container>
      <Section>
        <Icon name="doc" color={Color.NEUTRAL_900} />
        <File>{fileName}</File>
      </Section>

      <IconButton name="download" onClick={onDownload} />
      <Download download={fileName} href={downloadLink} ref={ref} />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  border-radius: 8px;
  border: 1px solid ${Color.NEUTRAL_400};
  background-color: ${Color.NEUTRAL_00};
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: min-content;
  padding: 8px 16px;
  margin-top: 8px;
`;

const Section = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const File = styled.div`
  display: flex;
  align-items: center;
  text-overflow: ellipsis;
  white-space: nowrap;
  ${Typography.SUBHEAD_2};
  color: ${Color.NEUTRAL_900};
`;

const Download = styled.a`
  display: none;
`;
