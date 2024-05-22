"use client";

import { useEffect } from "react";
import { Button } from "ui/components";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>Something went wrong!</h2>
      <h2>{error.message}</h2>
      <Button label="Retry" onClick={() => reset()}>
        Try again
      </Button>
    </div>
  );
}
