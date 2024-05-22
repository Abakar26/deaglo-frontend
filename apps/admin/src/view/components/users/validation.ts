import { z } from "zod";

export const UserShape = z.object({
  firstName: z
    .string()
    .regex(/^[a-zA-Z]+$/, { message: "First name should only contain alphabetical characters" }),
  lastName: z
    .string()
    .regex(/^[a-zA-Z]+$/, { message: "Last name should only contain alphabetical characters" }),
  email: z.string().email({ message: "Invalid email format" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." })
    .max(16, { message: "Password must be at most 16 characters long." }),
  confirmPassword: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." })
    .max(16, { message: "Password must be at most 16 characters long." }),
  city: z.string().regex(/^[a-zA-Z\s]+$/, {
    message: "City name should only contain alphabetical characters and spaces.",
  }),
  country: z
    .string()
    .regex(/^[a-zA-Z]+$/, { message: "Country name should only contain alphabetical characters." }),
});
