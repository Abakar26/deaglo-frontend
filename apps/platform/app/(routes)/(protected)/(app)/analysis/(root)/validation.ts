import { z } from "zod";

export const AnalysisShape = z.object({
  name: z.string().max(64, "Name should not exceed 64 characters"),
});
