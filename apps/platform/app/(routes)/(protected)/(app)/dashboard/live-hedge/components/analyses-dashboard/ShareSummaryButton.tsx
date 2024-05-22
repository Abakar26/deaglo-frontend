"use client";

import { Button, ButtonType } from "ui/components";

export function ShareSummaryButton() {
  function onClick() {
    // TODO: Missing implementation
    alert("TODO");
  }

  return (
    <Button label="Share Summary" resizeMode="fit" type={ButtonType.OUTLINE} onClick={onClick} />
  );
}
