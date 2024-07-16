import { z } from "zod";

export const TaskSchema = z.object({
  title: z.string({ message: "Title is required" }),
  description: z.string().optional(),
  deadline: z.string({ message: "Deadline is required" }),
  status: z.union([z.literal(0), z.literal(1)]),
});
