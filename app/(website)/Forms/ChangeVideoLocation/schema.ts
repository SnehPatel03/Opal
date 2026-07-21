import { z } from "zod";

export const moveVideoLocationSchema = z.object({
  folder_id: z.string().optional(),
  workspace_id: z.string(),
});