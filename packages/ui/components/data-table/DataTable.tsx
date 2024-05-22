import React, { type PropsWithChildren } from "react";
import styled, { type RuleSet } from "styled-components";
import { Pagination } from "..";
import { Color } from "../../styles";
import { type Sticky, useStickyColumns } from "./hooks";

interface Props {
  page?: number;
  setPage?: (page: number) => void;
  totalPages?: number;
  sticky?: Sticky;
}

export const DataTable: React.FunctionComponent<Props & PropsWithChildren> = ({
  children,
  page = 1,
  setPage,
  totalPages,
  sticky,
}) => {
  const { tableContainerRef, handleScroll, getStickyColumnsStyles } = useStickyColumns(sticky);

  return (
    <Container>
      <TableContainer ref={tableContainerRef} onScroll={handleScroll}>
        <Table $stickyColumnsStyles={getStickyColumnsStyles()}>{children}</Table>
      </TableContainer>
      {setPage && totalPages && totalPages > 1 ? (
        <Pagination page={page} totalPages={totalPages} setPage={setPage} />
      ) : null}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

const TableContainer = styled.div`
  width: 100%;
  height: 100%;
  max-height: 100%;
  border: 1px solid ${Color.NEUTRAL_150};
  overflow: auto;
  overflow: overlay;
  &::-webkit-scrollbar-thumb {
    background-color: ${Color.NEUTRAL_500};
    width: 10px;
    -webkit-border-radius: 2px;
    &:active {
      background-color: ${Color.NEUTRAL_700};
    }
    cursor: pointer;
  }
  &::-webkit-scrollbar {
    background: transparent;
    width: 8px;
    height: 8px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
`;

const Table = styled.table<{ $stickyColumnsStyles: RuleSet[] | undefined }>`
  height: 100%;
  width: 100%;
  padding: 0;
  gap: 0;
  box-sizing: border-box;
  border-collapse: collapse;
  padding-bottom: 8px;
  padding-right: 8px;
  transition: 0.15s ease box-shadow;

  ${(props) => props.$stickyColumnsStyles}
`;
