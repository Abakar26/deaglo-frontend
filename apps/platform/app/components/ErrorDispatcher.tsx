"use client";

import React, { useEffect } from "react";
import { useSnackbarStore } from "../store";
import { SnackbarLevel } from "ui/components";

interface Props {
  errors: Array<string | undefined>;
}

export const ErrorDispatcher: React.FunctionComponent<Props> = ({ errors }) => {
  const { setSnack } = useSnackbarStore();

  const dispatch = (errors: Array<string | undefined>) => {
    const error = errors.at(0);
    if (error) {
      setSnack({
        message: "Error",
        level: SnackbarLevel.ERROR,
        description: error,
        cancellabel: true,
        duration: 2,
      });
    }
    if (errors.slice(1).length > 0) {
      setTimeout(() => {
        dispatch(errors.slice(1));
      }, 2000);
    }
  };

  useEffect(() => {
    dispatch(errors);
  }, []);

  return <></>;
};
