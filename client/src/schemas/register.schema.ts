import { z } from "zod";

export const signupSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters" })
    .max(12, { message: "Username must be at most 12 characters" }),
  password: z
    .string()
    .min(3, { message: "Password msut be at least 3 characters" })
    .max(12, { message: "Password must be at most 12 characters" }),
});

export const signinSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters" })
    .max(12, { message: "Username must be at most 12 characters" }),
  password: z
    .string()
    .min(3, { message: "Password msut be at least 3 characters" })
    .max(12, { message: "Password must be at most 12 characters" }),
});
