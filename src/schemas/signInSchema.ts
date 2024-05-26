import { z } from "zod";

export const signInSchema = z.object({
  username: z.string(),
  password: z.string().min(6, { message: "Atleast 6 chars" }),
});