"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import styled from "styled-components";
import { Button, ButtonSize, ButtonType, ContentBlock } from "ui/components";
import { UploadedFile } from "./UploadedFile";
import { ButtonGroup } from "./shared";

export enum FileErrors {
  SIZE_LIMIT = "SIZE_LIMIT",
}

function validate(file: File) {
  // TODO: Replace with correct size limit
  const SIZE_LIMIT = 200;

  if (file.size > SIZE_LIMIT) return FileErrors.SIZE_LIMIT;
}

type UploadStepProps = {
  completed: boolean;
  nextStep: () => void;
  toggleStep: (complete: boolean) => void;
};

export function UploadStep({ completed, nextStep, toggleStep }: UploadStepProps) {
  const router = useRouter();

  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<FileErrors>();

  const inputRef = useRef<HTMLInputElement>(null);

  function chooseFile() {
    if (inputRef.current === null) return;
    inputRef.current.click();
  }

  function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const input = event.target;
    if (input.files === null) return;

    const file = input.files.item(0);
    if (file === null) return;

    setFile(file);
    setFileError(undefined);

    const error = validate(file);

    if (error) {
      setFileError(error);
    } else {
      toggleStep(true);
    }
  }

  function clearFile() {
    setFile(null);
    setFileError(undefined);
    toggleStep(false);

    if (inputRef.current === null) return;
    inputRef.current.files = null;
    inputRef.current.value = "";
  }

  const back = () => router.back();

  return (
    <>
      <HiddenInput type="file" accept=".csv" ref={inputRef} onChange={handleFileUpload} />

      {file !== null ? (
        <ContentBlock
          description="CSV File Uploaded "
          icon={{ icon: "info" }}
          title="Upload Your CSV File"
        >
          <UploadedFile error={fileError} file={file} clear={clearFile} />
        </ContentBlock>
      ) : (
        <ContentBlock
          title="Upload your CSV file"
          description="Ensure your file is in .csv format. The following step enables column matching with the appropriate data points. Adjustments to data formats can be made before finalizing the upload."
          icon={{ icon: "upload" }}
        />
      )}

      <ButtonGroup>
        <Button
          label="Back"
          resizeMode="fit"
          size={ButtonSize.LARGE}
          type={ButtonType.OUTLINE}
          onClick={back}
        />

        {completed ? (
          <Button
            label="See uploaded results"
            resizeMode="fit"
            size={ButtonSize.LARGE}
            onClick={nextStep}
          />
        ) : (
          <Button
            label="Choose a file"
            resizeMode="fit"
            size={ButtonSize.LARGE}
            onClick={chooseFile}
          />
        )}
      </ButtonGroup>
    </>
  );
}

const HiddenInput = styled.input`
  display: none;
`;
