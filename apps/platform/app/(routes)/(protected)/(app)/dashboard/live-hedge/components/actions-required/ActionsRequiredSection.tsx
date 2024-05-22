import { Suspense } from "react";
import { ActionsRequiredWrapper } from "./ActionsRequiredWrapper";

export function ActionsRequiredSection() {
  return (
    <Suspense fallback={null}>
      <ActionsRequiredWrapper />
    </Suspense>
  );
}
