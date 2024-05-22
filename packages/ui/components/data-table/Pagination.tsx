import React from "react";
import styled from "styled-components";
import { Icon } from "..";
import { Color, Typography } from "../../styles";

interface Props {
  page: number;
  setPage: (page: number) => void;
  totalPages: number;
}

export const Pagination: React.FunctionComponent<Props> = ({ page, setPage, totalPages }) => {
  return (
    <Container>
      <Incrementor onClick={() => setPage(Math.max(page - 1, 0))} disabled={page === 1}>
        <Icon
          name="arrow-left"
          color={page !== 1 ? Color.NEUTRAL_700 : Color.NEUTRAL_400}
          size={16}
        />
        Previous
      </Incrementor>
      <Pages>
        {totalPages <= 7 ? (
          Array(totalPages)
            .fill(null)
            .map((_, index) => (
              <PageButton
                key={index}
                active={index + 1 === page}
                onClick={() => setPage(index + 1)}
              >
                {index + 1}
              </PageButton>
            ))
        ) : (
          <>
            <PageButton active={page === 1}>1</PageButton>
            {page > 4 && "..."}
            {page <= 4
              ? Array(4)
                  .fill(null)
                  .map((_, index) => (
                    <PageButton
                      key={index}
                      onClick={() => setPage(index + 2)}
                      active={page === index + 2}
                    >
                      {index + 2}
                    </PageButton>
                  ))
              : totalPages - page <= 3
                ? Array(4)
                    .fill(null)
                    .map((_, index) => (
                      <PageButton
                        key={index}
                        onClick={() => setPage(totalPages - 4 + index)}
                        active={page === totalPages - 4 + index}
                      >
                        {totalPages - 4 + index}
                      </PageButton>
                    ))
                : [page - 1, page, page + 1].map((index) => (
                    <PageButton key={index} active={page === index} onClick={() => setPage(index)}>
                      {index}
                    </PageButton>
                  ))}
            {totalPages - page > 3 && "..."}
            <PageButton active={page === totalPages} onClick={() => setPage(totalPages)}>
              {totalPages}
            </PageButton>
          </>
        )}
      </Pages>
      <Incrementor
        onClick={() => setPage(Math.min(page + 1, totalPages))}
        disabled={page === totalPages}
      >
        Next
        <Icon
          name="arrow-right"
          color={page !== totalPages ? Color.NEUTRAL_700 : Color.NEUTRAL_400}
          size={16}
        />
      </Incrementor>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 509px;
  justify-content: space-between;
`;

const Incrementor = styled.button`
  width: 96px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  color: ${(props) => (props.disabled ? Color.NEUTRAL_400 : Color.NEUTRAL_700)};
  background-color: transparent;
  &:hover {
    background-color: ${Color.NEUTRAL_100};
  }
  ${Typography.BODY_2};
  border: none;
  border-radius: 4px;
  ${(props) => !props.disabled && `cursor: pointer`};
  transition:
    0.3s ease background-color,
    0.3s ease color;
`;

const Pages = styled.div`
  display: flex;
  align-items: baseline;
  gap: 8px;
  ${Typography.BODY_2};
  color: ${Color.NEUTRAL_700};
`;

const PageButton = styled.button<{ active: boolean }>`
  height: 32px;
  width: 32px;
  border: none;
  border-radius: 4px;
  color: ${(props) => (props.active ? Color.BRAND_800 : Color.NEUTRAL_700)};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: transparent;
  ${Typography.SUBHEAD_2};
  &:hover {
    background-color: ${Color.BRAND_100};
  }
  transition: 0.15s ease background-color;
`;
