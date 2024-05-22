import { z } from "zod";

export const SigninShape = z.object({
  email: z.string().email({ message: "Invalid username format." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." })
    .max(16, { message: "Password must be at most 16 characters long." }),
});
