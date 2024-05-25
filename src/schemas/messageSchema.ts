import { z } from "zod";

export const messageSchema = z.object({
  content: z
    .string()
    .min(10, { message: "Content atleast of 10 chars" })
    .max(300, { message: "Content atmost of 300 chars" }),
});
