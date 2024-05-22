"use client";

import styled from "styled-components";
import { Icon, IconButton } from "ui/components";
import { Color, Typography } from "ui/styles";
import { FileErrors } from "./UploadStep";

type UploadedFileProps = {
  error: FileErrors | undefined;
  file: File;
  clear: () => void;
};

export function UploadedFile({ error, file, clear }: UploadedFileProps) {
  function getError(key: FileErrors) {
    switch (key) {
      case FileErrors.SIZE_LIMIT:
        return {
          title: "File exceeds size limit.",
          description: "Optional secondary explanation that can go on for two lines.",
        };
    }
  }

  return (
    <Container $error={Boolean(error)}>
      <Header>
        <Icon name="doc" />
        <FileName>{file.name}</FileName>
        <IconButton name="x" onClick={clear} />
      </Header>
      {error ? (
        <ErrorContainer>
          <ErrorTitle>{getError(error).title}</ErrorTitle>
          <ErrorDescription>{getError(error).description}</ErrorDescription>
        </ErrorContainer>
      ) : null}
    </Container>
  );
}

const Container = styled.div<{ $error: boolean }>`
  background-color: ${Color.NEUTRAL_00};
  border-radius: 4px;
  border: 1px solid ${(props) => (props.$error ? Color.DANGER_700 : Color.NEUTRAL_400)};
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  align-items: center;
  display: flex;
  gap: 12px;
  padding: 4px 20px;
`;

const FileName = styled.span`
  ${Typography.SUBHEAD_2}
  margin-right: auto;
`;

const ErrorContainer = styled.div`
  ${Typography.LABEL_4}
  border-top: 1px solid ${Color.NEUTRAL_150};
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 12px 20px;
`;

const ErrorTitle = styled.b`
  color: ${Color.DANGER_400};
`;

const ErrorDescription = styled.span`
  color: ${Color.NEUTRAL_700};
`;
