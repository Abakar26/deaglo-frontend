import { z } from "zod";

export const ForgotPasswordShape = z
  .object({
    email: z.string().email({ message: "Invalid email format." }),
    newPassword: z
      .string()
      .min(8, { message: "New password must be at least 8 characters long." })
      .max(16, { message: "New password must be at most 16 characters long." }),
    confirmNewPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords don't match",
    path: ["confirmNewPassword"],
  });
