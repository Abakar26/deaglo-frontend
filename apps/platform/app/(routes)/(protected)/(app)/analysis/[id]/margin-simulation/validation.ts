import { z } from "zod";

const required_error = "*required";

// TODO: update copy
export const MarginSimulationShape = z.object({
  strategyId: z.string({ required_error }),
  minTransfer: z
    .number({ required_error })
    .min(0.01, "Minimum transfer amount must be greater than 0.01"),
  initialMargin: z
    .number({ required_error })
    .min(0, "Initial margin must be greater than 0%")
    .max(100, "Initial margin must be less than 100%"),
  variationMargin: z
    .number({ required_error })
    .min(0, "Variation margin must be greater than 0%")
    .max(100, "Variation margin must be less than 100%"),
  name: z.string().min(3, "Name must be at least 3 characters long"),
});
