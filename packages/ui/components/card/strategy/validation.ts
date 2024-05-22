import { z } from "zod";

export const LegObject = z.object({
  leverage: z
    .number()
    .min(0, "Leverage must be greater than 0")
    .max(1, "Leverage must be less than 1"),
  strike: z
    .number()
    .min(-100, "Strike must be greater than -100%")
    .max(100, "Strike must be less than 100%"),
  barrierLevel: z
    .number()
    .min(-100, "Barrier level must be greater than -100%")
    .max(100, "Barrier level must be less than 100%")
    .optional(),
});
