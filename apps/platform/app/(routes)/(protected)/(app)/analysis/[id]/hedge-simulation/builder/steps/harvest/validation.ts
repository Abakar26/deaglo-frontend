import { z } from "zod";

export const NameObject = z.object({
  name: z.string().min(0, "Name cannot be empty.").max(64, "Name must be less than 64 characters."),
});
