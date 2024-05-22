"use client";

import { ErrorDispatcher } from "@/app/components";
import React, { useRef, useState } from "react";
import styled from "styled-components";
import { ContentBlock, ContentColor, ContentIconColor, UploadItem } from "ui/components";
import { useHedgeBuilderStore } from "../../../../store";
import { useCSVParser } from "../hooks";
import { usePartialHarvestStore } from "../store";

export interface HarvestEntry {
  date: string;
  amount: number;
}

interface Props {
  onHarvest: (harvest: Array<HarvestEntry>) => void;
}

export const HarvestUpload: React.FunctionComponent<Props> = ({ onHarvest }) => {
  const { fileName, setFileName } = useHedgeBuilderStore();
  const { setHarvest } = usePartialHarvestStore();
  const [errors, setErrors] = useState<Array<string>>([]);
  const { parse } = useCSVParser<[string, string]>();
  const input = useRef<HTMLInputElement>(null);
  const uploadFile = () => input.current?.click();

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      parse(file, (data, errors) => {
        if (errors.length) {
          setErrors(["Invalid csv format, please select a different file"]);
        } else {
          setErrors([]);
          setFileName(file.name);
          onHarvest(data.map(([date, amount]) => ({ date, amount: parseFloat(amount) })));
        }
      });
    }
  };

  return fileName === undefined ? (
    <>
      <ContentBlock
        color={ContentColor.BRAND_100}
        icon={{
          icon: "upload",
          color: ContentIconColor.NEUTRAL_00,
        }}
        title="Upload your CSV file"
        description="Ensure your file is in .csv format. The following step enables column matching with the appropriate data points. Adjustments to data formats can be made before finalizing the upload."
        action={{
          label: "Choose a File",
          onClick: uploadFile,
          asButton: true,
        }}
      />
      <FileInput ref={input} type="file" accept=".csv" multiple={false} onChange={onFile} />
      <ErrorDispatcher errors={errors} />
    </>
  ) : (
    <>
      <ContentBlock
        title="CSV File Uploaded "
        icon={{
          color: ContentIconColor.NEUTRAL_00,
          icon: "info",
        }}
        color={ContentColor.BRAND_100}
      >
        <UploadItem
          fileName={fileName}
          onDelete={() => {
            setFileName(undefined);
            setHarvest([]);
          }}
        />
      </ContentBlock>
    </>
  );
};

const FileInput = styled.input`
  display: none;
`;
