import React from "react";
import styled from "styled-components";
import { Icon, IconButton, ProgressRing } from "..";
import { Color, Typography } from "../../styles";

interface Props {
  fileName: string;
  progress?: number;
  error?: string;
  errorDescription?: string;
  onDelete?: () => void;
}

export const UploadItem: React.FunctionComponent<Props> = ({
  fileName,
  progress,
  error,
  errorDescription,
  onDelete,
}) => {
  return (
    <Container error={!!error}>
      <Row>
        <File>
          <Icon name="doc" color={Color.NEUTRAL_900} />
          {fileName}
        </File>
        {progress != undefined ? (
          <ProgressRing progress={progress} accentColor={Color.NEUTRAL_300} size={24} start={90} />
        ) : (
          onDelete && <IconButton name="x" onClick={onDelete} aria-label={"Delete file"} />
        )}
      </Row>
      {error && (
        <ErrorSection>
          {error}
          {errorDescription && <ErrorDescription>{errorDescription}</ErrorDescription>}
        </ErrorSection>
      )}
    </Container>
  );
};

const Container = styled.div<{ error?: boolean }>`
  width: 640px;
  border-radius: 8px;
  border: 1px solid ${(props) => (props.error ? Color.DANGER_700 : Color.NEUTRAL_400)};
  background-color: ${Color.NEUTRAL_00};
  display: flex;
  flex-direction: column;
  height: min-content;
  overflow: hidden;
  transition:
    0.3s ease height,
    0.3s ease border-color;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 16px;
`;

const File = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  text-overflow: ellipsis;
  white-space: nowrap;
  ${Typography.SUBHEAD_2};
  color: ${Color.NEUTRAL_900};
  padding: 16px 0;
`;

const ErrorSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: calc(100% - 32px);
  padding: 12px 20px;
  color: ${Color.DANGER_700};
  ${Typography.LABEL_4};
  gap: 2px;
  border-top: 1px solid ${Color.NEUTRAL_150};
`;

const ErrorDescription = styled.div`
  color: ${Color.NEUTRAL_700};
`;
