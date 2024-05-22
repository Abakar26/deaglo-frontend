"use client";

import { css } from "styled-components";

export const Shadow = {
  DEFAULT: css`
    box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.04);
  `,
  CARD: css`
    box-shadow: 0px 8px 24px 0px rgba(145, 146, 161, 0.16);
  `,
  CARD_HOVER: css`
    box-shadow: 0px 12px 24px 0px rgba(93, 98, 147, 0.32);
  `,
  TABLE_STICKY_COLUMN_START: css`
    box-shadow: 8px 0px 24px 0px rgba(145, 146, 161, 0.16);
  `,
  TABLE_STICKY_COLUMN_END: css`
    box-shadow: -8px 4px 24px 0px rgba(145, 146, 161, 0.16);
  `,
};
