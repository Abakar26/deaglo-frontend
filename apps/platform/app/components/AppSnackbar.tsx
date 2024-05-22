"use client";

import { useSnackbarStore } from "@/app/store";
import React from "react";
import { Snackbar } from "ui/components";

export const AppSnackbar: React.FunctionComponent = () => {
  const { snack, setSnack } = useSnackbarStore();
  return (
    snack && (
      <Snackbar
        level={snack.level}
        message={snack.message}
        icon={snack.icon}
        action={snack.action}
        duration={snack.duration}
        onDismiss={() => setSnack(undefined)}
        position={snack.position}
        cancellable={snack.cancellabel}
        description={snack.description}
      />
    )
  );
};
