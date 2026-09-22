import { createHash } from "node:crypto";

export function hashContactOpaque(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}

export function opaqueContactSubmissionId(attemptId: string): string {
  return `c_${hashContactOpaque(attemptId).slice(0, 24)}`;
}
