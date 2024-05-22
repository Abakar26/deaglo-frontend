import { z } from "zod";

export const OrganizationShape = z.object({
  name: z.string().max(64, "Name should not exceed 64 characters"),
});
