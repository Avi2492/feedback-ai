import { z } from "zod";

export const usernameValidation = z
  .string()
  .min(2, "Username Must be atleast 2 characters")
  .max(20, "Less than 20 chars")
  .regex(/^[a-zA-Z0-9_]+$/, "Username must not contain speacial chars");

export const signUpSchema = z.object({
  username: usernameValidation,
  email: z.string().email({ message: "Invalid email address!" }),
  password: z.string().min(6, { message: "Should be 6 chars" }),
});
