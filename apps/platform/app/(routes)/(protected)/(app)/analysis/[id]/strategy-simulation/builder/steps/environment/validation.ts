import { z } from "zod";

export const EnvironmentObject = z.object({
  volatility: z
    .number()
    .min(0, "Volatility must be greater than 0")
    .max(100, "Volatility must be less than 100"),
  skew: z
    .number()
    .min(-0.1, "Skew must be greater than -0.1")
    .max(0.1, "Skew must be less than 0.1"),
  appreciationPercent: z
    .number()
    .min(-100, "Depreciation must be less than 100%")
    .max(100, "Appreciation must be less than 100%"),
});
