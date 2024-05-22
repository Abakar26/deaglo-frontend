import { z } from "zod";

export const SignupShape = z
  .object({
    email: z.string().email({ message: "Invalid email format" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long." })
      .max(16, { message: "Password must be at most 16 characters long." }),
    confirmPassword: z.string(),
    firstName: z
      .string()
      .regex(/^[a-zA-Z]+$/, { message: "First name should only contain alphabetical characters" }),
    lastName: z
      .string()
      .regex(/^[a-zA-Z]+$/, { message: "Last name should only contain alphabetical characters" }),
    phoneNumber: z.string().min(10, { message: "Phone number must be at least 10 digits long." }),
    city: z.string().regex(/^[a-zA-Z\s]+$/, {
      message: "City name should only contain alphabetical characters and spaces.",
    }),
    state: z.string().optional(),
    zipCode: z.string().max(12, { message: "ZIP code must be at most 12 characters long." }),
    country: z.string().regex(/^[a-zA-Z]+$/, {
      message: "Country name should only contain alphabetical characters.",
    }),
    company: z.string(),
    jobTitle: z.string(),
    companyType: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
