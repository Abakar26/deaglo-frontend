"use client";

import type { ReportItem, ReportsType } from "./_mocks";

import styled from "styled-components";
import { Icon, TableEntry, TableInput, TableRow } from "ui/components";
import { Color } from "ui/styles";
import { useReportsStore } from "./store";

type EditableTableCellProps = {
  type: ReportsType;
  report: ReportItem;
};

export function EditableTableCell({ type, report }: EditableTableCellProps) {
  const renamingReports = useReportsStore((state) => state.renamingReports);
  const setReportAsRenaming = useReportsStore((state) => state.setReportAsRenaming);
  const setRenamingReports = useReportsStore((state) => state.setRenamingReports);

  const renamingReport = renamingReports[type].find((renamingReport) => {
    return renamingReport.id === report.id;
  });

  const editable = renamingReport !== undefined;

  function onClick() {
    setReportAsRenaming(type, report);
  }

  function onChange(value: string) {
    setRenamingReports(type, { ...report, name: value });
  }

  if (editable) {
    return (
      <TableInput label={`Rename ${report.name}`} value={renamingReport.name} onChange={onChange} />
    );
  }

  return (
    <TableEntry align="space-between">
      <ListItemCell>{report.name}</ListItemCell>
      <Button type="button" onClick={onClick}>
        <Icon name="pencil" color={Color.BRAND_800} />
      </Button>
    </TableEntry>
  );
}

const ListItemCell = styled.span`
  display: list-item;
  margin-left: 1.5em;
`;

const Button = styled.button`
  background-color: transparent;
  border: 0;
  cursor: pointer;
  outline-offset: 8px;
  visibility: hidden;
`;

export const EditableTableRow = styled(TableRow)`
  &:hover ${Button} {
    visibility: visible;
  }
`;
