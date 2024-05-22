import { useEffect, useRef, useState } from "react";
import { css } from "styled-components";
import { Shadow } from "../../../styles";

export type Sticky = [countFromStart: number, countFromEnd: number];
type ScrollPosition = "start" | "middle" | "end" | null;

export function useStickyColumns(sticky: Sticky | undefined) {
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>(null);
  const [headerWidths, setHeaderWidths] = useState<number[]>([]);
  const [tableHeight, setTableHeight] = useState<number>(0);

  const tableContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tableContainer = tableContainerRef.current;
    if (tableContainer === null) return;

    const isScrollable = tableContainer.scrollWidth !== tableContainer.clientWidth;
    if (isScrollable) setScrollPosition("start");

    const table = tableContainer.querySelector("table");
    if (table === null) return;

    const resizeObserver = new ResizeObserver(([entry]) => {
      if (!entry) return;

      setTableHeight(table.clientHeight);
      const headers = table.querySelectorAll("th");
      setHeaderWidths([...headers].map((th) => th.clientWidth));
    });

    resizeObserver.observe(table);
    return () => resizeObserver.disconnect();
  }, []);

  function handleScroll(event: React.UIEvent<HTMLDivElement, UIEvent>) {
    const element = event.target as HTMLDivElement;

    const isScrollStart = (element.scrollLeft ?? 0) === 0;
    if (isScrollStart) return setScrollPosition("start");

    const isScrollEnd = element.scrollLeft + element.clientWidth === element.scrollWidth;
    if (isScrollEnd) return setScrollPosition("end");

    return setScrollPosition("middle");
  }

  function getStickyColumnsStyles() {
    if (sticky === undefined) return undefined;

    const [countStart, countEnd] = sticky;

    const shadow = getShadow(countStart, countEnd, headerWidths, tableHeight, scrollPosition);
    const position = getPosition(countStart, countEnd);
    const offset = getOffset(countStart, countEnd, headerWidths);

    return [...shadow, position, ...offset];
  }

  function getShadow(
    countStart: number,
    countEnd: number,
    headerWidths: number[],
    tableHeight: number,
    scrollPosition: ScrollPosition
  ) {
    const widthStart = headerWidths.slice(0, countStart).reduce((a, b) => a + b, 0);
    const widthEnd = headerWidths.slice(-countEnd).reduce((a, b) => a + b, 0);

    const shadowStart =
      countStart > 0 && scrollPosition !== null && scrollPosition !== "start"
        ? css`
            & th:first-child::after {
              ${Shadow.TABLE_STICKY_COLUMN_START}
              content: "";
              display: block;
              height: ${tableHeight}px;
              left: 0;
              position: absolute;
              top: 0;
              width: ${widthStart}px;
              z-index: 1;
            }
          `
        : css``;

    const shadowEnd =
      countEnd > 0 && scrollPosition !== null && scrollPosition !== "end"
        ? css`
            & th:last-child::after {
              ${Shadow.TABLE_STICKY_COLUMN_END}
              content: "";
              display: block;
              height: ${tableHeight}px;
              position: absolute;
              right: 0;
              top: 0;
              width: ${widthEnd}px;
              z-index: 1;
            }
          `
        : css``;

    return [shadowStart, shadowEnd];
  }

  function getPosition(countStart: number, countEnd: number) {
    return css`
      & :is(th, td):nth-child(-n + ${countStart}) {
        position: sticky;
        z-index: 2;
      }

      & :is(th, td):nth-last-child(-n + ${countEnd}) {
        position: sticky;
        z-index: 2;
      }
    `;
  }

  function getOffset(countStart: number, countEnd: number, headerWidths: number[]) {
    const widths = [0, ...headerWidths, 0];

    const offsetsStart = widths.slice(0, countStart).map((_, index, array) => {
      const offset = array.slice(0, index + 1).reduce((a, b) => a + b);
      return css`
        & :is(th, td):nth-child(${index + 1}) {
          left: ${offset}px;
        }
      `;
    });

    const offsetsEnd = widths
      .slice(-countEnd)
      .toReversed()
      .map((_, index, array) => {
        const offset = array.slice(0, index + 1).reduce((a, b) => a + b);
        return css`
          & :is(th, td):nth-last-child(${index + 1}) {
            right: ${offset}px;
          }
        `;
      });

    return [...offsetsStart, ...offsetsEnd];
  }

  return { tableContainerRef, handleScroll, getStickyColumnsStyles };
}
