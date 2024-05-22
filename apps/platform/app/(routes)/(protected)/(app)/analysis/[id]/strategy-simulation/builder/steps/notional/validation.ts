import { addYears, subMonths } from "date-fns";
import { z } from "zod";

export const NotionalObject = z
  .object({
    name: z.string().max(64, "Name must be less than 64 characters").min(1, "Name cannot be empty"),
    amount: z.number().min(0, "Amount must be greater than 0"),
    startDate: z.date(),
    endDate: z.date(),
  })
  .refine(({ startDate, endDate }) => addYears(startDate, 3) >= endDate, {
    message: "Tenor cannot be greater than 3 years",
    path: ["tenor"],
  })
  .refine(({ startDate, endDate }) => subMonths(endDate, 3) >= startDate, {
    message: "Tenor cannot be less than 3 months",
    path: ["tenor"],
  });
