import { listSolutions, toServicePreview } from "@/lib/solutions";
import type { ServicePreview } from "@/types/content";

export const servicePreviews: readonly ServicePreview[] =
  listSolutions().map(toServicePreview);
