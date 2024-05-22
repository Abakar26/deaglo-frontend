"use client";

import { useRouter } from "next/navigation";
import { Button } from "ui/components";

export function ViewTradesButton() {
  const router = useRouter();

  const onClick = () => router.push("/management/trades");

  // TODO: Get trades count
  return <Button label="View 34 open trades" resizeMode="fit" onClick={onClick} />;
}
