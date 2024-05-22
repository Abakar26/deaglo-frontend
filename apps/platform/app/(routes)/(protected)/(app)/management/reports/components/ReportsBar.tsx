"use client";

import styled from "styled-components";
import { Button, ButtonType } from "ui/components";
import { ReportsFilters } from "./ReportsFilters";
import { useReportsStore } from "./store";

export function ReportsBar() {
  const renameReports = useReportsStore((state) => state.renameReports);
  const renamingReports = useReportsStore((state) => state.renamingReports);
  const resetRenamingReports = useReportsStore((state) => state.resetRenamingReports);

  return (
    <Container>
      {renamingReports ? (
        <ButtonGroup>
          <Button label="Save" resizeMode="fit" onClick={renameReports} />
          <Button
            label="Cancel"
            resizeMode="fit"
            type={ButtonType.OUTLINE}
            onClick={resetRenamingReports}
          />
        </ButtonGroup>
      ) : null}
      <ReportsFilters />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
`;
