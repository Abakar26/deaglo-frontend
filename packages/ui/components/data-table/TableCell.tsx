import { forwardRef, type PropsWithChildren } from "react";
import styled, { css } from "styled-components";
import { Color, Typography } from "../../styles";
import { type CellAlignment } from ".";

export interface TableCellProps {
  align?: CellAlignment;
  editable?: boolean;
  error?: boolean;
  primary?: boolean;
  reverse?: boolean;
  onMouseEnter?: React.MouseEventHandler<HTMLTableCellElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLTableCellElement>;
}

export const TableCell = forwardRef(function TableCell(
  {
    align = "start",
    children,
    editable = false,
    error = false,
    primary = false,
    reverse = false,
    onMouseEnter,
    onMouseLeave,
  }: PropsWithChildren<TableCellProps>,
  ref: React.ForwardedRef<HTMLElement>
) {
  return (
    <TD $primary={primary} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <Content $align={align} $error={error} $editable={editable} $reverse={reverse} ref={ref}>
        {children}
      </Content>
    </TD>
  );
});

const TD = styled.td<{ $primary: boolean }>`
  ${(props) => (props.$primary ? Typography.SUBHEAD_1 : Typography.BODY_1)}
  color: ${Color.NEUTRAL_900};
  padding: 0;
  white-space: nowrap;
`;

type ContentProps = {
  $align: CellAlignment;
  $editable: boolean;
  $error: boolean;
  $reverse: boolean;
};

function getBackgroundColor({
  $error,
  focus,
  hover,
}: ContentProps & { focus?: boolean; hover?: boolean }) {
  if ($error) return Color.DANGER_700;
  if (focus) return Color.BRAND_800;
  if (hover) return Color.NEUTRAL_500;
  return Color.NEUTRAL_400;
}

const Content = styled.div<ContentProps>`
  align-items: center;
  display: flex;
  flex-direction: ${(props) => (props.$reverse ? "row-reverse" : "row")};
  gap: 8px;
  height: 48px;
  justify-content: ${(props) => props.$align};
  padding: 0 16px;

  ${(props) =>
    props.$editable
      ? css`
          border-color: ${getBackgroundColor(props)};
          border-radius: 4px;
          border-style: solid;
          border-width: 1px;
          height: 40px;
          margin: 4px;

          &:hover {
            border-color: ${getBackgroundColor({ ...props, hover: true })};
          }

          &:focus-within {
            border-color: ${getBackgroundColor({ ...props, focus: true })};
          }
        `
      : undefined}
`;
