import { z } from "zod";

export const inquireSchema = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email().max(200),
  message: z.string().min(1).max(5000),
  carpetRef: z.string().max(300).optional(),
  locale: z.string().max(5).optional(),
});

export type InquirePayload = z.infer<typeof inquireSchema>;
