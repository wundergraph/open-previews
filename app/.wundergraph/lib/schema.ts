import { z } from "zod";

export const configSchema = z.object({
  url: z.string(),
  repository: z.string(),
  categoryId: z.string(),
});
