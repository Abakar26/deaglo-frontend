"use server";

import { revalidateTag } from "next/cache";

// eslint-disable-next-line @typescript-eslint/require-await
export async function reloadAnalysisSimulations(id: string) {
  revalidateTag(`/analysis/${id}`);
}
